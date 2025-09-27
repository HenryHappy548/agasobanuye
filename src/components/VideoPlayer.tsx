import { X, ExternalLink, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const VideoPlayer = ({ isOpen, onClose, videoId }: VideoPlayerProps) => {
  const getVideoInfo = (id: string) => {
    const videos: Record<string, { title: string; url: string; host: string }> = {
      "featured-movie": { title: "Weapons (2025)", url: "https://short.icu/126LceIOT", host: "obyss.to" },
      "movie-1": { title: "Freakier Friday (2025)", url: "https://web.wootly.ch/source?id=796e0bef3a9b1d92c8e35c360ca86d9570db6167&sig=XUnZKcq7V7jVlKeylFu9sA&expire=1758929815&ofs=11&usr=195111", host: "Wootly" },
      "movie-2": { title: "Relay (2024)", url: "https://web.wootly.ch/source?id=84ed344ebe262fcbabbb3633d685655854760115&sig=rZGY3aPBFanZjWGfrrExYQ&expire=1758929761&ofs=11&usr=195096", host: "Wootly" },
      "movie-3": { title: "Naked Gun (2025)", url: "https://media.agasobanuyenow.com/The%20Naked%20Gun.mp4", host: "Direct Video" },
      "movie-4": { title: "Fantastic Four", url: "https://web.wootly.ch/source?id=b5424a44e305c99a7e580c5d622d52225b30f0d2&sig=h9eYaHWKUAyBcuoTlCagCA&expire=1758929526&ofs=11&usr=195119", host: "Wootly" },
      "movie-5": { title: "I Kill You Ep1", url: "https://streamtape.com/v/pxY2w08gMpFrrzl/I.Kill.You.S01E01.%28NKIRI.COM%29.mkv", host: "StreamTape" }
    };
    return videos[id] || { title: "Unknown", url: "", host: "Unknown" };
  };

  const videoInfo = videoId ? getVideoInfo(videoId) : null;

  const openInNewTab = () => {
    if (videoInfo?.url) {
      window.open(videoInfo.url, '_blank', 'noopener,noreferrer');
    }
  };

  const openInSameTab = () => {
    if (videoInfo?.url) {
      window.location.href = videoInfo.url;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full p-0 bg-background border-border">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {videoInfo && (
            <div className="p-6 pt-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {videoInfo.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {videoInfo.host}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button
                  onClick={openInNewTab}
                  className="flex flex-col h-16 gap-1"
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-xs">New Tab</span>
                </Button>

                <Button
                  onClick={openInSameTab}
                  className="flex flex-col h-16 gap-1"
                  variant="outline"
                >
                  <Play className="h-4 w-4" />
                  <span className="text-xs">Current Tab</span>
                </Button>

                <Button
                  onClick={() => window.open(videoInfo.url, '_blank', 'noopener,noreferrer')}
                  className="flex flex-col h-16 gap-1 col-span-2"
                  variant="default"
                >
                  <Download className="h-4 w-4" />
                  <span className="text-xs">Download</span>
                </Button>
              </div>

              <Button
                onClick={onClose}
                variant="ghost"
                className="w-full"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
