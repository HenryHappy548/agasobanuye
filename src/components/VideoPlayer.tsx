import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const VideoPlayer = ({ isOpen, onClose, videoId }: VideoPlayerProps) => {
  // Streamtape video data - using Streamtape embed codes
  const getVideoInfo = (id: string) => {
    const videos: Record<string, { title: string; embedUrl: string }> = {
      "featured-movie": {
        title: "Weapons (2025)",
        embedUrl: "https://streamtape.com/e/pxY2w08gMpFrrzl/" // Example Streamtape embed URL
      },
      "movie-1": {
        title: "Freakier Friday (2025)",
        embedUrl: "https://streamtape.com/e/your-streamtape-id-1/"
      },
      "movie-2": {
        title: "Relay (2024)",
        embedUrl: "https://streamtape.com/e/your-streamtape-id-2/"
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        embedUrl: "https://streamtape.com/e/your-streamtape-id-3/"
      },
      "movie-4": {
        title: "Fantastic Four",
        embedUrl: "https://streamtape.com/e/your-streamtape-id-4/"
      },
      "movie-5": {
        title: "I Kill You Ep1",
        embedUrl: "https://streamtape.com/v/pxY2w08gMpFrrzl/I.Kill.You.S01E01.%28NKIRI.COM%29.mkv
"
      }
    };
    return videos[id] || { title: "Unknown", embedUrl: "" };
  };

  const videoInfo = videoId ? getVideoInfo(videoId) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-background border-border">
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
            <div className="aspect-video">
              <iframe
                src={videoInfo.embedUrl}
                className="w-full h-full rounded-lg border-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={videoInfo.title}
              />
            </div>
          )}
          
          {videoInfo && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {videoInfo.title}
              </h2>
              <p className="text-muted-foreground">
                Streaming via Streamtape.com
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
