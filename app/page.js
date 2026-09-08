"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [balance, setBalance] = useState(0)
  const [txs, setTxs] = useState([])
  const [msg, setMsg] = useState("")

  useEffect(()=>{
    const p = new URLSearchParams(window.location.search)
    if(p.get("funded")){ setMsg(`✅ ₦${p.get("funded")} added!`); window.history.replaceState({}, "", "/") }
    load()
  },[])

  const load = async () => {
    const res = await fetch("/api/wallet?user_id=user_123")
    const data = await res.json()
    setBalance(data.balance)
    setTxs(data.transactions)
  }

  const pay = async (a) => {
    const res = await fetch("/api/fund", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({amount:a, email:"user@chatandchill.com", user_id:"user_123"}) })
    const d = await res.json()
    if(d.authorization_url) window.location.href = d.authorization_url
  }

  return (
    <div style={{background:"#0a0a0a",color:"white",minHeight:"100vh",fontFamily:"Inter,system-ui"}}>
      <div style={{background:"linear-gradient(135deg,#FFD700 0%,#FF8C00 100%)",padding:"28px 20px 35px",borderRadius:"0 0 32px 32px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:48,height:48,background:"black",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>😎</div>
            <div><div style={{fontSize:12,opacity:0.7,color:"black"}}>Welcome</div><div style={{fontWeight:"800",color:"black"}}>Smallworld</div></div>
          </div>
          <a href="/admin" style={{background:"black",color:"white",padding:"8px 14px",borderRadius:20,fontSize:12,textDecoration:"none"}}>Admin</a>
        </div>
        <div style={{marginTop:22}}>
          <div style={{fontSize:13,opacity:0.7,color:"black"}}>Wallet Balance</div>
          <div style={{fontSize:44,fontWeight:"900",color:"black",marginTop:4}}>₦{balance.toLocaleString()}</div>
        </div>
        {msg && <div style={{background:"black",color:"#FFD700",padding:"10px",borderRadius:12,marginTop:15,textAlign:"center",fontWeight:"bold"}}>{msg}</div>}
      </div>

      <div style={{padding:20,marginTop:-10}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <button onClick={()=>pay(1000)} style={{background:"#1c1c1c",border:"1px solid #2a2a2a",padding:"16px 8px",borderRadius:18,color:"white"}}><div>💰</div><div style={{fontWeight:"700",marginTop:6}}>₦1k</div></button>
          <button onClick={()=>pay(3000)} style={{background:"#1c1c1c",border:"1px solid #2a2a2a",padding:"16px 8px",borderRadius:18,color:"white"}}><div>💎</div><div style={{fontWeight:"700",marginTop:6}}>₦3k</div></button>
          <button onClick={()=>pay(5000)} style={{background:"white",padding:"16px 8px",borderRadius:18,color:"black",fontWeight:"800"}}><div>🔥</div><div style={{marginTop:6}}>₦5k</div></button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:18}}>
          <a href="/gifts" style={{background:"#1c1c1c",padding:16,borderRadius:18,textAlign:"center",textDecoration:"none",color:"white",border:"1px solid #2a2a2a"}}>🎁<div style={{marginTop:6,fontSize:13}}>Gifts</div></a>
          <a href="/verify" style={{background:"#1c1c1c",padding:16,borderRadius:18,textAlign:"center",textDecoration:"none",color:"white",border:"1px solid #2a2a2a"}}>💬<div style={{marginTop:6,fontSize:13}}>Chat</div></a>
        </div>

        <div style={{marginTop:28}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h3 style={{margin:0}}>Transactions</h3><button onClick={load} style={{background:"transparent",color:"#FFD700",border:"none",fontSize:13}}>Refresh</button></div>
          {txs.length===0 && <div style={{background:"#1c1c1c",padding:20,borderRadius:16,marginTop:12,textAlign:"center",opacity:0.5,fontSize:13}}>No transactions yet</div>}
          {txs.map(t=>(
            <div key={t.id} style={{background:"#1c1c1c",padding:14,borderRadius:14,marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{width:36,height:36,background:"#222",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>💳</div><div><div style={{fontSize:13,fontWeight:"600"}}>{t.type || "Funding"}</div><div style={{fontSize:11,opacity:0.5}}>{new Date(t.created_at).toLocaleDateString()}</div></div></div>
              <div style={{color:"#22c55e",fontWeight:"800"}}>+₦{t.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
