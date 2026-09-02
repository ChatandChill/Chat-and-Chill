"use client"
import { useState, useEffect } from 'react';

type Tab = 'discover' | 'live' | 'earn' | 'wallet';

const gifts = [
  { id: 1, name: 'Fire', price: 'N1,000', value: 1000, emoji: '🔥', accent: '#FF5A1F', bg: '#FFF0E6' },
  { id: 2, name: 'Diamond', price: 'N5,000', value: 5000, emoji: '💎', accent: '#7C5CFF', bg: '#F0EBFF' },
  { id: 3, name: 'Rocket', price: 'N10,000', value: 10000, emoji: '🚀', accent: '#FF8A1F', bg: '#FFF4E6' },
  { id: 4, name: 'Lion', price: 'N25,000', value: 25000, emoji: '🦁', accent: '#EAB308', bg: '#FFF9D6' },
];

export default function Page() {
  const [tab, setTab] = useState<Tab>('live');
  const [is2G, setIs2G] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [earnings, setEarnings] = useState(47250);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleGift = (g: typeof gifts[0]) => {
    setToast(`Gift dropped! ${g.name} ${g.price} • +N${Math.round(g.value * 0.7).toLocaleString()} to you`);
    setEarnings(e => e + Math.round(g.value * 0.7));
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF9E9] text-[#1A1A1A] flex justify-center">
      <div className="relative w-full max-w-[430px] min-h-screen flex flex-col pb-[88px]">
        <header className="flex items-center justify-between px-6 pt-6 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-[12px]">C&C</div>
            <span className="font-black tracking-tight text-[14px] leading-none">CHAT &<br/>CHILL</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-full pl-3 pr-1.5 py-1 shadow border">
            <span className="text-[11px] font-bold text-[#6B6B6B]">2G MODE</span>
            <button onClick={() => setIs2G(!is2G)} className={`relative w-[44px] h-[26px] rounded-full transition-all ${is2G ? 'bg-[#FF5A1F]' : 'bg-[#E5E0D5]'}`}>
              <span className={`absolute top-[3px] w-[20px] h-[20px] bg-white rounded-full shadow transition-all ${is2G ? 'left-[21px]' : 'left-[3px]'}`} />
            </button>
          </div>
        </header>

        <main className="flex-1 px-5">
          {tab === 'live' && (
            <div>
              <div className="mt-3 mb-6">
                <h1 className="text-[36px] font-black leading-[0.95] tracking-tight">
                  Talk Cool,<br/>Stay Chill<span className="text-[#FF5A1F]"> + Earn</span>
                </h1>
                <p className="mt-3 text-[13px] text-[#6B665E] font-medium">Creator economy built for 2G • Earn from your live streams</p>
              </div>

              <div className="rounded-[28px] bg-white p-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <p className="text-[14px] font-bold">⚡ Go live in 2 seconds, receive instant gifts</p>
                <button onClick={() => setToast('You are live! Invite fans 🔥')} className="mt-4 w-full h-[52px] rounded-[16px] bg-[#FF5A1F] text-white font-black shadow">▶ Start Live Now</button>
                <p className="mt-2 text-[10px] text-center text-[#9E9A93]">{is2G ? '2G optimized • 15kb/s' : 'HD mode • 500kb/s'}</p>
              </div>

              <h3 className="mt-6 mb-3 font-black">Rewards • 70% to Creator</h3>
              <div className="grid grid-cols-2 gap-3">
                {gifts.map(g => (
                  <button key={g.id} onClick={() => handleGift(g)} className="rounded-[20px] bg-white p-4 shadow text-left active:scale-95 transition">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 text-[20px]" style={{background:g.bg}}>
                      {g.emoji}
                    </div>
                    <p className="font-bold text-[14px]">{g.name}</p>
                    <p className="font-black text-[18px]">{g.price}</p>
                    <p className="mt-2 text-[10px] font-bold bg-[#FF5A1F] text-white px-2 py-1 rounded-full inline-block">70% to creator</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === 'wallet' && (
            <div className="mt-4 space-y-4">
              <h2 className="text-[26px] font-black">Wallet • Payouts</h2>
              <div className="rounded-[24px] bg-white p-5 shadow">
                <p className="text-[11px] font-bold text-[#9E9A93]">AVAILABLE BALANCE</p>
                <p className="mt-2 text-[34px] font-black">N{earnings.toLocaleString()}</p>
                <button onClick={() => setToast('Withdraw sent • Naira in 2 mins')} className="mt-4 w-full h-[46px] rounded-[14px] bg-[#FF5A1F] text-white font-black">Withdraw to Bank</button>
                <p className="mt-2 text-[10px] text-center text-[#9E9A93]">Zero fees • Works on 2G • GTB, Opay, PalmPay</p>
              </div>
            </div>
          )}

          {tab === 'discover' && (
            <div className="mt-10 text-center px-6">
              <h2 className="text-[22px] font-black">Discover Live Rooms 🔥</h2>
              <p className="mt-2 text-[#6B6B6B] text-[14px]">2G-optimized audio rooms. Go Live to be discovered!</p>
              <button onClick={() => setTab('live')} className="mt-4 px-6 py-3 bg-black text-white rounded-full font-bold">Go Live Now</button>
            </div>
          )}
          {tab === 'earn' && (
            <div className="mt-4 space-y-4 px-1">
              <h2 className="text-[22px] font-black">Earn Dashboard</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[18px] bg-white p-4 shadow">
                  <p className="text-[11px] font-bold text-[#9E9A93]">THIS WEEK</p>
                  <p className="mt-1 text-[20px] font-black">N18,400</p>
                </div>
                <div className="rounded-[18px] bg-white p-4 shadow">
                  <p className="text-[11px] font-bold text-[#9E9A93]">BALANCE</p>
                  <p className="mt-1 text-[20px] font-black">N{earnings.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-[12px] text-[#6B6B6B]">Fire N1,000 → you keep N700<br/>Lion N25,000 → you keep N17,500</p>
            </div>
          )}
        </main>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px]">
          <div className="mx-3 mb-3 rounded-[22px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.14)] px-2 py-2 flex justify-around">
            {[
              { id: 'discover', label: 'Discover', icon: '🧭' },
              { id: 'live', label: 'Live', icon: '📡' },
              { id: 'earn', label: 'Earn', icon: '💰' },
              { id: 'wallet', label: 'Wallet', icon: '👛' },
            ].map(item => (
              <button key={item.id} onClick={() => setTab(item.id as Tab)} className={`flex flex-col items-center min-w-[64px] py-1.5 rounded-[14px] ${tab===item.id?'text-[#FF5A1F]':'text-[#9E9A93]'}`}>
                <span className="text-[18px]">{item.icon}</span>
                <span className="mt-1 text-[10px] font-black">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full bg-black text-white px-4 py-2.5 shadow flex items-center gap-2 w-[90%] max-w-[380px] justify-center">
            <span className="text-[12px]">✦</span>
            <span className="text-[12px] font-bold">{toast}</span>
          </div>
        )}
      </div>
    </div>
  );
}
