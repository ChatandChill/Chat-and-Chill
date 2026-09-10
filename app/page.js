"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const GIFTS = Array.from({ length: 135 }, (_, index) => ({ id: index + 1, name: `Gift ${index + 1}`, emoji: ["🌹", "🔥", "💛", "👑", "🚀", "💎", "🎉", "❤️"][index % 8] }))
const MARKET = [{ id: 1, name: "African Print Shirt", price: "$45", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" }]
const streamImage = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1080"

export default function App() {
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
  const [myGifts, setMyGifts] = useState([])
  const [myOrders, setMyOrders] = useState([])
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!supabase) return undefined
    let active = true
    const loadPublicData = async () => {
      const [{ data: lives }, { data: gifts }] = await Promise.all([
        supabase.from('live_streams').select('*').order('created_at', { ascending: false }),
        supabase.from('gift_sends').select('*').order('created_at', { ascending: false }).limit(10),
      ])
      if (active) { setLiveFeeds(lives || []); setGiftFeed(gifts || []) }
    }
    supabase.auth.getUser().then(({ data }) => { if (active) setUser(data?.user || null) })
    loadPublicData()
    const auth = supabase.auth.onAuthStateChange((event, session) => setUser(session?.user || null))
    const giftsChannel = supabase.channel('profile-gifts').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'gift_sends' }, (payload) => setGiftFeed((current) => [payload.new, ...current].slice(0, 10))).subscribe()
    return () => { active = false; auth.data.subscription.unsubscribe(); supabase.removeChannel(giftsChannel) }
  }, [])

  useEffect(() => {
    if (!supabase || !user || tab !== 'profile') return
    Promise.all([
      supabase.from('gift_sends').select('*').eq('sender_email', user.email).order('created_at', { ascending: false }),
      supabase.from('market_orders').select('*').eq('buyer_email', user.email).order('created_at', { ascending: false }),
    ]).then(([gifts, orders]) => { setMyGifts(gifts.data || []); setMyOrders(orders.data || []) })
  }, [user, tab])

  const openAuth = (nextMode = 'login') => { setMode(nextMode); setShowAuth(true) }
  const requireUser = () => { if (!user) { openAuth('signup'); return false } return true }

  const handleAuth = async () => {
    if (!supabase) { setNotice('Supabase authentication is not configured.') ; return }
    const result = mode === 'signup' ? await supabase.auth.signUp({ email, password: pass }) : await supabase.auth.signInWithPassword({ email, password: pass })
    if (result.error) setNotice(result.error.message)
    else { setNotice(mode === 'signup' ? 'Account created. Check your email.' : 'Login successful.'); setShowAuth(false) }
  }

  const sendGift = async () => {
    if (!requireUser() || !selectedGift || !supabase) return
    const { error } = await supabase.from('gift_sends').insert({ gift_id: selectedGift.id, gift_name: selectedGift.name, sender_email: user.email, receiver: '@afrobeats_live' })
    if (error) setNotice(error.message)
    else { setNotice(`SENT ${selectedGift.name} ${selectedGift.emoji} globally`); setShowGifts(false); setSelectedGift(null) }
  }

  const goLive = async () => {
    if (!requireUser() || !supabase) return
    const { error } = await supabase.from('live_streams').insert({ user_email: user.email, title: 'African Pride Live 🌍', viewers: 0 })
    setNotice(error ? error.message : 'You are now live globally.')
    if (!error) setTab('live')
  }

  const buy = async (product) => {
    if (!requireUser() || !supabase) return
    const { error } = await supabase.from('market_orders').insert({ product_name: product.name, price: product.price, buyer_email: user.email })
    setNotice(error ? error.message : `Ordered ${product.name}. Seller will contact ${user.email}.`)
  }

  return (
    <div style={{ height: '100vh', background: 'black', color: 'white', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <style>{`.scroll::-webkit-scrollbar{display:none}button{font:inherit}`}</style>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 56, zIndex: 100, display: 'flex', justifyContent: 'space-between', padding: '0 12px', alignItems: 'center', background: 'linear-gradient(black, transparent)' }}>
        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}><strong style={{ color: '#facc15' }}>CHAT & CHILL 🌍</strong>{['fyp', 'live', 'market'].map((item) => <button key={item} onClick={() => setTab(item)} style={{ background: 'none', border: 0, color: tab === item ? '#facc15' : '#888', fontWeight: tab === item ? 900 : 400 }}>{item.toUpperCase()}</button>)}{user && <button onClick={() => setTab('profile')} style={{ background: 'none', border: 0, color: tab === 'profile' ? '#facc15' : '#888' }}>PROFILE</button>}</nav>
        {user ? <button onClick={() => supabase?.auth.signOut()} style={{ background: '#facc15', color: 'black', border: 0, padding: '6px 10px', borderRadius: 20, fontSize: 11, fontWeight: 900 }}>👤 {user.email?.split('@')[0]}</button> : <button onClick={() => openAuth()} style={{ background: '#facc15', border: 0, color: 'black', padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 900 }}>LOGIN</button>}
      </header>

      {tab === 'fyp' && <div className="scroll" style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory' }}>{[1, 2, 3].map((item) => <section key={item} style={{ height: '100vh', position: 'relative', scrollSnapAlign: 'start' }}><img src={streamImage} alt="African live entertainment" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.85))' }} /><div style={{ position: 'absolute', bottom: 90, left: 12 }}><strong>@afrobeats_live{item}</strong><div style={{ fontSize: 11, marginTop: 6, background: 'rgba(250,204,21,.2)', padding: '4px 8px', borderRadius: 12 }}>🎁 {giftFeed[0]?.gift_name || 'Rose'} from {giftFeed[0]?.sender_email?.split('@')[0] || 'Kwame'}</div></div><button aria-label="Open gifts" onClick={() => setShowGifts(true)} style={{ position: 'absolute', right: 10, bottom: 110, width: 48, height: 48, borderRadius: 24, border: 0, background: '#facc15', fontSize: 22 }}>🎁</button></section>)}</div>}

      {tab === 'live' && <div className="scroll" style={{ paddingTop: 70, padding: 12, height: '100vh', overflowY: 'auto' }}><button onClick={goLive} style={{ width: '100%', background: '#ff3040', color: 'white', border: 0, padding: 14, borderRadius: 12, fontWeight: 900 }}>🔴 GO LIVE NOW</button><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>{liveFeeds.map((live) => <div key={live.id} style={{ height: 160, background: '#111', borderRadius: 12, padding: 8 }}><div style={{ fontSize: 11 }}>🔴 {live.user_email}</div><div style={{ fontSize: 10, color: '#888' }}>{live.viewers || 0} viewers</div></div>)}</div></div>}

      {tab === 'market' && <div className="scroll" style={{ paddingTop: 70, padding: 12, height: '100vh', overflowY: 'auto' }}><h3 style={{ color: '#facc15' }}>🛍 MARKET HUB</h3><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>{MARKET.map((product) => <article key={product.id} style={{ background: '#111', borderRadius: 12, overflow: 'hidden' }}><img src={product.img} alt={product.name} style={{ width: '100%', height: 120, objectFit: 'cover' }} /><div style={{ padding: 8 }}><div style={{ fontSize: 12 }}>{product.name}</div><div style={{ color: '#facc15' }}>{product.price}</div><button onClick={() => buy(product)} style={{ width: '100%', background: '#facc15', border: 0, padding: 6, borderRadius: 8, marginTop: 6, fontWeight: 900 }}>Buy</button></div></article>)}</div></div>}

      {tab === 'profile' && <div className="scroll" style={{ paddingTop: 70, padding: 16, height: '100vh', overflowY: 'auto', background: '#0a0a0a' }}>{!user ? <div style={{ textAlign: 'center', marginTop: 60 }}><div style={{ fontSize: 50 }}>👤</div><h2>Sign in to view your profile</h2><button onClick={() => openAuth('login')} style={{ background: '#facc15', border: 0, borderRadius: 12, padding: 12, fontWeight: 900 }}>LOGIN</button></div> : <><h2 style={{ color: '#facc15' }}>👤 {user.email}</h2><p style={{ color: '#aaa' }}>Your gifts and market orders</p><section style={{ marginTop: 20 }}><h3>🎁 My Gifts ({myGifts.length})</h3>{myGifts.length ? myGifts.map((gift, index) => <div key={gift.id || index} style={{ background: '#161616', borderRadius: 10, padding: 12, marginTop: 8 }}>{gift.gift_name} → {gift.receiver || '@afrobeats_live'}</div>) : <p style={{ color: '#777' }}>No gifts sent yet.</p>}</section><section style={{ marginTop: 24 }}><h3>🛍 My Orders ({myOrders.length})</h3>{myOrders.length ? myOrders.map((order, index) => <div key={order.id || index} style={{ background: '#161616', borderRadius: 10, padding: 12, marginTop: 8 }}>{order.product_name} · {order.price}</div>) : <p style={{ color: '#777' }}>No market orders yet.</p>}</section></>}</div>}

      {showGifts && <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}><div onClick={() => setShowGifts(false)} style={{ flex: 1, background: 'rgba(0,0,0,.5)' }} /><div style={{ background: '#111', borderRadius: '20px 20px 0 0', maxHeight: '70vh', overflowY: 'auto', padding: 12 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>🎁 135 Gifts</strong><button onClick={() => setShowGifts(false)} style={{ background: '#222', color: 'white', border: 0 }}>✕</button></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 10 }}>{GIFTS.map((gift) => <button key={gift.id} onClick={() => setSelectedGift(gift)} style={{ background: selectedGift?.id === gift.id ? '#facc15' : '#1a1a1a', color: selectedGift?.id === gift.id ? 'black' : 'white', border: 0, borderRadius: 10, padding: 8 }}><div style={{ fontSize: 22 }}>{gift.emoji}</div><small>{gift.name}</small></button>)}</div><button disabled={!selectedGift} onClick={sendGift} style={{ width: '100%', marginTop: 12, padding: 14, border: 0, borderRadius: 12, background: selectedGift ? '#facc15' : '#333', fontWeight: 900 }}>{user ? 'SEND GIFT' : 'LOGIN TO SEND'}</button></div></div>}

      {showAuth && <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}><div style={{ background: '#111', width: '100%', maxWidth: 360, borderRadius: 20, padding: 20 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><h3>{mode === 'login' ? 'LOGIN REAL' : 'SIGNUP REAL GLOBAL'}</h3><button onClick={() => setShowAuth(false)} style={{ background: '#333', color: 'white', border: 0 }}>✕</button></div><input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{ width: '100%', boxSizing: 'border-box', padding: 12, background: 'black', color: 'white', border: '1px solid #333', marginTop: 12 }} /><input value={pass} onChange={(event) => setPass(event.target.value)} type="password" placeholder="Password" style={{ width: '100%', boxSizing: 'border-box', padding: 12, background: 'black', color: 'white', border: '1px solid #333', marginTop: 10 }} /><button onClick={handleAuth} style={{ width: '100%', marginTop: 14, padding: 14, background: '#facc15', border: 0, fontWeight: 900 }}>{mode === 'login' ? 'LOGIN NOW' : 'CREATE ACCOUNT'}</button><button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ display: 'block', margin: '12px auto', background: 'none', color: '#facc15', border: 0 }}>{mode === 'login' ? 'Need account? SIGNUP' : 'Have account? LOGIN'}</button></div></div>}
      {notice && <div role="status" style={{ position: 'fixed', bottom: 70, left: 12, right: 12, zIndex: 11000, background: '#222', border: '1px solid #555', borderRadius: 10, padding: 12, textAlign: 'center' }}>{notice}<button onClick={() => setNotice('')} style={{ marginLeft: 10, background: 'none', color: '#facc15', border: 0 }}>✕</button></div>}
      <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 70, background: '#000', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 9999999 }}><button onClick={() => setTab('fyp')} style={{ background: 'none', border: 0, color: tab === 'fyp' ? '#facc15' : '#666', padding: '10px 20px', fontSize: 11, fontWeight: 900 }}>FYP</button><button onClick={() => setTab('live')} style={{ background: 'none', border: 0, color: tab === 'live' ? '#facc15' : '#666', padding: '10px 20px', fontSize: 11 }}>LIVE</button><button onClick={goLive} style={{ background: '#facc15', border: 0, width: 50, height: 50, borderRadius: 25, fontWeight: 900, fontSize: 20 }}>+</button><button onClick={() => setTab('market')} style={{ background: 'none', border: 0, color: tab === 'market' ? '#facc15' : '#666', padding: '10px 20px', fontSize: 11 }}>MARKET</button><button aria-label="Open profile" onClick={() => setTab('profile')} style={{ background: tab === 'profile' ? '#facc15' : '#222', border: tab === 'profile' ? '2px solid #facc15' : '1px solid #444', color: tab === 'profile' ? 'black' : 'white', padding: '10px 18px', borderRadius: 20, fontSize: 11, fontWeight: 900, minWidth: 70 }}>PROFILE</button></footer>
    </div>
  )
}
