import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Film, Plus, MessageSquare, ShoppingBag, MessagesSquare, Crown, BarChart3, ShieldAlert, Clapperboard, Phone, Wand2, Send } from "lucide-react";
import { toast } from "sonner";
import MovieForm from "@/components/admin/MovieForm";
import MovieList from "@/components/admin/MovieList";
import VideoEditor from "@/components/admin/VideoEditor";
import MessagesManager from "@/components/admin/MessagesManager";
import { ProductsManager } from "@/components/admin/ProductsManager";
import CommentsManager from "@/components/admin/CommentsManager";
import PremiumManager from "@/components/admin/PremiumManager";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import ShortCreator from "@/components/admin/ShortCreator";
import WhatsAppSubscribersManager from "@/components/admin/WhatsAppSubscribersManager";

import WhatsAppNotificationGenerator from "@/components/admin/WhatsAppNotificationGenerator";


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

  const handleSignOutAllDevices = async () => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
      toast.success("Signed out from all devices");
      navigate("/auth");
    } catch (error) {
      toast.error("Failed to sign out all devices");
    }
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
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <CardDescription className="text-base mt-1">
                    Welcome back, {user?.email}
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSignOutAllDevices} variant="destructive" size="sm" className="gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  Sign Out All Devices
                </Button>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="!flex flex-wrap w-full max-w-7xl mx-auto !h-auto gap-1 p-2">
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="add" className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Movie</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="gap-2">
              <Film className="w-4 h-4" />
              <span className="hidden sm:inline">Movies</span>
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </TabsTrigger>
            <TabsTrigger value="editor" className="gap-2">
              <Wand2 className="w-4 h-4" />
              <span className="hidden sm:inline">Editor</span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="gap-2">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Pro</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="comments" className="gap-2">
              <MessagesSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Comments</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="shorts" className="gap-2">
              <Clapperboard className="w-4 h-4" />
              <span className="hidden sm:inline">Shorts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  Analytics Dashboard
                </CardTitle>
                <CardDescription>
                  Real-time daily stats — views, top movies, genre trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsDashboard />
              </CardContent>
            </Card>
          </TabsContent>

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

          <TabsContent value="premium">
            <Card className="border-amber-500/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Crown className="h-6 w-6 text-amber-500" />
                  Pro Movies Manager
                </CardTitle>
                <CardDescription>
                  Generate access codes for clients and manage premium undubbed movies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PremiumManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Manage Products</CardTitle>
                <CardDescription>
                  Add affiliate products to display across the site. They will appear on movie pages and throughout the site.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Manage Comments</CardTitle>
                <CardDescription>
                  View and delete user comments from all videos. Search by username or comment content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommentsManager />
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

          <TabsContent value="shorts">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Clapperboard className="h-6 w-6 text-primary" />
                  Short Creator
                </CardTitle>
                <CardDescription>
                  Upload a movie clip, scrub to mark start/end, add your branding overlay, and export a ready-to-post short.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ShortCreator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp">
            <div className="space-y-6">
              <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Phone className="h-6 w-6 text-primary" />
                    WhatsApp Subscribers
                  </CardTitle>
                  <CardDescription>
                    View and manage phone numbers collected for movie notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WhatsAppSubscribersManager />
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Send className="h-6 w-6 text-primary" />
                    Movie Notification Generator
                  </CardTitle>
                  <CardDescription>
                    Auto-generate WhatsApp messages for new movies with poster, watch link, download link, and details. Copy & send to all subscribers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WhatsAppNotificationGenerator />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default Admin;