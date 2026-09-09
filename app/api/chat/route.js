import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(req){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if(!url || !key) return NextResponse.json({error:'Missing env'}, {status:500})
  try{
    const supabase = createClient(url, key)
    const { searchParams } = new URL(req.url)
    const room_id = searchParams.get("room_id")
    if(!room_id) return NextResponse.json([], {status:200})
    const { data, error } = await supabase.from("messages").select("*").eq("room_id", room_id).order("created_at", {ascending:true})
    if(error) return NextResponse.json({error:error.message}, {status:500})
    return NextResponse.json(data || [])
  }catch(e){
    return NextResponse.json({error:`GET crash: ${e.message}`}, {status:500})
  }
}

export async function POST(req){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if(!url || !key) return NextResponse.json({error:'Missing env'}, {status:500})
  try{
    const body = await req.json()
    const supabase = createClient(url, key)
    const room_id = body.room_id
    const username = body.username || "User"
    const text = body.text || body.message || body.content || ""

    if(!room_id) return NextResponse.json({error:'room_id missing'}, {status:400})
    if(!text.trim()) return NextResponse.json({error:'text missing'}, {status:400})

    const { data, error } = await supabase.from("messages").insert([{
      room_id: room_id,
      text: text,
      username: username
    }]).select().single()

    if(error) return NextResponse.json({error:`Supabase error: ${error.message}`}, {status:500})
    return NextResponse.json(data)
  }catch(e){
    return NextResponse.json({error:`POST crash: ${e.message}`}, {status:500})
  }
}
