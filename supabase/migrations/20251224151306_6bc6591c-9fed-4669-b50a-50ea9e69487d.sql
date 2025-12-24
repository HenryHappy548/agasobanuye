-- Add movie_id column to comments table for movie-specific comments
ALTER TABLE public.comments 
ADD COLUMN movie_id uuid REFERENCES public.movies(id) ON DELETE CASCADE;

-- Create index for faster lookups
CREATE INDEX idx_comments_movie_id ON public.comments(movie_id);