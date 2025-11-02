import { useState } from "react";
import { Play, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/talk.jpg";

interface HeroSectionProps {
  onPlayVideo: (videoId: string) => void;
}

const HeroSection = ({ onPlayVideo }: HeroSectionProps) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-start overflow-hidden">
      <img
        src={heroImage}
        alt="Featured movie"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/20 sm:from-background/90 sm:via-background/50 sm:to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Talk To Me
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-none">
    Mia’s mother died under mysterious circumstances a few months ago, and the young woman still wonders about the cause of her death. </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow transition-all duration-300 text-sm sm:text-base"
              onClick={() => onPlayVideo("featured-movie")}
            >
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Play Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border bg-background/20 hover:bg-background/40 backdrop-blur-sm text-sm sm:text-base"
              onClick={() => setShowInfo(true)}
            >
              <Info className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
          onClick={() => setShowInfo(false)}
        >
          <div 
            className="relative bg-card border border-border rounded-lg shadow-2xl max-w-2xl w-full p-6 sm:p-8 animate-in zoom-in-95"
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
                Talk to me 
              </h2>
              
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full">2022</span>
                <span className="bg-accent/50 text-accent-foreground px-3 py-1 rounded-full">Horror</span>
                <span className="bg-accent/50 text-accent-foreground px-3 py-1 rounded-full">Mystery</span>
                <span className="bg-accent/50 text-accent-foreground px-3 py-1 rounded-full">Sankara</span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
           Mia’s mother died under mysterious circumstances a few months ago, and the young woman still wonders about the cause of her death.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow"
                  onClick={() => {
                    setShowInfo(false);
                    onPlayVideo("featured-movie");
                  }}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Play Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setShowInfo(false)}
                >
                  Close
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
