import { createClient } from '@supabase/supabase-js'

export async function POST(req) {
  try {
    const { reference, user_id } = await req.json()
    const secret = process.env.PAYSTACK_SECRET_KEY
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${secret}` }
    })
    const verifyJson = await verifyRes.json()
    if (!verifyJson.status || verifyJson.data.status !== 'success') {
      return Response.json({ success: false, error: 'Paystack failed' }, { status: 400 })
    }
    const amountPaid = verifyJson.data.amount / 100
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const finalUserId = user_id || 'user_123'
    const { data: existing } = await supabase.from('wallets').select('balance').eq('user_id', finalUserId).single()
    const newBalance = (existing?.balance || 0) + amountPaid
    
    // Only update wallets - no transactions to avoid fail
    const { error } = await supabase.from('wallets').upsert(
      { user_id: finalUserId, balance: newBalance },
      { onConflict: 'user_id' }
    )
    if (error) return Response.json({ success: false, error: 'DB update failed: ' + error.message }, { status: 500 })
    
    return Response.json({ success: true, balance: newBalance, amountPaid, oldBalance: existing?.balance || 0 })
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 })
  }
}
