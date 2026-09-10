'use client'

import { useEffect, useState } from 'react'
import { giftCatalog } from '@/lib/giftCatalog'

export default function Gifts() {
  const [gifts, setGifts] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [receiver, setReceiver] = useState('okiki')
  const [fx, setFx] = useState(false)
  const [status, setStatus] = useState('Safe demo mode. Live gift processing is pending production setup.')

  useEffect(() => {
    setGifts(giftCatalog)
    setSelected(giftCatalog[0])
  }, [])

  const sendGift = async () => {
    if (!selected) return
    setFx(true)
    setTimeout(() => setFx(false), 1500)

    try {
      const response = await fetch('/api/gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: 'demo_user', receiverId: receiver || 'demo_creator', amount: selected.amount, giftAmount: selected.amount })
      })

      const data = await response.json()
      if (data?.success) {
        setStatus(`Gift sent: ${selected.name} to ${receiver} — demo mode accepted.`)
      } else {
        setStatus(data?.error || `Gift queued: ${selected.name} is ready for live processing.`)
      }
    } catch (error) {
      setStatus(`Gift queued: ${selected.name} is ready for live processing.`)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'black', color: 'white', padding: 15 }}>
      <style>{'@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }'}</style>
      {fx && selected && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}><div style={{ position: 'relative', width: 250, height: 250, animation: 'bounce 1s infinite' }}><span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 96 }}>{selected.emoji}</span><img src={selected.image} alt={selected.name} onError={event => { event.currentTarget.style.display = 'none' }} style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20 }} /></div></div>}
      <h1 style={{ color: '#facc15', fontWeight: 900 }}>35 REAL PHOTO GIFTS</h1>
      <p style={{ color: '#aaa', marginTop: 0 }}>Real photography first. Emoji fallback keeps every gift visible.</p>
      <p style={{ color: '#f4d35e', margin: '8px 0 12px', fontSize: 12 }}>{status}</p>
      <input value={receiver} onChange={event => setReceiver(event.target.value)} placeholder="Gift to: john, sarah..." style={{ width: '100%', padding: 12, margin: '10px 0', background: '#222', borderRadius: 10, color: 'white' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, maxHeight: '60vh', overflowY: 'auto' }}>
        {gifts.map(gift => (
          <div key={gift.id} onClick={() => setSelected(gift)} style={{ border: selected?.id === gift.id ? '2px solid #facc15' : '1px solid #333', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ position: 'relative', height: 80, display: 'grid', placeItems: 'center', background: '#222', fontSize: 38 }}><span>{gift.emoji}</span><img src={gift.image} alt={gift.name} onError={event => { event.currentTarget.style.display = 'none' }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /></div>
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