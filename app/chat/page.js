"use client"
import { useState, useEffect } from "react"

export default function ChatPage(){
  const [room, setRoom] = useState("lagos")
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [status, setStatus] = useState("Live - Saving to DB")

  const load = async () => {
    try{
      const res = await fetch(`/api/chat?room_id=${room}`, { cache: 'no-store' })
      const data = await res.json()
      if(Array.isArray(data)) setMessages(data)
    }catch(e){}
  }

  useEffect(()=>{ load() }, [room])

  const send = async () => {
    if(!text.trim()) return
    const msgText = text
    setText("")
    setMessages(prev=>[...prev, { id: Date.now(), text: msgText, username: "You", created_at: new Date().toISOString() }])

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ room_id: room, text: msgText, username: "User" })
    })
    if(res.ok) setTimeout(load, 500)
  }

  return (
    <div style={{background:"#0a0a0a", color:"white", minHeight:"100vh", padding:"20px", fontFamily:"sans-serif"}}>
      <h1>Chat & Chill <span style={{color:"#4ade80", fontSize:"14px"}}>• {status}</span></h1>
      <div style={{display:"flex", gap:"10px", margin:"20px 0"}}>
        {["lagos","love","vip"].map(r=>(
          <button key={r} onClick={()=>setRoom(r)} style={{padding:"10px 20px", borderRadius:"20px", background: room===r? "#facc15":"#333", color: room===r?"black":"white", border:"none", cursor:"pointer"}}>
            {r==="lagos"?"🇳🇬 Lagos Vibes": r==="love"?"❤️ Love & Chill":"👑 VIP Lounge"}
          </button>
        ))}
      </div>
      <div style={{border:"1px solid #333", borderRadius:"10px", height:"60vh", overflowY:"auto", padding:"20px", marginBottom:"20px"}}>
        {messages.length===0? <p style={{textAlign:"center", color:"#666", marginTop:"100px"}}>No messages yet - Be the first</p> :
          messages.map(m=>(
            <div key={m.id} style={{marginBottom:"15px"}}>
              <b>{m.username||"User"}:</b> {m.text}
              <div style={{fontSize:"10px", color:"#666"}}>{new Date(m.created_at).toLocaleTimeString()}</div>
            </div>
          ))
        }
      </div>
      <div style={{display:"flex", gap:"10px"}}>
        <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type a message..." style={{flex:1, padding:"15px", borderRadius:"25px", background:"#222", color:"white", border:"1px solid #444"}}/>
        <button onClick={send} style={{padding:"15px 25px", borderRadius:"25px", background:"#facc15", border:"none", fontWeight:"bold", cursor:"pointer"}}>Send</button>
      </div>
    </div>
  )
}
