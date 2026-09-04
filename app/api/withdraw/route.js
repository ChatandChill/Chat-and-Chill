import { NextResponse } from 'next/server';
export async function POST(req){
  try{
    const body = await req.json();
    const verifyCode = body.verifyCode;
    const amount = body.amount;
    if(!verifyCode){
      return NextResponse.json({ error: 'Verify code required protect fund from hackers' }, { status: 400 });
    }
    if(verifyCode!== '123456'){
      return NextResponse.json({ error: 'Wrong code Use 123456' }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: 'Withdrawal N' + amount + ' verified ' + verifyCode + ' Fund protected from hackers', status: 'PROTECTED' });
  }catch(e){
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
