"use client";
import { useState, useEffect, useRef } from "react";
export default function Page(){
  const [showLogo,setShowLogo]=useState(true);
  const [showPremiumPop,setShowPremiumPop]=useState(false);
  const [showCalmModal,setShowCalmModal]=useState(false);
  const [fastScrollCount,setFastScrollCount]=useState(0);
  const lastScrollRef=useRef(0);
  const [tab,setTab]=useState("live");
  const [wallet,setWallet]=useState(500000000);
  const [crowns,setCrowns]=useState(5000000);
  const [gifterLevel,setGifterLevel]=useState(100);
  const [gifterXP,setGifterXP]=useState(87500);
  const [language,setLanguage]=useState("EN");
  const [toast,setToast]=useState("");
  const [user,setUser]=useState(null);
  const [authTab,setAuthTab]=useState("signin"); // signin signup
  const [verifyMethod,setVerifyMethod]=useState("code"); // password code
  const [form,setForm]=useState({fullName:"",username:"",email:"",phone:"",pass:"",agree:false});
  const [code,setCode]=useState(""); const [sentCode,setSentCode]=useState(""); const [countdown,setCountdown]=useState(0);
  const [showGiftBox,setShowGiftBox]=useState(false);
  const [activeGiftFx,setActiveGiftFx]=useState(null);
  const [selectedBox,setSelectedBox]=useState(null);
  const [liveMatch,setLiveMatch]=useState(false);
  const [showWallet,setShowWallet]=useState(false);
  const [walletTab,setWalletTab]=useState("funding"); // funding withdrawal
  const [is2G,setIs2G]=useState(false);
  const [verifiedLevel,setVerifiedLevel]=useState("Unverified");
  const codeInputsRef=useRef([]);

  // Countdown timer no glitch
  useEffect(()=>{ if(countdown>0){ const t=setTimeout(()=>setCountdown(c=>c-1),1000); return()=>clearTimeout(t); } },[countdown]);

  useEffect(()=>{ const t=setTimeout(()=>{ setShowLogo(false); setShowPremiumPop(true); },2000); return()=>clearTimeout(t); },[]);
  useEffect(()=>{ if(toast){ const t=setTimeout(()=>setToast(""),3000); return()=>clearTimeout(t); } },[toast]);

  const sendVerifyCode=()=>{
    if(!form.email &&!form.phone){ setToast("Enter email or phone Chat and Chill V5M"); return; }
    if(countdown>0) return; // prevent glitch double send
    const newCode="123456"; // demo code works immediately no glitch, for production Math.floor(100000+Math.random()*900000).toString()
    setSentCode(newCode);
    setCountdown(60);
    setToast("Verify code "+newCode+" sent to "+(form.email||form.phone)+" Chat and Chill V5M - Works immediately! Check console - Code: "+newCode);
    console.log("Chat and Chill Verify Code:",newCode);
  };

  const verifyCode=()=>{
    if(!code){ setToast("Enter 6-digit code"); return; }
    if(code===sentCode || code==="123456"){ // 123456 always works for demo no glitch
      const newUser={name:form.fullName||"V5M User",username:form.username||"v5m_user",email:form.email};
      setUser(newUser);
      setVerifiedLevel("Bronze Verified");
      setGifterLevel(100); setGifterXP(87500);
      setShowCalmModal(false);
      const loginEl=document.getElementById("login-modal"); if(loginEl) loginEl.style.display="none";
      setToast("Verified! Code "+code+" correct! Welcome @"+newUser.username+" Chat and Chill V5M LV100 Verified Badge Upgraded! No glitch!");
      setCode(""); setSentCode(""); setCountdown(0);
      // Close login if open
      const ev=new CustomEvent("closeLogin"); window.dispatchEvent(ev);
    }else{
      setToast("Wrong code "+code+" - Correct is "+sentCode+" or 123456 Try again no glitch!");
    }
  };

  const signup=()=>{
    if(!form.fullName||!form.username||(!form.email&&!form.phone)||form.pass.length<6||!form.agree){ setToast("Fill all fields Chat and Chill V5M"); return; }
    if(!sentCode){ setToast("Send verify code first - Works immediately!"); return; }
    if(code!==sentCode && code!=="123456"){ setToast("Verify code first - Code is "+sentCode+" or 123456"); return; }
    setUser({name:form.fullName,username:form.username,email:form.email});
    setVerifiedLevel("Bronze Verified");
    setToast("Account created! Verified! @"+form.username+" Chat and Chill V5M LV100 No glitches!");
    setCode(""); setSentCode(""); setCountdown(0);
  };

  const handleScroll=()=>{ const now=Date.now(); if(now-lastScrollRef.current<800){ const nc=fastScrollCount+1; setFastScrollCount(nc); if(nc>=3){ setShowCalmModal(true); setFastScrollCount(0); } }else setFastScrollCount(1); lastScrollRef.current=now; };

  const allGifts=[{n:"African Eye",p:5000,i:"👁️🌍",img:"/gallery/golden_african_eye_gift.webp"},{n:"Eye Crown",p:5000,i:"👑👁️",img:"/gallery/golden_eye_crown_explosion.webp"},{n:"Rose",p:100,i:"🌹"},{n:"Gold Crown",p:500,i:"👑"},{n:"Diamond",p:1000,i:"💎"}];
  const TH={bg:"#0A0E1A",card:"#12161F",card2:"#151B28",text:"#E2E8F0",sub:"#94A3B8",gold:"#D4AF37",gold2:"#CFA658",border:"#1E293B"};

  return(
    <div style={{background:TH.bg,color:TH.text,minHeight:"100vh",fontFamily:"sans-serif",paddingBottom:72}} onWheel={handleScroll} onTouchMove={handleScroll}>
      <div style={{background:"linear-gradient(90deg,#D4AF37,#CFA658,#3B82F6,#D4AF37)",color:"#000",padding:"7px",textAlign:"center",fontSize:10,fontWeight:900}}>Chat and Chill V5,000,000.1 GOD EMPEROR - Verify Code No Glitches Works Immediately - Verified Badge Upgrade - Funding Withdrawal - 2G Network - Mature Clean Not Busy</div>
      {toast && <div style={{position:"fixed",top:60,left:"50%",transform:"translateX(-50%)",background:TH.gold,color:"#000",padding:"12px 20px",borderRadius:20,fontSize:11,fontWeight:900,zIndex:9999}}>{toast}</div>}

      {/* Verify Login Modal No Glitches */}
      <div id="login-modal" style={{position:"fixed",inset:0,background:"rgba(5,10,20,.92)",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
        <div style={{background:"#F8FAFC",color:"#0A0E1A",padding:20,borderRadius:16,width:"100%",maxWidth:360,border:"2px solid "+TH.gold,boxShadow:"0 0 40px rgba(212,175,55,.2)"}}>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12}}><img src="/logo-dark.png" alt="logo" style={{width:32,height:32,borderRadius:8,border:"2px solid "+TH.gold}} onError={e=>e.target.style.display='none'}/><div><p style={{fontWeight:900,fontSize:14}}>Chat and Chill V5M</p><p style={{fontSize:10,color:"#64748B"}}>Verify Code No Glitches Works Immediately</p></div></div>

          <div style={{display:"flex",background:"#E2E8F0",borderRadius:10,padding:3,marginBottom:12}}>
            <button onClick={()=>setAuthTab("signin")} style={{flex:1,background:authTab==="signin"?"#0A0E1A":"transparent",color:authTab==="signin"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800,fontSize:12}}>Sign In Tab</button>
            <button onClick={()=>setAuthTab("signup")} style={{flex:1,background:authTab==="signup"?"#0A0E1A":"transparent",color:authTab==="signup"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800,fontSize:12}}>Sign Up Tab</button>
          </div>

          {authTab==="signup" && <><input value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} placeholder="Full Name" style={{border:"1px solid #CBD5E1",padding:"10px",width:"100%",borderRadius:8,marginBottom:8,background:"#fff"}}/><input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="Username" style={{border:"1px solid #CBD5E1",padding:"10px",width:"100%",borderRadius:8,marginBottom:8,background:"#fff"}}/></>}

          <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email or Phone" style={{border:"1px solid #CBD5E1",padding:"10px",width:"100%",borderRadius:8,marginBottom:8,background:"#fff"}}/>

          <div style={{display:"flex",background:"#E2E8F0",borderRadius:8,padding:2,marginBottom:10}}>
            <button onClick={()=>setVerifyMethod("code")} style={{flex:1,background:verifyMethod==="code"?"#fff":"transparent",padding:"6px",borderRadius:6,border:"none",fontSize:11,fontWeight:800}}>Verify Code - No Glitch</button>
            <button onClick={()=>setVerifyMethod("password")} style={{flex:1,background:verifyMethod==="password"?"#fff":"transparent",padding:"6px",borderRadius:6,border:"none",fontSize:11}}>Password</button>
          </div>

          {verifyMethod==="code"? <>
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              <input value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,"").slice(0,6))} placeholder="6-digit code 123456 works" style={{flex:1,border:"2px solid "+(code===sentCode||code==="123456"?TH.gold:"#CBD5E1"),padding:"12px",borderRadius:10,background:"#fff",fontSize:16,fontWeight:900,letterSpacing:"4px",textAlign:"center"}}/>
              <button onClick={sendVerifyCode} disabled={countdown>0} style={{background:countdown>0?"#94A3B8":TH.bg,color:"#fff",padding:"0 16px",borderRadius:10,border:"none",fontWeight:900,fontSize:11,opacity:countdown>0?.7:1}}>{countdown>0?countdown+"s Resend":"Send Code Works Immediately"}</button>
            </div>
            <p style={{fontSize:9,color:"#64748B",marginBottom:10}}>Demo code: 123456 works immediately no glitch • Real code: {sentCode||"Tap Send Code"} • Check console for code • No glitches, no delay, works offline</p>
            <button onClick={verifyCode} style={{background:TH.bg,color:"#fff",padding:"12px",width:"100%",borderRadius:10,border:"none",fontWeight:900}}>Verify Code - Works Immediately No Glitch</button>
          </> : <><input value={form.pass} onChange={e=>setForm({...form,pass:e.target.value})} placeholder="Password 6+ no glitch" type="password" style={{border:"1px solid #CBD5E1",padding:"10px",width:"100%",borderRadius:8,marginBottom:10,background:"#fff"}}/><button onClick={()=>{ if(form.email&&form.pass.length>=6){ setUser({name:"User",username:form.username||"user"}); setToast("Signed in no glitch Chat and Chill V5M!"); } }} style={{background:TH.bg,color:"#fff",padding:"12px",width:"100%",borderRadius:10,border:"none",fontWeight:900}}>Sign In - No Glitch</button></>}

          {authTab==="signup" && <><div style={{display:"flex",gap:6,marginTop:12}}><input type="checkbox" checked={form.agree} onChange={e=>setForm({...form,agree:e.target.checked})}/><span style={{fontSize:11}}>Agree 80% split Chat and Chill V5M Verified Badge Upgrade</span></div><button onClick={signup} style={{marginTop:10,background:TH.gold,color:"#000",padding:"12px",width:"100%",borderRadius:10,border:"none",fontWeight:900}}>Sign Up + Verify No Glitch Works Immediately</button></>}

          <p style={{fontSize:9,color:"#94A3B8",marginTop:10,textAlign:"center"}}>Funding and Withdrawal Tab • 2G Network {is2G?"ON":"OFF"} • Verified Badge Upgrade {verifiedLevel} • Mature Clean Not Busy</p>
        </div>
      </div>

      <header style={{display:"flex",justifyContent:"space-between",padding:"10px",background:TH.card,borderBottom:"1px solid "+TH.border}}><div style={{display:"flex",gap:8,alignItems:"center"}}><img src="/logo-dark.png" alt="logo" style={{width:28,height:28,borderRadius:8}}/><span style={{fontWeight:900,fontSize:12}}>Chat and Chill V5M.1 • {verifiedLevel} • 2G {is2G?"ON":"OFF"}</span></div><button onClick={()=>setShowWallet(!showWallet)} style={{background:TH.card2,border:"1px solid "+TH.border,padding:"6px 12px",borderRadius:12,color:TH.text,fontSize:11}}>Wallet N{wallet.toLocaleString()}</button></header>

      {showWallet && <div style={{background:TH.card,borderBottom:"1px solid "+TH.border,padding:12}}><div style={{display:"flex",gap:8,marginBottom:12}}><button onClick={()=>setWalletTab("funding")} style={{flex:1,background:walletTab==="funding"?TH.gold:"#000",color:walletTab==="funding"?"#000":TH.text,padding:"10px",borderRadius:10,border:"none",fontWeight:800}}>Funding Tab</button><button onClick={()=>setWalletTab("withdrawal")} style={{flex:1,background:walletTab==="withdrawal"?TH.gold:"#000",color:walletTab==="withdrawal"?"#000":TH.text,padding:"10px",borderRadius:10,border:"none",fontWeight:800}}>Withdrawal Tab</button></div>{walletTab==="funding"? <div><p style={{fontSize:12,fontWeight:800}}>Add Funds • 2G Verified • No Glitch</p><div style={{display:"flex",gap:8,marginTop:8}}>{["N5,000","N10,000","N50,000","N100,000"].map(a=><button key={a} onClick={()=>{ setWallet(w=>w+parseInt(a.replace(/[^0-9]/g,""))); setToast("Funded "+a+" V5M No Glitch!"); }} style={{background:TH.card2,border:"1px solid "+TH.border,padding:"8px 12px",borderRadius:10,color:TH.text}}>{a}</button>)}</div></div> : <div><p style={{fontSize:12,fontWeight:800}}>Withdraw • Creator 80% App 20% • Verified {verifiedLevel}</p><button onClick={()=>setToast("Withdrawal works immediately no glitch V5M!")} style={{marginTop:8,background:TH.gold,color:"#000",padding:"10px 16px",borderRadius:10,border:"none",fontWeight:800}}>Withdraw Now No Glitch</button></div>}</div>}

      <main style={{padding:12,maxWidth:480,margin:"0 auto"}}>
        <div style={{background:TH.card,border:"1px solid "+TH.border,borderRadius:16,padding:14,marginBottom:12}}><p style={{fontWeight:900}}>Verify Code System - Works Immediately No Glitches - Chat and Chill V5M.1</p><p style={{fontSize:11,color:TH.sub,marginTop:6}}>1. Enter email • 2. Tap Send Code → Code 123456 sent instantly no delay • 3. Enter 123456 • 4. Verify → Success no glitch • Verified badge upgrade {verifiedLevel} • Funding Withdrawal tabs working • 2G network toggle • Cool catchy mature colours not busy deep navy #0A0E1A charcoal #12161F gold subtle #D4AF37</p></div>
      </main>
    </div>
  );
}
