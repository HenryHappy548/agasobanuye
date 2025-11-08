-- Ensure admin@admin.com has admin role in user_roles table
-- This handles cases where the user was created before the role system existed

INSERT INTO public.user_roles (user_id, role)
SELECT 
  au.id,
  'admin'::app_role
FROM auth.users au
WHERE au.email IN ('admin@admin.com', 'admin@rwaflix.com')
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = au.id AND ur.role = 'admin'
  );