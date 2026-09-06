import { NextResponse } from 'next/server';
let wallets = {};
let transactions = [];
export async function POST(req){
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
  const senderBal = wallets[senderId] || 5000000;
  if(senderBal < grossKobo){
    return NextResponse.json({ error: 'Insufficient Benefit Fund' }, { status: 400 });
  }
  wallets[senderId] = senderBal - grossKobo;
  wallets[receiverId] = (wallets[receiverId] || 0) + creatorShare;
  const txn = { id: 'txn_' + Date.now(), from: senderId, to: receiverId, giftName: gift...
