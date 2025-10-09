-- Step 1: Delete existing anonymous comments (they're security risks anyway)
DELETE FROM public.comments WHERE user_id IS NULL;

-- Step 2: Make user_id NOT NULL
ALTER TABLE public.comments 
ALTER COLUMN user_id SET NOT NULL;

-- Step 3: Drop the old anonymous insert policy
DROP POLICY IF EXISTS "Anyone can insert comments" ON public.comments;

-- Step 4: Create authenticated-only policies
CREATE POLICY "Authenticated users can insert comments" 
ON public.comments 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
ON public.comments 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
ON public.comments 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Step 5: Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Step 6: Performance indexes
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_movies_category ON public.movies(category);
CREATE INDEX IF NOT EXISTS idx_movies_featured ON public.movies(featured) WHERE featured = true;