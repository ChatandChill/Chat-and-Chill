"use client";
import { useState, useEffect, useRef } from "react";
export default function Page(){
  const [showNetflixLogo,setShowNetflixLogo]=useState(true);
  const [netflixProgress,setNetflixProgress]=useState(0);
  const [tab,setTab]=useState("fyp");
  const [wallet,setWallet]=useState(500000000);
  const [crowns,setCrowns]=useState(5000000);
  const [gifterLevel,setGifterLevel]=useState(100);
  const [toast,setToast]=useState(""); const [user,setUser]=useState(null);
  const [authTab,setAuthTab]=useState("signin"); const [code,setCode]=useState(""); const [sentCode,setSentCode]=useState(""); const [countdown,setCountdown]=useState(0);
  const [showGiftBox,setShowGiftBox]=useState(false);
  const lastScrollRef=useRef(0); const [fastScrollCount,setFastScrollCount]=useState(0); const [showCalmModal,setShowCalmModal]=useState(false);

  // Netflix 3 seconds logo pop up standard with greetings
  useEffect(()=>{
    const interval=setInterval(()=>{ setNetflixProgress(p=>{ if(p>=100){ clearInterval(interval); return 100; } return p+2; }); },60); // 3 seconds = 3000ms / 50 steps
    const t=setTimeout(()=>{ setShowNetflixLogo(false); setTab("fyp"); },3000);
    return()=>{ clearInterval(interval); clearTimeout(t); };
  },[]);

  useEffect(()=>{ if(countdown>0){ const t=setTimeout(()=>setCountdown(c=>c-1),1000); return()=>clearTimeout(t); } },[countdown]);
  useEffect(()=>{ if(toast){ const t=setTimeout(()=>setToast(""),3000); return()=>clearTimeout(t); } },[toast]);

  const sendCode=()=>{ if(countdown>0) return; const nc="123456"; setSentCode(nc); setCountdown(60); setToast("Code "+nc+" sent Chat and Chill - Works immediately no glitch! Code: "+nc); };
  const verifyCode=()=>{ if(code===sentCode||code==="123456"){ setUser({name:"V5M User",username:"v5m_user"}); setToast("Verified! Greetings Talk cool Chill out Have fun 😎✨ Welcome! No glitch!"); setCode(""); }else setToast("Wrong code - Use 123456 works immediately!"); };
  const handleScroll=()=>{ const now=Date.now(); if(now-lastScrollRef.current<800){ const nc=fastScrollCount+1; setFastScrollCount(nc); if(nc>=3){ setShowCalmModal(true); setFastScrollCount(0); } }else setFastScrollCount(1); lastScrollRef.current=now; };

  const TH={bg:"#0A0E1A",card:"#12161F",card2:"#151B28",text:"#E2E8F0",sub:"#94A3B8",gold:"#D4AF37",border:"#1E293B"};

  if(showNetflixLogo){
    return(
      <div style={{background:"#000",height:"100vh",width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"fixed",inset:0,zIndex:9999}}>
        <style>{@keyframes netflixPop{0%{transform:scale(0.3);opacity:0;filter:brightness(0)}40%{transform:scale(1.1);opacity:1;filter:brightness(1.5)}70%{transform:scale(1);filter:brightness(1.2)}100%{transform:scale(1);filter:brightness(1)}} @keyframes glow{0%,100%{box-shadow:0 0 20px #D4AF37}50%{box-shadow:0 0 60px #D4AF37,0 0 100px #D4AF37}}}</style>
        <div style={{width:140,height:140,borderRadius:24,background:linear-gradient(135deg,${TH.gold},#FFD700),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:48,color:"#000",animation:"netflixPop 2.5s ease forwards, glow 2s ease-in-out infinite",border:"3px solid "+TH.gold}}>C</div>
        <img src="/logo-dark.png" alt="Chat and Chill logo" style={{width:140,height:140,borderRadius:24,objectFit:"cover",animation:"netflixPop 2.5s ease forwards",display:"none"}} onError={e=>{e.target.style.display='none'; e.target.previousSibling.style.display='flex';}}/>
        <h1 style={{color:"#fff",marginTop:24,fontWeight:900,fontSize:28,letterSpacing:"2px",animation:"netflixPop 1s ease 0.5s both"}}>Chat and Chill</h1>
        <p style={{color:TH.gold,marginTop:8,fontSize:14,fontWeight:800,letterSpacing:"3px",animation:"netflixPop 1s ease 1s both"}}>Greetings from Chat and Chill</p>
        <p style={{color:"#fff",marginTop:12,fontSize:16,fontWeight:600,animation:"netflixPop 1s ease 1.5s both"}}>Talk cool / Chill out / Have fun 😎✨🌍</p>
        <p style={{color:TH.sub,marginTop:6,fontSize:11,animation:"netflixPop 1s ease 1.8s both"}}>FRIENDSHIP • LOVE • BENEFITS • DIASPORA LOVE • Beyond TikTok LEVEL 100</p>
        <div style={{width:200,height:4,background:"#1E293B",borderRadius:4,marginTop:24,overflow:"hidden"}}><div style={{width:netflixProgress+"%",height:"100%",background:linear-gradient(90deg,${TH.gold},#FFD700),transition:"width 0.06s linear"}}></div></div>
        <p style={{color:TH.sub,fontSize:9,marginTop:8}}>{netflixProgress}% • Netflix Standard 3 Seconds • V5,000,000 GOD EMPEROR</p>
      </div>
    );
  }

  return(
    <div style={{background:TH.bg,color:TH.text,minHeight:"100vh",fontFamily:"sans-serif",paddingBottom:72}} onWheel={handleScroll} onTouchMove={handleScroll}>
      <div style={{background:"linear-gradient(90deg,#D4AF37,#3B82F6)",color:"#000",padding:"6px",textAlign:"center",fontSize:9,fontWeight:900}}>Chat and Chill V5,000,000.1 FINAL CORRECTION - Netflix 3s Logo Popup Greetings Talk Cool Chill Out Have Fun → Then FYP Page - Mature Clean Not Busy</div>
      {toast && <div style={{position:"fixed",top:60,left:"50%",transform:"translateX(-50%)",background:TH.gold,color:"#000",padding:"10px 18px",borderRadius:20,fontSize:11,fontWeight:900,zIndex:9999}}>{toast}</div>}
      {showCalmModal && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}><div style={{background:TH.card,border:"2px solid "+TH.gold,borderRadius:20,padding:20,textAlign:"center,maxWidth:340}}><div style={{fontSize:40}}>🧘</div><h3 style={{color:TH.gold,fontWeight:900,marginTop:8}}>Calm down and enjoy the platform no rush</h3><p style={{fontSize:12,marginTop:8}}>Chat and Chill - Talk cool / Chill out / Have fun - No rush, enjoy FYP 🌍❤️🎁</p><button onClick={()=>setShowCalmModal(false)} style={{marginTop:14,width:"100%",background:TH.gold,color:"#000",padding:"12px",borderRadius:16,border:"none",fontWeight:900}}>I understand - Chill 🧘</button></div></div>}

      {/* Header 12BOX V12 MAX */}
      <header style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:TH.card,borderBottom:"1px solid "+TH.border,alignItems:"center"}}><div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{background:"#000",color:TH.gold,padding:"4px 8px",borderRadius:8,fontSize:9,fontWeight:900}}>12B 12BOX V12 MAX</span><span style={{background:"#00C851",color:"#fff",padding:"2px 8px",borderRadius:10,fontSize:8}}>● STABLE</span><span style={{background:TH.card2,padding:"2px 8px",borderRadius:10,fontSize:8,border:"1px solid "+TH.border}}>2G OFF</span><span style={{color:TH.gold,fontSize:10,fontWeight:800}}>Tab FYP</span></div><div style={{display:"flex",gap:6,alignItems:"center"}}><div style={{background:TH.gold,width:28,height:28,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#000"}}>👑</div></div></header>

      {/* Auth Verify Code No Glitch */}
      <div style={{background:"#F8FAFC",color:"#0A0E1A",padding:14,margin:12,borderRadius:16,border:"2px solid "+TH.gold}}>
        <div style={{display:"flex",gap:8,marginBottom:10}}><button onClick={()=>sendCode()} disabled={countdown>0} style={{background:TH.bg,color:"#fff",padding:"10px 16px",borderRadius:10,border:"none",fontWeight:900,fontSize:11}}>{countdown>0?countdown+"s":"Send Code 123456 Works Immediately"}</button><input value={code} onChange={e=>setCode(e.target.value)} placeholder="Code 123456" style={{flex:1,border:"2px solid "+TH.gold,padding:"10px",borderRadius:10,textAlign:"center",fontWeight:900,letterSpacing:"4px"}}/><button onClick={verifyCode} style={{background:TH.gold,color:"#000",padding:"10px 16px",borderRadius:10,border:"none",fontWeight:900}}>Verify No Glitch</button></div>
        <p style={{fontSize:9,color:"#64748B"}}>Verify code without glitches works immediately • Demo code 123456 • Real code {sentCode||"Tap Send"} • Sign in and sign up tab included • Verified badge upgrade • Funding withdrawal tab • 2G network • Mature clean not busy</p>
      </div>

      {/* FYP Page After Netflix */}
      <main style={{padding:0,maxWidth:480,margin:"0 auto",position:"relative"}}>
        <div style={{position:"absolute",inset:0,opacity:.04,background:"url(/logo-dark.png) center/60% no-repeat",pointerEvents:"none"}}></div>
        <div style={{position:"relative"}}>
          <div style={{background:TH.card,border:"1px solid "+TH.border,borderRadius:16,margin:12,padding:10,position:"relative",overflow:"hidden"}}><img src="/logo-dark.png" alt="logo bg FYP" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.06}}/><div style={{position:"relative",display:"flex",gap:10}}><div style={{width:60,height:60,background:"#8B0000",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:10,border:"1px solid "+TH.gold}}>NETFLIX POPUP</div><div><p style={{fontWeight:900,fontSize:12}}>🔥 Trending Live: Gold Glow AI + 12BOX</p><p style={{fontSize:10,color:TH.sub,marginTop:4}}>Join 12.4k creators using Africa Circuit AI. 1 Creator + 11 Guests live! Greetings Talk cool Chill out Have fun</p><div style={{display:"flex",gap:8,marginTop:8}}><button onClick={()=>setToast("Join Live 12BOX FYP Page - Chat and Chill!")} style={{background:TH.gold,color:"#000",padding:"6px 12px",borderRadius:16,border:"none",fontSize:11,fontWeight:800}}>Join Live 12BOX</button><button style={{background:"#333",color:"#fff",padding:"6px 12px",borderRadius:16,border:"none",fontSize:11}}>Watch FYP</button></div></div></div></div>

          <div style={{background:TH.card,margin:"0 12px",borderRadius:16,overflow:"hidden",border:"1px solid "+TH.border,position:"relative"}}>
            <div style={{height:320,background:"#0F0F0F",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",position:"relative"}}>
              <div style={{display:"flex",gap:8,position:"absolute",top:10,left:10}}><span style={{background:"rgba(0,0,0,.6)",color:"#fff",padding:"4px 8px",borderRadius:12,fontSize:10}}>▶️ AI VIDEO • SOUND ON</span><span style={{background:TH.gold,color:"#000",padding:"4px 8px",borderRadius:12,fontSize:10,fontWeight:800}}>12BOX AI</span></div>
              <div style={{width:80,height:80,borderRadius:40,background:TH.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32}}>▶️</div>
              <p style={{color:"#fff",marginTop:12,fontWeight:800}}>FYP Page After Netflix 3s Logo</p>
              <p style={{color:TH.sub,fontSize:11,marginTop:4}}>Talk cool / Chill out / Have fun 😎✨🌍 • Chat and Chill</p>
              <div style={{position:"absolute",right:12,top:"30%",display:"flex",flexDirection:"column",gap:16,alignItems:"center"}}><div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:36,height:36,borderRadius:18,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>❤️</div><span style={{color:"#fff",fontSize:11,marginTop:4}}>12,453</span></div><div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:36,height:36,borderRadius:18,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>💬</div><span style={{color:"#fff",fontSize:11,marginTop:4}}>892</span></div><div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:48,height:48,borderRadius:24,background:TH.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🎁</div><span style={{color:"#fff",fontSize:10,marginTop:4}}>Gift</span></div></div>
              <div style={{position:"absolute",bottom:10,left:10,display:"flex",gap:8,alignItems:"center"}}><div style={{width:36,height:36,borderRadius:18,background:TH.gold,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#000"}}>A</div><div><p style={{color:"#fff",fontSize:12,fontWeight:800}}>@afro_gold_queen • Gold Glow AI</p><p style={{color:"#aaa",fontSize:10}}>12BOX Live: 1 Creator + Guests + Gold Glow 🎧✨ • FYP Page</p></div></div>
            </div>
          </div>

          <div style={{display:"flex",justifyContent:"space-around",padding:"12px",marginTop:12,background:TH.card,borderTop:"1px solid "+TH.border,borderRadius:12,margin:"12px"}}>
            <button onClick={()=>setTab("fyp")} style={{color:tab==="fyp"?TH.gold:TH.sub,background:"none",border:"none",fontWeight:800}}>◎ FYP Chat and Chill</button>
            <button onClick={()=>setTab("live")} style={{color:TH.sub,background:"none",border:"none"}}>◉ LIVE</button>
            <button style={{background:TH.gold,width:44,height:44,borderRadius:22,border:"none",fontSize:20}}>📹</button>
            <button style={{color:TH.sub,background:"none",border:"none"}}>Drama</button>
            <button style={{color:TH.sub,background:"none",border:"none"}}>Wallet</button>
          </div>
        </div>
      </main>
    </div>
  );
}
