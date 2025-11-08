import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Movie {
  id: string;
  title: string;
  poster: string;
  year: string;
  genre: string;
  rating: string;
  category: 'movie' | 'tv' | 'trending';
  description?: string;
  video_url?: string;
  dubbed?: string;
  featured?: boolean;
}

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform database data to match Movie interface
      return (data || []).map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_url || "",
        year: movie.year,
        genre: movie.genre,
        rating: movie.rating,
        category: movie.category as 'movie' | 'tv' | 'trending',
        description: movie.description,
        video_url: movie.video_url,
        dubbed: movie.dubbed,
        featured: movie.featured,
      })) as Movie[];
    },
  });
};

export const useMoviesByCategory = (category: 'movie' | 'tv' | 'trending') => {
  return useQuery({
    queryKey: ["movies", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data || []).map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_url || "",
        year: movie.year,
        genre: movie.genre,
        rating: movie.rating,
        category: movie.category as 'movie' | 'tv' | 'trending',
        description: movie.description,
        video_url: movie.video_url,
        dubbed: movie.dubbed,
        featured: movie.featured,
      })) as Movie[];
    },
  });
};

export const useFeaturedMovies = () => {
  return useQuery({
    queryKey: ["movies", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        const movie = data[0];
        return {
          id: movie.id,
          title: movie.title,
          poster: movie.poster_url || "",
          year: movie.year,
          genre: movie.genre,
          rating: movie.rating,
          category: movie.category as 'movie' | 'tv' | 'trending',
          description: movie.description,
          video_url: movie.video_url,
          dubbed: movie.dubbed,
          featured: movie.featured,
        } as Movie;
      }
      return null;
    },
  });
};
