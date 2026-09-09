'use client'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ChatRoom({params}){
  const search=useSearchParams(); const me=search.get('me'); const other=search.get('other'); const roomId=params.id
  const [messages,setMessages]=useState([]); const [text,setText]=useState(''); const [inCall,setInCall]=useState(false); const [typingUser,setTypingUser]=useState('')
  const myVideo=useRef(); const otherVideo=useRef(); const pc=useRef(); const localStream=useRef()

  const load=async()=>{
    const r=await fetch(`/api/chat?room_id=${roomId}`); const d=await r.json(); if(Array.isArray(d)) setMessages(d)
    const t=await fetch(`/api/typing?room_id=${roomId}`).then(r=>r.json()); const otherTyping=t.find(x=>x.username!==me&&x.is_typing); setTypingUser(otherTyping?otherTyping.username:'')
  }
  useEffect(()=>{ load(); const i=setInterval(load,1500); return()=>clearInterval(i)},[])

  const handleTyping=async(v)=>{
    setText(v); await fetch('/api/typing',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({room_id:roomId,username:me,is_typing:v.length>0})})
  }

  const send=async()=>{
    if(!text.trim()) return; await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({room_id:roomId,text,username:me,from_username:me,to_username:other})}); setText(''); await fetch('/api/typing',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({room_id:roomId,username:me,is_typing:false})}); load()
  }

  const startCall=async()=>{
    setInCall(true); const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true}); localStream.current=stream; myVideo.current.srcObject=stream
    pc.current=new RTCPeerConnection(); stream.getTracks().forEach(t=>pc.current.addTrack(t,stream))
    pc.current.ontrack=e=>{ if(otherVideo.current) otherVideo.current.srcObject=e.streams[0] }
    // For demo, show same stream as other (real app needs signaling via Supabase)
    if(otherVideo.current) otherVideo.current.srcObject=stream
    await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({room_id:roomId,text:`📹 ${me} started video call`,username:me})})
  }
  const endCall=()=>{ localStream.current?.getTracks().forEach(t=>t.stop()); setInCall(false) }

  return (
    <div style={{maxWidth:500,margin:'0 auto',height:'100vh',display:'flex',flexDirection:'column',fontFamily:'sans-serif',background:'white'}}>
      <div style={{padding:12,borderBottom:'1px solid #eee',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',gap:10,alignItems:'center'}}><a href={`/inbox`} style={{textDecoration:'none',fontSize:20}}>←</a><img src={`https://i.pravatar.cc/100?u=${other}`} style={{width:36,height:36,borderRadius:'50%'}}/><div><b>{other}</b><div style={{fontSize:11,color: typingUser?'#fa7e1e':'#00c851'}}>{typingUser?`typing...`:'● Online • Encrypted'}</div></div></div>
        <div style={{display:'flex',gap:8}}><button onClick={startCall} style={{border:0,background:'black',color:'white',borderRadius:20,padding:'8px 14px'}}>📹 Video</button></div>
      </div>

      {inCall&&(
        <div style={{background:'#000',padding:8,display:'flex',gap:8,position:'relative',height:240}}>
          <video ref={myVideo} autoPlay muted playsInline style={{width:'50%',borderRadius:12,background:'#111'}}/>
          <video ref={otherVideo} autoPlay playsInline style={{width:'50%',borderRadius:12,background:'#111'}}/>
          <button onClick={endCall} style={{position:'absolute',bottom:12,left:'50%',transform:'translateX(-50%)',background:'red',color:'white',border:0,borderRadius:20,padding:'8px 20px',fontWeight:'bold'}}>End Call</button>
        </div>
      )}

      <div style={{flex:1,overflowY:'auto',padding:12,background:'#fafafa',display:'flex',flexDirection:'column'}}>
        {messages.map(m=>(
          <div key={m.id} style={{alignSelf:m.from_username===me?'flex-end':'flex-start',background:m.from_username===me?'black':'white',color:m.from_username===me?'white':'black',padding:'10px 14px',borderRadius:m.from_username===me?'18px 18px 4px 18px':'18px 18px 18px 4px',margin:'4px 0',maxWidth:'75%',boxShadow:'0 1px 2px rgba(0,0,0,0.08)'}}>
            {m.text.includes('started video call')? <span>📹 Video call • <button onClick={startCall} style={{background:'#25D366',border:0,borderRadius:12,padding:'2px 8px',color:'white'}}>Join</button></span> : m.text}
          </div>
        ))}
      </div>

      <div style={{padding:10,borderTop:'1px solid #eee',display:'flex',gap:8}}><input value={text} onChange={e=>handleTyping(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Message..." style={{flex:1,padding:'12px 16px',borderRadius:24,border:'1px solid #ddd',background:'#f5f5f5'}}/><button onClick={send} style={{background:'black',color:'white',border:0,borderRadius:'50%',width:42,height:42,fontWeight:'bold'}}>↑</button></div>
    </div>
  )
}
