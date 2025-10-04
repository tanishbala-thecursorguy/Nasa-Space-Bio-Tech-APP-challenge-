import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://tabypkvcyymiidrghhvc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhYnlwa3ZjeXltaWlkcmdoaHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NjcxNzksImV4cCI6MjA3NTE0MzE3OX0.-V6t0jNoviCnK_Y9q-0CeiX1EhNdclf90GesPfwFK7w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Publication {
  id: string;
  author_name: string;
  project_name: string;
  summary: string;
  project_link: string;
  species: string[];
  missions: string[];
  year: number;
  created_at: string;
  updated_at: string;
}

export interface PublicationInsert {
  author_name: string;
  project_name: string;
  summary: string;
  project_link: string;
  species: string[];
  missions: string[];
  year: number;
}

