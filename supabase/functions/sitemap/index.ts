import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

function getSeriesBaseName(title: string): string {
  const match = title.match(/^(.+?)\s*(S\d+\s*E\d+|Season\s*\d+|Part\s*\d+|EP?\s*\d+|Episode\s*\d+)/i)
  return match ? match[1].trim() : title
}

function isSeriesEpisode(title: string): boolean {
  return /\s*(S\d+\s*E\d+|Season\s*\d+|Part\s*\d+|EP?\s*\d+|Episode\s*\d+)/i.test(title)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: movies, error: moviesError } = await supabase
      .from('movies')
      .select('id, title, updated_at, poster_url, rating, genre, year')
      .order('updated_at', { ascending: false })

    if (moviesError) {
      console.error('Error fetching movies:', moviesError)
    }

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, updated_at')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })

    if (productsError) {
      console.error('Error fetching products:', productsError)
    }

    const today = new Date().toISOString().split('T')[0]
    const baseUrl = 'https://rwaflix.store'

    const staticPages = [
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/movies', priority: '0.9', changefreq: 'daily' },
      { loc: '/tv-shows', priority: '0.9', changefreq: 'daily' },
      { loc: '/popular', priority: '0.8', changefreq: 'daily' },
      { loc: '/shop', priority: '0.8', changefreq: 'daily' },
      { loc: '/faq', priority: '0.7', changefreq: 'weekly' },
      { loc: '/about', priority: '0.7', changefreq: 'monthly' },
      { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
      { loc: '/privacy-policy', priority: '0.6', changefreq: 'monthly' },
      { loc: '/terms-of-service', priority: '0.6', changefreq: 'monthly' },
    ]

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`

    for (const page of staticPages) {
      xml += `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
    }

    // Track series to generate series listing pages
    const seriesMap = new Map<string, { baseName: string; lastmod: string; poster: string; rating: string; genre: string; count: number }>()

    if (movies && movies.length > 0) {
      for (const movie of movies) {
        const slug = slugify(movie.title)
        const lastmod = movie.updated_at ? new Date(movie.updated_at).toISOString().split('T')[0] : today
        const pageUrl = `${baseUrl}/watch/${slug}/${movie.id}`
        const thumbnailUrl = movie.poster_url || `${baseUrl}/logo-512.jpg`
        const dubberName = movie.rating ? ` by ${movie.rating}` : ''
        const embedPlayerUrl = `${pageUrl}#player`

        // Track series
        if (isSeriesEpisode(movie.title)) {
          const base = getSeriesBaseName(movie.title)
          const baseKey = base.toLowerCase()
          if (!seriesMap.has(baseKey)) {
            seriesMap.set(baseKey, { baseName: base, lastmod, poster: thumbnailUrl, rating: movie.rating || '', genre: movie.genre || '', count: 1 })
          } else {
            const existing = seriesMap.get(baseKey)!
            existing.count++
            if (lastmod > existing.lastmod) existing.lastmod = lastmod
          }
        }
        
        xml += `  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <video:video>
      <video:thumbnail_loc>${escapeXml(thumbnailUrl)}</video:thumbnail_loc>
      <video:title>Agasobanuye ${escapeXml(movie.title)}${escapeXml(dubberName)} - Rwaflix Store</video:title>
      <video:description>Reba ${escapeXml(movie.title)} (${movie.year || ''}) agasobanuye${escapeXml(dubberName)} ku buntu kuri Rwaflix Store. ${escapeXml(movie.genre || '')} movie HD quality.</video:description>
      <video:player_loc allow_embed="yes">${embedPlayerUrl}</video:player_loc>
    </video:video>
  </url>
`
      }

      // Add series listing pages
      for (const [, series] of seriesMap) {
        if (series.count > 1) {
          const seriesUrl = `${baseUrl}/series/${encodeURIComponent(series.baseName)}`
          xml += `  <url>
    <loc>${seriesUrl}</loc>
    <lastmod>${series.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`
        }
      }
    }

    xml += `</urlset>`

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new Response('Error generating sitemap', { 
      status: 500,
      headers: corsHeaders 
    })
  }
})

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}