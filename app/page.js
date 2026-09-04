"use client";
import { useState, useEffect, useRef } from "react";
export default function Page(){
  const [showLogo,setShowLogo]=useState(true);
  const [showPremiumPop,setShowPremiumPop]=useState(false);
  const [showCalmModal,setShowCalmModal]=useState(false);
  const [fastScrollCount,setFastScrollCount]=useState(0);
  const lastScrollRef=useRef(0);
  const [wallet,setWallet]=useState(500000000);
  const [crowns,setCrowns]=useState(5000000);
  const [gifterLevel,setGifterLevel]=useState(100);
  const [gifterXP,setGifterXP]=useState(87500);
  const [language,setLanguage]=useState("EN");
  const [toast,setToast]=useState(""); const [user,setUser]=useState(null);
  const [form,setForm]=useState({fullName:"",username:"",email:"",pass:"",agree:false});
  const [showLogin,setShowLogin]=useState(false);
  const [activeGiftFx,setActiveGiftFx]=useState(null);
  const [showGiftBox,setShowGiftBox]=useState(false);
  const [selectedBox,setSelectedBox]=useState(null);
  const [liveMatch,setLiveMatch]=useState(false);
  const [comment,setComment]=useState("");
  const [comments,setComments]=useState([{u:"lagos_queen",t:"Love African Eye 👁️🌍 calm down enjoy no rush 🧘 Chat and Chill!",e:"👁️"}]);
  const emojis=["😀","😂","❤️","🔥","👑","🌹","💎","🦁","🌍","👁️","✨","🎉","🫶","💝","🙏","🎁","💯","🧘","😍","👏","🙌","💪","🌟","⚡","💫","🌌","🏆","💰","🤝"];
  const languages={EN:"English",FR:"Français",YO:"Yorùbá",PI:"Pidgin",SW:"Kiswahili"};
  const tMap={EN:{calmTitle:"Calm down and enjoy the platform no rush",calmBody:"Chat and Chill - Friendship Love Benefits Diaspora Love - Take your time, no rush. Enjoy every moment 🧘",slow:"I understand - Chill 🧘"},FR:{calmTitle:"Calmez-vous et profitez",calmBody:"Chat and Chill - Amitié Amour",slow:"Je comprends"},YO:{calmTitle:"Dakun sinmi ki o gbadun",calmBody:"Chat and Chill - Ore Ife",slow:"Mo ye"},PI:{calmTitle:"Calm down make you enjoy no rush",calmBody:"Chat and Chill - No rush!",slow:"I don hear"},SW:{calmTitle:"Tulia na ufurahie",calmBody:"Chat and Chill - Urafiki",slow:"Naelewa"}};
  const [boxes,setBoxes]=useState([{id:1,host:true,name:"You Host V5M",viewers:5000000},{id:2,name:"lagos_queen",viewers:50000},{id:3,name:"afro_gold_queen",viewers:12453},{id:4,name:"Join",viewers:0},{id:5,name:"Join",viewers:0},{id:6,name:"Join",viewers:0}]);
  const allGifts=[{n:"African Eye",p:5000,i:"👁️🌍",img:"/gallery/golden_african_eye_gift.webp",badge:"STANDALONE PREMIUM"},{n:"Eye Crown",p:5000,i:"👑👁️",img:"/gallery/golden_eye_crown_explosion.webp"},{n:"Rose",p:100,i:"🌹"},{n:"Gold Crown",p:500,i:"👑"},{n:"Diamond",p:1000,i:"💎"},{n:"Lion",p:5000,i:"🦁"},{n:"Universe",p:10000,i:"🌌"},{n:"V5M Legend",p:15000,i:"🏆"}];
  const fxRates=[{flag:"🇺🇸",pair:"USD→NGN",rate:"₦1,650",change:"+0.8%"},{flag:"🇬🇧",pair:"GBP→NGN",rate:"₦2,120",change:"+1.2%"},{flag:"🇪🇺",pair:"EUR→NGN",rate:"₦1,790",change:"+0.5%"},{flag:"🇨🇦",pair:"CAD→NGN",rate:"₦1,210",change:"-0.2%"}];
  const weather=[{city:"Lagos",temp:"28°C",icon:"☀️",flag:"🇳🇬"},{city:"London",temp:"15°C",icon:"🌧️",flag:"🇬🇧"},{city:"New York",temp:"22°C",icon:"🌤️",flag:"🇺🇸"},{city:"Toronto",temp:"18°C",icon:"⛅",flag:"🇨🇦"}];
  useEffect(()=>{ const t=setTimeout(()=>{ setShowLogo(false); setShowPremiumPop(true); },2200); return()=>clearTimeout(t); },[]);
  useEffect(()=>{ if(toast){ const tm=setTimeout(()=>setToast(""),3000); return()=>clearTimeout(tm); } },[toast]);
  const handleScroll=()=>{ const now=Date.now(); if(now-lastScrollRef.current<800){ const nc=fastScrollCount+1; setFastScrollCount(nc); if(nc>=3){ setShowCalmModal(true); setFastScrollCount(0); } }else{ setFastScrollCount(1); } lastScrollRef.current=now; };
  const sendGift=(g)=>{ if(!user){ setShowLogin(true); return; } if(wallet<g.p) return; setWallet(w=>w-g.p); const newXP=gifterXP+g.p; setGifterXP(newXP); setGifterLevel(Math.min(200,100+Math.floor(newXP/1000))); setActiveGiftFx(g); setShowGiftBox(false); };
  const TH={bg:"#050507",card:"#101012",card2:"#15151A",text:"#fff",sub:"#888",gold:"#CFA658",gold2:"#FFD700",border:"#1A1A1A"};
  const tr=tMap[language];
  return(
    <div style={{background:TH.bg,color:TH.text,minHeight:"100vh",fontFamily:"sans-serif"}} onWheel={handleScroll} onTouchMove={handleScroll}>
      <div style={{background:"linear-gradient(90deg,#CFA658,#FFD700,#FF00FF,#CFA658)",color:"#000",padding:"7px",textAlign:"center",fontSize:10,fontWeight:900}}>Chat and Chill V5,000,000 GOD EMPEROR - Logo Popup FYP BG + Calm 3 Fast Scrolls No Rush + Translation + Diaspora FX Weather + Gifter Badge More Gift - ACTIVE</div>
      {showCalmModal && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}><div style={{background:TH.card,border:"3px solid "+TH.gold,borderRadius:20,padding:0,maxWidth:360,overflow:"hidden",position:"relative"}}><img src="/logo-dark.png" alt="logo bg" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.15}}/><div style={{position:"relative",padding:24,textAlign:"center"}}><div style={{fontSize:48}}>🧘</div><h3 style={{fontWeight:900,color:TH.gold}}>{tr.calmTitle}</h3><p style={{fontSize:12,marginTop:10}}>{tr.calmBody}<br/><br/>You scrolled 3 times fast - No rush, enjoy platform friendship love benefits diaspora love 🌍❤️🎁<br/>Africa Circuit logo background - Beyond TikTok Level 100</p><button onClick={()=>setShowCalmModal(false)} style={{marginTop:16,width:"100%",background:TH.gold,color:"#000",padding:"14px",borderRadius:20,border:"none",fontWeight:900}}>{tr.slow}</button></div></div></div>}
      {/* Header with language, FX, weather */}
      <header style={{display:"flex",justifyContent:"space-between",padding:"10px",borderBottom:"1px solid "+TH.border,background:TH.card,alignItems:"center"}}><div style={{display:"flex",gap:8,alignItems:"center"}}><img src="/logo-dark.png" alt="logo" style={{width:32,height:32,borderRadius:8,border:"2px solid "+TH.gold}}/><div><p style={{fontSize:12,fontWeight:900}}>Chat and Chill</p><p style={{fontSize:8,color:TH.gold}}>V5M GOD EMPEROR • {language}</p></div></div><div style={{display:"flex",gap:6,alignItems:"center"}}><select value={language} onChange={e=>setLanguage(e.target.value)} style={{background:TH.card2,border:"1px solid "+TH.border,color:TH.text,padding:"4px",borderRadius:12,fontSize:9}}><option>EN</option><option>FR</option><option>YO</option><option>PI</option><option>SW</option></select><button onClick={()=>setShowGiftBox(true)} style={{background:TH.gold,width:32,height:32,borderRadius:16,border:"none"}}>🎁</button></div></header>
      <div style={{display:"flex",gap:6,padding:"8px",background:TH.card2,overflowX:"auto"}}>{fxRates.map(f=><div key={f.pair} style={{background:TH.card,border:"1px solid "+TH.border,padding:"6px 10px",borderRadius:12,minWidth:110}}><p style={{fontSize:8}}>{f.flag} {f.pair}</p><p style={{fontSize:10,fontWeight:900}}>{f.rate} {f.change}</p></div>)}{weather.map(w=><div key={w.city} style={{background:TH.card,border:"1px solid "+TH.border,padding:"6px 10px",borderRadius:12}}><p style={{fontSize:8}}>{w.flag} {w.city}</p><p style={{fontSize:10,fontWeight:900}}>{w.icon} {w.temp}</p></div>)}</div>
      <main style={{padding:12,maxWidth:480,margin:"0 auto",position:"relative"}}>
        <div style={{position:"absolute",inset:0,opacity:.05,pointerEvents:"none",background:"url(/logo-dark.png) center/60% no-repeat"}}></div>
        <div style={{position:"relative"}}>
          <div style={{background:TH.card,border:"2px solid "+TH.gold+"60",borderRadius:16,padding:12,marginBottom:12,position:"relative",overflow:"hidden"}}><img src="/logo-dark.png" alt="logo bg" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.08}}/><div style={{position:"relative"}}><h3 style={{fontWeight:900}}>Chat and Chill African Eye Standalone V5M • Logo Popup + FYP BG</h3><img src="/gallery/golden_african_eye_gift.webp" alt="African Eye" style={{width:"100%",height:180,objectFit:"cover",borderRadius:12,marginTop:8,border:"2px solid "+TH.gold}}/><p style={{fontSize:10,marginTop:6}}>Logo for popup and FYP scroll background after 3 fast scrolls inform calm down no rush 🧘 • Translation • FX • Weather • Gifter Badge More Gift LV{gifterLevel} XP{gifterXP}</p><button onClick={()=>sendGift(allGifts[0])} style={{marginTop:10,width:"100%",background:TH.gold,color:"#000",padding:"12px",borderRadius:12,border:"none",fontWeight:900}}>Send African Eye N5000 V5M Badge Up</button></div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>{boxes.map(b=><div key={b.id} style={{height:90,background:b.host?TH.gold:"#111",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}><span style={{fontSize:8,fontWeight:800}}>{b.name}</span><span style={{fontSize:7}}>👁️ {b.viewers}</span></div>)}</div>
          <div style={{background:TH.card,border:"1px solid "+TH.border,borderRadius:16,padding:12,marginTop:12}}>
            <p style={{fontSize:11,fontWeight:900}}>V5M Gifter Badge Upgrade More You Gift LV{gifterLevel} XP{gifterXP}</p>
            <div style={{height:8,background:TH.border,borderRadius:4,marginTop:6,overflow:"hidden"}}><div style={{width:(gifterXP%1000)/10+"%",height:"100%",background:linear-gradient(90deg,${TH.gold},${TH.gold2})}}></div></div>
            <p style={{fontSize:8,marginTop:4}}>Next LV{gifterLevel+1} at {(gifterLevel+1)*1000} XP • More you gift more badge upgrade</p>
          </div>
        </div>
      </main>
    </div>
  );
}
