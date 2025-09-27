import { X, Copy, Download, Play, Settings, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const VideoPlayer = ({ isOpen, onClose, videoId }: VideoPlayerProps) => {
  const [copied, setCopied] = useState(false);

  const getVideoInfo = (id: string) => {
    const videos: Record<string, { 
      title: string; 
      streams: {
        url: string;
        quality: string;
        type: 'direct' | 'm3u8' | 'torrent' | 'embed';
        codec?: string;
      }[];
    }> = {
      "featured-movie": {
        title: "Weapons (2025)",
        streams: [
          { url: "https://ok.ru/video/9496103422476", quality: "1080p", type: 'embed' },
          { url: "https://example.com/weapons/1080p.mp4", quality: "1080p", type: 'direct', codec: "H.264" },
          { url: "https://example.com/weapons/playlist.m3u8", quality: "Adaptive", type: 'm3u8' },
        ]
      },
      "movie-5": {
        title: "I Kill You Ep1",
        streams: [
          { url: "https://streamtape.com/v/pxY2w08gMpFrrzl/I.Kill.You.S01E01.mkv", quality: "720p", type: 'direct' },
          { url: "https://streamtape.com/e/pxY2w08gMpFrrzl/", quality: "720p", type: 'embed' },
        ]
      }
    };
    return videos[id] || { title: "Unknown", streams: [] };
  };

  const videoInfo = videoId ? getVideoInfo(videoId) : null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInPlayer = (url: string, type: string) => {
    if (type === 'm3u8') {
      // For M3U8 streams, try to open in external player
      window.open(`vlc://${url}`, '_self');
    } else {
      window.open(url, '_blank');
    }
  };

  const getStreamIcon = (type: string) => {
    switch (type) {
      case 'direct': return <Play className="h-4 w-4" />;
      case 'm3u8': return <Monitor className="h-4 w-4" />;
      case 'torrent': return <Download className="h-4 w-4" />;
      case 'embed': return <Settings className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-0 bg-background border-border">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {videoInfo && (
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {videoInfo.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose streaming method:
                </p>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {videoInfo.streams.map((stream, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStreamIcon(stream.type)}
                      <div>
                        <div className="font-medium">{stream.quality}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {stream.type} {stream.codec && `• ${stream.codec}`}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openInPlayer(stream.url, stream.type)}
                      >
                        Open
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(stream.url)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {copied && (
                <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm text-center rounded">
                  URL copied to clipboard!
                </div>
              )}

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Tip:</strong> Copy the URL and paste it in VLC, PotPlayer, 
                  or any media player that supports network streams.
                </p>
              </div>

              <Button
                onClick={onClose}
                variant="ghost"
                className="w-full mt-4"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
