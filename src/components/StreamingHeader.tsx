import { Search, Menu, X, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import SimpleLogo from "@/components/SimpleLogo";
import DOMPurify from "dompurify";
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
  onPlayVideo: (videoId: string) => void;
}

const StreamingHeader = ({ onSearch, searchQuery, onPlayVideo }: StreamingHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Sanitize and validate search input
  const handleSearchChange = useCallback((value: string) => {
    // Sanitize HTML to prevent XSS attacks
    const sanitized = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
    // Limit length to prevent abuse
    const truncated = sanitized.slice(0, 100);
    onSearch(truncated);
  }, [onSearch]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <SimpleLogo />

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
                Series
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
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Follow Us</h4>
                    <a 
                      href="https://whatsapp.com/channel/0029VbBuQXg0AgW6YX49VZ3I" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 text-green-500" />
                      <span className="text-foreground text-sm">Follow the Rwaflix channel on WhatsApp</span>
                    </a>
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
                onChange={(e) => handleSearchChange(e.target.value)}
                maxLength={100}
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
                  Series
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
      </div>
    </header>
  );
};

export default StreamingHeader;
