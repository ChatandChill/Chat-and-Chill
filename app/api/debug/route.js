import { NextResponse } from "next/server"
export async function GET(){
  return NextResponse.json({
    has_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    has_anon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    has_service: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "MISSING"
  })
}
