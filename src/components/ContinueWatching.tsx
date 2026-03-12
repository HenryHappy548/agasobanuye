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
    <section className="mt-6 mb-4">
      <div className="flex items-center gap-1.5 mb-3">
        <Clock className="h-4 w-4 text-primary" />
        <h2 className="text-base sm:text-lg font-bold text-foreground">
          Komeza Kureba
        </h2>
        <span className="px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] font-semibold rounded-full">
          {items.length}
        </span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => {
          const watchPath = buildWatchPath(item.title, item.movieId);
          return (
            <div key={item.movieId} className="relative group flex-shrink-0 w-[90px] sm:w-[100px]">
              <Link to={watchPath} className="block">
                <article className="relative overflow-hidden rounded-md bg-card border border-primary/30 hover:border-primary/60 transition-colors">
                  <div className="aspect-[2/3] overflow-hidden relative">
                    <OptimizedImage
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                        <Play className="h-3 w-3 text-primary-foreground fill-primary-foreground ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-1.5">
                    <h3 className="font-bold text-foreground text-[9px] sm:text-[10px] leading-tight line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[8px] sm:text-[9px] text-muted-foreground mt-0.5 truncate">
                      {item.genre}
                    </p>
                  </div>
                </article>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove(item.movieId);
                }}
                className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-border/50 hover:bg-destructive hover:text-destructive-foreground"
                aria-label="Remove from continue watching"
              >
                <X className="h-2.5 w-2.5" />
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
