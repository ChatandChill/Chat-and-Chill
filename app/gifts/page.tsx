'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function GiftsPage() {
  const [receiver, setReceiver] = useState('okiki')
  const [gifts, setGifts] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [status, setStatus] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(r => setUser(r.data.user))
    supabase.from('gift_catalog').select('*').order('amount').then(r => {
      if (r.data) {
        setGifts(r.data)
        setSelected(r.data[0])
      }
    })
  }, [])

  const sendGift = async () => {
    if (!selected) return
    setStatus('Sending...')
    const { error } = await supabase.from('gifts').insert({
      sender_id: user?.id,
      receiver,
      amount: selected.amount,
      gift_name: selected.name,
      message: `Sent ${selected.name}`,
    })

    if (error) setStatus('Error: ' + error.message)
    else setStatus(`✅ Gifted ${selected.emoji} ${selected.name} ₦${selected.amount} to ${receiver}!`)
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <h1 className="text-2xl font-bold text-yellow-400">🎁 135 Gifts — Click User, Then Gift</h1>
      <p className="mb-3 text-zinc-400">Total: {gifts.length} gifts loaded</p>

      <input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="Type ANY random user: john, sarah, okiki..." className="mb-4 w-full rounded border border-zinc-700 bg-zinc-900 p-3" />
      <div className="mb-4 flex gap-2">
        {['okiki', 'john', 'sarah', 'david', 'queen'].map(name => (
          <button key={name} onClick={() => setReceiver(name)} className={`rounded-full px-3 py-1 ${receiver === name ? 'bg-yellow-400 text-black' : 'bg-zinc-800'}`}>{name}</button>
        ))}
      </div>

      <div className="grid max-h-96 grid-cols-4 gap-2 overflow-y-auto">
        {gifts.map((gift: any) => (
          <button key={gift.id} onClick={() => setSelected(gift)} className={`rounded-xl border p-2 ${selected?.id === gift.id ? 'border-yellow-400 bg-zinc-800' : 'border-zinc-800 bg-zinc-900'}`}>
            <div className="text-2xl">{gift.emoji}</div>
            <div className="truncate text-xs">{gift.name}</div>
            <div className="text-xs font-bold text-yellow-400">₦{gift.amount}</div>
          </button>
        ))}
      </div>

      {selected && (
        <button onClick={sendGift} className="mt-4 w-full rounded-xl bg-yellow-400 py-4 font-black text-black">
          Gift {selected.emoji} {selected.name} to {receiver} — ₦{selected.amount}
        </button>
      )}
      {status && <div className="mt-3 rounded bg-zinc-900 p-3 text-yellow-400">{status}</div>}
    </div>
  )
}