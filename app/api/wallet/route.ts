import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return NextResponse.json({ balance: 0, transactions: [], error: 'Missing Supabase env' }, { status: 200 })
    }

    const supabase = createClient(url, key)
    const user_id = req.nextUrl.searchParams.get('user_id')

    if (!user_id || user_id === 'user_123') {
      return NextResponse.json({ balance: 0, transactions: [] }, { status: 200 })
    }

    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', user_id)
      .maybeSingle()

    if (error || !data) {
      return NextResponse.json({ balance: 0, transactions: [] }, { status: 200 })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ balance: 0, transactions: [], error: e.message }, { status: 200 })
  }
}