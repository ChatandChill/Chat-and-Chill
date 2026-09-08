import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req){
  const { user_id, amount } = await req.json()
  const { data } = await supabaseAdmin.from("wallets").select("balance").eq("user_id", user_id).maybeSingle()
  const newBalance = (data?.balance || 0) + Number(amount)
  await supabaseAdmin.from("wallets").upsert({ user_id, balance: newBalance })
  return Response.json({ balance: newBalance, success: true })
}
