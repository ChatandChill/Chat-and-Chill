"use client"
import { useState, useEffect } from "react"

export default function TestWallet(){
  const [bal, setBal] = useState(0)

  useEffect(()=>{
    const saved = localStorage.getItem("my_balance")
    if(saved) setBal(Number(saved))
    else {
      localStorage.setItem("my_balance", "10000")
      setBal(10000)
    }
  },[])

  const add = (amt) => {
    const newBal = bal + amt
    localStorage.setItem("my_balance", String(newBal))
    setBal(newBal)
    alert(`Added ₦${amt} — New balance ₦${newBal}`)
  }

  return (
    <div style={{ padding: 30, background: 'black', color: 'white', minHeight: '100vh', textAlign: 'center' }}>
      <p>Wallet Balance</p>
      <h1 style={{ fontSize: 60, fontWeight: 'bold' }}>₦{bal.toLocaleString()}</h1>
      
      <div style={{ marginTop: 30, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <button onClick={()=>add(1000)} style={{ background: 'white', color: 'black', padding: 20, borderRadius: 15 }}>+ ₦1,000</button>
        <button onClick={()=>add(3000)} style={{ background: '#FFD700', color: 'black', padding: 20, borderRadius: 15 }}>+ ₦3,000</button>
        <button onClick={()=>add(5000)} style={{ background: '#22c55e', color: 'black', padding: 20, borderRadius: 15 }}>+ ₦5,000</button>
        <button onClick={()=>{localStorage.setItem("my_balance","0"); setBal(0)}} style={{ background: 'red', color: 'white', padding: 20, borderRadius: 15 }}>Reset to 0</button>
      </div>

      <p style={{ marginTop: 20, fontSize: 12, opacity: 0.6 }}>This uses your phone storage — will show even if Supabase is blocked. Once this works, we copy it to your main wallet page.</p>
    </div>
  )
}
