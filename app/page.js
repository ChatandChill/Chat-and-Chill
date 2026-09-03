"use client"
import { useState } from 'react'

const LANGS = {
  pidgin: { flag: 'NG', label: 'PIDGIN', name: 'One Family' },
  hausa: { flag: 'HA', label: 'HAUSA', name: 'Iyali Daya' },
  yoruba: { flag: 'YO', label: 'YORUBA', name: 'Idile Kan' },
  igbo: { flag: 'IG', label: 'IGBO', name: 'Otu Ezinulo' },
  swahili: { flag: 'SW', label: 'SWAHILI', name: 'Familia Moja' },
  english: { flag: 'EN', label: 'ENGLISH', name: 'One Family' },
}

const TRANSLATIONS = {
  welcomeTitle: {
    pidgin: "Welcome to Chat & Chill",
    hausa: "Barka da zuwa Chat & Chill",
    yoruba: "Kaabo si Chat & Chill",
    igbo: "Nnoo na Chat & Chill",
    swahili: "Karibu Chat & Chill",
    english: "Welcome to Chat & Chill"
  },
  welcomeSub: {
    pidgin: "Talk Cool, Stay Chill + Earn",
    hausa: "Magana Mai Sanyi + Samu Kudi",
    yoruba: "Soro Tutu + Gba Owo",
    igbo: "Kparita uka di juu + Nweta ego",
    swahili: "Ongea Poa + Pata Pesa",
    english: "Talk Cool, Stay Chill + Earn"
  },
  electrified: {
    pidgin: "ELECTRIFIED ENTERTAINMENT STREAM",
    hausa: "NISHADI MAI WUTA YAWO",
    yoruba: "ERE IDARAYA ONINA SINSIN",
    igbo: "NTURNDU NA-ENWU OKU MGBASAOZI",
    swahili: "BURUDANI YA UMEME MTIRIRIKO",
    english: "ELECTRIFIED ENTERTAINMENT STREAM"
  },
  africaDiaspora: {
    pidgin: "Africa + Diaspora Connected - Love + Vibe + Earn",
    hausa: "Afirka + Diaspora Hade - Kauna + Nishadi + Kudi",
    yoruba: "Afirika + Diaspora Sopo - Ife + Igbadun + Owo",
    igbo: "Africa + Diaspora Jikotara - Ihunanya + Obi uto + Ego",
    swahili: "Afrika + Diaspora Imeunganishwa - Upendo + Raha + Pesa",
    english: "Africa + Diaspora Connected - Love + Vibe + Earn"
  },
  forYou: { pidgin:"For You", hausa:"Gare Ka", yoruba:"Fun E", igbo:"Maka Gi", swahili:"Kwa Ajili Yako", english:"For You"},
  live: { pidgin:"Live", hausa:"Kai Tsaye", yoruba:"Laye", igbo:"Ndu", swahili:"Moja kwa Moja", english:"Live"},
  gifts: { pidgin:"Gifts 70% to you", hausa:"Kyaututtuka 70% gare ka", yoruba:"Ebun 70% fun e", igbo:"Onyinye 70% nye gi", swahili:"Zawadi 70% kwako", english:"Gifts 70% to you"},
  goLive: { pidgin:"Go Live Now", hausa:"Fara Live Yanzu", yoruba:"Lo Laye Bayi", igbo:"Bido Ndu Ugbu a", swahili:"Anza Live Sasa", english:"Go Live Now"},
  sendGift: { pidgin:"Send Gift", hausa:"Aika Kyauta", yoruba:"Ran Ebun", igbo:"Zipu Onyinye", swahili:"Tuma Zawadi", english:"Send Gift"},
  enterApp: { pidgin:"Enter Chat & Chill", hausa:"Shiga Chat & Chill", yoruba:"Wole si Chat & Chill", igbo:"Banye na Chat & Chill", swahili:"Ingia Chat & Chill", english:"Enter Chat & Chill"},
  oneFamily: { pidgin:"We Be One Family", hausa:"Mu Iyali Daya Ne", yoruba:"A Je Idile Kan", igbo:"Anyi Bu Otu Ezinuulo", swahili:"Sisi ni Familia Moja", english:"We Are One Family"},
}

