import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
import { ProductSlider } from "@/components/ProductSlider";
import { MiniProductStrip } from "@/components/MiniProductStrip";

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

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // Memoize filtered movie lists to prevent recalculation on every render
  const { trendingMovies, moviesOnly, tvShows, featuredMovies, recentlyAdded } = useMemo(() => ({
    trendingMovies: movies.filter(movie => movie.category === 'trending').slice(0, 10),
    moviesOnly: movies.filter(movie => movie.category === 'movie').slice(0, 10),
    tvShows: movies.filter(movie => movie.category === 'tv').slice(0, 10),
    featuredMovies: movies.slice(0, 20),
    recentlyAdded: movies.slice(0, 5),
  }), [movies]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
      {[...Array(6)].map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO H1 - visually hidden but accessible for crawlers */}
      <h1 className="sr-only">Rwaflix - Watch Free Movies and TV Shows Online in Rwanda</h1>
      
      <StreamingHeader onSearch={handleSearch} searchQuery={searchQuery} onPlayVideo={handlePlayVideo} />
      
      {!searchQuery && (
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
                      <div
                        key={movie.id}
                        onClick={() => handlePlayVideo(movie.id)}
                        className="flex gap-3 p-2 rounded-lg bg-background/30 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all duration-300 cursor-pointer group"
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
                          <h3 className="font-semibold text-xs text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {movie.title}
                          </h3>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span className="text-primary">{movie.genre}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          
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
                <CarouselContent className="-ml-2 md:-ml-4">
                  {featuredMovies.map((movie) => (
                    <CarouselItem key={movie.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
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

        </div>
      )}
      
      <main className="container mx-auto px-4 py-6 sm:py-8 space-y-8 sm:space-y-12">
        {/* Mini Product Strip */}
        <MiniProductStrip limit={3} />
        {searchQuery ? (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Search Results for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
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
                No results found. Try searching for something else.
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
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {trendingMovies.map((movie) => (
                      <CarouselItem key={movie.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
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

            <ProductSlider limit={20} title="🛍️ Trending Deals" />

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
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {moviesOnly.map((movie) => (
                      <CarouselItem key={movie.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
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

            <ProductSlider limit={20} title="🎬 Movie Deals" />

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
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {tvShows.map((movie) => (
                      <CarouselItem key={movie.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
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

             <ProductSlider limit={20} title="📺 Series Deals" />
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
