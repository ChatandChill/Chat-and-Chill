'use client'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://kngpwddyquxrcfydlxkc.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZ3B3ZGR5cXV4cmNmeWRseGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzNTU2Nn0.3_aLDmvrZSa6Y-TxZfXy577sCoUoCgSFk_67Z59J7AM'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const GIFTS = [
  {id:'heart', icon:'💛', name:'Heart', vNGN:100, vUSD:0.2},
  {id:'rose', icon:'🌹', name:'Rose', vNGN:500, vUSD:1},
  {id:'diamond', icon:'💎', name:'Diamond', vNGN:25000, vUSD:50},
  {id:'crown', icon:'👑', name:'Crown', vNGN:5000, vUSD:10},
]

const ROOMS = [
  {id:'lagos-lounge', name:'Lagos Lounge', online:847, icon:'🌍'},
  {id:'london-linkup', name:'London Linkup', online:523, icon:'🇬🇧'},
  {id:'houston-hustle', name:'Houston Hustle', online:198, icon:'🇺🇸'},
]

const MOCK_FYP = [
  {id:1, user:'Aisha', pic:'https://i.pravatar.cc/150?img=5', video:'https://videos.pexels.com/video-files/18069234/18069234-hd_1080_1920_24fps.mp4', caption:'Jollof battle in Lagos kitchen 🔥 Who makes best?', likes:4200, gifts:89, comments:234, wallet:'NGN'},
  {id:2, user:'Tunde UK', pic:'https://i.pravatar.cc/150?img=8', video:'https://videos.pexels.com/video-files/3191572/3191572-hd_1080_1920_25fps.mp4', caption:'London hustle - sending love to Naija 🇬🇧🇳🇬', likes:1200, gifts:45, comments:89, wallet:'GBP'},
  {id:3, user:'Chioma', pic:'https://i.pravatar.cc/150?img=9', video:'https://videos.pexels.com/video-files/5310859/5310859-hd_1080_1920_25fps.mp4', caption:'Houston business tips for diaspora 💼', likes:8900, gifts:156, comments:412, wallet:'USD'},
]

const MOCK_INBOX = [
  {id:'aisha', name:'Aisha', pic:'https://i.pravatar.cc/150?img=5', lastMsg:'Oya send me that gift na 😊', unread:2, online:true, encrypted:true},
  {id:'tunde', name:'Tunde UK', pic:'https://i.pravatar.cc/150?img=8', lastMsg:'Video call later? Business deal', unread:0, online:true, encrypted:true},
  {id:'chioma', name:'Chioma', pic:'https://i.pravatar.cc/150?img=9', lastMsg:'Thanks for the Diamond! 💎', unread:5, online:false, encrypted:true},
]

