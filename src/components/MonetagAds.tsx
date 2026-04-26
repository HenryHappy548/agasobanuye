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
 * Loads 2 Monetag Vignette banners - one supporters ad, one general ad.
 * Only fires once per page session.
 * The supporters ad is shown first (less annoying) after a shorter delay.
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

    // Supporters vignette ad (zone 10527776) - shows first, less annoying
    const timer1 = window.setTimeout(() => {
      appendMonetagScriptOnce("10527776", "https://omg10.com/vignette.min.js");
    }, delayMs);

    // General vignette ad (zone 10527843) - shows second
    const timer2 = window.setTimeout(() => {
      appendMonetagScriptOnce("10527843", "https://nap5k.com/tag.min.js");
    }, delayMs + 8_000);

    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
    };
  }, [shouldLoad, delayMs]);

  return null;
};