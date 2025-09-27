import { X, ExternalLink, Monitor, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect, useRef } from "react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const VideoPlayer = ({ isOpen, onClose, videoId }: VideoPlayerProps) => {
  const [activeTab, setActiveTab] = useState<'embed' | 'direct'>('embed');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video data with multiple embed options
  const getVideoInfo = (id: string) => {
    const videos: Record<string, { 
      title: string; 
      embedUrl: string;
      directUrl: string;
      fallbackUrl: string;
      host: string;
      aspectRatio: string;
    }> = {
      "featured-movie": {
        title: "Weapons (2025)",
        embedUrl: "https://ok.ru/video/embed/9496103422476",
        directUrl: "https://ok.ru/video/9496103422476",
        fallbackUrl: "https://example.com/fallback/weapons.mp4",
        host: "OK.ru",
        aspectRatio: "16/9"
      },
      "movie-1": {
        title: "Freakier Friday (2025)",
        embedUrl: "https://www.dailymotion.com/embed/video/x8y9z0a",
        directUrl: "https://web.wootly.ch/source?id=796e0bef3a9b1d92c8e35c360ca86d9570db6167",
        fallbackUrl: "https://example.com/fallback/freakier-friday.mp4",
        host: "Wootly",
        aspectRatio: "16/9"
      },
      "movie-2": {
        title: "Relay (2024)",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        directUrl: "https://web.wootly.ch/source?id=84ed344ebe262fcbabbb3633d685655854760115",
        fallbackUrl: "https://example.com/fallback/relay.mp4",
        host: "Wootly",
        aspectRatio: "16/9"
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        embedUrl: "https://hglink.to/np131q6tst6i",
        directUrl: "https://media.agasobanuyenow.com/The%20Naked%20Gun.mp4",
        fallbackUrl: "https://media.agasobanuyenow.com/The%20Naked%20Gun.mp4",
        host: "Direct Stream",
        aspectRatio: "16/9"
      },
      "movie-4": {
        title: "Fantastic Four",
        embedUrl: "https://hglink.to/np131q6tst6i",
        directUrl: "https://web.wootly.ch/source?id=b5424a44e305c99a7e580c5d622d52225b30f0d2",
        fallbackUrl: "https://example.com/fallback/fantastic-four.mp4",
        host: "Wootly",
        aspectRatio: "16/9"
      },
      "movie-5": {
        title: "I Kill You Ep1",
        embedUrl: "https://hglink.to/e/np131q6tst6i",
        directUrl: "https://streamtape.com/v/pxY2w08gMpFrrzl/I.Kill.You.S01E01.mkv",
        fallbackUrl: "https://example.com/fallback/i-kill-you.mp4",
        host: "StreamTape",
        aspectRatio: "16/9"
      }
    };
    return videos[id] || { 
      title: "Unknown", 
      embedUrl: "", 
      directUrl: "", 
      fallbackUrl: "", 
      host: "Unknown",
      aspectRatio: "16/9"
    };
  };

  const videoInfo = videoId ? getVideoInfo(videoId) : null;

  // Reset loading state when dialog opens or source changes
  useEffect(() => {
    if (isOpen && videoInfo) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen, videoInfo, activeTab]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const renderVideoPlayer = () => {
    if (!videoInfo) return null;

    if (activeTab === 'embed' && videoInfo.embedUrl) {
      return (
        <iframe
          ref={iframeRef}
          src={videoInfo.embedUrl}
          className="w-full h-full rounded-lg border-0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={videoInfo.title}
          loading="eager"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      );
    } else {
      return (
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full h-full rounded-lg"
          poster="/placeholder.svg"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src={videoInfo.directUrl} type="video/mp4" />
          <source src={videoInfo.fallbackUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full p-0 bg-black border-border">
        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-3 right-3 z-10 bg-black/80 hover:bg-black text-white"
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
                {renderVideoPlayer()}
                
                {/* Loading Overlay - Only show when loading */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80">
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
                {hasError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                    <div className="text-white text-center">
                      <X className="h-12 w-12 mx-auto mb-2 text-red-500" />
                      <p className="text-red-400">Failed to load video</p>
                      <p className="text-sm text-gray-300 mt-1">
                        Try switching to {activeTab === 'embed' ? 'direct' : 'embed'} mode
                      </p>
                      <Button
                        variant="outline"
                        className="mt-3 text-white border-white/30"
                        onClick={() => setActiveTab(activeTab === 'embed' ? 'direct' : 'embed')}
                      >
                        Switch to {activeTab === 'embed' ? 'Direct' : 'Embed'} Mode
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls and Info */}
              <div className="p-4 bg-gray-900 text-white">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold">{videoInfo.title}</h2>
                  <div className="flex gap-2">
                    <Button
                      variant={activeTab === 'embed' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab('embed')}
                      className="text-white"
                      disabled={isLoading}
                    >
                      <Monitor className="h-4 w-4 mr-1" />
                      Embed
                    </Button>
                    <Button
                      variant={activeTab === 'direct' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab('direct')}
                      className="text-white"
                      disabled={isLoading}
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Direct
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <span>Host: {videoInfo.host} • Mode: {activeTab}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(
                      activeTab === 'embed' ? videoInfo.embedUrl : videoInfo.directUrl, 
                      '_blank'
                    )}
                    className="text-white border-white/30"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Open Original
                  </Button>
                </div>

                {/* Status Indicator */}
                <div className="mt-2 text-xs">
                  {isLoading ? (
                    <span className="text-yellow-400">🔄 Loading...</span>
                  ) : hasError ? (
                    <span className="text-red-400">❌ Load failed</span>
                  ) : (
                    <span className="text-green-400">✅ Loaded successfully</span>
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
