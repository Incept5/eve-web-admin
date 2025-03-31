import { createClient } from '@supabase/supabase-js'

// Use environment variables or fallback to hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://otiiwxlfsrejhbrxdras.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90aWl3eGxmc3JlamhicnhkcmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NTEwMDYsImV4cCI6MjA0NDIyNzAwNn0.nnJooE-yfCzPgFEwnFyOvuM5uph0COetGaS5wdLiXX8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)