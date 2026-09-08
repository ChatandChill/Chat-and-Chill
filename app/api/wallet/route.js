import { createClient } from "@supabase/supabase-js"
export async function GET(req){
  const {searchParams}=new URL(req.url)
  const user_id=searchParams.get("user_id")
  const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const {data}=await supabase.from("wallets").select("balance").eq("user_id",user_id).maybeSingle()
  return Response.json({balance:data?.balance||0})
}
