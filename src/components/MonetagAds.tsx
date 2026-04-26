import { useEffect } from "react";

export const MonetagInpush = () => null;
export const MonetagVignette = () => null;

export const MonetagAdsBootstrap = () => {
  useEffect(() => {
    if (window.monetag) return;
    
    (window as any).monetag = {
      zoneid: 10527776
    };

    const script = document.createElement("script");
    script.src = "https://omg10.com/vignette.min.js";
    script.async = true;
    script.onload = () => {
      console.log("Monetag vignette loaded successfully");
      
      // Try loading second zone after a short delay
      setTimeout(() => {
        (window as any).monetag = { zoneid: 10527843 };
        const script2 = document.createElement("script");
        script2.src = "https://nap5k.com/vignette.min.js";
        script2.async = true;
        document.head.appendChild(script2);
      }, 2000);
    };
    
    document.head.appendChild(script);
  }, []);

  return null;
};