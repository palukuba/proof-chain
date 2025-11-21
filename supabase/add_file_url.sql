-- Add file_url column to documents table
ALTER TABLE public.documents 
ADD COLUMN IF NOT EXISTS file_url TEXT;
