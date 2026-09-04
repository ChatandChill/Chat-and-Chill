// app/api/gift/route.js - CHAT AND CHILL 5M HEDGE CORE 70/30 INSTANT BENEFIT DIRECT NAIRA NO COIN NOT BANK
import { NextResponse } from 'next/server';

let wallets = {};
let transactions = [];

export async function POST(req) {
  try {
    const { senderId, receiverId, giftAmount, giftName } = await req.json();
    if (!senderId ||!receiverId ||!giftAmount) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const PLATFORM_FEE = 0.30;
    const CREATOR_SHARE = 0.70;
    const platformShare = Math.floor(giftAmount * PLATFORM_FEE * 100);
    const creatorShare = Math.floor(giftAmount * CREATOR_SHARE * 100);
    const grossKobo = giftAmount * 100;

    const senderBal = wallets[senderId] || 50000000;
    if (senderBal < grossKobo) {
      return NextResponse.json({ error: 'Insufficient Benefit Fund - More accessible' }, { status: 400 });
    }
    wallets[senderId] = senderBal - grossKobo;
    wallets[receiverId] = (wallets[receiverId] || 0) + creatorShare;

    const txn = {
      id: txn_${Date.now()},
      type: 'GIFT_BENEFIT_NOT_BANK',
      from: senderId,
      to: receiverId,
      giftName: giftName || 'African Eye',
      gross_naira: giftAmount,
      creator_gets_naira: creatorShare / 100,
      platform_gets_naira: platformShare / 100,
      rate: '70% Creator Instant Benefit 30% Platform',
      dna: 'TikTok FYP + Instagram Gift + Chat Chill Friendship Love Benefits',
      status: 'COMPLETED_INSTANT_5M_HEDGE',
      created_at: new Date().toISOString()
    };
    transactions.push(txn);

    return NextResponse.json({
      success: true,
      message: Gift ${giftName} N${giftAmount} -> Creator N${creatorShare/100} instantly 70% Benefit,
      transaction: txn,
      wallets: { sender_naira: wallets[senderId]/100, receiver_naira: wallets[receiverId]/100 }
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ wallets_naira: Object.fromEntries(Object.entries(wallets).map(([k,v])=>[k,v/100])), transactions, hedge: '5M Ahead TikTok IG DNA Not Bank' });
}
