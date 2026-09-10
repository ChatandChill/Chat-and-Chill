export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(req) {
  const reference = req.nextUrl.searchParams.get("reference")

  if (!process.env.PAYSTACK_SECRET_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({
      status: "demo_mode",
      message: "Live payment verification is not active yet because Paystack and Supabase live credentials are not configured.",
      reference: reference || null,
      verified: false
    }, { status: 202 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseAdmin = createClient(url, service)

  if (!reference) {
    return NextResponse.json({ error: "No payment reference was provided." }, { status: 400 })
  }

  try {
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    })
    const verifyData = await verifyRes.json()

    if (!verifyData.status || verifyData.data.status !== "success") {
      return NextResponse.json({ error: "Payment verification did not succeed yet." }, { status: 400 })
    }

    const amount = verifyData.data.amount / 100
    const user_id = verifyData.data.metadata?.user_id || "user_123"

    const { data: wallet } = await supabaseAdmin.from("wallets").select("balance").eq("user_id", user_id).maybeSingle()
    const newBalance = (wallet?.balance || 0) + amount

    await supabaseAdmin.from("wallets").upsert({ user_id, balance: newBalance }, { onConflict: "user_id" })
    await supabaseAdmin.from("transactions").insert({ user_id, amount, type: "fund", reference })

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || "https://chat-and-chill-iota.vercel.app"}/?funded=${amount}`)
  } catch (error) {
    return NextResponse.json({ error: error.message || "Payment verification failed." }, { status: 500 })
  }
}
