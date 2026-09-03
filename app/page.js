"use client";
import { useState } from "react";

const LANGS = {
  pidgin: { label: "PIDGIN" },
  hausa: { label: "HAUSA" },
  yoruba: { label: "YORUBA" },
  igbo: { label: "IGBO" },
  swahili: { label: "SWAHILI" },
  english: { label: "ENGLISH" },
};

const T = {
  welcomeTitle: { pidgin: "Welcome to Chat & Chill", hausa: "Barka da zuwa Chat & Chill", yoruba: "Kaabo si Chat & Chill", igbo: "Nnoo na Chat & Chill", swahili: "Karibu Chat & Chill", english: "Welcome to Chat & Chill" },
  welcomeSub: { pidgin: "Talk Cool, Stay Chill + Earn", hausa: "Magana Mai Sanyi + Samu Kudi", yoruba: "Soro Tutu + Gba Owo", igbo: "Kparita uka di juu + Nweta ego", swahili: "Ongea Poa + Pata Pesa", english: "Talk Cool, Stay Chill + Earn" },
  oneFamily: { pidgin: "We Be One Family", hausa: "Mu Iyali Daya Ne", yoruba: "A Je Idile Kan", igbo: "Anyi Bu Otu Ezinulo", swahili: "Sisi ni Familia Moja", english: "We Are One Family" },
};

