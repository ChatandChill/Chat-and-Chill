import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(req){
  const { searchParams } = new URL(req.url)
  const room_id = searchParams.get("room_id") || "lagos"
  const { data } = await supabase.from("messages").select("*").eq("room_id", room_id).order("created_at", {ascending:true})
  return NextResponse.json(data || [])
}

export async function POST(req){
  const { room_id, text, username } = await req.json()
  const { data, error } = await supabase.from("messages").insert({
    room_id: room_id || "lagos",
    text: text,
    username: username || "User"
  }).select().single()
  
  if(error){
    return NextResponse.json({error: error.message}, {status:500})
  }
  return NextResponse.json(data)
}
