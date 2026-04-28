import { useEffect } from "react";
import ADSENSE_CONFIG from "@/config/adsense";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSenseLoader = () => {
  useEffect(() => {
    if (document.querySelector('script[data-adsense-loaded="true"]')) {
      return;
    }

    const script = document.createElement("script");
    script.setAttribute("data-adsense-loaded", "true");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${ADSENSE_CONFIG.PUB_ID}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.adClient = `ca-pub-${ADSENSE_CONFIG.PUB_ID}`;
    
    document.head.appendChild(script);

    return () => {};
  }, []);

  return null;
};

export default AdSenseLoader;