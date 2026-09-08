"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!document.querySelector("#paystack-script")) {
      const s = document.createElement("script")
      s.id = "paystack-script"
      s.src = "https://js.paystack.co/v1/inline.js"
      s.onload = () => console.log("Paystack loaded ✅")
      document.body.appendChild(s)
    }
  }, [])

  const handleFund = async (amount) => {
    console.log("Clicked", amount)
    const pk = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    console.log("PK:", pk ? "exists" : "MISSING!")
    
    if (!pk) {
      alert("Missing NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in Vercel env")
      return
    }
    if (typeof window.PaystackPop === "undefined") {
      alert("Paystack still loading, wait 2 sec")
      return
    }

    setLoading(true)
    const ref = `FUND_${Date.now()}`
    const handler = window.PaystackPop.setup({
      key: pk,
      email: "test@chatandchill.com",
      amount: amount * 100,
      ref,
      callback: async (res) => {
        alert("Payment done: " + res.reference + " — verifying...")
        const r = await fetch("/api/fund", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({ reference: res.reference, amount, user_id: "test-123" })
        })
        const data = await r.json()
        console.log(data)
        alert(data.success ? `✅ ₦${amount} credited!` : `DB Error: ${data.error}`)
        setLoading(false)
      },
      onClose: () => setLoading(false)
    })
    handler.openIframe()
  }

  const packages = [
    { amount: 1000, bonus: 0, label: "Starter" },
    { amount: 3000, bonus: 300, label: "Popular 🔥" },
    { amount: 5000, bonus: 800, label: "Chill Pro" },
  ]

  return (
    <div className="p-4 min-h-screen bg-slate-900">
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        {packages.map(p=>(
          <button key={p.amount} disabled={loading} onClick={()=>handleFund(p.amount)} className="bg-white p-4 rounded-xl">
            <p className="font-bold">₦{p.amount}</p>
            {p.bonus>0 && <p className="text-green-600 text-xs">+₦{p.bonus} bonus</p>}
            <p className="text-xs text-gray-500">{p.label}</p>
          </button>
        ))}
      </div>
      {loading && <p className="text-white text-center mt-4">Loading Paystack...</p>}
    </div>
  )
}
