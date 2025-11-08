import { useState } from "react";
import StreamingHeader from "@/components/StreamingHeader";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { useMoviesByCategory } from "@/hooks/useMovies";

const TVShows = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  
  const { data: tvShows = [], isLoading } = useMoviesByCategory('tv');
  
  const filteredShows = tvShows.filter(show =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    show.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading TV shows...</p>
        </div>
      </div>
    );
  }

  const handlePlayVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedVideoId(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StreamingHeader onSearch={setSearchQuery} searchQuery={searchQuery} onPlayVideo={handlePlayVideo} />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2 sm:mb-4">Series</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Binge-watch the best TV series and shows
          </p>
        </div>

        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredShows.map((show) => (
              <MovieCard
                key={show.id}
                movie={show}
                onPlay={handlePlayVideo}
              />
            ))}
          </div>
          
          {filteredShows.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-muted-foreground">
                {searchQuery ? `No series found matching "${searchQuery}"` : "No series available"}
              </p>
            </div>
          )}
        </section>
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

export default TVShows;