"use client"
import { useState, useEffect } from "react"

export default function AdminPage(){
  const [data, setData] = useState({ total:0, count:0, transactions:[] })
  const [auth, setAuth] = useState(false)

  useEffect(()=>{
    const pass = prompt("Admin Password: admin123")
    if(pass === "admin123"){ setAuth(true); load() }
    else window.location.href = "/"
  },[])

  const load = async () => {
    const res = await fetch("/api/admin")
    const json = await res.json()
    setData(json)
  }

  if(!auth) return <div style={{background:"black",color:"white",minHeight:"100vh",padding:20}}>Checking...</div>

  return (
    <div style={{background:"black",color:"white",minHeight:"100vh",padding:20}}>
      <h1 style={{fontSize:28,fontWeight:"bold"}}>Admin 💰</h1>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:20}}>
        <div style={{background:"#111",padding:18,borderRadius:12}}>
          <p style={{opacity:0.6}}>Revenue</p>
          <h2 style={{color:"#22c55e",fontSize:26}}>₦{data.total?.toLocaleString()}</h2>
        </div>
        <div style={{background:"#111",padding:18,borderRadius:12}}>
          <p style={{opacity:0.6}}>Transactions</p>
          <h2 style={{fontSize:26}}>{data.count}</h2>
        </div>
      </div>
      <button onClick={load} style={{background:"white",color:"black",padding:12,borderRadius:10,width:"100%",marginTop:15,fontWeight:"bold"}}>🔄 Refresh Transactions</button>
      <div style={{marginTop:20}}>
        {data.transactions?.map(t=>(
          <div key={t.id} style={{background:"#111",padding:12,borderRadius:10,marginTop:8,display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:12}}>{t.user_id} • {t.reference?.slice(0,10)}</span>
            <span style={{color:"#22c55e"}}>₦{t.amount}</span>
          </div>
        ))}
        {data.count===0 && <p style={{opacity:0.5,marginTop:20}}>No transactions yet — Fund ₦1,000 first, then refresh.</p>}
      </div>
    </div>
  )
}
