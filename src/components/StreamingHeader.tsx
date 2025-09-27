import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoRwaflix from "@/assets/logo-rwaflix.png";

interface StreamingHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const StreamingHeader = ({ onSearch, searchQuery }: StreamingHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logoRwaflix} alt="Rwaflix Logo" className="h-8 w-8" />
              <h1 className="text-2xl font-bold text-primary">Rwaflix</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
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
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search movies and shows..."
                className="pl-10 w-64 bg-input border-border focus:border-primary"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StreamingHeader;