import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_DATABASE_API_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Failed to create Supabase client');
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
