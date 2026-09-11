'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

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
  const lastMessageTime = useRef<number | null>(null)

  const loadMessages = useCallback(async () => {
    if (!roomId) return

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true })
      .range(0, 49)

    if (!error && data) setMessages(data)
  }, [roomId])

  useEffect(() => {
    void loadMessages()
    const interval = window.setInterval(() => void loadMessages(), 5000)
    return () => window.clearInterval(interval)
  }, [loadMessages])

  const sendMessage = useCallback(async (text: string, imageUrl?: string) => {
    if (lastMessageTime.current && Date.now() - lastMessageTime.current < 1000) return
    lastMessageTime.current = Date.now()

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room_id: roomId,
        username: 'You',
        text,
        image_url: imageUrl
      })
    })

    if (!response.ok) throw new Error('Unable to send message')
    const message = await response.json()
    setMessages((current) => current.some((item) => item.id === message.id) ? current : [...current, message])
  }, [roomId])

  return { messages, sendMessage }
}