import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uatucafpgcjljhjvkrzg.supabase.co'; // TODO: Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhdHVjYWZwZ2NqbGpoanZrcnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwOTQ4MjcsImV4cCI6MjA2NzY3MDgyN30.MO6tJKNtBL6w2MYovPruF08rwMMcibQPFQFHK8pY44Y'; // TODO: Replace with your Supabase anon/public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 