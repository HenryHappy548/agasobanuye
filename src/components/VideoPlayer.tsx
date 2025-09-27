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
        title: "Weapons (2025) ",
        src: "https://web.wootly.ch/source?id=31d3ba1b9c9414adf8c490724e2ccade34b90a69&sig=Djg2H-DXiz1uutjyPWH_SA&expire=1758929907&ofs=11&usr=194949"
      },
      "movie-1": {
        title: "Freakier Friday (2025)",
        src: "https://web.wootly.ch/source?id=796e0bef3a9b1d92c8e35c360ca86d9570db6167&sig=XUnZKcq7V7jVlKeylFu9sA&expire=1758929815&ofs=11&usr=195111"
      },
      "movie-2": {
        title: "Relay (2024)",
        src: "https://web.wootly.ch/source?id=84ed344ebe262fcbabbb3633d685655854760115&sig=rZGY3aPBFanZjWGfrrExYQ&expire=1758929761&ofs=11&usr=195096"
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        src: "https://hglink.to/np131q6tst6i"
      },
      "movie-4": {
        title: "Fantastic Four",
        src: "https://web.wootly.ch/source?id=b5424a44e305c99a7e580c5d622d52225b30f0d2&sig=h9eYaHWKUAyBcuoTlCagCA&expire=1758929526&ofs=11&usr=195119"
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
