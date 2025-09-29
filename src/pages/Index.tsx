import { useState } from "react";
import StreamingHeader from "@/components/StreamingHeader";
import HeroSection from "@/components/HeroSection";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { useMovies } from "@/hooks/useMovies";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { movies, loading, error, searchMovies, getMoviesByCategory } = useMovies();

  const filteredMovies = searchQuery ? searchMovies(searchQuery) : movies;

  const handlePlayVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedVideoId(null);
  };

  const trendingMovies = getMoviesByCategory('trending');
  const moviesList = getMoviesByCategory('movie');
  const tvShows = getMoviesByCategory('tv');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StreamingHeader onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      {!searchQuery && <HeroSection onPlayVideo={handlePlayVideo} />}
      
      <main className="container mx-auto px-4 py-6 sm:py-8 space-y-8 sm:space-y-12">
        {error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading movies: {error}</p>
          </div>
        ) : loading ? (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
              ))}
            </div>
          </div>
        ) : searchQuery ? (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Search Results for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onPlay={handlePlayVideo}
                />
              ))}
            </div>
            {filteredMovies.length === 0 && (
              <p className="text-muted-foreground text-center py-8 sm:py-12">
                No results found. Try searching for something else.
              </p>
            )}
          </section>
        ) : (
          <>
            {trendingMovies.length > 0 && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
                  Trending Now
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {trendingMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onPlay={handlePlayVideo}
                    />
                  ))}
                </div>
              </section>
            )}

            {moviesList.length > 0 && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
                  Popular Movies
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {moviesList.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onPlay={handlePlayVideo}
                    />
                  ))}
                </div>
              </section>
            )}

            {tvShows.length > 0 && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
                  TV Shows
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {tvShows.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onPlay={handlePlayVideo}
                    />
                  ))}
                </div>
              </section>
            )}

            {movies.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No movies available yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Admin can add movies through the CMS panel.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <VideoPlayer
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        videoId={selectedVideoId}
      />
      
      <Footer />
    </div>
  );
};

export default Index;