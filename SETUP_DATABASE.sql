-- =====================================================
-- NASA Space Biology Dashboard - Database Setup
-- =====================================================
-- This script creates the publications table with all necessary
-- configurations for the real-time post feature.
-- =====================================================

-- Drop existing table if it exists (be careful with this in production!)
DROP TABLE IF EXISTS publications CASCADE;

-- Create the publications table
CREATE TABLE publications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    summary TEXT NOT NULL,
    project_link TEXT NOT NULL,
    species TEXT[] NOT NULL,
    missions TEXT[] NOT NULL,
    year INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow SELECT for everyone
CREATE POLICY "Allow public read access" 
ON publications FOR SELECT 
USING (true);

-- Create policy to allow INSERT for everyone
CREATE POLICY "Allow public insert access" 
ON publications FOR INSERT 
WITH CHECK (true);

-- Create policy to allow UPDATE for everyone
CREATE POLICY "Allow public update access" 
ON publications FOR UPDATE 
USING (true);

-- Create policy to allow DELETE for everyone
CREATE POLICY "Allow public delete access" 
ON publications FOR DELETE 
USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_publications_updated_at ON publications;
CREATE TRIGGER update_publications_updated_at 
    BEFORE UPDATE ON publications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for better query performance
CREATE INDEX idx_publications_created_at ON publications(created_at DESC);
CREATE INDEX idx_publications_year ON publications(year);
CREATE INDEX idx_publications_species ON publications USING GIN(species);
CREATE INDEX idx_publications_missions ON publications USING GIN(missions);

-- Insert a test publication to verify everything works
INSERT INTO publications (
    author_name,
    project_name,
    summary,
    project_link,
    species,
    missions,
    year
) VALUES (
    'NASA Research Team',
    'Effects of Microgravity on Human Cells',
    'This groundbreaking study examines how microgravity conditions on the International Space Station affect human cellular processes. The research provides crucial insights for long-duration space missions and potential medical applications on Earth.',
    'https://www.nasa.gov/mission_pages/station/research/benefits/human_cells.html',
    ARRAY['Humans'],
    ARRAY['ISS'],
    2024
);

-- Verify the table was created successfully
SELECT 
    'Table created successfully!' as status,
    COUNT(*) as test_records
FROM publications;

-- Show table structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'publications'
ORDER BY ordinal_position;

