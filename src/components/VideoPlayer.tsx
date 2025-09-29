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
        title: "Naked Gun (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/Ba7L4dpbgQHVmv/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://download.example.com/weapons-1080p.mp4", type: "MP4" }
          
        ]
        },
      "fou": {
        title: "Fountain of youth B",
        embedCode: '<iframe src="https://streamtape.com/e/mYkXGrGrYJHbLRw/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
        },
      "foua": {
        title: "Fountain of youth A",
        embedCode: '<iframe src="https://streamtape.com/e/xeeoAxOV9lTQ2e/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
         },
      "osi": {
        title: "Osiris (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/2LgA0xM3abiZYQR/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sickov",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
         },
      "men": {
        title: "Men of honor B (2000)",
        embedCode: '<iframe width="1024" height="640" frameborder="0" src="https://mega.nz/embed/ka0xHCSR#IOJNsVw8qMz9rdSB0mIiarSfYE95P6u78PPAhA4hAto" allowfullscreen ></iframe>',
        host: "Rocky",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
         },
      "mena": {
        title: "Men of honor B (2000)",
        embedCode: '<iframe width="1024" height="640" frameborder="0" src="https://mega.nz/embed/C4B0wCrB#jar_rBf8_BNXRUsFEKDJ1vgt-PK62_MDDDK5zze9SAg" allowfullscreen ></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
        },"man": {
        title: "A working man B (2025)",
        embedCode: '<iframe width="1024" height="640" frameborder="0" src="https://mega.nz/embed/C4B0wCrB#jar_rBf8_BNXRUsFEKDJ1vgt-PK62_MDDDK5zze9SAg" allowfullscreen ></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
      },"mana": {
        title: "A working man A (2025)",
        embedCode: '<iframe width="1024" height="640" frameborder="0" src="https://mega.nz/embed/HsBnBKBK#ukkT0LJ4fGrdghjR9bwRrmRJYTi5cvYiN93wq5bz0fk" allowfullscreen ></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
      },
     
      "movie-1": {
        title: "Shadow Force B (2025)",
        embedCode: '<iframe width="1024" height="640" frameborder="0" src="https://mega.nz/embed/D4Q0EZgZ#Jb7ecJ2f_21LL3BlF-Vrm2Ks51ECr_Pr81W18hpw_tY" allowfullscreen ></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
      },
      "forcea": {
        title: "Shadow Force A (2025)",
        embedCode: '<iframe width="1024" height="640" frameborder="0" src="https://mega.nz/embed/T05RCQwa#KdQ2EefSUMgt0pIPn-XllHQAzCj5qe2B_oJqtUb2eJc" allowfullscreen ></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
      },
     
      "movie-2": {
        title: "Knight and Day (2010)",
        embedCode: '<iframe width="1024" height="640" frameborder="0" src="https://mega.nz/embed/XpoBgIJQ#T7SgXb5MXaKRNP1jdGRet19TLCKFFJuNwY43ZIjwJTQ" allowfullscreen ></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "4K", size: "3.2GB", url: "https://download.example.com/relay-4k.mp4", type: "MP4" }
         
        ]
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        embedCode: '<iframe width="1024" height="640" frameborder="0" src="https://mega.nz/embed/nsBzHRIa#4FN0eDHfhSNWQVS79zsPr8szuGaLXT3GrjLcQBdcj2c" allowfullscreen ></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.6GB", url: "https://download.example.com/naked-gun-1080p.mp4", type: "MP4" }
         
        ]
      },
      "movie-4": {
        title: "Home sweet Home B",
        embedCode: '<iframe width="1024" height="630" frameborder="0" src="https://mega.nz/embed/CgRjkRQB#JsRPi4bihFKOMLaJRuWLDwRncChSnqBFkhigl_GkOfc" allowfullscreen ></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "1080p", size: "2.1GB", url: "https://mega.nz/embed/CgRjkRQB#JsRPi4bihFKOMLaJRuWLDwRncChSnqBFkhigl_GkOfc", type: "MP4" }
        ]
      },
      "movie-5": {
        title: "Of king and prophet Ep4",
        embedCode: '<iframe width="1024" height="640" frameborder="0" src="https://mega.nz/file/JakTFDbR#K7uvEHH_i5F1dye8tyKaSZkhVMBx-x4H4i9Av5WE_sw" allowfullscreen ></iframe>',
        host: "Rocky",
        downloadLinks: [
          { quality: "720p", size: "164.72 MB", url: "https://mega.nz/file/JakTFDbR#K7uvEHH_i5F1dye8tyKaSZkhVMBx-x4H4i9Av5WE_sw", type: "MP4" }
        ]
      },
       "movie-6": {
        title: "Of king and phophet Ep3",
        embedCode: '<iframe width="1024" height="640" frameborder="0" src="https://mega.nz/embed/JP8WXBSY#kbExvoxlS7h2N3J-mZIZtjkRUpHY2vk6qKfYlfct5Sg" allowfullscreen ></iframe>',
        host: "Rocky",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://mega.nz/embed/JP8WXBSY#kbExvoxlS7h2N3J-mZIZtjkRUpHY2vk6qKfYlfct5Sg", type: "MP4" }
        ]
      },
      "movie-14": {
        title: "Of kings and prophets Ep2",
        embedCode: '<iframe width="1024" height="624" frameborder="0" src="https://mega.nz/embed/JakTFDbR#K7uvEHH_i5F1dye8tyKaSZkhVMBx-x4H4i9Av5WE_sw" allowfullscreen ></iframe>',         
        host:"Mega.nz",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://download.example.com/i-kill-you-ep1-720p.mp4", type: "MP4" }
        ]
      },
      "movie-13": {
        title: "Of kings and prophets Ep1",
        embedCode: '<iframe width="1024" height="624" frameborder="0" src="https://mega.nz/embed/5fsXCCrR#bwUs9Jbt5v35KVy6sNG8Sm0rp7rk20blJ4UYsuDa_3g" allowfullscreen ></iframe>',
        host: "Mega.nz",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://download.example.com/i-kill-you-ep1-720p.mp4", type: "MP4" }
        ]
      },
       "sweeta": {
        title: "Home sweet Home A",
        embedCode: '<iframe width="1024" height="624" frameborder="0" src="https://mega.nz/embed/7kpSDJDB#a7S8qGFtH23UKcJZTVT7oPYstxox6KQP4c1Ilr06ht8" allowfullscreen ></iframe>',         
        host:"Savimbi",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://mega.nz/embed/7kpSDJDB#a7S8qGFtH23UKcJZTVT7oPYstxox6KQP4c1Ilr06ht8", type: "MP4" }
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
      <DialogContent className="max-w-[95vw] sm:max-w-4xl lg:max-w-6xl w-full p-0 bg-black border-border max-h-[95vh] overflow-hidden">
        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-black/80 hover:bg-black text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          {videoInfo && (
            <>
              {/* Video Player Area */}
              <div className="relative bg-black flex items-center justify-center min-h-[200px] sm:min-h-[300px] lg:min-h-[500px]">
                <div 
                  className="w-full max-w-full aspect-video"
                  dangerouslySetInnerHTML={{ __html: videoInfo.embedCode }}
                />
              </div>

              {/* Video Info and Download Section */}
              <div className="p-3 sm:p-4 lg:p-6 bg-gray-900 text-white max-h-[40vh] overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">{videoInfo.title}</h2>
                    <span className="text-xs sm:text-sm text-gray-300">
                      Host: {videoInfo.host}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(getSrcFromEmbedCode(videoInfo.embedCode), '_blank')}
                    className="text-white border-white/30 w-full sm:w-auto"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Open Original
                  </Button>
                </div>
                
                {/* Download Section */}
                <div className="mt-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Options
                  </h3>
                  
                  {videoInfo.downloadLinks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {videoInfo.downloadLinks.map((link, index) => (
                        <div key={index} className="border border-gray-600 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-blue-300 text-sm">{link.quality}</span>
                            <span className="text-xs text-gray-400">{link.size}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <span className="text-xs text-gray-300">{link.type}</span>
                            <Button
                              size="sm"
                              onClick={() => handleDownload(link.url, `${videoInfo.title} - ${link.quality}.mp4`)}
                              className="bg-green-600 hover:bg-green-700 text-xs w-full sm:w-auto"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-400 text-sm">
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
