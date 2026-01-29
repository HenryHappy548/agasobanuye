-- Create premium_codes table for storing client access codes
CREATE TABLE public.premium_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  client_phone TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create premium_movies table for storing premium/undubbed content
CREATE TABLE public.premium_movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  poster_url TEXT,
  video_url TEXT,
  download_url TEXT,
  year TEXT,
  genre TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create junction table to link codes to movies (many-to-many)
CREATE TABLE public.premium_code_movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code_id UUID NOT NULL REFERENCES public.premium_codes(id) ON DELETE CASCADE,
  movie_id UUID NOT NULL REFERENCES public.premium_movies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(code_id, movie_id)
);

-- Enable RLS on all tables
ALTER TABLE public.premium_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_code_movies ENABLE ROW LEVEL SECURITY;

-- RLS policies for premium_codes
-- Only admins can manage codes
CREATE POLICY "Admins can manage premium codes"
  ON public.premium_codes FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- RLS policies for premium_movies
-- Only admins can manage premium movies
CREATE POLICY "Admins can manage premium movies"
  ON public.premium_movies FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- RLS policies for premium_code_movies
-- Only admins can manage the junction table
CREATE POLICY "Admins can manage code-movie links"
  ON public.premium_code_movies FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Create security definer function to validate code and get movies (bypasses RLS safely)
CREATE OR REPLACE FUNCTION public.validate_premium_code(access_code TEXT)
RETURNS TABLE (
  movie_id UUID,
  title TEXT,
  description TEXT,
  poster_url TEXT,
  video_url TEXT,
  download_url TEXT,
  year TEXT,
  genre TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  code_record RECORD;
BEGIN
  -- Validate the code exists and is active
  SELECT id, is_active INTO code_record
  FROM premium_codes
  WHERE code = access_code;
  
  IF NOT FOUND OR NOT code_record.is_active THEN
    RETURN;
  END IF;
  
  -- Return movies linked to this code
  RETURN QUERY
  SELECT 
    pm.id AS movie_id,
    pm.title,
    pm.description,
    pm.poster_url,
    pm.video_url,
    pm.download_url,
    pm.year,
    pm.genre
  FROM premium_movies pm
  INNER JOIN premium_code_movies pcm ON pm.id = pcm.movie_id
  WHERE pcm.code_id = code_record.id;
END;
$$;

-- Create function to generate secure codes (admin only)
CREATE OR REPLACE FUNCTION public.generate_premium_code(client_name_input TEXT, client_phone_input TEXT DEFAULT NULL)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_code TEXT;
  random_part TEXT;
BEGIN
  -- Check if caller is admin
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized: Admin access required';
  END IF;
  
  -- Generate secure code: RWAFLIX-[random alphanumeric]
  random_part := upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 8));
  new_code := 'RWAFLIX-' || random_part;
  
  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM premium_codes WHERE code = new_code) LOOP
    random_part := upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 8));
    new_code := 'RWAFLIX-' || random_part;
  END LOOP;
  
  -- Insert the new code
  INSERT INTO premium_codes (code, client_name, client_phone)
  VALUES (new_code, client_name_input, client_phone_input);
  
  RETURN new_code;
END;
$$;

-- Trigger to update updated_at
CREATE TRIGGER update_premium_codes_updated_at
  BEFORE UPDATE ON public.premium_codes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_premium_movies_updated_at
  BEFORE UPDATE ON public.premium_movies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();