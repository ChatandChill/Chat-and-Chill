import { createClient } from "@supabase/supabase-js"

export async function POST(req) {
  try {
    const { reference, amount, user_id } = await req.json()

    // 1. Verify with Paystack
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    })
    const paystackData = await paystackRes.json()
    
    if (paystackData.data.status !== "success") {
      return Response.json({ success: false, error: "Paystack not success" })
    }

    // 2. Credit wallet
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // get or create wallet
    const { data: wallet } = await supabase.from("wallets").select("*").eq("user_id", user_id).single()
    
    const bonus = amount >= 5000 ? 800 : amount >= 3000 ? 300 : 0
    const total = amount + bonus

    if (wallet) {
      await supabase.from("wallets").update({ 
        balance: wallet.balance + total 
      }).eq("user_id", user_id)
    } else {
      await supabase.from("wallets").insert({ user_id, balance: total })
    }

    await supabase.from("transactions").insert({
      user_id,
      reference,
      amount,
      bonus,
      status: "success"
    })

    return Response.json({ success: true, balance: total })

  } catch (e) {
    console.error(e)
    return Response.json({ success: false, error: e.message }, { status: 500 })
  }
}
