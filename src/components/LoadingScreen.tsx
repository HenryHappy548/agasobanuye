import { useEffect, useState } from "react";
import logoRwaflix from "@/assets/logo-rwaflix.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState("Gutangira...");

  useEffect(() => {
    // Detect slow connection
    const connection = (navigator as any).connection;
    const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
    
    // Faster load time: 1.5s normal, 1s for slow connections (skip long wait)
    const loadTime = isSlowConnection ? 1000 : 1500;

    // Update loading text for slow connections
    if (isSlowConnection) {
      setLoadingText("Tegereza gato...");
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 300); // Shorter fade out
    }, loadTime);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center animate-fade-out pointer-events-none">
        <div className="text-center">
          <img
            src={logoRwaflix}
            alt="Rwaflix Logo"
            className="w-20 h-20 mx-auto mb-3"
            width={80}
            height={80}
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
          className="w-20 h-20 mx-auto mb-3"
          width={80}
          height={80}
        />
        <p className="text-xl font-bold text-primary" aria-live="polite">{loadingText}</p>
        <div className="mt-3 flex justify-center gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
