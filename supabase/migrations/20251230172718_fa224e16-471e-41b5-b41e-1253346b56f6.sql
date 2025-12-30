-- Fix security error: stop public SELECT on poll_votes (it contains user_id/session_id)
-- and expose only aggregated results via SECURITY DEFINER functions.

-- 1) Tighten poll_votes read access
DROP POLICY IF EXISTS "Votes are publicly viewable" ON public.poll_votes;

CREATE POLICY "Admins can view votes"
ON public.poll_votes
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 2) Public RPC: aggregated results (no PII)
CREATE OR REPLACE FUNCTION public.poll_get_results()
RETURNS TABLE(series_name text, vote_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT pv.series_name, COUNT(*)::bigint AS vote_count
  FROM public.poll_votes pv
  GROUP BY pv.series_name
$$;

-- 3) Public RPC: check if a session already voted (no PII)
CREATE OR REPLACE FUNCTION public.poll_has_voted(_session_id text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.poll_votes
    WHERE session_id = _session_id
  )
$$;

-- 4) Allow public execution of the safe RPCs
GRANT EXECUTE ON FUNCTION public.poll_get_results() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.poll_has_voted(text) TO anon, authenticated;
