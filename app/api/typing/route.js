export const dynamic='force-dynamic'
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
const getClient=()=>createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)
export async function GET(req){ const {searchParams}=new URL(req.url); const room_id=searchParams.get('room_id'); const supabase=getClient(); const {data}=await supabase.from('typing').select('*').eq('room_id',room_id); return NextResponse.json(data||[]) }
export async function POST(req){ const {room_id,username,is_typing}=await req.json(); const supabase=getClient(); await supabase.from('typing').upsert({room_id,username,is_typing,updated_at:new Date().toISOString()}); return NextResponse.json({ok:true}) }
