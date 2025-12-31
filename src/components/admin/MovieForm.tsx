import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Upload, CheckCircle } from "lucide-react";

interface MovieFormProps {
  movie?: any;
  onSuccess?: () => void;
}

const MovieForm = ({ movie, onSuccess }: MovieFormProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    description: movie?.description || "",
    year: movie?.year || "",
    genre: movie?.genre || "",
    rating: movie?.rating || "",
    category: movie?.category || "movie",
    poster_url: movie?.poster_url || "",
    video_url: movie?.video_url || "",
    download_url: movie?.download_url || "",
    dubbed: movie?.dubbed || "",
    featured: movie?.featured || false,
  });

  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      description: "",
      year: "",
      genre: "",
      rating: "",
      category: "movie",
      poster_url: "",
      video_url: "",
      download_url: "",
      dubbed: "",
      featured: false,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim() || !formData.year.trim() || !formData.genre.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      // If marking as featured, unfeature all other movies first
      if (formData.featured) {
        await supabase
          .from("movies")
          .update({ featured: false })
          .neq("id", movie?.id || "");
      }

      const movieData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        year: formData.year.trim(),
        genre: formData.genre.trim(),
        rating: formData.rating.trim(),
        category: formData.category,
        poster_url: formData.poster_url.trim(),
        video_url: formData.video_url.trim(),
        download_url: formData.download_url.trim(),
        dubbed: formData.dubbed.trim(),
        featured: formData.featured,
      };

      if (movie?.id) {
        // Update existing movie
        const { error } = await supabase
          .from("movies")
          .update(movieData)
          .eq("id", movie.id);

        if (error) {
          console.error("Update error:", error);
          throw new Error(error.message);
        }
        
        toast.success(`"${formData.title}" updated successfully!`);
        setSuccess(true);
      } else {
        // Insert new movie - using upsert to prevent duplicates
        const { data, error } = await supabase
          .from("movies")
          .insert([movieData])
          .select()
          .single();

        if (error) {
          console.error("Insert error:", error);
          throw new Error(error.message);
        }
        
        toast.success(`"${formData.title}" added successfully! It will appear in the movie list.`);
        setSuccess(true);
        
        // Notify Bing via IndexNow (fire and forget)
        supabase.functions.invoke("indexnow", {
          body: { movieId: data.id, movieTitle: formData.title }
        }).then(({ error: indexError }) => {
          if (indexError) {
            console.warn("IndexNow notification failed:", indexError);
          } else {
            console.log("IndexNow notification sent for:", formData.title);
          }
        });
        
        // Reset form only for new movies
        resetForm();
      }

      // Call onSuccess callback after a brief delay
      setTimeout(() => {
        onSuccess?.();
        setSuccess(false);
      }, 1500);

    } catch (error: any) {
      console.error("Error saving movie:", error);
      toast.error(error.message || "Failed to save movie. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = useCallback((field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500">
          <CheckCircle className="w-5 h-5" />
          <span>Movie saved successfully! The list will refresh automatically.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Movie Title *</Label>
          <Input
            id="title"
            required
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="e.g., Savimbi, Sankara"
            className="bg-background/50"
            disabled={loading}
          />
        </div>

        {/* Year */}
        <div className="space-y-2">
          <Label htmlFor="year">Year *</Label>
          <Input
            id="year"
            required
            value={formData.year}
            onChange={(e) => handleInputChange("year", e.target.value)}
            placeholder="e.g., 2024"
            className="bg-background/50"
            disabled={loading}
          />
        </div>

        {/* Genre */}
        <div className="space-y-2">
          <Label htmlFor="genre">Genre *</Label>
          <Input
            id="genre"
            required
            value={formData.genre}
            onChange={(e) => handleInputChange("genre", e.target.value)}
            placeholder="e.g., Action, Drama"
            className="bg-background/50"
            disabled={loading}
          />
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <Label htmlFor="rating">Rating/Host *</Label>
          <Input
            id="rating"
            required
            value={formData.rating}
            onChange={(e) => handleInputChange("rating", e.target.value)}
            placeholder="e.g., Rocky, Gaheza"
            className="bg-background/50"
            disabled={loading}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleInputChange("category", value)}
            disabled={loading}
          >
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="tv">TV Series</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dubbed */}
        <div className="space-y-2">
          <Label htmlFor="dubbed">Dubbed Language</Label>
          <Input
            id="dubbed"
            value={formData.dubbed}
            onChange={(e) => handleInputChange("dubbed", e.target.value)}
            placeholder="e.g., Kinyarwanda, French"
            className="bg-background/50"
            disabled={loading}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Enter movie description..."
          rows={4}
          className="bg-background/50 resize-none"
          disabled={loading}
        />
      </div>

      {/* Poster URL */}
      <div className="space-y-2">
        <Label htmlFor="poster_url">Poster Image URL *</Label>
        <div className="flex gap-2">
          <Input
            id="poster_url"
            required
            value={formData.poster_url}
            onChange={(e) => handleInputChange("poster_url", e.target.value)}
            placeholder="https://example.com/poster.jpg"
            className="bg-background/50"
            disabled={loading}
          />
          <Button type="button" variant="outline" size="icon" disabled={loading}>
            <Upload className="w-4 h-4" />
          </Button>
        </div>
        {formData.poster_url && (
          <div className="mt-2">
            <img 
              src={formData.poster_url} 
              alt="Poster preview" 
              className="w-20 h-28 object-cover rounded border border-border"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Video Embed Link */}
      <div className="space-y-2">
        <Label htmlFor="video_url">Video Embed Link *</Label>
        <Input
          id="video_url"
          required
          value={formData.video_url}
          onChange={(e) => handleInputChange("video_url", e.target.value)}
          placeholder="Embed code or video URL"
          className="bg-background/50"
          disabled={loading}
        />
        <p className="text-sm text-muted-foreground">
          Paste an embed code or video URL for streaming
        </p>
      </div>

      {/* Download Embed Link */}
      <div className="space-y-2">
        <Label htmlFor="download_url">Download Embed Link</Label>
        <Input
          id="download_url"
          value={formData.download_url}
          onChange={(e) => handleInputChange("download_url", e.target.value)}
          placeholder="Download embed code or URL"
          className="bg-background/50"
          disabled={loading}
        />
        <p className="text-sm text-muted-foreground">
          Paste download embed code for users to download the movie
        </p>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => handleInputChange("featured", e.target.checked)}
          className="w-5 h-5 rounded border-primary accent-primary"
          disabled={loading}
        />
        <div>
          <Label htmlFor="featured" className="cursor-pointer font-medium">
            📌 Pin to Homepage Hero
          </Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            This will unpin any other featured movie automatically
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto gap-2"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {movie ? "Updating..." : "Adding..."}
          </>
        ) : success ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Saved!
          </>
        ) : (
          <>{movie ? "Update Movie" : "Add Movie"}</>
        )}
      </Button>
    </form>
  );
};

export default MovieForm;
