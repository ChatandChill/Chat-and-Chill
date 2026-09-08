"use client"
import { useState, useEffect } from "react"

export default function AdminPage(){
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)
  const [txs, setTxs] = useState([])
  const [auth, setAuth] = useState(false)

  useEffect(()=>{
    const pass = prompt("Enter Admin Password (use: admin123)")
    if(pass === "admin123") { setAuth(true); load() }
    else { alert("Wrong password"); window.location.href = "/" }
  },[])

  const load = async () => {
    const headers = {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
    }
    const res = await fetch(`https://kngpwddyquxrcfydlxkg.supabase.co/rest/v1/transactions?select=*&order=created_at.desc&limit=100`, { headers })
    const data = await res.json()
    setTxs(data || [])
    setCount(data.length)
    const sum = data.reduce((a,b)=>a + (b.amount||0), 0)
    setTotal(sum)
  }

  if(!auth) return <div style={{background:"black",color:"white",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>Checking...</div>

  return (
    <div style={{background:"black",color:"white",minHeight:"100vh",padding:20}}>
      <h1 style={{fontSize:30,fontWeight:"bold"}}>Admin Dashboard 💰</h1>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:20}}>
        <div style={{background:"#111",padding:20,borderRadius:12}}>
          <p style={{opacity:0.6}}>Total Revenue</p>
          <h2 style={{fontSize:28,fontWeight:"bold",color:"#22c55e"}}>₦{total.toLocaleString()}</h2>
        </div>
        <div style={{background:"#111",padding:20,borderRadius:12}}>
          <p style={{opacity:0.6}}>Total Transactions</p>
          <h2 style={{fontSize:28,fontWeight:"bold"}}>{count}</h2>
        </div>
      </div>
      <div style={{background:"#FFD700",color:"black",padding:12,borderRadius:10,marginTop:20,fontWeight:"bold"}}>
        Your Profit (30% from Gifts later): ₦{Math.floor(total*0.3).toLocaleString()}
      </div>
      <h3 style={{marginTop:30}}>Recent Payments</h3>
      {txs.map(t=>(
        <div key={t.id} style={{background:"#111",padding:12,borderRadius:10,marginTop:8,display:"flex",justifyContent:"space-between",fontSize:14}}>
          <span>{t.user_id} • {t.reference?.slice(0,8)}</span>
          <span>{new Date(t.created_at).toLocaleString()}</span>
          <span style={{color:"#22c55e",fontWeight:"bold"}}>₦{t.amount}</span>
        </div>
      ))}
    </div>
  )
}
