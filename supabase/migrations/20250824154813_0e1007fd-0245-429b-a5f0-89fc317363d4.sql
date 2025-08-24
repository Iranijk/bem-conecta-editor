-- Criar tabela de voluntários
CREATE TABLE public.volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

-- Criar políticas para voluntários
CREATE POLICY "Todos podem se cadastrar como voluntário" 
ON public.volunteers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins podem ver todos os voluntários" 
ON public.volunteers 
FOR SELECT 
USING (true);

-- Criar tabela de posts do blog
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  cover_image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Criar políticas para posts do blog
CREATE POLICY "Todos podem ver posts publicados" 
ON public.blog_posts 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admins podem criar posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem editar posts" 
ON public.blog_posts 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem deletar posts" 
ON public.blog_posts 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Criar trigger para atualizar updated_at nos voluntários
CREATE TRIGGER update_volunteers_updated_at
BEFORE UPDATE ON public.volunteers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Criar trigger para atualizar updated_at nos posts
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();