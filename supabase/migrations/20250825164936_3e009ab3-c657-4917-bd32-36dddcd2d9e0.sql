-- Fix function security issues by setting search_path

-- Update mask_phone function with security definer and search_path
CREATE OR REPLACE FUNCTION public.mask_phone(phone_number text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT CASE 
    WHEN phone_number IS NULL THEN NULL
    WHEN length(phone_number) <= 4 THEN '***'
    ELSE '***-***-' || right(phone_number, 4)
  END;
$$;

-- Update mask_email function with security definer and search_path
CREATE OR REPLACE FUNCTION public.mask_email(email_address text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT CASE 
    WHEN email_address IS NULL THEN NULL
    WHEN position('@' in email_address) = 0 THEN '***@***'
    ELSE '***@' || split_part(email_address, '@', 2)
  END;
$$;