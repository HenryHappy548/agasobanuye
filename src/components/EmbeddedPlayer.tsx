import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";

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

const EmbeddedPlayer = ({ movieId, movieTitle, fallbackVideoUrl, fallbackDownloadUrl }: EmbeddedPlayerProps) => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDownloads, setShowDownloads] = useState(false);

  useEffect(() => {
    fetchVideoData();
  }, [movieId]);

  const fetchVideoData = async () => {
    setLoading(true);

    // First try the videos table (legacy - video_key matching)
    const { data: video } = await supabase
      .from("videos")
      .select("*")
      .eq("video_key", movieId)
      .maybeSingle();

    if (video) {
      const { data: links } = await supabase
        .from("download_links")
        .select("*")
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

    // Next try the movies table (CMS movies use UUID)
    const { data: movie } = await supabase
      .from("movies")
      .select("id,title,video_url,download_url,dubbed")
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

    // Fallback to props
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
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="w-full aspect-video bg-card/80 rounded-xl flex items-center justify-center border border-border/50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading video...</span>
        </div>
      </div>
    );
  }

  if (!videoData || !videoData.embedCode) {
    return (
      <div className="w-full aspect-video bg-card/80 rounded-xl flex items-center justify-center border border-border/50">
        <div className="flex flex-col items-center gap-3 text-center p-6">
          <AlertCircle className="h-12 w-12 text-muted-foreground/50" />
          <p className="text-muted-foreground font-medium">Video not available</p>
          <p className="text-sm text-muted-foreground/70">This video will be uploaded soon</p>
        </div>
      </div>
    );
  }

  // Sanitize and prepare embed code
  const sanitizedEmbed = DOMPurify.sanitize(videoData.embedCode, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src', 'width', 'height', 'style']
  });

  return (
    <div className="w-full space-y-4">
      {/* Video Player */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-border/30">
        <div 
          className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
          dangerouslySetInnerHTML={{ __html: sanitizedEmbed }}
        />
      </div>

      {/* Video Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-card to-card/50 rounded-xl border border-border/50">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-primary/20 rounded-full">
            <span className="text-sm font-medium text-primary">{videoData.host}</span>
          </div>
          <span className="text-sm text-muted-foreground">HD Quality</span>
        </div>

        {/* Download Button */}
        {videoData.downloadLinks.length > 0 && (
          <div className="relative">
            <Button
              onClick={() => setShowDownloads(!showDownloads)}
              className="bg-primary hover:bg-primary/90"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>

            {showDownloads && (
              <div className="absolute right-0 top-full mt-2 z-20 min-w-[200px] bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                {videoData.downloadLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-primary" />
                      <span className="font-medium">{link.quality}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {link.size && <span>{link.size}</span>}
                      <span className="text-xs bg-accent px-2 py-0.5 rounded">{link.type}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quality Tip */}
      <div className="px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
        <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
          💡 Niba video ifite ikibazo, gerageza kongeraho ubwiza mu settings ya player
        </p>
      </div>
    </div>
  );
};

export default EmbeddedPlayer;
