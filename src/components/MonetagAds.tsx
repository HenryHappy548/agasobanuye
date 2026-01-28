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
  useEffect(() => {
    if (hasShownAdsThisSession()) return;
    appendMonetagScriptOnce("10527843", "https://nap5k.com/tag.min.js");
  }, []);

  return null;
};

// Monetag Vignette Ads - loads once per page session
export const MonetagVignette = () => {
  useEffect(() => {
    if (hasShownAdsThisSession()) return;
    appendMonetagScriptOnce("10527712", "https://gizokraijaw.net/vignette.min.js");
  }, []);

  return null;
};

/**
 * Loads Monetag scripts once per page session (refresh/new page = new ads).
 * Inpush loads immediately, Vignette delayed slightly for less annoyance.
 */
export const MonetagAdsBootstrap = ({
  vignetteDelayMs = 4000,
}: {
  vignetteDelayMs?: number;
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Check if we already showed ads on this page this session
    if (hasShownAdsThisSession()) {
      return;
    }

    // Mark that we're showing ads this session
    markAdsShownThisSession();
    setShouldLoad(true);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    // Load Inpush immediately
    appendMonetagScriptOnce("10527843", "https://nap5k.com/tag.min.js");

    // Load Vignette after delay
    const t = window.setTimeout(() => {
      appendMonetagScriptOnce("10527712", "https://gizokraijaw.net/vignette.min.js");
    }, vignetteDelayMs);

    return () => window.clearTimeout(t);
  }, [shouldLoad, vignetteDelayMs]);

  return null;
};
