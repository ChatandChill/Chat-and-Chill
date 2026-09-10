'use client'

import { useEffect, useState } from 'react'

const USERS = ['okiki', 'john', 'sarah', 'david', 'queen', 'amara', 'chidi', 'zainab']

export default function ChatPage() {
  const [selected, setSelected] = useState('okiki')
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const requestedUser = new URLSearchParams(window.location.search).get('user')
    if (requestedUser) setSelected(requestedUser)

    const roomId = `room_${requestedUser || selected}`

    fetch(`/api/chat?room_id=${encodeURIComponent(roomId)}`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = Array.isArray(data) ? data : []
        setChats(normalized)
      })
      .catch(() => setChats([]))
      .finally(() => setLoading(false))
  }, [])

  const send = async () => {
    if (!message.trim()) return

    const nextMessage = {
      id: `local-${Date.now()}`,
      room_id: `room_${selected}`,
      username: 'You',
      text: message.trim(),
      created_at: new Date().toISOString()
    }

    setChats((current) => [...current, nextMessage])
    setMessage('')

    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_id: `room_${selected}`, username: 'You', text: message.trim() })
      })
    } catch (error) {
      console.error('chat send fallback', error)
    }
  }

  const selectedChats = chats.filter(chat => chat.room_id === `room_${selected}` || chat.receiver === selected || chat.username)

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
          {loading && <p style={{ color: '#666' }}>Loading chat…</p>}
          {selectedChats.map((chat, index) => (
            <div key={chat.id || index} style={{ marginBottom: 10, background: '#222', padding: 10, borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: '#facc15', marginBottom: 4 }}>{chat.username || 'Guest'}</div>
              <div>{chat.text || chat.content}</div>
            </div>
          ))}
          {!loading && selectedChats.length === 0 && <p style={{ color: '#666' }}>No messages yet. Say hello to {selected}!</p>}
        </div>
        <div style={{ display: 'flex', padding: 10, borderTop: '1px solid #333' }}>
          <input value={message} onChange={event => setMessage(event.target.value)} placeholder={`Message ${selected}...`} style={{ flex: 1, padding: 12, borderRadius: 10, background: '#222', color: 'white', border: '1px solid #333' }} />
          <button onClick={send} style={{ marginLeft: 10, padding: '12px 20px', background: '#facc15', color: 'black', fontWeight: 900, borderRadius: 10 }}>Send</button>
        </div>
      </div>
    </div>
  )
}
