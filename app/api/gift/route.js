export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anon) {
      return NextResponse.json({ error: 'Supabase environment variables are missing' }, { status: 500 });
    }

    const supabase = createClient(url, anon);
    const { senderId, receiverId, amount } = await req.json();
    const giftAmount = Number(amount);
    
    if (!senderId || !receiverId || !giftAmount) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Get sender balance
    const { data: sender } = await supabase.from('wallets').select('balance').eq('user_id', senderId).single();
    const senderBalance = sender?.balance || 0;

    if (senderBalance < giftAmount) {
      return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 });
    }

    // 70% to creator - your Supreme promise
    const creatorShare = giftAmount * 0.7;

    // Deduct from sender
    await supabase.from('wallets').update({ 
      balance: senderBalance - giftAmount, 
      updated_at: new Date().toISOString() 
    }).eq('user_id', senderId);

    // Add to receiver
    const { data: receiver } = await supabase.from('wallets').select('balance').eq('user_id', receiverId).single();
    const receiverNewBalance = (receiver?.balance || 0) + creatorShare;
    
    await supabase.from('wallets').upsert({ 
      user_id: receiverId, 
      balance: receiverNewBalance, 
      updated_at: new Date().toISOString() 
    });

    // Save proof
    await supabase.from('gifts').insert({ 
      sender_id: senderId, 
      receiver_id: receiverId, 
      amount: giftAmount 
    });

    return NextResponse.json({ 
      success: true, 
      message: `Gift sent! Creator received ${creatorShare}` 
    });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
