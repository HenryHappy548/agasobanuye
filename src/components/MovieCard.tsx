import { Play } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";

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
}

const MovieCard = memo(({ movie, onPlay }: MovieCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-glow">
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow"
            onClick={() => onPlay(movie.id)}
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
    </div>
  );
});

MovieCard.displayName = "MovieCard";

export default MovieCard;