export default function Page() {
  const [lang, setLang] = useState("pidgin");
  const [showWelcome, setShowWelcome] = useState(true);
  const [tab, setTab] = useState("foryou");
  const [balance, setBalance] = useState(306950);
  const [giftOpen, setGiftOpen] = useState(null);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const t = (k) => (T[k] && T[k][lang]) || k;

  const gifts = [
    { name: "Fire", price: 1000, emoji: "FIRE", cut: "70%", color: "#FFF", dark: false },
    { name: "Diamond", price: 5000, emoji: "DIAMOND", cut: "70%", color: "#FFF", dark: false },
    { name: "Rocket", price: 10000, emoji: "ROCKET", cut: "70%", color: "#FFF", dark: false },
    { name: "Lion", price: 25000, emoji: "LION", cut: "70%", color: "#FFF", dark: false },
    { name: "Eagle", price: 50000, emoji: "EAGLE", cut: "80% at Lvl 71+", color: "#000", dark: true, label: "BEYOND TIKTOK" },
    { name: "Crown", price: 100000, emoji: "CROWN", cut: "80%", color: "#000", dark: true },
    { name: "Private Jet", price: 500000, emoji: "JET", cut: "90% at Lvl 100 EZE", color: "#000", dark: true, full: true, label: "LEVEL 100 EZE" },
  ];

  const feedBase = [
    { id: 1, user: "@Sade_Lagos", titles: { pidgin: "Lagos Night Vibes - How I make N1M for live", hausa: "Daren Legas - Yadda na samu N1M a live", yoruba: "Alekole Eko - Bawo ni mo se ri N1M lori live", igbo: "Abali Lagos - Otu m si mee N1M na live", swahili: "Msisimko wa Usiku Lagos - Jinsi nilivyopata N1M live", english: "Lagos Night Vibes - How I made N1M from live" }, score: 92, views: "12.4k", level: 92, tag: "Business 95/100", grad: "from-orange-600 to-yellow-600", saves: 3400, friends: 12, is2G: false },
    { id: 2, user: "@JapaKing", titles: { pidgin: "Japa UK Secrets Wey Dem Dey Hide - Part 2", hausa: "Sirrin Japa UK da suke Boye - Kashi na 2", yoruba: "Asiri Japa UK ti won n toju - Apa 2", igbo: "Ihe nzuzo Japa UK ha na-ezo - Nkeji 2", swahili: "Siri za Japa UK wanazoficha - Sehemu ya 2", english: "Japa UK Secrets They Hide - Part 2" }, score: 98, views: "28.1k", level: 100, tag: "Japa 98/100", grad: "from-blue-600 to-purple-600", saves: 5400, friends: 22, is2G: false },
    { id: 3, user: "@Ada_Business", titles: { pidgin: "How I Build Store with N50k", hausa: "Yadda na Gina Shago da N50k", yoruba: "Bawo ni mo se Ko Ile Itaja pelu N50k", igbo: "Otu m si wuru ulo ahia na N50k", swahili: "Jinsi nilivyojenga duka na N50k", english: "How I Built Store with N50k" }, score: 97, views: "15.2k", level: 88, tag: "Business 97/100", grad: "from-emerald-600 to-teal-600", saves: 2100, friends: 8, is2G: true },
    { id: 4, user: "@VillageChill", titles: { pidgin: "2G Live from Village - 15kb/s", hausa: "Live 2G daga Kauye - 15kb/s", yoruba: "Live 2G lati Abule - 15kb/s", igbo: "Live 2G site n'ime obodo - 15kb/s", swahili: "Live 2G kutoka Kijijini - 15kb/s", english: "2G Live from Village - 15kb/s" }, score: 90, views: "8.4k", level: 71, tag: "2G READY", grad: "from-zinc-700 to-zinc-900", saves: 900, friends: 4, is2G: true },
  ];

  const feed = feedBase
    .map((v) => {
      const chillScore = v.score * 0.4 + (v.saves / 100) * 0.3 + v.friends * 0.2 + (v.is2G ? 10 : 0);
      return { ...v, title: v.titles[lang] || v.titles.english, chillScore };
    })
    .sort((a, b) => b.chillScore - a.chillScore);

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <style>{@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,900&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@700&display=swap'); .fraunces{font-family:'Fraunces',serif} .space{font-family:'Space Grotesk',sans-serif} .mono{font-family:'JetBrains Mono',monospace} @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}}</style>

      <div className="max-w-[430px] mx-auto bg-[#FFFBEB] min-h-screen border-x border-orange-100/50 relative">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#FFFBEB]/90 backdrop-blur-xl px-4 py-3 flex justify-between border-b border-orange-100">
          <div className="flex gap-2 items-center"><div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-xs">C</div><div className="px-3 py-1 rounded-full bg-black text-white text-xs mono">N{balance.toLocaleString()}</div></div>
          <div className="flex gap-2 items-center"><div className="px-3 py-1 rounded-full bg-[#FFD600] text-black text-xs font-bold border border-black">LVL 46-100</div><div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-xs font-bold border-2 border-orange-500">YO</div></div>
        </div>

        <div className="px-4 py-2 flex gap-2 overflow-x-auto">
          {Object.keys(LANGS).map((k) => (
            <button key={k} onClick={() => setLang(k)} className={px-3 py-1.5 rounded-full text-[10px] font-bold mono whitespace-nowrap ${lang === k ? "bg-black text-white" : "bg-black/5 text-black/60"}}>{LANGS[k].label}</button>
          ))}
        </div>

        {showWelcome && (
          <div className="mx-4 mt-2 rounded-[24px] bg-black text-white p-5 text-center border border-white/10">
            <h1 className="fraunces text-[26px] font-black leading-none">{t("welcomeTitle")}</h1>
            <p className="text-[#FF5722] font-black text-xs mt-1 mono">{t("welcomeSub")}</p>
            <p className="text-[10px] mono text-white/60 mt-1">{t("oneFamily")} - IYALI DAYA - IDILE KAN - OTU EZINULO</p>
            <button onClick={() => setShowWelcome(false)} className="w-full mt-4 py-3 rounded-full bg-[#FFD600] text-black font-black mono text-sm">Enter Chat & Chill - BEYOND TIKTOK</button>
          </div>
        )}

        {tab === "foryou" && (
          <>
            <div className="px-5 py-3">
              <h1 className="fraunces text-[34px] leading-[0.9] font-black">Talk Cool, Stay Chill <span className="text-[#FF5722]">+ Earn</span></h1>
              <p className="space text-black/60 text-xs mt-1">TikTok stops at 46. We go to 100! +40% more - 0.3s LiveKit - 2G 15kb/s</p>
              <div className="mt-3 bg-white rounded-[20px] p-4 border border-orange-100 shadow-sm">
                <div className="flex justify-between text-[9px] mono font-bold"><span>TIKTOK MAX 46</span><span>CHILL MAX 100</span></div>
                <div className="h-3 bg-black/5 rounded-full mt-2 overflow-hidden"><div className="h-full w-full bg-gradient-to-r from-[#FF5722] to-orange-400 rounded-full relative overflow-hidden"><div className="absolute inset-0 bg-white/30" style={{ animation: "shimmer 2s infinite linear" }} /></div></div>
                <p className="text-[10px] mono text-black/40 mt-2">EZE OF CHILL - You beat TikTok! Algorithm: AI + Saves + Friends + 2G</p>
              </div>
            </div>

            <div className="px-3 space-y-4">
              {feed.map((v) => (
                <div key={v.id} className="rounded-[28px] overflow-hidden bg-black text-white border border-white/10">
                  <div className={h-[300px] bg-gradient-to-br ${v.grad} p-5 flex flex-col justify-between relative}>
                    <div className="flex justify-between"><span className="px-2 py-1 rounded-full bg-red-500 text-[10px] font-black">LIVE - {v.views}</span><span className="px-3 py-1 rounded-full bg-[#FFD600] text-black text-[10px] font-black">Lvl {v.level} - AI {v.score}/100</span></div>
                    <div><h3 className="fraunces text-[22px] font-black leading-none">{v.title}</h3><p className="text-white/70 text-xs mt-1 space">{v.user} - {v.tag} - ChillScore {v.chillScore.toFixed(0)}</p></div>
                    <div className="absolute right-3 bottom-20 flex flex-col gap-2">
                      <button onClick={() => setLiked({ ...liked, [v.id]: !liked[v.id] })} className={w-11 h-11 rounded-full backdrop-blur grid place-items-center ${liked[v.id] ? "bg-red-500" : "bg-white/10"}}>L</button>
                      <button onClick={() => setSaved({ ...saved, [v.id]: !saved[v.id] })} className={w-11 h-11 rounded-full backdrop-blur grid place-items-center ${saved[v.id] ? "bg-yellow-400 text-black" : "bg-white/10"}}>S</button>
                      <button onClick={() => setGiftOpen(v)} className="w-11 h-11 rounded-full bg-white/10 backdrop-blur grid place-items-center">G</button>
                    </div>
                  </div>
                  <div className="p-3 bg-[#111] flex gap-2"><div className="flex-1 bg-white/5 rounded-xl p-2"><p className="text-[8px] mono opacity-50">VIEWERS</p><p className="font-black mono text-xs">{v.views}</p></div><div className="flex-1 bg-white/5 rounded-xl p-2"><p className="text-[8px] mono opacity-50">AI SCORE</p><p className="font-black text-yellow-400 mono text-xs">{v.score}/100</p></div><div className="flex-1 bg-[#FF5722] rounded-xl p-2"><p className="text-[8px] mono">YOUR CUT</p><p className="font-black mono text-xs">70%-85%</p></div></div>
                  <div className="px-3 pb-3 flex gap-2 flex-wrap"><span className="px-2 py-1 rounded-full bg-white/10 text-[9px] mono">Save to Folder - Earns Forever</span><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-300 text-[9px] mono">0.3s LiveKit - 2G {v.is2G ? "15kb/s" : ""}</span></div>
                </div>
              ))}
            </div>

            <div className="p-4">
              <h2 className="fraunces text-[22px] font-black">Gifts 70% to you - Bal N{balance.toLocaleString()}</h2>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {gifts.map((g) => (
                  <button key={g.name} onClick={() => setGiftOpen(g)} className={text-left rounded-[22px] p-4 border ${g.dark ? "bg-black text-white border-white/10" : "bg-white border-orange-100"} ${g.full ? "col-span-2" : ""}}>
                    <div className="text-xs mono font-bold opacity-50">{g.emoji}</div><p className="font-black space text-sm mt-1">{g.name}</p><p className="mono text-[11px] opacity-70">N{g.price.toLocaleString()} {g.label || ""}</p><span className={mt-2 inline-block px-3 py-1 rounded-full text-[10px] mono font-bold ${g.dark ? "bg-[#FFD600] text-black" : "bg-[#FF5722] text-white"}}>{g.cut}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {giftOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur grid place-items-center p-4">
            <div className="bg-white rounded-[24px] p-5 w-full max-w-[340px]">
              <div className="flex justify-between"><h3 className="fraunces text-xl font-black">Send Gift</h3><button onClick={() => setGiftOpen(null)}>X</button></div>
              <div className="mt-4 bg-[#FFFBEB] rounded-2xl p-4 text-center border"><div className="text-xs mono font-bold">{giftOpen.emoji || "GIFT"}</div><p className="font-black mt-1">{giftOpen.name || giftOpen.title}</p><p className="mono text-sm">N{(giftOpen.price || 1000).toLocaleString()}</p></div>
              <button onClick={() => { setBalance((b) => b + Math.floor((giftOpen.price || 1000) * 0.7)); setGiftOpen(null); alert("Paystack: N" + (giftOpen.price || 1000) + " sent! 70% credited. Key pk_test_22c3df... Firewall Active"); }} className="w-full mt-4 py-4 rounded-full bg-black text-white font-black">Pay with Paystack - N{(giftOpen.price || 1000).toLocaleString()}</button>
              <p className="text-[10px] mono text-center opacity-40 mt-2">Secured by Paystack - LiveKit 0.3s - WAF Active</p>
            </div>
          </div>
        )}

        <div className="sticky bottom-0 bg-[#FFFBEB]/90 backdrop-blur-xl border-t border-orange-100 px-2 py-2 flex justify-around">
          {[{ k: "foryou", l: "For You" }, { k: "live", l: "Live" }, { k: "wallet", l: "Wallet" }].map((t) => (
            <button key={t.k} onClick={() => setTab(t.k)} className={flex flex-col items-center px-6 py-1.5 rounded-full ${tab === t.k ? "bg-black text-white" : "text-black/50"}}><span className="text-[9px] mono font-bold">{t.l}</span></button>
          ))}
        </div>

        <div className="p-3 text-[10px] mono text-center opacity-30">Premium v104 - One Family - Algorithm v103 - 0.3s LiveKit - 2G 15kb/s - pk_test_22c3df...</div>
      </div>
    </div>
  );
}
