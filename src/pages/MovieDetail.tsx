import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, memo, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Film, Star, Share2, Copy, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmbeddedPlayer from "@/components/EmbeddedPlayer";
import CommentSection from "@/components/CommentSection";
import Footer from "@/components/Footer";
import { slugify } from "@/lib/slugify";
import { toast } from "sonner";
import { useMovies, DBMovie } from "@/hooks/useMovies";
import { ProductSlider } from "@/components/ProductSlider";
import { MiniProductStrip } from "@/components/MiniProductStrip";

const MovieDetail = memo(() => {
  const { slug, id } = useParams<{ slug: string; id?: string }>();
  const navigate = useNavigate();
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
    window.scrollTo(0, 0);
  }, [slug, id]);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(canonicalUrl);
    toast.success("Link copied!");
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`🎬 ${movie?.title} - Reba kuri Rwaflix!\n\n${canonicalUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
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
  const pageDescription = `Reba ${movie.title} (${movie.year}) ku buntu kuri Rwaflix. ${movie.genre} movie agasobanuye. Stream HD quality, download options.`;
  const seoKeywords = `${movie.title}, watch ${movie.title} online, ${movie.title} agasobanuye, ${movie.genre}, ${movie.year} movies, Rwaflix, Agasobanuye, free streaming Rwanda`;

  // Schema.org structured data
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": movie.title,
    "description": `Watch ${movie.title} (${movie.year}) - ${movie.genre} movie on Rwaflix.`,
    "thumbnailUrl": movie.poster,
    "uploadDate": `${movie.year}-01-01T00:00:00+02:00`,
    "contentUrl": canonicalUrl,
    "embedUrl": canonicalUrl,
    "duration": "PT2H",
    "publisher": {
      "@type": "Organization",
      "name": "Rwaflix",
      "url": "https://rwaflix.store"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Rwaflix", "item": "https://rwaflix.store" },
      { "@type": "ListItem", "position": 2, "name": movie.category === 'tv' ? 'Series' : 'Movies', "item": movie.category === 'tv' ? "https://rwaflix.store/tv-shows" : "https://rwaflix.store/movies" },
      { "@type": "ListItem", "position": 3, "name": movie.title, "item": canonicalUrl }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card/30">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={movie.poster} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:image" content={movie.poster} />
        <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/movies">
            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <span className="text-base sm:text-lg font-bold text-foreground truncate flex-1 text-center">
            {movie.title}
          </span>
          <Button variant="outline" size="sm" onClick={handleShare} className="border-primary/30 hover:bg-primary/10">
            <Share2 className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        
        {/* Movie Info Header */}
        <section className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/40 to-primary/10 rounded-xl blur-lg opacity-50"></div>
              <img 
                src={movie.poster} 
                alt={`${movie.title} poster`}
                className="relative w-28 sm:w-36 rounded-xl shadow-xl border border-card"
                loading="eager"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 bg-yellow-500/20 rounded-full">
                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-yellow-600 dark:text-yellow-400 font-bold">{movie.rating}</span>
              </div>
              <span className="flex items-center gap-1 px-2.5 py-1 bg-accent rounded-full text-sm">
                <Calendar className="h-3 w-3 text-primary" />
                {movie.year}
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 bg-primary/15 text-primary rounded-full text-sm font-medium">
                <Film className="h-3 w-3" />
                {movie.genre}
              </span>
            </div>

            {/* Share Buttons */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleWhatsAppShare}
                className="bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-600 dark:text-green-400"
              >
                <MessageCircle className="mr-1.5 h-4 w-4" />
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCopyLink}
              >
                <Copy className="mr-1.5 h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </div>
        </section>

        {/* Mini Products Above Player */}
        <MiniProductStrip limit={3} />

        {/* Disclaimer to encourage engagement */}
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl p-3 border border-primary/30 text-center">
          <p className="text-foreground text-sm font-medium">
            👇 Manuka hasi utubwire Uko wabonye <span className="text-primary font-bold">{movie.title}</span>
          </p>
        </div>

        {/* Video Player Section - MAIN FEATURE */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full"></div>
            Watch {movie.title}
          </h2>
          <EmbeddedPlayer 
            movieId={movie.id}
            movieTitle={movie.title}
            fallbackVideoUrl={(movie as DBMovie).video_url}
            fallbackDownloadUrl={(movie as DBMovie).download_url}
          />
        </section>

        {/* Product Slider Below Player */}
        <ProductSlider limit={15} title="🔥 Hot Deals" />

        {/* About Section */}
        <section className="bg-gradient-to-br from-card/80 to-card/40 rounded-xl p-5 border border-border/50">
          <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <Film className="h-4 w-4 text-primary" />
            About
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Reba {movie.title} ({movie.year}) ku buntu kuri Rwaflix. Iyi {movie.genre.toLowerCase()} movie iraboneka mu HD quality.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Watch {movie.title} ({movie.year}) online for free on Rwaflix. This {movie.genre.toLowerCase()} is available in HD quality with streaming and download options.
          </p>

          {/* Tags */}
          <div className="mt-4 pt-3 border-t border-border/30">
            <div className="flex flex-wrap gap-1.5">
              {[movie.genre, 'Agasobanuye', 'HD', movie.year, 'Rwaflix'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-primary/10 rounded-full text-xs text-primary font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Comments Section - Movie Specific */}
        <section>
          <CommentSection movieId={movie.id} movieTitle={movie.title} />
        </section>
      </main>

      <Footer showComments={false} />
    </div>
  );
});

MovieDetail.displayName = 'MovieDetail';

export default MovieDetail;
