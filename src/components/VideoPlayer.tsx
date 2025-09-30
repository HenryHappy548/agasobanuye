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
        embedCode: '<iframe src="https://streamtape.com/e/Ba7L4dpbgQHVmv/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://860698157.tapecontent.net/radosgw/Ba7L4dpbgQHVmv/jP0FRfW1SLjq99twWjbHWtELClSfINWSOxpjvKmX_lwCpPBRLMVw4PDiDHx6eElOvFQYDpj2AAOK2kDY-c14Cu4rMVO7M2CfC_QrYikHweGSvIvqseSDxIHW3SMLCCmp5B4hkhROehrn-Q1HQGZkIx-8KsChkSC6UBujgQgAvpz5fb07XyZGJr5YfLH2ygDYZ-uWcvbRZfdMMvZx75z7rYFwaC4pwdAhlk6sLSIB-UeRpJrH3EubmZdwT17QIvVYfeC6zcHRO7JZEuMvMGh-k5vmDCoUWZhp5cgf_Zul0B3f4_MYVph880KcpGA/THE+NAKED+GUN+BY+GAHEZA.MP4.mp4?dl=1", type: "MP4" }
          
        ]
        },
      "dep": {
        title: "Deep Water (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/8vKRRY1dV9ioAwv/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://2448360001.tapecontent.net/radosgw/8vKRRY1dV9ioAwv/XaYqMhRrH_a7Ksh-MkHyB0fan40_EcREW7KCTENqtqgwd7BBTUodhEKlX3tn1U-r-ZQ0AfcNwlACoZJ1r_uve9wrMY6Wu-H6aVRTQg1CAZ7VxKwGH-q0aHtDDDJq_FsC9dW93E2tycAIszM61UCUuHCBghazUmR99UxHigEuBorAqnOYdQdh1ryEmdKdK2UoZU3ox4po_3amtAMXeDsB-w3uLChJhXoMGkpfNkErEORZmRHHhwG75uBaibYZm6r0SxXZeGuO8OJ5IhRcWKBIWFwKD8DbDBevP6mriQ/Deep_Water.mp4?dl=1", type: "MP4" }
       
        ]
         },
      "sin": {
        title: "Sinners B",
        embedCode: '<iframe src="https://streamtape.com/e/ApoJ9j7dWecXdXz/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://2565136225.tapecontent.net/radosgw/ApoJ9j7dWecXdXz/JCJsGeig2bdGewyPK4hwLLHn34VcZp8U2b2ldJQhL6q9r4wtDjvGB6nrEH2bjXN4Mi7qvGtCwMNXOqVLbzMuFTAdPflctI879zAAJb8v9xZuBJnKn3nTCWBC-aW6yqn7gnIzAem_N2WQVyOsaMBS4HOd9RAdgozLrAUW22BY2xc2k1Qd8PF9PwcpTrjG1JTdQyA2kL_X0up4tAS0EAGCmab_lYHViZck8zDOu4YvakLtuDbmB-9nGq2bI2kptVJ1yjH8uBxo-klYzSjdklcjtlRZn1bN2tyC7zAj7A/SINNERS+B.mp4?dl=1", type: "MP4" }
       
        ]
        },
      "sina": {
        title: "Sinners A ",
        embedCode: '<iframe src="https://streamtape.com/e/pz2PGjzal9tAzq/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://858139431.tapecontent.net/radosgw/pz2PGjzal9tAzq/q-UlIeuXGp6s1BfUiVT4qtQ5x5LxMnLiEa51vu91AF5TCheFgvTqw7CM-J4_ZCghB2LmckecdRoQCrtSAzLzkn0e1EGvRY2pYuh_PNR-TxM2O1MYaYWSKXWQuHojzMfoNlrAjdjWgFuXYoQJGY3C4huUcKruNqmb93JXyqqzkdy1aYWkscFlZyOZ8QXeT1mI4uSf0ecl_plndSg7JUVCSLEbAs9RDdntWXfosEbn9kBDIHwEAz-PUlunB-5H-wtXPrn89_UOzJs22sEPslLmlhJan09bexjl3qiYfw/SINNERS+.mp4?dl=1", type: "MP4" }
       
        ]
         },
      "exo": {
        title: "The exorcism of God ",
        embedCode: '<iframe src="https://streamtape.com/e/p43Z8lPL2xTrg48/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://964698247.tapecontent.net/radosgw/p43Z8lPL2xTrg48/rjNUpXoWdo1D4ObMU02zzIx9jy9fn7tcfXiB2SDUBPvgGGv96kLezQS5iryS9UWyYmxtKXjJsL0wQkXHSK1Gbk4gIouaMW9T2T0LoGHQ_Q0Vz_9Fxm-Wjfv-K9zBtxWowfc-v98ngOiuTIycibrVr4RHL8kzOEtY15gttEWTJtjwKnGkr6nKHkQoN6qVzYpk2ABUA82d3SVqCTLsrw85ZYLyoR8fVVxAtAdjUfcB4rEXxwmKc3EvLRqkC1yHg3ZKij4WdNOlhbaXosdHzjmnlaaJOMCAgPPghlwaXzk4sgOIC6jTbwAHcu_JU-w/THE_EXORRCISM_OF_THE_GOD_BY_SANKRA.mp4?dl=1", type: "MP4" }
       
        ]
        },
      "fou": {
        title: "Fountain of youth B",
        embedCode: '<iframe src="https://streamtape.com/e/mYkXGrGrYJHbLRw/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://908360630.tapecontent.net/radosgw/mYkXGrGrYJHbLRw/XW4jLGeh9DPEwIa4CbxOuBkdC5G37c8U-32kwTQsdhpraxNRA2EgNp3LYJXemTRM_7BnVrQ7hqTEe5y2FMrOdFzJU5-8yhE2THDeqwp2cABH-dn47LmmiQzo5e5guZd9s9TpOSDdhJ1PJtOCWuH3sM64KO26fL95S46BgDOIo4rMrBcXo85T4luf1VchzE3A9R8ndLSM93gfOfNKxwRMSl3DfrziWECoSYIt5XMq2S87or1JIfACrIdMYAYi-HpuAg_IFtuGKXxx15-Q7Qtsu6R3qip9f2ekMNKjuaMxmiSdDlhSOXD4wWAaMrw/FOUNTAIN+OF+YOUTH+B.mp4?dl=1", type: "MP4" }
       
        ]
         },
      "sar": {
        title: "Sarzamen",
        embedCode: '<iframe src="https://streamtape.com/e/9bYWMkpB3Xc1k9/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sickov",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
        },
      "foua": {
        title: "Fountain of youth A",
        embedCode: '<iframe src="https://streamtape.com/e/xeeoAxOV9lTQ2e/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://908359905.tapecontent.net/radosgw/xeeoAxOV9lTQ2e/_ZhtWtJZhmhPweMUih_RqsYyDnjh_HzSPkxD6snlaH5Z5QqUNKbrCtNH4Yr8ZkqZlPoq3tJ1NgGLnShY-ydPDeLkjuL7Sw1ZfNUkLAd5zcLpVYUhDUF50bokTM30r4HUK_uvdmkijtjR4Z8s29fP12qSl0qCapW2fMCG3kpHfjIIob0MYhf6gNjLQ8ofwdW_Fk-ib-wX-9jDK66A_Z_NFzYDwrrXk1B3S_JJICX_jecLobNlzmydbWaqWIiNgLit1H_cMfKmi0tWiQ-oVUjDuXJhG_0IO00fEr54Mw/FOUNTAIN+OF+YOUTH+.mp4?dl=1", type: "MP4" }
       
        ]
         },
      "osi": {
        title: "Osiris (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/2LgA0xM3abiZYQR/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sickov",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://861520586.tapecontent.net/radosgw/2LgA0xM3abiZYQR/g1ywUOiA_j8xQos1W7zVcmGoa1K4OQCDGqv4TRaQL0EY-lHLVmGQL0iJ9UHmguL1RWj5TWcVVlTKjRwbNdIreIIF9bUHQRQNlCw9gApERJoNRimGB3AVl0dQ2rxnePJ_YIZDePJlrZwv7oCAH-1AF6nvWVXg_g5kJs9UZA8doBavyJB7PiK1yum79Uu1JZrjCsuJWLInBdAwdNRymVQCsr95j4Xb7uhQGw42eNxI5gbB08Ie1DghSCOgT5HYe03X_yoOyV-P8c_23u3X9iecT8Mpq3UTnHzuIBWubg/OSIRIS.+Sikov.mp4?dl=1", type: "MP4" }
       
        ]
         },
      "men": {
        title: "Men of honor B (2000)",
        embedCode: '<iframe width="426" height="240" frameborder="0" src="https://mega.nz/embed/ka0xHCSR#IOJNsVw8qMz9rdSB0mIiarSfYE95P6u78PPAhA4hAto" allowfullscreen ></iframe>',
        host: "Rocky",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
         },
      "mena": {
        title: "Men of honor B (2000)",
        embedCode: '<iframe width="426" height="240" frameborder="0" src="https://mega.nz/embed/C4B0wCrB#jar_rBf8_BNXRUsFEKDJ1vgt-PK62_MDDDK5zze9SAg" allowfullscreen ></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
        },"man": {
        title: "A working man B (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/3w9yJZGmmAHdgqv/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
      },"mana": {
        title: "A working man A (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/3w9yJZGmmAHdgqv/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
      },
     
      "movie-1": {
        title: "Shadow Force B (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/jgd9o0wAz9hzwL0/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
      },
      "forcea": {
        title: "Shadow Force A (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/xPMllybbdoTlXP/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
      },
     
      "movie-2": {
        title: "Knight and Day (2010)",
        embedCode: '<iframe width="426" height="240" frameborder="0" src="https://mega.nz/embed/XpoBgIJQ#T7SgXb5MXaKRNP1jdGRet19TLCKFFJuNwY43ZIjwJTQ" allowfullscreen ></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "4K", size: "3.2GB", url: "https://download.example.com/relay-4k.mp4", type: "MP4" }
         
        ]
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        embedCode: '<iframe width="426" height="240" frameborder="0" src="https://mega.nz/embed/nsBzHRIa#4FN0eDHfhSNWQVS79zsPr8szuGaLXT3GrjLcQBdcj2c" allowfullscreen ></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.6GB", url: "https://download.example.com/naked-gun-1080p.mp4", type: "MP4" }
         
        ]
      },
      "movie-4": {
        title: "Home sweet Home B",
        embedCode: '<iframe src="https://streamtape.com/e/XYDKrBZOJJHDpgJ/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "1080p", size: "2.1GB", url: "https://mega.nz/embed/CgRjkRQB#JsRPi4bihFKOMLaJRuWLDwRncChSnqBFkhigl_GkOfc", type: "MP4" }
        ]
      },
      "movie-5": {
        title: "Of king and prophet Ep4",
        embedCode: '<iframe width="426" height="240" frameborder="0" src="https://mega.nz/file/JakTFDbR#K7uvEHH_i5F1dye8tyKaSZkhVMBx-x4H4i9Av5WE_sw" allowfullscreen ></iframe>',
        host: "Rocky",
        downloadLinks: [
          { quality: "720p", size: "164.72 MB", url: "https://mega.nz/file/JakTFDbR#K7uvEHH_i5F1dye8tyKaSZkhVMBx-x4H4i9Av5WE_sw", type: "MP4" }
        ]
      },
       "movie-6": {
        title: "Of king and phophet Ep3",
        embedCode: '<iframe width="426" height="240" frameborder="0" src="https://mega.nz/embed/JP8WXBSY#kbExvoxlS7h2N3J-mZIZtjkRUpHY2vk6qKfYlfct5Sg" allowfullscreen ></iframe>',
        host: "Rocky",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://mega.nz/embed/JP8WXBSY#kbExvoxlS7h2N3J-mZIZtjkRUpHY2vk6qKfYlfct5Sg", type: "MP4" }
        ]
      },
      "movie-14": {
        title: "Of kings and prophets Ep2",
        embedCode: '<iframe width="426" height="240" frameborder="0" src="https://mega.nz/embed/JakTFDbR#K7uvEHH_i5F1dye8tyKaSZkhVMBx-x4H4i9Av5WE_sw" allowfullscreen ></iframe>',         
        host:"Mega.nz",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://download.example.com/i-kill-you-ep1-720p.mp4", type: "MP4" }
        ]
      },
      "movie-13": {
        title: "Of kings and prophets Ep1",
        embedCode: '<iframe width="240" height="624" frameborder="0" src="https://mega.nz/embed/5fsXCCrR#bwUs9Jbt5v35KVy6sNG8Sm0rp7rk20blJ4UYsuDa_3g" allowfullscreen ></iframe>',
        host: "Mega.nz",
        downloadLinks: [
          { quality: "720p", size: "450MB", url: "https://download.example.com/i-kill-you-ep1-720p.mp4", type: "MP4" }
        ]
      },
       "sweeta": {
        title: "Home sweet Home A",
        embedCode: '<iframe src="https://streamtape.com/e/BzWdVbXQbQiybJ2/" width="426" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',         
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
                <div 
                  className="w-full max-w-full aspect-[16/4]"
                  dangerouslySetInnerHTML={{ __html: videoInfo.embedCode }}
                />
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
