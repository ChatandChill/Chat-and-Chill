import { createClient } from '@supabase/supabase-js'
import { hasValidSupabaseConfig } from './runtimeStatus'

export function createAdminClient() {
  if (!hasValidSupabaseConfig()) return null
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}