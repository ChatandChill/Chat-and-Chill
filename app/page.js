"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const GIFTS = Array.from({ length: 135 }, (_, index) => ({
  id: index + 1,
  name: `Gift ${index + 1}`,
  price: (index + 1) * 10,
  emoji: ["🌹", "🔥", "💛", "👑", "🚀", "💎", "🎉", "❤️"][index % 8],
}))

const MARKET = [
  { id: 1, name: "African Print Shirt", price: "$45", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  { id: 2, name: "Shea Butter", price: "$22", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400" },
  { id: 3, name: "Beads Set", price: "$18", img: "https://images.unsplash.com/photo-1611085583191-a3b08a6bb28c?w=400" },
  { id: 4, name: "Ankara Bag", price: "$35", img: "https://images.unsplash.com/photo-1590874103328-eac38a683806?w=400" },
]

const streamImages = [
  "1493225457124-a3eb161ffa5f",
  "1489599849927-2ee91cede3ba",
  "1516450360452-9312abbf6f7e",
]

export default function RealApp() {
  const [tab, setTab] = useState('fyp')
  const [showAuth, setShowAuth] = useState(false)
  const [mode, setMode] = useState('login')
  const [user, setUser] = useState(null)
  const [showGifts, setShowGifts] = useState(false)
  const [selectedGift, setSelectedGift] = useState(null)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!supabase) return undefined
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null))
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => setUser(session?.user || null))
    return () => listener.subscription.unsubscribe()
  }, [])

  const handleAuth = async () => {
    if (!supabase) {
      setNotice('Supabase authentication is not configured in this environment.')
      return
    }
    const result = mode === 'signup'
      ? await supabase.auth.signUp({ email, password: pass })
      : await supabase.auth.signInWithPassword({ email, password: pass })
    if (result.error) setNotice(result.error.message)
    else {
      setNotice(mode === 'signup' ? 'Check your email to confirm your account.' : 'Login successful.')
      setShowAuth(false)
    }
  }

  const logout = async () => {
    if (supabase) await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <div style={{ height: '100vh', background: 'black', color: 'white', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}@keyframes pop{0%{transform:scale(.7)}50%{transform:scale(1.4)}100%{transform:scale(1)}}button{font:inherit}`}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 56, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', background: 'linear-gradient(to bottom, black, transparent)' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <strong style={{ color: '#facc15', fontSize: 16 }}>CHAT & CHILL 🌍</strong>
          <nav style={{ display: 'flex', gap: 12, fontSize: 13 }}>
            {['fyp', 'live', 'market'].map((item) => <button key={item} onClick={() => setTab(item)} style={{ color: tab === item ? 'white' : '#888', fontWeight: tab === item ? 900 : 400, background: 'none', border: 0, borderBottom: tab === item ? '2px solid #facc15' : '2px solid transparent', padding: '0 0 4px', cursor: 'pointer' }}>{item === 'market' ? 'MARKET HUB' : item.toUpperCase()}</button>)}
          </nav>
        </div>
        {user ? <button onClick={logout} style={{ background: '#222', color: 'white', border: 0, padding: '6px 12px', borderRadius: 20, fontSize: 11 }}>👤 {user.email?.split('@')[0]}</button> : <div style={{ display: 'flex', gap: 6 }}><button onClick={() => { setMode('login'); setShowAuth(true) }} style={{ background: 'transparent', border: '1px solid #555', color: 'white', padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>LOGIN</button><button onClick={() => { setMode('signup'); setShowAuth(true) }} style={{ background: '#facc15', border: 0, color: 'black', padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 900 }}>SIGNUP</button></div>}
      </header>

      {tab === 'fyp' && <div style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory' }} className="no-scrollbar">
        {streamImages.map((image, index) => <section key={image} style={{ height: '100vh', position: 'relative', scrollSnapAlign: 'start' }}><img src={`https://images.unsplash.com/photo-${image}?w=1080`} alt="African live entertainment" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.2), rgba(0,0,0,.85))' }} /><div style={{ position: 'absolute', bottom: 90, left: 12, right: 70 }}><strong>@afrobeats_live{index + 1} • 12.4K 🌍 Lagos → Global</strong><div style={{ fontSize: 12, marginTop: 4 }}>African Pride FYP! Tap the gift button to send 135 gifts! #Afrobeats #Global</div><span style={{ display: 'inline-block', marginTop: 8, background: 'rgba(250,204,21,.2)', padding: '4px 8px', borderRadius: 12, fontSize: 11 }}>🎁 Kwame sent 🌹 x10</span></div><div style={{ position: 'absolute', right: 10, bottom: 110, display: 'grid', gap: 14, justifyItems: 'center' }}><div style={{ textAlign: 'center', width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,.2)', paddingTop: 5 }}>❤<br /><span style={{ fontSize: 10 }}>123K</span></div><button aria-label="Open gifts" onClick={() => setShowGifts(true)} style={{ width: 48, height: 48, borderRadius: 24, border: 0, background: '#facc15', fontSize: 22, cursor: 'pointer' }}>🎁</button></div></section>)}
      </div>}

      {tab === 'live' && <div className="no-scrollbar" style={{ paddingTop: 60, height: '100vh', overflowY: 'auto', padding: 12 }}><h2 style={{ color: '#facc15', fontWeight: 900 }}>🔴 LIVE NOW • Global African Pride</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10, marginTop: 12 }}>{Array.from({ length: 6 }, (_, index) => <button key={index} onClick={() => setTab('fyp')} style={{ position: 'relative', height: 200, border: 0, borderRadius: 12, overflow: 'hidden', background: '#111', color: 'white', textAlign: 'left', padding: 0, cursor: 'pointer' }}><img src={`https://images.unsplash.com/photo-${streamImages[index % 3]}?w=400`} alt="Live African entertainment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><span style={{ position: 'absolute', top: 6, left: 6, background: 'red', padding: '2px 6px', borderRadius: 10, fontSize: 10, fontWeight: 900 }}>LIVE</span><span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, black)', padding: 6, fontSize: 11 }}>@live_{index + 1}<br />👁 {(index + 1) * 3}.2K</span></button>)}</div></div>}

      {tab === 'market' && <div className="no-scrollbar" style={{ paddingTop: 60, height: '100vh', overflowY: 'auto', padding: 12 }}><h2 style={{ color: '#facc15', fontWeight: 900 }}>🛍 MARKET HUB • African Made</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12, marginTop: 12 }}>{MARKET.map((item) => <article key={item.id} style={{ background: '#151515', borderRadius: 12, overflow: 'hidden' }}><img src={item.img} alt={item.name} style={{ width: '100%', height: 150, objectFit: 'cover' }} /><div style={{ padding: 10 }}><strong>{item.name}</strong><div style={{ color: '#facc15', marginTop: 4 }}>{item.price}</div><button onClick={() => setNotice(`${item.name} added to your interest list.`)} style={{ marginTop: 8, width: '100%', padding: 8, border: 0, borderRadius: 8, background: '#facc15', fontWeight: 800 }}>View item</button></div></article>)}</div></div>}

      {notice && <div role="status" style={{ position: 'fixed', bottom: 18, left: 18, right: 18, zIndex: 200, background: '#222', border: '1px solid #555', borderRadius: 10, padding: 12, textAlign: 'center' }}>{notice}<button onClick={() => setNotice('')} style={{ marginLeft: 12, background: 'none', color: '#facc15', border: 0 }}>X</button></div>}

      {showGifts && <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,.9)', padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '100%', maxWidth: 520, maxHeight: '80vh', overflowY: 'auto', background: '#171717', border: '1px solid #333', borderRadius: 16, padding: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h2 style={{ color: '#facc15', margin: 0 }}>🎁 Choose a gift</h2><button onClick={() => setShowGifts(false)} style={{ background: '#333', color: 'white', border: 0, borderRadius: 16, width: 32, height: 32 }}>X</button></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 8, marginTop: 14 }}>{GIFTS.map((gift) => <button key={gift.id} onClick={() => { setSelectedGift(gift); setShowGifts(false); setNotice(`${gift.emoji} ${gift.name} selected. Live gift settlement requires a verified transaction.`) }} style={{ background: selectedGift?.id === gift.id ? '#facc15' : '#222', color: selectedGift?.id === gift.id ? 'black' : 'white', border: 0, borderRadius: 8, padding: 8, cursor: 'pointer' }}><span style={{ fontSize: 24 }}>{gift.emoji}</span><small style={{ display: 'block' }}>₦{gift.price}</small></button>)}</div></div></div>}

      {showAuth && <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}><div style={{ background: '#1a1a1a', width: '100%', maxWidth: 340, borderRadius: 20, padding: 20, border: '1px solid #333' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}><h2 style={{ margin: 0 }}>{mode === 'login' ? 'LOGIN' : 'SIGNUP'}</h2><button onClick={() => setShowAuth(false)} style={{ background: '#333', color: 'white', border: 0, width: 30, height: 30, borderRadius: 15 }}>X</button></div><div style={{ display: 'flex', gap: 8, marginBottom: 16 }}><button onClick={() => setMode('login')} style={{ flex: 1, padding: 10, background: mode === 'login' ? '#facc15' : '#333', border: 0, borderRadius: 12 }}>LOGIN</button><button onClick={() => setMode('signup')} style={{ flex: 1, padding: 10, background: mode === 'signup' ? '#facc15' : '#333', border: 0, borderRadius: 12 }}>SIGNUP</button></div><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email address" style={{ width: '100%', boxSizing: 'border-box', padding: 12, borderRadius: 10, border: '1px solid #333', background: 'black', color: 'white', marginBottom: 10 }} /><input value={pass} onChange={(event) => setPass(event.target.value)} type="password" placeholder="Password" style={{ width: '100%', boxSizing: 'border-box', padding: 12, borderRadius: 10, border: '1px solid #333', background: 'black', color: 'white', marginBottom: 14 }} /><button onClick={handleAuth} style={{ width: '100%', padding: 14, borderRadius: 12, border: 0, background: '#facc15', fontWeight: 900 }}>{mode === 'login' ? 'LOGIN NOW' : 'CREATE ACCOUNT'}</button><div style={{ color: '#888', fontSize: 11, textAlign: 'center', marginTop: 12 }}>African Pride • Global</div></div></div>}
    </div>
  )
}
