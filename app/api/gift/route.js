import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

let wallets = {};
let transactions = [];

// MongoDB connect
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGO_URI) return;
  await mongoose.connect(MONGO_URI);
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const senderId = body.senderId;
    const receiverId = body.receiverId;
    const giftAmount = body.giftAmount;
    const giftName = body.giftName;

    if (!senderId ||!receiverId ||!giftAmount) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const grossKobo = giftAmount * 100;
    const creatorShare = Math.floor(giftAmount * 0.70 * 100);
    const senderBal = wallets[senderId] || 5000000;

    if (senderBal < grossKobo) {
      return NextResponse.json({ error: 'Insufficient Benefit Fund' }, { status: 400 });
    }

    wallets[senderId] = senderBal - grossKobo;
    wallets[receiverId] = (wallets[receiverId] || 0) + creatorShare;

    const txn = {
      id: 'txn_' + Date.now(),
      from: senderId,
      to: receiverId,
      giftName: giftName,
      amount: giftAmount,
      creatorShare: creatorShare,
      timestamp: new Date()
    };

    transactions.push(txn);

    return NextResponse.json({ success: true, txn, wallets });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
