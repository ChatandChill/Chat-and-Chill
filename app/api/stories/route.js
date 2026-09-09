export const dynamic='force-dynamic'
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
const getClient=()=>createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY)
export async function GET(){ const supabase=getClient(); const {data}=await supabase.from('stories').select('*').gt('expires_at',new Date().toISOString()).order('created_at',{ascending:false}).limit(30); return NextResponse.json(data||[]) }
export async function POST(req){
  try{
    const form=await req.formData(); const file=form.get('file'); const username=form.get('username'); const supabase=getClient()
    const buffer=Buffer.from(await file.arrayBuffer()); const fileName=`${username}_${Date.now()}_${file.name}`
    const {error:upErr}=await supabase.storage.from('stories').upload(fileName,buffer,{contentType:file.type}); if(upErr) throw upErr
    const {data:{publicUrl}}=supabase.storage.from('stories').getPublicUrl(fileName)
    const {data}=await supabase.from('stories').insert({username,image_url:publicUrl}).select().single()
    return NextResponse.json(data)
  }catch(e){ return NextResponse.json({error:e.message},{status:500}) }
}
