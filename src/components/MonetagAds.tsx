import { useEffect } from "react";

export const MonetagInpush = () => null;
export const MonetagVignette = () => null;

export const MonetagAdsBootstrap = () => {
  useEffect(() => {
    const loadVignette = (zoneId: string) => {
      try {
        const script = document.createElement("script");
        script.src = `https://omg10.com/vignette.min.js?zone=${zoneId}`;
        script.setAttribute("data-zone", zoneId);
        script.async = true;
        script.onload = () => console.log(`Vignette ${zoneId} loaded`);
        script.onerror = () => console.error(`Failed to load vignette ${zoneId}`);
        document.body.appendChild(script);
      } catch (e) {
        console.error("Error loading vignette:", e);
      }
    };

    const loadGeneral = () => {
      try {
        const script = document.createElement("script");
        script.src = "https://nap5k.com/vignette.min.js?zone=10527843";
        script.setAttribute("data-zone", "10527843");
        script.async = true;
        script.onload = () => console.log("General vignette loaded");
        script.onerror = () => console.error("Failed to load general vignette");
        document.body.appendChild(script);
      } catch (e) {
        console.error("Error loading general vignette:", e);
      }
    };

    // Load supporters vignette first
    loadVignette("10527776");
    
    // Load general vignette after short delay
    setTimeout(loadGeneral, 3000);
  }, []);

  return null;
};