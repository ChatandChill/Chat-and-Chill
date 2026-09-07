import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// --- DB Connection ---
const MONGODB_URI = process.env.MONGODB_URI;
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

// --- Withdrawal Schema ---
const WithdrawalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amountKobo: { type: Number, required: true }, // store in kobo to avoid float errors
  amountNaira: { type: Number, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountName: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'paid'], default: 'pending' },
  txnId: { type: String, unique: true },
}, { timestamps: true });

const Withdrawal = mongoose.models.Withdrawal || mongoose.model('Withdrawal', WithdrawalSchema);

// --- Wallet Schema (simple version, adjust to yours) ---
const WalletSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balanceKobo: { type: Number, default: 0 },
}, { timestamps: true });

const Wallet = mongoose.models.Wallet || mongoose.model('Wallet', WalletSchema);

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, amountNaira, bankName, accountNumber, accountName } = body;

    // Validation
    if (!userId || !amountNaira || !bankName || !accountNumber || !accountName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (amountNaira < 1000) {
      return NextResponse.json({ error: 'Minimum withdrawal is ₦1000' }, { status: 400 });
    }

    const amountKobo = Math.round(amountNaira * 100);

    // Check wallet balance
    const wallet = await Wallet.findOne({ userId });
    if (!wallet || wallet.balanceKobo < amountKobo) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    // Deduct balance
    wallet.balanceKobo -= amountKobo;
    await wallet.save();

    // Create withdrawal request
    const txnId = 'txn_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    
    const withdrawal = await Withdrawal.create({
      userId,
      amountKobo,
      amountNaira,
      bankName,
      accountNumber,
      accountName,
      txnId,
      status: 'pending'
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Withdrawal request submitted',
      withdrawal,
      newBalance: wallet.balanceKobo / 100
    });

  } catch (error) {
    console.error('Withdrawal error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET all withdrawals for a user
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const withdrawals = await Withdrawal.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ withdrawals });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
