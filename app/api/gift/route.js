export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const DEMO_WALLET_START = 6765000;
const demoWallets = new Map([
  ['demo_user', DEMO_WALLET_START],
  ['user_123', DEMO_WALLET_START],
  ['demo_creator', 0]
]);

export async function POST(req) {
  try {
    const { senderId, receiverId, amount, giftAmount } = await req.json();
    const giftValue = Number(amount ?? giftAmount ?? 0);

    if (!senderId || !receiverId || !giftValue) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const safeSenderId = senderId || 'demo_user';
    const safeReceiverId = receiverId || 'demo_creator';
    const senderBalance = demoWallets.get(safeSenderId) ?? DEMO_WALLET_START;

    if (senderBalance < giftValue) {
      return NextResponse.json({
        success: false,
        error: 'Insufficient funds',
        demo_mode: true,
        wallet_balance: senderBalance,
        required_amount: giftValue
      }, { status: 400 });
    }

    demoWallets.set(safeSenderId, senderBalance - giftValue);
    const receiverBalance = demoWallets.get(safeReceiverId) ?? 0;
    demoWallets.set(safeReceiverId, receiverBalance + giftValue * 0.7);

    return NextResponse.json({
      success: true,
      demo_mode: true,
      message: `Gift sent! Creator received ${giftValue * 0.7}`,
      sender_balance: demoWallets.get(safeSenderId),
      receiver_balance: demoWallets.get(safeReceiverId),
      amount: giftValue,
      creator_share: giftValue * 0.7,
      reference: `demo_${Date.now()}`
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Gift processing failed' }, { status: 500 });
  }
}
