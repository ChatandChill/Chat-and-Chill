export const dynamic='force-dynamic'
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const typingMap = new Map()

const getClient=()=>{
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key || !url.startsWith('http')) return null
  try { return createClient(url, key) } catch (error) { return null }
}

export async function GET(req){
  const {searchParams}=new URL(req.url)
  const room_id=searchParams.get('room_id') || 'demo-room'
  const supabase=getClient()

  if (!supabase) {
    return NextResponse.json(typingMap.get(room_id) || [], { status: 200 })
  }

  try {
    const {data}=await supabase.from('typing').select('*').eq('room_id',room_id)
    return NextResponse.json(data || [])
  } catch (error) {
    return NextResponse.json(typingMap.get(room_id) || [], { status: 200 })
  }
}

export async function POST(req){
  const {room_id,username,is_typing}=await req.json().catch(() => ({}))
  const safeRoom = room_id || 'demo-room'
  const supabase=getClient()

  if (!supabase) {
    const list = typingMap.get(safeRoom) || []
    const next = { room_id: safeRoom, username: username || 'Guest', is_typing: !!is_typing, updated_at: new Date().toISOString() }
    typingMap.set(safeRoom, [...list.filter(item => item.username !== (username || 'Guest')), next])
    return NextResponse.json({ok:true, demo_mode:true})
  }

  try {
    await supabase.from('typing').upsert({room_id:safeRoom,username:username||'Guest',is_typing:!!is_typing,updated_at:new Date().toISOString()})
    return NextResponse.json({ok:true})
  } catch (error) {
    return NextResponse.json({ok:true, demo_mode:true})
  }
}
