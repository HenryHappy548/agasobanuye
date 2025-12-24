ALTER TABLE public.comments
ADD COLUMN IF NOT EXISTS movie_key text;

CREATE INDEX IF NOT EXISTS idx_comments_movie_key ON public.comments(movie_key);
