import { supabase } from '../lib/supabase';

export async function checkDatabaseSetup() {
  console.log('🔍 Checking Supabase database setup...');
  
  try {
    // Try to fetch from publications table
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .limit(1);
    
    if (error) {
      if (error.message.includes('relation "public.publications" does not exist')) {
        console.error('❌ DATABASE NOT SET UP!');
        console.error('The "publications" table does not exist in your Supabase database.');
        console.error('Please run the SQL script from SUPABASE_SETUP.md to create the table.');
        return {
          success: false,
          message: 'Database table "publications" does not exist. Please set up the database first.',
          needsSetup: true
        };
      }
      
      console.error('❌ Database error:', error);
      return {
        success: false,
        message: error.message,
        needsSetup: false
      };
    }
    
    console.log('✅ Database connection successful!');
    console.log('📊 Sample data:', data);
    
    return {
      success: true,
      message: 'Database is properly configured',
      needsSetup: false
    };
  } catch (err) {
    console.error('❌ Error checking database:', err);
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Unknown error',
      needsSetup: false
    };
  }
}

