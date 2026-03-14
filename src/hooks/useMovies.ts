import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { mockMovies, Movie } from "@/data/mockData";
import { readMoviesCache, writeMoviesCache } from "@/lib/moviesCache";

export interface DBMovie {
  id: string;
  title: string;
  poster: string;
  year: string;
  genre: string;
  rating: string;
  category: 'movie' | 'tv' | 'trending';
  description?: string;
  video_url?: string;
  download_url?: string;
  dubbed?: string;
  featured?: boolean;
  show_in_recent?: boolean;
  show_in_featured?: boolean;
}

// Create a lookup map for mockMovies posters
const mockPosterLookup = new Map(
  mockMovies.map(m => [m.title.toLowerCase(), m.poster])
);

const fetchMoviesFromDB = async (): Promise<DBMovie[]> => {
  const { data: dbMovies, error } = await supabase
    .from("movies")
    .select("id,title,poster_url,year,genre,rating,category,description,video_url,download_url,dubbed,featured,show_in_recent,show_in_featured")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching movies:", error);
    // If the network is weak/offline, keep showing the last successful DB fetch.
    const cached = readMoviesCache();
    if (cached?.movies?.length) return cached.movies;
    return mockMovies as DBMovie[];
  }

  const formattedDbMovies: DBMovie[] = (dbMovies || []).map((movie) => {
    // Use DB poster_url, or fallback to mockData poster if available
    const mockPoster = mockPosterLookup.get(movie.title.toLowerCase());
    const posterUrl = movie.poster_url || mockPoster || "";
    
    return {
      id: movie.id,
      title: movie.title,
      poster: posterUrl,
      year: movie.year,
      genre: movie.genre,
      rating: movie.rating || "N/A",
      category: movie.category as 'movie' | 'tv' | 'trending',
      description: movie.description || "",
      video_url: movie.video_url || "",
      download_url: (movie as any).download_url || "",
      dubbed: movie.dubbed || "",
      featured: movie.featured || false,
      show_in_recent: movie.show_in_recent !== false,
      show_in_featured: (movie as any).show_in_featured || false,
    };
  });

  const dbTitles = new Set(formattedDbMovies.map(m => m.title.toLowerCase()));
  const uniqueMockMovies = mockMovies.filter(
    m => !dbTitles.has(m.title.toLowerCase())
  ) as DBMovie[];

  const merged = [...formattedDbMovies, ...uniqueMockMovies];
  writeMoviesCache(merged);
  return merged;
};

interface UseMoviesOptions {
  enableRealtime?: boolean; // Only enable for admin pages
}

export const useMovies = (options: UseMoviesOptions = {}) => {
  const { enableRealtime = false } = options;
  const queryClient = useQueryClient();

  const cached = useMemo(() => readMoviesCache(), []);

  const { data: movies = [], isLoading: loading, refetch, isFetching } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMoviesFromDB,
    // Always try to fetch admin-added movies from the DB (even if we have cache).
    // Cache is still used as a fallback for weak/offline devices.
    staleTime: 0,
    gcTime: 10 * 60 * 1000, // 10 minutes cache
    refetchOnWindowFocus: false, // Don't refetch on focus for slow connections
    refetchOnReconnect: true, // Refetch when connection restored
    refetchOnMount: 'always', // Always fetch fresh data on mount
    refetchInterval: 60 * 1000, // Keep syncing new admin uploads
    retry: 5,
    retryDelay: (attempt) => Math.min(1500 * 2 ** attempt, 15000),
    initialData: cached?.movies?.length ? cached.movies : undefined,
    initialDataUpdatedAt: cached?.savedAt,
  });

  // Real-time subscription ONLY for admin pages (saves processing on public pages)
  useEffect(() => {
    if (!enableRealtime) return; // Skip for public pages
    
    let debounceTimer: NodeJS.Timeout;
    
    const channel = supabase
      .channel('movies-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'movies' },
        () => {
          // Debounce updates to prevent multiple rapid refetches
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['movies'] });
          }, 2000); // 2 second debounce
        }
      )
      .subscribe();

    return () => {
      clearTimeout(debounceTimer);
      supabase.removeChannel(channel);
    };
  }, [queryClient, enableRealtime]);

  return { movies, loading, refetch, isFetching };
};

// Get related movies (next episode or same genre)
export const getRelatedMovies = (currentMovie: DBMovie, allMovies: DBMovie[], limit = 6): DBMovie[] => {
  if (!currentMovie) return allMovies.slice(0, limit);

  const title = currentMovie.title;
  const related: DBMovie[] = [];

  // Extract series info (e.g., "Shooter S01 E1" -> base: "Shooter", season: 1, episode: 1)
  const seriesMatch = title.match(/(.+?)\s*S(\d+)\s*E(\d+)/i);
  const partMatch = title.match(/(.+?)\s*(Part|P)?\s*([AB]|\d+)$/i);

  if (seriesMatch) {
    const baseName = seriesMatch[1].trim();
    const season = parseInt(seriesMatch[2]);
    const episode = parseInt(seriesMatch[3]);

    // Find next episode
    const nextEpisodeTitle = `${baseName} S${String(season).padStart(2, '0')} E${episode + 1}`;
    const nextEpisode = allMovies.find(m => 
      m.title.toLowerCase().includes(baseName.toLowerCase()) &&
      m.title.toLowerCase().includes(`e${episode + 1}`)
    );

    if (nextEpisode && nextEpisode.id !== currentMovie.id) {
      related.push(nextEpisode);
    }

    // Find other episodes from same series
    const sameSeriesEpisodes = allMovies.filter(m => {
      const otherMatch = m.title.match(/(.+?)\s*S(\d+)\s*E(\d+)/i);
      return otherMatch && 
        otherMatch[1].trim().toLowerCase() === baseName.toLowerCase() &&
        m.id !== currentMovie.id &&
        !related.find(r => r.id === m.id);
    }).sort((a, b) => {
      const aMatch = a.title.match(/E(\d+)/i);
      const bMatch = b.title.match(/E(\d+)/i);
      return (aMatch ? parseInt(aMatch[1]) : 0) - (bMatch ? parseInt(bMatch[1]) : 0);
    });

    related.push(...sameSeriesEpisodes);
  } else if (partMatch) {
    // Handle Part A/B or numbered parts
    const baseName = partMatch[1].trim();
    const currentPart = partMatch[3];

    // Find other parts
    const otherParts = allMovies.filter(m => {
      return m.title.toLowerCase().startsWith(baseName.toLowerCase()) &&
        m.id !== currentMovie.id &&
        !related.find(r => r.id === m.id);
    });

    related.push(...otherParts);
  }

  // Add same genre movies
  const sameGenre = allMovies.filter(m => 
    m.genre.toLowerCase() === currentMovie.genre.toLowerCase() &&
    m.id !== currentMovie.id &&
    !related.find(r => r.id === m.id)
  );
  
  related.push(...sameGenre);

  // Fill remaining with trending
  if (related.length < limit) {
    const trending = allMovies.filter(m => 
      m.category === 'trending' &&
      m.id !== currentMovie.id &&
      !related.find(r => r.id === m.id)
    );
    related.push(...trending);
  }

  return related.slice(0, limit);
};
