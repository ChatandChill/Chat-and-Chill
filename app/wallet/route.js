import { createClient } from "@supabase/supabase-js"

const url = "https://kngpwddyquxrcfydlxkg.supabase.co"
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(url, key)

export async function GET(req){
  try{
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get("user_id") || "user_123"
    
    const { data } = await supabase.from("wallets").select("balance").eq("user_id", user_id).maybeSingle()
    
    if(data){
      return Response.json({ balance: data.balance, user_id })
    }
    // Auto-create if not found
    await supabase.from("wallets").insert({ user_id, balance: 10000 })
    return Response.json({ balance: 10000, user_id })
    
  }catch(e){
    return Response.json({ error: e.message, balance: 0 }, { status: 500 })
  }
}
