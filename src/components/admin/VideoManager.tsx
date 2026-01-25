import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Video, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideos } from "@/hooks/useVideos";

const VideoManager = () => {
  const { videos, loading, refetch, isFetching } = useVideos({ enableRealtime: true });
  const [saving, setSaving] = useState(false);

  const [newVideo, setNewVideo] = useState({
    video_key: "",
    title: "",
    embed_code: "",
    host: "",
    thumbnail_url: "",
  });

  const handleAddVideo = async () => {
    if (!newVideo.video_key.trim() || !newVideo.title.trim() || !newVideo.embed_code.trim()) {
      toast.error("Please fill in Video Key, Title, and Embed Code");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("videos").insert({
        video_key: newVideo.video_key.trim(),
        title: newVideo.title.trim(),
        embed_code: newVideo.embed_code.trim(),
        host: newVideo.host.trim() || null,
        thumbnail_url: newVideo.thumbnail_url.trim() || null,
      });

      if (error) throw error;

      toast.success("Video added successfully!");
      setNewVideo({ video_key: "", title: "", embed_code: "", host: "", thumbnail_url: "" });
      refetch();
    } catch (error: any) {
      console.error("Error adding video:", error);
      toast.error(error.message || "Failed to add video");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteVideo = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}" and all its download links?`)) return;

    try {
      // Delete associated download links first
      await supabase.from("download_links").delete().eq("video_id", id);
      
      const { error } = await supabase.from("videos").delete().eq("id", id);
      if (error) throw error;

      toast.success("Video deleted!");
      refetch();
    } catch (error: any) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete video");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add New Video */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Video
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Video Key * (unique identifier)</Label>
              <Input
                value={newVideo.video_key}
                onChange={(e) => setNewVideo(prev => ({ ...prev, video_key: e.target.value }))}
                placeholder="e.g., inception-2010, squid-game-s1e1"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={newVideo.title}
                onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Inception, Squid Game S1E1"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label>Host/Source</Label>
              <Input
                value={newVideo.host}
                onChange={(e) => setNewVideo(prev => ({ ...prev, host: e.target.value }))}
                placeholder="e.g., YouTube, Vimeo, StreamTape"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label>Thumbnail URL</Label>
              <Input
                value={newVideo.thumbnail_url}
                onChange={(e) => setNewVideo(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                placeholder="https://example.com/thumbnail.jpg"
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Embed Code *</Label>
            <Textarea
              value={newVideo.embed_code}
              onChange={(e) => setNewVideo(prev => ({ ...prev, embed_code: e.target.value }))}
              placeholder="<iframe src='...'></iframe> or video embed URL"
              className="bg-background/50 min-h-[100px]"
            />
          </div>

          <Button onClick={handleAddVideo} disabled={saving} className="gap-2">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Video
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Existing Videos */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Video className="w-5 h-5" />
              Existing Videos ({videos.length})
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
              className="gap-1 text-xs"
            >
              <RefreshCw className={`w-3 h-3 ${isFetching ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {videos.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No videos yet. Add one above to start managing download links!
            </p>
          ) : (
            <div className="space-y-3">
              {videos.map((video) => (
                <div 
                  key={video.id} 
                  className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    {video.thumbnail_url ? (
                      <img 
                        src={video.thumbnail_url} 
                        alt={video.title}
                        className="w-16 h-10 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="w-16 h-10 bg-primary/10 rounded flex items-center justify-center">
                        <Video className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{video.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Key: {video.video_key} {video.host && `• ${video.host}`}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteVideo(video.id, video.title)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoManager;

