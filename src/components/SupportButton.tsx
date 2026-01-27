import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

const SUPPORT_URL = "https://otieu.com/4/10527776";
const SUPPORT_HINT_SESSION_KEY = "rwaflix.support_hint_shown.v1";

interface SupportButtonProps {
  variant?: "default" | "compact" | "inline";
  className?: string;
  showTooltip?: boolean;
}

const SupportButton = ({ variant = "default", className = "", showTooltip = false }: SupportButtonProps) => {
  const [showHint, setShowHint] = useState(() => {
    if (!showTooltip) return false;
    if (typeof window === "undefined") return true;
    if (window.sessionStorage.getItem(SUPPORT_HINT_SESSION_KEY) === "1") return false;
    window.sessionStorage.setItem(SUPPORT_HINT_SESSION_KEY, "1");
    return true;
  });

  useEffect(() => {
    if (!showHint) return;
    const timer = window.setTimeout(() => setShowHint(false), 4500);
    return () => window.clearTimeout(timer);
  }, [showHint]);

  if (variant === "compact") {
    return (
      <div className="relative inline-flex items-center">
        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Kanda hano ushyigikire Rwaflix"
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-primary/10 hover:bg-primary/15 text-primary border border-primary/20 rounded-full transition-colors ${className}`}
        >
          <Heart className="h-3 w-3" />
          <span className="hidden sm:inline">Shyigikira</span>
        </a>
        {showHint && (
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-popover text-popover-foreground border border-border px-2 py-1 rounded text-[10px] whitespace-nowrap shadow-sm">
            Kanda hano (click)
          </span>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Kanda hano ushyigikire Rwaflix"
        className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors ${className}`}
      >
        <Heart className="h-3 w-3" />
        <span>Shyigikira Rwaflix</span>
      </a>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Kanda hano ushyigikire Rwaflix"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary/10 hover:bg-primary/15 text-primary border border-primary/20 rounded-lg transition-colors ${className}`}
      >
        <Heart className="h-3.5 w-3.5" />
        <span>Shyigikira urubuga rwa Rwaflix</span>
      </a>
      {showHint && (
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-popover text-popover-foreground border border-border px-3 py-2 rounded-lg shadow-sm whitespace-nowrap text-xs">
          Kanda hano ushyigikire
        </span>
      )}
    </div>
  );
};

export default SupportButton;
