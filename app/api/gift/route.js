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
[4:35 pm, 06/09/2026] @SMALLWORLDMEDI: import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Connect Mongo - Supreme v6.7.0
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ChatandChill:ChatandChill2026Supreme@chatandchill.ajjer21.mongodb.net/ChatandChill-supreme?retryWrites=true&w=majority&appName=ChatandChill';

if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGO_URI).then(() => console.log('✅ Gift Route Connected to', mongoose.connection.name)).catch(()=>{});
}

const GiftSchema = new mongoose.Schema({
  txnId: String,
  from: String,
  to: String,
  giftName: String,
  giftAmount: Number,
  creatorShare: Number,
  grossKobo: Number,
  timestamp: { type: Date, default: Date.now }
});

const UserWalletSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  balance: { type: Number, default: 6765000000000 }, // 6.7T Supreme
  transactions: { type: Array, default: [] }
});

const Gift = mongoose.models.Gift || mongoose.model('Gift', GiftSchema);
const UserWallet = mongoose.models.UserWallet || mongoose.model('UserWallet', UserWalletSchema);

let wallets = {};
let transactions = [];

export async function POST(req){
  try{
    const body = await req.json();
    const { senderId, receiverId, giftAmount, giftName } = body;

    if(!senderId ||!receiverId ||!giftAmount){
      return NextResponse.json({ error: 'Missing fields - senderId, receiverId, giftAmount required' }, { status: 400 });
    }

    const creatorShare = Math.floor(giftAmount * 0.70 * 100); // 70% to creator - Supreme
    const platformFee = Math.floor(giftAmount * 0.30 * 100); // 30% platform
    const grossKobo = giftAmount * 100;

    // Get or create wallets - Supreme v6.7.0 with mongoose
    let senderWallet = await UserWallet.findOne({ userId: senderId });
    if(!senderWallet){
      senderWallet = await UserWallet.create({ userId: senderId, balance: 6765000000000 });
    }

    let receiverWallet = await UserWallet.findOne({ userId: receiverId });
    if(!receiverWallet){
      receiverWallet = await UserWallet.create({ userId: receiverId, balance: 0 });
    }

    const senderBal = senderWallet.balance || wallets[senderId] || 5000000;

    if(senderBal < grossKobo){
      return NextResponse.json({ error: 'Insufficient Benefit Fund - Top up wallet' }, { status: 400 });
    }

    // Update wallets - Supreme Transaction
    senderWallet.balance = senderBal - grossKobo;
    receiverWallet.balance = (receiverWallet.balance || 0) + creatorShare;

    await senderWallet.save();
    await receiverWallet.save();

    // Legacy memory for compatibility
    wallets[senderId] = senderWallet.balance;
    wallets[receiverId] = receiverWallet.balance;

    const txn = {
      id: 'txn_' + Date.now(),
      txnId: 'txn_' + Date.now(),
      from: senderId,
      to: receiverId,
      giftName: giftName || 'Supreme Gift',
      giftAmount,
      creatorShare,
      platformFee,
      grossKobo,
      timestamp: new Date()
    };

    // Save to Mongo - Greater than all app
    await Gift.create(txn);
    transactions.push(txn);

    return NextResponse.json({
      success: true,
      message: Gift ${giftName} - ${giftAmount} sent! Creator gets 70%,
      txn,
      senderBalance: senderWallet.balance,
      receiverBalance: receiverWallet.balance,
      version: '6.7.0 Supreme - Greater Than All App'
    });

  }catch(e){
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req){
  try{
    const gifts = await Gift.find().sort({ timestamp: -1 }).limit(50);
    return NextResponse.json({
      success: true,
      gifts,
      transactions: transactions.slice(-20),
      wallets,
      version: '6.7.0 Supreme'
    });
  }catch(e){
    return NextResponse.json({ transactions, wallets, version: '6.7.0' });
  }
}
