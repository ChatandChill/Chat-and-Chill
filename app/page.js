"use client";
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [entered, setEntered] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('chat-pin-entered');
    if (saved === 'yes') {
      setEntered(true);
      const name = localStorage.getItem('chat-username') || 'Anonymous';
      setUsername(name);
      fetchMessages();
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true }).limit(100);
    if (data) setMessages(data);
  };

  const checkPin = (e) => {
    e.preventDefault();
    if (pinInput === '1707') {
      setEntered(true);
      localStorage.setItem('chat-pin-entered', 'yes');
      const name = prompt('Enter your name:') || 'Anonymous';
      setUsername(name);
      localStorage.setItem('chat-username', name);
      fetchMessages();
    } else {
      alert('Wrong PIN');
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await supabase.from('messages').insert({ text: newMessage, user_name: username });
    setNewMessage('');
    fetchMessages();
  };

  if (!entered) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
        <h1>🔒 Chat and Chill</h1>
        <p>Enter PIN to enter</p>
        <form onSubmit={checkPin} style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <input type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} placeholder="Enter PIN" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', flex: 1 }} />
          <button type="submit" style={{ padding: '12px 20px', borderRadius: '8px', background: 'black', color: 'white', border: 'none' }}>Enter</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>💬 Chat and Chill</h1>
      <p style={{ textAlign: 'center', color: '#888' }}>Logged in as {username} | PIN 1707</p>
      <div style={{ border: '1px solid #ccc', height: '400px', overflowY: 'auto', padding: '10px', borderRadius: '8px', marginBottom: '10px', background: '#fafafa' }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: '8px' }}>
            <strong>{m.user_name}: </strong>{m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '12px 20px', borderRadius: '8px', background: 'black', color: 'white', border: 'none' }}>Send</button>
      </form>
    </div>
  );
}
