import { useEffect, useState } from "react";
import logoRwaflix from "@/assets/logo-rwaflix.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 500); // Wait for fade out animation
    }, 2500); // Show for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center animate-fade-out pointer-events-none">
        <div className="text-center">
          <img
            src={logoRwaflix}
            alt="Rwaflix Logo"
            className="w-24 h-24 mx-auto mb-4 animate-spin"
          />
          <h1 className="text-2xl font-bold text-primary opacity-0">Rwaflix</h1>
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
          className="w-24 h-24 mx-auto mb-4 animate-spin"
        />
        <h1 className="text-2xl font-bold text-primary animate-pulse">Rwaflix</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;