import { NextResponse } from 'next/server';
let wallets = {};
let transactions = [];
export async function POST(req){
  try{
    const body = await req.json();
    const senderId = body.senderId;
    const receiverId = body.receiverId;
    const giftAmount = body.giftAmount;
    const giftName = body.giftName;
    if(!senderId ||!receiverId ||!giftAmount){
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const creatorShare = Math.floor(giftAmount * 0.70 * 100);
    const grossKobo = giftAmount * 100;
    const senderBal = wallets[senderId] || 50000000;
    if(senderBal < grossKobo){
      return NextResponse.json({ error: 'Insufficient Benefit Fund' }, { status: 400 });
    }
    wallets[senderId] = senderBal - grossKobo;
    wallets[receiverId] = (wallets[receiverId] || 0) + creatorShare;
    const txn = { id: 'txn_' + Date.now(), from: senderId, to: receiverId, giftName: giftName, gross_naira: giftAmount, creator_gets_naira: creatorShare/100, status: 'COMPLETED_INSTANT_5M_HEDGE', created_at: new Date().toISOString() };
    transactions.push(txn);
    return NextResponse.json({ success: true, message: 'Gift ' + giftName + ' N' + giftAmount + ' -> Creator N' + (creatorShare/100) + ' instantly 70% Benefit', transaction: txn, wallets: { sender_naira: wallets[senderId]/100 } });
  }catch(e){
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
export async function GET(){
  return NextResponse.json({ ok: true });
}
