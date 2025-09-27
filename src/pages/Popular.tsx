import { useState } from "react";
import StreamingHeader from "@/components/StreamingHeader";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { mockMovies } from "@/data/mockData";

const Popular = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const popularContent = mockMovies.filter(movie => movie.category === 'trending');
  
  const filteredContent = popularContent.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.genre.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-4xl font-bold text-primary mb-4">Popular Content</h1>
          <p className="text-lg text-muted-foreground">
            The most watched movies and shows right now
          </p>
        </div>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredContent.map((content) => (
              <MovieCard
                key={content.id}
                movie={content}
                onPlay={handlePlayVideo}
              />
            ))}
          </div>
          
          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? `No popular content found matching "${searchQuery}"` : "No popular content available"}
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

export default Popular;