import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Edit, Trash2, Search, Loader2, RefreshCw, ExternalLink } from "lucide-react";
import { slugify } from "@/lib/slugify";
import MovieForm from "./MovieForm";

const MovieList = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingMovie, setEditingMovie] = useState<any>(null);
  const [deletingMovie, setDeletingMovie] = useState<any>(null);

  const fetchMovies = useCallback(async (showToast = false) => {
    try {
      if (showToast) setRefreshing(true);
      else setLoading(true);
      
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setMovies(data || []);
      setFilteredMovies(data || []);
      
      if (showToast) {
        toast.success(`Loaded ${data?.length || 0} movies`);
      }
    } catch (error: any) {
      console.error("Error fetching movies:", error);
      toast.error("Failed to load movies");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.year.includes(searchQuery)
      );
      setFilteredMovies(filtered);
    }
  }, [searchQuery, movies]);

  // Real-time subscription for movie changes
  useEffect(() => {
    const channel = supabase
      .channel('movies-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'movies'
        },
        (payload) => {
          console.log('Movie change detected:', payload.eventType);
          
          if (payload.eventType === 'INSERT') {
            setMovies(prev => [payload.new as any, ...prev]);
            toast.success(`New movie added: ${(payload.new as any).title}`);
          } else if (payload.eventType === 'UPDATE') {
            setMovies(prev => prev.map(m => 
              m.id === (payload.new as any).id ? payload.new as any : m
            ));
          } else if (payload.eventType === 'DELETE') {
            setMovies(prev => prev.filter(m => m.id !== (payload.old as any).id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDelete = async () => {
    if (!deletingMovie) return;

    try {
      const { error } = await supabase
        .from("movies")
        .delete()
        .eq("id", deletingMovie.id);

      if (error) throw error;
      
      toast.success(`"${deletingMovie.title}" deleted successfully`);
      // Note: Real-time subscription will update the list
    } catch (error: any) {
      console.error("Error deleting movie:", error);
      toast.error("Failed to delete movie");
    } finally {
      setDeletingMovie(null);
    }
  };

  const handleRefresh = () => {
    fetchMovies(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Refresh */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search movies by title, genre, or year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background/50"
          />
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleRefresh}
          disabled={refreshing}
          title="Refresh list"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Stats */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredMovies.length} of {movies.length} movies
      </div>

      {/* Movies Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Poster</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Dubbed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMovies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {searchQuery ? 'No movies match your search' : 'No movies found. Add your first movie!'}
                </TableCell>
              </TableRow>
            ) : (
              filteredMovies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {movie.title}
                      <a 
                        href={`/watch/${slugify(movie.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                        title="View on site"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>{movie.year}</TableCell>
                  <TableCell>{movie.genre}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      movie.category === 'trending' ? 'bg-primary/20 text-primary' :
                      movie.category === 'tv' ? 'bg-blue-500/20 text-blue-500' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {movie.category}
                    </span>
                  </TableCell>
                  <TableCell>{movie.dubbed || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingMovie(movie)}
                        title="Edit movie"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingMovie(movie)}
                        className="text-destructive hover:text-destructive"
                        title="Delete movie"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingMovie} onOpenChange={(open) => !open && setEditingMovie(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Movie</DialogTitle>
            <DialogDescription>
              Update the movie details below
            </DialogDescription>
          </DialogHeader>
          <MovieForm
            movie={editingMovie}
            onSuccess={() => {
              setEditingMovie(null);
              // Real-time will handle update
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingMovie} onOpenChange={(open) => !open && setDeletingMovie(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingMovie?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MovieList;
