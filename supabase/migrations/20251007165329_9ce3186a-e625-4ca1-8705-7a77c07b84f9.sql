-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Update is_admin function to use new roles table
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

-- Migrate existing admin roles from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT user_id, 'admin'::app_role
FROM public.profiles
WHERE role = 'admin'
ON CONFLICT (user_id, role) DO NOTHING;

-- Create videos table for embed codes and download links
CREATE TABLE public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  embed_code TEXT NOT NULL,
  host TEXT,
  thumbnail_url TEXT,
  season INTEGER,
  episode INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create download_links table
CREATE TABLE public.download_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE NOT NULL,
  quality TEXT NOT NULL,
  size TEXT,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'MP4',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on videos
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Videos are publicly viewable
CREATE POLICY "Videos are publicly viewable"
ON public.videos
FOR SELECT
USING (true);

-- Only admins can manage videos
CREATE POLICY "Admins can manage videos"
ON public.videos
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Enable RLS on download_links
ALTER TABLE public.download_links ENABLE ROW LEVEL SECURITY;

-- Download links are publicly viewable
CREATE POLICY "Download links are publicly viewable"
ON public.download_links
FOR SELECT
USING (true);

-- Only admins can manage download links
CREATE POLICY "Admins can manage download links"
ON public.download_links
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at on videos
CREATE TRIGGER update_videos_updated_at
BEFORE UPDATE ON public.videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();