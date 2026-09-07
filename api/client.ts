 
// ============================================
// Supabase Client Configuration
// All API files import from here
// ============================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get these from your Supabase dashboard (Settings → API)
// For local development, use environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gmvmulxwnwcwdaxehvrh.supabase.co/';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdtdm11bHh3bndjd2RheGVodnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NzMxNzgsImV4cCI6MjEwNDM0OTE3OH0.3x5MMI6c-o0sctOJJekhMVF1C01Sx13JOt3SIbqaGPA';

// Create and export the client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Export a type for the client (so TypeScript knows what's available)
export type SupabaseClientType = SupabaseClient;