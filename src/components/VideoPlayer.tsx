import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const VideoPlayer = ({ isOpen, onClose, videoId }: VideoPlayerProps) => {
  // Video data with full embed codes
  const getVideoInfo = (id: string) => {
    const videos: Record<string, { 
      title: string; 
      embedCode: string;
      host: string;
    }> = {
      "featured-movie": {
        title: "Weapons (2025)",
        embedCode: '<iframe src="https://hglink.to/e/np131q6tst6i" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link"
      },
      "movie-1": {
        title: "Freakier Friday (2025)",
        embedCode: '<iframe src="https://hglink.to/e/abc123" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link"
      },
      "movie-2": {
        title: "Relay (2024)",
        embedCode: '<iframe src="https://hglink.to/e/def456" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link"
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        embedCode: '<IFRAME SRC="https://hglink.to/e/np131q6tst6i" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=1280 HEIGHT=1080 allowfullscreen></IFRAME>' 
      },
      "movie-4": {
        title: "Fantastic Four",
        embedCode: '<iframe src="https://hglink.to/e/jkl012" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link"
      },
      "movie-5": {
        title: "I Kill You Ep1",
        embedCode: '<iframe src="https://hglink.to/e/mno345" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link"
      }
    };
    return videos[id] || { 
      title: "Unknown", 
      embedCode: "", 
      host: "Unknown"
    };
  };

  const videoInfo = videoId ? getVideoInfo(videoId) : null;

  // Extract just the src URL from the embed code
  const getSrcFromEmbedCode = (embedCode: string) => {
    const srcMatch = embedCode.match(/src="([^"]*)"/);
    return srcMatch ? srcMatch[1] : "";
  };

  // Extract all attributes from embed code
  const getIframeAttributes = (embedCode: string) => {
    const src = getSrcFromEmbedCode(embedCode);
    const widthMatch = embedCode.match(/width=(\d+)/);
    const heightMatch = embedCode.match(/height=(\d+)/);
    
    return {
      src,
      width: widthMatch ? widthMatch[1] : "100%",
      height: heightMatch ? heightMatch[1] : "100%"
    };
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
              <div className="relative bg-black flex items-center justify-center min-h-[500px]">
                <div 
                  className="w-full max-w-4xl"
                  dangerouslySetInnerHTML={{ __html: videoInfo.embedCode }}
                />
              </div>

              {/* Video Info */}
              <div className="p-4 bg-gray-900 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{videoInfo.title}</h2>
                  <span className="text-sm text-gray-300">
                    Host: {videoInfo.host}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-300">
                    Embedded Player
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(getSrcFromEmbedCode(videoInfo.embedCode), '_blank')}
                    className="text-white border-white/30"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Open Original
                  </Button>
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
