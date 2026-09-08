import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://kngpwddyquxrcfydlxkg.supabase.co"
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZ3B3ZGR5cXV4cmNmeWRseGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY... your full anon key"
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || anonKey

export const supabaseAnon = createClient(url, anonKey)
export const supabaseAdmin = createClient(url, serviceKey)
export const supabase = supabaseAnon
