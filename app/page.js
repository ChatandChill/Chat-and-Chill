"use client";
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const name = prompt('Enter your name:') || 'Anonymous';
    setUsername(name);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { text: newMessage, user: username, id: Date.now() }]);
    setNewMessage('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>💬 Chat and Chill</h1>
      <div style={{ border: '1px solid #ccc', height: '400px', overflowY: 'auto', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: '8px' }}>
            <strong>{m.user}: </strong>{m.text}
          </div>
        ))}
        {messages.length === 0 && <p style={{ color: '#888' }}>No messages yet. Start chilling!</p>}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', background: 'black', color: 'white', border: 'none' }}>
          Send
        </button>
      </form>
    </div>
  );
}
