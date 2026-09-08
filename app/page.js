"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [balance, setBalance] = useState(10000)

  useEffect(()=>{
    const saved = localStorage.getItem("wallet_bal")
    if(saved) setBalance(Number(saved))
    else localStorage.setItem("wallet_bal","10000")
  },[])

  const fund = (amt)=>{
    const newBal = balance + amt
    setBalance(newBal)
    localStorage.setItem("wallet_bal", String(newBal))
  }

  return (
    <div style={{background:"black",color:"white",minHeight:"100vh",padding:20,textAlign:"center"}}>
      <p style={{opacity:0.7}}>Wallet Balance</p>
      <h1 style={{fontSize:60,fontWeight:"bold",marginTop:10}}>₦{balance.toLocaleString()}</h1>
      
      <div style={{marginTop:30,display:"grid",gap:12}}>
        <button onClick={()=>fund(1000)} style={{background:"white",color:"black",padding:18,borderRadius:12,fontWeight:"bold"}}>+ Fund ₦1,000</button>
        <button onClick={()=>fund(3000)} style={{background:"#FFD700",color:"black",padding:18,borderRadius:12,fontWeight:"bold"}}>+ Fund ₦3,000 + Bonus</button>
        <button onClick={()=>fund(5000)} style={{background:"#22c55e",color:"black",padding:18,borderRadius:12,fontWeight:"bold"}}>+ Fund ₦5,000 + Bonus</button>
        <button onClick={()=>{setBalance(0); localStorage.setItem("wallet_bal","0")}} style={{background:"#333",color:"white",padding:18,borderRadius:12}}>Reset</button>
      </div>

      <p style={{marginTop:30,fontSize:12,opacity:0.5}}>Balance saved on your phone. Next: we connect Paystack + Supabase.</p>
    </div>
  )
}
