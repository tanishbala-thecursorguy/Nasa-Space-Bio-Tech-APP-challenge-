# Supabase Database Setup Guide

This guide will help you set up the Supabase database table for the NASA Space Biology Dashboard.

## Prerequisites

- Supabase account at [supabase.com](https://supabase.com)
- Project already created (URL: https://tabypkvcyymiidrghhvc.supabase.co)

## Step 1: Create Environment File

Create a `.env` file in the project root with the following content:

```env
VITE_SUPABASE_URL=https://tabypkvcyymiidrghhvc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhYnlwa3ZjeXltaWlkcmdoaHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NjcxNzksImV4cCI6MjA3NTE0MzE3OX0.-V6t0jNoviCnK_Y9q-0CeiX1EhNdclf90GesPfwFK7w
```

**⚠️ IMPORTANT: Never commit the `.env` file to Git. It's already in `.gitignore`.**

## Step 2: Create Publications Table

Go to your Supabase project dashboard and run the following SQL query in the SQL Editor:

```sql
-- Create publications table
CREATE TABLE publications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  research_link TEXT NOT NULL,
  species TEXT[] NOT NULL,
  missions TEXT[] NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 2015 AND year <= 2025),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for better query performance
CREATE INDEX idx_publications_year ON publications(year);
CREATE INDEX idx_publications_species ON publications USING GIN(species);
CREATE INDEX idx_publications_missions ON publications USING GIN(missions);
CREATE INDEX idx_publications_created_at ON publications(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
  ON publications
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow public insert access
CREATE POLICY "Allow public insert access"
  ON publications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow public update access
CREATE POLICY "Allow public update access"
  ON publications
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_publications_updated_at
  BEFORE UPDATE ON publications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Step 3: Verify Table Creation

After running the SQL, verify that:
1. The `publications` table appears in your Tables section
2. RLS is enabled
3. Policies are active

## Step 4: Test the Connection

1. Restart your development server if it's running:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. Open the app at http://localhost:3000
3. Click the "Post" button in the top navigation
4. Fill out the form and submit a test publication

## Table Schema Reference

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `title` | TEXT | Publication title (required) |
| `summary` | TEXT | Publication summary (required) |
| `research_link` | TEXT | URL to research paper (required) |
| `species` | TEXT[] | Array of species (Humans, Animals, Cell Lines, Plants, Microbes) |
| `missions` | TEXT[] | Array of mission types (ISS, Moon Simulations, etc.) |
| `year` | INTEGER | Year (2015-2025) |
| `created_at` | TIMESTAMP | Auto-generated creation timestamp |
| `updated_at` | TIMESTAMP | Auto-updated modification timestamp |

## Filtering Capabilities

The app supports filtering by:
- **Species**: Multiple selection from predefined options
- **Mission Types**: Multiple selection from predefined options
- **Year Range**: Slider from 2015 to 2025

## Security Notes

- RLS (Row Level Security) is enabled for data protection
- Public policies allow anyone to read, insert, and update publications
- For production, you should modify policies based on your authentication requirements
- The anon key is safe to use client-side as it respects RLS policies

## Troubleshooting

### Connection Issues
- Verify your Supabase URL and anon key in `.env`
- Check that the `.env` file is in the project root
- Restart the dev server after creating/modifying `.env`

### Table Not Found
- Ensure you ran the SQL query completely
- Check the Supabase dashboard for any error messages
- Verify the table exists in the "Table Editor" section

### RLS Errors
- Make sure RLS policies were created successfully
- Check the "Authentication > Policies" section in Supabase
- Temporarily disable RLS for testing (not recommended for production)

## Sample Data

To add sample data, you can run this in the SQL Editor:

```sql
INSERT INTO publications (title, summary, research_link, species, missions, year)
VALUES
  (
    'Effects of Microgravity on Human Bone Density',
    'This study examines the impact of prolonged exposure to microgravity on astronaut bone density during ISS missions. Results show significant bone loss in lower extremities.',
    'https://example.com/bone-density-study',
    ARRAY['Humans'],
    ARRAY['ISS', 'Microgravity Studies'],
    2023
  ),
  (
    'Plant Growth in Lunar Regolith Simulant',
    'Research on growing various plant species in lunar soil simulant to support future Moon base food production systems.',
    'https://example.com/lunar-plants',
    ARRAY['Plants'],
    ARRAY['Moon Simulations'],
    2024
  );
```

## Next Steps

1. Test adding publications through the UI
2. Test filtering by species, missions, and year
3. Click on publications to view full details
4. Set up authentication if needed for user-specific features

For more information, visit the [Supabase Documentation](https://supabase.com/docs).

