import { Play } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  onPlay: (movieId: string) => void;
  priority?: boolean;
}

const MovieCard = memo(({ movie, onPlay, priority = false }: MovieCardProps) => {
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
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow"
              onClick={(e) => {
                e.preventDefault();
                onPlay(movie.id);
              }}
            >
              <Play className="h-4 w-4 mr-1" />
              Play
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{movie.year}</span>
            <span className="bg-accent px-2 py-1 rounded text-accent-foreground">
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
