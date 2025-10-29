import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StreamingHeader from "@/components/StreamingHeader";
import HeroSection from "@/components/HeroSection";
import MovieCard from "@/components/MovieCard";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { mockMovies } from "@/data/mockData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const filteredMovies = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedVideoId(null);
  };

  const trendingMovies = mockMovies.filter(movie => movie.category === 'trending').slice(0, 5);
  const movies = mockMovies.filter(movie => movie.category === 'movie').slice(0, 5);
  const tvShows = mockMovies.filter(movie => movie.category === 'tv').slice(0, 5);
  const featuredMovies = mockMovies.slice(0, 20);
  const recentlyAdded = mockMovies.slice(0, 15);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StreamingHeader onSearch={setSearchQuery} searchQuery={searchQuery} onPlayVideo={handlePlayVideo} />
      
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
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                    axis: "y",
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-mt-2 h-[500px]">
                    {recentlyAdded.slice(0, 3).map((movie) => (
                      <CarouselItem key={movie.id} className="pt-2">
                        <div className="relative group cursor-pointer overflow-hidden rounded-lg border border-border hover:border-primary transition-all duration-300">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button
                              size="lg"
                              onClick={() => handlePlayVideo(movie.id)}
                              className="gap-2"
                            >
                              <ArrowRight className="h-5 w-5" />
                              Watch Now
                            </Button>
                          </div>
                          <div className="p-3 bg-card">
                            <h3 className="font-semibold text-sm line-clamp-1 text-foreground">{movie.title}</h3>
                            <p className="text-xs text-muted-foreground">{movie.year}</p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="top-2 left-1/2 -translate-x-1/2 rotate-90" />
                  <CarouselNext className="bottom-2 left-1/2 -translate-x-1/2 rotate-90" />
                </Carousel>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {trendingMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  TV Shows
                </h2>
                <Link to="/tv-shows">
                  <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg">
                    View More
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {tvShows.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <VideoPlayer
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        videoId={selectedVideoId}
      />
      
      <Footer />
    </div>
  );
};

export default Index;