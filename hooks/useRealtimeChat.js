'use client'

import { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useRealtimeChat(roomId, onNewMessage) {
  useEffect(() => {
    if (!roomId || typeof onNewMessage !== 'function') return undefined

    const channel = supabase
      .channel(`chat-${roomId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` },
        (payload) => onNewMessage(payload.new)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [roomId, onNewMessage])
}