import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import StreamingHeader from "@/components/StreamingHeader";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { useMovies } from "@/hooks/useMovies";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const GenreMovies = () => {
  const { genre } = useParams<{ genre: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { movies, loading } = useMovies();

  const decodedGenre = decodeURIComponent(genre || "");

  const filtered = useMemo(() => {
    let result = movies.filter(
      (m) => m.genre.toLowerCase() === decodedGenre.toLowerCase()
    );
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((m) => m.title.toLowerCase().includes(q));
    }
    return result;
  }, [movies, decodedGenre, searchQuery]);

  const handlePlayVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
    setIsPlayerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{decodedGenre} Movies | Rwaflix Rwanda</title>
        <meta name="description" content={`Watch ${decodedGenre} movies dubbed in Kinyarwanda on Rwaflix.`} />
      </Helmet>

      <StreamingHeader onSearch={setSearchQuery} searchQuery={searchQuery} onPlayVideo={handlePlayVideo} />

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">{decodedGenre}</h1>
          <span className="text-sm text-muted-foreground">({filtered.length} movies)</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
            {[...Array(12)].map((_, i) => (
              <div key={i}><Skeleton className="aspect-[2/3] rounded-lg" /><Skeleton className="h-4 mt-2 w-3/4" /></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
            {filtered.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onPlay={handlePlayVideo} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nta filime muri "{decodedGenre}" zibonetse.</p>
          </div>
        )}
      </main>

      <VideoPlayer isOpen={isPlayerOpen} onClose={() => { setIsPlayerOpen(false); setSelectedVideoId(null); }} videoId={selectedVideoId} />
      <Footer />
    </div>
  );
};

export default GenreMovies;
