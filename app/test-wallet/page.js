"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://kngpwddyquxrcfydlxkg.supabase.co",
  "YOUR_ANON_KEY_HERE" // paste your anon key here
)

export default function TestWallet(){
  const [bal, setBal] = useState("Loading...")
  const [log, setLog] = useState("")

  const load = async () => {
    const { data, error } = await supabase.from("wallets").select("*").eq("user_id", "user_123").maybeSingle()
    setLog(JSON.stringify({ data, error }))
    if(data) setBal(data.balance)
    else setBal("Not found")
  }

  const add = async () => {
    const { data: curr } = await supabase.from("wallets").select("balance").eq("user_id", "user_123").maybeSingle()
    const newBal = (curr?.balance || 0) + 1000
    const { data, error } = await supabase.from("wallets").upsert({ user_id: "user_123", balance: newBal }, { onConflict: 'user_id' }).select()
    setLog(JSON.stringify({ data, error }))
    setBal(newBal)
    alert("Added! New: " + newBal)
  }

  useEffect(()=>{ load() },[])

  return (
    <div style={{ padding: 30, background: 'black', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 30 }}>TEST WALLET - DIRECT SUPABASE</h1>
      <h2 style={{ fontSize: 50, marginTop: 20 }}>₦{bal}</h2>
      <button onClick={load} style={{ background: 'white', color: 'black', padding: 15, marginTop: 20, borderRadius: 10 }}>RELOAD BALANCE</button>
      <button onClick={add} style={{ background: 'yellow', color: 'black', padding: 15, marginTop: 20, marginLeft: 10, borderRadius: 10 }}>+ ₦1000 DIRECT</button>
      <p style={{ marginTop: 20, fontSize: 12, wordBreak: 'break-all' }}>{log}</p>
    </div>
  )
}
