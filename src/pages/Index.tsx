import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StreamingHeader from "@/components/StreamingHeader";
import HeroSection from "@/components/HeroSection";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { SeriesPollButton } from "@/components/SeriesPollButton";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/hooks/useMovies";
import { isValidVideoId, sanitizeTextInput } from "@/lib/security";
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

  const trendingMovies = movies.filter(movie => movie.category === 'trending').slice(0, 10);
  const moviesOnly = movies.filter(movie => movie.category === 'movie').slice(0, 10);
  const tvShows = movies.filter(movie => movie.category === 'tv').slice(0, 10);
  const featuredMovies = movies.slice(0, 20);
  const recentlyAdded = movies.slice(0, 3);

  const LoadingSkeleton = () => (
    <div className="flex gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-32 sm:w-40">
          <Skeleton className="aspect-[2/3] rounded-lg" />
          <Skeleton className="h-4 mt-2 w-3/4" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StreamingHeader onSearch={handleSearch} searchQuery={searchQuery} onPlayVideo={handlePlayVideo} />
      
      {!searchQuery && (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hero Section */}
            <div className="lg:col-span-2">
              <HeroSection onPlayVideo={handlePlayVideo} />
            </div>
            
            {/* Recently Added Section */}
            <div className="lg:col-span-1">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border p-4 h-full">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  Recently Added
                </h2>
                <div className="space-y-3">
                  {loading ? (
                    [...Array(3)].map((_, i) => (
                      <div key={i} className="flex gap-3 p-2">
                        <Skeleton className="w-24 h-32 rounded-md" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))
                  ) : (
                    recentlyAdded.map((movie) => (
                      <div
                        key={movie.id}
                        onClick={() => handlePlayVideo(movie.id)}
                        className="flex gap-3 p-2 rounded-lg border border-border bg-card hover:border-primary hover:bg-accent/50 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="relative flex-shrink-0 w-24 h-32 rounded-md overflow-hidden">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                              <svg className="w-4 h-4 text-primary-foreground ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1">
                            {movie.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                              {movie.rating}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {movie.genre}
                          </span>
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
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Featured Movies
              </h2>
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
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Trending Now
                </h2>
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
          </>
        )}
      </main>

      <VideoPlayer
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        videoId={selectedVideoId}
      />
      
      <SeriesPollButton />
      
      <Footer />
    </div>
  );
};

export default Index;
