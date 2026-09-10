"use client"

import { useState } from "react"

export default function Home() {
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('login')

  const openLogin = () => { setMode('login'); setShow(true) }
  const openSignup = () => { setMode('signup'); setShow(true) }

  return (
    <div style={{ height: '100vh', width: '100%', background: 'black', position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <div style={{ height: '100vh', position: 'relative' }}>
          <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1080" alt="Afrobeats live crowd" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />

          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', background: 'linear-gradient(to bottom, black, transparent)' }}>
            <div style={{ color: '#facc15', fontWeight: 900 }}>CHAT & CHILL 🌍</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={openLogin} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid white', padding: '8px 16px', borderRadius: 20, fontWeight: 900 }}>LOGIN</button>
              <button onClick={openSignup} style={{ background: '#facc15', color: 'black', border: 'none', padding: '8px 16px', borderRadius: 20, fontWeight: 900 }}>SIGNUP</button>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 80, left: 12, color: 'white' }}>
            <div style={{ fontWeight: 900 }}>@afrobeats_live • LIVE 12.4K 🌍</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>African Pride Global — Tap LOGIN top right</div>
          </div>
        </div>
      </div>

      {show && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#1a1a1a', width: '100%', maxWidth: 340, borderRadius: 20, padding: 20, border: '1px solid #333' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ color: 'white', margin: 0, fontSize: 18, fontWeight: 900 }}>{mode === 'login' ? 'LOGIN' : 'SIGNUP'}</h2>
              <button aria-label="Close login dialog" onClick={() => setShow(false)} style={{ background: '#333', color: 'white', border: 'none', width: 30, height: 30, borderRadius: 15 }}>X</button>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16, background: 'black', padding: 4, borderRadius: 20 }}>
              <button onClick={() => setMode('login')} style={{ flex: 1, padding: 10, borderRadius: 16, border: 'none', fontWeight: 900, background: mode === 'login' ? '#facc15' : 'transparent', color: mode === 'login' ? 'black' : 'white' }}>LOGIN</button>
              <button onClick={() => setMode('signup')} style={{ flex: 1, padding: 10, borderRadius: 16, border: 'none', fontWeight: 900, background: mode === 'signup' ? '#facc15' : 'transparent', color: mode === 'signup' ? 'black' : 'white' }}>SIGNUP</button>
            </div>

            <input aria-label="Email address" placeholder="Email address" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #333', background: 'black', color: 'white', marginBottom: 10, boxSizing: 'border-box' }} />
            <input aria-label="Password" placeholder="Password" type="password" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #333', background: 'black', color: 'white', marginBottom: 14, boxSizing: 'border-box' }} />

            <button onClick={() => { window.alert(`${mode} SUCCESS!`); setShow(false) }} style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', background: '#facc15', color: 'black', fontWeight: 900 }}>
              {mode === 'login' ? 'LOGIN NOW' : 'CREATE ACCOUNT'}
            </button>
            <div style={{ color: '#888', fontSize: 11, textAlign: 'center', marginTop: 12 }}>African Pride • Global</div>
          </div>
        </div>
      )}
    </div>
  )
}
