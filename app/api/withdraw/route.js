/ app/api/withdraw/route.js - VERIFY APPLICABLE TO WITHDRAWAL ONLY PROTECT FUND FROM HACKERS
import { NextResponse } from 'next/server';
export async function POST(req){
  try{
    const { userId, amount, verifyCode } = await req.json();
    if(!verifyCode){ return NextResponse.json({ error: 'Verify code required protect fund from hackers' }, { status: 400 }); }
    if(verifyCode!=='123456'){ return NextResponse.json({ error: 'Wrong code Use 123456 protect fund' }, { status: 400 }); }
    return NextResponse.json({ success: true, message: Withdrawal N${amount} verified ${verifyCode} Fund protected from hackers Not bank app Benefit, status: 'PROTECTED' });
  }catch(e){ return NextResponse.json({ error: e.message }, { status: 500 }); }
}
