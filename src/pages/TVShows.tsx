import { useState } from "react";
import { Helmet } from "react-helmet-async";
import StreamingHeader from "@/components/StreamingHeader";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { useMovies } from "@/hooks/useMovies";
import { Skeleton } from "@/components/ui/skeleton";
import { MonetagInpush, MonetagVignette } from "@/components/MonetagAds";
import SupportButton from "@/components/SupportButton";

const TVShows = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { movies, loading } = useMovies();

  const tvShows = movies.filter(movie => movie.category === 'tv');
  
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
      <Helmet>
        <title>Series Agasobanuye - TV Shows | Rwaflix Rwanda</title>
        <meta name="description" content="Reba series agasobanuye ku Rwaflix. Watch TV shows dubbed in Kinyarwanda. Best series streaming Rwanda, Oshakur, Cinebeta alternative." />
        <meta name="keywords" content="series agasobanuye, tv shows rwanda, rwaflix series, oshakur series, cinebeta series, kinyarwanda series, dubbed series" />
        <link rel="canonical" href="https://rwaflix.store/tv-shows" />
        <meta property="og:title" content="Series Agasobanuye - TV Shows | Rwaflix" />
        <meta property="og:description" content="Reba series agasobanuye ku Rwaflix. Watch TV shows dubbed in Kinyarwanda." />
        <meta property="og:url" content="https://rwaflix.store/tv-shows" />
      </Helmet>
      
      <StreamingHeader onSearch={setSearchQuery} searchQuery={searchQuery} onPlayVideo={handlePlayVideo} />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2 sm:mb-4">Series - TV Shows</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Reba series agasobanuye - Explore our TV shows collection
          </p>
        </div>

        {/* Monetag Ads */}
        <MonetagInpush />
        <MonetagVignette />
        
        {/* Support Button */}
        <div className="flex justify-center my-4">
          <SupportButton />
        </div>

        <section className="mt-4">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[2/3] rounded-lg" />
                  <Skeleton className="h-4 mt-2 w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {filteredShows.map((show) => (
                <MovieCard
                  key={show.id}
                  movie={show}
                  onPlay={handlePlayVideo}
                />
              ))}
            </div>
          )}
          
          {!loading && filteredShows.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-muted-foreground">
                {searchQuery ? `No shows found matching "${searchQuery}"` : "No TV shows available"}
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

export default TVShows;