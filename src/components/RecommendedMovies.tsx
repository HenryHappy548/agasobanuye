import { Link } from "react-router-dom";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { buildWatchPath } from "@/lib/watchRoute";
import { useMovies, DBMovie } from "@/hooks/useMovies";
import { useMemo, memo } from "react";

interface RecommendedMoviesProps {
  currentMovieId: string;
  currentMovieTitle: string;
}

// Extract series info from title (e.g., "Shooter S03 E2" -> { name: "Shooter", season: 3, episode: 2 })
const parseSeriesInfo = (title: string) => {
  // Match patterns like "S01 E5", "S1 E10", "S01E5" etc - handle any spacing
  const match = title.match(/^(.+?)\s*S(\d+)\s*E(\d+)/i);
  if (match) {
    return { 
      name: match[1].trim(), 
      season: parseInt(match[2], 10), 
      episode: parseInt(match[3], 10) 
    };
  }
  // Check for Part A/B pattern (e.g., "Sharper A", "Species B")
  const partMatch = title.match(/^(.+?)\s+([AB])$/i);
  if (partMatch) {
    return { name: partMatch[1].trim(), part: partMatch[2].toUpperCase() };
  }
  return null;
};

// Extract dubber from rating field (e.g., "Rocky kimomo", "Sankara")
const extractDubber = (rating: string): string => {
  if (!rating) return "";
  return rating.toLowerCase().trim();
};

// Smart recommendation scoring
const scoreMovie = (
  candidate: DBMovie, 
  currentMovie: DBMovie,
  sameSeriesIds: Set<string>
): number => {
  if (candidate.id === currentMovie.id || sameSeriesIds.has(candidate.id)) return -1;
  
  let score = 0;
  
  // Same dubber (highest priority for Rwaflix users)
  const currentDubber = extractDubber(currentMovie.rating);
  const candidateDubber = extractDubber(candidate.rating);
  if (currentDubber && candidateDubber && currentDubber === candidateDubber) {
    score += 30;
  }
  
  // Same genre
  if (candidate.genre.toLowerCase() === currentMovie.genre.toLowerCase()) {
    score += 20;
  }
  
  // Same year (+/- 2 years)
  const currentYear = parseInt(currentMovie.year) || 2020;
  const candidateYear = parseInt(candidate.year) || 2020;
  const yearDiff = Math.abs(currentYear - candidateYear);
  if (yearDiff === 0) score += 15;
  else if (yearDiff <= 2) score += 10;
  else if (yearDiff <= 5) score += 5;
  
  // Trending boost
  if (candidate.category === 'trending') score += 5;
  
  // Has poster (penalize movies without images)
  if (candidate.poster && candidate.poster.length > 10) score += 3;
  
  return score;
};

