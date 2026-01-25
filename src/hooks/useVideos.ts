import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DBVideo {
  id: string;
  video_key: string;
  title: string;
  embed_code: string;
  host: string | null;
  thumbnail_url: string | null;
  season: number | null;
  episode: number | null;
}

export interface DownloadLink {
  id: string;
  video_id: string;
  quality: string;
  size: string | null;
  url: string;
  type: string;
}

// Fetch all videos with caching
const fetchVideosFromDB = async (): Promise<DBVideo[]> => {
  const { data, error } = await supabase
    .from("videos")
    .select("id, video_key, title, embed_code, host, thumbnail_url, season, episode")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }

  return data || [];
};

// Fetch all download links with caching
const fetchDownloadLinksFromDB = async (): Promise<DownloadLink[]> => {
  const { data, error } = await supabase
    .from("download_links")
    .select("id, video_id, quality, size, url, type")
    .order("quality");

  if (error) {
    console.error("Error fetching download links:", error);
    return [];
  }

  return data || [];
};

// Main hook for videos with React Query caching
export const useVideos = () => {
  const queryClient = useQueryClient();

  const { data: videos = [], isLoading: loading, refetch, isFetching } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideosFromDB,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes cache
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });

  // Real-time subscription with debounce
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    
    const channel = supabase
      .channel('videos-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'videos' },
        () => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['videos'] });
          }, 2000);
        }
      )
      .subscribe();

    return () => {
      clearTimeout(debounceTimer);
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { videos, loading, refetch, isFetching };
};

// Hook for download links with caching
export const useDownloadLinks = () => {
  const queryClient = useQueryClient();

  const { data: downloadLinks = [], isLoading: loading, refetch, isFetching } = useQuery({
    queryKey: ['download-links'],
    queryFn: fetchDownloadLinksFromDB,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });

  // Real-time subscription with debounce
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    
    const channel = supabase
      .channel('download-links-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'download_links' },
        () => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['download-links'] });
          }, 2000);
        }
      )
      .subscribe();

    return () => {
      clearTimeout(debounceTimer);
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { downloadLinks, loading, refetch, isFetching };
};

// Get download links for a specific video from cached data
export const getVideoDownloadLinks = (videoId: string, allLinks: DownloadLink[]): DownloadLink[] => {
  return allLinks.filter(link => link.video_id === videoId);
};

// Find video by key or ID from cached data
export const findVideo = (key: string, allVideos: DBVideo[]): DBVideo | undefined => {
  return allVideos.find(v => v.video_key === key || v.id === key);
};
