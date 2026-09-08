"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [balance, setBalance] = useState(0)
  const [history, setHistory] = useState([])
  const [msg, setMsg] = useState("")

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    const funded = params.get("funded")
    if(funded){ setMsg(`✅ ₦${funded} added successfully!`); window.history.replaceState({}, "", "/") }

    loadData()
  },[])

  const loadData = async () => {
    const resBal = await fetch(`https://kngpwddyquxrcfydlxkg.supabase.co/rest/v1/wallets?select=balance&user_id=eq.user_123`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` }
    })
    const dataBal = await resBal.json()
    if(dataBal[0]) setBalance(dataBal[0].balance)

    const resHist = await fetch(`https://kngpwddyquxrcfydlxkg.supabase.co/rest/v1/transactions?user_id=eq.user_123&order=created_at.desc&limit=10`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` }
    })
    const dataHist = await resHist.json()
    setHistory(dataHist || [])
  }

  const pay = async (amount) => {
    const res = await fetch("/api/fund", {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({amount, email:"user@chatandchill.com", user_id:"user_123"})
    })
    const data = await res.json()
    if(data.authorization_url) window.location.href = data.authorization_url
  }

  return (
    <div style={{background:"black",color:"white",minHeight:"100vh",padding:20,textAlign:"center"}}>
      {msg && <div style={{background:"#22c55e",color:"black",padding:12,borderRadius:10,marginBottom:15,fontWeight:"bold"}}>{msg}</div>}
      <p style={{opacity:0.6}}>Wallet Balance</p>
      <h1 style={{fontSize:55,fontWeight:"bold"}}>₦{balance.toLocaleString()}</h1>
      <div style={{marginTop:20,display:"grid",gap:10}}>
        <button onClick={()=>pay(1000)} style={{background:"white",color:"black",padding:16,borderRadius:12,fontWeight:"bold"}}>+ Fund ₦1,000</button>
        <button onClick={()=>pay(3000)} style={{background:"#FFD700",color:"black",padding:16,borderRadius:12,fontWeight:"bold"}}>+ Fund ₦3,000</button>
        <button onClick={()=>pay(5000)} style={{background:"#22c55e",color:"black",padding:16,borderRadius:12,fontWeight:"bold"}}>+ Fund ₦5,000</button>
      </div>
      <div style={{marginTop:30,textAlign:"left"}}>
        <h3>Transactions</h3>
        {history.map(t=>(
          <div key={t.id} style={{background:"#111",padding:12,borderRadius:10,marginTop:8,display:"flex",justifyContent:"space-between"}}>
            <span>{t.type} • {new Date(t.created_at).toLocaleDateString()}</span>
            <span style={{color:"#22c55e"}}>+₦{t.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
