import { useEffect, useState } from "react";

// Session-based tracking: ads show once per page load, then stop
const getPageSessionKey = () => {
  // Unique key per page path
  return `monetag_shown_${window.location.pathname}`;
};

const hasShownAdsThisSession = (): boolean => {
  return sessionStorage.getItem(getPageSessionKey()) === "true";
};

const markAdsShownThisSession = () => {
  sessionStorage.setItem(getPageSessionKey(), "true");
};

const appendMonetagScriptOnce = (zone: string, src: string) => {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[data-zone="${zone}"]`)) return;

  const script = document.createElement("script");
  script.dataset.zone = zone;
  script.src = src;
  script.async = true;

  const target = (document.body || document.documentElement) as HTMLElement;
  target.appendChild(script);
};

// Monetag Inpush Ads - loads once per page session
export const MonetagInpush = () => {
  return null;
};

// Monetag Vignette Ads - loads once per page session
export const MonetagVignette = () => {
  return null;
};

/**
 * Loads 2 Monetag Vignette banners - no timer delay, immediate pop.
 * Only fires once per page session.
 */
export const MonetagAdsBootstrap = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (hasShownAdsThisSession()) return;
    markAdsShownThisSession();
    setShouldLoad(true);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    // Supporters vignette ad (zone 10527776) - immediate pop
    appendMonetagScriptOnce("10527776", "https://omg10.com/vignette.min.js");

    // General vignette ad (zone 10527843) - immediate pop
    appendMonetagScriptOnce("10527843", "https://nap5k.com/tag.min.js");

  }, [shouldLoad]);

  return null;
};