import { createClient } from '@supabase/supabase-js'

export async function POST(req) {
  try {
    const body = await req.json()
    const { reference, user_id, amount } = body

    if (!reference) {
      return Response.json({ success: false, error: 'No reference' }, { status: 400 })
    }

    const secret = process.env.PAYSTACK_SECRET_KEY
    if (!secret) {
      return Response.json({ success: false, error: 'PAYSTACK_SECRET_KEY missing in Vercel' }, { status: 500 })
    }

    // Verify with Paystack
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${secret}` },
    })
    const verifyData = await verifyRes.json()

    if (!verifyData.status || verifyData.data.status !== 'success') {
      return Response.json({ success: false, error: 'Paystack verify failed: ' + (verifyData.message || 'Not success') }, { status: 400 })
    }

    const paidAmount = verifyData.data.amount / 100 // Paystack sends kobo
    const finalAmount = amount || paidAmount

    // Supabase client - uses SERVICE ROLE to bypass RLS so it never fails
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return Response.json({ success: false, error: 'Supabase keys missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get current wallet
    const { data: wallet } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', user_id || 'user_123')
      .single()

    const currentBalance = wallet?.balance || 0
    const newBalance = currentBalance + finalAmount

    // Update wallet - upsert so it creates if not exist
    const { error } = await supabase
      .from('wallets')
      .upsert({ user_id: user_id || 'user_123', balance: newBalance }, { onConflict: 'user_id' })

    if (error) {
      return Response.json({ success: false, error: 'DB error: ' + error.message }, { status: 500 })
    }

    return Response.json({ success: true, balance: newBalance })

  } catch (err) {
    console.error('FUND ERROR:', err)
    return Response.json({ success: false, error: err.message }, { status: 500 })
  }
}
