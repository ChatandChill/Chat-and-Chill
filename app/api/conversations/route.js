import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export async function GET(req){
  const { searchParams } = new URL(req.url)
  const user = searchParams.get('user')
  const { data } = await supabase.from('conversations').select('*').or(`user1.eq.${user},user2.eq.${user}`).order('updated_at',{ascending:false})
  return NextResponse.json(data||[])
}
export async function POST(req){
  const { user1, user2 } = await req.json()
  const id = [user1,user2].sort().join('_')
  const { data } = await supabase.from('conversations').upsert({id, user1: [user1,user2].sort()[0], user2: [user1,user2].sort()[1], updated_at: new Date().toISOString()}, {onConflict:'id'}).select().single()
  return NextResponse.json(data)
}
