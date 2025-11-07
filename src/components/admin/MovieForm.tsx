import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

interface MovieFormProps {
  movie?: any;
  onSuccess?: () => void;
}

const MovieForm = ({ movie, onSuccess }: MovieFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    description: movie?.description || "",
    year: movie?.year || "",
    genre: movie?.genre || "",
    rating: movie?.rating || "",
    category: movie?.category || "movie",
    poster_url: movie?.poster_url || "",
    video_url: movie?.video_url || "",
    dubbed: movie?.dubbed || "",
    featured: movie?.featured || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const movieData = {
        ...formData,
        featured: formData.featured,
      };

      if (movie?.id) {
        // Update existing movie
        const { error } = await supabase
          .from("movies")
          .update(movieData)
          .eq("id", movie.id);

        if (error) throw error;
        toast.success("Movie updated successfully!");
      } else {
        // Insert new movie
        const { error } = await supabase
          .from("movies")
          .insert([movieData]);

        if (error) throw error;
        toast.success("Movie added successfully!");
        
        // Reset form
        setFormData({
          title: "",
          description: "",
          year: "",
          genre: "",
          rating: "",
          category: "movie",
          poster_url: "",
          video_url: "",
          dubbed: "",
          featured: false,
        });
      }

      onSuccess?.();
    } catch (error: any) {
      console.error("Error saving movie:", error);
      toast.error(error.message || "Failed to save movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Movie Title *</Label>
          <Input
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Savimbi, Sankara"
            className="bg-background/50"
          />
        </div>

        {/* Year */}
        <div className="space-y-2">
          <Label htmlFor="year">Year *</Label>
          <Input
            id="year"
            required
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            placeholder="e.g., 2024"
            className="bg-background/50"
          />
        </div>

        {/* Genre */}
        <div className="space-y-2">
          <Label htmlFor="genre">Genre *</Label>
          <Input
            id="genre"
            required
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            placeholder="e.g., Action, Drama"
            className="bg-background/50"
          />
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <Label htmlFor="rating">Rating *</Label>
          <Input
            id="rating"
            required
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            placeholder="e.g., 8.5"
            className="bg-background/50"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="series">TV Series</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dubbed */}
        <div className="space-y-2">
          <Label htmlFor="dubbed">Dubbed Language</Label>
          <Input
            id="dubbed"
            value={formData.dubbed}
            onChange={(e) => setFormData({ ...formData, dubbed: e.target.value })}
            placeholder="e.g., Kinyarwanda, French"
            className="bg-background/50"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter movie description..."
          rows={4}
          className="bg-background/50 resize-none"
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
            onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
            placeholder="https://example.com/poster.jpg"
            className="bg-background/50"
          />
          <Button type="button" variant="outline" size="icon">
            <Upload className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Video Embed Link */}
      <div className="space-y-2">
        <Label htmlFor="video_url">Video Embed Link *</Label>
        <Input
          id="video_url"
          required
          value={formData.video_url}
          onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
          placeholder="Embed code or video URL"
          className="bg-background/50"
        />
        <p className="text-sm text-muted-foreground">
          You can paste an embed code or video URL
        </p>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="w-4 h-4 rounded border-input"
        />
        <Label htmlFor="featured" className="cursor-pointer">
          Feature this movie on homepage
        </Label>
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
        ) : (
          <>{movie ? "Update Movie" : "Add Movie"}</>
        )}
      </Button>
    </form>
  );
};

export default MovieForm;