import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Play, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import StreamingHeader from "@/components/StreamingHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { mockMovies } from "@/data/mockData";
import VideoPlayer from "@/components/VideoPlayer";

interface MovieData {
  id: string;
  title: string;
  description?: string;
  poster: string;
  year: string;
  genre: string;
  rating: string;
  category: string;
  video_key?: string;
  dubbed?: string;
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      setLoading(true);

      // Try to fetch from database first
      const { data: dbMovie } = await supabase
        .from("movies")
        .select("*")
        .eq("video_key", id)
        .maybeSingle();

      if (dbMovie) {
        setMovie({
          id: dbMovie.video_key || dbMovie.id,
          title: dbMovie.title,
          description: dbMovie.description,
          poster: dbMovie.poster_url,
          year: dbMovie.year?.toString() || "",
          genre: dbMovie.genre || "",
          rating: dbMovie.rating || "",
          category: dbMovie.category || "movie",
          video_key: dbMovie.video_key,
          dubbed: dbMovie.dubbed,
        });
      } else {
        // Fallback to mock data
        const mockMovie = mockMovies.find((m) => m.id === id);
        if (mockMovie) {
          setMovie({
            ...mockMovie,
            video_key: mockMovie.id,
            description: `Watch ${mockMovie.title} online. ${mockMovie.genre} film from ${mockMovie.year}.`,
          });
        }
      }

      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      navigate(`/movies?search=${encodeURIComponent(query)}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <StreamingHeader 
          onSearch={handleSearch} 
          searchQuery={searchQuery}
          onPlayVideo={() => {}}
        />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <StreamingHeader 
          onSearch={handleSearch} 
          searchQuery={searchQuery}
          onPlayVideo={() => {}}
        />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const pageUrl = `https://rwaflix.com/movie/${movie.id}`;
  const pageTitle = `${movie.title} (${movie.year}) - Watch on Rwaflix`;
  const pageDescription =
    movie.description ||
    `Watch ${movie.title} online on Rwaflix. ${movie.genre} film from ${movie.year}. Rated ${movie.rating}.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={movie.poster} />
        <meta property="og:site_name" content="Rwaflix" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={movie.poster} />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Movie",
            name: movie.title,
            description: pageDescription,
            image: movie.poster,
            datePublished: movie.year,
            genre: movie.genre,
            aggregateRating: movie.rating
              ? {
                  "@type": "AggregateRating",
                  ratingValue: movie.rating,
                }
              : undefined,
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <StreamingHeader 
          onSearch={handleSearch} 
          searchQuery={searchQuery}
          onPlayVideo={() => setIsPlaying(true)}
        />

        <main className="container mx-auto px-4 py-8 sm:py-12">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Movie Content */}
          <article className="grid md:grid-cols-[300px,1fr] lg:grid-cols-[400px,1fr] gap-8 lg:gap-12">
            {/* Movie Poster */}
            <div className="w-full">
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="w-full rounded-lg shadow-2xl border border-border"
              />
            </div>

            {/* Movie Info */}
            <div className="space-y-6">
              <header>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  {movie.title}
                </h1>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="inline-flex items-center px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                    {movie.year}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {movie.rating}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                    {movie.genre}
                  </span>
                  {movie.dubbed && (
                    <span className="inline-flex items-center px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                      Dubbed: {movie.dubbed}
                    </span>
                  )}
                </div>
              </header>

              {movie.description && (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-xl font-semibold mb-3">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {movie.description}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-glow text-primary-foreground font-semibold shadow-lg"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Now
                </Button>
              </div>
            </div>
          </article>
        </main>

        <Footer />

        {/* Video Player Modal */}
        <VideoPlayer
          isOpen={isPlaying}
          onClose={() => setIsPlaying(false)}
          videoId={movie.video_key || movie.id}
        />
      </div>
    </>
  );
};

export default MovieDetail;
