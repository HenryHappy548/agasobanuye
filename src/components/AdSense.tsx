import { useEffect } from "react";
import ADSENSE_CONFIG from "@/config/adsense";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdUnitProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical" | "full";
  adStyle?: React.CSSProperties;
  className?: string;
  minHeight?: string;
}

export const AdUnit = ({ 
  adSlot, 
  adFormat = "auto", 
  adStyle,
  className = "",
  minHeight = "50px"
}: AdUnitProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [adSlot]);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ 
        display: "block", 
        minHeight,
        ...adStyle 
      }}
      data-ad-client={`ca-pub-${ADSENSE_CONFIG.PUB_ID}`}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
};

// Top Banner Ad
export const TopBanner = () => (
  <div className="w-full py-3 bg-muted/30">
    <div className="container">
      <AdUnit 
        adSlot={ADSENSE_CONFIG.AD_SLOTS.BANNER_TOP} 
        adFormat="horizontal"
        minHeight="90px"
        className="mx-auto"
      />
    </div>
  </div>
);

// Bottom Banner Ad
export const BottomBanner = () => (
  <div className="w-full py-4 bg-muted/30">
    <AdUnit 
      adSlot={ADSENSE_CONFIG.AD_SLOTS.BANNER_BOTTOM} 
      adFormat="horizontal"
      minHeight="90px"
      className="mx-auto"
    />
  </div>
);

// In-Article Ad (placed between content)
export const InArticleAd = () => (
  <div className="my-6 p-4 bg-muted/20 rounded-lg">
    <AdUnit 
      adSlot={ADSENSE_CONFIG.AD_SLOTS.IN_ARTICLE}
      adFormat="auto"
      minHeight="250px"
      className="mx-auto"
    />
  </div>
);

// Rectangle Ad (sidebar)
export const RectangleAd = () => (
  <AdUnit 
    adSlot={ADSENSE_CONFIG.AD_SLOTS.RECTANGLE_SIDEBAR}
    adFormat="rectangle"
    minHeight="250px"
    className="mx-auto"
  />
);

// Mobile Banner
export const MobileBanner = () => (
  <div className="md:hidden py-2">
    <AdUnit 
      adSlot={ADSENSE_CONFIG.AD_SLOTS.MOBILE_BANNER}
      adFormat="auto"
      minHeight="100px"
      className="mx-auto"
    />
  </div>
);

// Footer Ad
export const FooterAd = () => (
  <div className="py-4 border-t">
    <AdUnit 
      adSlot={ADSENSE_CONFIG.AD_SLOTS.FOOTER}
      adFormat="horizontal"
      minHeight="60px"
      className="mx-auto"
    />
  </div>
);

// Skeleton while loading
export const AdSkeleton = ({ height = "250px" }: { height?: string }) => (
  <div 
    className="bg-muted/50 animate-pulse rounded-lg flex items-center justify-center"
    style={{ minHeight: height }}
  >
    <span className="text-muted-foreground text-xs uppercase tracking-wider">Advertisement</span>
  </div>
);

// Export all for convenience
export default {
  AdUnit,
  TopBanner,
  BottomBanner,
  InArticleAd,
  RectangleAd,
  MobileBanner,
  FooterAd,
  AdSkeleton
};