'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const USERS = ['okiki', 'john', 'sarah', 'david', 'queen', 'amara', 'chidi', 'zainab']

export default function ChatPage() {
  const [selected, setSelected] = useState('okiki')
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(r => setUser(r.data.user))
  }, [])

  const send = async () => {
    if (!message) return
    const newMsg = { sender: user?.email || 'me', receiver: selected, text: message, time: new Date().toLocaleTimeString() }
    setChats([...chats, newMsg])
    setMessage('')
    await supabase.from('messages').insert({ sender_id: user?.id, receiver: selected, content: message })
  }

  const selectedChats = chats.filter(chat => chat.receiver === selected)

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'black', color: 'white' }}>
      <div style={{ width: '35%', borderRight: '1px solid #333', overflowY: 'auto' }}>
        <h2 style={{ padding: 15, color: '#facc15', fontWeight: 900 }}>📥 INBOX</h2>
        {USERS.map(currentUser => (
          <div key={currentUser} onClick={() => setSelected(currentUser)} style={{ padding: 15, cursor: 'pointer', background: selected === currentUser ? '#222' : 'transparent', borderBottom: '1px solid #222' }}>
            👤 {currentUser} {selected === currentUser && '→'}
          </div>
        ))}
      </div>
      <div style={{ width: '65%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 15, borderBottom: '1px solid #333', fontWeight: 900 }}>Chatting with {selected} 🌍</div>
        <div style={{ flex: 1, padding: 15, overflowY: 'auto' }}>
          {selectedChats.map((chat, index) => (
            <div key={index} style={{ marginBottom: 10, background: '#222', padding: 10, borderRadius: 10 }}>{chat.text}</div>
          ))}
          {selectedChats.length === 0 && <p style={{ color: '#666' }}>No messages yet. Say hello to {selected}!</p>}
        </div>
        <div style={{ display: 'flex', padding: 10, borderTop: '1px solid #333' }}>
          <input value={message} onChange={event => setMessage(event.target.value)} placeholder={`Message ${selected}...`} style={{ flex: 1, padding: 12, borderRadius: 10, background: '#222', color: 'white', border: '1px solid #333' }} />
          <button onClick={send} style={{ marginLeft: 10, padding: '12px 20px', background: '#facc15', color: 'black', fontWeight: 900, borderRadius: 10 }}>Send</button>
        </div>
      </div>
    </div>
  )
}
