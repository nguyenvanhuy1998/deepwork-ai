# Database Setup Instructions

## Issue Fixed
This guide addresses the error: `relation "public.users" does not exist`

## Overview
The application is using Supabase as its backend database, but the required database tables have not been created yet. This document provides instructions on how to set up the necessary database tables in your Supabase project.

## Prerequisites
- Access to your Supabase project dashboard
- Admin privileges to run SQL queries in Supabase

## Setup Instructions

### Option 1: Using the Supabase Dashboard

1. Log in to your Supabase dashboard at https://app.supabase.com/
2. Select your project
3. Navigate to the SQL Editor section
4. Create a new query
5. Copy and paste the contents of the `supabase_migration.sql` file into the SQL editor
6. Run the query

### Option 2: Using the Supabase CLI

If you have the Supabase CLI installed, you can run the migration using the following commands:

1. Make sure you're logged in to the Supabase CLI:
   ```
   supabase login
   ```

2. Link your local project to your Supabase project:
   ```
   supabase link --project-ref <your-project-ref>
   ```
   (You can find your project reference in the Supabase dashboard URL)

3. Run the migration:
   ```
   supabase db push
   ```

### Option 3: Using the Setup Script

We've provided a Node.js script to help set up the database:

1. Make sure you have Node.js installed
2. Install the required packages:
   ```
   npm install @supabase/supabase-js dotenv
   ```

3. Run the setup script:
   ```
   node setup_database.js
   ```

## Database Schema

The migration creates the following tables:

1. `users` - Stores user profile information
2. `tasks` - Stores task information
3. `focus_sessions` - Stores focus session data
4. `productivity_insights` - Stores AI-generated productivity insights
5. `achievements` - Stores user achievements
6. `tags` - Stores task tags
7. `notifications` - Stores user notifications

## Automatic User Creation

The migration also sets up triggers to:

1. Automatically create a record in the `public.users` table when a new user signs up through Supabase Auth
2. Update the `last_login` timestamp in the `public.users` table when a user signs in

This ensures that user profile data is properly maintained without requiring manual intervention.

## Row Level Security (RLS)

The migration also sets up Row Level Security policies for all tables to ensure that users can only access their own data.

## Troubleshooting

### Error: "JSON object requested, multiple (or no) rows returned"

If you encounter this error, it means that there are users in the auth system but no corresponding records in the public.users table. To fix this issue:

1. Run the fix_missing_users.js script:
   ```
   node fix_missing_users.js
   ```

2. Alternatively, you can run the following SQL query in the Supabase SQL Editor:
   ```sql
   INSERT INTO public.users (id, email, created_at, updated_at)
   SELECT id, email, created_at, created_at
   FROM auth.users
   WHERE id NOT IN (SELECT id FROM public.users);
   ```

### Other Issues

If you encounter any other issues during the setup:

1. Check that your Supabase project is properly configured
2. Verify that you have the necessary permissions to create tables
3. If you're using the Supabase CLI, ensure it's properly installed and configured

For more detailed information about the database schema, refer to the `docs/CONTEXT.md` file in the project.

## After Setup

Once the database tables are created, the application should work correctly. The error "relation 'public.users' does not exist" should no longer appear.

## Existing Users

If you already have users in your Supabase Auth system but no corresponding records in the `public.users` table, you can run the `fix_missing_users.js` script to create those records:

```bash
# Install required packages
npm install @supabase/supabase-js dotenv

# Run the fix script
node fix_missing_users.js
```

This will create basic user records for all existing auth users who don't already have a record in the public.users table. 