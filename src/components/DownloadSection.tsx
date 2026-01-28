import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadLink {
  quality: string;
  size: string | null;
  url: string;
  type: string;
}

interface DownloadSectionProps {
  downloadLinks: DownloadLink[];
  title: string;
  className?: string;
}

// Ensure URL has proper protocol prefix
const normalizeUrl = (url: string): string => {
  if (!url) return url;
  const trimmed = url.trim();
  // Already has protocol
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  // Add https:// prefix
  return `https://${trimmed}`;
};

const DownloadSection = ({ downloadLinks, title, className = "" }: DownloadSectionProps) => {
  if (!downloadLinks || downloadLinks.length === 0) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-br from-primary/20 via-card to-primary/10 border-2 border-primary/30 rounded-xl p-4 sm:p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary rounded-lg">
          <Download className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Download</h3>
          <p className="text-xs text-muted-foreground">{title}</p>
        </div>
      </div>

      <div className="space-y-3">
        {downloadLinks.map((link, index) => (
          <a
            key={index}
            href={normalizeUrl(link.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outline"
              className="w-full justify-between bg-background/80 hover:bg-primary hover:text-primary-foreground border-border hover:border-primary transition-all duration-300 group h-auto py-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded group-hover:bg-primary-foreground/20">
                  <Download className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{link.quality}</div>
                  <div className="text-xs text-muted-foreground group-hover:text-primary-foreground/80">
                    {link.type} {link.size && `• ${link.size}`}
                  </div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            </Button>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DownloadSection;
