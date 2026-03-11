import { memo } from "react";
import { Link } from "react-router-dom";
import { Play, X, Clock } from "lucide-react";
import { buildWatchPath } from "@/lib/watchRoute";
import { WatchProgress } from "@/hooks/useContinueWatching";
import OptimizedImage from "@/components/OptimizedImage";

interface ContinueWatchingProps {
  items: WatchProgress[];
  onRemove: (movieId: string) => void;
}

const ContinueWatching = memo(({ items, onRemove }: ContinueWatchingProps) => {
  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          Komeza Kureba
        </h2>
        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded-full">
          {items.length}
        </span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
        {items.map((item) => {
          const watchPath = buildWatchPath(item.title, item.movieId);
          return (
            <div key={item.movieId} className="relative group">
              <Link to={watchPath} className="block">
                <article className="relative overflow-hidden rounded-lg bg-card border border-primary/30 hover:border-primary/60 transition-colors">
                  <div className="aspect-[2/3] overflow-hidden relative">
                    <OptimizedImage
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                        <Play className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-2 sm:p-3">
                    <h3 className="font-bold text-foreground text-[11px] sm:text-sm leading-tight line-clamp-2 min-h-[1.75rem] sm:min-h-[2.25rem]">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[9px] sm:text-xs text-muted-foreground mt-1">
                      <span>{item.year}</span>
                      <span className="text-border">•</span>
                      <span className="truncate">{item.genre}</span>
                    </div>
                  </div>
                </article>
              </Link>
              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove(item.movieId);
                }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-border/50 hover:bg-destructive hover:text-destructive-foreground"
                aria-label="Remove from continue watching"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
});

ContinueWatching.displayName = "ContinueWatching";

export default ContinueWatching;
