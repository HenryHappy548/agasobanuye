-- Create movies table for storing movie metadata
CREATE TABLE public.movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  year TEXT NOT NULL,
  genre TEXT NOT NULL,
  rating TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('movie', 'tv', 'trending')),
  poster_url TEXT,
  video_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

-- Allow public read access to movies (since no login required)
CREATE POLICY "Movies are publicly viewable" 
ON public.movies 
FOR SELECT 
USING (true);

-- Create storage buckets for movie files
INSERT INTO storage.buckets (id, name, public) VALUES ('movie-posters', 'movie-posters', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('movie-videos', 'movie-videos', true);

-- Create storage policies for movie posters
CREATE POLICY "Movie posters are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'movie-posters');

-- Create storage policies for movie videos  
CREATE POLICY "Movie videos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'movie-videos');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_movies_updated_at
BEFORE UPDATE ON public.movies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();