import { useEffect, useState } from "react";
import logoRwaflix from "@/assets/logo-rwaflix.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Immediate callback - no delay
    const timer = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete();
    }, 1500); // Reduced to 1.5 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) {
    return null; // Return null instead of fading div to prevent blocking
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <img
          src={logoRwaflix}
          alt="Rwaflix Logo"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-primary animate-pulse">Rwaflix</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;