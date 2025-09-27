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
  const [activeTab, setActiveTab] = useState<'embed' | 'direct'>('embed');
  const [isLoaded, setIsLoaded] = useState(false);

  const getVideoInfo = (id: string) => {
    const videos: Record<string, { 
      title: string; 
      embedUrl: string;
      directUrl: string;
      host: string;
    }> = {
      "featured-movie": {
        title: "Weapons (2025)",
        embedUrl: "https://ok.ru/video/embed/9496103422476",
        directUrl: "https://ok.ru/video/9496103422476",
        host: "OK.ru"
      },
      "movie-5": {
        title: "I Kill You Ep1",
        embedUrl: "https://streamtape.com/e/pxY2w08gMpFrrzl/",
        directUrl: "https://streamtape.com/v/pxY2w08gMpFrrzl/I.Kill.You.S01E01.mkv",
        host: "StreamTape"
      }
    };
    return videos[id] || { title: "Unknown", embedUrl: "", directUrl: "", host: "Unknown" };
  };

  const videoInfo = videoId ? getVideoInfo(videoId) : null;

  useEffect(() => {
    if (isOpen) {
      setIsLoaded(false);
      // Auto-hide loading after 3 seconds as fallback
      const timer = setTimeout(() => setIsLoaded(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab]);

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
              <div className="relative bg-black" style={{ aspectRatio: "16/9" }}>
                {activeTab === 'embed' ? (
                  <iframe
                    src={videoInfo.embedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title={videoInfo.title}
                    onLoad={() => setIsLoaded(true)}
                  />
                ) : (
                  <video
                    controls
                    autoPlay
                    className="w-full h-full"
                    onLoadedData={() => setIsLoaded(true)}
                  >
                    <source src={videoInfo.directUrl} type="video/mp4" />
                  </video>
                )}

                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="text-white text-center">
                      <Video className="h-12 w-12 mx-auto mb-2 animate-pulse" />
                      <p>Loading {videoInfo.title}...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-900 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{videoInfo.title}</h2>
                  <div className="flex gap-2">
                    <Button
                      variant={activeTab === 'embed' ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setActiveTab('embed'); setIsLoaded(false); }}
                      className="text-white"
                    >
                      <Monitor className="h-4 w-4 mr-1" />
                      Embed
                    </Button>
                    <Button
                      variant={activeTab === 'direct' ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setActiveTab('direct'); setIsLoaded(false); }}
                      className="text-white"
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Direct
                    </Button>
                  </div>
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
