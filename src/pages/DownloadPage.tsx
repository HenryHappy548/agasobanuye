import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Download, ArrowLeft, ExternalLink, Loader2, CheckCircle } from "lucide-react";
import { MonetagAdsBootstrap } from "@/components/MonetagAds";
import { Helmet } from "react-helmet-async";

const AD_URL = "https://omg10.com/4/10527776";
const COUNTDOWN_SECONDS = 8;

const DownloadPage = () => {
  const [searchParams] = useSearchParams();
  const downloadUrl = searchParams.get("url") || "";
  const quality = searchParams.get("quality") || "HD";
  const title = searchParams.get("title") || "File";
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [adOpened, setAdOpened] = useState(false);
  const [ready, setReady] = useState(false);

  // Open ad tab on mount
  useEffect(() => {
    if (!adOpened) {
      try {
        window.open(AD_URL, "_blank");
      } catch {
        // fallback: some browsers block window.open without user gesture
      }
      setAdOpened(true);
    }
  }, [adOpened]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setReady(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <>
      <Helmet>
        <title>Download - Rwaflix</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <MonetagAdsBootstrap delayMs={2000} />

      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Download className="h-12 w-12 text-primary mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Kurura / Download</h1>
            <p className="text-muted-foreground text-sm">
              {title} — {quality}
            </p>
          </div>

          {/* Ad notice */}
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-center space-y-2">
            <ExternalLink className="h-5 w-5 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">
              Sponsored tab igufasha gushyigikira Rwaflix yafunguwe.
            </p>
          </div>

          {/* Countdown / Download */}
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 text-center space-y-4">
            {!ready ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <p className="text-foreground font-medium">
                  Gutegura download... {countdown}s
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${((COUNTDOWN_SECONDS - countdown) / COUNTDOWN_SECONDS) * 100}%`,
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <CheckCircle className="h-8 w-8 text-primary mx-auto" />
                <p className="text-foreground font-medium">Download itegure!</p>
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-colors text-lg w-full"
                >
                  <Download className="h-5 w-5" />
                  Kurura {quality}
                </a>
              </>
            )}
          </div>

          {/* Back link */}
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Subira inyuma
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadPage;
