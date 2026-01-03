import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { buildWatchPath } from "@/lib/watchRoute";
import { useMovies, getRelatedMovies, DBMovie } from "@/hooks/useMovies";

interface VideoRecommendationsProps {
  currentVideoId: string | null;
  onPlayVideo?: (videoId: string) => void;
  onClose?: () => void;
}

const VideoRecommendations = ({ currentVideoId, onPlayVideo, onClose }: VideoRecommendationsProps) => {
  const { movies } = useMovies();
  
  // Find current movie and get smart recommendations
  const currentMovie = currentVideoId ? movies.find(m => m.id === currentVideoId) : null;
  const recommendations = currentMovie 
    ? getRelatedMovies(currentMovie as DBMovie, movies as DBMovie[], 6)
    : movies.slice(0, 6);

  if (recommendations.length === 0) {
    return null;
  }

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="p-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2">
        <Play className="w-4 h-4 text-primary" />
        Izikurikira
      </h3>
      
      <div className="flex flex-col gap-1.5">
        {recommendations.map((movie) => (
          <Link
            key={movie.id}
            to={buildWatchPath(movie.title, movie.id)}
            onClick={handleClick}
            className="flex items-center gap-3 p-2 rounded-lg bg-background/40 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200 text-left group w-full cursor-pointer gpu-accelerate"
            title={`Watch ${movie.title} - Rwaflix Agasobanuye`}
          >
            <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
              <img
                src={movie.poster}
                alt={`${movie.title} - Watch on Rwaflix`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <Play className="w-3 h-3 text-white fill-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-150">
                {movie.title}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {movie.genre} • {movie.year}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoRecommendations;
