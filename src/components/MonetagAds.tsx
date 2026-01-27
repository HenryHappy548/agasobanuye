import { useEffect } from "react";

const appendMonetagScriptOnce = (zone: string, src: string) => {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[data-zone="${zone}"]`)) return;

  const script = document.createElement("script");
  script.dataset.zone = zone;
  script.src = src;
  script.async = true;

  // Matches Monetag's recommended pattern: append to body if available, otherwise html.
  const target = (document.body || document.documentElement) as HTMLElement;
  target.appendChild(script);
};

// Monetag Inpush Ads - loads once globally
export const MonetagInpush = () => {
  useEffect(() => {
    appendMonetagScriptOnce("10527843", "https://nap5k.com/tag.min.js");
  }, []);

  return null;
};

// Monetag Vignette Ads - loads once globally
export const MonetagVignette = () => {
  useEffect(() => {
    appendMonetagScriptOnce("10527712", "https://gizokraijaw.net/vignette.min.js");
  }, []);

  return null;
};

/**
 * Loads Monetag scripts in a deterministic order (Inpush first, then Vignette).
 * Vignette is delayed slightly to reduce annoyance on initial page load.
 */
export const MonetagAdsBootstrap = ({
  vignetteDelayMs = 6000,
}: {
  vignetteDelayMs?: number;
}) => {
  useEffect(() => {
    appendMonetagScriptOnce("10527843", "https://nap5k.com/tag.min.js");

    const t = window.setTimeout(() => {
      appendMonetagScriptOnce("10527712", "https://gizokraijaw.net/vignette.min.js");
    }, vignetteDelayMs);

    return () => window.clearTimeout(t);
  }, [vignetteDelayMs]);

  return null;
};
