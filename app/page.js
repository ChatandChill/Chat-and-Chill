'use client';
import { useState, useEffect, useRef } from 'react';

// === CHAT & CHILL PREMIUM DNA - UPGRADED ===
// TikTok FYP + Instagram Reels + Stories + Chat and Chill Benefit
// Features: Guest scroll, Gift = Benefit, 2G optimized, 70/30 instant, No coins

const GIFTS = [
  { id: 1, name: 'Heart', icon: '❤️', price: 200, naira: '₦200' },
  { id: 2, name: 'Rose', icon: '🌹', price: 500, naira: '₦500' },
  { id: 3, name: 'Africa', icon: '🌍', price: 2000, naira: '₦2K' },
  { id: 4, name: 'Lion', icon: '🦁', price: 5000, naira: '₦5K' },
  { id: 5, name: 'Jet', icon: '✈️', price: 50000, naira: '₦50K' },
];

const FEED = [
  { id: 1, user: 'Amaka_Japa', location: 'Lagos → Toronto', video: 'https://images.unsplash.com/photo-1517841905240-472988babdf9', caption: 'How I japa with $0 gift support 👇 #japa', likes: '125K', isLive: true },
  { id: 2, user: 'MC_FunnyNaija', location: 'Abuja', video: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', caption: 'Gift = Benefit fr 😂 No coin wahala', likes: '89K', isLive: false },
  { id: 3, user: 'Chef_Diaspora', location: 'Houston, TX', video: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', caption: 'Cooking egusi with instant withdrawal 💸', likes: '45K', isLive: true },
];

export default function Page() {
  const [walletBalance, setWalletBalance] = useState(12500);
  const [creatorBalance, setCreatorBalance] = useState(87500);
  const [activeGift, setActiveGift] = useState(null);
  const [showWallet, setShowWallet] = useState(false);
  const [guestMode, setGuestMode] = useState(true);
  const containerRef = useRef(null);

  // 2G Optimization + Translation stub
  const t = (text) => text; // plug your i18n: en, pidgin, yoruba, igbo, hausa

  const handleGift = (gift) => {
    if (walletBalance < gift.price) {
      alert('Fund wallet first! No coins needed - just fund with Paystack.');
      setShowWallet(true);
      return;
    }
    const creatorShare = Math.floor(gift.price * 0.7);
    const platformShare = gift.price - creatorShare;
    
    // Instant credit - 70/30 logic
    setWalletBalance(prev => prev - gift.price);
    setCreatorBalance(prev => prev + creatorShare);
    setActiveGift(gift);

    // Animation
    setTimeout(() => setActiveGift(null), 2000);
    
    // Here call your API: POST /api/gift { creatorShare, platformShare }
    console.log(`GIFT: Creator got ₦${creatorShare} instantly, Platform ₦${platformShare}`);
  };

  const handleWithdraw = () => {
    // Instant withdrawal via Paystack Transfer / Flutterwave
    alert(`Instant withdrawal: ₦${creatorBalance} sent to your bank! 70% is yours. No hold.`);
    setCreatorBalance(0);
  };

  return (
    <div className="bg-black text-white min-h-screen max-w-[430px] mx-auto relative overflow-hidden font-sans">
      {/* Header - Not bank app look */}
      <header className="flex justify-between items-center p-4 z-20 absolute top-0 w-full bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <img src="/logo-dark.png" alt="Chat & Chill" className="w-9 h-9 rounded-full bg-white/10 p-1" />
          <span className="font-bold text-[16px] tracking-tight">Chat & Chill</span>
          <span className="bg-yellow-400 text-black text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">PREMIUM</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowWallet(true)} className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold">
            ₦{walletBalance.toLocaleString()} • Fund
          </button>
        </div>
      </header>

      {/* Stories - Instagram DNA */}
      <div className="flex gap-3 p-4 pt-16 overflow-x-auto scrollbar-hide">
        {['You', 'Amaka', 'Tunde', 'Chi', 'Diaspora'].map((s, i) => (
          <div key={i} className="flex flex-col items-center min-w-[60px]">
            <div className="w-[58px] h-[58px] rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-cyan-400">
              <div className="bg-black rounded-full p-[2px] w-full h-full"><div className="w-full h-full bg-zinc-800 rounded-full" /></div>
            </div>
            <span className="text-[11px] mt-1 opacity-80">{s}</span>
          </div>
        ))}
      </div>

      {/* FYP Feed - TikTok DNA + Guest Scroll */}
      <div ref={containerRef} className="h-[72vh] overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {FEED.map((post) => (
          <div key={post.id} className="relative h-[72vh] w-full snap-start flex-shrink-0">
            <img src={post.video} className="absolute inset-0 w-full h-full object-cover" alt="video" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
            
            {/* Right actions */}
            <div className="absolute right-3 bottom-24 flex flex-col gap-6 items-center">
              <button className="flex flex-col items-center"><span className="text-3xl">❤️</span><span className="text-xs font-bold">{post.likes}</span></button>
              <button className="flex flex-col items-center"><span className="text-3xl">💬</span><span className="text-xs">12K</span></button>
              <button className="flex flex-col items-center"><span className="text-3xl">🎁</span><span className="text-xs">Gift</span></button>
              <div className="w-12 h-12 rounded-full border-2 border-white bg-zinc-700" />
            </div>

            {/* Bottom info + Gift = Benefit */}
            <div className="absolute left-3 bottom-4 right-20">
              <p className="font-bold">@{post.user} {post.isLive && <span className="bg-red-600 text-[10px] px-2 py-0.5 rounded ml-2">LIVE • Benefit</span>}</p>
              <p className="text-sm mt-1 opacity-90">{t(post.caption)}</p>
              <p className="text-xs mt-2 text-cyan-300">📍 {post.location} • 2G optimized • Guest can watch</p>
              
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {GIFTS.map(g => (
                  <button key={g.id} onClick={() => handleGift(g)} className="bg-white/20 backdrop-blur border border-white/30 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-white hover:text-black transition whitespace-nowrap">
                    {g.icon} {g.naira}
                  </button>
                ))}
              </div>
            </div>

            {activeGift && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="animate-bounce text-8xl">{activeGift.icon}</div>
                <div className="absolute top-1/2 mt-16 bg-green-500 text-white px-4 py-1 rounded-full font-bold text-sm">
                  +₦{Math.floor(activeGift.price * 0.7)} credited instantly!
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat & Chill Benefit Bar */}
      <div className="flex justify-around items-center h-[56px] border-t border-white/10 bg-black/95 backdrop-blur">
        <button className="text-cyan-400 font-bold text-xs">🏠 FYP</button>
        <button className="opacity-60 text-xs">🔍 Discover</button>
        <button className="bg-gradient-to-r from-yellow-400 to-cyan-400 text-black w-10 h-10 rounded-full font-bold text-xl">+</button>
        <button className="opacity-60 text-xs">💬 Chill</button>
        <button className="opacity-60 text-xs">👤 Profile</button>
      </div>

      {/* Wallet Drawer - No bank app look */}
      {showWallet && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur z-50 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Wallet • No Coins</h2>
            <button onClick={() => setShowWallet(false)} className="text-2xl">×</button>
          </div>
          
          <div className="bg-zinc-900 rounded-2xl p-5 border border-white/10">
            <p className="text-sm opacity-60">Available to Withdraw (70%)</p>
            <p className="text-3xl font-bold mt-1">₦{creatorBalance.toLocaleString()}</p>
            <p className="text-xs text-green-400 mt-2">✓ Instant withdrawal • 30% platform fee auto-split</p>
            <button onClick={handleWithdraw} className="w-full mt-4 bg-white text-black py-3 rounded-full font-bold">Withdraw Instantly to Bank</button>
            <p className="text-[11px] opacity-50 mt-2 text-center">Paystack • Flutterwave • Stripe for Diaspora</p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-5 border border-white/10 mt-4">
            <p className="text-sm opacity-60">Your Gifting Balance</p>
            <p className="text-2xl font-bold mt-1">₦{walletBalance.toLocaleString()}</p>
            <button className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black py-3 rounded-full font-bold">Fund Wallet - No Coins Needed</button>
          </div>

          <div className="mt-auto text-center">
            <p className="text-[11px] opacity-40">5M hedge ahead — Not bank app! TikTok + IG + Chill DNA</p>
            <p className="text-[11px] opacity-40">More convenient guest scroll • Gift = Benefit • 2G translation</p>
          </div>
        </div>
      )}

      <style>{` .scrollbar-hide::-webkit-scrollbar{display:none} .scrollbar-hide{-ms-overflow-style:none; scrollbar-width:none;}`}</style>
    </div>
  );
}
