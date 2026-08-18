-- Migration Script: Create Reviews Table in Supabase
-- Run this in Supabase SQL Editor if table is not auto-created.

CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(20) NOT NULL DEFAULT 'website', -- 'website' | 'blog'
  blog_id UUID REFERENCES public.blogs(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email_or_mobile VARCHAR(255),
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  avatar_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected'
  admin_reply TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for quick lookup of approved reviews
CREATE INDEX IF NOT EXISTS idx_reviews_type_status ON public.reviews(type, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_blog_id_status ON public.reviews(blog_id, status, created_at DESC);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to approved reviews
CREATE POLICY "Allow public read approved reviews" ON public.reviews
  FOR SELECT USING (status = 'approved');

-- Allow public insert of reviews (always starts as pending)
CREATE POLICY "Allow public insert pending reviews" ON public.reviews
  FOR INSERT WITH CHECK (status = 'pending');

-- Allow service role / authenticated admin full access
CREATE POLICY "Allow service role full access reviews" ON public.reviews
  FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
