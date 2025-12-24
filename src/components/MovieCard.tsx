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
      className="block"
      title={`Watch ${movie.title} free on Rwaflix - Agasobanuye`}
    >
      <article className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-glow">
        <div className="aspect-[2/3] overflow-hidden relative">
          <OptimizedImage
            src={movie.poster}
            alt={`${movie.title} (${movie.year}) - Rwaflix Agasobanuye`}
            width={200}
            height={300}
            priority={priority}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play icon overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
              <Play className="h-6 w-6 text-primary-foreground fill-primary-foreground ml-1" />
            </div>
          </div>
        </div>
        
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{movie.year}</span>
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded font-medium">
              {movie.rating}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{movie.genre}</p>
        </div>
      </article>
    </Link>
  );
});

MovieCard.displayName = "MovieCard";

export default MovieCard;
