import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://kngpwddyquxrcfydlxkg.supabase.co"

const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
                process.env.SUPABASE_PUBLISHABLE_KEY

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                   process.env.SUPABASE_SECRET_KEY || 
                   anonKey

export const supabaseAnon = createClient(url, anonKey)
export const supabaseAdmin = createClient(url, serviceKey)

// For old code that does: import { supabase } from "@/lib/supabase"
export const supabase = supabaseAnon
