-- Update the handle_new_user function to recognize admin@rwaflix.com as admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, username, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1)),
    CASE 
      WHEN NEW.email IN ('admin@admin.com', 'admin@rwaflix.com') THEN 'admin'
      ELSE 'user'
    END
  );
  RETURN NEW;
END;
$function$;