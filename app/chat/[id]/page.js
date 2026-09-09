'use client'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ChatRoom({ params }){
  const search=useSearchParams()
  const me=search.get('me')
  const other=search.get('other')
  const roomId = params?.id || params?.params?.id

  const [messages,setMessages]=useState([])
  const [text,setText]=useState('')
  const [inCall,setInCall]=useState(false)
  const [otherTyping,setOtherTyping]=useState(false)

  const myVideo=useRef()
  const otherVideo=useRef()
  const pc=useRef()
  const localStream=useRef()

  const load=async()=>{
    if(!roomId) return
    try{
      const r=await fetch(`/api/chat?room_id=${roomId}`)
      const d=await r.json()
      if(Array.isArray(d)) setMessages(d)

      const t=await fetch(`/api/typing?room_id=${roomId}`).then(r=>r.json()).catch(()=>[])
      const o=t.find(x=>x.username!==me)
      setOtherTyping(!!o)
    }catch(e){}
  }

  useEffect(()=>{
    load()
    const i=setInterval(load,1500)
    return()=>clearInterval(i)
  },[roomId])

  const handleTyping=async(v)=>{
    setText(v)
    if(!roomId) return
    await fetch(`/api/typing`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ room_id: roomId, username: me, typing: v.length>0 })
    }).catch(()=>{})
  }

  const send=async()=>{
    if(!text.trim() ||!roomId) return
    const msg=text
    setText('')
    await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ room_id: roomId, text: msg, username: me })
    })
    load()
  }

  const startCall=async()=>{
    setInCall(true)
    try{
      const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true})
      localStream.current=stream
      if(myVideo.current) myVideo.current.srcObject=stream
      if(otherVideo.current) otherVideo.current.srcObject=stream
    }catch(e){ console.log(e) }
  }

  const endCall=()=>{
    localStream.current?.getTracks().forEach(t=>t.stop())
    setInCall(false)
  }

  return (
    <div style={{maxWidth:500,margin:'0 auto',height:'100vh',display:'flex',flexDirection:'column',fontFamily:'sans-serif'}}>
      <div style={{padding:12,borderBottom:'1px solid #eee',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',gap:10,alignItems:'center'}}><a href="/inbox" style={{textDecoration:'none'}}>←</a> <b>{other}</b> {otherTyping && <span style={{fontSize:12,color:'green'}}>typing...</span>}</div>
        <div style={{display:'flex',gap:8}}><button onClick={startCall} style={{border:0,background:'black',color:'white',padding:'6px 12px',borderRadius:20}}>Video call</button></div>
      </div>

      {inCall&&(
        <div style={{background:'#000',padding:8,display:'flex',gap:8,position:'relative',height:240}}>
          <video ref={myVideo} autoPlay muted playsInline style={{width:'50%',borderRadius:12,background:'#111'}}></video>
          <video ref={otherVideo} autoPlay playsInline style={{width:'50%',borderRadius:12,background:'#111'}}></video>
          <button onClick={endCall} style={{position:'absolute',bottom:12,left:'50%',transform:'translateX(-50%)',background:'red',color:'white',border:0,padding:'6px 12px',borderRadius:20}}>End</button>
        </div>
      )}

      <div style={{flex:1,overflowY:'auto',padding:12,background:'#fafafa',display:'flex',flexDirection:'column',gap:8}}>
        {messages.map(m=>(
          <div key={m.id} style={{alignSelf: m.username===me? 'flex-end':'flex-start',background:m.username===me?'black':'white',color:m.username===me?'white':'black',padding:'8px 12px',borderRadius:18,maxWidth:'75%'}}>{m.text}</div>
        ))}
      </div>

      <div style={{padding:10,borderTop:'1px solid #eee',display:'flex',gap:8}}>
        <input value={text} onChange={e=>handleTyping(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Message..." style={{flex:1,padding:12,borderRadius:25,border:'1px solid #ddd',outline:'none'}} />
        <button onClick={send} style={{background:'black',color:'white',border:0,width:45,height:45,borderRadius:'50%'}}>↑</button>
      </div>
    </div>
  )
}
