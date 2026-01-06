-- Create movie_views table to track view analytics
CREATE TABLE public.movie_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  referrer TEXT
);

-- Enable RLS
ALTER TABLE public.movie_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert views (for tracking)
CREATE POLICY "Anyone can record movie views" 
ON public.movie_views 
FOR INSERT 
WITH CHECK (true);

-- Only admins can read views for analytics
CREATE POLICY "Admins can read movie views" 
ON public.movie_views 
FOR SELECT 
USING (public.is_admin());

-- Create index for faster lookups by movie_id
CREATE INDEX idx_movie_views_movie_id ON public.movie_views(movie_id);

-- Create function to get view counts per movie
CREATE OR REPLACE FUNCTION public.get_movie_view_counts()
RETURNS TABLE(movie_id UUID, view_count BIGINT)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT mv.movie_id, COUNT(*)::bigint AS view_count
  FROM public.movie_views mv
  GROUP BY mv.movie_id
$$;