import { X, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (videoId && isOpen) {
      fetchVideoFromDB(videoId);
    }
  }, [videoId, isOpen]);

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
        title: "AfterBurn (2025)",
        embedCode: '<IFRAME SRC="https://hglink.to/e/3hbgq5b238bo" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Gaheza",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://hglink.to/3hbgq5b238b", type: "MP4" }
          
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
        embedCode: '<IFRAME SRC="https://hglink.to/e/r4415efpejjk" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://hglink.to/r4415efpejjk", type: "MP4" }
          
        ]
        },
      "war2": {
        title: "War (2) B",
        embedCode: '<IFRAME SRC="https://hglink.to/e/w4qt5nfiakg2" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Rocky kimomo",
        downloadLinks: [
          { quality: "1080p", size: "1.5GB", url: "https://hglink.to/w4qt5nfiakg2", type: "MP4" }
          
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
        embedCode: '<iframe src="https://streamtape.com/e/LvKXG3VbWpCRpPV/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://streamtape.com/v/LvKXG3VbWpCRpPV/S01_-_EP08_-_Final_-_Aar_Ya_Paar.mp4", type: "MP4" }
        ]
        },  
      "aar7": {
        title: "Aar Ya Paar EP7",
        embedCode: '<iframe src="https://streamtape.com/e/l2LZVJBK0as7KJd/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://streamtape.com/v/l2LZVJBK0as7KJd/S01_-_EP07_-_Aar_Ya_Paar.mp4", type: "MP4" }
        ]
        },  
      "aar6": {
        title: "Aar Ya Paar EP6",
        embedCode: '<iframe src="https://streamtape.com/e/Ap8B38MkDyfZAY/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://streamtape.com/v/Ap8B38MkDyfZAY/S01_-_EP06_-_Aar_Ya_Paar.mp4", type: "MP4" }
        ]
        },  
      "aar5": {
        title: "Aar Ya Paar EP5",
        embedCode: '<iframe src="https://streamtape.com/e/0RMg2prJOWsb93x/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://streamtape.com/v/0RMg2prJOWsb93x/S01_-_EP05_-_Aar_Ya_Paar.mp4", type: "MP4" }
        ]
        },  
      "aar4": {
        title: "Aar Ya Paar EP4",
        embedCode: '<iframe src="https://streamtape.com/e/3JmjKrvOQbUdOA1/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://streamtape.com/v/3JmjKrvOQbUdOA1/S01_-_EP04_-_Aar_Ya_Paar.mp4", type: "MP4" }
        ]
        },  
      "aar3": {
        title: "Aar Ya Paar EP3",
        embedCode: '<iframe src="https://streamtape.com/e/d3O6Gk4gqkckLrZ/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://streamtape.com/v/d3O6Gk4gqkckLrZ/S01_-_EP03_-_Aar_Ya_Paar.mp4", type: "MP4" }
        ]
        },  
      "aar2": {
        title: "Aar Ya Paar EP2",
        embedCode: '<iframe src="https://streamtape.com/e/066yBok29LsKBZ/" width="420" height="240" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://streamtape.com/v/066yBok29LsKBZ/S01_-_EP02_-_Aar_Ya_Paar.mp4", type: "MP4" }
        ]
        },  
      "aar1": {
        title: "Aar Ya Paar EP1",
        embedCode: '<<IFRAME SRC="https://hglink.to/e/8rlj17a4z8v6" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=420 HEIGHT=240 allowfullscreen></IFRAME>',
        host: "Sankara",
        downloadLinks: [
          { quality: "1080p", size: "330MB", url: "https://hglink.to/e/8rlj17a4z8v6", type: "MP4" }
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
                        <div key={index} className="border border-gray-420 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-blue-300 text-sm">{link.quality}</span>
                            <span className="text-xs text-gray-400">{link.size}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <span className="text-xs text-gray-300">{link.type}</span>
                            <Button
                              size="sm"
                              onClick={() => handleDownload(link.url, `${videoInfo.title} - ${link.quality}.mp4`)}
                              className="bg-green-420 hover:bg-green-700 text-xs w-full sm:w-auto"
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
