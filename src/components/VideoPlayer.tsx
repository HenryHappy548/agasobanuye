import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const VideoPlayer = ({ isOpen, onClose, videoId }: VideoPlayerProps) => {
  // Mock video data
  const getVideoInfo = (id: string) => {
    const videos: Record<string, { title: string; src: string }> = {
      "featured-movie": {
        title: "Shadow Protocol",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      },
      "movie-1": {
        title: "Quantum Edge",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      },
      "movie-2": {
        title: "Midnight in Paris",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
      },
      "movie-3": {
        title: "Desert Storm",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
      }
    };
    return videos[id] || { title: "Unknown", src: "" };
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
              <video
                controls
                autoPlay
                className="w-full h-full rounded-lg"
                poster="/placeholder.svg"
              >
                <source src={videoInfo.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          
          {videoInfo && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {videoInfo.title}
              </h2>
              <p className="text-muted-foreground">
                Enjoy this sample video content. In a real streaming service, this would be connected to your video library.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;