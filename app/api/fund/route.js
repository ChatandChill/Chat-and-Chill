import { createClient } from "@supabase/supabase-js"

const url = "https://kngpwddyquxrcfydlxkg.supabase.co"
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(url, key)

export async function POST(req){
  try{
    const { user_id = "user_123", amount } = await req.json()
    const amt = Number(amount)
    
    if(!amt) return Response.json({ error: "Amount is 0" }, { status: 400 })

    const { data: existing } = await supabase.from("wallets").select("balance").eq("user_id", user_id).maybeSingle()
    const current = existing?.balance || 0
    const newBal = current + amt

    const { data, error } = await supabase.from("wallets").upsert({ user_id, balance: newBal }, { onConflict: 'user_id' }).select().single()
    
    if(error) return Response.json({ error: error.message }, { status: 500 })
    
    return Response.json({ success: true, balance: data.balance })
  }catch(e){
    return Response.json({ error: e.message }, { status: 500 })
  }
}
