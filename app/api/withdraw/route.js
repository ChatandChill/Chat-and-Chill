import { NextResponse } from 'next/server';

const DEMO_DEFAULT_BALANCE = 6765000;
const demoWallets = new Map([
  ['demo_user', DEMO_DEFAULT_BALANCE],
  ['user_123', DEMO_DEFAULT_BALANCE],
  ['creator_001', 0]
]);

export async function POST(req) {
  try {
    const body = await req.json();
    const user_id = body.user_id || body.senderId || 'demo_user';
    const amount = Number(body.amount ?? body.giftAmount ?? 0);
    const method = body.method || 'diamond_wallet';

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'A valid withdrawal amount is required.' }, { status: 400 });
    }

    const currentBalance = demoWallets.get(user_id) ?? DEMO_DEFAULT_BALANCE;

    if (currentBalance < amount) {
      return NextResponse.json({
        success: false,
        demo_mode: true,
        error: 'Insufficient Diamond Wallet funds',
        available_balance: currentBalance,
        requested_amount: amount
      }, { status: 400 });
    }

    demoWallets.set(user_id, currentBalance - amount);

    return NextResponse.json({
      success: true,
      demo_mode: true,
      status: 'queued_for_processing',
      user_id,
      amount,
      method,
      wallet_balance: demoWallets.get(user_id),
      message: `Withdrawal of ₦${amount.toLocaleString()} is queued in demo mode. Live payout processing still requires production setup.`,
      reference: `wd_${Date.now()}`
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Withdrawal processing failed.' }, { status: 500 });
  }
}
