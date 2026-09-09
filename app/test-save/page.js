"use client"
import { useState } from "react"

export default function TestSave(){
  const [result, setResult] = useState("Click button to test...")
  const [messages, setMessages] = useState([])

  const testSave = async () => {
    setResult("Testing SAVE...")
    try{
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ room_id: "lagos", text: "Test at " + new Date().toLocaleTimeString(), username: "Tester" })
      })
      const data = await res.json()
      if(res.ok){
        setResult("✅ SAVE WORKED! Data: " + JSON.stringify(data))
      } else {
        setResult("❌ SAVE FAILED! Error: " + (data.error || JSON.stringify(data)))
      }
      // Now load
      const res2 = await fetch("/api/chat?room_id=lagos", { cache: 'no-store' })
      const data2 = await res2.json()
      setMessages(Array.isArray(data2) ? data2 : [])
    }catch(e){
      setResult("❌ NETWORK ERROR: " + e.message)
    }
  }

  const testLoad = async () => {
    setResult("Loading...")
    const res = await fetch("/api/chat?room_id=lagos", { cache: 'no-store' })
    const data = await res.json()
    setMessages(Array.isArray(data) ? data : [])
    setResult("Loaded " + (Array.isArray(data) ? data.length : 0) + " messages. Raw: " + JSON.stringify(data).slice(0,300))
  }

  return (
    <div style={{padding:"20px", background:"#111", color:"white", minHeight:"100vh", fontFamily:"monospace"}}>
      <h2>🔧 Chat Save Tester</h2>
      <p>This page tests if DB saves without needing F12</p>
      
      <button onClick={testSave} style={{padding:"15px 30px", background:"#facc15", color:"black", border:"none", borderRadius:"10px", fontWeight:"bold", margin:"10px"}}>1. TEST SAVE</button>
      <button onClick={testLoad} style={{padding:"15px 30px", background:"#333", color:"white", border:"none", borderRadius:"10px", fontWeight:"bold", margin:"10px"}}>2. TEST LOAD</button>

      <div style={{background:"#222", padding:"15px", borderRadius:"10px", marginTop:"20px", border:"1px solid #444"}}>
        <b>RESULT:</b><br/>
        <div style={{color: result.includes("FAILED") ? "#ef4444" : result.includes("WORKED") ? "#4ade80" : "#fff", marginTop:"10px", wordBreak:"break-all"}}>
          {result}
        </div>
      </div>

      <div style={{background:"#222", padding:"15px", borderRadius:"10px", marginTop:"20px", border:"1px solid #444"}}>
        <b>MESSAGES IN DB ({messages.length}):</b>
        {messages.map((m,i)=>(
          <div key={i} style={{borderBottom:"1px solid #333", padding:"8px 0"}}>
            {m.username}: {m.text} — {m.created_at}
          </div>
        ))}
        {messages.length===0 && <div style={{color:"#666"}}>No messages found - DB is empty or save failed</div>}
      </div>

      <div style={{marginTop:"30px", fontSize:"12px", color:"#888"}}>
        After test: Go to /chat and refresh. If this page shows messages but /chat doesn't, it's a cache issue. If this page shows 0 messages, it's a Supabase RLS/policy issue.
      </div>
    </div>
  )
}
