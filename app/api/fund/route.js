import { createClient } from "@supabase/supabase-js"

export async function POST(req){
  try{
    const { user_id, amount } = await req.json()
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    const supabase = createClient(url, key)
    
    const { data: wallet } = await supabase.from("wallets").select("balance").eq("user_id", user_id).maybeSingle()
    const newBalance = (wallet?.balance || 0) + amount
    
    await supabase.from("wallets").upsert({ user_id, balance: newBalance })
    
    return Response.json({ balance: newBalance, success: true })
  }catch(e){
    return Response.json({ error: e.message }, { status: 500 })
  }
}
