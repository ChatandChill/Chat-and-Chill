'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Inbox(){
  const [myName,setMyName]=useState('')
  const [logged,setLogged]=useState(false)
  const [conversations,setConversations]=useState([])
  const [stories,setStories]=useState([])
  const [newChatName,setNewChatName]=useState('')
  const [viewStory,setViewStory]=useState(null)
  const fileRef=useRef()

  const loadData=async()=>{
    const conv=await fetch(`/api/conversations?user=${myName}`).then(r=>r.json())
    setConversations(conv||[])
    const st=await fetch('/api/stories').then(r=>r.json())
    setStories(st||[])
  }
  useEffect(()=>{ if(logged) { loadData(); const i=setInterval(loadData,3000); return()=>clearInterval(i) }},[logged])

  const startChat=async()=>{
    if(!newChatName) return
    await fetch('/api/conversations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user1:myName,user2:newChatName})})
    setNewChatName(''); loadData()
  }

  const uploadStory=async(e)=>{
    const file=e.target.files[0]; if(!file) return
    const form=new FormData(); form.append('file',file); form.append('username',myName)
    await fetch('/api/stories',{method:'POST',body:form})
    loadData(); alert('Story posted! 24hr 🔥')
  }

  if(!logged) return (
    <div style={{maxWidth:380,margin:'80px auto',padding:24,textAlign:'center',fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:50}}>💬</h1><h2>Chat & Chill V2</h2><p style={{color:'#666'}}>IG + TikTok + Snapchat</p>
      <input placeholder="Your username" value={myName} onChange={e=>setMyName(e.target.value)} style={{width:'100%',padding:14,borderRadius:12,border:'1px solid #ddd',marginTop:20}}/>
      <button onClick={()=>myName&&setLogged(true)} style={{width:'100%',padding:14,background:'black',color:'white',borderRadius:12,marginTop:12,fontWeight:'bold'}}>Enter</button>
    </div>
  )

  return (
    <div style={{maxWidth:500,margin:'0 auto',background:'white',minHeight:'100vh',fontFamily:'sans-serif',position:'relative'}}>
      {/* STORIES */}
      <div style={{display:'flex',gap:12,overflowX:'auto',padding:'12px 16px',borderBottom:'1px solid #eee'}}>
        <div style={{textAlign:'center',cursor:'pointer'}} onClick={()=>fileRef.current.click()}>
          <div style={{width:62,height:62,borderRadius:'50%',background:'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)',padding:2.5}}>
            <div style={{background:'white',borderRadius:'50%',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>+</div>
          </div>
          <div style={{fontSize:11,marginTop:4}}>Add Story</div>
          <input ref={fileRef} type="file" accept="image/*,video/*" hidden onChange={uploadStory}/>
        </div>
        {stories.map(s=>(
          <div key={s.id} style={{textAlign:'center',minWidth:62,cursor:'pointer'}} onClick={()=>setViewStory(s)}>
            <img src={s.image_url} style={{width:62,height:62,borderRadius:'50%',border:'2px solid #d62976',objectFit:'cover'}}/>
            <div style={{fontSize:11,marginTop:4}}>{s.username}</div>
          </div>
        ))}
      </div>

      {/* INBOX */}
      <div style={{padding:16}}>
        <div style={{display:'flex',gap:8,marginBottom:16}}>
          <input placeholder="Search or new chat (e.g. Tola)" value={newChatName} onChange={e=>setNewChatName(e.target.value)} style={{flex:1,padding:12,borderRadius:20,border:'1px solid #ddd',background:'#f5f5f5'}}/>
          <button onClick={startChat} style={{padding:'12px 18px',background:'black',color:'white',borderRadius:20,border:0,fontWeight:'bold'}}>New</button>
        </div>
        <h3 style={{margin:'0 0 12px 0'}}>Messages 🔒 Encrypted</h3>
        {conversations.map(c=>{
          const other=c.user1===myName?c.user2:c.user1
          return (
            <Link key={c.id} href={`/chat/${c.id}?me=${myName}&other=${other}`} style={{textDecoration:'none',color:'black'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:'1px solid #f5f5f5'}}>
                <img src={`https://i.pravatar.cc/100?u=${other}`} style={{width:52,height:52,borderRadius:'50%'}}/>
                <div style={{flex:1}}><div style={{fontWeight:'bold',display:'flex',gap:6}}>{other} <span style={{width:8,height:8,background:'#00c851',borderRadius:'50%',display:'inline-block',marginTop:6}}></span></div><div style={{fontSize:13,color:'#666',maxWidth:200,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.last_message||'Tap to chat 🔒'}</div></div>
                <div style={{fontSize:11,color:'#999'}}>now</div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* STORY VIEWER - Snapchat style */}
      {viewStory&&(
        <div style={{position:'fixed',inset:0,background:'black',zIndex:99,display:'flex',flexDirection:'column'}} onClick={()=>setViewStory(null)}>
          <div style={{padding:12,color:'white',display:'flex',gap:10,alignItems:'center'}}><img src={`https://i.pravatar.cc/100?u=${viewStory.username}`} style={{width:32,height:32,borderRadius:'50%'}}/><b>{viewStory.username}</b><span style={{fontSize:11,opacity:0.7}}>• now</span></div>
          <img src={viewStory.image_url} style={{flex:1,objectFit:'contain',width:'100%'}}/>
          <div style={{padding:20,textAlign:'center',color:'white'}}>Tap to close</div>
        </div>
      )}
    </div>
  )
}
