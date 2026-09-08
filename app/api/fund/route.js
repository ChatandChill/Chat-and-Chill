import { supabaseAdmin } from "../../../lib/supabaseClient"
export async function POST(req){
  const { user_id, amount } = await req.json()
  const { data } = await supabaseAdmin.from("wallets").select("balance").eq("user_id", user_id).maybeSingle()
  const newBal = (data?.balance || 0) + Number(amount)
  await supabaseAdmin.from("wallets").upsert({ user_id, balance: newBal })
  return Response.json({ balance: newBal })
}
