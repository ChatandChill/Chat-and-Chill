import { createClient } from "@supabase/supabase-js"
export async function POST(req){
  try{
    const {amount,user_id,reference} = await req.json()
    const secret = process.env.PAYSTACK_SECRET_KEY
    if(secret){
      const v = await fetch(`https://api.paystack.co/transaction/verify/${reference}`,{headers:{Authorization:`Bearer ${secret}`}})
      const d = await v.json()
      if(!d.status || d.data.status!=="success") return Response.json({success:false, error:"Paystack verify failed"})
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const bonus = amount>=5000?800:amount>=3000?300:0
    const total = amount+bonus
    const {data:dup} = await supabase.from("transactions").select("id").eq("reference",reference).maybeSingle()
    if(dup){
      const {data:w}=await supabase.from("wallets").select("balance").eq("user_id",user_id).maybeSingle()
      return Response.json({success:true,balance:w?.balance||0,bonus})
    }
    const {data:ex}=await supabase.from("wallets").select("balance").eq("user_id",user_id).maybeSingle()
    let newBal
    if(!ex){ newBal=total; await supabase.from("wallets").insert({user_id,balance:newBal}) }
    else{ newBal=ex.balance+total; await supabase.from("wallets").update({balance:newBal}).eq("user_id",user_id) }
    await supabase.from("transactions").insert({user_id,reference,amount,bonus,status:"success"})
    return Response.json({success:true,balance:newBal,bonus})
  }catch(e){ return Response.json({success:false,error:e.message},{status:500}) }
}
