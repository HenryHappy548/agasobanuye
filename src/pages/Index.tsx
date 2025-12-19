import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StreamingHeader from "@/components/StreamingHeader";
import HeroSection from "@/components/HeroSection";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { ContactAdminButton } from "@/components/ContactAdminButton";
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
          {/* Hero Section */}
          <HeroSection onPlayVideo={handlePlayVideo} />
          
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
      
      <ContactAdminButton />
      
      <Footer />
    </div>
  );
};

export default Index;
