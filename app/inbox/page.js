'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Inbox() {
  const [myName, setMyName] = useState('')
  const [logged, setLogged] = useState(false)
  const [conversations, setConversations] = useState([])
  const [stories, setStories] = useState([])
  const [newChatName, setNewChatName] = useState('')

  useEffect(()=>{
    if(logged) {
      fetch(`/api/conversations?user=${myName}`).then(r=>r.json()).then(setConversations)
      fetch('/api/stories').then(r=>r.json()).then(setStories)
    }
  }, [logged])

  const startChat = async () => {
    if(!newChatName) return
    await fetch('/api/conversations', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user1: myName, user2: newChatName})})
    setNewChatName('')
    const data = await fetch(`/api/conversations?user=${myName}`).then(r=>r.json())
    setConversations(data)
  }

  if(!logged) {
    return (
      <div style={{maxWidth:400, margin:'80px auto', padding:20, fontFamily:'sans-serif', textAlign:'center'}}>
        <h1 style={{fontSize:40}}>💬</h1>
        <h2>Chat & Chill V2</h2>
        <input placeholder="Enter your username" value={myName} onChange={e=>setMyName(e.target.value)} style={{width:'100%', padding:14, borderRadius:12, border:'1px solid #ddd', marginTop:20}} />
        <button onClick={()=> myName && setLogged(true)} style={{width:'100%', padding:14, background:'black', color:'white', borderRadius:12, marginTop:12, fontWeight:'bold'}}>Enter Inbox</button>
      </div>
    )
  }

  return (
    <div style={{maxWidth:500, margin:'0 auto', fontFamily:'sans-serif', background:'white', minHeight:'100vh'}}>
      {/* STORIES BAR - Snapchat style */}
      <div style={{display:'flex', gap:12, overflowX:'auto', padding:'12px 16px', borderBottom:'1px solid #eee'}}>
        <div style={{textAlign:'center'}}>
          <div style={{width:60, height:60, borderRadius:'50%', background:'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)', padding:2}}>
            <div style={{background:'white', borderRadius:'50%', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>+</div>
          </div>
          <div style={{fontSize:11, marginTop:4}}>Your Story</div>
        </div>
        {stories.map(s=>(
          <div key={s.id} style={{textAlign:'center', minWidth:60}}>
            <img src={s.image_url || `https://i.pravatar.cc/100?u=${s.username}`} style={{width:60, height:60, borderRadius:'50%', border:'2px solid #d62976'}} />
            <div style={{fontSize:11, marginTop:4}}>{s.username}</div>
          </div>
        ))}
      </div>

      {/* INBOX LIST - Instagram style */}
      <div style={{padding:16}}>
        <div style={{display:'flex', gap:8, marginBottom:16}}>
          <input placeholder="Search or start new chat..." value={newChatName} onChange={e=>setNewChatName(e.target.value)} style={{flex:1, padding:10, borderRadius:20, border:'1px solid #ddd', background:'#f5f5f5'}} />
          <button onClick={startChat} style={{padding:'10px 16px', background:'black', color:'white', borderRadius:20, border:0}}>New</button>
        </div>
        <h3 style={{margin:'0 0 12px 0'}}>Messages</h3>
        {conversations.map(c=>{
          const other = c.user1===myName? c.user2 : c.user1
          return (
            <Link key={c.id} href={`/chat/${c.id}?me=${myName}&other=${other}`} style={{textDecoration:'none', color:'black'}}>
              <div style={{display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid #f5f5f5'}}>
                <img src={`https://i.pravatar.cc/100?u=${other}`} style={{width:52, height:52, borderRadius:'50%'}} />
                <div style={{flex:1}}>
                  <div style={{fontWeight:'bold'}}>{other}</div>
                  <div style={{fontSize:13, color:'#666', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:200}}>{c.last_message || 'Start chatting 🔒'}</div>
                </div>
                <div style={{fontSize:11, color:'#999'}}>now</div>
              </div>
            </Link>
          )
        })}
        {conversations.length===0 && <div style={{textAlign:'center', color:'#999', marginTop:40}}>No chats yet. Start a new chat above 👆</div>}
      </div>
    </div>
  )
}
