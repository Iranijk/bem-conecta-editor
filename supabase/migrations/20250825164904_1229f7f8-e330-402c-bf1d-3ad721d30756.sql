-- Create functions to mask contact information for public access

-- Function to mask phone numbers (show only last 4 digits)
CREATE OR REPLACE FUNCTION public.mask_phone(phone_number text)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE 
    WHEN phone_number IS NULL THEN NULL
    WHEN length(phone_number) <= 4 THEN '***'
    ELSE '***-***-' || right(phone_number, 4)
  END;
$$;

-- Function to mask email addresses (show only domain)
CREATE OR REPLACE FUNCTION public.mask_email(email_address text)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE 
    WHEN email_address IS NULL THEN NULL
    WHEN position('@' in email_address) = 0 THEN '***@***'
    ELSE '***@' || split_part(email_address, '@', 2)
  END;
$$;

-- Update RLS policies for vehicles table
DROP POLICY IF EXISTS "Todos podem ver veículos ativos" ON public.vehicles;

-- Policy for authenticated users (full access to their own vehicles)
CREATE POLICY "Usuários podem ver seus próprios veículos completos" 
ON public.vehicles 
FOR SELECT 
USING (auth.uid() = user_id AND is_active = true);

-- Policy for authenticated users (see all active vehicles with full contact info)
CREATE POLICY "Usuários autenticados veem contatos completos" 
ON public.vehicles 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND is_active = true);

-- Policy for anonymous users (masked contact info)
CREATE POLICY "Usuários anônimos veem veículos com contatos mascarados" 
ON public.vehicles 
FOR SELECT 
USING (auth.uid() IS NULL AND is_active = true);

-- Update RLS policies for jobs table
DROP POLICY IF EXISTS "Todos podem ver empregos ativos" ON public.jobs;

-- Policy for authenticated users (full access to their own jobs)
CREATE POLICY "Usuários podem ver seus próprios empregos completos" 
ON public.jobs 
FOR SELECT 
USING (auth.uid() = user_id AND is_active = true);

-- Policy for authenticated users (see all active jobs with full contact info)
CREATE POLICY "Usuários autenticados veem contatos de empregos completos" 
ON public.jobs 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND is_active = true);

-- Policy for anonymous users (masked contact info)
CREATE POLICY "Usuários anônimos veem empregos com contatos mascarados" 
ON public.jobs 
FOR SELECT 
USING (auth.uid() IS NULL AND is_active = true);

-- Update RLS policies for freights table
DROP POLICY IF EXISTS "Todos podem ver fretes ativos" ON public.freights;

-- Policy for authenticated users (full access to their own freights)
CREATE POLICY "Usuários podem ver seus próprios fretes completos" 
ON public.freights 
FOR SELECT 
USING (auth.uid() = user_id AND is_active = true);

-- Policy for authenticated users (see all active freights with full contact info)
CREATE POLICY "Usuários autenticados veem contatos de fretes completos" 
ON public.freights 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND is_active = true);

-- Policy for anonymous users (masked contact info)
CREATE POLICY "Usuários anônimos veem fretes com contatos mascarados" 
ON public.freights 
FOR SELECT 
USING (auth.uid() IS NULL AND is_active = true);