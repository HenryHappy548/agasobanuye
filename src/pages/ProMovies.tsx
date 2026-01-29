import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Lock, MessageCircle, Play, Download, Eye, EyeOff, Shield, Crown, CheckCircle } from "lucide-react";
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

// Ensure URL has proper protocol prefix
const normalizeUrl = (url: string): string => {
  if (!url) return url;
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

const ProMovies = () => {
  const [accessCode, setAccessCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [movies, setMovies] = useState<PremiumMovie[]>([]);
  const [activeVideo, setActiveVideo] = useState<PremiumMovie | null>(null);
  const { toast } = useToast();

  // Sanitize input to prevent XSS
  const sanitizeInput = useCallback((value: string): string => {
    const sanitized = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
    // Only allow alphanumeric and dash for codes
    return sanitized.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 20);
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value.toUpperCase());
    setAccessCode(sanitized);
  };

  const validateCode = async () => {
    if (!accessCode.trim()) {
      toast({
        title: "Andika kode yawe",
        description: "Shyiramo kode yawe hanyuma ukande 'Emeza'.",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);

    try {
      const { data, error } = await supabase.rpc('validate_premium_code', {
        access_code: accessCode.trim()
      });

      if (error) {
        console.error('Validation error:', error);
        toast({
          title: "Kode ntibaho",
          description: "Kode washyizemo ntibaho cyangwa ntikiri gukora. Gerageza nanone.",
          variant: "destructive"
        });
        setIsValidated(false);
        setMovies([]);
        return;
      }

      if (!data || data.length === 0) {
        toast({
          title: "Kode ntibaho",
          description: "Kode washyizemo ntibaho cyangwa nta filime ziyihuzanywe.",
          variant: "destructive"
        });
        setIsValidated(false);
        setMovies([]);
        return;
      }

      setMovies(data as PremiumMovie[]);
      setIsValidated(true);
      toast({
        title: "Byagenze neza! ✨",
        description: `Urabona filime ${data.length} ziri kuri kode yawe.`
      });

    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Habaye ikibazo",
        description: "Gerageza nanone nyuma y'akanya.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleLogout = () => {
    setAccessCode("");
    setIsValidated(false);
    setMovies([]);
    setActiveVideo(null);
    toast({
      title: "Wasohotse",
      description: "Urakoze gukoresha Rwaflix Pro!"
    });
  };

  const extractEmbedUrl = (embedCode: string): string | null => {
    if (!embedCode) return null;
    
    // If it's already a URL
    if (embedCode.startsWith('http') || embedCode.startsWith('//')) {
      return embedCode.startsWith('//') ? `https:${embedCode}` : embedCode;
    }
    
    // Extract src from iframe
    const srcMatch = embedCode.match(/src=["']([^"']+)["']/i);
    if (srcMatch?.[1]) {
      const src = srcMatch[1];
      return src.startsWith('//') ? `https:${src}` : src;
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pro Movies - Rwaflix | Filime Zitarasobanuwe</title>
        <meta name="description" content="Reba filime zitarasobanuwe kuri Rwaflix Pro. Ishyura ubone kode yawe bwite yo kureba no gukurura filime." />
        <meta name="keywords" content="rwaflix pro, filime zitarasobanuwe, undubbed movies rwanda, premium movies" />
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Filime Zitarasobanuwe
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Reba filime z'icyongereza zitarasobanuwe mu kinyarwanda. Buri mukiriya abona kode ye bwite.
          </p>
        </div>

        {!isValidated ? (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Guide Section */}
            <Card className="border-primary/20 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  Uko Ubikoramo
                </CardTitle>
                <CardDescription>
                  Uburyo bwo kubona filime zitarasobanuwe
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Twandikire kuri WhatsApp</h4>
                      <p className="text-sm text-muted-foreground">
                        Twandikire kuri <strong>+250 791 114 163</strong> utubwire filime ushaka.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Ishyura</h4>
                      <p className="text-sm text-muted-foreground">
                        Dukubwire igiciro, wishyure hanyuma tuguhe kode yawe.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Bona Kode Yawe</h4>
                      <p className="text-sm text-muted-foreground">
                        Tuguha kode yawe bwite (urugero: <code className="bg-muted px-1 rounded">RWAFLIX-ABC12345</code>) ihoraho.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">4</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Reba Filime Zawe</h4>
                      <p className="text-sm text-muted-foreground">
                        Shyira kode yawe hano urebe no gukurura filime zawe igihe icyo ari cyo cyose.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-400 flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Kwishyura bikorwa nyuma yo kuganira na Rwaflix Store kuri WhatsApp.</strong>
                    </span>
                  </p>
                </div>

                <a 
                  href="https://wa.me/250791114163?text=Muraho!%20Ndashaka%20kugura%20filime%20itarasobanuwe%20kuri%20Rwaflix%20Pro."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  Twandikire kuri WhatsApp
                </a>
              </CardContent>
            </Card>

            {/* Access Code Section */}
            <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-yellow-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lock className="h-5 w-5 text-amber-500" />
                  Shyiramo Kode Yawe
                </CardTitle>
                <CardDescription>
                  Ufite kode? Yishyire hano urebe filime zawe
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accessCode">Kode y'Ubujyanama</Label>
                  <div className="relative">
                    <Input
                      id="accessCode"
                      type={showCode ? "text" : "password"}
                      value={accessCode}
                      onChange={handleCodeChange}
                      placeholder="RWAFLIX-XXXXXXXX"
                      className="pr-10 font-mono tracking-wider"
                      maxLength={20}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCode(!showCode)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={validateCode} 
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500"
                  disabled={isValidating}
                >
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
              <Button variant="outline" onClick={handleLogout} size="sm">
                Sohoka
              </Button>
            </div>

            {/* Active Video Player */}
            {activeVideo && activeVideo.video_url && (
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>{activeVideo.title}</CardTitle>
                  {activeVideo.description && (
                    <CardDescription>{activeVideo.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={extractEmbedUrl(activeVideo.video_url) || ''}
                      className="w-full h-full"
                      allowFullScreen
                      allow="autoplay; fullscreen"
                      title={activeVideo.title}
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    {activeVideo.download_url && (
                      <a
                        href={normalizeUrl(activeVideo.download_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        Kurura Filime
                      </a>
                    )}
                    <Button variant="outline" onClick={() => setActiveVideo(null)}>
                      Funga Player
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Movies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <Card 
                  key={movie.movie_id} 
                  className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all group"
                  onClick={() => setActiveVideo(movie)}
                >
                  <div className="aspect-[2/3] bg-muted relative overflow-hidden">
                    {movie.poster_url ? (
                      <img 
                        src={movie.poster_url} 
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Crown className="h-12 w-12" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded">
                        PRO
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2">{movie.title}</h3>
                    {movie.year && (
                      <p className="text-xs text-muted-foreground mt-1">{movie.year}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {movies.length === 0 && (
              <div className="text-center py-12">
                <Crown className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nta filime ziri kuri kode yawe. Twandikire kuri WhatsApp ugurane.</p>
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
