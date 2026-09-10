export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const demoConversations = new Map([
  ['okiki', [
    { id: 'conv_okiki_1', user1: 'okiki', user2: 'john', last_message: 'Lagos energy is live today.', updated_at: new Date().toISOString() },
    { id: 'conv_okiki_2', user1: 'okiki', user2: 'sarah', last_message: 'Gift basket is ready.', updated_at: new Date().toISOString() }
  ]],
  ['john', [{ id: 'conv_john_1', user1: 'john', user2: 'okiki', last_message: 'Yaba is busy tonight.', updated_at: new Date().toISOString() }]],
  ['sarah', [{ id: 'conv_sarah_1', user1: 'sarah', user2: 'okiki', last_message: 'The VIP room is open.', updated_at: new Date().toISOString() }]]
])

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key || !url.startsWith('http')) return null
  try {
    return createClient(url, key)
  } catch (error) {
    return null
  }
}

export async function GET(req){
  const { searchParams } = new URL(req.url)
  const user = searchParams.get('user') || 'okiki'
  const supabase = getClient()

  if (!supabase) {
    return NextResponse.json(demoConversations.get(user) || [], { status: 200 })
  }

  try {
    const { data } = await supabase.from('conversations').select('*').or(`user1.eq.${user},user2.eq.${user}`).order('updated_at',{ascending:false})
    return NextResponse.json(data || demoConversations.get(user) || [])
  } catch (error) {
    return NextResponse.json(demoConversations.get(user) || [], { status: 200 })
  }
}

export async function POST(req){
  try{
    const { user1, user2 } = await req.json()
    if(!user1 ||!user2) return NextResponse.json({error:'missing'}, {status:400})

    const supabase = getClient()
    if (!supabase) {
      const key = [user1, user2].sort().join('_')
      const next = { id: `conv_${key}`, user1: user1, user2: user2, last_message: 'Started chat 🔒', updated_at: new Date().toISOString() }
      const list = demoConversations.get(user1) || []
      demoConversations.set(user1, [...list, next])
      return NextResponse.json(next, { status: 200 })
    }

    const u1 = [user1, user2].sort()[0]
    const u2 = [user1, user2].sort()[1]

    const { data: existing } = await supabase.from('conversations').select('*').eq('user1', u1).eq('user2', u2).single()
    if(existing) return NextResponse.json(existing)

    const { data, error } = await supabase.from('conversations').insert({user1:u1, user2:u2, last_message:'Started chat 🔒'}).select().single()
    if(error) return NextResponse.json({error:error.message}, {status:500})
    return NextResponse.json(data)
  }catch(e){
    return NextResponse.json({error:e.message}, {status:500})
  }
}
