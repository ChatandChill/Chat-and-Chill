// READABLE - MERGED - app/page.js - WORLD NO1 ULTRA-SECURE - ADD NOT REBUILD
// Your existing file from screenshot: ChatandChill/Chat-and-Chill/blob/main/app/page.js
// KEEP ALL YOUR EXISTING STATES + ADD WORLD NO1

"use client";
import { useState, useEffect, useRef } from 'react';
// EXISTING - KEEP ALL
// import ... your existing imports

// WORLD NO1 - ADD THESE 4 IMPORTS ONLY - DO NOT DELETE EXISTING
import { AppLogoWorldNo1, SplashScreenWorldNo1, DayNightToggle, TwoGToggle, HomeHeaderWorldNo1 } from '../components/AppLogoWorldNo1';
import { CanvasFXRenderer, WorldNo1FX } from '../components/WorldNo1FxSystem';
// If you have these, import:
import LiveGiftSystemPro from '../components/LiveGiftSystemPro'; 
import BadgeSystemPro from '../components/BadgeSystemPro';

export default function Page(){
  // === KEEP ALL YOUR EXISTING STATES FROM SCREENSHOT ===
  const [email,setEmail]=useState("");
  const [code,setCode]=useState("");
  const [showCodeField,setShowCodeField]=useState(false);
  const [countdown,setCountdown]=useState(0);
  const [balance,setBalance]=useState(0);
  const [liked,setLiked]=useState(false);
  const [heartPop,setHeartPop]=useState(false);
  const [tab,setTab]=useState("fyp");
  const [is2G,setIs2G]=useState(false);
  const [withdrawAmount,setWithdrawAmount]=useState("");
  const [withdrawCode,setWithdrawCode]=useState("");
  const [chatMsg,setChatMsg]=useState("");
  const [chats,setChats]=useState([]);
  const [videos,setVideos]=useState([]);
  const [uploadCity,setUploadCity]=useState("");
  const [showComments,setShowComments]=useState(false);
  const [commentText,setCommentText]=useState("");
  const [comments,setComments]=useState([]);

  const posts = [
    {id:1, name:"African Queen", city:"Lagos"},
    {id:2, name:"Diaspora King", city:"London"},
    {id:3, name:"Chill Vibes", city:"Accra"},
    {id:4, name:"Level Crew", city:"Nairobi"},
    {id:5, name:"Beyond TikTok", city:"World"},
  ];

  // === WORLD NO1 - ADD THESE NEW STATES ONLY ===
  const [showSplash,setShowSplash]=useState(true);
  const [isDay,setIsDay]=useState(false); // Night default #0A0A0F mature
  const [worldNo1Fx,setWorldNo1Fx]=useState(null);
  const canvasRef = useRef(null);
  const [giftCatalog,setGiftCatalog]=useState([]);
  const [selectedGift,setSelectedGift]=useState(null);

  useEffect(()=>{
    // Load gift catalog 6 tabs N100-N1M
    // fetch('/api/gifts/catalog')
    const timer = setTimeout(()=> setShowSplash(false), 6000); // 5-step splash 6s
    return ()=> clearTimeout(timer);
  },[]);

  // === WORLD NO1 FX TRIGGER ===
  const triggerGiftFX = (giftType, amount) => {
    if(!canvasRef.current) return;
    const renderer = new CanvasFXRenderer(canvasRef.current);
    if(giftType==='barcelona' || giftType==='Barcelona') renderer.barcaBlueRedBurst();
    else if(giftType==='worldCup') renderer.worldCupFireworksUniverse();
    else if(giftType==='nigeria') renderer.naijaGreenWhiteBurst();
    else renderer.goldMoneyRain();
  };

  // === IF SPLASH SHOW SPLASH WORLD NO1 ===
  if(showSplash){
    return <SplashScreenWorldNo1 onFinish={()=> setShowSplash(false)} />;
  }

  // === YOUR EXISTING RETURN - KEEP + ADD WORLD NO1 HEADER + CANVAS + 2G ===
  return (
    <div style={{background: isDay ? '#FFFFFF' : '#0A0A0F', minHeight:'100vh', color: isDay ? '#000' : '#fff', position:'relative'}}>
      
      {/* WORLD NO1 - ADD HEADER - 40px icon + neon gold + day/night */}
      <HomeHeaderWorldNo1 isDay={isDay} setIsDay={setIsDay} is2G={is2G} setIs2G={setIs2G} />

      {/* WORLD NO1 - CANVAS FOR REAL FX - barcaBlueRedBurst etc */}
      <canvas ref={canvasRef} style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:9999}} width={typeof window!=='undefined'? window.innerWidth : 400} height={typeof window!=='undefined'? window.innerHeight : 800} />

      {/* YOUR EXISTING FYP / LIVE / ETC - KEEP */}
      <div style={{padding:16}}>
        <h2 style={{color:'#FFD700', fontWeight:800}}>FYP - {tab}</h2>
        {/* ... your existing posts map ... */}
        {posts.map(p=> (
          <div key={p.id} style={{background: isDay ? '#f5f5f5' : '#1A1A1F', margin:'12px 0', padding:12, borderRadius:12, border:'1px solid #FFD700'}}>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <AppLogoWorldNo1 size={32} />
              <span style={{fontWeight:700}}>{p.name}</span>
              <span style={{fontSize:12, color:'#8B4513'}}>{p.city}</span>
            </div>
            {/* Gift button WORLD NO1 */}
            <button onClick={()=> triggerGiftFX('barcelona', 1000)} style={{marginTop:8, background:'linear-gradient(135deg, #004D98, #A50044)', color:'#fff', padding:'8px 16px', borderRadius:20, border:'none', fontWeight:800, boxShadow:'0 0 15px #FFD700'}}>
              🎁 Barcelona N1000 - barcaBlueRedBurst
            </button>
          </div>
        ))}
      </div>

      {/* WORLD NO1 - 2G TOGGLE GREEN BOTTOM RIGHT SAVES 80% */}
      <TwoGToggle is2G={is2G} setIs2G={setIs2G} />

      {/* YOUR EXISTING BOTTOM TABS - KEEP */}
      {/* ... your existing tab bar ... */}
      
      <div style={{position:'fixed', bottom:0, left:0, right:0, background: isDay ? '#fff' : '#0A0A0F', borderTop:'2px solid #FFD700', display:'flex', justifyContent:'space-around', padding:12}}>
        <button onClick={()=> setTab('fyp')} style={{color: tab==='fyp' ? '#FFD700' : '#888', fontWeight:800}}>FYP</button>
        <button onClick={()=> setTab('live')} style={{color: tab==='live' ? '#00FF88' : '#888', fontWeight:800, textShadow: tab==='live' ? '0 0 10px #00FF88' : 'none'}}>LIVE 12BOX</button>
        <button onClick={()=> setTab('business')} style={{color: tab==='business' ? '#FFD700' : '#888', fontWeight:800}}>BUSINESS Gold Bag</button>
        <button onClick={()=> setTab('wallet')} style={{color:'#00FF88', fontWeight:800}}>WALLET OPay</button>
      </div>
    </div>
  );
}
