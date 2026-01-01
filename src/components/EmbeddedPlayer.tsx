import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download, AlertCircle } from "lucide-react";
import DOMPurify from "dompurify";
import { getStaticVideoData, hasStaticVideoData } from "@/data/staticVideoData";
import { mockMovies } from "@/data/mockData";
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

const EmbeddedPlayer = ({ movieId, movieTitle, fallbackVideoUrl, fallbackDownloadUrl }: EmbeddedPlayerProps) => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);

  // Check static data first (instant, no network)
  const staticData = useMemo(() => getStaticVideoData(movieId), [movieId]);
  
  // Also check if this is a mock movie (has local poster)
  const mockMovie = useMemo(() => 
    mockMovies.find(m => m.id === movieId), 
    [movieId]
  );

  useEffect(() => {
    // If we have static video data, use it immediately
    if (staticData) {
      setVideoData(staticData);
      setLoading(false);
      return;
    }

    // Otherwise fetch from database
    fetchVideoData();
  }, [movieId, staticData]);

  const fetchVideoData = async () => {
    setLoading(true);

    try {
      // First try the videos table (legacy - video_key matching)
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

      // Next try the movies table (CMS movies use UUID)
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
    } catch (error) {
      console.error("Error fetching video data:", error);
      setVideoData(null);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="w-full aspect-video max-h-[50vh] bg-card/80 rounded-lg flex items-center justify-center border border-border/50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  if (!videoData || !videoData.embedCode) {
    return (
      <div className="w-full aspect-video max-h-[50vh] bg-card/80 rounded-lg flex items-center justify-center border border-border/50">
        <div className="flex flex-col items-center gap-2 text-center p-4">
          <AlertCircle className="h-10 w-10 text-muted-foreground/50" />
          <p className="text-muted-foreground font-medium">Video not available</p>
          <p className="text-xs text-muted-foreground/70">This video will be uploaded soon</p>
        </div>
      </div>
    );
  }

  // Check if embedCode is already an iframe or just a URL
  const isIframe = videoData.embedCode.includes('<iframe');
  
  let sanitizedEmbed = '';
  if (isIframe) {
    sanitizedEmbed = DOMPurify.sanitize(videoData.embedCode, {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src', 'width', 'height', 'style']
    });
  } else {
    // If it's just a URL, create an iframe
    const videoUrl = videoData.embedCode.trim();
    sanitizedEmbed = `<iframe src="${videoUrl}" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
  }

  return (
    <div className="w-full space-y-4">
      {/* Video Player - Compact */}
      <div className="relative w-full aspect-video max-h-[55vh] bg-black rounded-xl overflow-hidden shadow-xl border border-primary/20">
        <div 
          className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
          dangerouslySetInnerHTML={{ __html: sanitizedEmbed }}
        />
      </div>

      {/* Download Section - Prominent */}
      <div className="bg-gradient-to-r from-green-500/20 via-green-600/10 to-green-500/20 p-4 rounded-xl border-2 border-green-500/40 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center">
              <Download className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Download</h3>
              <p className="text-xs text-muted-foreground">Save for offline</p>
            </div>
          </div>

          {videoData.downloadLinks.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {videoData.downloadLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-md"
                >
                  <Download className="h-4 w-4" />
                  <span>{link.quality}</span>
                  {link.size && <span className="text-xs opacity-80">({link.size})</span>}
                </a>
              ))}
            </div>
          ) : (
            <div className="px-4 py-2 bg-muted/50 text-muted-foreground rounded-lg text-sm">
              Coming soon
            </div>
          )}
        </div>
      </div>

      {/* Host Badge */}
      <div className="flex items-center gap-2 text-sm">
        <span className="px-3 py-1 bg-primary/20 rounded-full text-primary font-medium">
          {videoData.host}
        </span>
        <span className="text-muted-foreground">• HD Quality</span>
      </div>

      {/* Recommended Movies */}
      <RecommendedMovies currentMovieId={movieId} currentMovieTitle={movieTitle} />
    </div>
  );
};

export default EmbeddedPlayer;
