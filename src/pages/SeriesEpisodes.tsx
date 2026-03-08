import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Play, ExternalLink } from "lucide-react";
import StreamingHeader from "@/components/StreamingHeader";
import Footer from "@/components/Footer";
import { useMovies } from "@/hooks/useMovies";
import { getSeriesBaseName } from "@/lib/seriesUtils";
import { buildWatchPath } from "@/lib/watchRoute";
import OptimizedImage from "@/components/OptimizedImage";
import { Skeleton } from "@/components/ui/skeleton";

const SeriesEpisodes = () => {
  const { name } = useParams<{ name: string }>();
  const { movies, loading } = useMovies();

  const decodedName = decodeURIComponent(name || "");

  const episodes = useMemo(() => {
    return movies
      .filter((m) => {
        const base = getSeriesBaseName(m.title).toLowerCase();
        return base === decodedName.toLowerCase();
      })
      .sort((a, b) => {
        // Sort by episode number
        const aMatch = a.title.match(/E(\d+)/i) || a.title.match(/Episode\s*(\d+)/i) || a.title.match(/Part\s*(\d+)/i) || a.title.match(/EP?\s*(\d+)/i);
        const bMatch = b.title.match(/E(\d+)/i) || b.title.match(/Episode\s*(\d+)/i) || b.title.match(/Part\s*(\d+)/i) || b.title.match(/EP?\s*(\d+)/i);
        const aNum = aMatch ? parseInt(aMatch[1]) : 0;
        const bNum = bMatch ? parseInt(bMatch[1]) : 0;
        return aNum - bNum;
      });
  }, [movies, decodedName]);

  const seriesPoster = episodes[0]?.poster || "";
  const dubberName = episodes[0]?.rating || "";
  const dubberSuffix = dubberName ? ` by ${dubberName}` : "";
  const seoTitle = `Agasobanuye ${decodedName}${dubberSuffix} | Rwaflix Store`;
  const seoDesc = `Reba ${decodedName} episodes zose agasobanuye${dubberSuffix} ku buntu kuri Rwaflix Store. ${episodes[0]?.genre || ''} series HD quality.`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={`https://rwaflix.store/series/${encodeURIComponent(decodedName)}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:image" content={seriesPoster} />
      </Helmet>
      <StreamingHeader onSearch={() => {}} searchQuery="" onPlayVideo={() => {}} />

      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Home</span>
        </Link>

        {/* Series Header */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {seriesPoster && (
            <div className="w-32 sm:w-40 flex-shrink-0">
              <div className="aspect-[2/3] rounded-lg overflow-hidden border border-border">
                <OptimizedImage src={seriesPoster} alt={decodedName} width={160} height={240} className="w-full h-full" />
              </div>
            </div>
          )}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">{decodedName}</h1>
            <p className="text-muted-foreground mt-2">
              {episodes.length} Episode{episodes.length !== 1 ? "s" : ""} available
            </p>
            {episodes[0]?.genre && (
              <span className="mt-2 inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full w-fit">
                {episodes[0].genre}
              </span>
            )}
          </div>
        </div>

        {/* Episodes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        ) : episodes.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No episodes found for "{decodedName}"</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {episodes.map((episode, index) => (
              <a
                key={episode.id}
                href={buildWatchPath(episode.title, episode.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
              >
                {/* Episode Thumbnail */}
                <div className="relative w-16 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <OptimizedImage src={episode.poster} alt={episode.title} width={64} height={96} className="w-full h-full" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-5 w-5 text-white fill-white" />
                  </div>
                </div>

                {/* Episode Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {episode.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <span>{episode.year}</span>
                    {episode.rating && (
                      <>
                        <span className="text-border">•</span>
                        <span className="font-bold">🎙 {episode.rating}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Open in new tab icon */}
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        )}
      </main>

      <Footer showComments={false} />
    </div>
  );
};

export default SeriesEpisodes;
