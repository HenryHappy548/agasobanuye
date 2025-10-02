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
        embedCode: '<iframe src="https://streamtape.com/e/Ba7L4dpbgQHVmv/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://streamtape.com/v/Ba7L4dpbgQHVmv/THE_NAKED_GUN_BY_GAHEZA.MP4.mp4", type: "MP4" }
          
        ]   
      },
        "blo": {
        title: "Blood Brothers B",
        embedCode: '<iframe src="https://streamtape.com/e/elbA18jKdyTJWl/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.06GB", url: "https://streamtape.com/v/elbA18jKdyTJWl/Blood_Brothers_B.mp4", type: "MP4" }
        ]
        },
          

        "bloa": {
        title: "Blood Brothers A",
        embedCode: '<iframe src="https://streamtape.com/e/6x9wrjZZ7KuVoK/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.06GB", url: "https://streamtape.com/v/6x9wrjZZ7KuVoK/Blood_Brothers_A.mp4", type: "MP4" }
        ]
        },
        "dir": {
        title: "Dirty Angel",
        embedCode: '<iframe src="https://streamtape.com/e/093OdWOPP4S6wo/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "1080p", size: "1.06GB", url: "https://streamtape.com/v/093OdWOPP4S6wo/DIRTY_ANGELS.mp4", type: "MP4" }
        ]
          },
        "lost8": {
        title: "Lost in Love Ep8",
        embedCode: '<iframe src="https://streamtape.com/e/PvO9GrMWWBhg8m/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "538MB", url: "https://streamtape.com/v/PvO9GrMWWBhg8m/Lost_In_Love_Ep8.mp4", type: "MP4" }
        ]
        },
        "lost6": {
        title: "Lost in Love Ep6",
        embedCode: '<iframe src="https://streamtape.com/e/PvO9GrMWWBhg8m/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "538MB", url: "https://streamtape.com/v/PvO9GrMWWBhg8m/Lost_In_Love_Ep6.mp4", type: "MP4" }
        ]
        },
        "lost7": {
        title: "Lost in Love Ep7",
        embedCode: '<iframe src="https://streamtape.com/e/9WL1OBMLbMcYLm/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "538MB", url: "https://streamtape.com/v/9WL1OBMLbMcYLm/Lost_In_Love_Ep7.mp4", type: "MP4" }
        ]
      },
        "lost5": {
        title: "Lost in Love Ep5",
        embedCode: '<iframe src="https://streamtape.com/e/o61WQ802WQCjXB/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "538MB", url: "https://streamtape.com/v/o61WQ802WQCjXB/Lost_In_Love_Ep5.mp4", type: "MP4" }
        ]
      },
      "lost4": {
        title: "Lost in Love Ep4",
        embedCode: '<iframe src="https://streamtape.com/e/dP30X719vaTkwwx/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "523MB", url: "https://streamtape.com/v/dP30X719vaTkwwx/Lost_In_Love_Ep4.mp4", type: "MP4" }
        ]
          },
      "lost3": {
        title: "Lost in Love Ep3",
        embedCode: '<iframe src="https://streamtape.com/e/XJ8m9bv1BbhZAa/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "518MB", url: "https://streamtape.com/v/XJ8m9bv1BbhZAa/Lost_In_Love_Ep3.mp4", type: "MP4" }
        ]
          },
      "lost2": {
        title: "Lost in Love Ep2",
        embedCode: '<iframe src="https://streamtape.com/e/GQz4jgq7K8CY88/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "534MB", url: "https://streamtape.com/v/GQz4jgq7K8CY88/Lost_In_Love_Ep2.mp4", type: "MP4" }
        ]
        },
      "lost1": {
        title: "Lost in Love Ep1",
        embedCode: '<iframe src="https://streamtape.com/e/Dlo1PyjrZ4tkzxp/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "538MB", url: "https://streamtape.com/v/Dlo1PyjrZ4tkzxp/Lost_In_Love_Ep1.mp4", type: "MP4" }
        ]
        },
      "goh": {
        title: "Ghost Rider",
        embedCode: '<iframe src="https://streamtape.com/e/0d1qxpvz3xtb7Pr/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "1.3GB", url: "https://streamtape.com/v/0d1qxpvz3xtb7Pr/Ghost_Rider_Sankara.mp4", type: "MP4" }
        ]
        },
      "dep": {
        title: "Deep Water (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/8vKRRY1dV9ioAwv/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/8vKRRY1dV9ioAwv/Deep_Water.mp4", type: "MP4" }
        ]
         },
      "sin": {
        title: "Sinners B",
        embedCode: '<iframe src="https://streamtape.com/e/ApoJ9j7dWecXdXz/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/ApoJ9j7dWecXdXz/SINNERS_B.mp4",type: "MP4" }
        ]
        },
      "sina": {
        title: "Sinners A ",
        embedCode: '<iframe src="https://streamtape.com/e/pz2PGjzal9tAzq/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/pz2PGjzal9tAzq/SINNERS_.mp4", type: "MP4" }
       
        ]
         },
        "bac": {
        title: "Back on Society",
        embedCode: '<iframe src="https://streamtape.com/e/7Bp2kAPj4QiAeKX/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Junior Giti",
        downloadLinks: [
          { quality: "1080p", size: "1.06GB", url: "https://streamtape.com/v/7Bp2kAPj4QiAeKX/BACK_ON_SOCIETY.mp4", type: "MP4" }
      ]
           },
      "exo": {
        title: "The exorcism of God ",
        embedCode: '<iframe src="https://streamtape.com/e/p43Z8lPL2xTrg48/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/p43Z8lPL2xTrg48/THE_EXORRCISM_OF_THE_GOD_BY_SANKRA.mp4", type: "MP4"}
        ]
        },
      "fou": {
        title: "Fountain of youth B",
        embedCode: '<iframe src="https://streamtape.com/e/mYkXGrGrYJHbLRw/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/mYkXGrGrYJHbLRw/FOUNTAIN_OF_YOUTH_B.mp4", type: "MP4"}
        ]
         },
      "sar": {
        title: "Sarzamen",
        embedCode: '<iframe src="https://streamtape.com/e/9bYWMkpB3Xc1k9/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sickov",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/9bYWMkpB3Xc1k9/Sarzameen.mp4", type: "MP4" }
       
        ]
        },
      "foua": {
        title: "Fountain of youth A",
        embedCode: '<iframe src="https://streamtape.com/e/xeeoAxOV9lTQ2e/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/xeeoAxOV9lTQ2e/FOUNTAIN_OF_YOUTH_.mp4", type: "MP4" }
       
        ]
         },
      "osi": {
        title: "Osiris (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/2LgA0xM3abiZYQR/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sickov",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/2LgA0xM3abiZYQR/OSIRIS._Sikov.mp4", type: "MP4" }
       
        ]
         },
      "men": {
        title: "Men of honor B (2000)",
        embedCode: '<iframe width="500" height="240" frameborder="0" src="https://mega.nz/embed/ka0xHCSR#IOJNsVw8qMz9rdSB0mIiarSfYE95P6u78PPAhA4hAto" allowfullscreen ></iframe>',
        host: "Rocky",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
         },
      "mena": {
        title: "Men of honor A (2000)",
        embedCode: '<iframe width="500" height="240" frameborder="0" src="https://mega.nz/embed/C4B0wCrB#jar_rBf8_BNXRUsFEKDJ1vgt-PK62_MDDDK5zze9SAg" allowfullscreen ></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
        },"man": {
        title: "A working man B (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/3w9yJZGmmAHdgqv/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/3w9yJZGmmAHdgqv/A_WORKING_MAN_B.mp4", type: "MP4" }
       
        ]
      },"mana": {
        title: "A working man A (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/3w9yJZGmmAHdgqv/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/VBmDG0aQoVF992/A_WARKING_MAN_A.mp4", type: "MP4" }
       
        ]
      },
     
      "movie-1": {
        title: "Shadow Force B (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/jgd9o0wAz9hzwL0/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/jgd9o0wAz9hzwL0/SHADOW_FORCE_B.mp4", type: "MP4" }
       
        ]
      },
      "forcea": {
        title: "Shadow Force A (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/xPMllybbdoTlXP/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/xPMllybbdoTlXP/SHADOW_FORCE_A.mp4", type: "MP4" }
       
        ]
      },
     
      "movie-2": {
        title: "Knight and Day (2010)",
        embedCode: '<iframe src="https://streamtape.com/e/MqRGVMed3dSB4B/" width="800" height="500" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "4K", size: "3.2GB", url: "https://streamtape.com/v/MqRGVMed3dSB4B/Knight_And_Day.mp4", type: "MP4" }
         
        ]
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/Ba7L4dpbgQHVmv/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.6GB", url: "https://streamtape.com/v/Ba7L4dpbgQHVmv/THE_NAKED_GUN_BY_GAHEZA.MP4.mp4", type: "MP4" }
         
        ]
      },
      "movie-4": {
        title: "Home sweet Home B",
        embedCode: '<iframe src="https://streamtape.com/e/XYDKrBZOJJHDpgJ/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "1080p", size: "2.1GB", url: "https://streamtape.com/v/XYDKrBZOJJHDpgJ/HOME_SWEET_HOME_B.mp4", type: "MP4" }
        ]
      
      },
       "sweeta": {
        title: "Home sweet Home A",
        embedCode: '<iframe src="https://streamtape.com/e/BzWdVbXQbQiybJ2/" width="500" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',         
        host:"Savimbi",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://streamtape.com/v/BzWdVbXQbQiybJ2/HOME_SWEET_HOME_A.mp4", type: "MP4" }
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl lg:max-w-5xl w-full p-0 bg-black border-border max-h-[95vh] overflow-hidden">
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
              {/* Video Player Area - Reduced aspect ratio */}
              <div className="relative bg-black flex items-center justify-center">
                {videoInfo.embedCode ? (
                  <div 
                    className="w-full max-w-full aspect-[16/4]"
                    dangerouslySetInnerHTML={{ __html: videoInfo.embedCode }}
                  />
                ) : (
                  <div className="w-full aspect-[16/4] flex items-center justify-center text-white">
                    Loading video player...
                  </div>
                )}
              </div>

              {/* Video Info and Download Section */}
              <div className="p-3 sm:p-4 lg:p-6 bg-gray-900 text-white max-h-[100vh] overflow-y-auto">
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
                        <div key={index} className="border border-gray-500 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-blue-300 text-sm">{link.quality}</span>
                            <span className="text-xs text-gray-400">{link.size}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <span className="text-xs text-gray-300">{link.type}</span>
                            <Button
                              size="sm"
                              onClick={() => handleDownload(link.url, `${videoInfo.title} - ${link.quality}.mp4`)}
                              className="bg-green-500 hover:bg-green-700 text-xs w-full sm:w-auto"
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
