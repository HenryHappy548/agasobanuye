-- Create poll votes table
CREATE TABLE public.poll_votes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  series_name text NOT NULL,
  voted_at timestamp with time zone NOT NULL DEFAULT now(),
  session_id text NOT NULL,
  CONSTRAINT valid_series CHECK (series_name IN ('Vincenzo', 'Game of Witches', 'Siren', 'Blood River'))
);

-- Enable RLS
ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert votes
CREATE POLICY "Anyone can vote"
ON public.poll_votes
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view votes (for percentage calculation)
CREATE POLICY "Votes are publicly viewable"
ON public.poll_votes
FOR SELECT
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_poll_votes_session ON public.poll_votes(session_id);
CREATE INDEX idx_poll_votes_series ON public.poll_votes(series_name);