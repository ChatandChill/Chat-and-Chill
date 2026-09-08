export const dynamic = 'force-dynamic'
import { createClient } from "@supabase/supabase-js"

export async function GET(){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  const supabase = createClient(url, key)
  const {data, error} = await supabase.from("wallets").select("*")
  
  return Response.json({
    hasUrl: !!url,
    urlPrefix: url?.substring(0, 30),
    hasServiceKey: !!key,
    serviceKeyLength: key?.length,
    serviceKeyPrefix: key?.substring(0, 20),
    hasAnon: !!anon,
    walletsData: data,
    walletsError: error?.message,
    allRowsCount: data?.length
  }, {headers:{"Cache-Control":"no-store"}})
}
