'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { useRealtimeMessages } from '@/lib/supabase/realtime'

export default function ChatRoom({ roomId }: { roomId: string }) {
  const { messages, sendMessage } = useRealtimeMessages(roomId)
  const [text, setText] = useState('')
  const [uploading, setUploading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!text.trim()) return
    await sendMessage(text.trim())
    setText('')
  }

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadToCloudinary(file)
      await sendMessage('', url)
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="flex h-[min(760px,100vh)] max-w-3xl mx-auto flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      <div className="flex h-16 items-center justify-between border-b border-zinc-800/80 bg-zinc-950/70 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-white font-bold text-black">GC</div>
          <div>
            <p className="font-semibold tracking-tight">General Chill</p>
            <p className="text-xs text-zinc-400">{messages.length} messages &bull; live</p>
          </div>
        </div>
        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(600px_at_50%_-20%,rgba(255,255,255,0.06),transparent)] p-5">
        {messages.map((message, index) => (
          <div key={message.id} className="animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: `${index * 40}ms` }}>
            <div className="group max-w-[78%] rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              {(message.content || message.text) && <p className="leading-6 tracking-[-0.01em] text-zinc-100">{message.content || message.text}</p>}
              {message.image_url && <img src={message.image_url} alt="Shared image" className="mt-2 max-h-80 w-auto rounded-xl border border-white/10 object-cover" />}
              <p className="mt-1.5 text-xs text-zinc-500">{new Date(message.created_at).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        {uploading && <p className="animate-pulse text-xs text-zinc-400">Uploading image...</p>}
      </div>

      <div className="border-t border-zinc-800/80 bg-zinc-900/40 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-2 py-2 transition-all focus-within:border-zinc-700 focus-within:ring-4 focus-within:ring-white/5">
          <label className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-zinc-800 transition hover:bg-zinc-700" aria-label="Attach image">
            <input type="file" hidden accept="image/*" onChange={handleImage} disabled={uploading} />
            <span className="text-xl leading-none text-zinc-300">+</span>
          </label>
          <input value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && void handleSend()} placeholder="Message General Chill..." className="flex-1 bg-transparent px-2 text-white outline-none placeholder:text-zinc-500" />
          <button onClick={() => void handleSend()} disabled={!text.trim()} className="h-9 rounded-full bg-white px-5 font-semibold text-black shadow-[0_4px_16px_rgba(255,255,255,0.2)] transition-all hover:bg-zinc-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">Send</button>
        </div>
      </div>

      <style>{'@keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}'}</style>
    </div>
  )
}