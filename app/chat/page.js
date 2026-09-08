"use client"
import { useState, useEffect } from "react"

const ROOMS = [
  {id:"lagos", name:"Lagos Vibes", emoji:"🇳🇬"},
  {id:"love", name:"Love & Chill", emoji:"❤️"},
  {id:"vip", name:"VIP Lounge", emoji:"👑"},
]

export default function ChatPage(){
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0])
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [rooms, setRooms] = useState(ROOMS)

  useEffect(()=>{
    loadRooms()
  },[])

  useEffect(()=>{
    if(selectedRoom){
      loadMessages()
      const interval = setInterval(loadMessages, 2000)
      return () => clearInterval(interval)
    }
  },[selectedRoom])

  const loadRooms = async () => {
    try{
      const res = await fetch("/api/rooms")
      const data = await res.json()
      if(Array.isArray(data) && data.length > 0){
        setRooms(data)
        setSelectedRoom(data[0])
      }
    } catch(e){ console.log("Using default rooms") }
  }

  const loadMessages = async () => {
    try{
      const res = await fetch(`/api/chat?room_id=${selectedRoom.id}`)
      const data = await res.json()
      if(Array.isArray(data)) setMessages(data)
    } catch(e){}
  }

  const send = async () => {
    if(!text.trim()) return
    const msgText = text
    setText("")

    // Optimistic UI - show instantly
    setMessages(prev => [...prev, {id: Date.now(), username:"Smallworld", text: msgText, created_at: new Date().toISOString()}])

    // Save to Supabase
    await fetch("/api/chat", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ room_id: selectedRoom.id, user_id:"user_123", username:"Smallworld", text: msgText })
    })
    loadMessages()
  }

  return (
    <div style={{background:"#0a0a0a",color:"white",minHeight:"100vh",display:"flex",flexDirection:"column", fontFamily:"system-ui"}}>
      <div style={{padding:16, background:"#111", borderBottom:"1px solid #222", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <h2 style={{margin:0, fontSize:18}}>Chat & Chill 💬</h2>
          <div style={{fontSize:12, color:"#22c55e", marginTop:4}}>● Live — Saving to database</div>
        </div>
        <div style={{fontSize:11, background:"#1c1c1c", padding:"6px 10px", borderRadius:20}}>{messages.length} msgs</div>
      </div>

      <div style={{padding:12, display:"flex", gap:8, overflowX:"auto", borderBottom:"1px solid #222"}}>
        {rooms.map(r=>(
          <button key={r.id} onClick={()=>{setSelectedRoom(r); setMessages([])}} style={{
            background: selectedRoom.id===r.id? "#FFD700" : "#1c1c1c",
            color: selectedRoom.id===r.id? "black" : "white",
            padding:"10px 18px", borderRadius:20, border:"1px solid #333", fontWeight:"800", whiteSpace:"nowrap"
          }}>{r.emoji} {r.name}</button>
        ))}
      </div>

      <div style={{flex:1, padding:16, overflowY:"auto"}}>
        {messages.length===0 && <div style={{opacity:0.4, textAlign:"center", marginTop:60}}>No messages yet<br/>Be the first to chat in {selectedRoom.name}!</div>}
        {messages.map(m=>(
          <div key={m.id} style={{marginBottom:14, display:"flex", gap:8}}>
            <div style={{width:32,height:32,background: m.username==="Smallworld"? "#FFD700" : "#222", color: m.username==="Smallworld"? "black" : "white", borderRadius:50,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12, fontWeight:800}}>{m.username[0]}</div>
            <div>
              <div style={{fontSize:11, fontWeight:800, opacity:0.7}}>{m.username} <span style={{fontWeight:400, opacity:0.5, fontSize:10}}>{new Date(m.created_at).toLocaleTimeString()}</span></div>
              <div style={{background: m.username==="Smallworld"? "#FFD700" : "#1c1c1c", color: m.username==="Smallworld"? "black" : "white", padding:"9px 13px", borderRadius:"14px 14px 14px 2px", marginTop:4, fontSize:14, maxWidth:280}}>{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{padding:12, borderTop:"1px solid #222", display:"flex", gap:8, background:"#111"}}>
        <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter" && send()} placeholder={`Message ${selectedRoom.name}...`} style={{flex:1, background:"#1c1c1c", border:"1px solid #333", padding:"13px 16px", borderRadius:24, color:"white", outline:"none"}} />
        <button onClick={send} style={{background:"#FFD700", color:"black", padding:"12px 22px", borderRadius:24, fontWeight:900, border:"none"}}>Send</button>
      </div>
    </div>
  )
}
