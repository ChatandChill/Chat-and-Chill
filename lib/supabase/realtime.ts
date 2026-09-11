'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/src/lib/supabase/client'

export type RealtimeMessage = {
  id: string
  room_id: string
  content?: string
  text?: string
  image_url?: string | null
  created_at: string
}

export function useRealtimeMessages(roomId: string) {
  const [messages, setMessages] = useState<RealtimeMessage[]>([])
  const [supabase] = useState(() => createClient())
  const lastSendRef = useRef(0)

  useEffect(() => {
    if (!roomId) return undefined

    let active = true
    supabase
      .from('messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true })
      .range(0, 99)
      .then(({ data }) => {
        if (active && data) setMessages(data as RealtimeMessage[])
      })

    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` },
        (payload) => setMessages((current) => [...current, payload.new as RealtimeMessage])
      )
      .subscribe()

    return () => {
      active = false
      void supabase.removeChannel(channel)
    }
  }, [roomId, supabase])

  const sendMessage = async (content: string, imageUrl?: string) => {
    const now = Date.now()
    if (now - lastSendRef.current < 1000) {
      window.alert('Slow down - premium chill')
      return
    }
    lastSendRef.current = now

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('messages').insert({
      room_id: roomId,
      user_id: user.id,
      content,
      image_url: imageUrl || null
    })

    if (error) throw error
  }

  return { messages, sendMessage }
}