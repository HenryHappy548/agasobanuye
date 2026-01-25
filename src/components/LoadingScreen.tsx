import { useEffect, useState, memo } from "react";
import logoRwaflix from "@/assets/logo-rwaflix.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minimal?: boolean;
}

const LoadingScreen = memo(({ onLoadingComplete, minimal = false }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState("Gutangira...");
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // Detect slow connection
    const connection = (navigator as any).connection || 
                       (navigator as any).mozConnection || 
                       (navigator as any).webkitConnection;
    
    const slowConnection = connection?.effectiveType === '2g' || 
                          connection?.effectiveType === 'slow-2g' ||
                          connection?.saveData === true;
    
    setIsSlowConnection(slowConnection);
    
    // Faster load time for slow connections (skip long animations)
    // Normal: 1.2s, Slow: 0.5s (just show briefly then load)
    const loadTime = slowConnection ? 500 : 1200;

    // Update loading text for slow connections
    if (slowConnection) {
      setLoadingText("Tegereza gato...");
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      // Shorter fade out transition
      setTimeout(onLoadingComplete, slowConnection ? 100 : 200);
    }, loadTime);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  // For minimal loading (e.g., page transitions), show simplified loader
  if (minimal) {
    return (
      <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center animate-fade-out pointer-events-none">
        <div className="text-center">
          <img
            src={logoRwaflix}
            alt="Rwaflix Logo"
            className="w-16 h-16 mx-auto mb-2"
            width={64}
            height={64}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <img
          src={logoRwaflix}
          alt="Rwaflix Logo"
          className={isSlowConnection ? "w-14 h-14 mx-auto mb-2" : "w-16 h-16 mx-auto mb-3"}
          width={isSlowConnection ? 56 : 64}
          height={isSlowConnection ? 56 : 64}
        />
        <p className={`font-bold text-primary ${isSlowConnection ? 'text-base' : 'text-lg'}`} aria-live="polite">
          {loadingText}
        </p>
        {/* Simpler loading indicator for slow connections */}
        {isSlowConnection ? (
          <div className="mt-2 w-8 h-8 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className="mt-3 flex justify-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>
    </div>
  );
});

LoadingScreen.displayName = "LoadingScreen";

export default LoadingScreen;
