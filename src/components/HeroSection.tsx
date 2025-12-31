import { useState, useEffect } from "react";
import { Play, Info, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { slugify } from "@/lib/slugify";
import heroImageFallback from "@/assets/dont.jpg";

interface HeroSectionProps {
  onPlayVideo: (videoId: string) => void;
}

interface FeaturedMovie {
  id: string;
  title: string;
  description: string;
  year: string;
  genre: string;
  rating: string;
  poster_url: string;
  video_url: string;
}

const HeroSection = ({ onPlayVideo }: HeroSectionProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState<FeaturedMovie | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedMovie();
  }, []);

  const fetchFeaturedMovie = async () => {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('featured', true)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching featured movie:', error);
      }
      
      if (data) {
        setFeaturedMovie(data);
      }
      
      // Trigger fade-in animation
      setTimeout(() => setIsLoaded(true), 100);
    } catch (error) {
      console.error('Error:', error);
      setTimeout(() => setIsLoaded(true), 100);
    }
  };

  const handlePlayClick = () => {
    if (featuredMovie) {
      const slug = slugify(featuredMovie.title);
      navigate(`/watch/${slug}/${featuredMovie.id}`);
    } else {
      navigate('/movies');
    }
  };

  // Check if we have a featured movie
  const hasFeatured = !!featuredMovie;
  const title = featuredMovie?.title || "";
  const description = featuredMovie?.description || "";
  const year = featuredMovie?.year || "";
  const genre = featuredMovie?.genre || "";
  const posterUrl = featuredMovie?.poster_url || heroImageFallback;

  return (
    <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-start overflow-hidden">
      {/* Background Image with smooth fade */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <img
          src={posterUrl}
          alt={hasFeatured ? `${title} featured movie` : "Rwaflix streaming"}
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/20 sm:from-background/90 sm:via-background/50 sm:to-transparent" />
      
      {/* Content with fade animation */}
      <div 
        className={`relative z-10 container mx-auto px-4 sm:px-6 transition-all duration-700 ease-out delay-200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
          {hasFeatured ? (
            /* Featured Movie Content */
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-primary/20 border border-primary/30 rounded-full text-primary text-xs font-medium backdrop-blur-sm animate-fade-in">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Yatoranijwe</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                {title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-none">
                {description || `${genre} • ${year}`}
              </p>
            </>
          ) : (
            /* Welcome State - Beautiful branded fallback */
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-primary/20 border border-primary/30 rounded-full text-primary text-xs font-medium backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>Live Streaming</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                Murakaza Neza kuri{" "}
                <span className="text-primary">Rwaflix</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Reba filime nyinshi z'agasobanuye. Streaming igezweho mu Rwanda!
              </p>
            </>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow transition-all duration-300 text-sm sm:text-base group"
              onClick={handlePlayClick}
            >
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
              {hasFeatured ? "Tangira Kureba" : "Reba Filime"}
            </Button>
            {hasFeatured && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border bg-background/20 hover:bg-background/40 backdrop-blur-sm text-sm sm:text-base"
                onClick={() => setShowInfo(true)}
              >
                <Info className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Birambuye
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showInfo && featuredMovie && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowInfo(false)}
        >
          <div 
            className="relative bg-card border border-border rounded-lg shadow-2xl max-w-2xl w-full p-6 sm:p-8 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 hover:bg-accent"
              onClick={() => setShowInfo(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground pr-8">
                {title} ({year})
              </h2>
              
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full">{year}</span>
                {genre.split(',').map((g, i) => (
                  <span key={i} className="bg-accent/50 text-accent-foreground px-3 py-1 rounded-full">
                    {g.trim()}
                  </span>
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {description || "No description available."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow"
                  onClick={() => {
                    setShowInfo(false);
                    handlePlayClick();
                  }}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Tangira Kureba
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setShowInfo(false)}
                >
                  Funga
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
