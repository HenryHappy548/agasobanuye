-- Add phone column to contact_messages table for WhatsApp numbers
ALTER TABLE public.contact_messages 
ADD COLUMN IF NOT EXISTS phone text;