import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { amount, email, user_id } = await req.json()
    const numericAmount = Number(amount)

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return NextResponse.json({ error: "A valid amount is required." }, { status: 400 })
    }

    const paystackKey = process.env.PAYSTACK_SECRET_KEY

    if (!paystackKey) {
      return NextResponse.json({
        status: "demo_mode",
        message: "Live Paystack keys are not configured yet. Payment verification is still pending production setup.",
        amount: numericAmount,
        email: email || "user@chatandchill.com",
        user_id: user_id || "user_123",
        demo_balance: 6765000,
        demo_reference: `demo_${Date.now()}`
      }, { status: 202 })
    }

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email || "user@chatandchill.com",
        amount: numericAmount * 100,
        metadata: { user_id: user_id || "user_123", custom_amount: numericAmount },
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://chat-and-chill-iota.vercel.app"}/api/verify`
      })
    })

    const data = await res.json()
    if (!data.status) {
      return NextResponse.json({ error: data.message || "Payment initialization failed." }, { status: 400 })
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference
    })
  } catch (e) {
    return NextResponse.json({ error: e.message || "Unexpected payment error." }, { status: 500 })
  }
}
