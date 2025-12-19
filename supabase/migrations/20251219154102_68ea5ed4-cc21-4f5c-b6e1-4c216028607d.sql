-- Add download_url column to movies table for download embed links
ALTER TABLE public.movies 
ADD COLUMN IF NOT EXISTS download_url text;