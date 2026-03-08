import { Play } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { buildWatchPath } from "@/lib/watchRoute";
import OptimizedImage from "@/components/OptimizedImage";

interface Movie {
  id: string;
  title: string;
  poster: string;
  year: string;
  genre: string;
  rating: string;
}

interface MovieCardProps {
  movie: Movie;
  onPlay?: (movieId: string) => void; // Keep for backwards compatibility but not used
  priority?: boolean;
}

const MovieCard = memo(({ movie, priority = false }: MovieCardProps) => {
  const watchPath = buildWatchPath(movie.title, movie.id);

  return (
    <Link 
      to={watchPath}
      className="block gpu-accelerate"
      title={`Watch ${movie.title} free on Rwaflix - Agasobanuye`}
    >
      <article className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 hover-lift">
        {/* Poster with proper aspect ratio */}
        <div className="aspect-[2/3] overflow-hidden relative">
          <OptimizedImage
            src={movie.poster}
            alt={`${movie.title} (${movie.year}) - Rwaflix Agasobanuye`}
            width={200}
            height={300}
            priority={priority}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          
          {/* Play icon overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
              <Play className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground fill-primary-foreground ml-0.5" />
            </div>
          </div>
          
          {/* Dubbed indicator badge */}
          {movie.rating && (
            <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 px-1 sm:px-1.5 py-0.5 bg-background/80 backdrop-blur-sm text-[7px] sm:text-[8px] font-bold text-muted-foreground rounded border border-border/50">
              🎙 Dubbed
            </div>
          )}
        </div>
        
        {/* Movie Info - Responsive padding */}
        <div className="p-2 sm:p-3">
          {/* Title - prominent */}
          <h3 className="font-bold text-foreground text-[11px] sm:text-sm leading-tight line-clamp-2 min-h-[1.75rem] sm:min-h-[2.25rem]">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1.5 text-[9px] sm:text-xs text-muted-foreground mt-1 sm:mt-1.5">
            <span>{movie.year}</span>
            <span className="text-border">•</span>
            <span className="truncate">{movie.genre}</span>
          </div>
          {/* Dubber name - visible */}
          {movie.rating && (
            <p className="text-[10px] sm:text-xs text-primary font-bold mt-0.5 sm:mt-1 truncate">
              🎙 {movie.rating}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
});

MovieCard.displayName = "MovieCard";

export default MovieCard;
