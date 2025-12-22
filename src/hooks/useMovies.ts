import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { mockMovies, Movie } from "@/data/mockData";

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
}

// Merge Supabase movies with mock movies
export const useMovies = () => {
  // Initialize with mock data immediately for instant display
  const [movies, setMovies] = useState<DBMovie[]>(mockMovies as DBMovie[]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    fetchMovies();
    
    // Real-time subscription for new movies
    const channel = supabase
      .channel('movies-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'movies' },
        () => {
          console.log('Real-time update detected, refetching movies...');
          fetchMovies();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMovies = async () => {
    hasFetched.current = true;
    try {
      console.log('Fetching movies from database...');
      const { data: dbMovies, error } = await supabase
        .from("movies")
        .select("id,title,poster_url,year,genre,rating,category,description,video_url,download_url,dubbed,featured")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching movies:", error);
        // Keep mock movies on error
        setMovies(mockMovies as DBMovie[]);
      } else {
        console.log(`Fetched ${dbMovies?.length || 0} movies from CMS`);
        
        // Convert DB movies to our format
        const formattedDbMovies: DBMovie[] = (dbMovies || []).map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_url || "",
          year: movie.year,
          genre: movie.genre,
          rating: movie.rating || "N/A",
          category: movie.category as 'movie' | 'tv' | 'trending',
          description: movie.description || "",
          video_url: movie.video_url || "",
          download_url: movie.download_url || "",
          dubbed: movie.dubbed || "",
          featured: movie.featured || false,
        }));

        // Merge: DB movies first, then mock movies (avoiding duplicates by title)
        const dbTitles = new Set(formattedDbMovies.map(m => m.title.toLowerCase()));
        const uniqueMockMovies = mockMovies.filter(
          m => !dbTitles.has(m.title.toLowerCase())
        ) as DBMovie[];

        const mergedMovies = [...formattedDbMovies, ...uniqueMockMovies];
        console.log(`Total movies: ${mergedMovies.length} (${formattedDbMovies.length} CMS + ${uniqueMockMovies.length} mock)`);
        setMovies(mergedMovies);
      }
    } catch (err) {
      console.error("Error:", err);
      setMovies(mockMovies as DBMovie[]);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, refetch: fetchMovies };
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
