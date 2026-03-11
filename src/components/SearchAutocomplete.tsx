import { memo, useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { buildWatchPath } from "@/lib/watchRoute";
import DOMPurify from "dompurify";

interface Movie {
  id: string;
  title: string;
  poster: string;
  year: string;
  genre: string;
}

interface SearchAutocompleteProps {
  movies: Movie[];
  searchQuery: string;
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchAutocomplete = memo(({ movies, searchQuery, onSearch, className = "", placeholder = "Shakisha..." }: SearchAutocompleteProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase().trim();
    return movies
      .filter((m) => m.title.toLowerCase().includes(q))
      .slice(0, 6);
  }, [movies, searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (value: string) => {
    const sanitized = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
    const cleaned = sanitized.replace(/^\s+/, "").replace(/\s{2,}/g, " ").slice(0, 100);
    onSearch(cleaned);
  };

  const showDropdown = isFocused && suggestions.length > 0;

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
      <Input
        placeholder={placeholder}
        className="pl-10 bg-input border-border focus:border-primary"
        value={searchQuery}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        maxLength={100}
      />
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-xl z-[70] overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-150">
          {suggestions.map((movie) => (
            <Link
              key={movie.id}
              to={buildWatchPath(movie.title, movie.id)}
              onClick={() => {
                setIsFocused(false);
                onSearch("");
              }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-accent transition-colors"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-8 h-12 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{movie.title}</p>
                <p className="text-xs text-muted-foreground">{movie.year} • {movie.genre}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
});

SearchAutocomplete.displayName = "SearchAutocomplete";

export default SearchAutocomplete;
