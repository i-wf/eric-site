-- Create a table for storing site configuration
CREATE TABLE IF NOT EXISTS site_config (
  id SERIAL PRIMARY KEY,
  config JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the config
CREATE POLICY "Public read access" ON site_config
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to update the config (you may want to restrict this)
CREATE POLICY "Public update access" ON site_config
  FOR UPDATE
  TO public
  USING (true);

-- Allow anyone to insert the config
CREATE POLICY "Public insert access" ON site_config
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert initial config row
INSERT INTO site_config (config)
VALUES ('{}')
ON CONFLICT DO NOTHING;
