import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LoadingScreen from "@/components/LoadingScreen";
import { MonetagAdsBootstrap } from "@/components/MonetagAds";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Movies = lazy(() => import("./pages/Movies"));
const TVShows = lazy(() => import("./pages/TVShows"));
const Popular = lazy(() => import("./pages/Popular"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Shop = lazy(() => import("./pages/Shop"));
const ProMovies = lazy(() => import("./pages/ProMovies"));

const GenreMovies = lazy(() => import("./pages/GenreMovies"));
const DubberMovies = lazy(() => import("./pages/DubberMovies"));
const SeriesEpisodes = lazy(() => import("./pages/SeriesEpisodes"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteAdsBootstrap = () => {
  const location = useLocation();
  return <MonetagAdsBootstrap key={location.pathname} />;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 2 minutes - fresher data for new content
      gcTime: 10 * 60 * 1000, // 10 minutes cache
      refetchOnWindowFocus: false, // Don't refetch on window focus (saves bandwidth)
      refetchOnReconnect: true, // Refetch when connection restored
      refetchOnMount: 'always', // Always check for fresh data on mount
      retry: 1, // Only retry once (faster failure for slow connections)
      retryDelay: 1000, // 1 second between retries
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteAdsBootstrap />
            {isLoading ? (
              <LoadingScreen onLoadingComplete={handleLoadingComplete} />
            ) : (
              <Suspense fallback={<LoadingScreen onLoadingComplete={() => {}} />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/tv-shows" element={<TVShows />} />
                  <Route path="/popular" element={<Popular />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/watch/:slug/:id" element={<MovieDetail />} />
                  <Route path="/watch/:slug" element={<MovieDetail />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/store" element={<Navigate to="/shop" replace />} />
                  <Route path="/pro-movies" element={<ProMovies />} />
                  <Route path="/genre/:genre" element={<GenreMovies />} />
                  <Route path="/dubber/:name" element={<DubberMovies />} />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
