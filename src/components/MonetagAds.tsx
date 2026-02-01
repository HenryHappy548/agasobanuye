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
 * Loads Monetag scripts once per page session (refresh/new page = new ads).
 * Requested timing:
 * - Wait ~10s after page loads, then show Vignette
 * - Wait another ~10s, then load Inpush
 */
export const MonetagAdsBootstrap = ({
  vignetteDelayMs = 10_000,
  inpushDelayMs = 20_000,
}: {
  vignetteDelayMs?: number;
  inpushDelayMs?: number;
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

    const vignetteTimer = window.setTimeout(() => {
      appendMonetagScriptOnce("10527712", "https://gizokraijaw.net/vignette.min.js");
    }, vignetteDelayMs);

    const inpushTimer = window.setTimeout(() => {
      appendMonetagScriptOnce("10527843", "https://nap5k.com/tag.min.js");
    }, inpushDelayMs);

    return () => {
      window.clearTimeout(vignetteTimer);
      window.clearTimeout(inpushTimer);
    };
  }, [shouldLoad, vignetteDelayMs, inpushDelayMs]);

  return null;
};
