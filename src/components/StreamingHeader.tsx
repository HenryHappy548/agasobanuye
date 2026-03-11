import { Search, Menu, X, MessageCircle, Crown, Mic, Film, ChevronDown, Shuffle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback, useMemo } from "react";
import SimpleLogo from "@/components/SimpleLogo";
import DOMPurify from "dompurify";
import { useMovies } from "@/hooks/useMovies";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import { buildWatchPath } from "@/lib/watchRoute";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface StreamingHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onPlayVideo: (videoId: string) => void;
}

const MAIN_GENRES = ["Action", "Horror", "Drama", "Sci-Fi", "Thriller", "Comedy", "Romance", "Adventure", "Animation"];

const StreamingHeader = ({ onSearch, searchQuery, onPlayVideo }: StreamingHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const { movies } = useMovies();
  const navigate = useNavigate();

  // Extract unique genres and dubbers from movies
  const { genres, dubbers } = useMemo(() => {
    const genreSet = new Set<string>();
    const dubberSet = new Set<string>();
    movies.forEach((m) => {
      if (m.genre) genreSet.add(m.genre);
      if (m.rating && m.rating !== "N/A") dubberSet.add(m.rating.trim());
    });
    return {
      genres: Array.from(genreSet).sort(),
      dubbers: Array.from(dubberSet).sort(),
    };
  }, [movies]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearchChange = useCallback((value: string) => {
    const sanitized = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
    const noExtraSpaces = sanitized.replace(/^\s+/, "").replace(/\s{2,}/g, " ");
    const truncated = noExtraSpaces.slice(0, 100);
    onSearch(truncated);
  }, [onSearch]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <SimpleLogo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-foreground hover:text-primary">Home</Button>
            </Link>
            <Link to="/movies">
              <Button variant="ghost" className="text-foreground hover:text-primary">Movies</Button>
            </Link>
            <Link to="/tv-shows">
              <Button variant="ghost" className="text-foreground hover:text-primary">Series</Button>
            </Link>

            {/* Genre Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-primary gap-1">
                  <Film className="h-4 w-4" />
                  Genre
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover border-border z-[60] w-48 max-h-72 overflow-y-auto animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Genre Zigaragara</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {MAIN_GENRES.filter((g) => genres.some((eg) => eg.toLowerCase() === g.toLowerCase())).map((genre) => (
                  <DropdownMenuItem key={genre} asChild>
                    <Link to={`/genre/${encodeURIComponent(genre)}`} className="cursor-pointer">{genre}</Link>
                  </DropdownMenuItem>
                ))}
                {genres.filter((g) => !MAIN_GENRES.some((mg) => mg.toLowerCase() === g.toLowerCase())).length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-muted-foreground">Izindi</DropdownMenuLabel>
                    {genres.filter((g) => !MAIN_GENRES.some((mg) => mg.toLowerCase() === g.toLowerCase())).map((genre) => (
                      <DropdownMenuItem key={genre} asChild>
                        <Link to={`/genre/${encodeURIComponent(genre)}`} className="cursor-pointer">{genre}</Link>
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Abasobanuzi Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-primary gap-1">
                  <Mic className="h-4 w-4" />
                  Abasobanuzi
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover border-border z-[60] w-52 max-h-72 overflow-y-auto animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Hitamo Umusobanuzi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dubbers.map((dubber) => (
                  <DropdownMenuItem key={dubber} asChild>
                    <Link to={`/dubber/${encodeURIComponent(dubber)}`} className="flex items-center gap-2 cursor-pointer">
                      <Mic className="h-3 w-3 text-primary" />
                      {dubber}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {dubbers.length === 0 && (
                  <DropdownMenuItem disabled>Nta basobanuzi babonetse</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/popular">
              <Button variant="ghost" className="text-foreground hover:text-primary">Popular</Button>
            </Link>
            <Link to="/pro-movies">
              <Button variant="ghost" className="text-amber-500 hover:text-amber-400 gap-1">
                <Crown className="h-4 w-4" />Pro
              </Button>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Shakisha..."
                className="pl-10 w-48 lg:w-64 bg-input border-border focus:border-primary"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                maxLength={100}
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
                  <DialogDescription>Get in touch with us for assistance</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">WhatsApp</h4>
                    <a href="https://wa.me/0791114163" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg transition-colors">
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
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Follow Us</h4>
                    <a href="https://whatsapp.com/channel/0029VbBuQXg0AgW6YX49VZ3I" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg transition-colors">
                      <MessageCircle className="h-5 w-5 text-green-500" />
                      <span className="text-foreground text-sm">Follow the Rwaflix channel on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Shakisha..." className="pl-10 w-full bg-input border-border focus:border-primary" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} maxLength={100} />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-in slide-in-from-top-2 fade-in-0 duration-300">
            <nav className="flex flex-col space-y-1">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">Home</Button>
              </Link>
              <Link to="/movies" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">Movies</Button>
              </Link>
              <Link to="/tv-shows" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">Series</Button>
              </Link>

              {/* Mobile Genre Section */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Film className="h-3 w-3" /> Genre
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {genres.map((genre) => (
                    <Link key={genre} to={`/genre/${encodeURIComponent(genre)}`} onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="inline-block px-2.5 py-1 text-xs bg-card border border-border rounded-full text-foreground hover:bg-primary/20 hover:border-primary/30 transition-colors">
                        {genre}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Abasobanuzi Section */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Mic className="h-3 w-3" /> Abasobanuzi
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {dubbers.map((dubber) => (
                    <Link key={dubber} to={`/dubber/${encodeURIComponent(dubber)}`} onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-card border border-border rounded-full text-foreground hover:bg-primary/20 hover:border-primary/30 transition-colors">
                        <Mic className="h-2.5 w-2.5 text-primary" />
                        {dubber}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/popular" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">Popular</Button>
              </Link>
              <Link to="/pro-movies" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-amber-500 hover:text-amber-400 gap-2">
                  <Crown className="h-4 w-4" />Pro Movies
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default StreamingHeader;
