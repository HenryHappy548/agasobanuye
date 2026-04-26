-- Migration: Add site_settings table for configurable ad zones and timers
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default vignette ad zones and delays
INSERT INTO site_settings (id, value, description) VALUES
  ('vignette_zone_1', '10527776', 'First vignette ad zone ID'),
  ('vignette_zone_2', '10527843', 'Second vignette ad zone ID'),
  ('vignette_script_1', 'https://omg10.com/vignette.min.js', 'First vignette script URL'),
  ('vignette_script_2', 'https://nap5k.com/vignette.min.js', 'Second vignette script URL'),
  ('vignette_delay_1', '5000', 'First vignette delay in ms'),
  ('vignette_delay_2', '8000', 'Second vignette delay in ms')
ON CONFLICT (id) DO NOTHING;