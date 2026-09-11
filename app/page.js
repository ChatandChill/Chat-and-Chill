'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://kngpwddyquxrcfydlxkc.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZ3B3ZGR5cXV4cmNmeWRseGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzNTU2Nn0.3_aLDmvrZSa6Y-TxZfXy577sCoUoCgSFk_67Z59J7AM'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const GIFTS = [{id:'heart',icon:'💛'},{id:'rose',icon:'🌹'},{id:'crown',icon:'👑'},{id:'diamond',icon:'💎'},{id:'fire',icon:'🔥'},{id:'gift',icon:'🎁'}]

const ROOMS = [
  {id:'lagos-lounge', name:'Lagos Lounge', level:10, online:847, max:1000, topic:'Jollof Talk', icon:'🌍', premium:false},
  {id:'london-linkup', name:'London Linkup', level:20, online:523, max:1000, topic:'UK Diaspora', icon:'🇬🇧', premium:true},
  {id:'houston-hustle', name:'Houston Hustle', level:15, online:198, max:500, topic:'Business', icon:'🇺🇸', premium:false},
  {id:'love-shawarma', name:'Love & Shawarma', level:12, online:412, max:1000, topic:'Dating • Love', icon:'🔥', premium:false},
  {id:'yoruba-voice', name:'Yoruba → English REAL VOICE', level:18, online:234, max:500, topic:'Translator Room', icon:'🎙️', premium:false},
  {id:'igbo-connect', name:'Igbo Connect', level:8, online:156, max:500, topic:'Igbo Diaspora', icon:'🦁', premium:false},
  {id:'business-hub', name:'Diaspora Business Hub', level:25, online:312, max:1000, topic:'Deals • Shopify', icon:'💼', premium:true},
  {id:'ghana-jollof', name:'Ghana Jollof Room', level:9, online:298, max:500, topic:'Jollof War', icon:'🇬🇭', premium:false},
  {id:'nostalgia-2010', name:'2GO Nostalgia 2010', level:30, online:1203, max:2000, topic:'OG 2GO', icon:'📱', premium:false},
  {id:'vip-luxury', name:'Premium VIP Lounge', level:30, online:89, max:100, topic:'VIP Only', icon:'👑', premium:true},
]

const MOCK_PROFILES = {
  'Smallworld': {pic:'https://i.pravatar.cc/150?img=11', bio:'AYO Founder • Lagos • Building Diaspora Love', level:30, gifts:1240, followers:4200},
  'Aisha': {pic:'https://i.pravatar.cc/150?img=5', bio:'Lagos • Jollof Queen • Level 22', level:22, gifts:890, followers:1200},
  'Tunde UK': {pic:'https://i.pravatar.cc/150?img=8', bio:'London • Business • Diaspora Connect', level:18, gifts:450, followers:800},
  'Chioma': {pic:'https://i.pravatar.cc/150?img=9', bio:'Houston • Igbo Babe • Love & Business', level:15, gifts:320, followers:650},
  'Emeka': {pic:'https://i.pravatar.cc/150?img=15', bio:'2GO OG 2010 • Level 30', level:28, gifts:2100, followers:3200},
}

function getProfile(name){
  return MOCK_PROFILES[name] || {pic:`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`, bio:`${name} • AYO Member • Level ${Math.floor(Math.random()*20+5)}`, level:Math.floor(Math.random()*20+5), gifts:Math.floor(Math.random()*500), followers:Math.floor(Math.random()*1000)}
}

