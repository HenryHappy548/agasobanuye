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
          { quality: "1080p", size: "1.5GB", url: "https://download.example.com/weapons-1080p.mp4", type: "MP4" }
          
        ]
      },
      "movie-1": {
        title: "Freakier Friday (2025)",
        embedCode: '<iframe src="https://hglink.to/e/abc123" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
      },
      "movie-2": {
        title: "Relay (2024)",
        embedCode: '<iframe src="https://hglink.to/e/def456" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link",
        downloadLinks: [
          { quality: "4K", size: "3.2GB", url: "https://download.example.com/relay-4k.mp4", type: "MP4" }
         
        ]
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        embedCode: '<iframe src="https://hglink.to/e/ghi789" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link",
        downloadLinks: [
          { quality: "1080p", size: "1.6GB", url: "https://download.example.com/naked-gun-1080p.mp4", type: "MP4" }
         
        ]
      },
      "movie-4": {
        title: "Fantastic Four",
        embedCode: '<iframe src="https://hglink.to/e/jkl012" frameborder=0 marginwidth=0 marginheight=0 scrolling=no width=640 height=360 allowfullscreen></iframe>',
        host: "HG Link",
        downloadLinks: [
          { quality: "1080p", size: "2.1GB", url: "https://download.example.com/fantastic-four-1080p.mp4", type: "MP4" }
        ]
      },
      "movie-5": {
        title: "I land Ep2",
        embedCode: '<iframe src="https://streamtape.com/e/pxY2w08gMpFrrzl/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "HG Link",
        downloadLinks: [
          { quality: "720p", size: "164.72 MB", url: "https://2475163186.tapecontent.net/radosgw/pxY2w08gMpFrrzl/lwWPla1jYKTMj8gXJ0nAzRL5b6ovyMCj36C7fj2MrHnVBGKj4RWz-TGtvKBiXBDMS4zlKdUDe-E0JyptmKuSnqU9zUDaNheh-jklOxRw1hovDHEuYljtHIyaKMjAC6OIUJGYWlhGth_bGdsg7_Cs5C41lheAhpurXY47KwEO0DwhH-UOifHRzrd9elkEKUiXXtuC2IZYEvx-3GXmNiB6DQ6BRMprUa4Qso6CWFYqisVnFZuqWGbu0BKp6vkTkExYtbJE4guJXjLevTNivIFG4uMnQweLr0WFgjd4WdeXomFkFVaMKBrv_G3g3-87-UCTc0sZrxS7CzRBD3yq/I.Kill.You.S01E01.%28NKIRI.COM%29.mkv.mp4?dl=1", type: "MP4" }
        ]
      },
       "movie-6": {
        title: "I land Ep1",
        embedCode: '<div class="sp-embed-player" data-id="cTQtbinDuXy"><script src="https://go.screenpal.com/player/appearance/cTQtbinDuXy"></script><iframe width="100%" height="100%" style="border:0;" scrolling="no" src="https://go.screenpal.com/player/cTQtbinDuXy?width=100%&height=100%&ff=1&title=0" allowfullscreen="true"></iframe></div>',
        host: "Streamtape",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://download.example.com/i-kill-you-ep1-720p.mp4", type: "MP4" }
        ]
      },
      "movie-13": {
        title: "Of kings and prophets Ep1",
        embedCode: '<iframe width="640" height="360" frameborder="0" src="https://mega.nz/embed/5fsXCCrR#bwUs9Jbt5v35KVy6sNG8Sm0rp7rk20blJ4UYsuDa_3g" allowfullscreen ></iframe>',
        host: "Mega.nz",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://download.example.com/i-kill-you-ep1-720p.mp4", type: "MP4" }
        ]
      },"movie-14": {
        title: "Of kings and prophets Ep2",
        embedCode: '<iframe width="640" height="360" frameborder="0" src="https://mega.nz/embed/JakTFDbR#K7uvEHH_i5F1dye8tyKaSZkhVMBx-x4H4i9Av5WE_sw" allowfullscreen ></iframe>',         
        host:"Mega.nz",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://download.example.com/i-kill-you-ep1-720p.mp4", type: "MP4" }
        ]
      },
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
