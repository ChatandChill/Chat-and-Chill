import { createClient } from '@supabase/supabase-js'

export async function POST(req) {
  try {
    const { reference, user_id } = await req.json()

    if (!reference) {
      return Response.json({ success: false, error: 'No reference sent' }, { status: 400 })
    }

    // 1. VERIFY WITH PAYSTACK - REAL MONEY CHECK
    const secretKey = process.env.PAYSTACK_SECRET_KEY
    if (!secretKey) {
      return Response.json({ success: false, error: 'PAYSTACK_SECRET_KEY missing in Vercel env' }, { status: 500 })
    }

    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    })

    const verifyJson = await verifyRes.json()
    console.log('PAYSTACK VERIFY:', verifyJson)

    if (!verifyJson.status || verifyJson.data.status !== 'success') {
      return Response.json({ success: false, error: 'Paystack says payment failed: ' + (verifyJson.message || 'not successful') }, { status: 400 })
    }

    const amountPaid = verifyJson.data.amount / 100 // Paystack sends kobo
    const emailPaid = verifyJson.data.customer.email

    // 2. UPDATE SUPABASE WALLET - REAL BALANCE UPDATE
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return Response.json({ success: false, error: 'Supabase keys missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const finalUserId = user_id || 'user_123'

    // Get current balance
    const { data: existing } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', finalUserId)
      .single()

    const oldBalance = existing?.balance || 0
    const newBalance = oldBalance + amountPaid

    // Save new balance - creates if not exists
    const { error: upsertError } = await supabase
      .from('wallets')
      .upsert(
        { user_id: finalUserId, balance: newBalance, email: emailPaid, last_fund_ref: reference },
        { onConflict: 'user_id' }
      )

    if (upsertError) {
      console.error('DB ERROR:', upsertError)
      return Response.json({ success: false, error: 'DB update failed: ' + upsertError.message }, { status: 500 })
    }

    // Also save to transactions table (optional but good)
    await supabase.from('transactions').insert({
      user_id: finalUserId,
      amount: amountPaid,
      reference: reference,
      type: 'fund',
      status: 'success'
    })

    return Response.json({ 
      success: true, 
      balance: newBalance, 
      oldBalance: oldBalance,
      amountPaid: amountPaid,
      message: `Funded ₦${amountPaid}` 
    })

  } catch (err) {
    console.error('FUND API CRASH:', err)
    return Response.json({ success: false, error: err.message }, { status: 500 })
  }
}
