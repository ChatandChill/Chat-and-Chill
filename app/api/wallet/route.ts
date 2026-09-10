export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id')

    if (!user_id) {
      return Response.json({ balance: 0, transactions: [] })
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return Response.json({ balance: 0, transactions: [] })
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(url, key)

    const { data, error } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', user_id)
      .maybeSingle()

    if (error) {
      console.error('wallet fetch error', error)
      return Response.json({ balance: 0, transactions: [] })
    }

    return Response.json({
      balance: data?.balance ?? 0,
      transactions: [],
    })
  } catch (e) {
    console.error('wallet api crash', e)
    return Response.json({ balance: 0, transactions: [] })
  }
}