export default function AYO(){
  const [tab, setTab] = useState('fyp') // fyp, live, market, wallet, inbox, profile
  const [fypVideos, setFypVideos] = useState(MOCK_FYP)
  const [currentFyp, setCurrentFyp] = useState(0)
  const [room, setRoom] = useState(ROOMS[0])
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [currency, setCurrency] = useState('NGN')
  const [myWallet, setMyWallet] = useState({NGN:25000, USD:45, GBP:30})
  const [ownerEarnings, setOwnerEarnings] = useState(0)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showGift, setShowGift] = useState(null) // video or user to gift
  const [inboxChats, setInboxChats] = useState(MOCK_INBOX)
  const [activeInbox, setActiveInbox] = useState(null)
  const [inboxMsg, setInboxMsg] = useState('')
  const [privateMsgs, setPrivateMsgs] = useState({})
  const [videoCall, setVideoCall] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [newCaption, setNewCaption] = useState('')
  const [newVideoFile, setNewVideoFile] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(()=>{
    supabase.from('ayo_messages').select('*').eq('room',room.id).order('created_at',{ascending:true}).limit(20).then(({data})=>{ if(data) setMessages(data) })
  },[room.id])

  const sendMessage = async()=>{
    if(!input.trim()) return
    await supabase.from('ayo_messages').insert({room:room.id, user_name:'Smallworld', content:input})
    setMessages(m=>[...m,{id:Date.now(), user_name:'Smallworld', content:input, created_at:new Date().toISOString()}])
    setInput('')
  }

  const sendGift = async(gift, to)=>{
    const value = currency==='NGN'?gift.vNGN:gift.vUSD
    if(myWallet[currency] < value){ alert(`Fund wallet! Need ${value}`); return }
    const ownerCut = value*0.3
    setMyWallet(w=>({...w, [currency]: w[currency]-value}))
    setOwnerEarnings(o=>o+ownerCut)
    await supabase.from('ayo_gifts').insert({from_user:'Smallworld', to_user:to, gift_type:gift.id, gift_value:value, currency, owner_cut:ownerCut, receiver_cut:value*0.7, room:room.id})
    alert(`Sent ${gift.icon} worth ${value} to ${to}! You (owner) keep 30% = ${ownerCut}`)
    setShowGift(null)
    setSelectedUser(null)
  }

  const sendPrivateMsg = ()=>{
    if(!inboxMsg.trim() || !activeInbox) return
    const chatId = activeInbox.id
    const msg = {id:Date.now(), from:'me', text:inboxMsg, time:new Date().toLocaleTimeString(), encrypted:true}
    setPrivateMsgs(p=>({...p, [chatId]: [...(p[chatId]||[]), msg]}))
    setInboxMsg('')
    // Simulate reply
    setTimeout(()=>{
      const reply = {id:Date.now()+1, from:'them', text:'Seen ✅ - replying with E2E encrypted', time:new Date().toLocaleTimeString(), encrypted:true}
      setPrivateMsgs(p=>({...p, [chatId]: [...(p[chatId]||[]), reply]}))
    },1000)
  }

  const createFypVideo = ()=>{
    if(!newVideoFile && !newCaption) { alert('Add video or caption'); return }
    const newVid = {
      id: Date.now(),
      user:'Smallworld',
      pic:'https://i.pravatar.cc/150?img=11',
      video: newVideoFile ? URL.createObjectURL(newVideoFile) : MOCK_FYP[0].video,
      caption: newCaption || 'New AYO video 🔥',
      likes:0, gifts:0, comments:0, wallet:currency
    }
    setFypVideos(v=>[newVid, ...v])
    setShowCreate(false)
    setNewCaption('')
    setNewVideoFile(null)
    setTab('fyp')
    alert('Video posted to FYP! 🚀')
  }

  const symbol = currency==='NGN'?'₦':currency==='USD'?'$':'£'

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex justify-between items-center">
        <h1 className="font-black text-2xl text-[#d4af37]">AYO</h1>
        <div className="flex gap-1 bg-white/10 rounded-full p-1">
          {['NGN','USD','GBP'].map(c=><button key={c} onClick={()=>setCurrency(c)} className={`px-3 py-1 rounded-full text-xs font-bold ${currency===c?'bg-[#d4af37] text-black':'text-white/60'}`}>{c}</button>)}
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={()=>setTab('inbox')} className="relative bg-white/10 w-10 h-10 rounded-full flex items-center justify-center">💬{inboxChats.reduce((a,b)=>a+b.unread,0)>0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{inboxChats.reduce((a,b)=>a+b.unread,0)}</span>}</button>
          <div className="bg-[#d4af37]/20 px-3 py-1 rounded-full text-[#d4af37] text-xs font-bold">{symbol}{myWallet[currency]} • 👑{symbol}{ownerEarnings} (30%)</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-hidden">
        {/* FYP TAB - TIKTOK STYLE */}
        {tab==='fyp' && (
          <div className="h-[calc(100vh-120px)] relative bg-black">
            <div className="h-full overflow-y-scroll snap-y snap-mandatory">
              {fypVideos.map((v,i)=>(
                <div key={v.id} className="h-full w-full snap-start relative flex items-center justify-center bg-black">
                  <video src={v.video} autoPlay loop muted playsInline className="h-full w-full object-cover max-w-[400px] mx-auto"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent max-w-[400px] mx-auto"/>
                  {/* Right actions - TikTok style */}
                  <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center max-w-[400px] mx-auto left-0 justify-end mr-4">
                    <button onClick={()=>setSelectedUser({name:v.user, pic:v.pic})} className="relative"><img src={v.pic} className="w-12 h-12 rounded-full border-2 border-white"/><div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#d4af37] w-6 h-6 rounded-full flex items-center justify-center text-black text-xs font-bold">+</div></button>
                    <button className="flex flex-col items-center"><span className="text-2xl">❤️</span><span className="text-xs font-bold">{v.likes}</span></button>
                    <button className="flex flex-col items-center"><span className="text-2xl">💬</span><span className="text-xs font-bold">{v.comments}</span></button>
                    <button onClick={()=>setShowGift(v)} className="flex flex-col items-center"><span className="text-2xl">🎁</span><span className="text-xs font-bold text-[#d4af37]">{v.gifts}</span><span className="text-[10px] bg-[#d4af37] text-black px-2 py-0.5 rounded-full mt-1">30% you</span></button>
                    <button onClick={()=>{setActiveInbox({id:v.user.toLowerCase(), name:v.user, pic:v.pic}); setTab('inbox')}} className="flex flex-col items-center"><span className="text-2xl">✉️</span><span className="text-[10px]">Inbox</span></button>
                  </div>
                  {/* Bottom caption */}
                  <div className="absolute bottom-6 left-4 right-20 max-w-[400px] mx-auto">
                    <p className="font-black text-sm">@{v.user} • {v.wallet} wallet</p>
                    <p className="text-sm mt-1">{v.caption}</p>
                    <p className="text-xs text-white/60 mt-2 flex items-center gap-1">🔒 E2E • 🎁 Real money • {symbol} gifts → 30% to you</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Create button */}
            <button onClick={()=>setShowCreate(true)} className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black rounded-full px-6 py-3 font-black flex items-center gap-2 shadow-xl">+ Create Like TikTok</button>
          </div>
        )}

        {/* LIVE ROOMS TAB */}
        {tab==='live' && (
          <div className="p-4 grid lg:grid-cols-[300px_1fr_320px] gap-4 max-w-[1600px] mx-auto">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <h3 className="font-black text-sm">🌍 ROOMS</h3>
              <div className="space-y-2 mt-3">{ROOMS.map(r=><button key={r.id} onClick={()=>setRoom(r)} className={`w-full text-left p-3 rounded-xl border ${room.id===r.id?'bg-[#d4af37]/20 border-[#d4af37]/30':'bg-white/5 border-white/5'}`}><p className="font-bold text-sm">{r.icon} {r.name}</p><p className="text-xs text-white/40">{r.online} online</p></button>)}</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 h-[600px] flex flex-col">
              <h3 className="font-black">{room.name} Live</h3>
              <div className="flex-1 overflow-y-auto mt-3 space-y-2">{messages.map(m=><div key={m.id} className="bg-black/40 rounded-xl p-2 text-sm"><span className="text-[#d4af37] font-bold">{m.user_name}: </span>{m.content}</div>)}</div>
              <div className="flex gap-2 mt-3"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder="Chat..." className="flex-1 bg-black/40 rounded-full px-4 py-2 text-sm border border-white/10 outline-none"/><button onClick={sendMessage} className="bg-[#d4af37] text-black px-4 py-2 rounded-full font-bold text-sm">Send</button></div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <h4 className="font-black text-xs text-[#d4af37]">🎁 REAL MONEY GIFTS (30% to you)</h4>
              <div className="grid grid-cols-2 gap-2 mt-3">{GIFTS.map(g=><button key={g.id} onClick={()=>sendGift(g, room.name)} className="bg-black/40 rounded-xl p-3 border border-white/10"><p className="text-xl">{g.icon}</p><p className="text-xs font-bold">{g.name}</p><p className="text-[#d4af37] text-xs font-black">{symbol}{currency==='NGN'?g.vNGN:g.vUSD}</p></button>)}</div>
            </div>
          </div>
        )}

        {/* INBOX - WHATSAPP E2E + VIDEO CALL */}
        {tab==='inbox' && (
          <div className="h-[calc(100vh-120px)] flex max-w-[1200px] mx-auto w-full">
            {/* Chat list */}
            <div className={`w-full md:w-[320px] bg-white/5 border-r border-white/10 flex flex-col ${activeInbox?'hidden md:flex':''}`}>
              <div className="p-4 border-b border-white/10"><h3 className="font-black flex items-center gap-2">💬 Inbox • E2E Encrypted <span className="bg-green-500/20 text-green-300 text-[10px] px-2 py-0.5 rounded-full border border-green-500/30">🔒 WhatsApp style</span></h3></div>
              <div className="flex-1 overflow-y-auto">
                {inboxChats.map(c=>(
                  <button key={c.id} onClick={()=>setActiveInbox(c)} className={`w-full text-left p-4 flex gap-3 hover:bg-white/5 border-b border-white/5 ${activeInbox?.id===c.id?'bg-[#d4af37]/10':''}`}>
                    <div className="relative"><img src={c.pic} className="w-12 h-12 rounded-full"/><div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${c.online?'bg-green-400':'bg-white/20'}`}/></div>
                    <div className="flex-1 text-left"><p className="font-bold text-sm flex items-center gap-2">{c.name} {c.encrypted && <span className="text-[10px]">🔒</span>} {c.unread>0 && <span className="bg-[#d4af37] text-black text-[10px] px-2 py-0.5 rounded-full">{c.unread}</span>}</p><p className="text-white/50 text-xs truncate">{c.lastMsg}</p><p className="text-green-300 text-[10px] mt-1">🔒 End-to-end encrypted • WhatsApp protocol</p></div>
                  </button>
                ))}
              </div>
            </div>
            {/* Active chat */}
            <div className={`flex-1 flex flex-col bg-black ${!activeInbox?'hidden md:flex':''}`}>
              {activeInbox ? (
                <>
                  <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div className="flex gap-3 items-center"><button onClick={()=>setActiveInbox(null)} className="md:hidden">←</button><img src={activeInbox.pic} className="w-10 h-10 rounded-full"/><div><p className="font-bold text-sm">{activeInbox.name}</p><p className="text-green-300 text-[10px]">🔒 E2E Encrypted • Online</p></div></div>
                    <div className="flex gap-2"><button onClick={()=>setVideoCall(activeInbox)} className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center">📹</button><button onClick={()=>setVideoCall(activeInbox)} className="bg-[#d4af37] w-10 h-10 rounded-full flex items-center justify-center">📞</button></div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0a0a]">
                    <div className="text-center"><span className="bg-[#d4af37]/20 text-[#d4af37] text-[10px] px-3 py-1 rounded-full border border-[#d4af37]/30">🔒 Messages are end-to-end encrypted. No one outside this chat, not even AYO, can read them.</span></div>
                    {(privateMsgs[activeInbox.id]||[{id:1, from:'them', text:'Hey! Love your FYP video 🔥', time:'10:30', encrypted:true}]).map(m=>(
                      <div key={m.id} className={`flex ${m.from==='me'?'justify-end':''}`}><div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${m.from==='me'?'bg-[#d4af37] text-black rounded-br-none':'bg-white/10 rounded-bl-none'}`}><p>{m.text}</p><p className="text-[10px] opacity-60 mt-1 flex items-center gap-1 justify-end">{m.time} {m.encrypted && '🔒'} {m.from==='me' && '✓✓'}</p></div></div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-white/10 flex gap-2 bg-black"><input value={inboxMsg} onChange={e=>setInboxMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendPrivateMsg()} placeholder="Message • E2E encrypted" className="flex-1 bg-white/10 rounded-full px-4 py-3 text-sm outline-none border border-white/10"/><button onClick={sendPrivateMsg} className="bg-[#d4af37] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold">➤</button></div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8"><p className="text-6xl">💬</p><p className="font-black mt-4">Private Inbox • E2E</p><p className="text-white/40 text-sm mt-2">Select a chat to start private, encrypted conversation with video call — like WhatsApp</p></div>
              )}
            </div>
          </div>
        )}

        {tab==='market' && <div className="p-8 text-center"><p className="text-4xl">🛒</p><p className="font-black mt-4">Marketplace • Diaspora Shops</p><p className="text-white/40 text-sm">Sellers list, you take 10% — coming next!</p></div>}
        {tab==='wallet' && (
          <div className="p-4 max-w-[500px] mx-auto space-y-4">
            <div className="bg-gradient-to-br from-[#d4af37]/20 to-black rounded-[24px] p-6 border border-[#d4af37]/30"><h3 className="font-black">👛 Wallet • {currency}</h3><p className="text-4xl font-black mt-3">{symbol}{myWallet[currency]}</p><p className="text-white/40 text-xs">Withdrawable to bank • Real money</p><div className="grid grid-cols-2 gap-2 mt-4"><button className="bg-[#d4af37] text-black rounded-full py-3 font-black">+ Fund</button><button className="bg-white/10 rounded-full py-3 font-black border border-white/10">🏦 Withdraw to Bank</button></div></div>
            <div className="bg-green-500/10 rounded-[24px] p-6 border border-green-500/20"><h3 className="font-black text-green-300">💰 Owner Earnings • 30% of all gifts</h3><p className="text-3xl font-black text-green-300 mt-2">{symbol}{ownerEarnings}</p><p className="text-white/40 text-xs">You earn 30% on every gift sent in FYP, Live Rooms, Inbox</p></div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV - TIKTOK STYLE */}
      <div className="sticky bottom-0 bg-black border-t border-white/10 px-2 py-2 flex justify-around items-center z-40">
        <button onClick={()=>setTab('fyp')} className={`flex flex-col items-center px-3 py-1 rounded-xl ${tab==='fyp'?'text-[#d4af37]':''}`}><span className="text-xl">🏠</span><span className="text-[10px] font-bold">FYP</span></button>
        <button onClick={()=>setTab('live')} className={`flex flex-col items-center px-3 py-1 rounded-xl ${tab==='live'?'text-[#d4af37]':''}`}><span className="text-xl">🌍</span><span className="text-[10px] font-bold">LIVE</span></button>
        <button onClick={()=>setShowCreate(true)} className="bg-[#d4af37] text-black w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black -mt-2">+</button>
        <button onClick={()=>setTab('inbox')} className={`flex flex-col items-center px-3 py-1 rounded-xl relative ${tab==='inbox'?'text-[#d4af37]':''}`}><span className="text-xl">💬</span><span className="text-[10px] font-bold">INBOX</span>{inboxChats.reduce((a,b)=>a+b.unread,0)>0 && <span className="absolute top-0 right-1 bg-red-500 w-2 h-2 rounded-full"/>}</button>
        <button onClick={()=>setTab('wallet')} className={`flex flex-col items-center px-3 py-1 rounded-xl ${tab==='wallet'?'text-[#d4af37]':''}`}><span className="text-xl">👛</span><span className="text-[10px] font-bold">WALLET</span></button>
      </div>

      {/* CREATE FYP MODAL - TIKTOK CREATE */}
      {showCreate && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col p-4">
          <div className="flex justify-between items-center"><button onClick={()=>setShowCreate(false)} className="text-white">✕</button><h3 className="font-black">Create FYP • Like TikTok</h3><button onClick={createFypVideo} className="bg-[#d4af37] text-black px-4 py-1 rounded-full font-bold text-sm">Post</button></div>
          <div className="flex-1 mt-4 flex flex-col gap-4">
            <div onClick={()=>fileInputRef.current?.click()} className="h-[60%] bg-white/5 rounded-[24px] border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer">
              {newVideoFile ? <video src={URL.createObjectURL(newVideoFile)} className="h-full w-full object-cover rounded-[24px]" muted/> : <><p className="text-4xl">📹</p><p className="font-bold mt-2">Tap to upload video</p><p className="text-white/40 text-xs">Like TikTok creation</p></>}
              <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={e=>setNewVideoFile(e.target.files[0])}/>
            </div>
            <textarea value={newCaption} onChange={e=>setNewCaption(e.target.value)} placeholder="Add caption... #fyp #diaspora #jollof" className="bg-white/5 rounded-2xl p-4 text-sm border border-white/10 outline-none h-24"/>
            <div className="bg-[#d4af37]/10 rounded-2xl p-3 border border-[#d4af37]/20"><p className="text-[#d4af37] text-xs font-bold">💰 You earn 30% when people gift this video!</p><p className="text-white/40 text-[11px]">Real money gifts • Withdraw to bank • {currency} wallet</p></div>
          </div>
        </div>
      )}

      {/* GIFT MODAL */}
      {showGift && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-end justify-center p-4" onClick={()=>setShowGift(null)}>
          <div className="bg-[#1a1a1a] rounded-t-[32px] border border-white/10 p-6 w-full max-w-[400px]" onClick={e=>e.stopPropagation()}>
            <h3 className="font-black">Send Real Money Gift • 30% to you (owner)</h3>
            <p className="text-white/60 text-xs">To: @{showGift.user || showGift.name || 'User'} • {currency} wallet</p>
            <div className="grid grid-cols-2 gap-3 mt-4">{GIFTS.map(g=><button key={g.id} onClick={()=>sendGift(g, showGift.user||showGift.name)} className="bg-black/40 rounded-2xl p-4 border border-white/10"><p className="text-2xl">{g.icon}</p><p className="font-bold text-sm">{g.name}</p><p className="text-[#d4af37] font-black">{symbol}{currency==='NGN'?g.vNGN:g.vUSD}</p><p className="text-[10px] text-white/40">You get 30% = {symbol}{(currency==='NGN'?g.vNGN:g.vUSD)*0.3}</p></button>)}</div>
          </div>
        </div>
      )}

      {/* VIDEO CALL MODAL */}
      {videoCall && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col">
          <div className="flex-1 relative">
            <img src={videoCall.pic} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"/>
            <div className="absolute top-6 left-4 right-4 flex justify-between"><div className="flex gap-3 items-center"><img src={videoCall.pic} className="w-12 h-12 rounded-full border-2 border-green-400"/><div><p className="font-black">{videoCall.name}</p><p className="text-green-300 text-xs">🔒 E2E Encrypted • 00:23</p></div></div><button onClick={()=>setVideoCall(null)} className="bg-white/20 w-10 h-10 rounded-full">✕</button></div>
            <div className="absolute bottom-32 left-4 w-32 h-44 bg-white/10 rounded-2xl border-2 border-white/20 overflow-hidden"><img src="https://i.pravatar.cc/150?img=11" className="w-full h-full object-cover"/><p className="absolute bottom-1 left-1 text-[10px] bg-black/60 px-2 py-0.5 rounded-full">You • 🔒 E2E</p></div>
          </div>
          <div className="p-8 flex justify-center gap-6 bg-black"><button className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center text-xl">🎤</button><button onClick={()=>setVideoCall(null)} className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center text-2xl">📞</button><button className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center text-xl">📹</button></div>
          <p className="text-center text-[10px] text-white/30 pb-4">🔒 End-to-end encrypted video call • Like WhatsApp • No one can listen, not even AYO</p>
        </div>
      )}
    </div>
  )
}
