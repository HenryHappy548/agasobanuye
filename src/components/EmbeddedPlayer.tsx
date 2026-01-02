import { useState, useEffect, useMemo, memo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download, AlertCircle, Settings } from "lucide-react";
import DOMPurify from "dompurify";
import { getStaticVideoData } from "@/data/staticVideoData";
import RecommendedMovies from "./RecommendedMovies";

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

  // Check static data first (instant, no network)
  const staticData = useMemo(() => getStaticVideoData(movieId), [movieId]);

  useEffect(() => {
    if (staticData) {
      setVideoData(staticData);
      setLoading(false);
      return;
    }
    fetchVideoData();
  }, [movieId, staticData]);

  const fetchVideoData = async () => {
    setLoading(true);

    try {
      const { data: video } = await supabase
        .from("videos")
        .select("id, title, embed_code, host")
        .eq("video_key", movieId)
        .maybeSingle();

      if (video) {
        const { data: links } = await supabase
          .from("download_links")
          .select("quality, size, url, type")
          .eq("video_id", video.id);

        setVideoData({
          title: video.title,
          embedCode: video.embed_code,
          host: video.host || "Rwaflix",
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

      const { data: movie } = await supabase
        .from("movies")
        .select("title, video_url, download_url, dubbed")
        .eq("id", movieId)
        .maybeSingle();

      if (movie && movie.video_url) {
        const downloadLinks: DownloadLink[] = movie.download_url
          ? [{ quality: "HD", size: "", url: movie.download_url, type: "MP4" }]
          : [];

        setVideoData({
          title: movie.title,
          embedCode: movie.video_url,
          host: movie.dubbed || "Rwaflix",
          downloadLinks,
        });
        setLoading(false);
        return;
      }

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

      {/* Quality Tip - Compact below video */}
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg text-xs text-muted-foreground">
        <Settings className="h-3 w-3 flex-shrink-0" />
        <span>Ibibazo? Hindura quality mu settings (⚙️) ya video player.</span>
      </div>

      {/* Download Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/30">
        <div className="flex items-center gap-2">
          <Download className="h-5 w-5 text-green-500" />
          <span className="font-semibold text-foreground text-sm">Download</span>
        </div>

        {videoData.downloadLinks.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {videoData.downloadLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-all text-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{link.quality}</span>
                {link.size && <span className="text-xs opacity-80">({link.size})</span>}
              </a>
            ))}
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">Coming soon</span>
        )}
      </div>

      {/* Host Badge - Minimal */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="px-2 py-0.5 bg-primary/10 rounded text-primary font-medium">{videoData.host}</span>
        <span>• HD</span>
      </div>

      {/* Recommended - Cleaner */}
      <RecommendedMovies currentMovieId={movieId} currentMovieTitle={movieTitle} />
    </div>
  );
});

EmbeddedPlayer.displayName = 'EmbeddedPlayer';

export default EmbeddedPlayer;