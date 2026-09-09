export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(req){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY
  if(!url || !service) return NextResponse.json({ error: "Supabase environment variables are missing" }, { status: 500 })

  const supabaseAdmin = createClient(url, service)
  const reference = req.nextUrl.searchParams.get("reference")
  if(!reference) return NextResponse.json({ error: "No ref" }, { status: 400 })

  const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
  })
  const verifyData = await verifyRes.json()

  if(!verifyData.status || verifyData.data.status !== "success"){
    return NextResponse.json({ error: "Not success" }, { status: 400 })
  }

  const amount = verifyData.data.amount / 100
  const user_id = verifyData.data.metadata?.user_id || "user_123"

  const { data: wallet } = await supabaseAdmin.from("wallets").select("balance").eq("user_id", user_id).maybeSingle()
  const newBalance = (wallet?.balance || 0) + amount

  await supabaseAdmin.from("wallets").upsert({ user_id, balance: newBalance }, { onConflict: "user_id" })
  await supabaseAdmin.from("transactions").insert({ user_id, amount, type: "fund", reference })

  return NextResponse.redirect(`https://chat-and-chill-iota.vercel.app/?funded=${amount}`)
}
