"use client"
import { useState, useEffect } from "react"

export default function ChatPage(){
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")

  useEffect(()=>{ fetch("/api/admin").then(r=>r.json()).then(d=>{}); loadRooms() },[])

  const loadRooms = async () => {
    const res = await fetch("https://kngpwddyquxrcfydlxkg.supabase.co/rest/v1/rooms?select=*", {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` }
    })
    const data = await res.json()
    setRooms(data)
    if(data[0]) selectRoom(data[0])
  }

  const selectRoom = async (room) => {
    setSelectedRoom(room)
    const res = await fetch(`/api/chat?room_id=${room.id}`)
    const data = await res.json()
    setMessages(data)
  }

  const send = async () => {
    if(!text.trim()) return
    await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ room_id: selectedRoom.id, user_id:"user_123", username:"Smallworld", text }) })
    setText("")
    selectRoom(selectedRoom)
  }

  return (
    <div style={{background:"#0a0a0a",color:"white",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <div style={{padding:15,borderBottom:"1px solid #222",display:"flex",gap:8,overflowX:"auto"}}>
        {rooms.map(r=>(
          <button key={r.id} onClick={()=>selectRoom(r)} style={{background: selectedRoom?.id===r.id ? "#FFD700" : "#1c1c1c", color: selectedRoom?.id===r.id ? "black" : "white", padding:"8px 16px", borderRadius:20, border:"none", whiteSpace:"nowrap", fontWeight:"bold"}}>{r.emoji} {r.name}</button>
        ))}
      </div>
      <div style={{flex:1,padding:15,overflowY:"auto"}}>
        {messages.map(m=>(
          <div key={m.id} style={{marginBottom:12}}><span style={{fontWeight:"800",fontSize:12}}>{m.username}: </span><span style={{fontSize:14,opacity:0.9}}>{m.text}</span></div>
        ))}
      </div>
      <div style={{padding:12,borderTop:"1px solid #222",display:"flex",gap:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type message..." style={{flex:1,background:"#1c1c1c",border:"1px solid #333",padding:12,borderRadius:20,color:"white"}} />
        <button onClick={send} style={{background:"#FFD700",color:"black",padding:"12px 20px",borderRadius:20,fontWeight:"800",border:"none"}}>Send</button>
      </div>
    </div>
  )
}
