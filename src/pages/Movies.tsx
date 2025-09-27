import { useState } from "react";
import StreamingHeader from "@/components/StreamingHeader";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { mockMovies } from "@/data/mockData";

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const movies = mockMovies.filter(movie => movie.category === 'movie');
  
  const filteredMovies = movies.filter(movie =>
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StreamingHeader onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Movies</h1>
          <p className="text-lg text-muted-foreground">
            Discover our collection of blockbuster movies
          </p>
        </div>

        <section>
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
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? `No movies found matching "${searchQuery}"` : "No movies available"}
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

export default Movies;