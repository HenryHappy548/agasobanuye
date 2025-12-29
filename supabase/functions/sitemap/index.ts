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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch all movies
    const { data: movies, error: moviesError } = await supabase
      .from('movies')
      .select('id, title, updated_at')
      .order('updated_at', { ascending: false })

    if (moviesError) {
      console.error('Error fetching movies:', moviesError)
    }

    // Fetch all active products
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

    // Static pages
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

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`

    // Add static pages
    for (const page of staticPages) {
      xml += `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
    }

    // Add movies dynamically
    if (movies && movies.length > 0) {
      for (const movie of movies) {
        const slug = slugify(movie.title)
        const lastmod = movie.updated_at ? new Date(movie.updated_at).toISOString().split('T')[0] : today
        
        xml += `  <url>
    <loc>${baseUrl}/watch/${slug}/${movie.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <video:video>
      <video:title>${escapeXml(movie.title)} - Rwaflix Agasobanuye</video:title>
      <video:description>Watch ${escapeXml(movie.title)} on Rwaflix. Available in HD quality with Kinyarwanda dubbing.</video:description>
    </video:video>
  </url>
`
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
