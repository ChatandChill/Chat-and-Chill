"use client";
import { useState, useEffect } from "react";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [writeUpIndex, setWriteUpIndex] = useState(-1);

  // Pop-up write-up sequence
  useEffect(() => {
    if (!showSplash) return;
    const timers = [
      setTimeout(() => setWriteUpIndex(0), 1800), // LOVE
      setTimeout(() => setWriteUpIndex(1), 2100), // CONNECT
      setTimeout(() => setWriteUpIndex(2), 2400), // CHILL VIBES
      setTimeout(() => setWriteUpIndex(3), 2700), // EARN
    ];
    const autoEnter = setTimeout(() => setShowSplash(false), 5000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(autoEnter);
    };
  }, [showSplash]);

  const writeUps = [
    { text: "LOVE", icon: "❤️", color: "text-pink-300" },
    { text: "CONNECT", icon: "🤝", color: "text-white" },
    { text: "CHILL VIBES", icon: "😎", color: "text-amber-200" },
    { text: "EARN WITH YOUR CREATIVITY", icon: "💰", color: "text-[#d4af37]" },
  ];

  if (showSplash) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden font-light">
        {/* Gold glow */}
        <div className="absolute w-[500px] h-[500px] bg-[#d4af37]/10 blur-[100px] rounded-full animate-pulse" />
        
        {/* Heart with Thin CC */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-[280px] h-[260px] flex items-center justify-center bg-[#0a0a0a] rounded-[40%_40%_40%_40%/50%_50%_40%_40%] shadow-[0_0_80px_rgba(212,175,55,0.3)] border border-[#d4af37]/20 animate-[pop_0.6s_ease-out]">
            {/* Gold dot */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#d4af37] rounded-full shadow-[0_0_20px_#d4af37] animate-pulse" />
            {/* Thin CC */}
            <span className="text-[84px] font-[100] tracking-[12px] text-white">CC</span>
            {/* Tiny Africa outline */}
            <span className="absolute bottom-6 text-[10px] text-[#d4af37]/60 tracking-[4px]">🌍</span>
          </div>

          <div className="mt-8 flex gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>

          <h1 className="mt-8 text-[22px] tracking-[8px] text-white font-[200] animate-[fadeIn_0.8s_0.5s_both]">CHAT & CHILL</h1>
          <p className="mt-2 text-[13px] tracking-[5px] text-[#d4af37] font-[300] animate-[fadeIn_0.8s_1s_both]">LEVEL 10000</p>
          <p className="mt-3 text-[12px] tracking-[1px] text-white/60 font-[200] animate-[fadeIn_0.8s_1.5s_both]">One Heart. One Africa. One Love.</p>

          {/* POP-UP WRITE-UPS - LOVE CONNECT CHILL VIBES EARN */}
          <div className="mt-8 flex flex-col items-center gap-2 min-h-[120px]">
            {writeUps.map((w, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  i <= writeUpIndex ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90"
                } ${w.color} text-[11px] tracking-[3px] font-[300] flex items-center gap-2`}
                style={{ animation: i <= writeUpIndex ? "popUp 0.5s ease-out" : "" }}
              >
                <span>{w.icon}</span> {w.text}
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowSplash(false)}
            className="mt-6 px-8 py-2.5 border border-[#d4af37]/50 text-[#d4af37] text-[10px] tracking-[3px] rounded-full hover:bg-[#d4af37] hover:text-black transition-all duration-300 animate-[fadeIn_1s_4s_both]"
          >
            ENTER APP • One Heart. One Africa. One Love.
          </button>
        </div>

        <style>{`
          @keyframes pop { 0% { transform: scale(0.8); opacity:0 } 100% { transform: scale(1); opacity:1 } }
          @keyframes popUp { 0% { transform: scale(0.8) translateY(10px); } 60% { transform: scale(1.1); } 100% { transform: scale(1) translateY(0); } }
          @keyframes fadeIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // MAIN APP AFTER SPLASH
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-[200]">CC</div>
          <span className="text-[11px] tracking-[3px] font-[200]">CHAT & CHILL</span>
          <span className="text-[8px] text-[#d4af37] ml-2">LEVEL 10000 • One Heart. One Africa. One Love.</span>
        </div>
        <div className="flex gap-3 text-[10px] tracking-widest">
          <span className="text-[#d4af37]">For You</span><span className="opacity-50">LIVE</span><span className="opacity-50">Inbox 🔒</span><span className="opacity-50">Battle</span><span className="opacity-50">Wallet</span>
        </div>
      </header>

      <main className="p-4 grid place-items-center min-h-[70vh]">
        <div className="text-center">
          <h2 className="text-2xl font-[200] tracking-[4px]">THIN ELEGANT BUILD DEPLOYED</h2>
          <p className="mt-4 text-sm text-white/60 font-[200]">LOVE ❤️ CONNECT 🤝 CHILL VIBES 😎 EARN 💰</p>
          <p className="mt-2 text-xs text-[#d4af37]/60">Supabase + LiveKit + Paystack ready — set ENV in Vercel Settings</p>
          <div className="mt-8 p-4 border border-white/10 rounded-xl bg-white/5 text-left text-xs font-mono">
            <p>✓ Logo not bold — thin weight 100</p>
            <p>✓ Tagline: One Heart. One Africa. One Love.</p>
            <p>✓ Pop-up write-ups working</p>
            <p>✓ Replace this with your full TikTok FYP / Battle / Inbox code from previous artifact</p>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full py-3 text-center text-[9px] tracking-[2px] text-white/30 border-t border-white/5">
        One Heart. One Africa. One Love. • LEVEL 10000 • Chat & Chill
      </footer>
    </div>
  );
}
