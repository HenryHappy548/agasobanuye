import { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Film } from "lucide-react";
import StreamingHeader from "@/components/StreamingHeader";
import HeroSection from "@/components/HeroSection";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { ContactAdminButton } from "@/components/ContactAdminButton";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/hooks/useMovies";
import { isValidVideoId, sanitizeTextInput } from "@/lib/security";
import { MonetagAdsBootstrap } from "@/components/MonetagAds";
import SupportButton from "@/components/SupportButton";
import { usePageVisitTracker } from "@/hooks/usePageVisitTracker";
import { buildWatchPath } from "@/lib/watchRoute";
import { groupSeriesMovies, getSeriesBaseName, getSeriesKey } from "@/lib/seriesUtils";
import SeriesCard from "@/components/SeriesCard";
import ContinueWatching from "@/components/ContinueWatching";
import { useContinueWatching } from "@/hooks/useContinueWatching";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { movies, loading } = useMovies();
  const navigate = useNavigate();
  usePageVisitTracker();
  const { continueWatchingItems, removeMovie } = useContinueWatching();

  // Filter states
  const [genreFilter, setGenreFilter] = useState<string>("");
  const [dubberFilter, setDubberFilter] = useState<string>("");

  // Extract unique genres and dubbers for filters
  const { genres, dubbers } = useMemo(() => {
    const genreSet = new Set<string>();
    const dubberSet = new Set<string>();
    
    movies.forEach(movie => {
      if (movie.genre) genreSet.add(movie.genre);
      if (movie.rating) {
        // Extract dubber name (e.g., "Rocky", "Sankara")
        const dubber = movie.rating.trim();
        if (dubber) dubberSet.add(dubber);
      }
    });
    
    return {
      genres: Array.from(genreSet).sort(),
      dubbers: Array.from(dubberSet).sort()
    };
  }, [movies]);

  // Improved search - ONLY match if query appears in title, OR exact genre/dubber match
  const filteredMovies = useMemo(() => {
    let result = movies;
    
    // Apply genre filter
    if (genreFilter) {
      result = result.filter(movie => movie.genre === genreFilter);
    }
    
    // Apply dubber filter
    if (dubberFilter) {
      result = result.filter(movie => movie.rating === dubberFilter);
    }
    
    // Apply search query - STRICT title matching only
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      
      result = result
        .map(movie => {
          let score = 0;
          const title = movie.title.toLowerCase();
          
          // ONLY score based on title match - not genre/year/dubber
          if (title === query) score = 100;
          else if (title.startsWith(query)) score = 50;
          else if (title.includes(query)) score = 30;
          else {
            // Check if ALL search words appear in title
            const words = query.split(/\s+/).filter(w => w.length > 1);
            const allWordsMatch = words.every(word => title.includes(word));
            if (allWordsMatch && words.length > 0) score = 20;
          }
          
          return { movie, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.movie);
    }
    
    return result;
  }, [movies, searchQuery, genreFilter, dubberFilter]);

  // Check if any filter is active
  const isFiltering = searchQuery || genreFilter || dubberFilter;

  const handlePlayVideo = useCallback((videoId: string) => {
    if (isValidVideoId(videoId)) {
      setSelectedVideoId(videoId);
      setIsPlayerOpen(true);
    } else {
      console.error("Invalid video ID");
    }
  }, []);

  const handleClosePlayer = useCallback(() => {
    setIsPlayerOpen(false);
    setSelectedVideoId(null);
  }, []);

  const handleSearch = useCallback((query: string) => {
    const sanitized = sanitizeTextInput(query, 100);
    setSearchQuery(sanitized);
  }, []);

  // Deduplicate series: keep only the first (latest) episode per series
  const deduplicateSeries = (movieList: typeof movies) => {
    const seen = new Set<string>();
    return movieList.filter(movie => {
      const base = getSeriesBaseName(movie.title).toLowerCase();
      if (seen.has(base)) return false;
      seen.add(base);
      return true;
    });
  };

  const { trendingMovies, moviesOnly, tvShows, featuredItems, recentlyAdded } = useMemo(() => ({
    trendingMovies: movies.filter(movie => movie.category === 'trending').slice(0, 10),
    moviesOnly: movies.filter(movie => movie.category === 'movie').slice(0, 10),
    tvShows: movies.filter(movie => movie.category === 'tv').slice(0, 10),
    featuredItems: (() => {
      // Find base names of any series episode marked as featured
      const featuredSeriesBases = new Set<string>();
      const explicitlyFeatured = movies.filter(m => m.show_in_featured);
      explicitlyFeatured.forEach(m => {
        const base = getSeriesBaseName(m.title).toLowerCase();
        if (base !== m.title.toLowerCase()) featuredSeriesBases.add(base);
      });
      // Include ALL episodes of featured series + standalone featured movies
      const featuredPool = movies.filter(m => {
        if (m.show_in_featured) return true;
        const base = getSeriesBaseName(m.title).toLowerCase();
        return featuredSeriesBases.has(base);
      });
      const grouped = groupSeriesMovies(featuredPool).slice(0, 20);
      // Fallback: if no movies are marked as featured, show recent movies
      if (grouped.length === 0) {
        return groupSeriesMovies(movies).slice(0, 20);
      }
      return grouped;
    })(),
    recentlyAdded: deduplicateSeries(movies.filter(m => m.show_in_recent !== false)).slice(0, 5),
  }), [movies]);

  // Mobile: 3 columns, Tablet: 4, Desktop: 5-6
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      {[...Array(6)].map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO H1 - visually hidden but accessible for crawlers - includes competitor keywords */}
      <h1 className="sr-only">Reba Agasobanuye | Rwaflix - Movie Nyarwanda, Oshakur, Cinebeta, Gaheza Films</h1>
      
      <StreamingHeader onSearch={handleSearch} searchQuery={searchQuery} onPlayVideo={handlePlayVideo} />
      
      {!isFiltering && (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Hero Section - Takes 3 columns */}
            <div className="lg:col-span-3">
              <HeroSection onPlayVideo={handlePlayVideo} />
            </div>
            
            {/* Recently Added Section - Netflix Style Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm rounded-xl border border-border/50 p-4 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  <h2 className="text-lg font-bold text-foreground">
                    Nshya Zashyizweho
                  </h2>
                  <span className="ml-auto px-2 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded-full animate-pulse">
                    NEW
                  </span>
                </div>
                <div className="space-y-3">
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <div key={i} className="flex gap-3 p-2">
                        <Skeleton className="w-16 h-24 rounded-md flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      </div>
                    ))
                  ) : (
                    recentlyAdded.map((movie, index) => (
                      <Link
                        key={movie.id}
                        to={buildWatchPath(movie.title, movie.id)}
                        className="flex gap-3 p-2 rounded-lg bg-background/30 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all duration-300 group"
                      >
                        {/* Rank Number */}
                        <div className="flex-shrink-0 w-6 flex items-center justify-center">
                          <span className="text-2xl font-black text-primary/60 group-hover:text-primary transition-colors">
                            {index + 1}
                          </span>
                        </div>
                        
                        {/* Poster */}
                        <div className="relative flex-shrink-0 w-14 h-20 rounded-md overflow-hidden">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                              <div className="w-6 h-6 rounded-full bg-primary/90 flex items-center justify-center">
                                <svg className="w-3 h-3 text-primary-foreground ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                          {/* New Badge */}
                          <div className="absolute top-0 right-0 bg-primary text-[8px] font-bold text-primary-foreground px-1 rounded-bl">
                            NEW
                          </div>
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h3 className="font-bold text-xs text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {movie.title}
                          </h3>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span className="text-primary">{movie.genre}</span>
                          </div>
                          {movie.rating && (
                            <p className="text-[9px] text-muted-foreground font-bold mt-0.5 truncate">
                              🎙 {movie.rating}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Continue Watching Section - between recently added and featured */}
          <ContinueWatching items={continueWatchingItems} onRemove={removeMovie} />
          
          {/* Featured Movies Carousel */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Featured Movies
                </h2>
                <span className="hidden sm:inline-flex px-3 py-1 bg-gradient-to-r from-primary/20 to-primary/5 text-primary text-sm font-medium rounded-full border border-primary/20">
                  ⭐ Top Picks
                </span>
              </div>
            </div>
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-1.5 sm:-ml-2 md:-ml-3">
                  {featuredItems.map((item, index) => (
                    <CarouselItem key={item.type === 'series' ? item.group.baseName : item.movie.id} className="pl-1.5 sm:pl-2 md:pl-3 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                      {item.type === 'series' ? (
                        <SeriesCard group={item.group} />
                      ) : (
                        <MovieCard movie={item.movie} onPlay={handlePlayVideo} />
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            )}
            
          </section>

        </div>
      )}
      
      <main className="container mx-auto px-4 py-6 sm:py-8 space-y-8 sm:space-y-12">
        {/* Monetag Vignette Ads */}
        <MonetagAdsBootstrap />
        {isFiltering ? (
          <section>
            <div className="flex flex-col gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                {searchQuery ? `Ibyavuye muri "${searchQuery}"` : "Filime Zatoranijwe"}
              </h2>
              
              {/* Filter Controls */}
              <div className="flex flex-wrap gap-2">
                {/* Genre Filter */}
                <select
                  value={genreFilter}
                  onChange={(e) => setGenreFilter(e.target.value)}
                  className="px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Genre zose</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                
                {/* Dubber/Translator Filter */}
                <select
                  value={dubberFilter}
                  onChange={(e) => setDubberFilter(e.target.value)}
                  className="px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Abasobanuzi bose</option>
                  {dubbers.map(dubber => (
                    <option key={dubber} value={dubber}>{dubber}</option>
                  ))}
                </select>
                
                {/* Clear Filters */}
                {(genreFilter || dubberFilter) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setGenreFilter("");
                      setDubberFilter("");
                    }}
                    className="text-sm"
                  >
                    Siba Filters
                  </Button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onPlay={handlePlayVideo}
                />
              ))}
            </div>
            {filteredMovies.length === 0 && (
              <p className="text-muted-foreground text-center py-8 sm:py-12">
                Nta filime zibonetse. Gerageza ubundi.
              </p>
            )}
          </section>
        ) : (
          <>
            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Top 10 Ubu
                  </h2>
                  <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold rounded-md shadow-lg">
                    🔥 TRENDING
                  </span>
                </div>
                <Link to="/popular">
                  <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg">
                    View More
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                <CarouselContent className="-ml-1.5 sm:-ml-2 md:-ml-3">
                    {trendingMovies.map((movie) => (
                      <CarouselItem key={movie.id} className="pl-1.5 sm:pl-2 md:pl-3 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                        <MovieCard
                          movie={movie}
                          onPlay={handlePlayVideo}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              )}
              
            </section>

            {/* Support Button */}
            <div className="flex justify-center">
              <SupportButton />
            </div>

            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Popular Movies
                </h2>
                <Link to="/movies">
                  <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg">
                    View More
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                <CarouselContent className="-ml-1.5 sm:-ml-2 md:-ml-3">
                    {moviesOnly.map((movie) => (
                      <CarouselItem key={movie.id} className="pl-1.5 sm:pl-2 md:pl-3 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                        <MovieCard
                          movie={movie}
                          onPlay={handlePlayVideo}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              )}
              
            </section>

            

            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Series
                </h2>
                <Link to="/tv-shows">
                  <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg">
                    View More
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                <CarouselContent className="-ml-1.5 sm:-ml-2 md:-ml-3">
                    {tvShows.map((movie) => (
                      <CarouselItem key={movie.id} className="pl-1.5 sm:pl-2 md:pl-3 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                        <MovieCard
                          movie={movie}
                          onPlay={handlePlayVideo}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              )}
              
             </section>

             {/* Genre Rows below Series */}
             {["Action", "Horror", "Drama", "Animation"].map((genre) => {
               const genreMovies = movies.filter(m => m.genre.toLowerCase() === genre.toLowerCase()).slice(0, 10);
               if (genreMovies.length === 0) return null;
               return (
                 <section key={genre} className="mt-6">
                   <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                       <Film className="h-5 w-5 text-primary" />
                       <h2 className="text-xl sm:text-2xl font-bold text-foreground">{genre}</h2>
                     </div>
                     <Link to={`/genre/${encodeURIComponent(genre)}`}>
                       <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary/80">
                         View All <ArrowRight className="h-4 w-4" />
                       </Button>
                     </Link>
                   </div>
                   <Carousel opts={{ align: "start", loop: true }} className="w-full">
                     <CarouselContent className="-ml-1.5 sm:-ml-2 md:-ml-3">
                       {genreMovies.map((movie) => (
                         <CarouselItem key={movie.id} className="pl-1.5 sm:pl-2 md:pl-3 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                           <MovieCard movie={movie} onPlay={handlePlayVideo} />
                         </CarouselItem>
                       ))}
                     </CarouselContent>
                     <CarouselPrevious className="left-2" />
                     <CarouselNext className="right-2" />
                   </Carousel>
                 </section>
               );
             })}

           </>
        )}
      </main>

      <VideoPlayer
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        videoId={selectedVideoId}
      />
      
      <ContactAdminButton />
      
      <Footer showComments={false} />
    </div>
  );
};

export default Index;
