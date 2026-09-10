import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

const isValid = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('placeholder.supabase.co') &&
    !supabaseAnonKey.includes('placeholder') &&
    supabaseAnonKey.length > 40
)

if (!isValid) {
  console.warn('Missing or invalid Supabase env vars; frontend client is running in safe demo mode.')
}

export const supabase = isValid
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null