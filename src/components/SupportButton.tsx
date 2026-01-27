import { Heart } from "lucide-react";

interface SupportButtonProps {
  variant?: "default" | "compact" | "inline";
  className?: string;
}

const SupportButton = ({ variant = "default", className = "" }: SupportButtonProps) => {
  if (variant === "compact") {
    return (
      <a
        href="https://otieu.com/4/10527776"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors ${className}`}
      >
        <Heart className="h-3 w-3" />
        <span className="hidden sm:inline">Shyigikira</span>
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href="https://otieu.com/4/10527776"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors ${className}`}
      >
        <Heart className="h-3 w-3" />
        <span>Shyigikira Rwaflix</span>
      </a>
    );
  }

  return (
    <a
      href="https://otieu.com/4/10527776"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 text-primary border border-primary/20 rounded-lg transition-all ${className}`}
    >
      <Heart className="h-3.5 w-3.5" />
      <span>Shyigikira urubuga rwa Rwaflix</span>
    </a>
  );
};

export default SupportButton;
