import { X, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const VideoPlayer = ({ isOpen, onClose, videoId }: VideoPlayerProps) => {
  // Video data with full embed codes and download links
  const getVideoInfo = (id: string) => {
    const videos: Record<string, { 
      title: string; 
      embedCode: string;
      host: string;
      downloadLinks: {
        quality: string;
        size: string;
        url: string;
        type: string;
      }[];
    }> = {
      "featured-movie": {
        title: "Weapons (2025)",
        embedCode: '<iframe src="https://hglink.to/e/np131q6tst6i" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://download.example.com/weapons-1080p.mp4", type: "MP4" },
          { quality: "720p", size: "800MB", url: "https://download.example.com/weapons-720p.mp4", type: "MP4" },
          { quality: "480p", size: "400MB", url: "https://download.example.com/weapons-480p.mp4", type: "MP4" }
        ]
      },
      "movie-1": {
        title: "Freakier Friday (2025)",
        embedCode: '<iframe src="https://hglink.to/e/abc123" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" },
          { quality: "720p", size: "700MB", url: "https://download.example.com/freakier-friday-720p.mp4", type: "MP4" }
        ]
      },
      "movie-2": {
        title: "Relay (2024)",
        embedCode: '<iframe src="https://hglink.to/e/def456" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link",
        downloadLinks: [
          { quality: "4K", size: "3.2GB", url: "https://download.example.com/relay-4k.mp4", type: "MP4" },
          { quality: "1080p", size: "1.8GB", url: "https://download.example.com/relay-1080p.mp4", type: "MP4" },
          { quality: "720p", size: "900MB", url: "https://download.example.com/relay-720p.mp4", type: "MP4" }
        ]
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        embedCode: '<iframe src="https://hglink.to/e/ghi789" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link",
        downloadLinks: [
          { quality: "1080p", size: "1.6GB", url: "https://download.example.com/naked-gun-1080p.mp4", type: "MP4" },
          { quality: "720p", size: "850MB", url: "https://download.example.com/naked-gun-720p.mp4", type: "MP4" }
        ]
      },
      "movie-4": {
        title: "Fantastic Four",
        embedCode: '<iframe src="https://hglink.to/e/jkl012" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link",
        downloadLinks: [
          { quality: "1080p", size: "2.1GB", url: "https://download.example.com/fantastic-four-1080p.mp4", type: "MP4" },
          { quality: "720p", size: "1.1GB", url: "https://download.example.com/fantastic-four-720p.mp4", type: "MP4" },
          { quality: "480p", size: "550MB", url: "https://download.example.com/fantastic-four-480p.mp4", type: "MP4" }
        ]
      },
      "movie-5": {
        title: "I Kill You Ep1",
        embedCode: '<iframe src="https://hglink.to/e/mno345" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://download.example.com/i-kill-you-ep1-720p.mp4", type: "MP4" },
          { quality: "480p", size: "250MB", url: "https://download.example.com/i-kill-you-ep1-480p.mp4", type: "MP4" }
        ]
      }
    };
    return videos[id] || { 
      title: "Unknown", 
      embedCode: "", 
      host: "Unknown",
      downloadLinks: []
    };
  };

  const videoInfo = videoId ? getVideoInfo(videoId) : null;

  // Extract just the src URL from the embed code
  const getSrcFromEmbedCode = (embedCode: string) => {
    const srcMatch = embedCode.match(/src="([^"]*)"/);
    return srcMatch ? srcMatch[1] : "";
  };

  // Handle download
  const handleDownload = (url: string, filename: string) => {
    window.open(url, '_blank');
    // Alternative method for direct download
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = filename;
    // link.click();
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

              {/* Video Info and Download Section */}
              <div className="p-4 bg-gray-900 text-white">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{videoInfo.title}</h2>
                    <span className="text-sm text-gray-300">
                      Host: {videoInfo.host}
                    </span>
                  </div>
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
                
                {/* Download Section */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Options
                  </h3>
                  
                  {videoInfo.downloadLinks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {videoInfo.downloadLinks.map((link, index) => (
                        <div key={index} className="border border-gray-600 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-blue-300">{link.quality}</span>
                            <span className="text-sm text-gray-400">{link.size}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">{link.type}</span>
                            <Button
                              size="sm"
                              onClick={() => handleDownload(link.url, `${videoInfo.title} - ${link.quality}.mp4`)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-400">
                      No download links available for this movie.
                    </div>
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
