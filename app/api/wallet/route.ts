import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return NextResponse.json({ balance: 0, transactions: [] }, { status: 200 })
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(url, key)
    const user_id = req.nextUrl.searchParams.get('user_id')

    if (!user_id || user_id === 'user_123') {
      return NextResponse.json({ balance: 0, transactions: [] }, { status: 200 })
    }

    const { data } = await supabase.from('wallets').select('*').eq('user_id', user_id).maybeSingle()
    return NextResponse.json(data || { balance: 0, transactions: [] }, { status: 200 })
  } catch {
    return NextResponse.json({ balance: 0, transactions: [] }, { status: 200 })
  }
}