import { NextResponse } from "next/server"

export async function POST(req){
  try{
    const { amount, email, user_id } = await req.json()

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email || "user@chatandchill.com",
        amount: amount * 100,
        metadata: { user_id: user_id || "user_123", custom_amount: amount },
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://chat-and-chill-iota.vercel.app"}/api/verify`
      })
    })

    const data = await res.json()
    if(!data.status) return NextResponse.json({ error: data.message }, { status: 400 })

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference
    })
  }catch(e){
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
