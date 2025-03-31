import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://otiiwxlfsrejhbrxdras.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90aWl3eGxmc3JlamhicnhkcmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NTEwMDYsImV4cCI6MjA0NDIyNzAwNn0.nnJooE-yfCzPgFEwnFyOvuM5uph0COetGaS5wdLiXX8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)