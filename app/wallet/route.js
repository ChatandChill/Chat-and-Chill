export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(req){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY
  if(!url || !service) return NextResponse.json({error: "Supabase environment variables are missing"}, {status:500})

  const supabaseAdmin = createClient(url, service)
  const { searchParams } = new URL(req.url)
  const user_id = searchParams.get("user_id") || "user_123"
  
  const { data: wallet } = await supabaseAdmin.from("wallets").select("balance").eq("user_id", user_id).single()
  const { data: txs } = await supabaseAdmin.from("transactions").select("*").eq("user_id", user_id).order("created_at",{ascending:false}).limit(20)
  
  return NextResponse.json({ balance: wallet?.balance || 0, transactions: txs || [] })
}
