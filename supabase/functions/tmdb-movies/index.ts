import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TMDB_ACCESS_TOKEN = Deno.env.get('TMDB_ACCESS_TOKEN');
    
    if (!TMDB_ACCESS_TOKEN) {
      throw new Error('TMDB_ACCESS_TOKEN is not configured');
    }

    const { type = 'popular', page = 1, query } = await req.json().catch(() => ({}));
    
    let endpoint = '';
    const baseUrl = 'https://api.themoviedb.org/3';
    
    switch (type) {
      case 'popular':
        endpoint = `${baseUrl}/movie/popular?language=en-US&page=${page}`;
        break;
      case 'trending':
        endpoint = `${baseUrl}/trending/movie/week?language=en-US&page=${page}`;
        break;
      case 'top_rated':
        endpoint = `${baseUrl}/movie/top_rated?language=en-US&page=${page}`;
        break;
      case 'now_playing':
        endpoint = `${baseUrl}/movie/now_playing?language=en-US&page=${page}`;
        break;
      case 'upcoming':
        endpoint = `${baseUrl}/movie/upcoming?language=en-US&page=${page}`;
        break;
      case 'search':
        if (!query) throw new Error('Search query is required');
        endpoint = `${baseUrl}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`;
        break;
      case 'tv_popular':
        endpoint = `${baseUrl}/tv/popular?language=en-US&page=${page}`;
        break;
      case 'tv_trending':
        endpoint = `${baseUrl}/trending/tv/week?language=en-US&page=${page}`;
        break;
      default:
        endpoint = `${baseUrl}/movie/popular?language=en-US&page=${page}`;
    }

    console.log(`Fetching TMDB: ${endpoint}`);

    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('TMDB API error:', response.status, errorText);
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform TMDB data to match our movie format
    const movies = data.results.map((item: any) => ({
      id: `tmdb-${item.id}`,
      tmdb_id: item.id,
      title: item.title || item.name,
      poster: item.poster_path 
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
        : '/placeholder.svg',
      backdrop: item.backdrop_path
        ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
        : null,
      year: (item.release_date || item.first_air_date || '').split('-')[0] || 'N/A',
      rating: item.vote_average?.toFixed(1) || 'N/A',
      genre: 'Movie',
      description: item.overview || '',
      popularity: item.popularity,
      vote_count: item.vote_count,
      media_type: item.media_type || (type.includes('tv') ? 'tv' : 'movie'),
    }));

    return new Response(JSON.stringify({
      movies,
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in tmdb-movies function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      movies: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
