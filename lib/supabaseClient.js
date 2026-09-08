import { createClient } from "@supabase/supabase-js"

const url = "https://kngpwddyquxrcfydlxkg.supabase.co"
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if(!anon) console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel")

export const supabaseAnon = createClient(url, anon)
export const supabaseAdmin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY || anon)
