-- Migration: Add site_settings table for configurable ad zones
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default vignette ad zones
INSERT INTO site_settings (id, value, description) VALUES
  ('vignette_zone_1', '10527776', 'First vignette ad zone ID'),
  ('vignette_zone_2', '10527843', 'Second vignette ad zone ID'),
  ('vignette_script_1', 'https://omg10.com/vignette.min.js', 'First vignette script URL'),
  ('vignette_script_2', 'https://nap5k.com/vignette.min.js', 'Second vignette script URL')
ON CONFLICT (id) DO NOTHING;