import { useState } from "react";
import { Helmet } from "react-helmet-async";
import StreamingHeader from "@/components/StreamingHeader";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { useMovies } from "@/hooks/useMovies";
import { Skeleton } from "@/components/ui/skeleton";
import SupportButton from "@/components/SupportButton";

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { movies, loading } = useMovies();

  const moviesOnly = movies.filter(movie => movie.category === 'movie');
  
  const filteredMovies = moviesOnly.filter(movie =>
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
      <Helmet>
        <title>Filime Agasobanuye - Movies | Rwaflix Rwanda</title>
        <meta name="description" content="Reba filime agasobanuye ku Rwaflix. Watch dubbed movies in Kinyarwanda. Best movie streaming Rwanda, Oshakur, Cinebeta alternative." />
        <meta name="keywords" content="filime agasobanuye, movies rwanda, rwaflix movies, oshakur movies, cinebeta filime, kinyarwanda movies, dubbed movies" />
        <link rel="canonical" href="https://rwaflix.store/movies" />
        <meta property="og:title" content="Filime Agasobanuye - Movies | Rwaflix" />
        <meta property="og:description" content="Reba filime agasobanuye ku Rwaflix. Watch dubbed movies in Kinyarwanda." />
        <meta property="og:url" content="https://rwaflix.store/movies" />
      </Helmet>
      
      <StreamingHeader onSearch={setSearchQuery} searchQuery={searchQuery} onPlayVideo={handlePlayVideo} />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2 sm:mb-4">Filime - Movies</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Reba filime agasobanuye - Watch our collection of dubbed movies
          </p>
        </div>

        {/* Support Button */}
        <div className="flex justify-center my-4">
          <SupportButton />
        </div>

        <section className="mt-4">
          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
              {[...Array(12)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[2/3] rounded-lg" />
                  <Skeleton className="h-4 mt-2 w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onPlay={handlePlayVideo}
                />
              ))}
            </div>
          )}
          
          {!loading && filteredMovies.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-muted-foreground">
                {searchQuery ? `No movies found matching "${searchQuery}"` : "No movies available"}
              </p>
            </div>
          )}
        </section>

        {/* Support Button */}
        <div className="flex justify-center my-6">
          <SupportButton variant="inline" />
        </div>
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
