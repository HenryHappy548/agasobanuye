import { useState } from 'react';
import { Film, Tv, TrendingUp, Star, Play, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTMDBMovies } from '@/hooks/useTMDBMovies';
import { slugify } from '@/lib/slugify';
import { Link } from 'react-router-dom';

const TMDBBrowser = () => {
  const [activeTab, setActiveTab] = useState<'popular' | 'trending' | 'top_rated' | 'tv_popular'>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { movies, loading, error, page, totalPages, loadMore, searchMovies, refresh } = useTMDBMovies(activeTab);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchMovies(searchQuery);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as typeof activeTab);
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Film className="h-6 w-6 text-primary" />
          TMDB Movies
        </h2>
        
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="popular" className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Popular</span>
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Trending</span>
          </TabsTrigger>
          <TabsTrigger value="top_rated" className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Top Rated</span>
          </TabsTrigger>
          <TabsTrigger value="tv_popular" className="flex items-center gap-1">
            <Tv className="h-4 w-4" />
            <span className="hidden sm:inline">TV Shows</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {loading && movies.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-destructive">
              <p>{error}</p>
              <Button onClick={refresh} variant="outline" className="mt-4">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/watch/${slugify(movie.title)}`}
                    className="block"
                  >
                    <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:scale-105">
                      <CardContent className="p-0">
                        <div className="aspect-[2/3] relative overflow-hidden">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-primary text-primary-foreground rounded-full p-3">
                              <Play className="h-6 w-6" />
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded">
                            {movie.rating}
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm text-foreground line-clamp-1">
                            {movie.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {movie.year}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {page < totalPages && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={loadMore}
                    disabled={loading}
                    variant="outline"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Load More ({page}/{totalPages})
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TMDBBrowser;
