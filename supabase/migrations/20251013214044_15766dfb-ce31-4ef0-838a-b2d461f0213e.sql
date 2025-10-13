-- Make user_id nullable to allow anonymous comments
ALTER TABLE public.comments 
ALTER COLUMN user_id DROP NOT NULL;

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert comments" ON public.comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;

-- Create new policies that allow anonymous comments
CREATE POLICY "Anyone can insert comments"
ON public.comments
FOR INSERT
WITH CHECK (true);

-- Users can only update their own comments (if authenticated)
CREATE POLICY "Users can update own comments"
ON public.comments
FOR UPDATE
USING (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
  (auth.uid() IS NULL AND user_id IS NULL)
);

-- Users can only delete their own comments (if authenticated)
CREATE POLICY "Users can delete own comments"
ON public.comments
FOR DELETE
USING (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
  (auth.uid() IS NULL AND user_id IS NULL)
);