import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface SupportButtonProps {
  variant?: "default" | "compact" | "inline";
  className?: string;
  showTooltip?: boolean;
}

const SupportButton = ({ variant = "default", className = "", showTooltip = false }: SupportButtonProps) => {
  const [showHint, setShowHint] = useState(showTooltip);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  if (variant === "compact") {
    return (
      <div className="relative inline-flex items-center">
        <a
          href="https://otieu.com/4/10527776"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-600 hover:bg-green-500 text-white rounded-full transition-colors animate-pulse hover:animate-none ${className}`}
        >
          <Heart className="h-3 w-3 fill-current" />
          <span className="hidden sm:inline">Shyigikira</span>
        </a>
        {showHint && (
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-green-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap animate-bounce">
            Kanda hano! 👆
          </span>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href="https://otieu.com/4/10527776"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-xs text-green-500 hover:text-green-400 transition-colors ${className}`}
      >
        <Heart className="h-3 w-3 animate-pulse" />
        <span>Shyigikira Rwaflix</span>
      </a>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <a
        href="https://otieu.com/4/10527776"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all shadow-lg shadow-green-500/20 ${className}`}
      >
        <Heart className="h-3.5 w-3.5 fill-current animate-pulse" />
        <span>Shyigikira urubuga rwa Rwaflix</span>
      </a>
      {showHint && (
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-green-700 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 opacity-100 translate-x-0">
          👉 Kanda hano ushyigikire!
        </span>
      )}
    </div>
  );
};

export default SupportButton;
