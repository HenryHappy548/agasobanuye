-- Create page_visits table for tracking total website visitors
CREATE TABLE public.page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL DEFAULT '/',
  visited_at timestamp with time zone NOT NULL DEFAULT now(),
  user_agent text,
  referrer text
);

ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log page visits" ON public.page_visits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can read page visits" ON public.page_visits
  FOR SELECT USING (public.is_admin());

CREATE OR REPLACE FUNCTION public.get_daily_visit_counts(days_back integer DEFAULT 30)
RETURNS TABLE(visit_date date, visit_count bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT DATE(visited_at) as visit_date, COUNT(*)::bigint as visit_count
  FROM public.page_visits
  WHERE visited_at >= (now() - (days_back || ' days')::interval)
  GROUP BY DATE(visited_at)
  ORDER BY visit_date ASC
$$;

CREATE OR REPLACE FUNCTION public.get_total_visit_count()
RETURNS bigint
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT COUNT(*)::bigint FROM public.page_visits
$$;