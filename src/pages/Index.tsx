import { useState } from "react";
import StreamingHeader from "@/components/StreamingHeader";
import HeroSection from "@/components/HeroSection";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { mockMovies } from "@/data/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const filteredMovies = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedVideoId(null);
  };

  const trendingMovies = mockMovies.filter(movie => movie.category === 'trending');
  const movies = mockMovies.filter(movie => movie.category === 'movie');
  const tvShows = mockMovies.filter(movie => movie.category === 'tv');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StreamingHeader onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      {!searchQuery && <HeroSection onPlayVideo={handlePlayVideo} />}
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {searchQuery ? (
          <section>
            <h2 className="text-2xl font-bold mb-6">
              Search Results for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onPlay={handlePlayVideo}
                />
              ))}
            </div>
            {filteredMovies.length === 0 && (
              <p className="text-muted-foreground text-center py-12">
                No results found. Try searching for something else.
              </p>
            )}
          </section>
        ) : (
          <>
            <section>
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Trending Now
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {trendingMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Popular Movies
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                TV Shows
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {tvShows.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </section>
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