import { X, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

interface DownloadLink {
  quality: string;
  size: string | null;
  url: string;
  type: string;
}

interface VideoData {
  title: string;
  embedCode: string;
  host: string;
  downloadLinks: DownloadLink[];
}

const VideoPlayer = ({ isOpen, onClose, videoId }: VideoPlayerProps) => {
  const [dbVideo, setDbVideo] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (videoId && isOpen) {
      fetchVideoFromDB(videoId);
      // Update URL when video opens
      const currentPath = location.pathname;
      navigate(`${currentPath}?watch=${videoId}`, { replace: true });
    } else if (!isOpen && location.search.includes('watch=')) {
      // Remove query param when closing
      navigate(location.pathname, { replace: true });
    }
  }, [videoId, isOpen, navigate, location.pathname]);

  const fetchVideoFromDB = async (id: string) => {
    setLoading(true);
    
    const { data: video } = await supabase
      .from("videos")
      .select("*")
      .eq("video_key", id)
      .maybeSingle();

    if (video) {
      const { data: links } = await supabase
        .from("download_links")
        .select("*")
        .eq("video_id", video.id);

      setDbVideo({
        title: video.title,
        embedCode: video.embed_code,
        host: video.host || "",
        downloadLinks: (links || []).map(link => ({
          quality: link.quality,
          size: link.size || "",
          url: link.url,
          type: link.type,
        })),
      });
    } else {
      setDbVideo(null);
    }
    
    setLoading(false);
  };

  
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
        title: "Talk To me (2022)",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/y0DfytF1t" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://www.mediafire.com/file/cbtlb2718ej04qt/Talk_to_Me_Sankra.mp4/file?dkey=o6oaqpdsabi&r=1616", type: "MP4" }
          

          ]
         },
      "freed": {
        title: "Fifty Shades Of Freed",
        embedCode: '<iframe width="420" height="240" src="https://short.icu/DKppJiv5F" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "840MB", url: "https://www.mediafire.com/file/cxpglp2ys7ekhmp/Fifty_Shades_Freed.mp4/file", type: "MP4" }
          

          ]
         },
      "askme": {
        title: "Ask Me What You Want",
        embedCode: '<iframe width="420" height="240" src="https://short.icu/Y-LKlrcaw" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "872MB", url: "https://www.mediafire.com/file/moaknt5ns7dpo8c/Ask_me_what_you_want.mp4/file", type: "MP4" }
          

          ]
        },
      "child2": {
        title: "Childten Of Sister E2",
        embedCode: '<iframe width="420" height="240" src="https://short.icu/6KpKsy4rV" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Rocky",
        downloadLinks: [
          { quality: "720p", size: "430MB", url: "https://mega.nz/file/SYVVkCAQ#lhsAUqGCaGWPd2OyPTwE5HXmCaDLkdWie_FOROHSKXE", type: "MP4" }
          

          ]
        },
      "child1": {
        title: "Childten Of Sister E1",
        embedCode: '<iframe width="640" height="360" src="https://short.icu/fV4zKHKeg" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Rocky",
        downloadLinks: [
          { quality: "720p", size: "430MB", url: "https://mega.nz/file/6FlGDC4A#NguzCLvfvAu_Zb4jI2OaH0GNPvtNlCjmZ7eRJXn_6Tw", type: "MP4" }
          

          ]
        },
      "brink0": {
        title: "The Brink",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/SWTJx99kV" frameborder="0" scrolling="0" allowfullscreen></iframe>',
          host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "780MB", url: "https://www.mediafire.com/file/81hlgbke0m3uz46/The_Brink.mp4/file", type: "MP4" }
          

          ]
        },
      "bonne8": {
        title: "Bonne Appetit E8",
        embedCode: '<iframe width="420" height="240" src="https://short.icu/k0BHZjfxd" frameborder="0" scrolling="0" allowfullscreen></iframe>',
          host: "Rocky",
        downloadLinks: [
          { quality: "720p", size: "780MB", url: "https://www.mediafire.com/file/umx2pb2jshhw2xd/Bon_App%25C3%25A9tit%252C_Your_Majesty_S01e08.mp4/file", type: "MP4" }
          

          ]
        },
      "bonne7": {
        title: "Bonne Appetit E7",
        embedCode: '<iframe width="420" height="240" src="https://short.icu/d4TPZLpqw" frameborder="0" scrolling="0" allowfullscreen></iframe>',
          host: "Rocky",
        downloadLinks: [
          { quality: "720p", size: "780MB", url: "https://www.mediafire.com/file/w73d13xtaczj3tz/Bon_App%25C3%25A9tit%252C_Your_Majesty_S01e07.mp4/file", type: "MP4" }
          

          ]
        },
      "temp3": {
        title: "Tempest E3",
        embedCode: '<iframe width="420" height="240" src="https://short.icu/RZatsirCR" frameborder="0" scrolling="0" allowfullscreen></iframe>',
          host: "Junior",
        downloadLinks: [
          { quality: "720p", size: "780MB", url: "https://www.mediafire.com/file/yztj5i43w45w81b/Tempest_S01e03.mp4/file", type: "MP4" }
          

          ]
        },
      "temp2": {
        title: "Tempest E2",
        embedCode: '<iframe width="420" height="200" src="https://short.icu/LsgpWZXnt" frameborder="0" scrolling="0" allowfullscreen></iframe>',
          host: "Junior",
        downloadLinks: [
          { quality: "720p", size: "430MB", url: "https://www.mediafire.com/file/cjwb56sica0gv2j/Tempest+S01e02.mp4/file", type: "MP4" }
          

          ]
        },
      "temp1": {
        title: "Tempest E1",
        embedCode: '<iframe width="420" height="240" src="https://short.icu/2SnoC745H" frameborder="0" scrolling="0" allowfullscreen></iframe>',
          host: "Junior",
        downloadLinks: [
          { quality: "720p", size: "780MB", url: "https://www.mediafire.com/file/l0fob4ypkmgrq4l/Tempest_S01e01.mp4/file", type: "MP4" }
          

          ]
        },
      "shouse": {
        title: "Safe House",
        embedCode: '<iframe width="420" height="240" src="https://short.icu/KMZ9QwrF3" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "780MB", url: "https://www.mediafire.com/file/7konn8vhpmpzm04/Safe_House.mp4/file", type: "MP4" }
          

          ]
        },
      "housed6": {
        title: "House Of David S02 E6",
        embedCode: '<iframe width="420" height="240" src="https://short.icu/_Pk1L6tMu" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "720p", size: "400MB", url: "https://www.mediafire.com/file/wfyekw2tl2kgpgi/House_of_David_S01e06.mp4/file", type: "MP4" }
          

          ]
        },
      "housed5": {
        title: "House Of David S02 E5",
        embedCode: '<iframe width="640" height="360" src="https://short.icu/plWMBhGFY" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "720p", size: "400MB", url: "https://www.mediafire.com/file/1j28e9hwkbxfotp/House_of_David_S01e05.mp4/file", type: "MP4" }
          

          ]
        },
      "housed4": {
        title: "House Of David S02 E4",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/7n6I7wnh_" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "720p", size: "400MB", url: "https://www.mediafire.com/file/rpk8wx6c9kqxzae/House_of_David_S01e04.mp4/file", type: "MP4" }
          

          ]
        },
      "housed3": {
        title: "House Of David E3",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/7OnW-KXJr" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "720p", size: "400MB", url: "https://www.mediafire.com/file/g1gcalu6psuchdl/House_of_David_S01e03.mp4/file", type: "MP4" }
          

          ]
         },
      "hannah": {
        title: "Possession Of Hannah Grace",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/RoLM2hwI0" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "1GB", url: "https://www.mediafire.com/file/39qdn9hp1ei4ei3/The_Possession_Of_Hannah_Grace.mp4/file", type: "MP4" }
          

          ]
         },
      "bonne6": {
        title: "Bon Appetit E6",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/HZ9FU3U7Q" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "600MB", url: "https://www.mediafire.com/file/0jixmhdnd75dq7w/Bonne_Appetit_S01e06.mp4/file", type: "MP4" }
          

          ]
        },
      "bonne5": {
        title: "Bon Appetit E5",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/bvEMCivj1" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Rocky",
        downloadLinks: [
          { quality: "720p", size: "600MB", url: "https://www.mediafire.com/file/w1ut86rmwewaa5a/Bonne_Appetit_S01e05.mp4/file", type: "MP4" }
          

          ]
            },
      "lethal": {
        title: "Lethal Seduction",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/jqu2O8-L_" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://www.mediafire.com/file/ejh0nxj906w9r0w/Lathal_Seduction_.mp4/file", type: "MP4" }
          

          ]
      },
      "talk": {
        title: "Talk To me (2022)",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/y0DfytF1t" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://www.mediafire.com/file/cbtlb2718ej04qt/Talk_to_Me_Sankra.mp4/file?dkey=o6oaqpdsabi&r=1616", type: "MP4" }
          

          ]
        },
       "dangal": {
        title: "Dungal",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/V_NR2C-1d" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "Rocky",
        downloadLinks: [
          { quality: "720p", size: "700MB", url: "https://mega.nz/file/BkwlQCZI#4A83SB1CisNCCszaRowqgwtAxNAJTig4MAbuLzC0xCU", type: "MP4" }
          
        ]
         },
       "Bloodr2": {
        title: "Blood River E2",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/5POMefLlw" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "B The Great",
        downloadLinks: [
          { quality: "720p", size: "700MB", url: "https://www.mediafire.com/file/y5on3vi8wpu2lgx/Blood_River_S01e02.mp4/file?dkey=rdqppnr1o0x&r=1077", type: "MP4" }
          
        ]
        },
       "Bloodr1": {
        title: "Blood River E1",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/f0dqW2Qca" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "B The Great",
        downloadLinks: [
          { quality: "720p", size: "700MB", url: "https://www.mediafire.com/file/vteng74ao5yz5zm/Blood_River_S01e01.mp4/file", type: "MP4" }
          
        ]
        },
       "malef": {
        title: "Maleficent",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/diyS3HBM3" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "900MB", url: "https://www.mediafire.com/file/ygqwxgu0lwx0q2x/Malficent+Sankra.mp4/file", type: "MP4" }
          
        ]
        },
       "siren3": {
        title: "Siren E3",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/llKtNTDPO" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "Gaheza",
        downloadLinks: [
          { quality: "720p", size: "900MB", url: "https://www.mediafire.com/file/jtir52hga9i9a0e/Siren_S01e03.mp4/file", type: "MP4" }
          
        ]
        },
       "siren2": {
        title: "Siren E2",
        embedCode: '<iframe width="300" height="240" src="https://short.icu/43z41w5Dbr" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "Gaheza",
        downloadLinks: [
          { quality: "720p", size: "900MB", url: "https://www.mediafire.com/file/tjmd7o11c7kh3nw/Siren_S01e02.mp4/file", type: "MP4" }
          
        ]
         },
       "siren1": {
        title: "Siren E1",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/rkdgwAlr1" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "Gaheza",
        downloadLinks: [
          { quality: "720p", size: "900MB", url: "https://www.mediafire.com/file/l5y6c4ebhbiz4qa/Siren_S01e01.mp4/file", type: "MP4" }
          
        ]
        },
       "mine": {
        title: "Minecraft",
        embedCode: '<iframe width="350" height="250" src="https://short.icu/zw-8aAUIU" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "Gaheza",
        downloadLinks: [
          { quality: "720p", size: "900MB", url: "https://www.mediafire.com/file/bq35jg0s724ajhm/Minecraft.mp4/file?dkey=d181baz4kps&r=1847", type: "MP4" }
          
        ]
        },
       "yard": {
        title: "The Woman In The Yard",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/0EUXSIglz" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "Gaheza",
        downloadLinks: [
          { quality: "720p", size: "800MB", url: "https://www.mediafire.com/file/y6szm157tskgydb/The+Woman+In+The+Yard.mp4/file?dkey=hptwyw6ul21&r=812", type: "MP4" }
          
        ]
        },
       "meato": {
        title: "MIdnight Meat Train",
        embedCode: '<IFRAME SRC="https://hglink.to/e/vwv9wxjv0sds" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
         host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "790MB", url: "https://www.mediafire.com/file/u2t5a2chrb5y3oo/Watch_The_Midnight_Meat_Train_2020.mp4/file", type: "MP4" }
          
        ]
        },
       "vincenzoe": {
        title: "Vincenzo E5",
        embedCode: '<iframe width="350" height="240" src="https://short.icu/HhODjCUna" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "B The Great",
        downloadLinks: [
          { quality: "720p", size: "380MB", url: "https://short.icu/HhODjCUna", type: "MP4" }
          
        ]
        },
       "vincenzocd": {
        title: "Vincenzo E3&4 (Combined)",
        embedCode: '<iframe width="350" height="240" src="https://short.icu/8colzFqjn" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "B The Great",
        downloadLinks: [
          { quality: "720p", size: "380MB", url: "https://short.icu/8colzFqjn", type: "MP4" }
          
        ]
        },
       "vincenzoab": {
        title: "Vincenzo 1&2 (Combined)",
        embedCode: '<iframe width="400" height="240" src="https://short.icu/H6U2xzLZc" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "B The Great",
        downloadLinks: [
          { quality: "720p", size: "380MB", url: "https://short.icu/H6U2xzLZc", type: "MP4" }
          
        ]
        },
       "witche": {
        title: "The With's Game E5",
        embedCode: '<iframe width="350" height="240" src="https://short.icu/I49FxJKqv" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "B The Great",
        downloadLinks: [
          { quality: "720p", size: "380MB", url: "https://www.mediafire.com/file/4xpcvmgm801qpwh/The_Witch%2527s_Game_05.avi/file", type: "MP4" }
          
        ]
        },
       "witchd": {
        title: "The With's Game E4",
        embedCode: '<iframe width="350" height="240" src="https://short.icu/BBfzdgvxH" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "B The Great",
        downloadLinks: [
          { quality: "720p", size: "380MB", url: "https://www.mediafire.com/file/tl4itjm0gaw2vpy/The_Witch%2527s_Game_04.avi/file", type: "MP4" }
          
        ]
        },
       "witchc": {
        title: "The With's Game E3",
        embedCode: '<iframe width="380" height="240" src="https://short.icu/s9-MbOwAss" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "B The Great",
        downloadLinks: [
          { quality: "720p", size: "380MB", url: "https://www.mediafire.com/file/jot4z79ivqnqumm/The_Witch%2527s_Game_03.avi/file", type: "MP4" }
          
        ]
        },
       "witchb": {
        title: "The With's Game E2",
        embedCode: '<iframe width="350" height="240" src="https://short.icu/ZUwMsN3hN" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "B The Great",
        downloadLinks: [
          { quality: "720p", size: "380MB", url: "https://www.mediafire.com/file/lkhhxd7bmymvduj/The_Witch%2527s_Game_02.avi/file", type: "MP4" }
          
        ]
         },
       "witcha": {
        title: "The With's Game E1",
        embedCode: '<iframe width="350" height="240" src="https://short.icu/TQS_u04ky" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "B The Great",
        downloadLinks: [
          { quality: "720p", size: "380MB", url: "https://www.mediafire.com/file/rz2gysf77h4q5ia/The_Witch%2527s_Game_01.avi/file", type: "MP4" }
          
        ]
        },
       "fataleb": {
        title: "Fatale B",
        embedCode: '<IFRAME SRC="https://hglink.to/e/m5yi4p64c59s" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
         host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "880MB", url: "https://www.mediafire.com/file/annzn8ikola0m1e/Fatale_B.mp4/file", type: "MP4" }
          
        ]
        },
       "fatalea": {
        title: "Fatale A",
        embedCode: '<IFRAME SRC="https://hglink.to/e/js0c7kzwfyrr" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
         host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "560MB", url: "https://www.mediafire.com/file/vl49qxi0oh4f9nu/Fatale+A.mp4/file", type: "MP4" }
          
        ]
        },
       "cure1": {
        title: "The Cure",
        embedCode: '<iframe width="350" height="240" src="https://short.icu/O_7X85hjM" frameborder="0" scrolling="0" allowfullscreen></iframe>',
         host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "560MB", url: "https://www.mediafire.com/file/iilh923eoo5lw4u/The+Cure+Sankara.mp4/file", type: "MP4" }
          
        ]
         },
       "bonne4": {
        title: "Bon Appetit, Your majesty E4",
        embedCode: '<iframe width="350" height="240" src="https://short.icu/tcRONJCan" frameborder="0" scrolling="0" allowfullscreen></iframe>',
          host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "560MB", url: "https://www.mediafire.com/file/pzmesgycx74nnpp/BONNE+APPETIT+E04.mp4/file", type: "MP4" }
          
        ]
          },
       "bonne3": {
        title: "Bon Appetit, Your majesty E3",
        embedCode: '<iframe width="350" height="240" src="https://short.icu/AtcOrQ4sI" frameborder="0" scrolling="0" allowfullscreen></iframe>',
          host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "560MB", url: "https://www.mediafire.com/file/1by58yurxltt0sw/BONNE_APPETIT_E03.mp4/file", type: "MP4" }
          
        ]
        },
       "weab": {
        title: "The Weapons B",
        embedCode: '<IFRAME SRC="https://hglink.to/e/1rnvkmalqfnl" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
         host: "Gaheza",
        downloadLinks: [
          { quality: "720p", size: "990MB", url: "https://www.mediafire.com/file/0nux9cv1clrexzq/WEAPONS_B.mp4/file", type: "MP4" }
          
        ]
        },
       "fran": {
        title: "I, Frankenstein",
        embedCode: '<IFRAME SRC="https://hglink.to/e/0uem42k8p8si" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
         host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "990MB", url: "https://www.mediafire.com/file/cii9clb32du80ta/frankenstein_Sankara.mp4/file", type: "MP4" }
          
        ]
        },
       "weaa": {
        title: "The Weapons A",
        embedCode: '<IFRAME SRC="https://hglink.to/e/m2ch6ijzqnx3" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "720p", size: "990MB", url: "https://hglink.to/m2ch6ijzqnx3", type: "MP4" }
          
        ]
        },
       "celda6": {
        title: "Prison Cell 211 Ep6",
        embedCode: '<IFRAME SRC="https://hglink.to/e/evw11048hvzv" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Dylan",
        downloadLinks: [
          { quality: "720p", size: "990MB", url: "https://www.mediafire.com/file/51vsvytpq9u24o9/Prisoner_Cell_Ep6.mp4/file", type: "MP4" }
          
        ]
        },
       "celda5": {
        title: "Prison Cell 211 Ep5",
        embedCode: '<IFRAME SRC="https://hglink.to/e/lfahipe7m4rp" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Dylan",
        downloadLinks: [
          { quality: "720p", size: "990MB", url: "https://www.mediafire.com/file/ip1myrzpprr5rjh/Prisoner_Cell_Ep5.mp4/file", type: "MP4" }
          
        ]
        },
       "celda4": {
        title: "Prison Cell 211 Ep4",
        embedCode: '<IFRAME SRC="https://hglink.to/e/o9y56iti6cap" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Dylan",
        downloadLinks: [
          { quality: "720p", size: "990MB", url: "https://www.mediafire.com/file/xznlsi8rkf7jtt9/Prisoner_Cell_Ep4.mp4/file", type: "MP4" }
          
        ]
        },
       "celda3": {
        title: "Prison Cell 211 Ep3",
        embedCode: '<IFRAME SRC="https://hglink.to/e/6jqibhxee19c" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Dylan",
        downloadLinks: [
          { quality: "720p", size: "990MB", url: "https://www.mediafire.com/file/7comcpdphygsb84/Prisoner_Cell_Ep3.mp4/file", type: "MP4" }
          
        ]
        },
       "celda2": {
        title: "Prison Cell 211 Ep2",
        embedCode: '<IFRAME SRC="https://hglink.to/e/slkyd1q3gvk0" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Dylan",
        downloadLinks: [
          { quality: "720p", size: "990MB", url: "https://www.mediafire.com/file/nk5bn9ljnzc8p1c/Prisoner_Cell_Ep2.mp4/file", type: "MP4" }
          
        ]
        },
       "celda1": {
        title: "Prison Cell 211 Ep1",
        embedCode: '<IFRAME SRC="https://hglink.to/e/xvnik59lbove" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Dylan",
        downloadLinks: [
          { quality: "720p", size: "990MB", url: "https://www.mediafire.com/file/avwv3hj7y3ok6gm/Prisoner_Cell_ep1.mp4/file", type: "MP4" }
          
        ]
        },
       "bonne2": {
        title: "Bon Appetit, Your majesty E2",
        embedCode: '<IFRAME SRC="https://hglink.to/e/m8ocz30ojho8" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "560MB", url: "https://hglink.to/m8ocz30ojho8", type: "MP4" }
          
        ]
        },
       "bonne1": {
        title: "Bon Appetit, Your majesty E1",
        embedCode: '<IFRAME SRC="https://hglink.to/e/c42wz8gmu7eh" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "690MB", url: "https://hglink.to/c42wz8gmu7eh", type: "MP4" }
          
        ]
        },
       "lastmen": {
        title: "Our Last Men in Phillipine",
        embedCode: '<IFRAME SRC="https://hglink.to/e/3xm1e6zzup1n" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Dylan",
        downloadLinks: [
          { quality: "720p", size: "990MB", url: "https://hglink.to/3xm1e6zzup1n", type: "MP4" }
          
        ]
        },
       "housed2": {
        title: "House of David S02 E2",
        embedCode: '<IFRAME SRC="https://hglink.to/e/bovhc5z3j6fj" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "720p", size: "280MB", url: "https://hglink.to/bovhc5z3j6fj", type: "MP4" }
          
        ]
        },
       "housed1": {
        title: "House of David S02 E1",
        embedCode: '<IFRAME SRC="https://hglink.to/e/mh7kuwl0a1yd" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=200 allowfullscreen></IFRAME>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "720p", size: "270MB", url: "https://hglink.to/mh7kuwl0a1yd", type: "MP4" }
          
        ]
        },
       "ninja": {
        title: "Ninja shadow of tears",
        embedCode: '<IFRAME SRC="https://hglink.to/e/newifvj3llk9" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Sankara",
        downloadLinks: [
          { quality: "720p", size: "1GB", url: "https://hglink.to/newifvj3llk9", type: "MP4" }
          
        ]
        },
       "greenr": {
        title: "Green Lantern",
        embedCode: '<IFRAME SRC="https://hglink.to/e/4cn18at40vvp" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "B The great",
        downloadLinks: [
          { quality: "720p", size: "1GB", url: "https://hglink.to/4cn18at40vvp", type: "MP4" }
          
        ]
        },
       "evidence": {
        title: "Dangerous Evidence",
        embedCode: '<IFRAME SRC="https://hglink.to/e/1uhmjq8gvk1e" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "B The great",
        downloadLinks: [
          { quality: "720p", size: "1GB", url: "https://hglink.to/1uhmjq8gvk1e", type: "MP4" }
          
        ]
        },
       "bay": {
        title: "BayWatch",
        embedCode: '<IFRAME SRC="https://hglink.to/e/loqo0qa8toh7" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "1GB", url: "https://hglink.to/loqo0qa8toh7", type: "MP4" }
          
        ]
        },
       "sham": {
        title: "The Shaman",
        embedCode: '<IFRAME SRC="https://hglink.to/e/rzrcm3o6xote" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Mungeli",
        downloadLinks: [
          { quality: "720p", size: "1GB", url: "https://hglink.to/rzrcm3o6xote", type: "MP4" }
          
        ]
        },
       "home": {
        title: "The Home ",
        embedCode: '<IFRAME SRC="https://hglink.to/e/fxihunwx8f3a" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Mungeli",
        downloadLinks: [
          { quality: "720p", size: "1GB", url: "https://hglink.to/fxihunwx8f3a", type: "MP4" }
          
        ]
        },
       "bus": {
        title: "The lost Bus",
        embedCode: '<IFRAME SRC="https://hglink.to/e/j1nyj40n2hge" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Perfect",
        downloadLinks: [
          { quality: "720p", size: "1GB", url: "https://hglink.to/j1nyj40n2hge", type: "MP4" }
          
        ]
          },
       "bagb": {
        title: "Bagghi 4 B",
        embedCode: '<IFRAME SRC="https://hglink.to/e/pnm5j5c4lr56" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "1GB", url: "https://hglink.to/pnm5j5c4lr56", type: "MP4" }
          
        ]
        },
       "bag": {
        title: "Bagghi 4",
        embedCode: '<IFRAME SRC="https://hglink.to/e/46o7mqeqhslc" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "800MB", url: "https://hglink.to/46o7mqeqhslc", type: "MP4" }
          
        ]
        },
       "plyb": {
        title: "Play Dirty B",
        embedCode: '<IFRAME SRC="https://hglink.to/e/9cqlfveghs4q" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "720p", size: "800MB", url: "https://hglink.to/9cqlfveghs4q", type: "MP4" }
          
        ]
         },
       "plya": {
        title: "Play Dirty A",
        embedCode: '<IFRAME SRC="https://hglink.to/e/pai74spt8w7n" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "1GB", url: "https://hglink.to/pai74spt8w7n", type: "MP4" }
          
        ]
        },
       "sec": {
        title: "Section 375",
        embedCode: '<IFRAME SRC="https://hglink.to/e/24e3y8n9qzr4" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "720p", size: "1.2GB", url: "https://www.mediafire.com/file/aymp4845wgupyoq/Serction_375.mp4.mp4/file", type: "MP4" }
          
        ]
         },
       "com": {
        title: "Coming to America 2",
        embedCode: '<IFRAME SRC="https://hglink.to/e/1nyeirf97vms" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "638MB", url: "https://hglink.to/1nyeirf97vms", type: "MP4" }
          
        ]
        },
       "black8": {
        title: "Beauty In Black S02 E8",
        embedCode: '<IFRAME SRC="https://hglink.to/e/d2kdi9yvu072" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "638MB", url: "https://hglink.to/d2kdi9yvu072", type: "MP4" }
          
        ]
        },
       "black7": {
        title: "Beauty In Black S02 E7",
        embedCode: '<IFRAME SRC="https://hglink.to/e/uj8bl2odhfqm" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "638MB", url: "https://hglink.to/uj8bl2odhfqm", type: "MP4" }
          
        ]
        },
       "black6": {
        title: "Beauty In Black S02 E6",
        embedCode: '<IFRAME SRC="https://hglink.to/e/7ve39a9qw2oq" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "638MB", url: "https://hglink.to/7ve39a9qw2oq", type: "MP4" }
          
        ]
        },
       "black5": {
        title: "Beauty In Black S02 E5",
        embedCode: '<IFRAME SRC="https://hglink.to/e/qltzw4br7j7c" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "638MB", url: "https://hglink.to/qltzw4br7j7c", type: "MP4" }
          
        ]
        },
       "black4": {
        title: "Beauty In Black S02 E4",
        embedCode: '<IFRAME SRC="https://hglink.to/e/zn99152usbhz" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "638MB", url: "https://hglink.to/zn99152usbhz", type: "MP4" }
          
        ]
         
        },
       "black3": {
        title: "Beauty In Black S02 E3",
        embedCode: '<IFRAME SRC="https://hglink.to/e/9av7veqydtgb" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "638MB", url: "https://hglink.to/9av7veqydtgb", type: "MP4" }
          
        ]
        },
       "black2": {
        title: "Beauty In Black S02 E2",
        embedCode: '<IFRAME SRC="https://hglink.to/e/a7zpqyfkj9tz" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "638MB", url: "https://hglink.to/a7zpqyfkj9tz", type: "MP4" }
          
        ]
        },
       "black1": {
        title: "Beauty In Black S02 E1",
        embedCode: '<IFRAME SRC="https://hglink.to/e/0g41asjxvwd9" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "638MB", url: "https://hglink.to/0g41asjxvwd9", type: "MP4" }
          
        ]
        },
       "pickb": {
        title: "The Pickup B",
        embedCode: '<IFRAME SRC="https://hglink.to/e/66q2f9mkkrwn" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "720p", size: "638MB", url: "https://hglink.to/66q2f9mkkrwn", type: "MP4" }
          
        ]
        },
       "picka": {
        title: "The Pickup A",
        embedCode: '<IFRAME SRC="https://hglink.to/e/ic6zykl0r85w" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://hglink.to/ic6zykl0r85w", type: "MP4" }
          
        ]
       },
      "nun": {
        title: "The nun",
        embedCode: '<IFRAME SRC="https://hglink.to/e/r4415efpejjk" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=220 allowfullscreen></IFRAME>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://hglink.to/r4415efpejjk", type: "MP4" }
          
        ]
        },
      "war2": {
        title: "War (2) B",
        embedCode: '<IFRAME SRC="https://hglink.to/e/doqjjy4ekcj9" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=350 HEIGHT=220 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://hglink.to/doqjjy4ekcj9", type: "MP4" }
          
        ]
        },
      "war1": {
        title: "War (2) A",
        embedCode: '<IFRAME SRC="https://hglink.to/e/w4qt5nfiakg2" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://hglink.to/w4qt5nfiakg2", type: "MP4" }
          
        ]
        },
      "warc": {
        title: "War (1) C",
        embedCode: '<IFRAME SRC="https://hglink.to/e/rdtcesoqwpmk" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://hglink.to/rdtcesoqwpmk", type: "MP4" }
          
        ]
        },
      "warb": {
        title: "War (1) B ",
        embedCode: '<IFRAME SRC="https://hglink.to/e/vuu3rrp4c1ir" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://hglink.to/vuu3rrp4c1ir", type: "MP4" }
          
        ]
        },
      "wara": {
        title: "War (1) A",
        embedCode: '<IFRAME SRC="https://hglink.to/e/08w8igto8nqo" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://hglink.to/08w8igto8nqo", type: "MP4" }
          
        ]
      },
      "aft": {
        title: "AfterBurn (2025)",
        embedCode: '<IFRAME SRC="https://hglink.to/e/3hbgq5b238bo" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://www.mediafire.com/file/qtx7odcyypjzv1h/AFTERBURN.MP4/file", type: "MP4" }
          
        ]
        },  
      "mahb": {
        title: "Mahrashi B",
        embedCode: '<IFRAME SRC="https://hglink.to/e/apfco53akwso" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.58GB", url: "https://hglink.to/apfco53akwso", type: "MP4" }
        ]
         },  
      "maha": {
        title: "Mahrashi A",
        embedCode: '<iframe src="https://streamtape.com/e/Q2Dk2gQeXJsw0D/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.58GB", url: "https://streamtape.com/v/Q2Dk2gQeXJsw0D/Maharshi_New_Hd.mp4", type: "MP4" }
        ]
        },  
      "ele8": {
        title: "Twelve  S01 EP8",
        embedCode: '<iframe src="https://streamtape.com/e/W3xxRp71aQhb3Z4/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Mungeli",
        downloadLinks: [
          { quality: "1080p", size: "680MB", url: "https://streamtape.com/v/W3xxRp71aQhb3Z4/S01_-_EP08_-_Final_-_Twelve.mp4", type: "MP4" }
        ]
        },  
      "ele7": {
        title: "Twelve  S01 EP7",
        embedCode: '<iframe src="https://streamtape.com/e/XYd6XVMO41uDVl2/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Mungeli",
        downloadLinks: [
          { quality: "1080p", size: "680MB", url: "https://streamtape.com/v/XYd6XVMO41uDVl2/S01_-_EP07_-_Twelve.mp4", type: "MP4" }
        ]
        },  
      "ele6": {
        title: "Twelve  S01 EP6",
        embedCode: '<iframe src="https://streamtape.com/e/7zXMDa8R4piVwK/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Mungeli",
        downloadLinks: [
          { quality: "1080p", size: "680MB", url: "https://streamtape.com/v/7zXMDa8R4piVwK/S01_-_EP06_-_Twelve.mp4", type: "MP4" }
        ]
        },  
      "ele5": {
        title: "Twelve  S01 EP5",
        embedCode: '<iframe src="https://streamtape.com/e/qyWwjbqzpwCzG9g/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Mungeli",
        downloadLinks: [
          { quality: "1080p", size: "680MB", url: "https://streamtape.com/v/qyWwjbqzpwCzG9g/S01_-_EP05_-_Twelve.mp4", type: "MP4" }
        ]
        },  
      "ele4": {
        title: "Twelve  S01 EP4",
        embedCode: '<iframe src="https://streamtape.com/e/2BrXX6ZPeXTZ9gJ/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Mungeli",
        downloadLinks: [
          { quality: "1080p", size: "680MB", url: "https://streamtape.com/v/2BrXX6ZPeXTZ9gJ/S01_-_EP04_-_Twelve.mp4", type: "MP4" }
        ]
        },  
      "ele3": {
        title: "Twelve  S01 EP3",
        embedCode: '<iframe src="https://streamtape.com/e/BO8AOlYzOdHyL07/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Mungeli",
        downloadLinks: [
          { quality: "1080p", size: "680MB", url: "https://streamtape.com/v/BO8AOlYzOdHyL07/S01_-_EP03_-_Twelve.mp4", type: "MP4" }
        ]
        },  
      "ele2": {
        title: "Twelve  S01 EP2",
        embedCode: '<iframe src="https://streamtape.com/e/yl80Qvrvzyu3Jj/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Mungeli",
        downloadLinks: [
          { quality: "1080p", size: "680MB", url: "https://streamtape.com/v/yl80Qvrvzyu3Jj/S01_-_EP02_-_Twelve.mp4", type: "MP4" }
        ]
        },  
      "ele1": {
        title: "Twelve  S01 EP1",
        embedCode: '<iframe src="https://streamtape.com/e/RmW2mxxXPgSdM73/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Mungeli",
        downloadLinks: [
          { quality: "1080p", size: "680MB", url: "https://streamtape.com/v/RmW2mxxXPgSdM73/S01_-_EP01_-_Twelve.mp4", type: "MP4" }
        ]
   
        },  
      "ila7": {
        title: "I Land EP7 Final",
        embedCode: '<IFRAME SRC="https://hglink.to/e/ygmfrr30qjb7" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/ygmfrr30qjb7", type: "MP4" }
        ]
        },  
      "ila6": {
        title: "I Land EP6",
        embedCode: '<IFRAME SRC="https://hglink.to/e/1jz19md9zgwq" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/1jz19md9zgwq", type: "MP4" }
        ]
        },  
      "ila5": {
        title: "I Land EP5",
        embedCode: '<IFRAME SRC="https://hglink.to/e/f44otrll7efl" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/f44otrll7efl", type: "MP4" }
        ]
        },  
      "ila4": {
        title: "I Land EP4",
        embedCode: '<IFRAME SRC="https://hglink.to/e/f88xl601s3e1" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/f88xl601s3e1", type: "MP4" }
        ]
        },  
      "ila3": {
        title: "I Land EP3",
        embedCode: '<IFRAME SRC="https://hglink.to/e/6wci0rzrgkw7" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/6wci0rzrgkw7", type: "MP4" }
        ]
        },  
      "ila2": {
        title: "I Land EP2",
        embedCode: '<IFRAME SRC="https://hglink.to/e/hyv5d3yeo16n" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/hyv5d3yeo16n", type: "MP4" }
        ]
         },  
      "ila1": {
        title: "I Land EP1",
        embedCode: '<IFRAME SRC="https://hglink.to/e/9m7j04v2zay5" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/9m7j04v2zay5", type: "MP4" }
        ]
     
        
        },  
      "aar8": {
        title: "Aar Ya Paar EP8 Final",
        embedCode: '<IFRAME SRC="https://hglink.to/e/mm7nj5b5g7sx" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/mm7nj5b5g7sx", type: "MP4" }
        ]
        },  
      "aar7": {
        title: "Aar Ya Paar EP7",
        embedCode: '<IFRAME SRC="https://hglink.to/e/ua4d0c8ntjdo" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/ua4d0c8ntjdo", type: "MP4" }
        ]
        },  
      "aar6": {
        title: "Aar Ya Paar EP6",
        embedCode: '<IFRAME SRC="https://hglink.to/e/n03c98lsxumn" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/n03c98lsxumn", type: "MP4" }
        ]
        },  
      "aar5": {
        title: "Aar Ya Paar EP5",
        embedCode: '<IFRAME SRC="https://hglink.to/e/tdtfq9bavzy2" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/tdtfq9bavzy2", type: "MP4" }
        ]
        },  
      "aar4": {
        title: "Aar Ya Paar EP4",
        embedCode: '<IFRAME SRC="https://hglink.to/e/re5mtsizwo1a" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/re5mtsizwo1a", type: "MP4" }
        ]
        },  
      "aar3": {
        title: "Aar Ya Paar EP3",
        embedCode: '<IFRAME SRC="https://hglink.to/e/2rboev1ftk26" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/2rboev1ftk26", type: "MP4" }
        ]
        },  
      "aar2": {
        title: "Aar Ya Paar EP2",
        embedCode: '<IFRAME SRC="https://hglink.to/e/gzgo0p8aukre" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/gzgo0p8aukre", type: "MP4" }
        ]
        },  
      "aar1": {
        title: "Aar Ya Paar EP1",
        embedCode: '<IFRAME SRC="https://hglink.to/e/m95rix598v4b" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/m95rix598v4b", type: "MP4" }
        ]
         },  
      "misb": {
        title: "Mission impossible Dead reckoning B",
        embedCode: '<iframe src="https://streamtape.com/e/WyWWlrMGGgtrDe/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "680MB", url: "https://streamtape.com/v/WyWWlrMGGgtrDe/MI00A8%7E1.MP4.mp4", type: "MP4" }
        ]
        },  
      
      "misa": {
        title: "Mission impossible Dead reckoning A",
        embedCode: '<iframe src="https://streamtape.com/e/6PerJ2YpeMFLMV/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.1GB", url: "https://streamtape.com/v/6PerJ2YpeMFLMV/MISSIO%7E1.MP4.mp4", type: "MP4" }
        ]
        },  
      "cov": {
        title: "Coverant War",
        embedCode: '<iframe src="https://streamtape.com/e/BqoAQaZOe0UyJJx/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Dylan Kabaka",
        downloadLinks: [
          { quality: "1080p", size: "1.1GB", url: "https://streamtape.com/v/BqoAQaZOe0UyJJx/THE_COVENAT_WAR_2023.mp4", type: "MP4" }
        ]
        },  
      "over": {
        title: "Override",
        embedCode: '<iframe src="https://streamtape.com/e/QAlm693QDAT0m0v/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "420MB", url: "https://streamtape.com/v/QAlm693QDAT0m0v/OVERDRIVE.mp4", type: "MP4" }
        ]
        },  
      "boy": {
        title: "Boy Kills World",
        embedCode: '<iframe src="https://streamtape.com/e/6qVW4oYPWzI9Xko/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "420MB", url: "https://streamtape.com/v/6qVW4oYPWzI9Xko/THE_BOY_KILLS_THE_WORLD.mp4", type: "MP4" }
        ]
      },  
      "ski": {
        title: "Skinfold: Death sentence",
        embedCode: '<iframe src="https://streamtape.com/e/A2RoJddeyRiBpJ/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "420MB", url: "https://streamtape.com/v/A2RoJddeyRiBpJ/%21SKINFOLD_DEATH_SENTENCE.mp4", type: "MP4" }
        ]
      },
        "blo": {
        title: "Blood Brothers B",
        embedCode: '<iframe src="https://streamtape.com/e/elbA18jKdyTJWl/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.06GB", url: "https://streamtape.com/v/elbA18jKdyTJWl/Blood_Brothers_B.mp4", type: "MP4" }
        ]
        },
          

        "bloa": {
        title: "Blood Brothers A",
        embedCode: '<iframe src="https://streamtape.com/e/6x9wrjZZ7KuVoK/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.06GB", url: "https://streamtape.com/v/6x9wrjZZ7KuVoK/Blood_Brothers_A.mp4", type: "MP4" }
        ]
        },
        "dir": {
        title: "Dirty Angel",
        embedCode: '<iframe src="https://streamtape.com/e/093OdWOPP4S6wo/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "1080p", size: "1.06GB", url: "https://streamtape.com/v/093OdWOPP4S6wo/DIRTY_ANGELS.mp4", type: "MP4" }
        ]
          },
        "lost8": {
        title: "Lost in Love Ep8",
        embedCode: '<iframe src="https://streamtape.com/e/PvO9GrMWWBhg8m/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "538MB", url: "https://streamtape.com/v/PvO9GrMWWBhg8m/Lost_In_Love_Ep8.mp4", type: "MP4" }
        ]
        },
        "lost6": {
        title: "Lost in Love Ep6",
        embedCode: '<iframe src="https://streamtape.com/e/PvO9GrMWWBhg8m/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "538MB", url: "https://streamtape.com/v/PvO9GrMWWBhg8m/Lost_In_Love_Ep6.mp4", type: "MP4" }
        ]
        },
        "lost7": {
        title: "Lost in Love Ep7",
        embedCode: '<iframe src="https://streamtape.com/e/9WL1OBMLbMcYLm/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "538MB", url: "https://streamtape.com/v/9WL1OBMLbMcYLm/Lost_In_Love_Ep7.mp4", type: "MP4" }
        ]
      },
        "lost5": {
        title: "Lost in Love Ep5",
        embedCode: '<iframe src="https://streamtape.com/e/o61WQ802WQCjXB/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "538MB", url: "https://streamtape.com/v/o61WQ802WQCjXB/Lost_In_Love_Ep5.mp4", type: "MP4" }
        ]
      },
      "lost4": {
        title: "Lost in Love Ep4",
        embedCode: '<iframe src="https://streamtape.com/e/dP30X719vaTkwwx/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "523MB", url: "https://streamtape.com/v/dP30X719vaTkwwx/Lost_In_Love_Ep4.mp4", type: "MP4" }
        ]
          },
      "lost3": {
        title: "Lost in Love Ep3",
        embedCode: '<iframe src="https://streamtape.com/e/XJ8m9bv1BbhZAa/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "518MB", url: "https://streamtape.com/v/XJ8m9bv1BbhZAa/Lost_In_Love_Ep3.mp4", type: "MP4" }
        ]
          },
      "lost2": {
        title: "Lost in Love Ep2",
        embedCode: '<iframe src="https://streamtape.com/e/GQz4jgq7K8CY88/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "534MB", url: "https://streamtape.com/v/GQz4jgq7K8CY88/Lost_In_Love_Ep2.mp4", type: "MP4" }
        ]
        },
      "lost1": {
        title: "Lost in Love Ep1",
        embedCode: '<iframe src="https://streamtape.com/e/Dlo1PyjrZ4tkzxp/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "538MB", url: "https://streamtape.com/v/Dlo1PyjrZ4tkzxp/Lost_In_Love_Ep1.mp4", type: "MP4" }
        ]
        },
      "goh": {
        title: "Ghost Rider",
        embedCode: '<iframe src="https://streamtape.com/e/0d1qxpvz3xtb7Pr/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "1.3GB", url: "https://streamtape.com/v/0d1qxpvz3xtb7Pr/Ghost_Rider_Sankara.mp4", type: "MP4" }
        ]
        },
      "dep": {
        title: "Deep Water (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/8vKRRY1dV9ioAwv/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/8vKRRY1dV9ioAwv/Deep_Water.mp4", type: "MP4" }
        ]
         },
      "sin": {
        title: "Sinners B",
        embedCode: '<iframe src="https://streamtape.com/e/ApoJ9j7dWecXdXz/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/ApoJ9j7dWecXdXz/SINNERS_B.mp4",type: "MP4" }
        ]
        },
      "sina": {
        title: "Sinners A ",
        embedCode: '<iframe src="https://streamtape.com/e/pz2PGjzal9tAzq/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/pz2PGjzal9tAzq/SINNERS_.mp4", type: "MP4" }
       
        ]
         },
        "bac": {
        title: "Back on Society",
        embedCode: '<iframe src="https://streamtape.com/e/7Bp2kAPj4QiAeKX/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Junior Giti",
        downloadLinks: [
          { quality: "1080p", size: "1.06GB", url: "https://streamtape.com/v/7Bp2kAPj4QiAeKX/BACK_ON_SOCIETY.mp4", type: "MP4" }
      ]
           },
      "exo": {
        title: "The exorcism of God ",
        embedCode: '<iframe src="https://streamtape.com/e/p43Z8lPL2xTrg48/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/p43Z8lPL2xTrg48/THE_EXORRCISM_OF_THE_GOD_BY_SANKRA.mp4", type: "MP4"}
        ]
        },
      "fou": {
        title: "Fountain of youth B",
        embedCode: '<iframe src="https://streamtape.com/e/mYkXGrGrYJHbLRw/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/mYkXGrGrYJHbLRw/FOUNTAIN_OF_YOUTH_B.mp4", type: "MP4"}
        ]
         },
      "sar": {
        title: "Sarzamen",
        embedCode: '<iframe src="https://streamtape.com/e/9bYWMkpB3Xc1k9/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sickov",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/9bYWMkpB3Xc1k9/Sarzameen.mp4", type: "MP4" }
       
        ]
        },
      "foua": {
        title: "Fountain of youth A",
        embedCode: '<iframe src="https://streamtape.com/e/xeeoAxOV9lTQ2e/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/xeeoAxOV9lTQ2e/FOUNTAIN_OF_YOUTH_.mp4", type: "MP4" }
       
        ]
         },
      "osi": {
        title: "Osiris (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/2LgA0xM3abiZYQR/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sickov",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/2LgA0xM3abiZYQR/OSIRIS._Sikov.mp4", type: "MP4" }
       
        ]
         },
      "men": {
        title: "Men of honor B (2000)",
        embedCode: '<iframe width="420" height="240" frameborder="0" src="https://mega.nz/embed/ka0xHCSR#IOJNsVw8qMz9rdSB0mIiarSfYE95P6u78PPAhA4hAto" allowfullscreen ></iframe>',
        host: "Rocky",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
         },
      "mena": {
        title: "Men of honor A (2000)",
        embedCode: '<iframe width="420" height="240" frameborder="0" src="https://mega.nz/embed/C4B0wCrB#jar_rBf8_BNXRUsFEKDJ1vgt-PK62_MDDDK5zze9SAg" allowfullscreen ></iframe>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://download.example.com/freakier-friday-1080p.mp4", type: "MP4" }
       
        ]
        },"man": {
        title: "A working man B (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/3w9yJZGmmAHdgqv/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/3w9yJZGmmAHdgqv/A_WORKING_MAN_B.mp4", type: "MP4" }
       
        ]
      },"mana": {
        title: "A working man A (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/3w9yJZGmmAHdgqv/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/VBmDG0aQoVF992/A_WARKING_MAN_A.mp4", type: "MP4" }
       
        ]
      },
     
      "movie-1": {
        title: "Shadow Force B (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/jgd9o0wAz9hzwL0/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/jgd9o0wAz9hzwL0/SHADOW_FORCE_B.mp4", type: "MP4" }
       
        ]
      },
      "forcea": {
        title: "Shadow Force A (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/xPMllybbdoTlXP/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.2GB", url: "https://streamtape.com/v/xPMllybbdoTlXP/SHADOW_FORCE_A.mp4", type: "MP4" }
       
        ]
      },
     
      "movie-2": {
        title: "Knight and Day (2010)",
        embedCode: '<iframe src="https://streamtape.com/e/MqRGVMed3dSB4B/" width="420" height="420" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "4K", size: "3.2GB", url: "https://streamtape.com/v/MqRGVMed3dSB4B/Knight_And_Day.mp4", type: "MP4" }
         
        ]
      },
      "movie-3": {
        title: "Naked Gun (2025)",
        embedCode: '<iframe src="https://streamtape.com/e/Ba7L4dpbgQHVmv/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.6GB", url: "https://streamtape.com/v/Ba7L4dpbgQHVmv/THE_NAKED_GUN_BY_GAHEZA.MP4.mp4", type: "MP4" }
         
        ]
      },
      "movie-4": {
        title: "Home sweet Home B",
        embedCode: '<iframe src="https://streamtape.com/e/XYDKrBZOJJHDpgJ/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Savimbi",
        downloadLinks: [
          { quality: "1080p", size: "2.1GB", url: "https://streamtape.com/v/XYDKrBZOJJHDpgJ/HOME_SWEET_HOME_B.mp4", type: "MP4" }
        ]
      
      },
       "sweeta": {
        title: "Home sweet Home A",
        embedCode: '<iframe src="https://streamtape.com/e/BzWdVbXQbQiybJ2/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',         
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

  const videoInfo = videoId ? (dbVideo || getVideoInfo(videoId)) : null;

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
      <DialogContent className="max-w-[98vw] sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl w-full p-0 bg-black border-border max-h-[98vh] overflow-hidden flex flex-col">
        <div className="relative flex-shrink-0">
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-black/90 hover:bg-primary text-white shadow-lg"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          
          {videoInfo && (
            <>
              {/* Video Player Area - Responsive aspect ratio */}
              <div className="relative bg-black flex items-center justify-center w-full">
                {videoInfo.embedCode ? (
                  <div 
                    className="w-full aspect-video max-h-[50vh] sm:max-h-[60vh] [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:absolute [&>iframe]:inset-0 relative"
                    dangerouslySetInnerHTML={{ __html: videoInfo.embedCode }}
                  />
                ) : (
                  <div className="w-full aspect-video max-h-[50vh] sm:max-h-[60vh] flex items-center justify-center text-white">
                    <span className="text-sm sm:text-base">Loading video player...</span>
                  </div>
                )}
              </div>

              {/* Video Info and Download Section - Scrollable */}
              <div className="p-4 sm:p-5 lg:p-6 bg-gray-900 text-white overflow-y-auto flex-1 min-h-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">{videoInfo.title}</h2>
                    <span className="text-sm sm:text-base text-muted-foreground">
                      Host: {videoInfo.host}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => window.open(getSrcFromEmbedCode(videoInfo.embedCode), '_blank')}
                    className="text-white border-white/30 hover:bg-white/10 w-full sm:w-auto flex-shrink-0"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Original
                  </Button>
                </div>
                
                {/* Download Section */}
                <div className="mt-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center text-foreground">
                    <Download className="h-5 w-5 mr-2" />
                    Download Options
                  </h3>
                  
                  {videoInfo.downloadLinks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                      {videoInfo.downloadLinks.map((link, index) => (
                        <div key={index} className="border border-border rounded-lg p-4 bg-card hover:bg-accent transition-all duration-200 hover:shadow-lg">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-primary text-lg">{link.quality}</span>
                            <span className="text-sm text-muted-foreground font-medium">{link.size}</span>
                          </div>
                          <div className="flex flex-col gap-3">
                            <span className="text-sm text-foreground/80">{link.type}</span>
                            <Button
                              size="default"
                              onClick={() => handleDownload(link.url, `${videoInfo.title} - ${link.quality}.mp4`)}
                              className="bg-primary hover:bg-primary-glow text-primary-foreground font-semibold w-full shadow-lg hover:shadow-xl transition-all"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 sm:py-8 text-muted-foreground">
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
