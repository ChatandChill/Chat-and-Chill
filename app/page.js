"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const USER_ID = "test_user"

  useEffect(() => {
    if (!document.getElementById("paystack-script")) {
      const s = document.createElement("script")
      s.id = "paystack-script"
      s.src = "https://js.paystack.co/v1/inline.js"
      document.body.appendChild(s)
    }
    fetch(`/api/wallet?user_id=${USER_ID}`).then(r=>r.json()).then(d=>setBalance(d.balance||0))
  }, [])

  const handleFund = (amount) => {
    const pk = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    if (!pk) return alert("Missing Paystack key")
    if (typeof window.PaystackPop === "undefined") return alert("Wait 2 sec, Paystack loading")
    
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
        }).then(r=>r.json()).then(data=>{
          setLoading(false)
          if(data.success){
            alert(`✅ ₦${amount} credited! Balance: ₦${data.balance}`)
            setBalance(data.balance)
          } else alert("❌ "+data.error)
        }).catch(e=>{setLoading(false); alert(e.message)})
      },
      onClose: function(){ setLoading(false) }
    })
    handler.openIframe()
  }

  return (
    <div style={{minHeight:"100vh", background:"#0f172a", color:"white", display:"flex", flexDirection:"column", alignItems:"center", padding:"20px"}}>
      <h1 style={{fontSize:"32px", fontWeight:"bold", marginTop:"40px"}}>Chat & Chill</h1>
      
      <div style={{background:"white", color:"black", marginTop:"20px", padding:"20px", borderRadius:"16px", width:"100%", maxWidth:"360px", textAlign:"center"}}>
        <p style={{fontSize:"14px", color:"#64748b"}}>Wallet Balance</p>
        <p style={{fontSize:"40px", fontWeight:"900"}}>₦{balance}</p>
      </div>

      <div style={{marginTop:"30px", width:"100%", maxWidth:"360px", display:"flex", flexDirection:"column", gap:"12px"}}>
        <button disabled={loading} onClick={()=>handleFund(1000)} style={{width:"100%", padding:"16px", borderRadius:"12px", fontWeight:"bold", background:"white", color:"black", border:"none", cursor:"pointer"}}>
          {loading ? "Processing..." : "Fund ₦1000 — Starter"}
        </button>
        <button disabled={loading} onClick={()=>handleFund(3000)} style={{width:"100%", padding:"16px", borderRadius:"12px", fontWeight:"bold", background:"#fde047", color:"black", border:"none", cursor:"pointer"}}>
          {loading ? "Processing..." : "Fund ₦3000 +₦300 Bonus — Popular 🔥"}
        </button>
        <button disabled={loading} onClick={()=>handleFund(5000)} style={{width:"100%", padding:"16px", borderRadius:"12px", fontWeight:"bold", background:"#86efac", color:"black", border:"none", cursor:"pointer"}}>
          {loading ? "Processing..." : "Fund ₦5000 +₦800 Bonus — Pro"}
        </button>
      </div>
      <p style={{marginTop:"30px", fontSize:"11px", color:"#64748b"}}>Test: 4084084081 | 12/34 123 | PIN 1234 | OTP 123456</p>
    </div>
  )
}
