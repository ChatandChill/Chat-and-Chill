import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const demoStore = new Map()

const seedMessages = (roomId) => [
  { id: `${roomId}-1`, room_id: roomId, username: 'Chat & Chill', text: 'Welcome to the room. Guest chat is running in demo mode.', created_at: new Date().toISOString() },
  { id: `${roomId}-2`, room_id: roomId, username: 'Amina', text: 'Lagos energy is live today. 💎', created_at: new Date().toISOString() },
  { id: `${roomId}-3`, room_id: roomId, username: 'Tobi', text: 'Real photo gifts are working. Try sending one.', created_at: new Date().toISOString() }
]

function getSafeSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key || !url.startsWith('http')) {
    return null
  }

  try {
    return createClient(url, key)
  } catch (error) {
    return null
  }
}

function getDemoRoom(roomId) {
  const current = demoStore.get(roomId) || seedMessages(roomId)
  demoStore.set(roomId, current)
  return current
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const room_id = searchParams.get('room_id') || 'demo-room'
  const supabase = getSafeSupabaseClient()

  if (!supabase) {
    return NextResponse.json(getDemoRoom(room_id), { status: 200 })
  }

  try {
    const { data, error } = await supabase.from('messages').select('*').eq('room_id', room_id).order('created_at', { ascending: true })
    if (error) throw error
    return NextResponse.json(data || getDemoRoom(room_id), { status: 200 })
  } catch (error) {
    return NextResponse.json(getDemoRoom(room_id), { status: 200 })
  }
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}))
  const room_id = body.room_id || 'demo-room'
  const username = body.username || 'User'
  const text = body.text || body.message || body.content || ''
  const image_url = body.image_url || null

  if (!text.trim() && !image_url) {
    return NextResponse.json({ error: 'text missing' }, { status: 400 })
  }

  const supabase = getSafeSupabaseClient()

  if (!supabase) {
    const current = getDemoRoom(room_id)
    const entry = {
      id: `${room_id}-${Date.now()}`,
      room_id,
      username,
      text,
      image_url,
      created_at: new Date().toISOString()
    }
    demoStore.set(room_id, [...current, entry])
    return NextResponse.json(entry, { status: 200 })
  }

  try {
    const { data, error } = await supabase.from('messages').insert([{ room_id, text, username, image_url }]).select().single()
    if (error) throw error
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    const current = getDemoRoom(room_id)
    const entry = {
      id: `${room_id}-${Date.now()}`,
      room_id,
      username,
      text,
      created_at: new Date().toISOString()
    }
    demoStore.set(room_id, [...current, entry])
    return NextResponse.json(entry, { status: 200 })
  }
}
