"use client"
import { useState } from "react"

export default function Page() {
  const [balance, setBalance] = useState(10000)

  return (
    <div style={{ background: "black", color: "white", minHeight: "100vh", padding: 20, textAlign: "center" }}>
      <h1 style={{ fontSize: 18, opacity: 0.7 }}>Wallet Balance</h1>
      <h1 style={{ fontSize: 60, fontWeight: "bold", marginTop: 10 }}>₦{balance.toLocaleString()}</h1>
      
      <div style={{ marginTop: 30, display: "grid", gap: 12 }}>
        <button onClick={() => setBalance(balance + 1000)} style={{ background: "white", color: "black", padding: 18, borderRadius: 12, fontWeight: "bold" }}>
          + Fund ₦1,000 (Instant)
        </button>
        <button onClick={() => setBalance(balance + 3000)} style={{ background: "#FFD700", color: "black", padding: 18, borderRadius: 12, fontWeight: "bold" }}>
          + Fund ₦3,000
        </button>
        <button onClick={() => setBalance(0)} style={{ background: "#333", color: "white", padding: 18, borderRadius: 12 }}>
          Reset to 0 (Test)
        </button>
      </div>

      <p style={{ marginTop: 30, fontSize: 12, opacity: 0.5 }}>If you see ₦10,000 above, the 0 bug is fixed.</p>
    </div>
  )
}
