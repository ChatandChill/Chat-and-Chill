"use client";
import { useState, useEffect, useRef } from "react";

export default function Page(){
  const [splash,setSplash]=useState(true);
  const [tab,setTab]=useState("wallet");
  const [isLive,setIsLive]=useState(false);
  const [guests,setGuests]=useState([]);
  const [showGuestBox,setShowGuestBox]=useState(false);
  const [showMusicBox,setShowMusicBox]=useState(false);
  const [showDeposit,setShowDeposit]=useState(false);
  const [showWithdraw,setShowWithdraw]=useState(false);
  const [currentTrack,setCurrentTrack]=useState(null);
  const [isPlaying,setIsPlaying]=useState(false);
  const [volume,setVolume]=useState(70);
  const [bankName,setBankName]=useState("Opay");
  const [accountNumber,setAccountNumber]=useState("9123456789");
  const videoRef=useRef(null);
  const streamRef=useRef(null);
  const bgMusicRef=useRef(null);

  const [userWallet,setUserWallet]=useState(50000);
  const [creatorBalance,setCreatorBalance]=useState(306950);
  const [ownerStats,setOwnerStats]=useState({totalGiftVolume:2547500,owner20:509500,creator80:2038000,totalOwnerEarnings:509500});

  const musicTracks = [
    {id:1,name:"Afrobeats Vibes",artist:"Diaspora Love",mood:"🔥 Party",url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"},
    {id:2,name:"Amapiano Chill",artist:"Lagos Night",mood:"💜 Chill",url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"},
    {id:3,name:"Highlife Friendship",artist:"OKIKIOLA TM",mood:"🤝 Friendship",url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"},
    {id:4,name:"Love Benefits Slow",artist:"Sade",mood:"❤️ Love",url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"},
    {id:5,name:"Welcome Intro",artist:"Chat & Chill",mood:"👋 Welcome",url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"},
  ];
  const soundEffects = [
    {id:"welcome",name:"Welcome",emoji:"👋",color:"#FFD600"},
    {id:"clap",name:"Clap",emoji:"👏",color:"#22c55e"},
    {id:"love",name:"Love",emoji:"❤️",color:"#ef4444"},
    {id:"fire",name:"Fire",emoji:"🔥",color:"#FF5722"},
    {id:"drum",name:"Drum",emoji:"🥁",color:"#8b5cf6"},
    {id:"cheer",name:"Cheer",emoji:"🎉",color:"#00f2ea"},
    {id:"kiss",name:"Kiss",emoji:"💋",color:"#ec4899"},
    {id:"wow",name:"Wow",emoji:"😍",color:"#f59e0b"},
  ];

  useEffect(()=>{ const t=setTimeout(()=>setSplash(false),2200); return ()=>clearTimeout(t); },[]);
  useEffect(()=>{ if(isLive && videoRef.current && streamRef.current){ videoRef.current.srcObject=streamRef.current; videoRef.current.play().catch(()=>{});} },[isLive,guests]);

  const startLive=async()=>{ try{ const s=await navigator.mediaDevices.getUserMedia({video:{width:1280,height:720},audio:true}); streamRef.current=s; setIsLive(true);}catch(e){alert(e.message);} };
  const stopLive=()=>{ streamRef.current?.getTracks().forEach(t=>t.stop()); setIsLive(false); setGuests([]); if(bgMusicRef.current){ bgMusicRef.current.pause(); setIsPlaying(false);} };

  const depositWallet = (amount) => { setUserWallet(w=>w+amount); setShowDeposit(false); };
  const sendGiftWallet = (giftName, giftValue) => {
    if(userWallet < giftValue){ setShowDeposit(true); return; }
    setUserWallet(w=>w-giftValue);
    setCreatorBalance(b=>b+Math.floor(giftValue*0.8));
    setOwnerStats(s=>({...s,totalGiftVolume:s.totalGiftVolume+giftValue,owner20:s.owner20+Math.floor(giftValue*0.2),creator80:s.creator80+Math.floor(giftValue*0.8),totalOwnerEarnings:s.totalOwnerEarnings+Math.floor(giftValue*0.2)}));
    playSFX({emoji:"🎁"});
  };
  const withdrawInstant = (amount) => {
    if(creatorBalance < amount) return;
    setCreatorBalance(b=>b-amount);
    setShowWithdraw(false);
    alert(`N${amount.toLocaleString()} sent to ${bankName} ${accountNumber} instantly! 30 seconds! No delay!`);
  };
  const playTrack = (track) => {
    if(bgMusicRef.current){
      if(currentTrack?.id===track.id && isPlaying){ bgMusicRef.current.pause(); setIsPlaying(false); return; }
      bgMusicRef.current.src = track.url; bgMusicRef.current.volume = volume/100; bgMusicRef.current.loop = true;
      bgMusicRef.current.play().then(()=>{ setCurrentTrack(track); setIsPlaying(true); }).catch(()=>{});
    }
  };
  const playSFX = (sfx) => {
    if(navigator.vibrate) navigator.vibrate(80);
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.frequency.value = {welcome:440,clap:600,love:520,fire:800,drum:150,cheer:700,kiss:400,wow:650}[sfx.id]||500;
    gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime+0.4);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime+0.4);
    const el = document.createElement('div'); el.textContent = sfx.emoji; el.style.position='fixed'; el.style.left=Math.random()*70+15+'%'; el.style.bottom='22%'; el.style.fontSize='56px'; el.style.zIndex='100'; el.style.pointerEvents='none'; el.style.animation='floatUp 1.4s forwards'; document.body.appendChild(el); setTimeout(()=>el.remove(),1400);
  };

  if(splash){
    return(<div style={{height:"100vh",background:"black",display:"grid",placeItems:"center"}}><style>{`@keyframes floatUp{0%{transform:translateY(0) scale(0.5);opacity:1} 100%{transform:translateY(-300px) scale(1.4);opacity:0}}`}</style><div style={{textAlign:"center"}}><div style={{width:200,height:200,margin:"0 auto",borderRadius:24,background:"linear-gradient(145deg, #FFD600, #FFA500)",display:"grid",placeItems:"center",fontWeight:900}}>Chat & Chill<br/>WALLET + MUSIC BOX<br/>FINAL</div><h1 style={{color:"white",fontWeight:900,marginTop:16}}>Wallet + Music Box</h1><p style={{color:"#FFD600",fontSize:10}}>NO COINS • INSTANT BANK • MUSIC + SFX</p></div></div>);
  }

  if(isLive){
    return(
      <div style={{height:"100vh",background:"black",color:"white",position:"relative",maxWidth:430,margin:"0 auto",overflow:"hidden"}}>
        <style>{`@keyframes floatUp{0%{transform:translateY(0) scale(0.5);opacity:1} 100%{transform:translateY(-300px) scale(1.4);opacity:0}} @keyframes musicBar{0%,100%{height:6px} 50%{height:18px}}`}</style>
        <video ref={videoRef} autoPlay muted playsInline style={{width:"100%",height:"100%",objectFit:"cover",background:"#111",position:"absolute",inset:0}}/>
        <audio ref={bgMusicRef} style={{display:"none"}}/>
        <div style={{position:"absolute",top:62,left:8,right:8,zIndex:3,display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:6}}>{guests.map(g=><div key={g.id} style={{height:86,borderRadius:12,background:"#1a1a1a",border:"2px solid #FFD600",display:"grid",placeItems:"center",fontSize:9,fontWeight:900,position:"relative"}}>{g.name}<button onClick={()=>{setGuests(guests.filter(x=>x.id!==g.id)); playSFX({emoji:"👋"});}} style={{position:"absolute",top:2,right:2,width:16,height:16,borderRadius:999,background:"#ef4444",border:"none",color:"white"}}>×</button></div>)}</div>
        {isPlaying && currentTrack && (
          <div style={{position:"absolute",top:48,left:8,right:8,zIndex:4,padding:"6px 12px",borderRadius:999,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",gap:8,border:"1px solid rgba(255,214,0,0.3)"}}>
            <div style={{width:24,height:24,borderRadius:6,background:"#FFD600",display:"grid",placeItems:"center"}}>🎵</div>
            <div style={{flex:1}}><p style={{fontSize:9,fontWeight:900}}>{currentTrack.name} • {currentTrack.mood}</p></div>
            <div style={{display:"flex",gap:2,alignItems:"end",height:14}}>{[...Array(3)].map((_,i)=><div key={i} style={{width:3,background:"#FFD600",borderRadius:2,animation:`musicBar ${0.3+i*0.1}s infinite`}}/>)}</div>
            <button onClick={()=>{bgMusicRef.current.pause(); setIsPlaying(false);}} style={{width:18,height:18,borderRadius:999,background:"white",color:"black",border:"none",fontSize:9}}>×</button>
          </div>
        )}
        <div style={{position:"absolute",inset:0,padding:12,display:"flex",flexDirection:"column",justifyContent:"space-between",zIndex:4,background:"linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 25%, transparent 65%, rgba(0,0,0,0.9))"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><button onClick={stopLive} style={{width:32,height:32,borderRadius:999,background:"rgba(0,0,0,0.6)",border:"none",color:"white",fontWeight:900}}>X</button><div style={{display:"flex",gap:6}}><div style={{padding:"5px 10px",borderRadius:999,background:"#ef4444",fontSize:10,fontWeight:900}}>● LIVE {guests.length}/12 🎵</div><button onClick={()=>setShowMusicBox(true)} style={{padding:"5px 12px",borderRadius:999,background:"#FFD600",border:"none",color:"black",fontSize:9,fontWeight:900}}>🎵 MUSIC BOX</button></div></div>
          <div>
            <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:6,marginBottom:6}}>
              {soundEffects.map(sfx=><button key={sfx.id} onClick={()=>playSFX({emoji:sfx.emoji,id:sfx.id})} style={{minWidth:52,padding:"7px 0",borderRadius:10,background:sfx.color,color:sfx.id==="welcome"?"black":"white",border:"none",fontWeight:900,fontSize:9}}><div style={{fontSize:16}}>{sfx.emoji}</div>{sfx.name}</button>)}
            </div>
            <div style={{background:"rgba(0,0,0,0.75)",borderRadius:12,padding:8,marginBottom:6}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:9}}><span style={{opacity:0.6}}>WALLET N{userWallet.toLocaleString()}</span><span style={{fontWeight:900,color:"#FFD600"}}>Creator 80% / You 20% Instant Bank</span></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:5,marginTop:6}}>
                {[{n:"Fire",v:1000},{n:"Diamond",v:5000},{n:"Rocket",v:10000},{n:"Lion",v:25000}].map(g=><button key={g.n} onClick={()=>sendGiftWallet(g.n,g.v)} style={{padding:"7px 0",borderRadius:8,border:"none",background:"white",color:"black",fontWeight:900,fontSize:7}}>{g.n}<br/>N{g.v.toLocaleString()}</button>)}
              </div>
            </div>
            <div style={{display:"flex",gap:6}}><button onClick={()=>setShowGuestBox(true)} style={{padding:"9px 14px",borderRadius:999,background:"#FFD600",color:"black",fontWeight:900,border:"none",fontSize:11}}>+ GUEST</button><button onClick={()=>setShowMusicBox(true)} style={{padding:"9px 14px",borderRadius:999,background:"#8b5cf6",color:"white",fontWeight:900,border:"none",fontSize:11}}>🎵 MUSIC + SFX</button><button onClick={stopLive} style={{padding:"9px 14px",borderRadius:999,background:"black",color:"white",border:"1px solid white",fontWeight:900,fontSize:11}}>END</button></div>
          </div>
        </div>
        {showMusicBox && (
          <div style={{position:"absolute",inset:0,zIndex:25,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(20px)",padding:12,overflowY:"auto"}}>
            <div style={{background:"#111",borderRadius:24,padding:16,color:"white",border:"1px solid rgba(255,214,0,0.2)"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:900}}>🎵 Music Box - Fun Streaming</h3><button onClick={()=>setShowMusicBox(false)} style={{width:28,height:28,borderRadius:999,border:"none",background:"white",color:"black",fontWeight:900}}>X</button></div>
              <div style={{marginTop:12,background:"rgba(255,214,0,0.08)",borderRadius:14,padding:12}}>
                <p style={{fontWeight:900,fontSize:11}}>🎧 Background Music - Play While Live</p>
                <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6}}>
                  {musicTracks.map(t=><div key={t.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",borderRadius:10,background:currentTrack?.id===t.id?"#FFD600":"rgba(255,255,255,0.06)",color:currentTrack?.id===t.id?"black":"white"}}><div><p style={{fontWeight:900,fontSize:10}}>{t.name}</p><p style={{fontSize:8,opacity:0.6}}>{t.mood}</p></div><button onClick={()=>playTrack(t)} style={{padding:"6px 12px",borderRadius:999,background:currentTrack?.id===t.id && isPlaying?"black":"white",color:currentTrack?.id===t.id && isPlaying?"white":"black",border:"none",fontWeight:900,fontSize:8}}>{currentTrack?.id===t.id && isPlaying?"STOP":"PLAY"}</button></div>)}
                </div>
              </div>
              <div style={{marginTop:12,background:"rgba(139,92,246,0.08)",borderRadius:14,padding:12}}>
                <p style={{fontWeight:900,fontSize:11}}>🎉 Sound Effects - Welcome Clap Love</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:6,marginTop:8}}>
                  {soundEffects.map(s=><button key={s.id} onClick={()=>playSFX({emoji:s.emoji,id:s.id})} style={{padding:"12px 0",borderRadius:12,background:s.color,color:s.id==="welcome"?"black":"white",border:"none",fontWeight:900}}><div style={{fontSize:20}}>{s.emoji}</div><div style={{fontSize:8}}>{s.name}</div></button>)}
                </div>
                <button onClick={()=>{playSFX({emoji:"👋",id:"welcome"}); setTimeout(()=>playSFX({emoji:"👏",id:"clap"}),300); setTimeout(()=>playSFX({emoji:"❤️",id:"love"}),600);}} style={{width:"100%",marginTop:8,padding:"10px 0",borderRadius:10,background:"white",color:"black",fontWeight:900,border:"none",fontSize:10}}>👋👏❤️ Welcome Combo - New Guest!</button>
              </div>
              <button onClick={()=>setShowMusicBox(false)} style={{width:"100%",marginTop:12,padding:"12px 0",borderRadius:12,background:"#FFD600",color:"black",fontWeight:900,border:"none"}}>Done - Back to Live 🎵</button>
            </div>
          </div>
        )}
        {showGuestBox && <div style={{position:"absolute",inset:0,zIndex:20,background:"rgba(0,0,0,0.85)",display:"grid",placeItems:"center",padding:16}}><div style={{background:"white",borderRadius:20,padding:16,width:"100%",maxWidth:320,color:"black"}}><h3 style={{fontWeight:900}}>Guest Box 12 + Welcome SFX</h3><button onClick={()=>{const n=Math.min(12,12-guests.length); setGuests([...guests,...Array.from({length:n},(_,i)=>({id:Date.now()+i,name:`@Guest_${guests.length+i+1}`}))]); setShowGuestBox(false); playSFX({emoji:"👋",id:"welcome"});}} style={{width:"100%",marginTop:12,padding:"12px 0",borderRadius:999,background:"#FFD600",color:"black",fontWeight:900,border:"none"}}>Fill 12 + 👋 Welcome Sound</button><button onClick={()=>setShowGuestBox(false)} style={{width:"100%",marginTop:8,padding:10,borderRadius:999,background:"#eee",border:"none",fontWeight:900}}>Close</button></div></div>}
      </div>
    );
  }

  return(
    <div style={{background:"#0a0a0a",minHeight:"100vh"}}>
      <div style={{maxWidth:430,margin:"0 auto",background:"#0a0a0a",minHeight:"100vh",color:"white",borderLeft:"1px solid #222",borderRight:"1px solid #222"}}>
        <div style={{padding:16,background:"black",borderBottom:"2px solid #FFD600",position:"sticky",top:0,zIndex:10}}>
          <h1 style={{fontWeight:900,fontSize:16}}>Chat & Chill - FINAL: Wallet + Music Box</h1>
          <p style={{fontSize:8,color:"#FFD600",fontWeight:900}}>NO COINS • WALLET DEPOSIT • INSTANT BANK 30SEC • MUSIC BOX • 80% CREATOR / 20% OWNER</p>
          <div style={{display:"flex",gap:6,marginTop:10}}>
            <button onClick={()=>setTab("wallet")} style={{flex:1,padding:"10px 0",borderRadius:999,background:tab==="wallet"?"#FFD600":"#222",color:tab==="wallet"?"black":"white",fontWeight:900,border:"none",fontSize:9}}>💳 WALLET</button>
            <button onClick={()=>setTab("owner")} style={{flex:1,padding:"10px 0",borderRadius:999,background:tab==="owner"?"white":"#222",color:tab==="owner"?"black":"white",fontWeight:900,border:"none",fontSize:9}}>💰 OWNER 20%</button>
            <button onClick={()=>setTab("music")} style={{flex:1,padding:"10px 0",borderRadius:999,background:tab==="music"?"#8b5cf6":"#222",color:"white",fontWeight:900,border:"none",fontSize:9}}>🎵 MUSIC BOX</button>
          </div>
        </div>

        {tab==="wallet" && (
          <div style={{padding:16}}>
            <div style={{background:"white",color:"black",borderRadius:20,padding:16}}>
              <p style={{fontSize:8,fontWeight:900,opacity:0.6}}>FAN WALLET - NO COINS - STRAIGHT NAIRA</p>
              <p style={{fontWeight:900,fontSize:28}}>N{userWallet.toLocaleString()}</p>
              <div style={{display:"flex",gap:8,marginTop:10}}>
                <button onClick={()=>setShowDeposit(true)} style={{flex:1,padding:"12px 0",borderRadius:12,background:"black",color:"white",fontWeight:900,border:"none",fontSize:11}}>💳 DEPOSIT - Opay Instant</button>
                <button onClick={()=>setShowWithdraw(true)} style={{flex:1,padding:"12px 0",borderRadius:12,background:"#22c55e",color:"white",fontWeight:900,border:"none",fontSize:11}}>🏦 WITHDRAW Instant 30s</button>
              </div>
              <div style={{marginTop:12,display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:8}}>
                {[{n:"Fire",v:1000},{n:"Diamond",v:5000},{n:"Rocket",v:10000},{n:"Lion",v:25000}].map(g=><button key={g.n} onClick={()=>{if(userWallet>=g.v){ setUserWallet(w=>w-g.v); setCreatorBalance(b=>b+Math.floor(g.v*0.8)); setOwnerStats(s=>({...s,owner20:s.owner20+Math.floor(g.v*0.2),totalOwnerEarnings:s.totalOwnerEarnings+Math.floor(g.v*0.2)}));}}} style={{padding:"12px 0",borderRadius:12,background:"#111",color:"white",fontWeight:900,border:"none",fontSize:10}}>{g.n} N{g.v.toLocaleString()}<br/><span style={{fontSize:7,opacity:0.6}}>Creator N{Math.floor(g.v*0.8).toLocaleString()} / You N{Math.floor(g.v*0.2).toLocaleString()}</span></button>)}
              </div>
            </div>
            <div style={{marginTop:12,background:"#111",borderRadius:16,padding:12,border:"1px solid #333"}}>
              <p style={{fontWeight:900,fontSize:11}}>Creator Balance: N{creatorBalance.toLocaleString()} (80% of gifts)</p>
              <p style={{fontSize:9,opacity:0.6,marginTop:4}}>Withdraws instantly to Opay/PalmPay - No delay - 30 seconds</p>
            </div>
            <button onClick={()=>{const s="audio"; if(true) startLive();}} style={{width:"100%",marginTop:12,padding:"14px 0",borderRadius:12,background:"linear-gradient(90deg, #FFD600, #FFA500)",color:"black",fontWeight:900,border:"none"}}>🔴 GO LIVE - WALLET + MUSIC BOX</button>
          </div>
        )}

        {tab==="owner" && (
          <div style={{padding:16}}>
            <div style={{background:"linear-gradient(145deg, #FFD600, #FFA500)",borderRadius:20,padding:16,color:"black"}}>
              <p style={{fontSize:8,fontWeight:900}}>OWNER 20% - WALLET MODEL - NO COINS</p>
              <p style={{fontWeight:900,fontSize:30}}>N{ownerStats.totalOwnerEarnings.toLocaleString()}</p>
              <p style={{fontSize:10,opacity:0.7}}>From N{ownerStats.totalGiftVolume.toLocaleString()} gifts • 20% straight • Instant</p>
            </div>
          </div>
        )}

        {tab==="music" && (
          <div style={{padding:16}}>
            <div style={{background:"#111",borderRadius:20,padding:16,border:"1px solid #333"}}>
              <h3 style={{fontWeight:900}}>🎵 Music Box - Preview</h3>
              <p style={{fontSize:9,opacity:0.6,marginTop:4}}>Background music plays while streaming - Welcome Clap Love SFX make fun</p>
              <div style={{marginTop:12,display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:6}}>
                {soundEffects.map(s=><div key={s.id} style={{padding:"10px 0",borderRadius:10,background:s.color,color:s.id==="welcome"?"black":"white",textAlign:"center",fontWeight:900,fontSize:9}}><div style={{fontSize:18}}>{s.emoji}</div>{s.name}</div>)}
              </div>
              <button onClick={startLive} style={{width:"100%",marginTop:12,padding:"12px 0",borderRadius:12,background:"#8b5cf6",color:"white",fontWeight:900,border:"none"}}>Go Live to Test Music Box 🎵</button>
            </div>
          </div>
        )}

        {showDeposit && (
          <div style={{position:"fixed",inset:0,zIndex:50,background:"rgba(0,0,0,0.9)",display:"grid",placeItems:"center",padding:16}}>
            <div style={{background:"white",borderRadius:20,padding:20,width:"100%",maxWidth:340,color:"black"}}>
              <h3 style={{fontWeight:900}}>💳 Deposit - Straight Wallet - No Coins</h3>
              <p style={{fontSize:9,opacity:0.6}}>Opay / PalmPay / Bank → Wallet instant 5 sec</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:8,marginTop:12}}>
                <button onClick={()=>depositWallet(5000)} style={{padding:"16px 0",borderRadius:12,background:"#f5f5f5",border:"1px solid #ddd",fontWeight:900}}>N5,000</button>
                <button onClick={()=>depositWallet(10000)} style={{padding:"16px 0",borderRadius:12,background:"#FFD600",border:"none",fontWeight:900}}>N10,000</button>
                <button onClick={()=>depositWallet(25000)} style={{padding:"16px 0",borderRadius:12,background:"black",color:"white",border:"none",fontWeight:900}}>N25,000</button>
                <button onClick={()=>depositWallet(50000)} style={{padding:"16px 0",borderRadius:12,background:"#111",color:"white",border:"none",fontWeight:900}}>N50,000</button>
              </div>
              <button onClick={()=>setShowDeposit(false)} style={{width:"100%",marginTop:12,padding:12,borderRadius:999,background:"#eee",border:"none",fontWeight:900}}>Close</button>
            </div>
          </div>
        )}

        {showWithdraw && (
          <div style={{position:"fixed",inset:0,zIndex:50,background:"rgba(0,0,0,0.9)",display:"grid",placeItems:"center",padding:16}}>
            <div style={{background:"white",borderRadius:20,padding:20,width:"100%",maxWidth:340,color:"black"}}>
              <h3 style={{fontWeight:900}}>🏦 Instant Withdraw - No Delay</h3>
              <p style={{fontSize:9,opacity:0.6}}>Creator N{creatorBalance.toLocaleString()} → {bankName} {accountNumber} → 30 seconds</p>
              <select value={bankName} onChange={e=>setBankName(e.target.value)} style={{width:"100%",marginTop:10,padding:"12px",borderRadius:12,border:"1px solid #ddd"}}><option>Opay</option><option>PalmPay</option><option>Moniepoint</option><option>Kuda</option></select>
              <input value={accountNumber} onChange={e=>setAccountNumber(e.target.value)} style={{width:"100%",marginTop:8,padding:"12px",borderRadius:12,border:"1px solid #ddd"}} placeholder="Account Number"/>
              <button onClick={()=>withdrawInstant(creatorBalance)} style={{width:"100%",marginTop:12,padding:"14px 0",borderRadius:12,background:"#22c55e",color:"white",fontWeight:900,border:"none"}}>Withdraw N{creatorBalance.toLocaleString()} Instant to {bankName}</button>
              <button onClick={()=>setShowWithdraw(false)} style={{width:"100%",marginTop:8,padding:12,borderRadius:999,background:"#eee",border:"none",fontWeight:900}}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{padding:12,textAlign:"center",fontSize:8,opacity:0.3}}>v123 FINAL - WALLET NO COINS - STRAIGHT DEPOSIT - INSTANT BANK OPAY 30SEC NO DELAY - MUSIC BOX 5 TRACKS + 8 SFX WELCOME CLAP LOVE - 80% CREATOR / 20% OWNER - DIAMOND LEVEL 1000</div>
      </div>
    </div>
  );
}
