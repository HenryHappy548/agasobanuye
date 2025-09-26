import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-featured.jpg";

interface HeroSectionProps {
  onPlayVideo: (videoId: string) => void;
}

const HeroSection = ({ onPlayVideo }: HeroSectionProps) => {
  return (
    <section className="relative h-[70vh] flex items-center justify-start overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Weapons (2025) 
          </h1>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Weapons is a 2025 American mystery horror film directed, written, produced, and co-scored by Zach Cregger. The film stars an ensemble cast including Josh Brolin, Julia Garner, Alden Ehrenreich, Austin Abrams, Cary Christopher, Toby Huss, Benedict Wong, and Amy Madigan. Its plot follows the seemingly inexplicable case of seventeen children from the same classroom who mysteriously run away on the same night at the same time.          </p>
          <div className="flex space-x-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow transition-all duration-300"
              onClick={() => onPlayVideo("featured-movie")}
            >
              <Play className="mr-2 h-5 w-5" />
              Play Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border bg-background/20 hover:bg-background/40 backdrop-blur-sm"
            >
              <Info className="mr-2 h-5 w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
