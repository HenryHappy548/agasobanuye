import { Search, Menu, X, MessageCircle, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import logoRwaflix from "@/assets/logo-rwaflix.png";
import { mockMovies } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StreamingHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onPlayVideo?: (videoId: string) => void;
}

const StreamingHeader = ({ onSearch, searchQuery, onPlayVideo }: StreamingHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  
  const recentMovies = mockMovies.slice(0, 3);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <img src={logoRwaflix} alt="Rwaflix Logo" className="h-7 w-7 sm:h-8 sm:w-8" />
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Rwaflix</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Home
              </Button>
            </Link>
            <Link to="/movies">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Movies
              </Button>
            </Link>
            <Link to="/tv-shows">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                TV Shows
              </Button>
            </Link>
            <Link to="/popular">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Popular
              </Button>
            </Link>
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search movies and shows..."
                className="pl-10 w-48 lg:w-64 bg-input border-border focus:border-primary"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>

            {/* Support Button */}
            <Dialog open={isSupportOpen} onOpenChange={setIsSupportOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Support</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Contact Rwaflix Support</DialogTitle>
                  <DialogDescription>
                    Get in touch with us for assistance
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">WhatsApp</h4>
                    <a 
                      href="https://wa.me/0791114163" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 text-green-500" />
                      <span className="text-foreground font-mono">079 111 4163</span>
                    </a>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">MoMo Pay</h4>
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-foreground font-mono">079 111 4163</p>
                      <p className="text-xs text-muted-foreground mt-1">Send payment to this number</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Mobile Search Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden"
              onClick={toggleSearch}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search movies and shows..."
                className="pl-10 w-full bg-input border-border focus:border-primary"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col space-y-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                  Home
                </Button>
              </Link>
              <Link to="/movies" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                  Movies
                </Button>
              </Link>
              <Link to="/tv-shows" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                  TV Shows
                </Button>
              </Link>
              <Link to="/popular" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                  Popular
                </Button>
              </Link>
            </nav>
          </div>
        )}
        
        {/* Latest Movies Section */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-wide flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary animate-pulse"></span>
              Latest Releases
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {recentMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="group relative overflow-hidden rounded-lg border border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="relative aspect-[2/3]">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Play Button Overlay */}
                  {onPlayVideo && (
                    <button
                      onClick={() => onPlayVideo(movie.id)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="bg-primary/90 backdrop-blur-sm rounded-full p-3 sm:p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground fill-current" />
                      </div>
                    </button>
                  )}
                  
                  {/* Badge */}
                  <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary-foreground">
                    NEW
                  </div>
                </div>
                
                <div className="p-2 sm:p-3">
                  <h4 className="font-semibold text-xs sm:text-sm text-foreground line-clamp-1 mb-1">
                    {movie.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{movie.year}</span>
                    <span className="text-primary font-medium">{movie.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StreamingHeader;