export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY
  if(!url || !service) return NextResponse.json({error: "Supabase environment variables are missing"}, {status:500})

  const supabaseAdmin = createClient(url, service)
  const { data, error } = await supabaseAdmin.from("rooms").select("*").order("created_at", {ascending:true})
  if(error) return NextResponse.json({error: error.message}, {status:500})
  return NextResponse.json(data)
}
