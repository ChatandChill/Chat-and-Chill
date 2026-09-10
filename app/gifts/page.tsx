'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const PHOTOS = [
  'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=200',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200',
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200',
]

export default function Gifts() {
  const [gifts, setGifts] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [receiver, setReceiver] = useState('okiki')
  const [fx, setFx] = useState(false)

  useEffect(() => {
    const fallback = Array.from({ length: 135 }, (_, index) => ({
      id: index + 1,
      name: `Gift ${index + 1}`,
      amount: (index + 1) * 100,
      img: PHOTOS[index % PHOTOS.length],
    }))
    setGifts(fallback)
    setSelected(fallback[0])

    supabase.from('gift_catalog').select('*').order('amount').then(result => {
      if (result.data && result.data.length > 0) {
        const withImages = result.data.map((gift: any, index: number) => ({ ...gift, img: PHOTOS[index % PHOTOS.length] }))
        setGifts(withImages)
        setSelected(withImages[0])
      }
    })
  }, [])

  const sendGift = async () => {
    if (!selected) return
    setFx(true)
    setTimeout(() => setFx(false), 2000)
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('gifts').insert({ sender_id: user?.id, receiver, amount: selected.amount, gift_name: selected.name })
    alert(`✅ REAL PHOTO ${selected.name} sent to ${receiver} — ₦${selected.amount}`)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'black', color: 'white', padding: 15 }}>
      <style>{'@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }'}</style>
      {fx && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}><img src={selected.img} alt={selected.name} style={{ width: 250, height: 250, borderRadius: 20, animation: 'bounce 1s infinite' }} /></div>}
      <h1 style={{ color: '#facc15', fontWeight: 900 }}>135 REAL PHOTO GIFTS 🌍</h1>
      <input value={receiver} onChange={event => setReceiver(event.target.value)} placeholder="Gift to: john, sarah..." style={{ width: '100%', padding: 12, margin: '10px 0', background: '#222', borderRadius: 10, color: 'white' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, maxHeight: '60vh', overflowY: 'auto' }}>
        {gifts.map(gift => (
          <div key={gift.id} onClick={() => setSelected(gift)} style={{ border: selected?.id === gift.id ? '2px solid #facc15' : '1px solid #333', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}>
            <img src={gift.img} alt={gift.name} style={{ width: '100%', height: 80, objectFit: 'cover' }} />
            <div style={{ padding: 5, background: '#111', fontSize: 11 }}>{gift.name}<br /><span style={{ color: '#facc15' }}>₦{gift.amount}</span></div>
          </div>
        ))}
      </div>
      <button onClick={sendGift} disabled={!selected} style={{ width: '100%', marginTop: 15, padding: 15, background: '#facc15', color: 'black', fontWeight: 900, borderRadius: 12 }}>
        Gift {selected?.name} to {receiver} — REAL PHOTO + FX
      </button>
    </div>
  )
}