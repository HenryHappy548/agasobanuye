-- Create table for tracking affiliate product clicks
CREATE TABLE public.affiliate_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  category TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  referrer TEXT
);

-- Enable RLS
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert clicks (public tracking)
CREATE POLICY "Anyone can log affiliate clicks"
ON public.affiliate_clicks
FOR INSERT
WITH CHECK (true);

-- Only admins can view clicks
CREATE POLICY "Admins can view affiliate clicks"
ON public.affiliate_clicks
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);