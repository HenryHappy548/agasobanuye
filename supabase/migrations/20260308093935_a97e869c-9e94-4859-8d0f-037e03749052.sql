
CREATE TABLE public.whatsapp_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  name text,
  subscribed_at timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  UNIQUE (phone)
);

ALTER TABLE public.whatsapp_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe" ON public.whatsapp_subscribers
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Admins can view subscribers
CREATE POLICY "Admins can view subscribers" ON public.whatsapp_subscribers
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage subscribers
CREATE POLICY "Admins can manage subscribers" ON public.whatsapp_subscribers
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
