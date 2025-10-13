import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { z } from "zod";

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
}

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
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

    try {
      const validated = commentSchema.parse({ 
        username: username,
        comment: newComment 
      });

      setIsSubmitting(true);

      const { error } = await supabase.from("comments").insert({
        comment: validated.comment,
        username: validated.username,
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Comments</h3>
        
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
            <Button 
              type="submit" 
              disabled={isSubmitting || !newComment.trim() || !username.trim()}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Comment
            </Button>
          </div>
        </form>
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
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {comment.username}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString()} at{" "}
                    {new Date(comment.created_at).toLocaleTimeString()}
                  </span>
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
