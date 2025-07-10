import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://uatucafpgcjljhjvkrzg.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhdHVjYWZwZ2NqbGpoanZrcnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwOTQ4MjcsImV4cCI6MjA2NzY3MDgyN30.MO6tJKNtBL6w2MYovPruF08rwMMcibQPFQFHK8pY44Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 