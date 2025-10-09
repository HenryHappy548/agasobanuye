import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Edit2 } from "lucide-react";
import { z } from "zod";
import { User } from "@supabase/supabase-js";

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
  user_id: string;
}

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get current user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    fetchComments();

    const channel = supabase
      .channel("comments-changes")
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
  }, []);

  const fetchComments = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

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

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to post comments",
        variant: "destructive",
      });
      return;
    }

    try {
      const validated = commentSchema.parse({ 
        username: username,
        comment: newComment 
      });

      setIsSubmitting(true);

      if (editingId) {
        const { error } = await supabase
          .from("comments")
          .update({
            comment: validated.comment,
            username: validated.username,
          })
          .eq("id", editingId);

        if (error) throw error;
        setEditingId(null);
      } else {
        const { error } = await supabase.from("comments").insert({
          comment: validated.comment,
          username: validated.username,
          user_id: user.id,
        });

        if (error) throw error;
      }

      setUsername("");
      setNewComment("");
      toast({
        title: "Success",
        description: editingId ? "Comment updated successfully" : "Comment posted successfully",
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

  const handleEdit = (comment: Comment) => {
    setUsername(comment.username);
    setNewComment(comment.comment);
    setEditingId(comment.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    const { error } = await supabase.from("comments").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Comments</h3>
        
        {!user ? (
          <div className="p-6 bg-card/50 rounded-lg border border-border text-center">
            <p className="text-muted-foreground mb-4">Please log in to post comments</p>
            <Button onClick={() => window.location.href = '/auth'}>
              Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={50}
              className="bg-card text-foreground"
            />
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              maxLength={500}
              className="min-h-[100px] bg-card text-foreground"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {newComment.length}/500 characters
              </span>
              <div className="flex gap-2">
                {editingId && (
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setUsername("");
                      setNewComment("");
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !newComment.trim() || !username.trim()}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingId ? "Update Comment" : "Post Comment"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <>
            {(showAll ? comments : comments.slice(0, 5)).map((comment) => (
              <div
                key={comment.id}
                className="p-4 bg-card rounded-lg border border-border space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {comment.username}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString()} at{" "}
                      {new Date(comment.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  {user && user.id === comment.user_id && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(comment)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(comment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-foreground whitespace-pre-wrap break-words">
                  {comment.comment}
                </p>
              </div>
            ))}
            
            {comments.length > 5 && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(!showAll)}
                  className="w-full max-w-xs"
                >
                  {showAll ? "Show Less" : `View More (${comments.length - 5} more comments)`}
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
