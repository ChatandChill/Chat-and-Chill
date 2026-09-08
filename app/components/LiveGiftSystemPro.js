"use client";
import { useState } from 'react';

export default function LiveGiftSystemPro() {
  const [sending, setSending] = useState(false);

  async function sendGift() {
    setSending(true);
    try {
      const res = await fetch('/api/gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: 'test_user', receiverId: 'creator_1', amount: 100 })
      });
      const data = await res.json();
      alert(data.message || data.error);
    } catch (e) {
      alert('Error: ' + e.message);
    }
    setSending(false);
  }

  return (
    <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
      <h2 className="text-xl font-bold">🎁 Live Gift System Pro</h2>
      <p className="text-sm opacity-70">Send Gifts • 70% Creator Share • Real-time</p>
      <button onClick={sendGift} disabled={sending}
        className="mt-3 w-full bg-yellow-500 text-black font-bold py-2 rounded-lg">
        {sending ? 'Sending...' : 'Tap to Send ₦100 Gift'}
      </button>
    </div>
  );
}
