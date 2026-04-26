import { useEffect, useState } from "react";

const appendMonetagScriptOnce = (zone: string, src: string) => {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[data-zone="${zone}"]`)) return;

  const script = document.createElement("script");
  script.dataset.zone = zone;
  script.src = src;
  script.async = true;

  const target = (document.body || document.documentElement) as HTMLElement;
  target.appendChild(script);
  console.log(`Monetag vignette ad loaded for zone: ${zone}`);
};

export const MonetagInpush = () => {
  return null;
};

export const MonetagVignette = () => {
  return null;
};

export const MonetagAdsBootstrap = () => {
  useEffect(() => {
    // Load both vignette ads immediately without any check
    appendMonetagScriptOnce("10527776", "https://omg10.com/vignette.min.js");
    appendMonetagScriptOnce("10527843", "https://nap5k.com/tag.min.js");
  }, []);

  return null;
};