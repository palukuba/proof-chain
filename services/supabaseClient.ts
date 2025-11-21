import { createClient } from '@supabase/supabase-js';

// Vite uses VITE_ prefix for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    '❌ Missing Supabase configuration!\n' +
    'Please create a .env file with:\n' +
    '  VITE_SUPABASE_URL=your-project-url\n' +
    '  VITE_SUPABASE_ANON_KEY=your-anon-key\n' +
    'See .env.example for details.'
  );
  throw new Error('Supabase configuration is required. Check console for details.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);