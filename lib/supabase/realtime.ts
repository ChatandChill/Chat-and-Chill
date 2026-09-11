'use client'

import { useCallback, useEffect, useState } from 'react'

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

  const loadMessages = useCallback(async () => {
    if (!roomId) return

    const response = await fetch(`/api/chat?room_id=${encodeURIComponent(roomId)}`, {
      cache: 'no-store'
    })
    if (!response.ok) return

    const data = await response.json()
    if (Array.isArray(data)) setMessages(data)
  }, [roomId])

  useEffect(() => {
    void loadMessages()
    const interval = window.setInterval(() => void loadMessages(), 5000)
    return () => window.clearInterval(interval)
  }, [loadMessages])

  const sendMessage = useCallback(async (text: string, imageUrl?: string) => {
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