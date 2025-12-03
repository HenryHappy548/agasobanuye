import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Play, Calendar, Film, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { mockMovies } from "@/data/mockData";
import { slugify } from "@/lib/slugify";

const MovieDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  // Find movie by slug
  const movie = mockMovies.find(m => slugify(m.title) === slug);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [slug]);

  const handlePlayVideo = () => {
    if (movie) {
      setSelectedVideoId(movie.id);
      setIsPlayerOpen(true);
    }
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedVideoId(null);
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Helmet>
          <title>Movie Not Found | Rwaflix</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Movie Not Found</h1>
          <Link to="/movies">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Movies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://rwaflix.store/watch/${slug}`;
  const pageTitle = `Watch ${movie.title} (${movie.year}) Free Online | Rwaflix`;
  const pageDescription = `Stream ${movie.title} (${movie.year}) for free on Rwaflix. ${movie.genre} movie with ${movie.rating}. Watch now in HD quality with download options.`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${movie.title}, watch ${movie.title} online, ${movie.genre}, ${movie.year} movies, free streaming, Rwaflix`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={movie.poster} />
        <meta property="og:site_name" content="Rwaflix" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={movie.poster} />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Movie",
            "name": movie.title,
            "datePublished": movie.year,
            "genre": movie.genre,
            "image": movie.poster,
            "url": canonicalUrl,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.5",
              "bestRating": "5",
              "ratingCount": "150"
            }
          })}
        </script>
      </Helmet>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/movies">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-foreground truncate">{movie.title}</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div 
          className="h-[40vh] sm:h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img 
                src={movie.poster} 
                alt={`${movie.title} poster`}
                className="w-48 md:w-64 rounded-lg shadow-2xl border border-border"
                loading="eager"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left pt-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {movie.year}
                </span>
                <span className="flex items-center gap-1">
                  <Film className="h-4 w-4" />
                  {movie.genre}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-primary" />
                  {movie.rating}
                </span>
              </div>

              <Button 
                size="lg" 
                onClick={handlePlayVideo}
                className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <article>
          <h2 className="text-xl font-semibold text-foreground mb-4">About {movie.title}</h2>
          <p className="text-muted-foreground leading-relaxed">
            Watch {movie.title} ({movie.year}) online for free on Rwaflix. This {movie.genre.toLowerCase()} 
            is available in HD quality. Enjoy streaming with multiple download options.
            Requested by {movie.rating}.
          </p>
        </article>
      </section>

      {/* Video Player */}
      <VideoPlayer
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        videoId={selectedVideoId || ""}
      />

      <Footer />
    </div>
  );
};

export default MovieDetail;
