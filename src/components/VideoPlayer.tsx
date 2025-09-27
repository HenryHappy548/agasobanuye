import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CustomVideoPlayer } from "./CustomVideoPlayer";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const VideoPlayer = ({ isOpen, onClose, videoId }: VideoPlayerProps) => {
  // Mock video data with multiple sources and subtitles
  const getVideoInfo = (id: string) => {
    const videos: Record<string, { 
      title: string; 
      sources: Array<{src: string; type: string; quality?: string}>; 
      subtitles?: Array<{src: string; label: string; language: string; default?: boolean}>;
      poster?: string;
    }> = {
      "featured-movie": {
        title: "Weapons (2025)",
        sources: [
          { src: "https://ok.ru/video/9496103422476", type: "video/mp4", quality: "1080p" }
        ],
        poster: "/placeholder.svg"
      },
      "movie-1": {
        title: "Freakier Friday (2025)",
        sources: [
          { src: "https://web.wootly.ch/source?id=796e0bef3a9b1d92c8e35c360ca86d9570db6167&sig=XUnZKcq7V7jVlKeylFu9sA&expire=1758929815&ofs=11&usr=195111", type: "video/mp4", quality: "720p" }
        ],
        poster: "/placeholder.svg"
      },
      "movie-2": {
        title: "Relay (2024)",
        sources: [
          { src: "https://web.wootly.ch/source?id=84ed344ebe262fcbabbb3633d685655854760115&sig=rZGY3aPBFanZjWGfrrExYQ&expire=1758929761&ofs=11&usr=195096", type: "video/mp4", quality: "1080p" }
        ],
        poster: "/placeholder.svg"
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        sources: [
          { src: "https://media.agasobanuyenow.com/The%20Naked%20Gun.mp4", type: "video/mp4", quality: "720p" }
        ],
        poster: "/placeholder.svg"
      },
      "movie-4": {
        title: "Fantastic Four",
        sources: [
          { src: "https://web.wootly.ch/source?id=b5424a44e305c99a7e580c5d622d52225b30f0d2&sig=h9eYaHWKUAyBcuoTlCagCA&expire=1758929526&ofs=11&usr=195119", type: "video/mp4", quality: "1080p" }
        ],
        poster: "/placeholder.svg"
      }
    };
    return videos[id] || { 
      title: "Unknown", 
      sources: [], 
      poster: "/placeholder.svg" 
    };
  };

  const videoInfo = videoId ? getVideoInfo(videoId) : null;

  const handleVideoUpload = (file: File) => {
    // Create a blob URL for the uploaded file
    const url = URL.createObjectURL(file);
    console.log("Video uploaded:", file.name, url);
    // Here you could implement actual upload logic
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full p-0 bg-background border-border">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {videoInfo && videoInfo.sources.length > 0 && (
            <div className="aspect-video">
              <CustomVideoPlayer
                sources={videoInfo.sources}
                subtitles={videoInfo.subtitles}
                poster={videoInfo.poster}
                title={videoInfo.title}
                onUpload={handleVideoUpload}
                className="w-full h-full"
              />
            </div>
          )}
          
          {videoInfo && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {videoInfo.title}
              </h2>
              <p className="text-muted-foreground">
                Custom video player with subtitles, multiple sources, and upload capabilities. Upload your own videos or embed from different sources.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
