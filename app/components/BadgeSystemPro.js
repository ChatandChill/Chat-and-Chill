"use client";
import { useState } from 'react';

export default function BadgeSystemPro() {
  const [badges] = useState(["🔥 Starter", "💬 Chatter", "🎁 Gifter"]);

  return (
    <div onClick={() => alert(`Your Badges:\n${badges.join('\n')}\n\nGift more to unlock Supreme badge!`)}
         className="cursor-pointer p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 mt-4 w-full max-w-md">
      <h3 className="font-bold">Badge System Pro</h3>
      <div className="flex gap-2 mt-2 flex-wrap">
        {badges.map(b => <span key={b} className="text-xs bg-white/10 px-2 py-1 rounded-full">{b}</span>)}
      </div>
      <p className="text- mt-2 text-gray-400">Tap to view badges 👆</p>
    </div>
  );
}
