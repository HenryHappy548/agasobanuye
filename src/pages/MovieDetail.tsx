import { useParams, Link } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Play, Calendar, Film, Star, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { mockMovies } from "@/data/mockData";
import { slugify } from "@/lib/slugify";
import { toast } from "sonner";

const MovieDetail = memo(() => {
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

  const handleShare = async () => {
    const shareUrl = `https://rwaflix.store/watch/${slug}`;
    const shareText = `Watch ${movie?.title} on Rwaflix - Free Streaming`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie?.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Helmet>
          <title>Movie Not Found | Rwaflix - Rwandan Streaming</title>
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
  const pageTitle = `${movie.title} (${movie.year}) - Reba Agasobanuye | Rwaflix`;
  const pageDescription = `Reba ${movie.title} (${movie.year}) ku buntu kuri Rwaflix. ${movie.genre} movie. Stream HD quality, download options. Agasobanuye, Movie Nyarwanda.`;
  const seoKeywords = `${movie.title}, watch ${movie.title} online, ${movie.title} agasobanuye, ${movie.genre}, ${movie.year} movies, Rwaflix, Agasobanuye, Movie Nyarwanda, Oshakur, Cinebeta, free streaming Rwanda, ${movie.title} download, reba filime`;

  // Generate VideoObject schema for better Google indexing
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": movie.title,
    "description": `Watch ${movie.title} (${movie.year}) - ${movie.genre} movie available on Rwaflix. Stream in HD quality with download options.`,
    "thumbnailUrl": movie.poster,
    "uploadDate": `${movie.year}-01-01T00:00:00+00:00`,
    "contentUrl": canonicalUrl,
    "embedUrl": canonicalUrl,
    "duration": "PT2H",
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": 1500
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rwaflix",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rwaflix.store/logo-512.jpg"
      }
    }
  };

  const movieSchema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "datePublished": movie.year,
    "genre": movie.genre,
    "image": movie.poster,
    "url": canonicalUrl,
    "description": pageDescription,
    "inLanguage": ["rw", "en"],
    "countryOfOrigin": {
      "@type": "Country",
      "name": "Rwanda"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "bestRating": "5",
      "ratingCount": "150"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Rwaflix",
        "item": "https://rwaflix.store"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Movies",
        "item": "https://rwaflix.store/movies"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": movie.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={movie.poster} />
        <meta property="og:image:alt" content={`${movie.title} movie poster`} />
        <meta property="og:site_name" content="Rwaflix - Agasobanuye" />
        <meta property="og:locale" content="rw_RW" />
        <meta property="video:release_date" content={`${movie.year}-01-01`} />
        <meta property="video:tag" content={movie.genre} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={movie.poster} />
        <meta name="twitter:label1" content="Genre" />
        <meta name="twitter:data1" content={movie.genre} />
        <meta name="twitter:label2" content="Year" />
        <meta name="twitter:data2" content={movie.year} />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(videoSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(movieSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/movies">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-foreground truncate">{movie.title}</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
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
                alt={`${movie.title} poster - Rwaflix Agasobanuye`}
                className="w-48 md:w-64 rounded-lg shadow-2xl border border-border"
                loading="eager"
                width={256}
                height={384}
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

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  onClick={handlePlayVideo}
                  className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handlePlayVideo}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <article>
          <h2 className="text-xl font-semibold text-foreground mb-4">About {movie.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Reba {movie.title} ({movie.year}) ku buntu kuri Rwaflix. Iyi {movie.genre.toLowerCase()} movie 
            iraboneka mu HD quality. Stream cyangwa ubone download options nyinshi.
            Agasobanuye na {movie.rating}.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Watch {movie.title} ({movie.year}) online for free on Rwaflix. This {movie.genre.toLowerCase()} 
            is available in HD quality with multiple download options. Enjoy streaming on Rwanda's best movie platform.
            Requested by {movie.rating}.
          </p>
        </article>

        {/* SEO Keywords Section */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Related Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {[movie.genre, 'Agasobanuye', 'Rwaflix', 'Movie Nyarwanda', movie.year, 'Free Streaming', 'HD Quality'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-accent/50 rounded-full text-xs text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
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
});

MovieDetail.displayName = 'MovieDetail';

export default MovieDetail;
