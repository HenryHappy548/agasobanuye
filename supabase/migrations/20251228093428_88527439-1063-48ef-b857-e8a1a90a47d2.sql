-- Add unique constraint on affiliate_link column for upsert operations
ALTER TABLE public.products ADD CONSTRAINT products_affiliate_link_key UNIQUE (affiliate_link);