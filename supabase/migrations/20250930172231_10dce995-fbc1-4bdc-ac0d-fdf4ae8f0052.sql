-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can insert comments" ON public.comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;

-- Alter comments table to make user_id nullable and not required
ALTER TABLE public.comments ALTER COLUMN user_id DROP NOT NULL;

-- Create new policy allowing anyone to insert comments
CREATE POLICY "Anyone can insert comments"
ON public.comments
FOR INSERT
WITH CHECK (true);