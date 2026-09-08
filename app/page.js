"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const USER_ID = "test_user" // CHANGE THIS later to real user id from auth

  useEffect(() => {
    // Load Paystack
    if (!document.getElementById("paystack-script")) {
      const s = document.createElement("script")
      s.id = "paystack-script"
      s.src = "https://js.paystack.co/v1/inline.js"
      s.onload = () => console.log("Paystack loaded")
      document.body.appendChild(s)
    }
    // Load balance
    fetch(`/api/wallet?user_id=${USER_ID}`)
      .then(r => r.json())
      .then(d => setBalance(d.balance || 0))
  }, [])

  const handleFund = (amount) => {
    const pk = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    if (!pk) return alert("Missing NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in Vercel")
    if (typeof window.PaystackPop === "undefined") return alert("Paystack loading... wait")

    setLoading(true)
    const handler = window.PaystackPop.setup({
      key: pk,
      email: "user@chatandchill.com",
      amount: amount * 100,
      currency: "NGN",
      ref: `FUND_${Date.now()}`,
      callback: function(res) {
        fetch("/api/fund", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: res.reference, amount, user_id: USER_ID })
        })
        .then(r => r.json())
        .then(data => {
          setLoading(false)
          if (data.success) {
            alert(`✅ ₦${amount} credited! Bonus ₦${data.bonus}. Balance: ₦${data.balance}`)
            setBalance(data.balance)
          } else {
            alert("❌ " + data.error)
          }
        })
        .catch(e => { setLoading(false); alert(e.message) })
      },
      onClose: function() { setLoading(false) }
    })
    handler.openIframe()
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mt-10">Chat & Chill</h1>
      <div className="bg-white text-black mt-6 p-6 rounded-2xl w-full max-w-sm text-center">
        <p className="text-sm text-slate-500">Wallet Balance</p>
        <p className="text-4xl font-black mt-1">₦{balance}</p>
      </div>
      <div className="mt-8 w-full max-w-sm space-y-3">
        {[
          {a:1000,b:0,label:"Starter"},
          {a:3000,b:300,label:"Popular 🔥"},
          {a:5000,b:800,label:"Pro"},
        ].map(p=>(
          <button key={p.a} disabled={loading} onClick={()=>handleFund(p.a)}
            className="w-full bg-white text-black p-4 rounded-xl font-bold disabled:opacity-50">
            {loading ? "Processing..." : `Fund ₦${p.a} ${p.b?`+₦${p.b} Bonus`:''} — ${p.label}`}
          </button>
        ))}
      </div>
      <p className="mt-8 text- text-slate-500">Test: 4084084084081 | 12/34 123 | PIN 1234 | OTP 123456</p>
    </main>
  )
}
