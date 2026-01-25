import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Download, Link, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideos, useDownloadLinks, getVideoDownloadLinks } from "@/hooks/useVideos";

interface DownloadLinkForm {
  quality: string;
  size: string;
  url: string;
  type: string;
}

const DownloadLinksManager = () => {
  const { videos, loading: videosLoading, refetch: refetchVideos, isFetching: videosFetching } = useVideos();
  const { downloadLinks: allDownloadLinks, loading: linksLoading, refetch: refetchLinks, isFetching: linksFetching } = useDownloadLinks();
  
  const [selectedVideoId, setSelectedVideoId] = useState<string>("");
  const [saving, setSaving] = useState(false);

  // Get download links for selected video from cached data (instant!)
  const downloadLinks = useMemo(() => {
    if (!selectedVideoId) return [];
    return getVideoDownloadLinks(selectedVideoId, allDownloadLinks);
  }, [selectedVideoId, allDownloadLinks]);

  // New link form state
  const [newLink, setNewLink] = useState<DownloadLinkForm>({
    quality: "720p",
    size: "",
    url: "",
    type: "MP4"
  });

  const loading = videosLoading || linksLoading;
  const isFetching = videosFetching || linksFetching;

  const handleAddLink = async () => {
    if (!selectedVideoId) {
      toast.error("Please select a video first");
      return;
    }

    if (!newLink.url.trim()) {
      toast.error("Please enter a download URL");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("download_links")
        .insert({
          video_id: selectedVideoId,
          quality: newLink.quality,
          size: newLink.size.trim() || null,
          url: newLink.url.trim(),
          type: newLink.type
        });

      if (error) throw error;

      toast.success("Download link added successfully!");
      setNewLink({ quality: "720p", size: "", url: "", type: "MP4" });
      refetchLinks();
    } catch (error: any) {
      console.error("Error adding download link:", error);
      toast.error(error.message || "Failed to add download link");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    if (!confirm("Are you sure you want to delete this download link?")) return;

    try {
      const { error } = await supabase
        .from("download_links")
        .delete()
        .eq("id", linkId);

      if (error) throw error;

      toast.success("Download link deleted!");
      refetchLinks();
    } catch (error: any) {
      console.error("Error deleting download link:", error);
      toast.error("Failed to delete download link");
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
      {/* Video Selection with Refresh */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Select Video/Movie</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { refetchVideos(); refetchLinks(); }}
            disabled={isFetching}
            className="gap-1 text-xs"
          >
            <RefreshCw className={`w-3 h-3 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <Select value={selectedVideoId} onValueChange={setSelectedVideoId}>
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Choose a video to manage download links..." />
          </SelectTrigger>
          <SelectContent>
            {videos.map((video) => (
              <SelectItem key={video.id} value={video.id}>
                {video.title} ({video.video_key})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {videos.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No videos found. Add videos first before managing download links.
          </p>
        )}
      </div>

      {selectedVideoId && (
        <>
          {/* Add New Download Link */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Download Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Quality</Label>
                  <Select 
                    value={newLink.quality} 
                    onValueChange={(value) => setNewLink(prev => ({ ...prev, quality: value }))}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="360p">360p</SelectItem>
                      <SelectItem value="480p">480p</SelectItem>
                      <SelectItem value="720p">720p (HD)</SelectItem>
                      <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                      <SelectItem value="4K">4K (Ultra HD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>File Type</Label>
                  <Select 
                    value={newLink.type} 
                    onValueChange={(value) => setNewLink(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MP4">MP4</SelectItem>
                      <SelectItem value="MKV">MKV</SelectItem>
                      <SelectItem value="AVI">AVI</SelectItem>
                      <SelectItem value="WEBM">WEBM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>File Size (optional)</Label>
                  <Input
                    value={newLink.size}
                    onChange={(e) => setNewLink(prev => ({ ...prev, size: e.target.value }))}
                    placeholder="e.g., 1.2 GB"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Download URL *</Label>
                  <Input
                    value={newLink.url}
                    onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com/download/movie.mp4"
                    className="bg-background/50"
                  />
                </div>
              </div>

              <Button onClick={handleAddLink} disabled={saving} className="gap-2">
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Download Link
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Existing Download Links */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Download className="w-5 h-5" />
                Existing Download Links ({downloadLinks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {downloadLinks.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No download links yet. Add one above!
                </p>
              ) : (
                <div className="space-y-3">
                  {downloadLinks.map((link) => (
                    <div 
                      key={link.id} 
                      className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded">
                          <Link className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{link.quality} - {link.type}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                            {link.size && `${link.size} • `}{link.url}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteLink(link.id)}
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
        </>
      )}
    </div>
  );
};

export default DownloadLinksManager;
