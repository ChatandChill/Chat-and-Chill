import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export async function GET(req){
  const { searchParams } = new URL(req.url)
  const room_id = searchParams.get("room_id")
  const { data } = await supabase.from("messages").select("*").eq("room_id", room_id).order("created_at",{ascending:true}).limit(100)
  return NextResponse.json(data || [])
}

export async function POST(req){
  const body = await req.json()
  const { data } = await supabase.from("messages").insert(body).select().single()
  return NextResponse.json(data)
}
