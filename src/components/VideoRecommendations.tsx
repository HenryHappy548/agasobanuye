import { Link } from "react-router-dom";
import { Play, ExternalLink } from "lucide-react";
import { slugify } from "@/lib/slugify";
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
    <div className="p-4 border-t border-border">
      <h3 className="text-base font-semibold mb-3 text-white flex items-center gap-2">
        <Play className="w-4 h-4 text-primary" />
        Up Next
      </h3>
      
      <div className="flex flex-col gap-2">
        {recommendations.map((movie) => (
          <Link
            key={movie.id}
            to={`/watch/${slugify(movie.title)}`}
            onClick={handleClick}
            className="flex items-center gap-3 p-2 rounded-lg bg-card/50 hover:bg-accent transition-all duration-200 text-left group w-full cursor-pointer"
            title={`Watch ${movie.title} - Rwaflix Agasobanuye`}
          >
            <div className="relative w-16 h-12 sm:w-20 sm:h-14 flex-shrink-0 rounded overflow-hidden">
              <img
                src={movie.poster}
                alt={`${movie.title} - Watch on Rwaflix`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {movie.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {movie.genre} • {movie.year}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoRecommendations;
