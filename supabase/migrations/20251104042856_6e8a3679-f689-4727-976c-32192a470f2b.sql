-- Create function to limit comments to 50
CREATE OR REPLACE FUNCTION public.limit_comments_to_50()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  comment_count INTEGER;
  excess_count INTEGER;
BEGIN
  -- Count total comments
  SELECT COUNT(*) INTO comment_count FROM public.comments;
  
  -- If we have more than 50 comments, delete the oldest ones
  IF comment_count > 50 THEN
    excess_count := comment_count - 50;
    
    DELETE FROM public.comments
    WHERE id IN (
      SELECT id 
      FROM public.comments 
      ORDER BY created_at ASC 
      LIMIT excess_count
    );
    
    RAISE NOTICE 'Deleted % old comments to maintain 50 comment limit', excess_count;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to run after each comment insert
DROP TRIGGER IF EXISTS trigger_limit_comments ON public.comments;

CREATE TRIGGER trigger_limit_comments
  AFTER INSERT ON public.comments
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.limit_comments_to_50();