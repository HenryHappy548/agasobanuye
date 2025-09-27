import { X, ExternalLink, Monitor, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const VideoPlayer = ({ isOpen, onClose, videoId }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Video data with only embed options
  const getVideoInfo = (id: string) => {
    const videos: Record<string, { 
      title: string; 
      embedUrl: string;
      host: string;
      aspectRatio: string;
    }> = {
      "featured-movie": {
        title: "Weapons (2025)",
        embedUrl: "https://ok.ru/video/embed/9496103422476",
        host: "OK.ru",
        aspectRatio: "16/9"
      },
      "movie-1": {
        title: "Freakier Friday (2025)",
        embedUrl: "https://www.dailymotion.com/embed/video/x8y9z0a",
        host: "Dailymotion",
        aspectRatio: "16/9"
      },
      "movie-2": {
        title: "Relay (2024)",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        host: "YouTube",
        aspectRatio: "16/9"
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        embedUrl: "https://hglink.to/np131q6tst6i",
        host: "StreamTape",
        aspectRatio: "16/9"
      },
      "movie-4": {
        title: "Fantastic Four",
        embedUrl: "https://streamtape.com/e/your-video-id-here/",
        host: "StreamTape",
        aspectRatio: "16/9"
      },
      "movie-5": {
        title: "I Kill You Ep1",
        embedUrl: "https://streamtape.com/e/pxY2w08gMpFrrzl/",
        host: "StreamTape",
        aspectRatio: "16/9"
      }
    };
    return videos[id] || { 
      title: "Unknown", 
      embedUrl: "", 
      host: "Unknown",
      aspectRatio: "16/9"
    };
  };

  const videoInfo = videoId ? getVideoInfo(videoId) : null;

  // Reset loading state when dialog opens or video changes
  useEffect(() => {
    if (isOpen && videoInfo) {
      setIsLoading(true);
      setHasError(false);
      
      // Fallback: hide loading after 5 seconds if iframe doesn't load
      const fallbackTimer = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
          setHasError(true);
        }
      }, 5000);

      return () => clearTimeout(fallbackTimer);
    }
  }, [isOpen, videoInfo]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full p-0 bg-black border-border">
        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-3 right-3 z-20 bg-black/80 hover:bg-black text-white"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          
          {videoInfo && (
            <>
              {/* Video Player Area */}
              <div 
                className="relative bg-black"
                style={{ aspectRatio: videoInfo.aspectRatio }}
              >
                <iframe
                  src={videoInfo.embedUrl}
                  className="w-full h-full rounded-lg border-0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={videoInfo.title}
                  loading="eager"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                />
                
                {/* Loading Overlay - Only show when loading */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                    <div className="text-white text-center">
                      <Video className="h-12 w-12 mx-auto mb-2 animate-pulse" />
                      <p>Loading {videoInfo.title}...</p>
                      <p className="text-sm text-gray-300 mt-1">
                        From {videoInfo.host}
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Overlay - Only show when there's an error */}
                {hasError && !isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                    <div className="text-white text-center">
                      <X className="h-12 w-12 mx-auto mb-2 text-red-500" />
                      <p className="text-red-400">Failed to load video</p>
                      <p className="text-sm text-gray-300 mt-1">
                        The video may be unavailable or blocked
                      </p>
                      <Button
                        variant="outline"
                        className="mt-3 text-white border-white/30"
                        onClick={() => window.open(videoInfo.embedUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open in New Tab
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls and Info */}
              <div className="p-4 bg-gray-900 text-white">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold">{videoInfo.title}</h2>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-gray-300">Embed Mode</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <span>Host: {videoInfo.host}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(videoInfo.embedUrl, '_blank')}
                    className="text-white border-white/30"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Open Original
                  </Button>
                </div>

                {/* Status Indicator */}
                <div className="mt-2 text-xs">
                  {isLoading ? (
                    <span className="text-yellow-400">🔄 Loading video from {videoInfo.host}...</span>
                  ) : hasError ? (
                    <span className="text-red-400">❌ Failed to load video</span>
                  ) : (
                    <span className="text-green-400">✅ Video loaded successfully</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
