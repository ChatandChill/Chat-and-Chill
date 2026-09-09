'use client'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ChatRoom({params}) {
  const search = useSearchParams()
  const me = search.get('me')
  const other = search.get('other')
  const roomId = params.id
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [inCall, setInCall] = useState(false)
  const myVideo = useRef()
  const otherVideo = useRef()

  const load = async () => {
    const res = await fetch(`/api/chat?room_id=${roomId}`)
    const data = await res.json()
    if(Array.isArray(data)) setMessages(data)
  }

  useEffect(()=>{ load(); const i=setInterval(load,1500); return ()=>clearInterval(i) }, [])

  const send = async () => {
    if(!text) return
    await fetch('/api/chat', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({room_id: roomId, text, username: me, from_username: me, to_username: other})})
    setText(''); load()
  }

  const startVideoCall = async () => {
    setInCall(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true})
      if(myVideo.current) myVideo.current.srcObject = stream
      // In production, connect via WebRTC peer here
      await fetch('/api/chat', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({room_id: roomId, text: `📹 ${me} started video call`, username: me, type:'call'})})
    } catch(e){ alert('Camera permission needed for video call') }
  }

  return (
    <div style={{maxWidth:500, margin:'0 auto', height:'100vh', display:'flex', flexDirection:'column', fontFamily:'sans-serif', background:'white'}}>
      <div style={{padding:12, borderBottom:'1px solid #eee', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <a href={`/inbox?user=${me}`} style={{textDecoration:'none'}}>←</a>
          <img src={`https://i.pravatar.cc/100?u=${other}`} style={{width:36, height:36, borderRadius:'50%'}} />
          <div><b>{other}</b><div style={{fontSize:11, color:'#00c851'}}>● Online</div></div>
        </div>
        <div style={{display:'flex', gap:12}}>
          <button onClick={startVideoCall} style={{border:0, background:'#f0f0f0', borderRadius:'50%', width:38, height:38}}>📹</button>
          <button style={{border:0, background:'#f0f0f0', borderRadius:'50%', width:38, height:38}}>📞</button>
        </div>
      </div>

      {inCall && (
        <div style={{background:'black', padding:10, display:'flex', gap:10}}>
          <video ref={myVideo} autoPlay muted playsInline style={{width:'45%', borderRadius:12, background:'#222'}} />
          <video ref={otherVideo} autoPlay playsInline style={{width:'45%', borderRadius:12, background:'#222'}} />
          <button onClick={()=>setInCall(false)} style={{background:'red', color:'white', border:0, borderRadius:20, padding:'6px 12px', height:30}}>End</button>
        </div>
      )}

      <div style={{flex:1, overflowY:'auto', padding:12, background:'#fafafa'}}>
        {messages.map(m=>(
          <div key={m.id} style={{display:'flex', justifyContent: m.username===me? 'flex-end' : 'flex-start', margin:'8px 0'}}>
            <div style={{background: m.username===me? 'black' : 'white', color: m.username===me? 'white' : 'black', padding:'10px 14px', borderRadius: m.username===me? '18px 18px 4px 18px' : '18px 18px 18px 4px', maxWidth:'70%', boxShadow:'0 1px 2px rgba(0,0,0,0.1)'}}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{padding:10, borderTop:'1px solid #eee', display:'flex', gap:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Message..." style={{flex:1, padding:'12px 16px', borderRadius:24, border:'1px solid #ddd', background:'#f5f5f5'}} />
        <button onClick={send} style={{background:'black', color:'white', border:0, borderRadius:'50%', width:42, height:42}}>↑</button>
      </div>
    </div>
  )
}
