import { createClient } from '@supabase/supabase-js';

// Vite uses VITE_ prefix for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '⚠️ Missing Supabase configuration! App will not function correctly.\n' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}

// Use fallbacks to prevent crash, but requests will fail
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseKey || 'placeholder';

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseKey;
export const supabase = createClient(url, key);