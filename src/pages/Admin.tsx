import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Film, Plus, Download, Video, MessageSquare, MousePointerClick } from "lucide-react";
import { toast } from "sonner";
import MovieForm from "@/components/admin/MovieForm";
import MovieList from "@/components/admin/MovieList";
import DownloadLinksManager from "@/components/admin/DownloadLinksManager";
import VideoManager from "@/components/admin/VideoManager";
import MessagesManager from "@/components/admin/MessagesManager";
import AffiliateClicksManager from "@/components/admin/AffiliateClicksManager";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);

      // Check if user has admin role
      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin role:", error);
        toast.error("Error verifying admin access");
        navigate("/");
        return;
      }

      if (!roles) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Auth error:", error);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Signed out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="animate-pulse text-primary text-xl">Loading admin panel...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Card className="mb-8 border-primary/20 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Film className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Admin Dashboard
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    Welcome back, {user?.email}
                  </CardDescription>
                </div>
              </div>
              <Button onClick={handleSignOut} variant="outline" className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="add" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 max-w-4xl mx-auto">
            <TabsTrigger value="add" className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Movie</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="gap-2">
              <Film className="w-4 h-4" />
              <span className="hidden sm:inline">Movies</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="downloads" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Downloads</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="clicks" className="gap-2">
              <MousePointerClick className="w-4 h-4" />
              <span className="hidden sm:inline">Clicks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Add New Movie</CardTitle>
                <CardDescription>
                  Fill in the movie details below to add it to your collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MovieForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Manage Movies</CardTitle>
                <CardDescription>
                  View, edit, and delete existing movies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MovieList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Manage Videos</CardTitle>
                <CardDescription>
                  Add videos here first, then go to Downloads tab to add download links for each video.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="downloads">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Manage Download Links</CardTitle>
                <CardDescription>
                  Add and manage download links for your videos. Select a video first, then add download links with different qualities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DownloadLinksManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">User Messages</CardTitle>
                <CardDescription>
                  View and respond to messages from users. Click on WhatsApp or Email to respond directly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MessagesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clicks">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Affiliate Clicks</CardTitle>
                <CardDescription>
                  Track clicks on Amazon affiliate products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AffiliateClicksManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;