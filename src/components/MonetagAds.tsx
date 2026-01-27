import { useEffect } from "react";

// Monetag Inpush Ads - loads once globally
export const MonetagInpush = () => {
  useEffect(() => {
    // Only add once
    if (document.querySelector('script[data-zone="10527843"]')) return;
    
    const script = document.createElement('script');
    script.dataset.zone = '10527843';
    script.src = 'https://nap5k.com/tag.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
};

// Monetag Vignette Ads - loads once globally
export const MonetagVignette = () => {
  useEffect(() => {
    // Only add once
    if (document.querySelector('script[data-zone="10527712"]')) return;
    
    const script = document.createElement('script');
    script.dataset.zone = '10527712';
    script.src = 'https://gizokraijaw.net/vignette.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
};