export default function AYO() {
  const [splash, setSplash] = useState(true)
  const [room, setRoom] = useState(ROOMS[0])
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [email, setEmail] = useState('')
  const [dataSaver, setDataSaver] = useState(true)
  const [translatorOn, setTranslatorOn] = useState(true)
  const [tab, setTab] = useState<'rooms'|'reels'|'market'>('rooms')
  const [selectedUser, setSelectedUser] = useState(null)
  const [myPic, setMyPic] = useState('https://i.pravatar.cc/150?img=11')
  const userName = 'Smallworld'

  useEffect(() => { const t = setTimeout(()=>setSplash(false), 2500); return ()=>clearTimeout(t) }, [])

  useEffect(() => {
    supabase.from('ayo_messages').select('*').eq('room', room.id).order('created_at',{ascending:true}).limit(dataSaver?20:50).then(({data})=>{if(data) setMessages(data)})
    const interval = setInterval(async()=>{ const {data} = await supabase.from('ayo_messages').select('*').eq('room',room.id).order('created_at',{ascending:true}).limit(20); if(data) setMessages(data) }, 3000)
    return ()=>clearInterval(interval)
  }, [room.id, dataSaver])

  const sendMessage = async () => { if(!input.trim()) return; await supabase.from('ayo_messages').insert({room:room.id, user_name:userName, content:input}); setInput('') }
  const sendGift = async (id:string) => { await supabase.from('ayo_gifts').insert({from_user:userName,to_user:selectedUser?.name||'Aisha',gift_type:id,room:room.id}); alert('Gift '+id+' sent! 💛') }
  const sendTip = async (a:number) => { await supabase.from('ayo_tips').insert({from_user:userName,to_user:selectedUser?.name||'Aisha',amount:a,room:room.id}); alert('Tipped $'+a) }
  const sendHandshake = async (i:string) => { await supabase.from('ayo_handshakes').insert({from_user:userName,to_user:selectedUser?.name||'Aisha',intent:i,message:'Connect for '+i}); alert('Handshake '+i) }
  const joinWaitlist = async () => { if(!email) return; const {error} = await supabase.from('waitlist').insert({email}); if(!error){ setEmail(''); alert('Welcome to AYO!') } else alert('Already joined') }
  const handlePicChange = (e) => { const file = e.target.files?.[0]; if(file){ setMyPic(URL.createObjectURL(file)) } }

  if(splash){
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[80px] animate-pulse" />
        <img src={myPic} className="w-20 h-20 rounded-full border-2 border-[#d4af37] mb-4 object-cover" />
        <h1 className="text-8xl md:text-[10rem] font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-white to-[#d4af37] animate-pulse">AYO</h1>
        <p className="text-[#d4af37] tracking-[0.4em] text-xs mt-2">PROFILE PICS • 2GO ROOMS • REAL VOICE</p>
        <div className="mt-6 flex -space-x-3"><img src="https://i.pravatar.cc/100?img=5" className="w-10 h-10 rounded-full border-2 border-black"/><img src="https://i.pravatar.cc/100?img=8" className="w-10 h-10 rounded-full border-2 border-black"/><img src="https://i.pravatar.cc/100?img=9" className="w-10 h-10 rounded-full border-2 border-black"/><div className="w-10 h-10 rounded-full bg-[#d4af37] border-2 border-black flex items-center justify-center text-black text-xs font-bold">+847</div></div>
        <p className="text-white/60 text-sm mt-4 tracking-widest">Loading Diaspora...</p>
        <button onClick={()=>setSplash(false)} className="mt-8 text-white/30 text-xs underline">Enter AYO →</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={myPic} className="w-8 h-8 rounded-full border border-[#d4af37] object-cover"/>
          <h1 className="font-serif text-2xl font-black text-[#d4af37]">AYO</h1>
          <button onClick={()=>setDataSaver(!dataSaver)} className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${dataSaver?'bg-green-500/10 border-green-500/20 text-green-300':'bg-white/10 border-white/10'}`}><div className={`w-2 h-2 rounded-full ${dataSaver?'bg-green-400 animate-pulse':'bg-white/50'}`} /> {dataSaver?'2G MODE':'4G'}</button>
        </div>
        <div className="flex items-center gap-2"><div className="bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full flex gap-2 items-center text-xs"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/>LIVE 4.2K</div><div className="bg-[#d4af37]/20 px-3 py-1 rounded-full text-[#d4af37] text-xs font-bold">🪙 12.4K</div></div>
      </div>

      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[320px_1fr_340px] gap-4 p-4">
        <div className="bg-white/[0.04] backdrop-blur-xl rounded-[24px] border border-white/10 p-4 h-fit">
          <div className="flex justify-between items-center"><h3 className="font-black text-sm">🌍 ROOMS • Profile Pics Live</h3><span className="text-[#d4af37] text-xs">{room.online} online</span></div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {Object.keys(MOCK_PROFILES).slice(0,5).map(name=>(
              <button key={name} onClick={()=>setSelectedUser({name,...getProfile(name)})} className="flex flex-col items-center min-w-[56px]"><img src={getProfile(name).pic} className="w-12 h-12 rounded-full border-2 border-[#d4af37]/30 object-cover"/><span className="text-[10px] mt-1 truncate w-14 text-center">{name}</span><span className="text-[9px] bg-green-500 w-2 h-2 rounded-full -mt-3 ml-8 border border-black"></span></button>
            ))}
          </div>
          <input placeholder="Search rooms..." className="w-full mt-3 bg-black/40 rounded-full px-4 py-2 text-sm border border-white/10 outline-none" />
          <div className="space-y-2 mt-4 max-h-[380px] overflow-y-auto pr-1">
            {ROOMS.map(r=>(
              <button key={r.id} onClick={()=>setRoom(r)} className={`w-full text-left rounded-2xl p-3 border transition flex justify-between items-center ${room.id===r.id?'bg-[#d4af37]/15 border-[#d4af37]/30':'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                <div className="flex gap-3 items-center"><div className="relative"><div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">{r.icon}</div><div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black border border-white/10 flex -space-x-1 overflow-hidden"><img src="https://i.pravatar.cc/100?img=5" className="w-5 h-5 rounded-full"/><img src="https://i.pravatar.cc/100?img=8" className="w-5 h-5 rounded-full"/></div></div><div><p className="font-bold text-sm flex gap-2">{r.name} {r.premium && <span className="text-[10px] bg-[#d4af37] text-black px-2 py-0.5 rounded-full">VIP</span>}</p><p className="text-white/40 text-xs">{r.online} • {r.topic} • Lv{r.level}</p></div></div><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col h-[720px] bg-white/[0.04] backdrop-blur-xl rounded-[32px] border border-white/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-3 items-center"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b6914] flex items-center justify-center text-xl">{room.icon}</div><div><h3 className="font-black flex gap-2 items-center">{room.name} • Lv{room.level} {room.premium && <span className="bg-[#d4af37] text-black text-[10px] px-2 py-0.5 rounded-full">VIP</span>}</h3><p className="text-white/40 text-xs">{room.online}/{room.max} online • {room.topic}</p><div className="flex -space-x-2 mt-1"><img src="https://i.pravatar.cc/100?img=5" className="w-6 h-6 rounded-full border border-black"/><img src="https://i.pravatar.cc/100?img=8" className="w-6 h-6 rounded-full border border-black"/><img src="https://i.pravatar.cc/100?img=9" className="w-6 h-6 rounded-full border border-black"/><div className="w-6 h-6 rounded-full bg-white/10 border border-black flex items-center justify-center text-[10px]">+{room.online}</div></div></div></div>
            <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] px-3 py-1 rounded-full animate-pulse">● Live</span>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 rounded-2xl p-2 mb-3 flex items-center justify-between text-xs"><span className="flex items-center gap-2"><span className="bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">LIVE</span> @Aisha • Jollof Battle • 4.2K viewers</span><span className="bg-black/40 px-2 py-0.5 rounded-full">🎁 Gift Battle: 234 vs 189</span></div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.length===0 && <p className="text-white/30 text-center mt-20">No messages yet in {room.name}. Be first!</p>}
            {messages.map((m)=>{
              const prof = getProfile(m.user_name)
              return (
                <div key={m.id} className="flex gap-3 bg-white/5 rounded-2xl p-3 border border-white/5 hover:bg-white/10 transition">
                  <button onClick={()=>setSelectedUser({name:m.user_name, ...prof})}><img src={m.user_name===userName?myPic:prof.pic} className="w-10 h-10 rounded-full object-cover border border-white/10 hover:border-[#d4af37] transition"/></button>
                  <div className="flex-1"><div className="flex gap-2 items-center"><button onClick={()=>setSelectedUser({name:m.user_name, ...prof})} className="text-[#d4af37] text-xs font-black hover:underline">{m.user_name}</button><span className="text-white/20 text-[10px]">Lv{prof.level}</span><span className="text-white/30 text-[10px]">{new Date(m.created_at).toLocaleTimeString()}</span>{translatorOn && <span className="text-[9px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">Real Voice ✓</span>}</div><p className="text-white/90 text-sm mt-1">{m.content}</p></div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-2 mt-3"><img src={myPic} className="w-10 h-10 rounded-full border border-[#d4af37]/50"/><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && sendMessage()} placeholder="Share joy..." className="flex-1 bg-black/40 rounded-full px-5 py-3 text-white outline-none border border-white/10 text-sm" /><button onClick={sendMessage} className="bg-[#d4af37] text-black rounded-full px-6 py-3 font-black hover:scale-105 transition text-sm">Send</button></div>
        </div>

        <div className="space-y-3">
          <div className="bg-white/[0.04] rounded-[24px] p-4 border border-[#d4af37]/20">
            <h4 className="font-black text-sm flex items-center gap-2"><img src={myPic} className="w-8 h-8 rounded-full border border-[#d4af37]"/>My Profile</h4>
            <p className="text-white/50 text-xs mt-1">Click to change pic</p>
            <label className="mt-3 block bg-black/40 rounded-2xl p-3 border border-dashed border-white/20 text-center cursor-pointer hover:bg-white/5"><input type="file" accept="image/*" onChange={handlePicChange} className="hidden"/><p className="text-xs">📸 Change Profile Pic</p><p className="text-[10px] text-white/40 mt-1">Upload or tap — works on 2G</p></label>
            <div className="mt-3 flex gap-2 text-xs"><span className="bg-[#d4af37]/20 text-[#d4af37] px-3 py-1 rounded-full">Lv30</span><span className="bg-white/10 px-3 py-1 rounded-full">1.2k Gifts</span><span className="bg-white/10 px-3 py-1 rounded-full">4.2k Followers</span></div>
          </div>

          <div className="bg-white/[0.04] rounded-[24px] p-4 border border-[#d4af37]/20"><h4 className="text-[#d4af37] font-black text-xs mb-2">🎙️ REAL VOICE TRANSLATOR</h4><div className="bg-black/60 rounded-2xl p-3"><div className="flex justify-between text-[11px]"><span className="text-white/60">Your voice</span><span className="text-[#d4af37] font-bold">→ English (same voice)</span></div><button className="w-full mt-3 bg-[#d4af37] text-black rounded-full py-2.5 font-black text-xs">🎤 Hold to Speak • Real Voice</button></div></div>
          <div className="bg-white/[0.04] rounded-[24px] p-4 border border-[#d4af37]/20"><h4 className="text-[#d4af37] font-black text-xs mb-2">GIFT • Show Love</h4><div className="grid grid-cols-3 gap-2">{GIFTS.map(g=><button key={g.id} onClick={()=>sendGift(g.id)} className="bg-black/40 hover:bg-[#d4af37]/20 rounded-2xl p-3 text-xl transition">{g.icon}</button>)}</div></div>
          <div className="bg-white/[0.04] rounded-[24px] p-4 border border-[#d4af37]/20"><h4 className="text-[#d4af37] font-black text-xs mb-2">$$ • Send Benefits</h4><div className="grid grid-cols-4 gap-2">{[5,10,25,50].map(a=><button key={a} onClick={()=>sendTip(a)} className="bg-[#d4af37] text-black rounded-full py-2 font-black text-sm">${a}</button>)}</div></div>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4" onClick={()=>setSelectedUser(null)}>
          <div className="bg-[#1a1a1a] rounded-[32px] border border-[#d4af37]/30 p-6 max-w-sm w-full" onClick={e=>e.stopPropagation()}>
            <div className="flex justify-between"><p className="font-black text-sm">Profile View</p><button onClick={()=>setSelectedUser(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">✕</button></div>
            <div className="flex flex-col items-center mt-4"><img src={selectedUser.pic} className="w-24 h-24 rounded-full border-2 border-[#d4af37] object-cover"/><h3 className="font-black text-xl mt-3">{selectedUser.name}</h3><p className="text-[#d4af37] text-xs mt-1">Level {selectedUser.level} • {selectedUser.followers} followers</p><p className="text-white/60 text-sm mt-2 text-center">{selectedUser.bio}</p></div>
            <div className="grid grid-cols-3 gap-2 mt-6 text-center"><div className="bg-white/5 rounded-2xl p-3"><p className="font-black text-[#d4af37]">{selectedUser.gifts}</p><p className="text-[10px] text-white/40">Gifts</p></div><div className="bg-white/5 rounded-2xl p-3"><p className="font-black">{selectedUser.level}</p><p className="text-[10px] text-white/40">Level</p></div><div className="bg-white/5 rounded-2xl p-3"><p className="font-black">{selectedUser.followers}</p><p className="text-[10px] text-white/40">Fans</p></div></div>
            <div className="grid grid-cols-2 gap-2 mt-4"><button onClick={()=>{sendGift('heart'); setSelectedUser(null)}} className="bg-[#d4af37] text-black rounded-full py-3 font-black text-sm">💛 Gift</button><button onClick={()=>{sendTip(10); setSelectedUser(null)}} className="bg-white/10 rounded-full py-3 font-black text-sm">$$ Tip $10</button></div>
            <button onClick={()=>{sendHandshake('Friendship'); setSelectedUser(null)}} className="w-full mt-2 bg-white/5 rounded-full py-3 font-bold text-sm border border-white/10">🤝 Handshake</button>
            <p className="text-center text-[10px] text-white/30 mt-4">Tap pic to view full • 2GO Style Profile</p>
          </div>
        </div>
      )}
    </div>
  )
}
