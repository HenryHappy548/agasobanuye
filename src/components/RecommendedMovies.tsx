import { Link } from "react-router-dom";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { buildWatchPath } from "@/lib/watchRoute";
import { useMovies, DBMovie } from "@/hooks/useMovies";
import { useMemo } from "react";

interface RecommendedMoviesProps {
  currentMovieId: string;
  currentMovieTitle: string;
}

// Extract series info from title (e.g., "Shooter S03 E2" -> { name: "Shooter", season: 3, episode: 2 })
const parseSeriesInfo = (title: string) => {
  const match = title.match(/^(.+?)\s*S(\d+)\s*E(\d+)/i);
  if (match) {
    return { name: match[1].trim(), season: parseInt(match[2]), episode: parseInt(match[3]) };
  }
  // Check for Part A/B pattern (e.g., "Sharper A", "Species B")
  const partMatch = title.match(/^(.+?)\s+([AB])$/i);
  if (partMatch) {
    return { name: partMatch[1].trim(), part: partMatch[2].toUpperCase() };
  }
  return null;
};

const RecommendedMovies = ({ currentMovieId, currentMovieTitle }: RecommendedMoviesProps) => {
  const { movies } = useMovies();
  
  const { seriesEpisodes, recommendations } = useMemo(() => {
    const seriesInfo = parseSeriesInfo(currentMovieTitle);
    const currentMovie = movies.find(m => m.id === currentMovieId);
    
    let seriesEpisodes: { prev?: DBMovie; next?: DBMovie } = {};
    let recommendations: DBMovie[] = [];
    
    if (seriesInfo && 'season' in seriesInfo) {
      // TV Series - find prev/next episodes
      const sameSeriesMovies = movies.filter(m => {
        const info = parseSeriesInfo(m.title);
        return info && 'season' in info && info.name.toLowerCase() === seriesInfo.name.toLowerCase();
      });
      
      // Sort by season then episode
      sameSeriesMovies.sort((a, b) => {
        const aInfo = parseSeriesInfo(a.title)!;
        const bInfo = parseSeriesInfo(b.title)!;
        if ('season' in aInfo && 'season' in bInfo) {
          if (aInfo.season !== bInfo.season) return aInfo.season - bInfo.season;
          return aInfo.episode - bInfo.episode;
        }
        return 0;
      });
      
      const currentIndex = sameSeriesMovies.findIndex(m => m.id === currentMovieId);
      if (currentIndex > 0) seriesEpisodes.prev = sameSeriesMovies[currentIndex - 1] as DBMovie;
      if (currentIndex < sameSeriesMovies.length - 1) seriesEpisodes.next = sameSeriesMovies[currentIndex + 1] as DBMovie;
      
      // Also get recommendations from same genre
      recommendations = movies
        .filter(m => m.id !== currentMovieId && !sameSeriesMovies.find(s => s.id === m.id))
        .filter(m => currentMovie && m.genre === currentMovie.genre)
        .slice(0, 5) as DBMovie[];
    } else if (seriesInfo && 'part' in seriesInfo) {
      // Part A/B pattern
      const sameParts = movies.filter(m => {
        const info = parseSeriesInfo(m.title);
        return info && 'part' in info && info.name.toLowerCase() === seriesInfo.name.toLowerCase();
      });
      
      sameParts.sort((a, b) => {
        const aInfo = parseSeriesInfo(a.title)!;
        const bInfo = parseSeriesInfo(b.title)!;
        if ('part' in aInfo && 'part' in bInfo) {
          return aInfo.part.localeCompare(bInfo.part);
        }
        return 0;
      });
      
      const currentIndex = sameParts.findIndex(m => m.id === currentMovieId);
      if (currentIndex > 0) seriesEpisodes.prev = sameParts[currentIndex - 1] as DBMovie;
      if (currentIndex < sameParts.length - 1) seriesEpisodes.next = sameParts[currentIndex + 1] as DBMovie;
      
      recommendations = movies
        .filter(m => m.id !== currentMovieId && !sameParts.find(s => s.id === m.id))
        .filter(m => currentMovie && m.genre === currentMovie.genre)
        .slice(0, 5) as DBMovie[];
    } else {
      // Regular movie - get 5 recommendations by genre first, then any other movies
      if (currentMovie) {
        recommendations = movies
          .filter(m => m.id !== currentMovieId && m.genre === currentMovie.genre)
          .slice(0, 5) as DBMovie[];
      }
      
      // If not enough same-genre, fill with any other movies
      if (recommendations.length < 5) {
        const more = movies
          .filter(m => m.id !== currentMovieId && !recommendations.find(r => r.id === m.id))
          .slice(0, 5 - recommendations.length) as DBMovie[];
        recommendations = [...recommendations, ...more];
      }
    }
    
    return { seriesEpisodes, recommendations };
  }, [movies, currentMovieId, currentMovieTitle]);

  const hasEpisodes = seriesEpisodes.prev || seriesEpisodes.next;

  if (!hasEpisodes && recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Episode Navigation for Series */}
      {hasEpisodes && (
        <div className="flex gap-2">
          {seriesEpisodes.prev && (
            <Link
              to={buildWatchPath(seriesEpisodes.prev.title, seriesEpisodes.prev.id)}
              className="flex-1 flex items-center gap-2 p-3 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/30 transition-all group"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Previous</p>
                <p className="text-sm font-medium text-foreground truncate">{seriesEpisodes.prev.title}</p>
              </div>
            </Link>
          )}
          {seriesEpisodes.next && (
            <Link
              to={buildWatchPath(seriesEpisodes.next.title, seriesEpisodes.next.id)}
              className="flex-1 flex items-center gap-2 p-3 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/30 transition-all group text-right"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Next</p>
                <p className="text-sm font-medium text-foreground truncate">{seriesEpisodes.next.title}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-primary" />
            </Link>
          )}
        </div>
      )}

      {/* Recommended Movies */}
      {recommendations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Play className="h-4 w-4 text-primary" />
            Recommended
          </h3>
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
            {recommendations.map((movie) => (
              <Link
                key={movie.id}
                to={buildWatchPath(movie.title, movie.id)}
                className="flex-shrink-0 w-12 group"
              >
                <div className="relative aspect-[2/3] rounded overflow-hidden bg-card border border-border/50 group-hover:border-primary/50 transition-all">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-3 w-3 text-white fill-white" />
                  </div>
                </div>
                <p className="mt-0.5 text-[8px] text-foreground font-medium truncate">{movie.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedMovies;
