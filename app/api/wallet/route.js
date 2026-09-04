/ app/api/wallet/route.js - BENEFIT WALLET NOT BANK WALLET LIKE TIKTOK COINS
import { NextResponse } from 'next/server';
let wallets = {};
export async function POST(req){
  const { userId } = await req.json();
  const bal = wallets[userId] || 50000000;
  return NextResponse.json({ userId, balance_naira: bal/100, type: 'Benefit Wallet Not Bank Wallet - Accessible' });
}
export async function GET(){ return NextResponse.json({ message: 'Benefit Wallet API' }); }
