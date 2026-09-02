JAVA SCRIPT

use client";
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

const LEVELS = {
  Newbie: { min: 0, color: '#6B7280', icon: '🌱' },
  Bronze: { min: 10, color: '#CD7F32', icon: '🥉' },
  Silver: { min: 50, color: '#C0C0C0', icon: '🥈' },
  Gold: { min: 200, color: '#FFD700', icon: '🥇' },
  Diamond: { min: 1000, color: '#B9F2FF', icon: '💎' }
};

export default function ChatAndChill() {
  const [view, setView] = useState('auth'); // auth | otp | chat
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['','','','','','']);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const otpRefs = useRef([]);

  // Aurora + Premium Auth UI
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0F',
      backgroundImage: 'radial-gradient(1200px 600px at 20% -10%, #1A0B2E 0%, transparent 60%), radial-gradient(900px 500px at 90% 10%, #2A143E 0%, transparent 50%), radial-gradient(700px 400px at 50% 120%, rgba(255,107,74,0.15) 0%, transparent 70%)',
      color: 'white',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'grid',
      placeItems: 'center',
      padding: '24px'
    }}>
      {view === 'auth' && (
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: 16, background: '#FF6B4A', display: 'grid', placeItems: 'center', fontSize: 24 }}>💬</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Chat & Chill</h1>
            <p style={{ opacity: 0.6, marginTop: 8 }}>Drop Gifts. Go Live. Earn Daily.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24, backdropFilter: 'blur(20px)' }}>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 16px', color: 'white', outline: 'none' }} />
            <button onClick={async()=>{
              const { error } = await supabase.auth.signInWithOtp({ email });
              if(!error) setView('otp');
            }} style={{ width: '100%', marginTop: 16, background: '#FF6B4A', color: 'white', border: 0, borderRadius: 12, padding: '14px', fontWeight: 600, cursor: 'pointer' }}>
              Send Magic Code
            </button>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              {Object.entries(LEVELS).map(([name, lvl])=>(
                <div key={name} style={{ flex:1, textAlign:'center', padding: '8px 4px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>{lvl.icon}</div><div style={{ fontSize: 10, marginTop: 4, opacity: 0.7 }}>{name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'otp' && (
        <div style={{ width: '100%', maxWidth: 420, textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>Check your email</h2>
          <p style={{ opacity: 0.6, marginTop: 8, marginBottom: 24 }}>We sent a 6-digit code to {email}</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            {otp.map((digit,i)=>(
              <input key={i} ref={el=>otpRefs.current[i]=el} value={digit}
                onChange={e=>{
                  const v = e.target.value.slice(-1);
                  const next = [...otp]; next[i]=v; setOtp(next);
                  if(v && i<5) otpRefs.current[i+1]?.focus();
                  if(next.join('').length===6){
                    supabase.auth.verifyOtp({ email, token: next.join(''), type: 'email' }).then(({data})=>{
                      if(data?.user){ setUser(data.user); setView('chat'); }
                    });
                  }
                }}
                style={{ width: 48, height: 56, textAlign:'center', fontSize: 20, fontWeight: 700, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, color: 'white' }} />
            ))}
          </div>
          <button onClick={()=>setView('auth')} style={{ marginTop: 24, background:'transparent', border:0, color:'rgba(255,255,255,0.5)', cursor:'pointer' }}>← Change email</button>
        </div>
      )}

      {view === 'chat' && (
        <div style={{ width: '100%', maxWidth: 720, height: '80vh', display:'flex', flexDirection:'column', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow:'hidden' }}>
          <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontWeight: 600 }}>LIVE • Lagos Lounge</span>
            <span style={{ background: '#FF6B4A', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>GOLD • 247 gifts</span>
          </div>
          <div style={{ flex:1, padding: 16, overflowY: 'auto', display:'flex', flexDirection:'column', gap: 12 }}>
            {messages.map((m,i)=><div key={i} style={{ background: 'rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: 12, alignSelf:'flex-start' }}>{m.text}</div>)}
            <div style={{ background: 'linear-gradient(90deg, rgba(255,107,74,0.2), transparent)', borderLeft: '3px solid #FF6B4A', padding: '10px 14px', borderRadius: '0 12px 12px 0' }}>🎁 @Ade sent Diamond Gift • +50 XP</div>
          </div>
          <div style={{ padding: 12, display:'flex', gap: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <input value={newMsg} onChange={e=>setNewMsg(e.target.value)} placeholder="Type a message..."
              style={{ flex:1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 14px', color:'white' }} />
            <button onClick={()=>{
              if(!newMsg.trim()) return;
              setMessages([...messages, { text: newMsg }]); setNewMsg('');
            }} style={{ background:'#FF6B4A', border:0, borderRadius:12, padding:'0 20px', color:'white', fontWeight:600 }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
