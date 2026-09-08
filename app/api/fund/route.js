import { createClient } from "@supabase/supabase-js"

export async function POST(req){
  try{
    const body = await req.json()
    const amount = Number(body.amount) || 1000
    const user_id = body.user_id || "test_user"
    const ref = body.reference

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const bonus = amount >= 5000 ? 800 : amount >= 3000 ? 300 : 0
    const total = amount + bonus

    // get wallet for THIS user only
    const { data: existing } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user_id)
      .maybeSingle()

    let wallet
    if(!existing){
      const { data, error } = await supabase
        .from("wallets")
        .insert({ user_id, balance: total })
        .select()
        .single()
      if(error) throw error
      wallet = data
    } else {
      const { data, error } = await supabase
        .from("wallets")
        .update({ balance: existing.balance + total })
        .eq("user_id", user_id)
        .select()
        .single()
      if(error) throw error
      wallet = data
    }

    await supabase.from("transactions").insert({
      user_id,
      reference: ref,
      amount,
      bonus,
      status: "success"
    })

    return Response.json({ success: true, balance: wallet.balance })

  } catch(e){
    console.log("FUND ERROR", e)
    return Response.json({ success: false, error: e.message }, { status: 500 })
  }
}
