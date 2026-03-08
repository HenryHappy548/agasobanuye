import { Play, Layers } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/OptimizedImage";
import type { SeriesGroup } from "@/lib/seriesUtils";

interface SeriesCardProps {
  group: SeriesGroup;
  priority?: boolean;
}

const SeriesCard = memo(({ group, priority = false }: SeriesCardProps) => {
  const seriesPath = `/series/${encodeURIComponent(group.baseName)}`;

  return (
    <Link
      to={seriesPath}
      className="block gpu-accelerate"
      title={`Watch ${group.baseName} - ${group.episodeCount} Episodes on Rwaflix`}
    >
      <article className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 hover-lift">
        {/* Poster */}
        <div className="aspect-[2/3] overflow-hidden relative">
          <OptimizedImage
            src={group.latestEpisode.poster}
            alt={`${group.baseName} - Rwaflix`}
            width={200}
            height={300}
            priority={priority}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          {/* Play icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
              <Play className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground fill-primary-foreground ml-0.5" />
            </div>
          </div>

          {/* Episode count badge */}
          <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 px-1.5 sm:px-2 py-0.5 bg-primary/90 backdrop-blur-sm text-[8px] sm:text-[10px] font-bold text-primary-foreground rounded flex items-center gap-0.5">
            <Layers className="h-2.5 w-2.5" />
            {group.episodeCount} EP
          </div>
        </div>

        {/* Info */}
        <div className="p-2 sm:p-3">
          <h3 className="font-bold text-foreground text-[11px] sm:text-sm leading-tight line-clamp-2 min-h-[1.75rem] sm:min-h-[2.25rem]">
            {group.baseName}
            <span className="ml-1 text-[9px] sm:text-[11px] text-primary font-bold">
              ({group.episodeCount} EP)
            </span>
          </h3>
          <div className="flex items-center gap-1.5 text-[9px] sm:text-xs text-muted-foreground mt-1 sm:mt-1.5">
            <span>{group.latestEpisode.year}</span>
            <span className="text-border">•</span>
            <span className="truncate">{group.latestEpisode.genre}</span>
          </div>
          {group.latestEpisode.rating && (
            <p className="text-[9px] sm:text-[11px] text-muted-foreground font-bold mt-0.5 sm:mt-1 truncate">
              🎙 {group.latestEpisode.rating}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
});

SeriesCard.displayName = "SeriesCard";

export default SeriesCard;
