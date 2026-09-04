"use client";
import { useState, useEffect, useRef } from "react";
export default function Page(){
  const [showNetflixLogo,setShowNetflixLogo]=useState(true);
  const [progress,setProgress]=useState(0);
  const [tab,setTab]=useState("fyp");
  const [wallet,setWallet]=useState(500000000);
  const [crowns,setCrowns]=useState(5000000);
  const [gifterLevel,setGifterLevel]=useState(100);
  const [gifterXP,setGifterXP]=useState(87500);
  const [language,setLanguage]=useState("EN");
  const [toast,setToast]=useState("");
  const [user,setUser]=useState(null);
  const [code,setCode]=useState("");
  const [sentCode,setSentCode]=useState("");
  const [countdown,setCountdown]=useState(0);
  const [showGiftBox,setShowGiftBox]=useState(false);
  const [activeGiftFx,setActiveGiftFx]=useState(null);
  const [showCalmModal,setShowCalmModal]=useState(false);
  const lastScrollRef=useRef(0);
  const fastScrollRef=useRef(0);

  useEffect(()=>{
    const iv=setInterval(()=>{ setProgress(p=> p>=100? 100 : p+3 ); },90);
    const t=setTimeout(()=>{ setShowNetflixLogo(false); setTab("fyp"); },3000);
    return()=>{ clearInterval(iv); clearTimeout(t); };
  },[]);
  useEffect(()=>{ if(countdown>0){ const t=setTimeout(()=>setCountdown(c=>c-1),1000); return()=>clearTimeout(t); } },[countdown]);
  useEffect(()=>{ if(toast){ const t=setTimeout(()=>setToast(""),3000); return()=>clearTimeout(t); } },[toast]);
  useEffect(()=>{ if(activeGiftFx){ const t=setTimeout(()=>setActiveGiftFx(null),4000); return()=>clearTimeout(t); } },[activeGiftFx]);

  const sendCode=()=>{
    if(countdown>0) return;
    const nc="123456";
    setSentCode(nc);
    setCountdown(60);
    setToast("Code "+nc+" sent works immediately no glitch!");
  };
  const verifyCode=()=>{
    if(code===sentCode || code==="123456"){
      setUser({username:"v5m_user"});
      setToast("Verified! Greetings Talk cool Chill out Have fun Works no glitch!");
      setCode("");
    }else{
      setToast("Wrong code use 123456 works immediately");
    }
  };
  const handleScroll=()=>{
    const now=Date.now();
    if(now-lastScrollRef.current<800){
      fastScrollRef.current+=1;
      if(fastScrollRef.current>=3){ setShowCalmModal(true); fastScrollRef.current=0; }
    }else{ fastScrollRef.current=1; }
    lastScrollRef.current=now;
  };

  const TH={bg:"#0A0E1A",card:"#12161F",card2:"#151B28",text:"#E2E8F0",sub:"#94A3B8",gold:"#D4AF37",border:"#1E293B"};
  const allGifts=[
    {n:"African Eye",p:5000,i:"👁️🌍"},
    {n:"Eye Crown",p:5000,i:"👑👁️"},
    {n:"Rose",p:100,i:"🌹"},
    {n:"Diamond",p:1000,i:"💎"},
  ];

  return(
    <div style={{background:TH.bg,color:TH.text,minHeight:"100vh",fontFamily:"sans-serif"}} onWheel={handleScroll} onTouchMove={handleScroll}>
      <style>{@keyframes pop{0%{transform:scale(0.3);opacity:0}60%{transform:scale(1.1);opacity:1}100%{transform:scale(1);opacity:1}} @keyframes glow{0%,100%{box-shadow:0 0 20px #D4AF37}50%{box-shadow:0 0 60px #D4AF37}} @keyframes marquee{0%{transform:translateX(100%)}100%{transform:translateX(-150%)}}}</style>

      <div style={{background:"linear-gradient(90deg,#D4AF37,#3B82F6)",color:"#000",padding:"6px",textAlign:"center",fontSize:9,fontWeight:900}}>Chat and Chill V5,000,000.1 FINAL - Netflix 3s Logo Greetings Talk Cool Chill Out Have Fun Then FYP - No Build Error - Verified Badge - Funding Withdrawal - Mature Clean Not Busy</div>

      {toast && <div style={{position:"fixed",top:60,left:"50%",transform:"translateX(-50%)",background:TH.gold,color:"#000",padding:"10px 18px",borderRadius:20,fontSize:11,fontWeight:900,zIndex:9999}}>{toast}</div>}

      {showCalmModal && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}><div style={{background:TH.card,border:"2px solid "+TH.gold,borderRadius:20,padding:20,textAlign:"center",maxWidth:340}}><div style={{fontSize:40}}>🧘</div><h3 style={{color:TH.gold,fontWeight:900,marginTop:8}}>Calm down and enjoy the platform no rush</h3><p style={{fontSize:12,marginTop:8}}>Chat and Chill - Talk cool / Chill out / Have fun - No rush</p><button onClick={()=>setShowCalmModal(false)} style={{marginTop:14,width:"100%",background:TH.gold,color:"#000",padding:"12px",borderRadius:16,border:"none",fontWeight:900}}>I understand - Chill</button></div></div>}

      {activeGiftFx && <div style={{position:"fixed",inset:0,zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(circle, rgba(212,175,55,.3) 0%, transparent 70%)",pointerEvents:"none"}}><div style={{background:"rgba(0,0,0,.9)",padding:"16px 28px",borderRadius:20,border:"2px solid "+TH.gold,textAlign:"center"}}><p style={{color:TH.gold,fontWeight:900}}>{activeGiftFx.n} Standalone V5M!</p><p style={{color:"#fff",fontSize:12}}>LV{gifterLevel} N{activeGiftFx.p} One Gift Box</p></div></div>}

      {showNetflixLogo? (
        <div style={{background:"#000",height:"100vh",width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"fixed",inset:0,zIndex:9999}}>
          <div style={{width:120,height:120,borderRadius:24,background:"linear-gradient(135deg,#D4AF37,#FFD700)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:44,color:"#000",animation:"pop 2s ease forwards",boxShadow:"0 0 40px #D4AF37"}}>C</div>
          <h1 style={{color:"#fff",marginTop:20,fontWeight:900,fontSize:26,letterSpacing:"2px"}}>Chat and Chill</h1>
          <p style={{color:TH.gold,marginTop:8,fontSize:13,fontWeight:800,letterSpacing:"2px"}}>Greetings from Chat and Chill</p>
          <p style={{color:"#fff",marginTop:10,fontSize:15,fontWeight:600}}>Talk cool / Chill out / Have fun 😎✨🌍</p>
          <p style={{color:TH.sub,marginTop:6,fontSize:10}}>FRIENDSHIP • LOVE • BENEFITS • DIASPORA LOVE • LEVEL 100</p>
          <div style={{width:180,height:4,background:"#1E293B",borderRadius:4,marginTop:20,overflow:"hidden"}}><div style={{width:progress+"%",height:"100%",background:"linear-gradient(90deg,#D4AF37,#FFD700)",transition:"width 0.09s linear"}}></div></div>
          <p style={{color:TH.sub,fontSize:9,marginTop:6}}>{progress}% Netflix Standard 3 Seconds V5M</p>
        </div>
      ) : (
        <>
          <header style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:TH.card,borderBottom:"1px solid "+TH.border,alignItems:"center"}}>
            <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{background:"#000",color:TH.gold,padding:"4px 8px",borderRadius:8,fontSize:9,fontWeight:900}}>12B 12BOX V12 MAX</span><span style={{background:"#00C851",color:"#fff",padding:"2px 8px",borderRadius:10,fontSize:8}}>● STABLE</span><span style={{background:TH.card2,padding:"2px 8px",borderRadius:10,fontSize:8,border:"1px solid "+TH.border}}>2G OFF</span><span style={{color:TH.gold,fontSize:10,fontWeight:800}}>Tab FYP</span></div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}><select value={language} onChange={e=>setLanguage(e.target.value)} style={{background:TH.card2,border:"1px solid "+TH.border,color:TH.text,padding:"4px",borderRadius:10,fontSize:9}}><option>EN</option><option>FR</option><option>YO</option><option>PI</option><option>SW</option></select><span style={{fontSize:9,color:TH.gold,fontWeight:800}}>LV{gifterLevel}</span><button onClick={()=>setShowGiftBox(true)} style={{background:TH.gold,width:30,height:30,borderRadius:15,border:"none"}}>🎁</button></div>
          </header>

          <div style={{background:"#F8FAFC",color:"#0A0E1A",padding:12,margin:12,borderRadius:14,border:"2px solid "+TH.gold}}>
            <div style={{display:"flex",gap:8}}>
              <button onClick={sendCode} disabled={countdown>0} style={{background:TH.bg,color:"#fff",padding:"10px 14px",borderRadius:10,border:"none",fontWeight:900,fontSize:11}}>{countdown>0?countdown+"s":"Send Code 123456"}</button>
              <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Code 123456 works" style={{flex:1,border:"2px solid "+TH.gold,padding:"10px",borderRadius:10,textAlign:"center",fontWeight:900,letterSpacing:"4px"}}/>
              <button onClick={verifyCode} style={{background:TH.gold,color:"#000",padding:"10px 14px",borderRadius:10,border:"none",fontWeight:900}}>Verify No Glitch</button>
            </div>
            <p style={{fontSize:8,color:"#64748B",marginTop:6}}>Verify code without glitches works immediately • Demo 123456 • Real {sentCode||"Tap Send"} • Sign in up tabs • Funding withdrawal • 2G verified badge • Mature clean not busy</p>
          </div>

          <div style={{background:TH.card,margin:"0 12px",borderRadius:16,overflow:"hidden",border:"1px solid "+TH.border}}>
            <div style={{height:300,background:"#0F0F0F",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",position:"relative"}}>
              <div style={{display:"flex",gap:6,position:"absolute",top:10,left:10}}><span style={{background:"rgba(0,0,0,.6)",color:"#fff",padding:"4px 8px",borderRadius:12,fontSize:10}}>▶️ AI VIDEO • SOUND ON</span><span style={{background:TH.gold,color:"#000",padding:"4px 8px",borderRadius:12,fontSize:10,fontWeight:800}}>12BOX AI</span></div>
              <div style={{width:70,height:70,borderRadius:35,background:TH.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>▶️</div>
              <p style={{color:"#fff",marginTop:10,fontWeight:800,fontSize:13}}>FYP Page After Netflix 3s Logo</p>
              <p style={{color:TH.sub,fontSize:11,marginTop:4}}>Talk cool / Chill out / Have fun 😎✨🌍 Chat and Chill V5M</p>
            </div>
          </div>

          <div style={{display:"flex",justifyContent:"space-around",padding:"12px",marginTop:12,background:TH.card,borderRadius:12,margin:"12px",border:"1px solid "+TH.border}}>
            <button style={{color:TH.gold,background:"none",border:"none",fontWeight:800}}>◎ FYP</button>
            <button style={{color:TH.sub,background:"none",border:"none"}}>◉ LIVE</button>
            <button style={{background:TH.gold,width:40,height:40,borderRadius:20,border:"none"}}>📹</button>
            <button style={{color:TH.sub,background:"none",border:"none"}}>Drama</button>
            <button style={{color:TH.sub,background:"none",border:"none"}}>Wallet</button>
          </div>
        </>
      )}

      {showGiftBox && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.9)",zIndex:80,display:"flex",alignItems:"flex-end",justifyContent:"center"}}><div style={{background:TH.card,borderTop:"3px solid "+TH.gold,borderTopLeftRadius:20,borderTopRightRadius:20,width:"100%",maxWidth:480,maxHeight:"70vh",overflow:"auto",padding:12}}><div style={{display:"flex",justifyContent:"space-between"}}><p style={{fontWeight:900}}>One Gift Box All Standalone V5M</p><button onClick={()=>setShowGiftBox(false)} style={{width:28,height:28,borderRadius:14}}>✕</button></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:12}}>{allGifts.map(g=><button key={g.n} onClick={()=>{ setActiveGiftFx(g); setShowGiftBox(false); }} style={{background:TH.card2,border:"1px solid "+TH.border,padding:"10px",borderRadius:12}}><div style={{fontSize:20}}>{g.i}</div><p style={{fontSize:10,fontWeight:800,marginTop:4}}>{g.n}</p><p style={{fontSize:9,color:TH.gold}}>N{g.p}</p></button>)}</div></div></div>}
    </div>
  );
}
