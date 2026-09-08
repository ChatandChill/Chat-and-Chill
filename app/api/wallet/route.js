export const dynamic = 'force-dynamic'
import { createClient } from "@supabase/supabase-js"

export async function GET(req){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // Try service key first, fallback to anon
  const supabase = createClient(url, serviceKey || anonKey)
  
  const {searchParams} = new URL(req.url)
  const user_id = searchParams.get("user_id") || "user_123"

  // Get ALL wallets to debug
  const {data: allWallets, error: allError} = await supabase.from("wallets").select("*")
  
  // Get specific user
  const {data: oneWallet, error: oneError} = await supabase.from("wallets").select("balance").eq("user_id", user_id).maybeSingle()

  return Response.json({
    requested_user: user_id,
    specific_balance: oneWallet?.balance || 0,
    allWallets: allWallets,
    allError: allError?.message,
    oneError: oneError?.message,
    hasUrl: !!url,
    hasServiceKey: !!serviceKey
  }, {headers:{"Cache-Control":"no-store"}})
}
