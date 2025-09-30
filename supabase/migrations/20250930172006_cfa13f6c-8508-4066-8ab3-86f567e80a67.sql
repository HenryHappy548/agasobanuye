-- Enable realtime for comments table
ALTER TABLE public.comments REPLICA IDENTITY FULL;

-- Add comments table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;