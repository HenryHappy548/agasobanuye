import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Send, RefreshCw, Film, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Movie {
  id: string;
  title: string;
  poster_url: string | null;
  video_url: string | null;
  download_url: string | null;
  genre: string;
  year: string;
  category: string;
  description: string | null;
}

const WhatsAppNotificationGenerator = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [siteUrl, setSiteUrl] = useState("https://rwaflix.com");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    fetchRecentMovies();
    fetchSubscriberCount();
  }, []);

  const fetchRecentMovies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("movies")
      .select("id, title, poster_url, video_url, download_url, genre, year, category, description")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      toast.error("Failed to load movies");
    } else {
      setMovies(data || []);
    }
    setLoading(false);
  };

  const fetchSubscriberCount = async () => {
    const { count } = await supabase
      .from("whatsapp_subscribers")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);
    setSubscriberCount(count || 0);
  };

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const generateMessage = (movie: Movie) => {
    setSelectedMovie(movie);
    const slug = slugify(`${movie.title}-${movie.year}`);
    const watchLink = `${siteUrl}/watch/${slug}/${movie.id}`;

    let msg = `🎬 *${movie.title}* (${movie.year})\n\n`;
    msg += `📂 Genre: ${movie.genre}\n`;
    msg += `📁 Category: ${movie.category}\n`;

    if (movie.description) {
      const shortDesc = movie.description.length > 120
        ? movie.description.substring(0, 120) + "..."
        : movie.description;
      msg += `\n📝 ${shortDesc}\n`;
    }

    msg += `\n▶️ *Reba hano:* ${watchLink}\n`;

    if (movie.download_url) {
      msg += `\n⬇️ *Download:* ${watchLink}\n`;
    }

    if (movie.poster_url) {
      msg += `\n🖼️ *Poster:* ${movie.poster_url}\n`;
    }

    msg += `\n━━━━━━━━━━━━━━━━\n`;
    msg += `🍿 *RwaFlix* - Filime nziza mu Kinyarwanda\n`;
    msg += `🌐 ${siteUrl}`;

    setGeneratedMessage(msg);
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    toast.success("Message copied to clipboard!");
  };

  const copyAllNumbers = async () => {
    const { data } = await supabase
      .from("whatsapp_subscribers")
      .select("phone")
      .eq("is_active", true);

    if (data) {
      const numbers = data.map((s) => s.phone).join("\n");
      navigator.clipboard.writeText(numbers);
      toast.success(`${data.length} numbers copied`);
    }
  };

  const openWhatsAppBulk = () => {
    if (!generatedMessage) {
      toast.error("Generate a message first");
      return;
    }
    const encoded = encodeURIComponent(generatedMessage);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex gap-4 text-sm">
        <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
          <Send className="h-3.5 w-3.5" />
          {subscriberCount} active subscribers
        </Badge>
        <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
          <Film className="h-3.5 w-3.5" />
          {movies.length} recent movies
        </Badge>
      </div>

      {/* Movie selector */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Select a movie to generate notification</Label>
        <Select
          onValueChange={(val) => {
            const movie = movies.find((m) => m.id === val);
            if (movie) generateMessage(movie);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={loading ? "Loading movies..." : "Choose a movie..."} />
          </SelectTrigger>
          <SelectContent>
            {movies.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.title} ({m.year}) — {m.genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Site URL override */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Site URL</Label>
        <Input
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
          placeholder="https://rwaflix.com"
        />
      </div>

      {/* Selected movie preview */}
      {selectedMovie && (
        <Card className="border-primary/20">
          <CardContent className="pt-4">
            <div className="flex gap-4">
              {selectedMovie.poster_url && (
                <img
                  src={selectedMovie.poster_url}
                  alt={selectedMovie.title}
                  className="w-20 h-28 object-cover rounded-md"
                />
              )}
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-foreground">{selectedMovie.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedMovie.year} • {selectedMovie.genre}</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedMovie.video_url && (
                    <Badge variant="secondary" className="text-xs">Has Video</Badge>
                  )}
                  {selectedMovie.download_url && (
                    <Badge variant="secondary" className="text-xs">Has Download</Badge>
                  )}
                  {selectedMovie.poster_url && (
                    <Badge variant="secondary" className="text-xs">Has Poster</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated message */}
      {generatedMessage && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Generated WhatsApp Message</Label>
          <Textarea
            value={generatedMessage}
            onChange={(e) => setGeneratedMessage(e.target.value)}
            rows={12}
            className="font-mono text-sm"
          />

          <div className="flex flex-wrap gap-2">
            <Button onClick={copyMessage} variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              Copy Message
            </Button>
            <Button onClick={copyAllNumbers} variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              Copy All Numbers
            </Button>
            <Button onClick={openWhatsAppBulk} className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Open WhatsApp
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                if (selectedMovie) generateMessage(selectedMovie);
              }}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppNotificationGenerator;
