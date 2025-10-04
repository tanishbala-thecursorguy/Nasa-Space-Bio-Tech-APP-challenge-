import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Publication {
  id: string;
  title: string;
  summary: string;
  research_link: string;
  species: string[];
  missions: string[];
  year: number;
  created_at: string;
  updated_at: string;
}

export interface PublicationInsert {
  title: string;
  summary: string;
  research_link: string;
  species: string[];
  missions: string[];
  year: number;
}

