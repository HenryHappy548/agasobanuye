import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-featured.jpeg";

interface HeroSectionProps {
  onPlayVideo: (videoId: string) => void;
}

const HeroSection = ({ onPlayVideo }: HeroSectionProps) => {
  return (
    <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-start overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/20 sm:from-background/90 sm:via-background/50 sm:to-transparent" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Knight and Day (2010) 
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-none"> Knight and Day is a 2010 American action-comedy film directed by James Mangold, starring Tom Cruise as a spy and Cameron Diaz as a woman who becomes inadvertently involved in his international adventure
           </p>
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
            >
              <Info className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
