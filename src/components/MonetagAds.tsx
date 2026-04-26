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
  // Deprecated: keep for backwards compatibility.
  // Use <MonetagAdsBootstrap /> to control timing and reduce annoyance.
  return null;
};

// Monetag Vignette Ads - loads once per page session
export const MonetagVignette = () => {
  // Deprecated: keep for backwards compatibility.
  // Use <MonetagAdsBootstrap /> to control timing and reduce annoyance.
  return null;
};

/**
 * Loads 2 Monetag Vignette banners (zone 10527843) after page loads successfully.
 * Only fires once per page session.
 */
export const MonetagAdsBootstrap = ({
  delayMs = 5_000,
}: {
  delayMs?: number;
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (hasShownAdsThisSession()) return;
    markAdsShownThisSession();
    setShouldLoad(true);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    // Load first vignette banner after delay
    const timer1 = window.setTimeout(() => {
      appendMonetagScriptOnce("10527843_1", "https://nap5k.com/tag.min.js");
    }, delayMs);

    // Load second vignette banner shortly after
    const timer2 = window.setTimeout(() => {
      appendMonetagScriptOnce("10527843_2", "https://nap5k.com/tag.min.js");
    }, delayMs + 3_000);

// Load third vignette banner (zone 10527712)
  const timer3 = window.setTimeout(() => {
    appendMonetagScriptOnce("10527712", "https://n6wxm.com/vignette.min.js");
  }, delayMs + 6_000);

  // Custom vignette ad for supporters (zone 10527776)
  const timer4 = window.setTimeout(() => {
    appendMonetagScriptOnce("10527776", "https://omg10.com/vignette.min.js");
  }, delayMs + 9_000);

  return () => {
    window.clearTimeout(timer1);
    window.clearTimeout(timer2);
    window.clearTimeout(timer3);
    window.clearTimeout(timer4);
  };
};
  }, [shouldLoad, delayMs]);

  return null;
};
