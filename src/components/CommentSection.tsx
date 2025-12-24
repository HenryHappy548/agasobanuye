import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, MessageSquare, Send } from "lucide-react";
import { z } from "zod";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const commentSchema = z.object({
  username: z.string()
    .trim()
    .min(1, "Name cannot be empty")
    .max(50, "Name must be less than 50 characters"),
  comment: z.string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment must be less than 500 characters"),
});

interface Comment {
  id: string;
  username: string;
  comment: string;
  created_at: string;
  movie_id: string | null;
}

interface CommentSectionProps {
  movieId?: string;
  movieTitle?: string;
}

const CommentSection = ({ movieId, movieTitle }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          checkAdminStatus(session.user.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    const channel = supabase
      .channel(`comments-changes-${movieId || 'global'}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [movieId]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      await checkAdminStatus(user.id);
    }
  };

  const checkAdminStatus = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();
    
    setIsAdmin(data?.role === "admin");
  };

  const fetchComments = async () => {
    setIsLoading(true);
    
    let query = supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });
    
    // Filter by movie_id if provided
    if (movieId) {
      query = query.eq("movie_id", movieId);
    } else {
      query = query.is("movie_id", null);
    }

    const { data, error } = await query;

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    } else {
      setComments(data || []);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const finalUsername = isAdmin ? "😎Rwaflix" : username;
      
      // Block non-admin users from using the emoji or "Rwaflix" in their username
      if (!isAdmin && (finalUsername.includes("😎") || finalUsername.toLowerCase().includes("rwaflix"))) {
        toast({
          title: "Invalid Username",
          description: "Only the admin can use this username",
          variant: "destructive",
        });
        return;
      }
      
      const validated = commentSchema.parse({ 
        username: finalUsername,
        comment: newComment 
      });

      setIsSubmitting(true);

      const { error } = await supabase.from("comments").insert({
        comment: validated.comment,
        username: validated.username,
        user_id: user?.id || null,
        movie_id: movieId || null,
      });

      if (error) throw error;

      setUsername("");
      setNewComment("");
      toast({
        title: "Success",
        description: "Comment posted successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to post comment",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {movieId ? `Comments` : "Community Comments"}
              </h3>
              {movieTitle && (
                <p className="text-sm text-muted-foreground">
                  Share your thoughts about {movieTitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
            </span>
            {!isAdmin && !user && (
              <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                Admin
              </Button>
            )}
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
        
        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gradient-to-br from-card to-card/50 rounded-xl border border-border/50">
          {isAdmin && (
            <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg mb-3">
              <span className="text-sm text-muted-foreground">Posting as:</span>
              <span className="font-semibold text-primary">😎Rwaflix</span>
            </div>
          )}
          {!isAdmin && (
            <Input
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={50}
              className="bg-background/50 border-border/50 focus:border-primary"
            />
          )}
          <Textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            maxLength={500}
            className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {newComment.length}/500
            </span>
            <Button 
              type="submit" 
              disabled={isSubmitting || !newComment.trim() || (!isAdmin && !username.trim())}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Post Comment
            </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-card/50 to-transparent rounded-xl border border-border/30">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground font-medium">No comments yet</p>
            <p className="text-sm text-muted-foreground/70">Be the first to share your thoughts!</p>
          </div>
        ) : (
          <>
            {(showAll ? comments : comments.slice(0, 5)).map((comment) => (
              <div
                key={comment.id}
                className="p-4 bg-gradient-to-br from-card to-card/30 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    comment.username.includes("😎") 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-accent text-accent-foreground"
                  }`}>
                    {comment.username.includes("😎") ? "😎" : comment.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-foreground text-sm">
                      {comment.username}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(comment.created_at).toLocaleDateString()} • {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <p className="text-foreground/90 text-sm leading-relaxed pl-11 whitespace-pre-wrap break-words">
                  {comment.comment}
                </p>
              </div>
            ))}
            
            {comments.length > 5 && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(!showAll)}
                  className="w-full max-w-xs border-primary/30 hover:bg-primary/10"
                >
                  {showAll ? "Show Less" : `View More (${comments.length - 5} more)`}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
