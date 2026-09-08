"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)

  // Load Paystack script once
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  const handleFund = async (amount) => {
    setLoading(true)
    const reference = `FUND_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const email = "user@chatandchill.com" // later we will use logged in user email
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

    if (!publicKey) {
      alert("Paystack Public Key missing in Vercel!")
      setLoading(false)
      return
    }

    if (typeof window.PaystackPop === "undefined") {
      alert("Paystack script not loaded yet, wait 2 secs and click again")
      setLoading(false)
      return
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: amount * 100, // Paystack uses kobo
      ref: reference,
      onClose: () => {
        setLoading(false)
        console.log("Closed")
      },
      callback: async (response) => {
        console.log("Paid!", response.reference)
        // Now verify on backend
        try {
          const res = await fetch("/api/fund", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              reference: response.reference,
              amount: amount,
              user_id: "test-user-123" // replace with real user id later
            })
          })
          const data = await res.json()
          if (data.success) {
            alert(`✅ VERIFIED! ₦${amount} added to wallet`)
            window.location.reload()
          } else {
            alert("DB Error: " + data.error)
          }
        } catch (e) {
          alert("Verify failed: " + e.message)
        }
        setLoading(false)
      }
    })
    handler.openIframe()
  }

  const packages = [
    { amount: 1000, bonus: 0, label: "Starter" },
    { amount: 3000, bonus: 300, label: "Popular 🔥" },
    { amount: 5000, bonus: 800, label: "Chill Pro" },
  ]

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-3 my-4">
        {packages.map((p) => (
          <button
            key={p.amount}
            disabled={loading}
            onClick={() => handleFund(p.amount)}
            className="bg-white p-4 rounded-xl shadow disabled:opacity-50"
          >
            <p className="font-bold">₦{p.amount}</p>
            {p.bonus > 0 && <p className="text-green-600 text-xs">+₦{p.bonus} bonus</p>}
            <p className="text-xs text-gray-500">{p.label}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
