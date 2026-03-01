import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Lock, MessageCircle, Download, Eye, EyeOff, Shield, Crown, CheckCircle, X, Subtitles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import StreamingHeader from "@/components/StreamingHeader";
import Footer from "@/components/Footer";
import DOMPurify from "dompurify";

interface PremiumMovie {
  movie_id: string;
  title: string;
  description: string | null;
  poster_url: string | null;
  video_url: string | null;
  download_url: string | null;
  year: string | null;
  genre: string | null;
}

const normalizeUrl = (url: string): string => {
  if (!url) return url;
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
};

const ProMovies = () => {
  const [accessCode, setAccessCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [movies, setMovies] = useState<PremiumMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<PremiumMovie | null>(null);
  const { toast } = useToast();

  const sanitizeInput = useCallback((value: string): string => {
    const sanitized = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
    return sanitized.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 20);
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(sanitizeInput(e.target.value.toUpperCase()));
  };

  const validateCode = async () => {
    if (!accessCode.trim()) {
      toast({ title: "Andika kode yawe", description: "Shyiramo kode yawe hanyuma ukande 'Emeza'.", variant: "destructive" });
      return;
    }
    setIsValidating(true);
    try {
      const { data, error } = await supabase.rpc('validate_premium_code', { access_code: accessCode.trim() });
      if (error || !data || data.length === 0) {
        toast({ title: "Kode ntibaho", description: "Kode washyizemo ntibaho cyangwa ntikiri gukora.", variant: "destructive" });
        setIsValidated(false);
        setMovies([]);
        return;
      }
      setMovies(data as PremiumMovie[]);
      setIsValidated(true);
      toast({ title: "Byagenze neza! ✨", description: `Urabona filime ${data.length} ziri kuri kode yawe.` });
    } catch {
      toast({ title: "Habaye ikibazo", description: "Gerageza nanone nyuma y'akanya.", variant: "destructive" });
    } finally {
      setIsValidating(false);
    }
  };

  const handleLogout = () => {
    setAccessCode("");
    setIsValidated(false);
    setMovies([]);
    setSelectedMovie(null);
    toast({ title: "Wasohotse", description: "Urakoze gukoresha Rwaflix Pro!" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pro Movies - Rwaflix | Filime Zitarasobanuwe</title>
        <meta name="description" content="Reba filime zitarasobanuwe kuri Rwaflix Pro. Ishyura ubone kode yawe bwite yo gukurura filime." />
        <link rel="canonical" href="https://rwaflix.store/pro-movies" />
      </Helmet>

      <StreamingHeader searchQuery="" onSearch={() => {}} onPlayVideo={() => {}} />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full mb-4">
            <Crown className="h-5 w-5 text-amber-500" />
            <span className="text-amber-500 font-semibold">Rwaflix Pro</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Filime Zitarasobanuwe</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Reba filime z'icyongereza zitarasobanuwe mu kinyarwanda. Buri mukiriya abona kode ye bwite.
          </p>
        </div>

        {!isValidated ? (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card className="border-primary/20 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  Uko Ubikoramo
                </CardTitle>
                <CardDescription>Uburyo bwo kubona filime zitarasobanuwe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Twandikire kuri WhatsApp", desc: <>Twandikire kuri <strong>+250 791 114 163</strong> utubwire filime ushaka.</> },
                    { step: "2", title: "Ishyura", desc: "Dukubwire igiciro, wishyure hanyuma tuguhe kode yawe." },
                    { step: "3", title: "Bona Kode Yawe", desc: <>Tuguha kode yawe bwite (urugero: <code className="bg-muted px-1 rounded">RWAFLIX-ABC12345</code>) ihoraho.</> },
                    { step: "4", title: "Kurura Filime Zawe", desc: "Shyira kode yawe hano ukurure filime zawe igihe icyo ari cyo cyose." },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">{step}</div>
                      <div>
                        <h4 className="font-semibold text-foreground">{title}</h4>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-400 flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <strong>Kwishyura bikorwa nyuma yo kuganira na Rwaflix Store kuri WhatsApp.</strong>
                  </p>
                </div>
                <a href="https://wa.me/250791114163?text=Muraho!%20Ndashaka%20kugura%20filime%20itarasobanuwe%20kuri%20Rwaflix%20Pro." target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  Twandikire kuri WhatsApp
                </a>
              </CardContent>
            </Card>

            <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-yellow-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lock className="h-5 w-5 text-amber-500" />
                  Shyiramo Kode Yawe
                </CardTitle>
                <CardDescription>Ufite kode? Yishyire hano ukurure filime zawe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accessCode">Kode y'Ubujyanama</Label>
                  <div className="relative">
                    <Input id="accessCode" type={showCode ? "text" : "password"} value={accessCode} onChange={handleCodeChange}
                      placeholder="RWAFLIX-XXXXXXXX" className="pr-10 font-mono tracking-wider" maxLength={20} />
                    <button type="button" onClick={() => setShowCode(!showCode)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button onClick={validateCode} className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500" disabled={isValidating}>
                  {isValidating ? "Tugenzura..." : "Emeza Kode"}
                </Button>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Kode yawe irinzwe kandi ni iyawe wenyine</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Validated Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-semibold text-foreground">Kode yawe yemejwe!</p>
                  <p className="text-sm text-muted-foreground">Ufite filime {movies.length} ku kode yawe</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm">Sohoka</Button>
            </div>

            {/* Download Modal */}
            {selectedMovie && (
              <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setSelectedMovie(null)}>
                <Card className="w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setSelectedMovie(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                  </button>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg pr-6">{selectedMovie.title}</CardTitle>
                    {selectedMovie.year && <CardDescription>{selectedMovie.year}{selectedMovie.genre ? ` • ${selectedMovie.genre}` : ''}</CardDescription>}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedMovie.video_url && (
                      <a href={normalizeUrl(selectedMovie.video_url)} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium">
                        <Download className="h-5 w-5" />
                        Kurura Video
                      </a>
                    )}
                    {selectedMovie.download_url && (
                      <a href={normalizeUrl(selectedMovie.download_url)} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors font-medium">
                        <Subtitles className="h-5 w-5" />
                        Kurura Subtitles
                      </a>
                    )}
                    {!selectedMovie.video_url && !selectedMovie.download_url && (
                      <p className="text-center text-muted-foreground py-4">Nta download links zihari kuri iyi filime.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Movies Grid — poster + title only */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {movies.map((movie) => (
                <button key={movie.movie_id} onClick={() => setSelectedMovie(movie)}
                  className="text-left group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg overflow-hidden">
                  <div className="aspect-[2/3] bg-muted rounded-lg overflow-hidden relative">
                    {movie.poster_url ? (
                      <img src={movie.poster_url} alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Crown className="h-10 w-10" />
                      </div>
                    )}
                    <div className="absolute top-1.5 right-1.5">
                      <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded">PRO</span>
                    </div>
                  </div>
                  <p className="font-medium text-xs mt-1.5 line-clamp-2 text-foreground group-hover:text-primary transition-colors">{movie.title}</p>
                </button>
              ))}
            </div>

            {movies.length === 0 && (
              <div className="text-center py-12">
                <Crown className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nta filime ziri kuri kode yawe.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer showComments={false} />
    </div>
  );
};

export default ProMovies;