export default function Page() {
  const [lang, setLang] = useState('pidgin')
  const [showWelcome, setShowWelcome] = useState(true)
  const [tab, setTab] = useState('foryou')
  const [balance, setBalance] = useState(306950)
  const [gift, setGift] = useState(null)
  const [liked, setLiked] = useState(new Set())
  const [saved, setSaved] = useState(new Set())

  const t = (key) => {
    const val = TRANSLATIONS[key]
    if (!val) return key
    return val[lang] || val['english']
  }

  const gifts = [
    {name:'Fire', price:1000, emoji:'F', cut:'70%', dark:false},
    {name:'Diamond', price:5000, emoji:'D', cut:'70%', dark:false},
    {name:'Rocket', price:10000, emoji:'R', cut:'70%', dark:false},
    {name:'Lion', price:25000, emoji:'L', cut:'70%', dark:false},
    {name:'Eagle', price:50000, emoji:'E', cut:'80% at Lvl 71+', dark:true, label:'BEYOND TIKTOK'},
    {name:'Crown', price:100000, emoji:'C', cut:'80%', dark:true},
    {name:'Private Jet', price:500000, emoji:'J', cut:'90% at Lvl 100 EZE', dark:true, full:true, label:'LEVEL 100 EZE'},
  ]

  const feedBase = [
    {id:1, user:'@Sade_Lagos', titles:{ pidgin:'Lagos Night Vibes - How I make N1M for live', hausa:'Daren Legas - Yadda na samu N1M a live', yoruba:'Alekole Eko - Bawo ni mo se ri N1M lori live', igbo:'Abali Lagos - Otu m si mee N1M na live', swahili:'Msisimko wa Usiku Lagos - Jinsi nilivyopata N1M live', english:'Lagos Night Vibes - How I made N1M from live'}, score:92, views:'12.4k', gifts:'N892k', level:92, tag:'Business 95/100', color:'from-orange-600 to-yellow-600', saves:3400, friends:12, days:2, is2G:false},
    {id:2, user:'@JapaKing', titles:{ pidgin:'Japa UK Secrets Wey Dem Dey Hide - Part 2', hausa:'Sirrin Japa UK da suke Boye - Kashi 2', yoruba:'Asiri Japa UK ti won n toju - Apa 2', igbo:'Ihe nzuzo Japa UK ha na-ezo - Akuku 2', swahili:'Siri za Japa UK wanazoficha - Sehemu 2', english:'Japa UK Secrets They Hide - Part 2'}, score:98, views:'28.1k', gifts:'N1.2M', level:100, tag:'Japa 98/100', color:'from-blue-600 to-purple-600', saves:5400, friends:22, days:1, is2G:false},
    {id:3, user:'@Ada_Business', titles:{ pidgin:'How I take build store with N50k', hausa:'Yadda na gina shago da N50k', yoruba:'Bawo ni mo se ko ile itaja pelu N50k', igbo:'Otu m siri jiri N50k wuo ulo ahia', swahili:'Jinsi nilivyojenga duka na N50k', english:'How I Built Store with N50k'}, score:97, views:'15.2k', gifts:'N540k', level:88, tag:'Business 97/100', color:'from-emerald-600 to-teal-600', saves:2100, friends:8, days:5, is2G:true},
    {id:4, user:'@VillageChill', titles:{ pidgin:'2G Live from Village - 15kb/s dey work', hausa:'2G Live daga Kauye - 15kb/s na aiki', yoruba:'2G Live lati Abule - 15kb/s n sise', igbo:'2G Live si Obodo - 15kb/s na-aru oru', swahili:'2G Live kutoka Kijijini - 15kb/s inafanya kazi', english:'2G Live from Village - 15kb/s'}, score:90, views:'8.4k', gifts:'N120k', level:71, tag:'2G READY', color:'from-zinc-700 to-zinc-900', saves:900, friends:4, days:3, is2G:true},
  ]
  const feed = feedBase.map(v=>({ ...v, title: v.titles[lang] || v.titles.english }))

  const ranked = feed.map(v=>{
    const chillScore = v.score*0.4 + (v.saves/100)*0.3 + v.friends*0.2 + (v.is2G?10:0)
    const earnForever = parseInt(v.gifts.replace(/[^0-9]/g,'')) / (v.days*0.1 + 1)
    return {...v, chillScore, earnForever}
  }).sort((a,b)=> (b.chillScore+b.earnForever) - (a.chillScore+a.earnForever))

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,900&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@700&display=swap');
      .fraunces{font-family:'Fraunces',serif} .space{font-family:'Space Grotesk',sans-serif} .mono{font-family:'JetBrains Mono',monospace}`}</style>

      <div className="max-w-[430px] mx-auto bg-[#FFFBEB] min-h-screen border-x border-orange-100/50 relative">
        <div className="sticky top-0 z-20 bg-[#FFFBEB]/90 backdrop-blur-xl px-3 py-3 flex justify-between border-b border-orange-100 items-center">
          <div className="flex gap-2 items-center"><div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center">C</div><div className="px-2 py-1 rounded-full bg-black text-white text-[10px] mono">N{balance.toLocaleString()}</div></div>
          <div className="flex gap-1 overflow-x-auto">
            {Object.entries(LANGS).map(([k,v])=>(
              <button key={k} onClick={()=>setLang(k)} className={px-2 py-1 rounded-full text-[9px] font-bold border ${lang===k?'bg-black text-white border-black':'bg-white border-orange-200'}}>{v.label}</button>
            ))}
          </div>
          <div className="w-7 h-7 rounded-full bg-black text-white grid place-items-center text-[10px] font-bold border-2 border-orange-500">YO</div>
        </div>

        <div className="px-4 py-2 flex gap-2 overflow-x-auto">
          {['foryou','live','rooms','leaderboard','wallet'].map(k=>(
            <button key={k} onClick={()=>setTab(k)} className={px-4 py-2 rounded-full text-sm font-bold capitalize ${tab===k?'bg-black text-white':'bg-black/5'}}>{k==='foryou'?t('forYou'):t(k) || k}</button>
          ))}
        </div>

        {showWelcome && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl grid place-items-center p-4">
            <div className="bg-[#FFFBEB] rounded-[32px] p-6 w-full max-w-[380px] border-2 border-black shadow-[8px_8px_0px_#000] text-center relative overflow-hidden">
              <div className="w-20 h-20 mx-auto rounded-full bg-black grid place-items-center text-2xl border-2 border-[#FF5722] text-white">One</div>
              <h1 className="fraunces text-[28px] font-black leading-none mt-4">{t('welcomeTitle')}</h1>
              <p className="space text-[12px] font-bold mt-1 text-[#FF5722]">{t('welcomeSub')}</p>
              <p className="space text-[10px] font-bold mt-1">{t('electrified')}</p>
              <p className="text-[11px] text-black/60 mt-1">{t('africaDiaspora')}</p>
              
              <div className="flex gap-1 justify-center mt-3 flex-wrap">
                {Object.entries(LANGS).map(([k,v])=>(
                  <button key={k} onClick={()=>setLang(k)} className={px-2 py-1 rounded-full text-[8px] font-black border ${lang===k?'bg-black text-white':'bg-white'}}>{v.label}</button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 text-left">
                <div className="bg-white rounded-xl p-2 border text-center"><p className="text-[9px] mono font-black">0.3s</p><p className="text-[8px]">LiveKit</p></div>
                <div className="bg-white rounded-xl p-2 border text-center"><p className="text-[9px] mono font-black">70%</p><p className="text-[8px]">{t('oneFamily')}</p></div>
                <div className="bg-white rounded-xl p-2 border text-center"><p className="text-[9px] mono font-black">2G</p><p className="text-[8px]">15kb/s</p></div>
              </div>

              <div className="mt-4 bg-black text-white rounded-2xl p-3 text-left">
                <p className="mono text-[10px] text-[#FFD600] font-bold">ONE FAMILY - IYALI DAYA - IDILE KAN - OTU EZINULO - FAMILIA MOJA</p>
                <p className="text-[11px] mt-1">We all understand each other - {t('oneFamily')}</p>
              </div>

              <button onClick={()=>setShowWelcome(false)} className="w-full mt-4 py-4 rounded-full bg-black text-white font-black text-[14px]">{t('enterApp')}</button>
              <p className="text-[9px] mono opacity-40 mt-2">Talk Cool, Stay Chill + Earn - {t('oneFamily')} - WAF Active</p>
            </div>
          </div>
        )}

        {tab==='foryou' && (
          <>
            <div className="px-5 py-3">
              <h1 className="fraunces text-[34px] leading-[0.9] font-black">{t('welcomeSub').split('+')[0]} <span className="text-[#FF5722]">+ Earn</span></h1>
              <p className="space text-black/60 text-xs mt-1">{t('oneFamily')} - TikTok stops at 46, we go to 100! - 0.3s LiveKit - 2G 15kb/s</p>
              <div className="mt-3 bg-white rounded-[20px] p-4 border border-orange-100">
                <div className="flex justify-between text-[9px] mono font-bold"><span>TIKTOK 46</span><span>CHILL 100</span></div>
                <div className="h-3 bg-black/5 rounded-full mt-2 overflow-hidden"><div className="h-full w-full bg-gradient-to-r from-[#FF5722] to-orange-400 rounded-full"/></div>
                <p className="text-[10px] mono text-black/40 mt-2">{t('oneFamily')} - Algorithm v103 - Earn Forever - {lang.toUpperCase()}</p>
              </div>
            </div>

            <div className="px-3 space-y-4">
              {ranked.map(v=>(
                <div key={v.id} className="rounded-[28px] overflow-hidden bg-black text-white border border-white/10">
                  <div className={h-[280px] bg-gradient-to-br ${v.color} p-5 flex flex-col justify-between relative}>
                    <div className="flex justify-between"><span className="px-2 py-1 rounded-full bg-red-500 text-[10px] font-black">LIVE - {v.views}</span><span className="px-3 py-1 rounded-full bg-[#FFD600] text-black text-[10px] font-black">Lvl {v.level}</span></div>
                    <div><h3 className="fraunces text-[20px] font-black leading-none">{v.title}</h3><p className="text-white/70 text-xs mt-1">{v.user} - ChillScore {v.chillScore.toFixed(0)}</p></div>
                    <div className="absolute right-3 bottom-20 flex flex-col gap-2">
                      <button onClick={()=>{const s=new Set(liked); s.has(v.id)?s.delete(v.id):s.add(v.id); setLiked(s)}} className={w-11 h-11 rounded-full bg-white/10 grid place-items-center ${liked.has(v.id)?'bg-red-500':''}}>L</button>
                      <button onClick={()=>setGift(v)} className="w-11 h-11 rounded-full bg-white/10 grid place-items-center">G</button>
                    </div>
                  </div>
                  <div className="p-3 bg-[#111] flex gap-2 text-[10px]"><div className="flex-1 bg-white/5 rounded-xl p-2"><p className="mono opacity-50">VIEWERS</p><p className="font-black">{v.views}</p></div><div className="flex-1 bg-[#FF5722] rounded-xl p-2"><p className="mono">CUT</p><p className="font-black">70% to 85%</p></div></div>
                </div>
              ))}
            </div>

            <div className="p-4">
              <h2 className="fraunces text-[22px] font-black">{t('gifts')} - Bal N{balance.toLocaleString()}</h2>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {gifts.map(g=>(
                  <button key={g.name} onClick={()=>setGift(g)} className={text-left rounded-[22px] p-4 border ${g.dark?'bg-black text-white':'bg-white'} ${g.full?'col-span-2':''}}>
                    <div className="text-2xl">{g.emoji}</div><p className="font-black text-sm">{g.name}</p><p className="mono text-[10px]">N{g.price.toLocaleString()}</p><span className={mt-1 inline-block px-2 py-1 rounded-full text-[10px] mono font-bold ${g.dark?'bg-[#FFD600] text-black':'bg-[#FF5722] text-white'}}>{g.cut}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {gift && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur grid place-items-center p-4">
            <div className="bg-white rounded-[24px] p-5 w-full max-w-[340px]">
              <div className="flex justify-between"><h3 className="fraunces text-lg font-black">{t('sendGift')}</h3><button onClick={()=>setGift(null)}>X</button></div>
              <div className="mt-4 bg-[#FFFBEB] rounded-2xl p-4 text-center border"><div className="text-4xl">{gift.emoji||'G'}</div><p className="font-black mt-1">{gift.name||gift.title}</p><p className="mono text-sm">N{(gift.price||1000).toLocaleString()}</p></div>
              <button onClick={()=>{setBalance(b=>b+Math.floor((gift.price||1000)*0.7)); setGift(null);}} className="w-full mt-4 py-4 rounded-full bg-black text-white font-black">Pay - N{(gift.price||1000).toLocaleString()}</button>
              <p className="text-[10px] mono text-center opacity-40 mt-2">{t('oneFamily')} - Secured</p>
            </div>
          </div>
        )}

        <div className="sticky bottom-0 bg-[#FFFBEB]/90 backdrop-blur-xl border-t border-orange-100 px-2 py-2 flex justify-around">
          {[{k:'foryou',i:'C'},{k:'live',i:'L'},{k:'rooms',i:'R'},{k:'wallet',i:'W'}].map(ti=>(
            <button key={ti.k} onClick={()=>setTab(ti.k)} className={flex flex-col items-center px-3 py-1 rounded-full ${tab===ti.k?'bg-black text-white':'text-black/50'}}><span>{ti.i}</span><span className="text-[8px] mono font-bold">{LANGS[lang].label}</span></button>
          ))}
        </div>
      </div>
    </div>
  )
}
