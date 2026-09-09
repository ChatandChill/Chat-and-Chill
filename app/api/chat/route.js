export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(req){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if(!url || !key){
    return NextResponse.json({error: `Missing env: URL=${!!url} KEY=${!!key}`}, {status:500})
  }
  try{
    const supabase = createClient(url, key)
    const { searchParams } = new URL(req.url)
    const room_id = searchParams.get("room_id") || "lagos"
    const { data, error } = await supabase.from("messages").select("*").eq("room_id", room_id).order("created_at", {ascending:true}).limit(50)
    if(error) return NextResponse.json({error: error.message}, {status:500})
    return NextResponse.json(data || [])
  }catch(e){
    return NextResponse.json({error: `GET crash: ${e.message}`}, {status:500})
  }
}

export async function POST(req){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if(!url || !key){
    return NextResponse.json({error: `Missing env: URL=${!!url} KEY=${!!key}. Go to Vercel Settings -> Env Vars`}, {status:500})
  }
  try{
    const body = await req.json()
    const supabase = createClient(url, key)
    const { data, error } = await supabase.from("messages").insert({
      room_id: body.room_id || "lagos",
      text: body.text,
      username: body.username || "User"
    }).select().single()
    if(error){
      return NextResponse.json({error: `Supabase error: ${error.message}`}, {status:500})
    }
    return NextResponse.json(data)
  }catch(e){
    return NextResponse.json({error: `POST crash: ${e.message}`}, {status:500})
  }
}
