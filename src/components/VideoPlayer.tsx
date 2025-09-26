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
        src: "https://duck.nebula.to/aa3/Weapons.2025.1080p.REPACK.WEBRip.DDP.5.1.Atmos.10bit.H.265-iVy.WT11.mp4?md5=5lfrxp8SpZzuFksB-WuUjQ&expires=1758904879&fn=31d3ba1b9c9414adf8c490724e2ccade34b90a69.mp4"
      },
      "movie-1": {
        title: "Frekier Friday (2025)",
        src: "https://porto2.nebula.to/aa3/Freakier.Friday.2025.1080p.WEBRip.x265.10bit.AAC-LAMA.WT11.mp4?md5=jH4aVFGLgcUlDzLACH4P8Q&expires=1758916200&fn=796e0bef3a9b1d92c8e35c360ca86d9570db6167.mp4"
      },
      "movie-2": {
        title: "Relay (2024)",
        src: "https://rosario2.nebula.to/aa3/Relay.2024.1080p.WEBRip.x265-DH.WT11.mp4?md5=L6wCvtVgxqP6OOT_0Rgw9A&expires=1758916230&fn=84ed344ebe262fcbabbb3633d685655854760115.mp4"
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        src: "https://drw.jabroni.mov/aa3/The.Naked.Gun.2025.1080p.WEBRip.10Bit.DDP5.1.x265-NeoNoir.WT11.mp4?md5=hUuY7ZpEBiCFOS3ju4tGFg&expires=1758915967&fn=d40223c76c476f38c46354ab31b19ad2950e0a66.mp4"
      },
      "movie-4": {
        title: "Fantastic Four",
        src: "https://awz.jabroni.mov/aa3/The.Fantastic.Four.First.Steps.2025.1080p.WEBRip.x265-DH.WT11.mp4?md5=rZYKYbhAWg98wSnYIt021g&expires=1758906423&fn=b5424a44e305c99a7e580c5d622d52225b30f0d2.mp4"
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