const RecommendedMovies = memo(({ currentMovieId, currentMovieTitle }: RecommendedMoviesProps) => {
  const { movies } = useMovies();
  
  const { seriesEpisodes, recommendations } = useMemo(() => {
    const seriesInfo = parseSeriesInfo(currentMovieTitle);
    const currentMovie = movies.find(m => m.id === currentMovieId);
    
    let seriesEpisodes: { prev?: DBMovie; next?: DBMovie } = {};
    let recommendations: DBMovie[] = [];
    const sameSeriesIds = new Set<string>();
    
    if (seriesInfo && 'season' in seriesInfo) {
      // TV Series - find prev/next episodes
      const sameSeriesMovies = movies.filter(m => {
        const info = parseSeriesInfo(m.title);
        return info && 'season' in info && info.name.toLowerCase() === seriesInfo.name.toLowerCase();
      });
      
      sameSeriesMovies.forEach(m => sameSeriesIds.add(m.id));
      
      // Sort by season then episode (numeric sorting)
      sameSeriesMovies.sort((a, b) => {
        const aInfo = parseSeriesInfo(a.title);
        const bInfo = parseSeriesInfo(b.title);
        if (aInfo && bInfo && 'season' in aInfo && 'season' in bInfo) {
          if (aInfo.season !== bInfo.season) return aInfo.season - bInfo.season;
          return aInfo.episode - bInfo.episode;
        }
        return 0;
      });
      
      const currentIndex = sameSeriesMovies.findIndex(m => m.id === currentMovieId);
      if (currentIndex > 0) seriesEpisodes.prev = sameSeriesMovies[currentIndex - 1] as DBMovie;
      if (currentIndex < sameSeriesMovies.length - 1) seriesEpisodes.next = sameSeriesMovies[currentIndex + 1] as DBMovie;
    } else if (seriesInfo && 'part' in seriesInfo) {
      // Part A/B pattern
      const sameParts = movies.filter(m => {
        const info = parseSeriesInfo(m.title);
        return info && 'part' in info && info.name.toLowerCase() === seriesInfo.name.toLowerCase();
      });
      
      sameParts.forEach(m => sameSeriesIds.add(m.id));
      
      sameParts.sort((a, b) => {
        const aInfo = parseSeriesInfo(a.title);
        const bInfo = parseSeriesInfo(b.title);
        if (aInfo && bInfo && 'part' in aInfo && 'part' in bInfo) {
          return aInfo.part.localeCompare(bInfo.part);
        }
        return 0;
      });
      
      const currentIndex = sameParts.findIndex(m => m.id === currentMovieId);
      if (currentIndex > 0) seriesEpisodes.prev = sameParts[currentIndex - 1] as DBMovie;
      if (currentIndex < sameParts.length - 1) seriesEpisodes.next = sameParts[currentIndex + 1] as DBMovie;
    }
    
    // Score and sort all movies for recommendations
    if (currentMovie) {
      const scored = movies
        .map(m => ({ movie: m as DBMovie, score: scoreMovie(m as DBMovie, currentMovie as DBMovie, sameSeriesIds) }))
        .filter(item => item.score >= 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);
      
      recommendations = scored.map(item => item.movie);
    }
    
    return { seriesEpisodes, recommendations };
  }, [movies, currentMovieId, currentMovieTitle]);

  const hasEpisodes = seriesEpisodes.prev || seriesEpisodes.next;

  if (!hasEpisodes && recommendations.length === 0) return null;

  return (
    <div className="space-y-4 pt-3">
      {/* Episode Navigation for Series - Compact */}
      {hasEpisodes && (
        <div className="flex gap-2">
          {seriesEpisodes.prev && (
            <Link
              to={buildWatchPath(seriesEpisodes.prev.title, seriesEpisodes.prev.id)}
              className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-muted/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/30 transition-all"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-muted-foreground uppercase">Prev</p>
                <p className="text-xs font-medium text-foreground line-clamp-2">{seriesEpisodes.prev.title}</p>
              </div>
            </Link>
          )}
          {seriesEpisodes.next && (
            <Link
              to={buildWatchPath(seriesEpisodes.next.title, seriesEpisodes.next.id)}
              className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/30 transition-all text-right"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-primary uppercase font-medium">Up Next</p>
                <p className="text-xs font-medium text-foreground line-clamp-2">{seriesEpisodes.next.title}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
            </Link>
          )}
        </div>
      )}

      {/* Recommended Movies - Netflix-style compact */}
      {recommendations.length > 0 && (
        <div className="pt-2">
          {/* Minimal Header */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-1 h-3.5 bg-primary rounded-full"></div>
            <h3 className="text-xs font-semibold text-foreground">Izindi Movie Nziza</h3>
          </div>
          
          {/* Netflix-style 4-column grid - ultra compact */}
          <div className="grid grid-cols-4 gap-1">
            {recommendations.map((movie) => (
              <Link
                key={movie.id}
                to={buildWatchPath(movie.title, movie.id)}
                className="block group"
                title={`Watch ${movie.title} - Rwaflix`}
              >
                {/* Ultra compact card */}
                <div className="relative aspect-[2/3] rounded overflow-hidden bg-muted">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  {/* Subtle hover overlay with play */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                    <Play className="h-4 w-4 text-white fill-white" />
                  </div>
                </div>
                {/* Clear visible title below */}
                <p className="mt-1 text-[10px] font-medium text-foreground line-clamp-2 leading-tight">
                  {movie.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

RecommendedMovies.displayName = 'RecommendedMovies';

export default RecommendedMovies;
