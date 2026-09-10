import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id') || 'smallworld'
    const supabase = createAdminClient()

    if (!supabase) {
      return Response.json({ balance: 0, transactions: [] })
    }

    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', user_id)
      .maybeSingle()
    const { data: transactions, error: transactionsError } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(20)

    if (walletError || transactionsError) {
      console.error('wallet fetch error', walletError || transactionsError)
      return Response.json({ balance: 0, transactions: [] })
    }

    return NextResponse.json({ balance: wallet?.balance ?? 0, transactions: transactions ?? [] })
  } catch (e) {
    console.error('wallet api crash', e)
    return Response.json({ balance: 0, transactions: [] })
  }
}

export async function POST(req: Request) {
  try {
    const { user_id, amount, type, description } = await req.json()
    const numericAmount = Number(amount)
    const supabase = createAdminClient()

    if (!supabase) {
      return NextResponse.json({ error: 'Supabase environment variables are missing' }, { status: 503 })
    }

    if (!user_id || !Number.isFinite(numericAmount) || numericAmount <= 0 || !type) {
      return NextResponse.json({ error: 'user_id, amount, and type are required' }, { status: 400 })
    }

    const { data, error } = await supabase.rpc('process_wallet_transaction', {
      p_user_id: user_id,
      p_amount: numericAmount,
      p_type: type,
      p_description: description ?? null,
    })

    if (error) {
      console.error('wallet transaction rpc error', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data?.success) {
      return NextResponse.json({ error: data?.error ?? 'Wallet transaction failed' }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (e) {
    console.error('wallet api crash', e)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}