import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2, Edit3, LogOut } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface Movie {
  id: string;
  title: string;
  description: string | null;
  year: string;
  genre: string;
  rating: string;
  category: string;
  poster_url: string | null;
  video_url: string | null;
  featured: boolean;
}

export default function AdminCMS() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    genre: '',
    rating: '',
    category: 'movie',
    featured: false
  });
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const { signOut, profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch movies',
        variant: 'destructive',
      });
    } else {
      setMovies(data || []);
    }
  };

  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let posterUrl = editingMovie?.poster_url || null;
      let videoUrl = editingMovie?.video_url || null;

      // Upload poster if new file selected
      if (posterFile) {
        const url = await uploadFile(posterFile, 'movie-posters');
        if (url) posterUrl = url;
      }

      // Upload video if new file selected
      if (videoFile) {
        const url = await uploadFile(videoFile, 'movie-videos');
        if (url) videoUrl = url;
      }

      const movieData = {
        title: formData.title,
        description: formData.description || null,
        year: formData.year,
        genre: formData.genre,
        rating: formData.rating,
        category: formData.category,
        poster_url: posterUrl,
        video_url: videoUrl,
        featured: formData.featured
      };

      let error;
      if (editingMovie) {
        // Update existing movie
        const { error: updateError } = await supabase
          .from('movies')
          .update(movieData)
          .eq('id', editingMovie.id);
        error = updateError;
      } else {
        // Create new movie
        const { error: insertError } = await supabase
          .from('movies')
          .insert(movieData);
        error = insertError;
      }

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: editingMovie ? 'Movie updated successfully' : 'Movie added successfully',
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        year: '',
        genre: '',
        rating: '',
        category: 'movie',
        featured: false
      });
      setPosterFile(null);
      setVideoFile(null);
      setEditingMovie(null);
      fetchMovies();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save movie',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      description: movie.description || '',
      year: movie.year,
      genre: movie.genre,
      rating: movie.rating,
      category: movie.category,
      featured: movie.featured
    });
  };

  const handleDelete = async (movieId: string) => {
    if (!confirm('Are you sure you want to delete this movie?')) return;

    const { error } = await supabase
      .from('movies')
      .delete()
      .eq('id', movieId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete movie',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Movie deleted successfully',
      });
      fetchMovies();
    }
  };

  const cancelEdit = () => {
    setEditingMovie(null);
    setFormData({
      title: '',
      description: '',
      year: '',
      genre: '',
      rating: '',
      category: 'movie',
      featured: false
    });
    setPosterFile(null);
    setVideoFile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Movie CMS</h1>
            <p className="text-muted-foreground">Welcome, {profile?.username}</p>
          </div>
          <Button onClick={signOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Movie Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {editingMovie ? 'Edit Movie' : 'Add New Movie'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre *</Label>
                  <Input
                    id="genre"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating *</Label>
                  <Input
                    id="rating"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="movie">Movie</SelectItem>
                      <SelectItem value="tv">TV Show</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                    />
                    <Label htmlFor="featured">Featured Movie</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="poster">Movie Poster</Label>
                  <Input
                    id="poster"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPosterFile(e.target.files?.[0] || null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video">Movie Video</Label>
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  <Upload className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : editingMovie ? 'Update Movie' : 'Add Movie'}
                </Button>
                {editingMovie && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Movies List */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Movies ({movies.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <div key={movie.id} className="border border-border rounded-lg p-4 space-y-3">
                  {movie.poster_url && (
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">{movie.year} • {movie.genre}</p>
                    <p className="text-sm">Rating: {movie.rating}</p>
                    <p className="text-sm">Category: {movie.category}</p>
                    {movie.featured && (
                      <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(movie)}>
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(movie.id)}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {movies.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No movies found. Add your first movie above.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}