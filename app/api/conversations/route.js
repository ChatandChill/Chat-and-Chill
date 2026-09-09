export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getClient(){
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export async function GET(req){
  const { searchParams } = new URL(req.url)
  const user = searchParams.get('user')
  if(!user) return NextResponse.json([])
  const supabase = getClient()
  const { data } = await supabase.from('conversations').select('*').or(`user1.eq.${user},user2.eq.${user}`).order('updated_at',{ascending:false})
  return NextResponse.json(data||[])
}

export async function POST(req){
  try{
    const { user1, user2 } = await req.json()
    if(!user1 ||!user2) return NextResponse.json({error:'missing'}, {status:400})
    const supabase = getClient()
    const u1 = [user1, user2].sort()[0]
    const u2 = [user1, user2].sort()[1]

    // check if already exists
    const { data: existing } = await supabase.from('conversations').select('*').eq('user1', u1).eq('user2', u2).single()
    if(existing) return NextResponse.json(existing)

    const { data, error } = await supabase.from('conversations').insert({user1:u1, user2:u2, last_message:'Started chat 🔒'}).select().single()
    if(error) return NextResponse.json({error:error.message}, {status:500})
    return NextResponse.json(data)
  }catch(e){
    return NextResponse.json({error:e.message}, {status:500})
  }
}
