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

    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', user_id)
      .maybeSingle()

    if (walletError) {
      console.error('wallet lookup error', walletError)
      return NextResponse.json({ error: 'Unable to load wallet' }, { status: 500 })
    }

    if (!wallet || wallet.balance < numericAmount) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 })
    }

    const newBalance = wallet.balance - numericAmount
    const { error: updateError } = await supabase
      .from('wallets')
      .update({ balance: newBalance })
      .eq('user_id', user_id)

    if (updateError) {
      console.error('wallet update error', updateError)
      return NextResponse.json({ error: 'Unable to update wallet' }, { status: 500 })
    }

    const { error: transactionError } = await supabase.from('transactions').insert({
      user_id,
      amount: -numericAmount,
      type,
      description,
    })

    if (transactionError) {
      console.error('transaction insert error', transactionError)
      return NextResponse.json({ error: 'Unable to record transaction' }, { status: 500 })
    }

    return NextResponse.json({ success: true, new_balance: newBalance })
  } catch (e) {
    console.error('wallet api crash', e)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}