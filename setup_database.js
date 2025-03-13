/**
 * Database Setup Script
 * 
 * This script helps set up the database tables for the DeepWork AI application.
 * It reads the SQL migration file and executes it against your Supabase project.
 * 
 * Usage:
 * 1. Make sure you have Node.js installed
 * 2. Run: npm install @supabase/supabase-js dotenv
 * 3. Run: node setup_database.js
 */

require('dotenv').config();
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL or key is missing. Please check your .env file.');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('Reading migration file...');
    const migrationSQL = fs.readFileSync('./supabase_migration.sql', 'utf8');
    
    console.log('Executing migration...');
    const { error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
    
    if (error) {
      console.error('Error executing migration:', error.message);
      console.log('\nAlternative method:');
      console.log('1. Go to your Supabase dashboard: https://app.supabase.com/');
      console.log('2. Navigate to the SQL Editor');
      console.log('3. Create a new query and paste the contents of supabase_migration.sql');
      console.log('4. Run the query manually');
      process.exit(1);
    }
    
    console.log('Migration completed successfully!');
    console.log('The database tables have been created.');
    
  } catch (error) {
    console.error('Unexpected error:', error.message);
    process.exit(1);
  }
}

// Execute the setup
setupDatabase(); 