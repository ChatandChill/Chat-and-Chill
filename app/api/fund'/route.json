import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(req) {
  try {
    const { reference, user_id } = await req.json()
    const verify = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    })
    const data = await verify.json()
    if (data.data?.status !== 'success') {
      return Response.json({ error: 'Verify failed' }, { status: 400 })
    }
    const amount = data.data.amount / 100
    const { data: w } = await supabase.from('wallets').select('*').eq('user_id', user_id).single()
    const newBal = (w?.balance || 0) + amount
    await supabase.from('wallets').upsert({ user_id, balance: newBal }, { onConflict: 'user_id' })
    return Response.json({ success: true, balance: newBal })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
