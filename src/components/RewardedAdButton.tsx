import { useState } from "react";
import { Sparkles, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RewardedAdButtonProps {
  onRewardEarned?: () => void;
  variant?: "inline" | "card";
}

const RewardedAdButton = ({ onRewardEarned, variant = "inline" }: RewardedAdButtonProps) => {
  const [isWatching, setIsWatching] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [adLoaded, setAdLoaded] = useState(false);

  const handleWatchAd = () => {
    setIsWatching(true);
    setCountdown(5);
    setAdLoaded(false);

    // Load Vignette ad
    const script = document.createElement("script");
    script.src = "https://gizokraijaw.net/vignette.min.js";
    script.dataset.zone = "10527712";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setAdLoaded(true);
    };

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            setIsWatching(false);
            onRewardEarned?.();
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClose = () => {
    if (countdown === 0) {
      setIsWatching(false);
    }
  };

  if (variant === "card") {
    return (
      <>
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-full">
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Unlock HD Quality</p>
              <p className="text-xs text-muted-foreground">Watch a short video</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="gap-2 border-amber-500/30 text-amber-600 hover:bg-amber-500/10"
            onClick={handleWatchAd}
          >
            <Play className="h-3 w-3" />
            Watch
          </Button>
        </div>

        <Dialog open={isWatching} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Unlocking HD Quality
              </DialogTitle>
              <DialogDescription>
                {countdown > 0 
                  ? `Please wait ${countdown} seconds...` 
                  : "HD Quality Unlocked! 🎉"}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-8">
              {countdown > 0 ? (
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-amber-500/30 flex items-center justify-center">
                    <span className="text-3xl font-bold text-amber-500">{countdown}</span>
                  </div>
                  <div 
                    className="absolute inset-0 w-20 h-20 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"
                    style={{ animationDuration: '1s' }}
                  />
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-10 w-10 text-green-500" />
                  </div>
                  <p className="text-foreground font-medium">Murakoze! Thank you!</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setIsWatching(false)}
                  >
                    Continue
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        className="gap-1.5 text-amber-600 hover:text-amber-500 hover:bg-amber-500/10 text-xs"
        onClick={handleWatchAd}
      >
        <Sparkles className="h-3 w-3" />
        <span className="hidden sm:inline">Unlock HD</span>
        <span className="sm:hidden">HD</span>
      </Button>

      <Dialog open={isWatching} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Unlocking HD Quality
            </DialogTitle>
            <DialogDescription>
              {countdown > 0 
                ? `Please wait ${countdown} seconds...` 
                : "HD Quality Unlocked! 🎉"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            {countdown > 0 ? (
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-amber-500/30 flex items-center justify-center">
                  <span className="text-3xl font-bold text-amber-500">{countdown}</span>
                </div>
                <div 
                  className="absolute inset-0 w-20 h-20 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"
                  style={{ animationDuration: '1s' }}
                />
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-10 w-10 text-green-500" />
                </div>
                <p className="text-foreground font-medium">Murakoze! Thank you!</p>
                <Button 
                  className="mt-4" 
                  onClick={() => setIsWatching(false)}
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RewardedAdButton;
