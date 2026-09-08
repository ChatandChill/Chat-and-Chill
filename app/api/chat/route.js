import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export async function GET(req){
  const { searchParams } = new URL(req.url)
  const room_id = searchParams.get("room_id")
  const { data } = await supabaseAdmin.from("messages").select("*").eq("room_id", room_id).order("created_at",{ascending:true}).limit(100)
  return NextResponse.json(data)
}
export async function POST(req){
  const { room_id, user_id, username, text } = await req.json()
  const { data } = await supabaseAdmin.from("messages").insert({ room_id, user_id, username, text }).select().single()
  return NextResponse.json(data)
}
