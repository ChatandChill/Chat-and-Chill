"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const LIVE_IMAGES = [
  ['Lagos', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600'],
  ['London', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600'],
  ['Atlanta', 'https://images.unsplash.com/photo-1516450360452-9312abbf6f7e?w=600'],
  ['Jozi', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600'],
]

export default function GreaterThanTikTok() {
  const [tab, setTab] = useState('fyp')
  const [showAuth, setShowAuth] = useState(false)
  const [mode, setMode] = useState('login')
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [liveCount, setLiveCount] = useState(0)
  const [notice, setNotice] = useState('')
  const [leaderboard] = useState([
    { name: 'LagosQueen', gifts: 1240 },
    { name: 'LondonKing', gifts: 980 },
    { name: 'AtlantaStar', gifts: 760 },
  ])

  useEffect(() => {
    if (!supabase) return undefined
    let active = true
    const loadLives = async () => {
      const { data } = await supabase.from('live_streams').select('*')
      if (active) setLiveCount(data?.length || 0)
    }
    supabase.auth.getUser().then(({ data }) => { if (active) setUser(data?.user || null) })
    loadLives()
    const auth = supabase.auth.onAuthStateChange((event, session) => setUser(session?.user || null))
    const channel = supabase.channel('greater-live-count').on('postgres_changes', { event: '*', schema: 'public', table: 'live_streams' }, loadLives).subscribe()
    return () => { active = false; auth.data.subscription.unsubscribe(); supabase.removeChannel(channel) }
  }, [])

  const openAuth = (nextMode = 'login') => { setMode(nextMode); setShowAuth(true) }
  const startMultiLive = async () => {
    if (!user) { openAuth('signup'); return }
    if (!supabase) { setNotice('Supabase live services are not configured.'); return }
    const { error } = await supabase.from('live_streams').insert({ user_email: user.email, title: 'Four-way African Pride Live 🌍', viewers: 0 })
    setNotice(error ? error.message : 'Multi-live session created. Invite three hosts from the LIVE room.')
    if (!error) setTab('live')
  }
  const handleAuth = async () => {
    if (!supabase) { setNotice('Supabase authentication is not configured.'); return }
    const result = mode === 'signup' ? await supabase.auth.signUp({ email, password: pass }) : await supabase.auth.signInWithPassword({ email, password: pass })
    if (result.error) setNotice(result.error.message)
    else { setShowAuth(false); setNotice(mode === 'signup' ? 'Account created. Check your email.' : 'Login successful.') }
  }

  return (
    <div style={{ height: '100vh', background: 'black', color: 'white', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <style>{`.scroll::-webkit-scrollbar{display:none}button{font:inherit}`}</style>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 56, zIndex: 100, display: 'flex', justifyContent: 'space-between', padding: '0 12px', alignItems: 'center', background: 'black' }}>
        <strong style={{ color: '#facc15', fontSize: 16 }}>CHAT & CHILL 🌍 <span style={{ fontSize: 10, background: '#facc15', color: 'black', padding: '2px 6px', borderRadius: 10, marginLeft: 6 }}>4-WAY MULTI-LIVE</span></strong>
        {user ? <button onClick={() => setTab('profile')} style={{ background: '#facc15', color: 'black', border: 0, padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 900 }}>PROFILE</button> : <button onClick={() => openAuth()} style={{ background: '#facc15', border: 0, padding: '6px 14px', borderRadius: 20, fontWeight: 900, fontSize: 11 }}>LOGIN</button>}
      </header>

      {tab === 'fyp' && <div className="scroll" style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory' }}><section style={{ height: '100vh', position: 'relative', scrollSnapAlign: 'start' }}><div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 2, background: 'black' }}>{LIVE_IMAGES.map(([city, image]) => <div key={city} style={{ position: 'relative' }}><img src={image} alt={`${city} live`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><span style={{ position: 'absolute', bottom: 4, left: 4, background: 'red', padding: '2px 4px', borderRadius: 6, fontSize: 8 }}> {city} ● LIVE</span></div>)}</div><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(0,0,0,.9))', pointerEvents: 'none' }} /><div style={{ position: 'absolute', top: 60, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', gap: 8 }}><span style={{ background: 'rgba(0,0,0,.65)', padding: '4px 8px', borderRadius: 12, fontSize: 11 }}>🌍 4 Countries · 1 LIVE</span><span style={{ background: '#facc15', color: 'black', padding: '4px 8px', borderRadius: 12, fontSize: 10, fontWeight: 900 }}>👁 45.2K watching</span></div><div style={{ position: 'absolute', bottom: 90, left: 12, right: 20 }}><strong style={{ fontSize: 14 }}>🔥 MULTI-LIVE — four hosts, one screen</strong><div style={{ fontSize: 11, marginTop: 4, color: '#facc15' }}>Lagos, London, Atlanta, and Jozi sharing one live room.</div><div style={{ display: 'inline-block', marginTop: 8, background: 'rgba(250,204,21,.2)', padding: '6px 10px', borderRadius: 12, fontSize: 11 }}>💬 Chinedu: Ẹ ku owuro! → Good morning!</div></div></section><section style={{ minHeight: '100vh', background: '#0a0a0a', padding: '70px 16px 100px' }}><h2 style={{ color: '#facc15', fontWeight: 900 }}>🏆 GLOBAL LEADERBOARD</h2><p style={{ fontSize: 12, color: '#888' }}>Creator rankings from recorded gift activity.</p>{leaderboard.map((person, index) => <div key={person.name} style={{ background: '#111', border: '1px solid #222', borderRadius: 12, padding: 12, display: 'flex', justifyContent: 'space-between', marginTop: 10 }}><span style={{ fontWeight: 900 }}>#{index + 1} {person.name} {index === 0 ? '👑' : ''}</span><span style={{ color: '#facc15', fontWeight: 900 }}>{person.gifts} gifts</span></div>)}<div style={{ marginTop: 20, background: '#facc15', color: 'black', padding: 16, borderRadius: 12, textAlign: 'center', fontWeight: 900 }}>💰 Creator split target: 70% after verified settlement</div></section></div>}

      {tab === 'live' && <div style={{ paddingTop: 70, padding: 12, height: '100vh', overflowY: 'auto' }}><button onClick={startMultiLive} style={{ width: '100%', background: '#ff3040', color: 'white', border: 0, padding: 16, borderRadius: 12, fontWeight: 900 }}>🔴 START 4-WAY MULTI-LIVE</button><p style={{ color: '#888', fontSize: 12 }}>Invite three friends from different cities into one live room. {liveCount} live records connected.</p></div>}
      {tab === 'market' && <div style={{ paddingTop: 70, padding: 12, height: '100vh' }}><h3 style={{ color: '#facc15' }}>🛍 MARKET + LIVE</h3><p style={{ color: '#888', fontSize: 12 }}>Browse African-made products while watching live rooms.</p></div>}
      {tab === 'profile' && <div style={{ paddingTop: 70, padding: 16, height: '100vh', background: '#0a0a0a' }}>{!user ? <div style={{ textAlign: 'center', marginTop: 40 }}><h2>PROFILE</h2><button onClick={() => openAuth()} style={{ background: '#facc15', border: 0, padding: 12, borderRadius: 20, fontWeight: 900 }}>LOGIN</button></div> : <div style={{ background: '#111', padding: 16, borderRadius: 16 }}><strong>{user.email}</strong><p style={{ color: '#facc15', fontSize: 12 }}>Creator earnings display requires verified transaction settlement.</p><button onClick={() => { supabase?.auth.signOut(); setUser(null); setTab('fyp') }} style={{ width: '100%', marginTop: 20, border: '1px solid #ff3040', background: 'transparent', color: '#ff3040', padding: 12, borderRadius: 12 }}>LOGOUT</button></div>}</div>}

      {showAuth && <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}><div style={{ background: '#111', width: '100%', maxWidth: 360, borderRadius: 20, padding: 20 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><h3>{mode === 'login' ? 'LOGIN' : 'SIGNUP'}</h3><button onClick={() => setShowAuth(false)} style={{ background: '#333', color: 'white', border: 0 }}>✕</button></div><input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{ width: '100%', padding: 12, boxSizing: 'border-box', background: 'black', color: 'white', border: '1px solid #333', marginTop: 12 }} /><input value={pass} onChange={(event) => setPass(event.target.value)} type="password" placeholder="Password" style={{ width: '100%', padding: 12, boxSizing: 'border-box', background: 'black', color: 'white', border: '1px solid #333', marginTop: 10 }} /><button onClick={handleAuth} style={{ width: '100%', marginTop: 14, padding: 14, background: '#facc15', border: 0, fontWeight: 900 }}>GO</button><button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ display: 'block', margin: '12px auto 0', background: 'none', border: 0, color: '#facc15' }}>{mode === 'login' ? 'Need account? SIGNUP' : 'Have account? LOGIN'}</button></div></div>}
      {notice && <div role="status" style={{ position: 'fixed', bottom: 70, left: 12, right: 12, zIndex: 11000, background: '#222', border: '1px solid #555', borderRadius: 10, padding: 12, textAlign: 'center' }}>{notice}<button onClick={() => setNotice('')} style={{ marginLeft: 10, background: 'none', border: 0, color: '#facc15' }}>✕</button></div>}
      <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 70, background: '#000', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 9999999 }}><button onClick={() => setTab('fyp')} style={{ background: 'none', border: 0, color: tab === 'fyp' ? '#facc15' : '#666', padding: 12 }}>FYP</button><button onClick={() => setTab('live')} style={{ background: 'none', border: 0, color: tab === 'live' ? '#facc15' : '#666', padding: 12 }}>LIVE</button><button onClick={startMultiLive} style={{ background: '#facc15', border: 0, width: 48, height: 48, borderRadius: 24, fontWeight: 900 }}>+</button><button onClick={() => setTab('market')} style={{ background: 'none', border: 0, color: tab === 'market' ? '#facc15' : '#666', padding: 12 }}>MARKET</button><button onClick={() => setTab('profile')} style={{ background: tab === 'profile' ? '#facc15' : '#222', border: 0, color: tab === 'profile' ? 'black' : 'white', padding: '10px 18px', borderRadius: 20, fontWeight: 900 }}>PROFILE</button></footer>
    </div>
  )
}
