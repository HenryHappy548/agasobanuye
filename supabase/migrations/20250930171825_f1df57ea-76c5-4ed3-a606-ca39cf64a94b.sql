-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Anyone can view comments
CREATE POLICY "Comments are publicly viewable"
ON public.comments
FOR SELECT
USING (true);

-- Authenticated users can insert comments
CREATE POLICY "Authenticated users can insert comments"
ON public.comments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete their own comments"
ON public.comments
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_comments_created_at ON public.comments(created_at DESC);