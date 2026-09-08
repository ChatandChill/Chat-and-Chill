"use client"
import { useState, useEffect } from "react"

export default function ChatPage(){
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ loadRooms() },[])

  const loadRooms = async () => {
    try{
      setLoading(true)
      const res = await fetch("/api/rooms")
      const data = await res.json()
      console.log("Rooms:", data)
      if(Array.isArray(data) && data.length > 0){
        setRooms(data)
        selectRoom(data[0])
      } else {
        setRooms([{id:"temp-1", name:"Lagos Vibes", emoji:"🇳🇬"}, {id:"temp-2", name:"Love & Chill", emoji:"❤️"}])
        setSelectedRoom({id:"temp-1", name:"Lagos Vibes", emoji:"🇳🇬"})
      }
    } catch(e){
      console.error(e)
    } finally { setLoading(false) }
  }

  const selectRoom = async (room) => {
    setSelectedRoom(room)
    try{
      const res = await fetch(`/api/chat?room_id=${room.id}`)
      const data = await res.json()
      if(Array.isArray(data)) setMessages(data)
    } catch(e){ setMessages([]) }
  }

  const send = async () => {
    if(!text.trim() ||!selectedRoom) return
    await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ room_id: selectedRoom.id, user_id:"user_123", username:"Smallworld", text }) })
    setText("")
    selectRoom(selectedRoom)
  }

  if(loading) return <div style={{background:"#000",color:"white",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>Loading rooms...</div>

  return (
    <div style={{background:"#0a0a0a",color:"white",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <div style={{padding:15,borderBottom:"1px solid #222",background:"#111"}}>
        <h3 style={{margin:0}}>Chat & Chill 💬</h3>
        <p style={{margin:"5px 0 0 0",fontSize:11,opacity:0.6}}>Rooms: {rooms.length}</p>
      </div>

      <div style={{padding:12,borderBottom:"1px solid #222",display:"flex",gap:8,overflowX:"auto",background:"#0f0f0f"}}>
        {rooms.map(r=>(
          <button key={r.id} onClick={()=>selectRoom(r)} style={{background: selectedRoom?.id===r.id? "#FFD700" : "#1c1c1c", color: selectedRoom?.id===r.id? "black" : "white", padding:"10px 18px", borderRadius:20, border:"1px solid #333", fontWeight:"bold", whiteSpace:"nowrap"}}>{r.emoji} {r.name}</button>
        ))}
      </div>

      <div style={{flex:1,padding:15,overflowY:"auto"}}>
        {messages.length===0 && <div style={{opacity:0.4,textAlign:"center",marginTop:50}}>No messages yet. Be first!</div>}
        {messages.map(m=>(
          <div key={m.id} style={{marginBottom:12}}><b style={{fontSize:12,color:"#FFD700"}}>{m.username}: </b><span style={{fontSize:14}}>{m.text}</span></div>
        ))}
      </div>

      <div style={{padding:12,borderTop:"1px solid #222",display:"flex",gap:8,background:"#111"}}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type message..." style={{flex:1,background:"#1c1c1c",border:"1px solid #333",padding:12,borderRadius:20,color:"white"}} onKeyDown={e=>e.key==="Enter" && send()} />
        <button onClick={send} style={{background:"#FFD700",color:"black",padding:"12px 20px",borderRadius:20,fontWeight:"800",border:"none"}}>Send</button>
      </div>
    </div>
  )
}
