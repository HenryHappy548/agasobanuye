import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import StreamingHeader from "@/components/StreamingHeader";
import MovieCard from "@/components/MovieCard";
import SeriesCard from "@/components/SeriesCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { useMovies } from "@/hooks/useMovies";
import { Skeleton } from "@/components/ui/skeleton";
import SupportButton from "@/components/SupportButton";
import { groupSeriesMovies } from "@/lib/seriesUtils";

const TVShows = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { movies, loading } = useMovies();

  const tvShows = movies.filter(movie => movie.category === 'tv');
  
  const filteredShows = useMemo(() => {
    let filtered = tvShows;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = tvShows.filter(show =>
        show.title.toLowerCase().includes(query) ||
        show.genre.toLowerCase().includes(query)
      );
    }
    return groupSeriesMovies(filtered);
  }, [tvShows, searchQuery]);

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
              {filteredShows.map((item) => (
                item.type === 'series' ? (
                  <SeriesCard key={`${item.group.baseName}-${item.group.dubber}`} group={item.group} />
                ) : (
                  <MovieCard key={item.movie.id} movie={item.movie} onPlay={handlePlayVideo} />
                )
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