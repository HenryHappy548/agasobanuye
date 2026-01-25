import { useState, useEffect, useRef, memo, useCallback } from "react";
import { cn } from "@/lib/utils";
import fallbackPoster from "@/assets/dont.jpg";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallback?: string;
  lowQualityPlaceholder?: boolean;
}

// Network detection utility
const getNetworkInfo = () => {
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  
  if (!connection) return { isSlowConnection: false, saveData: false };
  
  const isSlowConnection = 
    connection.effectiveType === "2g" || 
    connection.effectiveType === "slow-2g" ||
    connection.saveData === true ||
    connection.downlink < 1;
    
  return { 
    isSlowConnection, 
    saveData: connection.saveData || false 
  };
};

// Generate lower quality image URL for slow connections
const getOptimizedImageUrl = (src: string, isSlowConnection: boolean): string => {
  if (!isSlowConnection || !src) return src;
  
  // For external URLs, try to use image optimization parameters
  try {
    const url = new URL(src);
    
    // AliExpress images - reduce size
    if (url.hostname.includes('aliexpress-media.com') || url.hostname.includes('ae-pic')) {
      return src.replace(/_\d+x\d+/g, '_200x200');
    }
    
    // Google images - add size parameter
    if (url.hostname.includes('gstatic.com') || url.hostname.includes('googleusercontent.com')) {
      if (!url.searchParams.has('w')) {
        url.searchParams.set('w', '200');
      }
      return url.toString();
    }
    
    // TMDB/movie poster images - use smaller size
    if (url.hostname.includes('image.tmdb.org')) {
      return src.replace('/original/', '/w200/').replace('/w500/', '/w200/');
    }
    
    return src;
  } catch {
    return src;
  }
};

const OptimizedImage = memo(({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  priority = false,
  fallback = fallbackPoster,
  lowQualityPlaceholder = true
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  const [networkInfo] = useState(() => getNetworkInfo());
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize optimized source
  useEffect(() => {
    const optimizedSrc = getOptimizedImageUrl(src, networkInfo.isSlowConnection);
    setCurrentSrc(optimizedSrc);
    setHasError(false);
    setIsLoaded(false);
  }, [src, networkInfo.isSlowConnection]);

  // Intersection Observer with larger margin for slow connections
  useEffect(() => {
    if (priority || !imgRef.current) {
      if (priority) setIsInView(true);
      return;
    }

    // Larger rootMargin for slow connections to preload earlier
    const margin = networkInfo.isSlowConnection ? "500px" : "150px";

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { 
        rootMargin: margin,
        threshold: 0.01 
      }
    );

    observerRef.current.observe(imgRef.current);
    
    return () => observerRef.current?.disconnect();
  }, [priority, networkInfo.isSlowConnection]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setHasError(false);
    } else {
      setHasError(true);
      setIsLoaded(true);
    }
  }, [currentSrc, fallback]);

  // Determine if we should show a tiny placeholder for extremely slow connections
  const showMinimalPlaceholder = networkInfo.isSlowConnection && !isLoaded;

  return (
    <div 
      ref={imgRef} 
      className={cn("relative overflow-hidden bg-muted gpu-accelerate", className)}
      style={{ width, height }}
    >
      {/* Shimmer placeholder - simpler animation for slow connections */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity",
          networkInfo.isSlowConnection ? "duration-150 bg-muted" : "duration-300 img-placeholder",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      />
      
      {isInView && !hasError && currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity",
            networkInfo.isSlowConnection ? "duration-150" : "duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs">
          <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
