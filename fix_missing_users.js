/**
 * Fix Missing Users Script
 * 
 * This script helps fix the issue where users exist in auth.users but not in public.users.
 * It creates corresponding records in the public.users table for any auth users that don't have one.
 * 
 * Usage:
 * 1. Make sure you have Node.js installed
 * 2. Run: npm install @supabase/supabase-js dotenv
 * 3. Run: node fix_missing_users.js
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL or key is missing. Please check your .env file.');
  process.exit(1);
}

// Create Supabase client with service role key (requires admin access)
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixMissingUsers() {
  try {
    console.log('Checking for missing user records...');
    
    // Execute SQL to create missing user records
    const { error } = await supabase.rpc('exec_sql', { 
      sql: `
        INSERT INTO public.users (id, email, created_at, updated_at)
        SELECT id, email, created_at, created_at
        FROM auth.users
        WHERE id NOT IN (SELECT id FROM public.users);
      `
    });
    
    if (error) {
      console.error('Error fixing missing users:', error.message);
      console.log('\nAlternative method:');
      console.log('1. Go to your Supabase dashboard: https://app.supabase.com/');
      console.log('2. Navigate to the SQL Editor');
      console.log('3. Create a new query and paste the following SQL:');
      console.log(`
        INSERT INTO public.users (id, email, created_at, updated_at)
        SELECT id, email, created_at, created_at
        FROM auth.users
        WHERE id NOT IN (SELECT id FROM public.users);
      `);
      console.log('4. Run the query manually');
      process.exit(1);
    }
    
    console.log('Successfully fixed missing user records!');
    
  } catch (error) {
    console.error('Unexpected error:', error.message);
    process.exit(1);
  }
}

// Execute the fix
fixMissingUsers(); 