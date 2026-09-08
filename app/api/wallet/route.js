import { createClient } from "@supabase/supabase-js"
export async function GET(req){
  const { searchParams } = new URL(req.url)
  const user_id = searchParams.get("user_id") || "user_123"
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY
  const supabase = createClient(url, key)
  const { data } = await supabase.from("wallets").select("balance").eq("user_id", user_id).maybeSingle()
  return Response.json({ balance: data?.balance ?? 0 })
}
