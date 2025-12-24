import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, memo, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Play, Calendar, Film, Star, Download, Share2, Copy, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import { slugify } from "@/lib/slugify";
import { toast } from "sonner";
import { useMovies, DBMovie } from "@/hooks/useMovies";
import DOMPurify from "dompurify";

const MovieDetail = memo(() => {
  const { slug, id } = useParams<{ slug: string; id?: string }>();
  const navigate = useNavigate();
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [showDownload, setShowDownload] = useState(false);
  const { movies, loading } = useMovies();

  // Find movie by stable id when present, otherwise fallback to slug
  const movie = useMemo(() => {
    if (id) return movies.find((m) => m.id === id);
    return movies.find((m) => slugify(m.title) === slug);
  }, [movies, slug, id]);

  // If user lands on old /watch/:slug route, redirect to stable /watch/:slug/:id
  useEffect(() => {
    if (!loading && movie && !id) {
      navigate(`/watch/${slugify(movie.title)}/${movie.id}`, { replace: true });
    }
  }, [loading, movie, id, navigate]);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [slug, id]);

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

  const canonicalPath = movie ? `/watch/${slugify(movie.title)}/${movie.id}` : `/watch/${slug || ""}`;
  const canonicalUrl = `https://rwaflix.store${canonicalPath}`;

  const handleShare = async () => {
    const shareText = `Watch ${movie?.title} on Rwaflix - Free Streaming`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: movie?.title,
          text: shareText,
          url: canonicalUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(canonicalUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

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

  const pageTitle = `${movie.title} (${movie.year}) - Reba Agasobanuye | Rwaflix`;
  const pageDescription = `Reba ${movie.title} (${movie.year}) ku buntu kuri Rwaflix. ${movie.genre} movie agasobanuye. Stream HD quality, download options. Movie Nyarwanda, Oshakur, Cinebeta alternative.`;
  const seoKeywords = `${movie.title}, watch ${movie.title} online, ${movie.title} agasobanuye, ${movie.genre}, ${movie.year} movies, Rwaflix, rwafix, Agasobanuye, Movie Nyarwanda, Oshakur, Cinebeta, free streaming Rwanda, ${movie.title} download, reba filime, ${movie.title} full movie`;

  // Generate VideoObject schema for better Google video indexing
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": movie.title,
    "description": `Watch ${movie.title} (${movie.year}) - ${movie.genre} movie available on Rwaflix. Stream in HD quality with download options. Agasobanuye.`,
    "thumbnailUrl": movie.poster,
    "uploadDate": `${movie.year}-01-01T00:00:00+02:00`,
    "contentUrl": canonicalUrl,
    "embedUrl": canonicalUrl,
    "duration": "PT2H",
    "inLanguage": ["rw", "en"],
    "isFamilyFriendly": true,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": 1500
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rwaflix",
      "url": "https://rwaflix.store",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rwaflix.store/logo-512.jpg",
        "width": 512,
        "height": 512
      }
    },
    "potentialAction": {
      "@type": "WatchAction",
      "target": canonicalUrl
    }
  };

  const movieSchema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "alternateName": `${movie.title} Agasobanuye`,
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
      "worstRating": "1",
      "ratingCount": "150"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "RWF",
      "url": canonicalUrl
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Rwaflix - Agasobanuye",
        "item": "https://rwaflix.store"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": movie.category === 'tv' ? 'TV Series' : 'Movies',
        "item": movie.category === 'tv' ? "https://rwaflix.store/tv-shows" : "https://rwaflix.store/movies"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Category: ${movie.genre}`,
        "item": `https://rwaflix.store/movies?genre=${encodeURIComponent(movie.genre)}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": movie.title,
        "item": canonicalUrl
      }
    ]
  };

  // WebPage schema for better indexing
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Rwaflix",
      "url": "https://rwaflix.store"
    },
    "about": {
      "@type": "Movie",
      "name": movie.title
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": movie.poster
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "article"]
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(canonicalUrl);
    toast.success("Link copied!");
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`🎬 ${movie.title} - Reba kuri Rwaflix!\n\n${canonicalUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95">
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
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
      </Helmet>

      {/* Clean Navigation */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/movies">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-foreground truncate flex-1 text-center">
            {movie.title}
          </h1>
          <Button variant="outline" size="sm" onClick={handleShare} className="border-primary/30 hover:bg-primary/10">
            <Share2 className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </nav>

      {/* Hero Section - Brighter Design */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background/80 to-background" />
        <div 
          className="h-[35vh] sm:h-[45vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        
        <div className="container mx-auto px-4 -mt-28 sm:-mt-36 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Poster with Glow Effect */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/50 to-primary/20 rounded-xl blur-lg opacity-60"></div>
                <img 
                  src={movie.poster} 
                  alt={`${movie.title} poster - Rwaflix Agasobanuye`}
                  className="relative w-40 sm:w-48 md:w-56 rounded-xl shadow-2xl border-2 border-card"
                  loading="eager"
                  width={224}
                  height={336}
                />
              </div>
            </div>

            {/* Info Card */}
            <div className="flex-1 text-center md:text-left">
              <div className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-border/50 shadow-lg">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {movie.title}
                </h1>
                
                {/* Rating Badge */}
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold">{movie.rating}</span>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-5">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/80 rounded-full text-sm">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span className="font-medium">{movie.year}</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/15 text-primary rounded-full text-sm font-medium">
                    <Film className="h-3.5 w-3.5" />
                    {movie.genre}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button 
                    size="lg" 
                    onClick={handlePlayVideo}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 font-bold"
                  >
                    <Play className="mr-2 h-5 w-5 fill-current" />
                    Watch Now
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setShowDownload(!showDownload)}
                    className="border-primary/40 hover:bg-primary/10"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    {showDownload ? "Hide" : "Download"}
                  </Button>
                </div>

                {/* Download Embed Section */}
                {showDownload && (movie as DBMovie).download_url && (
                  <div className="mt-5 p-4 bg-accent/30 rounded-xl border border-border/50">
                    <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                      <Download className="h-4 w-4 text-primary" />
                      Download Options
                    </h3>
                    <div 
                      className="w-full aspect-video rounded-lg overflow-hidden bg-background/50"
                      dangerouslySetInnerHTML={{ 
                        __html: DOMPurify.sanitize((movie as DBMovie).download_url || "", {
                          ADD_TAGS: ['iframe'],
                          ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
                        })
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Buttons Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 justify-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleWhatsAppShare}
            className="bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-600 dark:text-green-400"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Share on WhatsApp
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCopyLink}
            className="hover:bg-accent"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-br from-card/80 to-card/40 rounded-2xl p-5 sm:p-6 border border-border/50">
          <article>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Film className="h-5 w-5 text-primary" />
              About {movie.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
              Reba {movie.title} ({movie.year}) ku buntu kuri Rwaflix. Iyi {movie.genre.toLowerCase()} movie 
              iraboneka mu HD quality. Stream cyangwa ubone download options nyinshi.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Watch {movie.title} ({movie.year}) online for free on Rwaflix. This {movie.genre.toLowerCase()} 
              is available in HD quality with multiple streaming options.
            </p>
          </article>

          {/* Tags */}
          <div className="mt-6 pt-4 border-t border-border/30">
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Related Tags</h3>
            <div className="flex flex-wrap gap-2">
              {[movie.genre, 'Agasobanuye', 'Rwaflix', movie.year, 'HD Quality', 'Free'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-primary/10 hover:bg-primary/20 rounded-full text-xs text-primary font-medium transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section - Movie Specific */}
      <section className="container mx-auto px-4 py-8">
        <CommentSection movieId={movie.id} movieTitle={movie.title} />
      </section>

      {/* Video Player */}
      <VideoPlayer
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        videoId={selectedVideoId || ""}
      />

      <Footer showComments={false} />
    </div>
  );
});

MovieDetail.displayName = 'MovieDetail';

export default MovieDetail;
