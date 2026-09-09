'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function TypingIndicator({ roomId }) {
  const [typingUser, setTypingUser] = useState(null)

  useEffect(() => {
    if (!roomId) return undefined

    const channel = supabase
      .channel(`typing-${roomId}`)
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        setTypingUser(payload?.username || null)
        window.setTimeout(() => setTypingUser(null), 2000)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [roomId])

  if (!typingUser) return null

  return <div className="p-2 text-xs text-gray-500">{typingUser} typing...</div>
}