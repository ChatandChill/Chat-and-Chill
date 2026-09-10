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
]

const STREAM_IMAGES = [
  "1493225457124-a3eb161ffa5f",
  "1489599849927-2ee91cede3ba",
  "1516450360452-9312abbf6f7e",
]

export default function ConnectedApp() {
  const [tab, setTab] = useState('fyp')
  const [showAuth, setShowAuth] = useState(false)
  const [mode, setMode] = useState('login')
  const [user, setUser] = useState(null)
  const [showGifts, setShowGifts] = useState(false)
  const [selectedGift, setSelectedGift] = useState(null)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [liveFeeds, setLiveFeeds] = useState([])
  const [giftFeed, setGiftFeed] = useState([])
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!supabase) return undefined

    let active = true
    const loadFeeds = async () => {
      const [{ data: streams }, { data: gifts }] = await Promise.all([
        supabase.from('live_streams').select('*').order('created_at', { ascending: false }),
        supabase.from('gift_sends').select('*').order('created_at', { ascending: false }).limit(10),
      ])
      if (active) {
        setLiveFeeds(streams || [])
        setGiftFeed(gifts || [])
      }
    }

    supabase.auth.getUser().then(({ data }) => { if (active) setUser(data?.user || null) })
    loadFeeds()
    const giftChannel = supabase.channel('gifts').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'gift_sends' }, (payload) => setGiftFeed((current) => [payload.new, ...current].slice(0, 10))).subscribe()
    const liveChannel = supabase.channel('lives').on('postgres_changes', { event: '*', schema: 'public', table: 'live_streams' }, loadFeeds).subscribe()
    const authChannel = supabase.auth.onAuthStateChange((event, session) => setUser(session?.user || null))

    return () => {
      active = false
      supabase.removeChannel(giftChannel)
      supabase.removeChannel(liveChannel)
      authChannel.data.subscription.unsubscribe()
    }
  }, [])

  const openAuth = (nextMode) => { setMode(nextMode); setShowAuth(true) }

  const handleAuth = async () => {
    if (!supabase) { setNotice('Supabase authentication is not configured in this environment.'); return }
    const result = mode === 'signup'
      ? await supabase.auth.signUp({ email, password: pass })
      : await supabase.auth.signInWithPassword({ email, password: pass })
    if (result.error) setNotice(result.error.message)
    else { setNotice(mode === 'signup' ? 'Account created. Check your email to confirm it.' : 'Login successful.'); setShowAuth(false) }
  }

  const requireUser = () => {
    if (!user) { openAuth('signup'); return false }
    return true
  }

  const sendGift = async () => {
    if (!requireUser() || !selectedGift || !supabase) return
    const { error } = await supabase.from('gift_sends').insert({ gift_id: selectedGift.id, gift_name: selectedGift.name, sender_email: user.email, receiver: '@afrobeats_live' })
    if (error) setNotice(error.message)
    else { setShowGifts(false); setSelectedGift(null); setNotice(`🔥 SENT ${selectedGift.name} ${selectedGift.emoji} GLOBALLY!`) }
  }

  const goLive = async () => {
    if (!requireUser() || !supabase) return
    const { error } = await supabase.from('live_streams').insert({ user_email: user.email, title: 'African Pride Live 🌍', viewers: Math.floor(Math.random() * 5000) })
    if (error) setNotice(error.message)
    else { setNotice('🔴 You are now live globally.'); setTab('live') }
  }

  const buyProduct = async (product) => {
    if (!requireUser() || !supabase) return
    const { error } = await supabase.from('market_orders').insert({ product_name: product.name, price: product.price, buyer_email: user.email })
    setNotice(error ? error.message : `🛍 Ordered ${product.name}. The seller will contact ${user.email}.`)
  }

  return (
    <div style={{ height: '100vh', background: 'black', color: 'white', overflow: 'hidden', position: 'relative', fontFamily: 'sans-serif' }}>
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}button{font:inherit}`}</style>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 56, zIndex: 100, display: 'flex', justifyContent: 'space-between', padding: '0 12px', alignItems: 'center', background: 'linear-gradient(black, transparent)' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><strong style={{ color: '#facc15' }}>CHAT & CHILL 🌍</strong><nav style={{ display: 'flex', gap: 12 }}><button onClick={() => setTab('fyp')} style={{ background: 'none', border: 0, color: tab === 'fyp' ? 'white' : '#888' }}>FYP</button><button onClick={() => setTab('live')} style={{ background: 'none', border: 0, color: tab === 'live' ? 'white' : '#888' }}>LIVE {liveFeeds.length ? `(${liveFeeds.length})` : ''}</button><button onClick={() => setTab('market')} style={{ background: 'none', border: 0, color: tab === 'market' ? 'white' : '#888' }}>MARKET</button></nav></div>
        {user ? <button onClick={() => supabase?.auth.signOut()} style={{ background: '#222', color: 'white', border: 0, padding: '6px 10px', borderRadius: 20, fontSize: 11 }}>👤 {user.email?.split('@')[0]} • LOGOUT</button> : <div style={{ display: 'flex', gap: 6 }}><button onClick={() => openAuth('login')} style={{ background: 'transparent', border: '1px solid #555', color: 'white', padding: '6px 12px', borderRadius: 20, fontSize: 11 }}>LOGIN</button><button onClick={() => openAuth('signup')} style={{ background: '#facc15', border: 0, color: 'black', padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 900 }}>SIGNUP</button></div>}
      </header>

      {tab === 'fyp' && <div className="no-scrollbar" style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory' }}>{[1, 2, 3].map((item, index) => <section key={item} style={{ height: '100vh', position: 'relative', scrollSnapAlign: 'start' }}><img src={`https://images.unsplash.com/photo-${STREAM_IMAGES[index]}?w=1080`} alt="African live entertainment" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.85))' }} /><div style={{ position: 'absolute', bottom: 90, left: 12, right: 70 }}><strong>@afrobeats_live{item} • {giftFeed[0]?.sender_email?.split('@')[0] || 'Kwame'} sent {giftFeed[0]?.gift_name || 'Rose'} 🌹</strong><div style={{ fontSize: 11, marginTop: 6, background: 'rgba(250,204,21,.2)', padding: '4px 8px', borderRadius: 12, display: 'inline-block' }}>{giftFeed.slice(0, 2).map((gift) => `🎁 ${gift.sender_email?.split('@')[0] || 'Guest'} sent ${gift.gift_name}`).join(' • ') || '🎁 Be the first to send a gift globally'}</div></div><button aria-label="Open gifts" onClick={() => setShowGifts(true)} style={{ position: 'absolute', right: 10, bottom: 110, width: 48, height: 48, borderRadius: 24, border: 0, background: '#facc15', fontSize: 22 }}>🎁</button></section>)}</div>}

      {tab === 'live' && <div className="no-scrollbar" style={{ paddingTop: 60, padding: 12, height: '100vh', overflowY: 'auto' }}><button onClick={goLive} style={{ width: '100%', background: '#ff3040', color: 'white', border: 0, padding: 14, borderRadius: 12, fontWeight: 900, marginBottom: 12 }}>🔴 GO LIVE NOW — GLOBAL</button><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{liveFeeds.map((live) => <div key={live.id} style={{ height: 180, borderRadius: 12, background: '#111', position: 'relative', overflow: 'hidden' }}><div style={{ position: 'absolute', top: 6, left: 6, background: 'red', padding: '2px 6px', borderRadius: 10, fontSize: 10 }}>LIVE</div><div style={{ position: 'absolute', bottom: 6, left: 6, fontSize: 11 }}>{live.user_email?.split('@')[0]} • {live.viewers} viewers</div></div>)}{[1, 2, 3, 4].map((item) => <button key={item} onClick={() => setTab('fyp')} style={{ height: 180, border: 0, borderRadius: 12, background: '#222', color: 'white' }}>Demo Live {item}</button>)}</div></div>}

      {tab === 'market' && <div className="no-scrollbar" style={{ paddingTop: 60, padding: 12, height: '100vh', overflowY: 'auto' }}><h3 style={{ color: '#facc15' }}>🛍 MARKET HUB — REAL ORDERS</h3><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>{MARKET.map((product) => <article key={product.id} style={{ background: '#111', borderRadius: 12, overflow: 'hidden' }}><img src={product.img} alt={product.name} style={{ width: '100%', height: 120, objectFit: 'cover' }} /><div style={{ padding: 8 }}><div style={{ fontSize: 12, fontWeight: 700 }}>{product.name}</div><div style={{ color: '#facc15', fontSize: 12 }}>{product.price}</div><button onClick={() => buyProduct(product)} style={{ marginTop: 6, width: '100%', background: '#facc15', border: 0, padding: 6, borderRadius: 8, fontWeight: 900 }}>Buy Real</button></div></article>)}</div></div>}

      {showGifts && <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}><div onClick={() => setShowGifts(false)} style={{ flex: 1, background: 'rgba(0,0,0,.5)' }} /><div style={{ background: '#111', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '70vh', display: 'flex', flexDirection: 'column' }}><div style={{ padding: 12, display: 'flex', justifyContent: 'space-between' }}><strong>🎁 135 Gifts — REAL CONNECTED</strong><button onClick={() => setShowGifts(false)} style={{ background: '#222', border: 0, color: 'white', borderRadius: 12, width: 28, height: 28 }}>✕</button></div><div style={{ overflowY: 'auto', padding: 10, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>{GIFTS.map((gift) => <button key={gift.id} onClick={() => setSelectedGift(gift)} style={{ background: selectedGift?.id === gift.id ? '#facc15' : '#1a1a1a', color: selectedGift?.id === gift.id ? 'black' : 'white', border: 0, borderRadius: 12, padding: 8 }}><div style={{ fontSize: 22 }}>{gift.emoji}</div><small>{gift.name}</small></button>)}</div><div style={{ padding: 12 }}><button disabled={!selectedGift} onClick={sendGift} style={{ width: '100%', padding: 14, borderRadius: 12, border: 0, fontWeight: 900, background: selectedGift ? '#facc15' : '#333', color: selectedGift ? 'black' : '#888' }}>{user ? `SEND ${selectedGift?.name || 'GIFT'} TO SUPABASE 🌍` : 'LOGIN TO SEND REAL GIFT'}</button></div></div></div>}

      {showAuth && <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}><div style={{ background: '#111', width: '100%', maxWidth: 360, borderRadius: 20, padding: 20 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><h3>{mode === 'login' ? 'LOGIN REAL' : 'SIGNUP REAL GLOBAL'}</h3><button onClick={() => setShowAuth(false)} style={{ background: '#333', color: 'white', border: 0, borderRadius: 12 }}>✕</button></div><input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{ width: '100%', padding: 12, borderRadius: 10, background: 'black', border: '1px solid #333', color: 'white', marginTop: 12, boxSizing: 'border-box' }} /><input value={pass} onChange={(event) => setPass(event.target.value)} type="password" placeholder="Password" style={{ width: '100%', padding: 12, borderRadius: 10, background: 'black', border: '1px solid #333', color: 'white', marginTop: 10, boxSizing: 'border-box' }} /><button onClick={handleAuth} style={{ width: '100%', marginTop: 14, padding: 14, borderRadius: 12, border: 0, background: '#facc15', color: 'black', fontWeight: 900 }}>{mode === 'login' ? 'LOGIN NOW' : 'CREATE ACCOUNT'}</button><button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ display: 'block', margin: '12px auto 0', background: 'none', border: 0, color: '#facc15' }}>{mode === 'login' ? 'Need account? SIGNUP' : 'Have account? LOGIN'}</button></div></div>}

      {notice && <div role="status" style={{ position: 'fixed', bottom: 70, left: 12, right: 12, zIndex: 11000, background: '#222', border: '1px solid #555', borderRadius: 10, padding: 12, textAlign: 'center' }}>{notice}<button onClick={() => setNotice('')} style={{ marginLeft: 10, background: 'none', color: '#facc15', border: 0 }}>✕</button></div>}
      <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 60, background: 'rgba(0,0,0,.9)', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 90 }}><button onClick={() => setTab('fyp')} style={{ background: 'none', border: 0, color: tab === 'fyp' ? '#facc15' : '#666' }}>FYP</button><button onClick={() => setTab('live')} style={{ background: 'none', border: 0, color: tab === 'live' ? '#facc15' : '#666' }}>LIVE</button><button onClick={goLive} style={{ background: '#facc15', border: 0, color: 'black', width: 44, height: 44, borderRadius: 22, fontWeight: 900 }}>+</button><button onClick={() => setTab('market')} style={{ background: 'none', border: 0, color: tab === 'market' ? '#facc15' : '#666' }}>MARKET</button><span style={{ color: '#666' }}>ME</span></footer>
    </div>
  )
}
