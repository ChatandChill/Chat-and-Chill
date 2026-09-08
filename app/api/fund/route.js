import { createClient } from "@supabase/supabase-js"

export async function POST(req) {
  try {
    const { amount, user_id, reference } = await req.json()
    if (!amount || !user_id || !reference) {
      return Response.json({ success:false, error:"Missing fields" }, {status:400})
    }

    // 1. Verify with Paystack (SECURE)
    const secret = process.env.PAYSTACK_SECRET_KEY
    if (secret) {
      const verify = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: { Authorization: `Bearer ${secret}` }
      })
      const vData = await verify.json()
      if (!vData.status || vData.data.status !== "success") {
        return Response.json({ success:false, error:"Paystack not verified: "+vData.message })
      }
      if (vData.data.amount !== amount*100) {
        return Response.json({ success:false, error:"Amount mismatch" })
      }
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const bonus = amount>=5000 ? 800 : amount>=3000 ? 300 : 0
    const total = amount + bonus

    // duplicate check
    const { data: dup } = await supabase.from("transactions").select("id").eq("reference", reference).maybeSingle()
    if (dup) {
      const { data: w } = await supabase.from("wallets").select("balance").eq("user_id", user_id).maybeSingle()
      return Response.json({ success:true, balance: w?.balance||0, bonus })
    }

    const { data: existing } = await supabase.from("wallets").select("balance").eq("user_id", user_id).maybeSingle()
    let newBalance
    if (!existing) {
      newBalance = total
      await supabase.from("wallets").insert({ user_id, balance: newBalance })
    } else {
      newBalance = existing.balance + total
      await supabase.from("wallets").update({ balance: newBalance }).eq("user_id", user_id)
    }

    await supabase.from("transactions").insert({ user_id, reference, amount, bonus, status:"success" })

    return Response.json({ success:true, balance: newBalance, bonus })
  } catch (e) {
    console.error(e)
    return Response.json({ success:false, error:e.message }, {status:500})
  }
}
