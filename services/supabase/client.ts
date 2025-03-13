import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Config from '../../constants/Config';

// Get values from Config, or use fallback values for development
const supabaseUrl = Config.api.supabaseUrl || 'https://example.supabase.co';
const supabaseAnonKey = Config.api.supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjQyMjY0MiwiZXhwIjoxOTMyMDg0NjQyfQ.mock-key-for-development';

if (!Config.api.supabaseUrl || !Config.api.supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Using mock values for development. Please set up your .env file with actual values.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase; 