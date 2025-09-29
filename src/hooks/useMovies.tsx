import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Movie {
  id: string;
  title: string;
  poster: string;
  year: string;
  genre: string;
  rating: string;
  category: 'movie' | 'tv' | 'trending';
  description?: string | null;
  video_url?: string | null;
  featured?: boolean;
}

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Map the database fields to match the Movie interface
      const mappedMovies: Movie[] = (data || []).map(movie => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_url || '/placeholder.svg', // Use placeholder if no poster
        year: movie.year,
        genre: movie.genre,
        rating: movie.rating,
        category: movie.category as 'movie' | 'tv' | 'trending',
        description: movie.description,
        video_url: movie.video_url,
        featured: movie.featured
      }));

      setMovies(mappedMovies);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const getMoviesByCategory = (category: string) => {
    return movies.filter(movie => movie.category === category);
  };

  const getFeaturedMovies = () => {
    return movies.filter(movie => movie.featured);
  };

  const searchMovies = (query: string) => {
    if (!query.trim()) return movies;
    
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    movies,
    loading,
    error,
    refetch: fetchMovies,
    getMoviesByCategory,
    getFeaturedMovies,
    searchMovies,
  };
}