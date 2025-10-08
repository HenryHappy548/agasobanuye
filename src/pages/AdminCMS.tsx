import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Lock } from "lucide-react";

const ADMIN_PASSWORD = "killo0";

interface Video {
  id: string;
  video_key: string;
  title: string;
  embed_code: string;
  host: string | null;
  thumbnail_url: string | null;
  season: number | null;
  episode: number | null;
}

interface DownloadLink {
  id: string;
  video_id: string;
  quality: string;
  size: string | null;
  url: string;
  type: string;
}

const AdminCMS = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [downloadLinks, setDownloadLinks] = useState<DownloadLink[]>([]);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    video_key: "",
    title: "",
    embed_code: "",
    host: "",
    thumbnail_url: "",
    season: "",
    episode: "",
  });

  const [linkFormData, setLinkFormData] = useState({
    quality: "",
    size: "",
    url: "",
    type: "MP4",
  });

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      setIsAdmin(true);
      setLoading(false);
      fetchVideos();
    } else {
      setLoading(false);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setIsAdmin(true);
      sessionStorage.setItem("admin_auth", "true");
      fetchVideos();
      toast({ title: "Access granted" });
    } else {
      toast({ title: "Incorrect password", variant: "destructive" });
    }
  };

  const fetchVideos = async () => {
    const { data: videosData } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: linksData } = await supabase.from("download_links").select("*");

    if (videosData) setVideos(videosData);
    if (linksData) setDownloadLinks(linksData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const videoData = {
      video_key: formData.video_key,
      title: formData.title,
      embed_code: formData.embed_code,
      host: formData.host || null,
      thumbnail_url: formData.thumbnail_url || null,
      season: formData.season ? parseInt(formData.season) : null,
      episode: formData.episode ? parseInt(formData.episode) : null,
    };

    if (editingVideo) {
      const { error } = await supabase
        .from("videos")
        .update(videoData)
        .eq("id", editingVideo.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }

      toast({ title: "Success", description: "Video updated successfully" });
    } else {
      const { error } = await supabase.from("videos").insert(videoData);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }

      toast({ title: "Success", description: "Video added successfully" });
    }

    resetForm();
    fetchVideos();
  };

  const handleAddDownloadLink = async (videoId: string) => {
    if (!linkFormData.quality || !linkFormData.url) {
      toast({ title: "Error", description: "Quality and URL are required", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("download_links").insert({
      video_id: videoId,
      quality: linkFormData.quality,
      size: linkFormData.size || null,
      url: linkFormData.url,
      type: linkFormData.type,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Download link added" });
    setLinkFormData({ quality: "", size: "", url: "", type: "MP4" });
    fetchVideos();
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    const { error } = await supabase.from("videos").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Video deleted" });
    fetchVideos();
  };

  const handleDeleteLink = async (id: string) => {
    const { error } = await supabase.from("download_links").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Download link deleted" });
    fetchVideos();
  };

  const resetForm = () => {
    setFormData({
      video_key: "",
      title: "",
      embed_code: "",
      host: "",
      thumbnail_url: "",
      season: "",
      episode: "",
    });
    setEditingVideo(null);
    setShowForm(false);
  };

  const startEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      video_key: video.video_key,
      title: video.title,
      embed_code: video.embed_code,
      host: video.host || "",
      thumbnail_url: video.thumbnail_url || "",
      season: video.season?.toString() || "",
      episode: video.episode?.toString() || "",
    });
    setShowForm(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Access
            </CardTitle>
            <CardDescription>Enter password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">
                Access Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin CMS</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Video
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingVideo ? "Edit Video" : "Add New Video"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Video Key (e.g., ila1)"
                  value={formData.video_key}
                  onChange={(e) => setFormData({ ...formData, video_key: e.target.value })}
                  required
                />
                <Input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Embed Code (full iframe HTML)"
                  value={formData.embed_code}
                  onChange={(e) => setFormData({ ...formData, embed_code: e.target.value })}
                  required
                  rows={4}
                />
                <Input
                  placeholder="Host (optional)"
                  value={formData.host}
                  onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                />
                <Input
                  placeholder="Thumbnail URL (optional)"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Season (optional)"
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Episode (optional)"
                    value={formData.episode}
                    onChange={(e) => setFormData({ ...formData, episode: e.target.value })}
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit">{editingVideo ? "Update" : "Add"} Video</Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {videos.map((video) => (
            <Card key={video.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{video.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Key: {video.video_key}</p>
                    {video.host && <p className="text-sm text-muted-foreground">Host: {video.host}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(video)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteVideo(video.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Embed Code Preview:</h4>
                  <div className="bg-muted p-2 rounded text-xs overflow-x-auto">
                    {video.embed_code}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Download Links:</h4>
                  <div className="space-y-2">
                    {downloadLinks
                      .filter((link) => link.video_id === video.id)
                      .map((link) => (
                        <div key={link.id} className="flex items-center justify-between bg-muted p-2 rounded">
                          <span className="text-sm">
                            {link.quality} - {link.size} - {link.type}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteLink(link.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Add Download Link:</h4>
                  <div className="grid grid-cols-4 gap-2">
                    <Input
                      placeholder="Quality (1080p)"
                      value={linkFormData.quality}
                      onChange={(e) => setLinkFormData({ ...linkFormData, quality: e.target.value })}
                    />
                    <Input
                      placeholder="Size (330MB)"
                      value={linkFormData.size}
                      onChange={(e) => setLinkFormData({ ...linkFormData, size: e.target.value })}
                    />
                    <Input
                      placeholder="URL"
                      value={linkFormData.url}
                      onChange={(e) => setLinkFormData({ ...linkFormData, url: e.target.value })}
                    />
                    <Button onClick={() => handleAddDownloadLink(video.id)}>Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCMS;
