import { mockMovies, Movie } from "@/data/mockData";
import { Play } from "lucide-react";

interface VideoRecommendationsProps {
  currentVideoId: string | null;
  onPlayVideo: (videoId: string) => void;
}

const VideoRecommendations = ({ currentVideoId, onPlayVideo }: VideoRecommendationsProps) => {
  // Get related videos based on current video
  const getRelatedVideos = (): Movie[] => {
    if (!currentVideoId) return [];

    const currentMovie = mockMovies.find(m => m.id === currentVideoId);
    if (!currentMovie) return mockMovies.slice(0, 6);

    // Extract series name pattern (e.g., "Tempest", "Bon Appetit", "Bunker")
    const titleParts = currentMovie.title.match(/^(.+?)\s+S\d+\s*E?\d*/i);
    const seriesName = titleParts ? titleParts[1].trim() : null;

    // If it's a series, get next episodes and related episodes
    if (seriesName) {
      const seriesEpisodes = mockMovies.filter(m => {
        const mParts = m.title.match(/^(.+?)\s+S\d+\s*E?\d*/i);
        const mSeriesName = mParts ? mParts[1].trim() : null;
        return mSeriesName && mSeriesName.toLowerCase() === seriesName.toLowerCase() && m.id !== currentVideoId;
      });

      // Sort episodes to show next ones first
      const sortedEpisodes = seriesEpisodes.sort((a, b) => {
        const aMatch = a.id.match(/\d+$/);
        const bMatch = b.id.match(/\d+$/);
        const aNum = aMatch ? parseInt(aMatch[0]) : 0;
        const bNum = bMatch ? parseInt(bMatch[0]) : 0;
        return aNum - bNum;
      });

      // Get up to 4 series episodes and fill with genre-related
      const recommendations = sortedEpisodes.slice(0, 4);
      
      // Add genre-related movies if needed
      if (recommendations.length < 6) {
        const genreRelated = mockMovies.filter(m => 
          m.genre === currentMovie.genre && 
          m.id !== currentVideoId && 
          !recommendations.some(r => r.id === m.id)
        ).slice(0, 6 - recommendations.length);
        recommendations.push(...genreRelated);
      }

      return recommendations.slice(0, 6);
    }

    // For standalone movies, get same genre recommendations
    const genreRelated = mockMovies.filter(m => 
      (m.genre === currentMovie.genre || m.category === currentMovie.category) && 
      m.id !== currentVideoId
    ).slice(0, 6);

    return genreRelated.length > 0 ? genreRelated : mockMovies.filter(m => m.id !== currentVideoId).slice(0, 6);
  };

  const recommendations = getRelatedVideos();

  if (recommendations.length === 0) return null;

  return (
    <div className="p-4 border-t border-border">
      <h3 className="text-base font-semibold mb-3 text-white">
        Up Next
      </h3>
      
      <div className="flex flex-col gap-2">
        {recommendations.map((movie) => (
          <button
            key={movie.id}
            onClick={() => onPlayVideo(movie.id)}
            className="flex items-center gap-3 p-2 rounded-lg bg-card/50 hover:bg-accent transition-all duration-200 text-left group w-full"
          >
            <div className="relative w-16 h-12 sm:w-20 sm:h-14 flex-shrink-0 rounded overflow-hidden">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
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
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoRecommendations;
