import { useState, useEffect, useMemo, memo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download, AlertCircle, Settings } from "lucide-react";
import DOMPurify from "dompurify";
import { getStaticVideoData } from "@/data/staticVideoData";
import SupportButton from "./SupportButton";
import RewardedAdButton from "./RewardedAdButton";
import { useQueryClient } from "@tanstack/react-query";
import { getCachedMovieById } from "@/lib/moviesCache";

// Ensure URL has proper protocol prefix
const normalizeUrl = (url: string): string => {
  if (!url) return url;
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

interface DownloadLink {
  quality: string;
  size: string | null;
  url: string;
  type: string;
}

interface VideoData {
  title: string;
  embedCode: string;
  host: string;
  downloadLinks: DownloadLink[];
}

interface EmbeddedPlayerProps {
  movieId: string;
  movieTitle: string;
  fallbackVideoUrl?: string;
  fallbackDownloadUrl?: string;
}

const EmbeddedPlayer = memo(({ movieId, movieTitle, fallbackVideoUrl, fallbackDownloadUrl }: EmbeddedPlayerProps) => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  // Check static data first (instant, no network)
  const staticData = useMemo(() => getStaticVideoData(movieId), [movieId]);

  // Try to get cached data first
  const getCachedVideoData = () => {
    const cachedVideos = queryClient.getQueryData<any[]>(['videos']);
    const cachedLinks = queryClient.getQueryData<any[]>(['download-links']);
    
    if (cachedVideos && cachedLinks) {
      const video = cachedVideos.find(v => v.video_key === movieId || v.id === movieId);
      if (video) {
        const links = cachedLinks.filter(l => l.video_id === video.id);
        return {
          title: video.title,
          embedCode: video.embed_code,
          host: video.host || "Rwaflix",
          downloadLinks: links.map((link: any) => ({
            quality: link.quality,
            size: link.size || "",
            url: link.url,
            type: link.type || "MP4",
          })),
        };
      }
    }
    return null;
  };

  useEffect(() => {
    // 1. Static data (instant)
    if (staticData) {
      setVideoData(staticData);
      setLoading(false);
      return;
    }

    // 2. Try cached data first (instant)
    const cachedData = getCachedVideoData();
    if (cachedData) {
      setVideoData(cachedData);
      setLoading(false);
      return;
    }

    // 2.5 Local persistent cache (helps weak/offline devices show admin-uploaded movies)
    type CachedMovie = {
      id: string;
      title?: string;
      video_url?: string;
      download_url?: string;
      dubbed?: string;
    };
    const cachedMovie = getCachedMovieById<CachedMovie>(movieId);
    if (cachedMovie?.video_url) {
      const downloadLinks: DownloadLink[] = cachedMovie.download_url
        ? [{ quality: "HD", size: "", url: cachedMovie.download_url, type: "MP4" }]
        : [];

      setVideoData({
        title: cachedMovie.title || movieTitle,
        embedCode: cachedMovie.video_url,
        host: cachedMovie.dubbed || "Rwaflix",
        downloadLinks,
      });
      setLoading(false);
      return;
    }

    // 3. Fetch from DB only if no cache
    fetchVideoData();
  }, [movieId, staticData]);

  const fetchVideoData = async () => {
    setLoading(true);

    try {
      // Parallel fetch for faster loading
      const [videoResult, movieResult] = await Promise.all([
        supabase
          .from("videos")
          .select("id, title, embed_code, host")
          .eq("video_key", movieId)
          .maybeSingle(),
        supabase
          .from("movies")
          .select("title, video_url, download_url, dubbed")
          .eq("id", movieId)
          .maybeSingle()
      ]);

      // Check videos table first
      if (videoResult.data) {
        const { data: links } = await supabase
          .from("download_links")
          .select("quality, size, url, type")
          .eq("video_id", videoResult.data.id);

        setVideoData({
          title: videoResult.data.title,
          embedCode: videoResult.data.embed_code,
          host: videoResult.data.host || "Rwaflix",
          downloadLinks: (links || []).map(link => ({
            quality: link.quality,
            size: link.size || "",
            url: link.url,
            type: link.type || "MP4",
          })),
        });
        setLoading(false);
        return;
      }

      // Check movies table
      if (movieResult.data && movieResult.data.video_url) {
        const downloadLinks: DownloadLink[] = movieResult.data.download_url
          ? [{ quality: "HD", size: "", url: movieResult.data.download_url, type: "MP4" }]
          : [];

        setVideoData({
          title: movieResult.data.title,
          embedCode: movieResult.data.video_url,
          host: movieResult.data.dubbed || "Rwaflix",
          downloadLinks,
        });
        setLoading(false);
        return;
      }

      // Use fallbacks
      if (fallbackVideoUrl) {
        const downloadLinks: DownloadLink[] = fallbackDownloadUrl
          ? [{ quality: "HD", size: "", url: fallbackDownloadUrl, type: "MP4" }]
          : [];

        setVideoData({
          title: movieTitle,
          embedCode: fallbackVideoUrl,
          host: "Rwaflix",
          downloadLinks,
        });
      } else {
        setVideoData(null);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
      setVideoData(null);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="w-full aspect-video max-h-[50vh] bg-card/80 rounded-lg flex items-center justify-center border border-border/50">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!videoData || !videoData.embedCode) {
    return (
      <div className="w-full aspect-video max-h-[50vh] bg-card/80 rounded-lg flex items-center justify-center border border-border/50">
        <div className="flex flex-col items-center gap-2 text-center p-4">
          <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-muted-foreground text-sm">Video coming soon</p>
        </div>
      </div>
    );
  }

  const isIframe = videoData.embedCode.includes('<iframe');
  
  let sanitizedEmbed = '';
  if (isIframe) {
    sanitizedEmbed = DOMPurify.sanitize(videoData.embedCode, {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src', 'width', 'height', 'style']
    });
  } else {
    const videoUrl = videoData.embedCode.trim();
    sanitizedEmbed = `<iframe src="${videoUrl}" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
  }

  return (
    <div className="w-full space-y-3">
      {/* Video Player */}
      <div className="relative w-full aspect-video max-h-[55vh] bg-black rounded-xl overflow-hidden shadow-lg border border-primary/20">
        <div 
          className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
          dangerouslySetInnerHTML={{ __html: sanitizedEmbed }}
        />
      </div>

      {/* Quality Tip + HD Unlock */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-3 py-2 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Settings className="h-3 w-3 flex-shrink-0" />
          <span>Ibibazo? Hindura quality mu settings (⚙️) ya video player.</span>
        </div>
        <RewardedAdButton variant="inline" />
      </div>

      {/* Download Section */}
      {videoData.downloadLinks.length > 0 ? (
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-lg text-foreground">Download</h3>
              <p className="text-sm text-muted-foreground">Kurura filime hano</p>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {videoData.downloadLinks.map((link, index) => (
                <a
                  key={index}
                  href={normalizeUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-colors text-base min-w-[140px]"
                >
                  <Download className="h-4 w-4" />
                  <span>Kurura {link.quality}</span>
                  {link.size && <span className="text-sm font-semibold">({link.size})</span>}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 p-3 bg-muted/30 rounded-xl border border-border/50">
          <Download className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">Download coming soon</span>
        </div>
      )}

      {/* Host Badge + Support - Minimal */}
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-primary/10 rounded text-primary font-medium">{videoData.host}</span>
          <span>• HD</span>
        </div>
        <SupportButton variant="compact" />
      </div>

    </div>
  );
});

EmbeddedPlayer.displayName = 'EmbeddedPlayer';

export default EmbeddedPlayer;