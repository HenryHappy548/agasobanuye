import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TMDBMovie {
  id: string;
  tmdb_id: number;
  title: string;
  poster: string;
  backdrop: string | null;
  year: string;
  rating: string;
  genre: string;
  description: string;
  popularity: number;
  vote_count: number;
  media_type: string;
}

interface TMDBResponse {
  movies: TMDBMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

type FetchType = 'popular' | 'trending' | 'top_rated' | 'now_playing' | 'upcoming' | 'search' | 'tv_popular' | 'tv_trending';

export const useTMDBMovies = (type: FetchType = 'popular', initialPage = 1) => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMovies = useCallback(async (fetchType: FetchType, pageNum: number, query?: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('tmdb-movies', {
        body: { type: fetchType, page: pageNum, query },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setMovies(data.movies || []);
      setTotalPages(data.total_pages || 0);
      setPage(data.page || 1);
    } catch (err) {
      console.error('Error fetching TMDB movies:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(type, initialPage);
  }, [type, initialPage, fetchMovies]);

  const searchMovies = useCallback((query: string) => {
    if (query.trim()) {
      fetchMovies('search', 1, query);
    }
  }, [fetchMovies]);

  const loadMore = useCallback(() => {
    if (page < totalPages) {
      fetchMovies(type, page + 1);
    }
  }, [page, totalPages, type, fetchMovies]);

  const refresh = useCallback(() => {
    fetchMovies(type, 1);
  }, [type, fetchMovies]);

  return {
    movies,
    loading,
    error,
    page,
    totalPages,
    searchMovies,
    loadMore,
    refresh,
    fetchMovies,
  };
};
