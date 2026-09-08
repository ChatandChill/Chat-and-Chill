"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [balance, setBalance] = useState(10000)
  const [loading, setLoading] = useState("")

  const loadBalance = async () => {
    try{
      const res = await fetch(`https://kngpwddyquxrcfydlxkg.supabase.co/rest/v1/wallets?select=balance&user_id=eq.user_123`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        }
      })
      const data = await res.json()
      if(data[0]?.balance) {
        setBalance(data[0].balance)
        localStorage.setItem("wallet_bal", String(data[0].balance))
      }
    }catch(e){
      const saved = localStorage.getItem("wallet_bal")
      if(saved) setBalance(Number(saved))
    }
  }

  useEffect(()=>{ loadBalance() },[])

  const pay = async (amount) => {
    setLoading(amount)
    const res = await fetch("/api/fund", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, email: "user@chatandchill.com", user_id: "user_123" })
    })
    const data = await res.json()
    if(data.authorization_url) window.location.href = data.authorization_url
    else { alert(data.error); setLoading("") }
  }

  return (
    <div style={{background:"black",color:"white",minHeight:"100vh",padding:20,textAlign:"center"}}>
      <p style={{opacity:0.7}}>Wallet Balance</p>
      <h1 style={{fontSize:60,fontWeight:"bold",marginTop:10}}>₦{balance.toLocaleString()}</h1>
      <div style={{marginTop:30,display:"grid",gap:12}}>
        <button onClick={()=>pay(1000)} disabled={!!loading} style={{background:"white",color:"black",padding:18,borderRadius:12,fontWeight:"bold"}}>{loading==1000?"Loading...":"+ Fund ₦1,000"}</button>
        <button onClick={()=>pay(3000)} disabled={!!loading} style={{background:"#FFD700",color:"black",padding:18,borderRadius:12,fontWeight:"bold"}}>{loading==3000?"Loading...":"+ Fund ₦3,000 + ₦300 Bonus"}</button>
        <button onClick={()=>pay(5000)} disabled={!!loading} style={{background:"#22c55e",color:"black",padding:18,borderRadius:12,fontWeight:"bold"}}>{loading==5000?"Loading...":"+ Fund ₦5,000 + ₦800 Bonus"}</button>
      </div>
    </div>
  )
}
