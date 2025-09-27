import { useState } from "react";
import StreamingHeader from "@/components/StreamingHeader";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { mockMovies } from "@/data/mockData";

const TVShows = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const tvShows = mockMovies.filter(movie => movie.category === 'tv');
  
  const filteredShows = tvShows.filter(show =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    show.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <StreamingHeader onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">TV Shows</h1>
          <p className="text-lg text-muted-foreground">
            Binge-watch the best TV series and shows
          </p>
        </div>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredShows.map((show) => (
              <MovieCard
                key={show.id}
                movie={show}
                onPlay={handlePlayVideo}
              />
            ))}
          </div>
          
          {filteredShows.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? `No TV shows found matching "${searchQuery}"` : "No TV shows available"}
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