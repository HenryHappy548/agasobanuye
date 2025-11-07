-- Add dubbed field to movies table
ALTER TABLE public.movies 
ADD COLUMN IF NOT EXISTS dubbed text;

-- Update RLS policies to ensure admins can manage movies
DROP POLICY IF EXISTS "Admins can delete movies" ON public.movies;

CREATE POLICY "Admins can delete movies"
ON public.movies
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Ensure admins can update movies
DROP POLICY IF EXISTS "Admins can update movies" ON public.movies;

CREATE POLICY "Admins can update movies"
ON public.movies
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));