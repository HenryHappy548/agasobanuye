import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Key, 
  Film, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Link, 
  Crown,
  RefreshCw,
  User
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DOMPurify from "dompurify";

interface PremiumCode {
  id: string;
  code: string;
  client_name: string;
  client_phone: string | null;
  is_active: boolean;
  created_at: string;
}

interface PremiumMovie {
  id: string;
  title: string;
  description: string | null;
  poster_url: string | null;
  video_url: string | null;
  download_url: string | null;
  year: string | null;
  genre: string | null;
  created_at: string;
}

interface CodeMovieLink {
  id: string;
  code_id: string;
  movie_id: string;
}

// Sanitize input
const sanitizeInput = (value: string, maxLength: number = 500): string => {
  const sanitized = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
  return sanitized.slice(0, maxLength);
};

const PremiumManager = () => {
  const [codes, setCodes] = useState<PremiumCode[]>([]);
  const [movies, setMovies] = useState<PremiumMovie[]>([]);
  const [codeMovieLinks, setCodeMovieLinks] = useState<CodeMovieLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  // New code form
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // New movie form
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    poster_url: "",
    video_url: "",
    download_url: "",
    year: "",
    genre: ""
  });
  const [isAddingMovie, setIsAddingMovie] = useState(false);

  // Assign movie form
  const [selectedCodeId, setSelectedCodeId] = useState<string>("");
  const [selectedMovieId, setSelectedMovieId] = useState<string>("");
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [codesRes, moviesRes, linksRes] = await Promise.all([
        supabase.from("premium_codes").select("*").order("created_at", { ascending: false }),
        supabase.from("premium_movies").select("*").order("created_at", { ascending: false }),
        supabase.from("premium_code_movies").select("*")
      ]);

      if (codesRes.data) setCodes(codesRes.data);
      if (moviesRes.data) setMovies(moviesRes.data);
      if (linksRes.data) setCodeMovieLinks(linksRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load premium data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateCode = async () => {
    if (!newClientName.trim()) {
      toast({
        title: "Client name required",
        description: "Please enter a client name",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.rpc('generate_premium_code', {
        client_name_input: sanitizeInput(newClientName.trim(), 100),
        client_phone_input: newClientPhone.trim() ? sanitizeInput(newClientPhone.trim(), 20) : null
      });

      if (error) throw error;

      toast({
        title: "Code Generated!",
        description: `New code: ${data}`
      });

      setNewClientName("");
      setNewClientPhone("");
      fetchData();
    } catch (error) {
      console.error("Error generating code:", error);
      toast({
        title: "Error",
        description: "Failed to generate code",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleCodeStatus = async (code: PremiumCode) => {
    try {
      const { error } = await supabase
        .from("premium_codes")
        .update({ is_active: !code.is_active })
        .eq("id", code.id);

      if (error) throw error;

      toast({
        title: code.is_active ? "Code Deactivated" : "Code Activated",
        description: `${code.code} status updated`
      });

      fetchData();
    } catch (error) {
      console.error("Error toggling code:", error);
      toast({
        title: "Error",
        description: "Failed to update code status",
        variant: "destructive"
      });
    }
  };

  const deleteCode = async (codeId: string) => {
    try {
      const { error } = await supabase
        .from("premium_codes")
        .delete()
        .eq("id", codeId);

      if (error) throw error;

      toast({ title: "Code deleted" });
      fetchData();
    } catch (error) {
      console.error("Error deleting code:", error);
      toast({
        title: "Error",
        description: "Failed to delete code",
        variant: "destructive"
      });
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    toast({ title: "Code copied!" });
  };

  const addMovie = async () => {
    if (!newMovie.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a movie title",
        variant: "destructive"
      });
      return;
    }

    setIsAddingMovie(true);
    try {
      const { error } = await supabase.from("premium_movies").insert({
        title: sanitizeInput(newMovie.title.trim(), 200),
        description: sanitizeInput(newMovie.description.trim(), 1000) || null,
        poster_url: sanitizeInput(newMovie.poster_url.trim(), 500) || null,
        video_url: sanitizeInput(newMovie.video_url.trim(), 2000) || null,
        download_url: sanitizeInput(newMovie.download_url.trim(), 500) || null,
        year: sanitizeInput(newMovie.year.trim(), 10) || null,
        genre: sanitizeInput(newMovie.genre.trim(), 100) || null
      });

      if (error) throw error;

      toast({ title: "Movie added!" });
      setNewMovie({
        title: "",
        description: "",
        poster_url: "",
        video_url: "",
        download_url: "",
        year: "",
        genre: ""
      });
      fetchData();
    } catch (error) {
      console.error("Error adding movie:", error);
      toast({
        title: "Error",
        description: "Failed to add movie",
        variant: "destructive"
      });
    } finally {
      setIsAddingMovie(false);
    }
  };

  const deleteMovie = async (movieId: string) => {
    try {
      const { error } = await supabase
        .from("premium_movies")
        .delete()
        .eq("id", movieId);

      if (error) throw error;

      toast({ title: "Movie deleted" });
      fetchData();
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast({
        title: "Error",
        description: "Failed to delete movie",
        variant: "destructive"
      });
    }
  };

  const assignMovieToCode = async () => {
    if (!selectedCodeId || !selectedMovieId) {
      toast({
        title: "Select both",
        description: "Please select a code and a movie",
        variant: "destructive"
      });
      return;
    }

    // Check if already linked
    const exists = codeMovieLinks.some(
      link => link.code_id === selectedCodeId && link.movie_id === selectedMovieId
    );

    if (exists) {
      toast({
        title: "Already linked",
        description: "This movie is already assigned to this code",
        variant: "destructive"
      });
      return;
    }

    setIsAssigning(true);
    try {
      const { error } = await supabase.from("premium_code_movies").insert({
        code_id: selectedCodeId,
        movie_id: selectedMovieId
      });

      if (error) throw error;

      toast({ title: "Movie assigned to code!" });
      setSelectedCodeId("");
      setSelectedMovieId("");
      fetchData();
    } catch (error) {
      console.error("Error assigning movie:", error);
      toast({
        title: "Error",
        description: "Failed to assign movie",
        variant: "destructive"
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const unlinkMovie = async (linkId: string) => {
    try {
      const { error } = await supabase
        .from("premium_code_movies")
        .delete()
        .eq("id", linkId);

      if (error) throw error;

      toast({ title: "Movie unlinked" });
      fetchData();
    } catch (error) {
      console.error("Error unlinking movie:", error);
    }
  };

  const getLinkedMovies = (codeId: string): PremiumMovie[] => {
    const linkedIds = codeMovieLinks
      .filter(link => link.code_id === codeId)
      .map(link => link.movie_id);
    return movies.filter(m => linkedIds.includes(m.id));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="codes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="codes" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Codes ({codes.length})
          </TabsTrigger>
          <TabsTrigger value="movies" className="flex items-center gap-2">
            <Film className="h-4 w-4" />
            Movies ({movies.length})
          </TabsTrigger>
          <TabsTrigger value="assign" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            Assign
          </TabsTrigger>
        </TabsList>

        {/* CODES TAB */}
        <TabsContent value="codes" className="space-y-4">
          {/* Generate New Code */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generate New Code</CardTitle>
              <CardDescription>Create a permanent access code for a client</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="John Doe"
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">WhatsApp Number</Label>
                  <Input
                    id="clientPhone"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    placeholder="+250 7XX XXX XXX"
                    maxLength={20}
                  />
                </div>
              </div>
              <Button onClick={generateCode} disabled={isGenerating}>
                <Key className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Code"}
              </Button>
            </CardContent>
          </Card>

          {/* Codes List */}
          <div className="space-y-3">
            {codes.map((code) => {
              const linkedMovies = getLinkedMovies(code.id);
              return (
                <Card key={code.id} className={!code.is_active ? "opacity-60" : ""}>
                  <CardContent className="py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <code className="text-lg font-mono font-bold text-primary">{code.code}</code>
                          <button onClick={() => copyCode(code.code)} className="p-1 hover:bg-muted rounded">
                            {copiedCode === code.code ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                          <Badge variant={code.is_active ? "default" : "secondary"}>
                            {code.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-3 w-3" />
                          {code.client_name}
                          {code.client_phone && ` • ${code.client_phone}`}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Crown className="h-3 w-3" />
                          {linkedMovies.length} movie(s) linked
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleCodeStatus(code)}
                        >
                          {code.is_active ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteCode(code.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Linked Movies */}
                    {linkedMovies.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground mb-2">Linked Movies:</p>
                        <div className="flex flex-wrap gap-2">
                          {linkedMovies.map(m => {
                            const link = codeMovieLinks.find(l => l.code_id === code.id && l.movie_id === m.id);
                            return (
                              <Badge key={m.id} variant="outline" className="gap-1">
                                {m.title}
                                <button
                                  onClick={() => link && unlinkMovie(link.id)}
                                  className="ml-1 hover:text-destructive"
                                >
                                  ×
                                </button>
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}

            {codes.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No codes generated yet</p>
            )}
          </div>
        </TabsContent>

        {/* MOVIES TAB */}
        <TabsContent value="movies" className="space-y-4">
          {/* Add New Movie */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Premium Movie</CardTitle>
              <CardDescription>Add an undubbed movie for premium access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="movieTitle">Title *</Label>
                  <Input
                    id="movieTitle"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    placeholder="Movie Title"
                    maxLength={200}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="movieYear">Year</Label>
                  <Input
                    id="movieYear"
                    value={newMovie.year}
                    onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
                    placeholder="2024"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="movieDesc">Description</Label>
                <Textarea
                  id="movieDesc"
                  value={newMovie.description}
                  onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                  placeholder="Movie description..."
                  maxLength={1000}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="posterUrl">Poster URL</Label>
                  <Input
                    id="posterUrl"
                    value={newMovie.poster_url}
                    onChange={(e) => setNewMovie({ ...newMovie, poster_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                    placeholder="Action, Drama"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video Embed / URL</Label>
                <Textarea
                  id="videoUrl"
                  value={newMovie.video_url}
                  onChange={(e) => setNewMovie({ ...newMovie, video_url: e.target.value })}
                  placeholder="<iframe src=... or https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downloadUrl">Download URL</Label>
                <Input
                  id="downloadUrl"
                  value={newMovie.download_url}
                  onChange={(e) => setNewMovie({ ...newMovie, download_url: e.target.value })}
                  placeholder="https://mediafire.com/..."
                />
              </div>

              <Button onClick={addMovie} disabled={isAddingMovie}>
                <Plus className="h-4 w-4 mr-2" />
                {isAddingMovie ? "Adding..." : "Add Movie"}
              </Button>
            </CardContent>
          </Card>

          {/* Movies List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {movies.map((movie) => (
              <Card key={movie.id}>
                <CardContent className="py-4">
                  <div className="flex gap-4">
                    {movie.poster_url && (
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold">{movie.title}</h4>
                      {movie.year && <p className="text-sm text-muted-foreground">{movie.year}</p>}
                      {movie.genre && <Badge variant="outline" className="mt-1">{movie.genre}</Badge>}
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteMovie(movie.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {movies.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No premium movies added yet</p>
          )}
        </TabsContent>

        {/* ASSIGN TAB */}
        <TabsContent value="assign" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assign Movie to Code</CardTitle>
              <CardDescription>Link a premium movie to a client's access code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Select Code</Label>
                  <Select value={selectedCodeId} onValueChange={setSelectedCodeId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a code..." />
                    </SelectTrigger>
                    <SelectContent>
                      {codes.filter(c => c.is_active).map((code) => (
                        <SelectItem key={code.id} value={code.id}>
                          {code.code} - {code.client_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Select Movie</Label>
                  <Select value={selectedMovieId} onValueChange={setSelectedMovieId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a movie..." />
                    </SelectTrigger>
                    <SelectContent>
                      {movies.map((movie) => (
                        <SelectItem key={movie.id} value={movie.id}>
                          {movie.title} {movie.year && `(${movie.year})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={assignMovieToCode} disabled={isAssigning}>
                <Link className="h-4 w-4 mr-2" />
                {isAssigning ? "Assigning..." : "Assign Movie to Code"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PremiumManager;
