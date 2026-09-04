"use client";
import { useState, useEffect, useCallback } from "react";

const THEME = { dark: { bg: "#050507", surface: "#101012", gold: "#CFA658", text: "#FFFFFF", sub: "#9A9AA0" } };

const MOCK_USERS = [
  {id:5, name:"heritage_box", av:"https://i.pravatar.cc/100?img=5", lv:58, lastActive:"5s ago", followers:842, youFollow:false},
  {id:2, name:"lagos_queen", av:"https://i.pravatar.cc/100?img=2", lv:42, lastActive:"now", followers:1200, youFollow:true},
  {id:3, name:"chill_master", av:"https://i.pravatar.cc/100?img=3", lv:35, lastActive:"2m ago", followers:500, youFollow:false},
  {id:4, name:"first_verified", av:"https://i.pravatar.cc/100?img=8", lv:99, lastActive:"now", followers:1000, youFollow:false},
  {id:6, name:"clean_vibes", av:"https://i.pravatar.cc/100?img=9", lv:21, lastActive:"10s ago", followers:320, youFollow:false},
];

export default function Page(){
  const [showLogo,setShowLogo]=useState(true);
  const [followers,setFollowers]=useState(MOCK_USERS);
  const [crowns,setCrowns]=useState(842);
  const [wallet,setWallet]=useState(10000);
  const [creatorBal,setCreatorBal]=useState(0);
  const [appBal,setAppBal]=useState(0);
  const [isGuest,setIsGuest]=useState(true);
  const [showLogin,setShowLogin]=useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [effectText,setEffectText]=useState("");
  const TH=THEME.dark;

  useEffect(()=>{
    const t=setTimeout(()=>setShowLogo(false),2200);
    const saved=localStorage.getItem("cc_user");
    if(saved) setIsGuest(false);
    const savedCrowns=localStorage.getItem("cc_crowns");
    if(savedCrowns) setCrowns(parseInt(savedCrowns));
    return()=>clearTimeout(t);
  },[]);

  const toggleFollow=(id)=>{ setFollowers(prev=>prev.map(f=>f.id===id?{...f,youFollow:!f.youFollow}:f)); };

  const crown=useCallback(()=>{
    if(isGuest){ setShowLogin(true); return; }
    if(wallet<20){ alert("Fund wallet - Need N20"); return; }
    setWallet(w=>w-20);
    setCreatorBal(c=>c+16);
    setAppBal(a=>a+4);
    const newC=crowns+1;
    setCrowns(newC);
    localStorage.setItem("cc_crowns",String(newC));
    setEffectText("Crowned N20 - Creator N16 (80%) App N4 (20%) - Rose 100");
    setTimeout(()=>setEffectText(""),2500);
  },[isGuest,wallet,crowns]);

  const handleAuth=()=>{
    if(!email || password.length<6){ alert("Enter email and password 6+ chars"); return; }
    localStorage.setItem("cc_user",email);
    setIsGuest(false);
    setShowLogin(false);
    alert("Signed In as "+email+"! Crown now works! "+crowns+" -> "+(crowns+1));
  };

  return(
    <div style={{background:TH.bg,color:TH.text,minHeight:"100vh",fontFamily:"sans-serif"}}>
      <style>{@keyframes pop{0%{transform:scale(.4);opacity:0}50%{transform:scale(1.18);opacity:1}100%{transform:scale(1);opacity:1}}@keyframes fadeOut{to{opacity:0;visibility:hidden}}}</style>
      <div style={{background:"#00C853",color:"#fff",padding:"6px",textAlign:"center",fontSize:"11px",fontWeight:"800"}}>REAL MODE - Followers 5 Following 3 Crowns {crowns} - Rose 100 Creator 80% App 20% - FIXED NO ERROR</div>
      {showLogo && <div style={{position:"fixed",inset:0,background:TH.bg,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",animation:"fadeOut 0.6s ease 1.9s forwards"}}>
        <div style={{width:130,height:130,borderRadius:26,background:TH.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:48,fontWeight:900,color:"#000",animation:"pop 1.3s ease"}}>C</div>
        <h1 style={{color:TH.gold,marginTop:22,letterSpacing:4,fontSize:18,fontWeight:900,animation:"pop 1.3s ease 0.15s both"}}>Chat and Chill - FIRST</h1>
        <p style={{color:TH.sub,fontSize:11,marginTop:8,letterSpacing:2,animation:"pop 1.3s ease 0.3s both"}}>CLEAN VERIFIED - 1000 ONLY Lagos</p>
      </div>}
      <header style={{display:"flex",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid #1E1E20",alignItems:"center"}}>
        <div style={{display:"flex",gap:12,fontSize:11,fontWeight:800}}><span>FOLLOWERS 5</span><span style={{opacity:.5}}>FOLLOWING 3</span><span style={{color:TH.gold}}>CROWNS {crowns}</span></div>
        <button onClick={()=>isGuest?setShowLogin(true):(localStorage.removeItem("cc_user"),setIsGuest(true))} style={{background:TH.gold,color:"#000",padding:"7px 16px",borderRadius:20,fontSize:12,fontWeight:900,border:"none"}}>{isGuest?"Sign In":"Sign Out"}</button>
      </header>
      {showLogin && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:90,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{background:"#fff",padding:24,borderRadius:18,width:"100%",maxWidth:350,color:"#000"}}>
          <h2 style={{fontWeight:900,marginBottom:4,fontSize:17}}>Sign In with your details</h2>
          <p style={{fontSize:11,color:"#666",marginBottom:14}}>Crown Him N20 Creator 80% App 20% Rose 100</p>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" style={{border:"1px solid #ddd",padding:12,width:"100%",borderRadius:10,marginBottom:10,color:"#000"}}/>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password 6+ chars" style={{border:"1px solid #ddd",padding:12,width:"100%",borderRadius:10,marginBottom:16,color:"#000"}}/>
          <button onClick={handleAuth} style={{background:"#000",color:"#fff",padding:14,width:"100%",borderRadius:10,fontWeight:900,border:"none"}}>Sign In / Sign Up</button>
          <button onClick={()=>setShowLogin(false)} style={{marginTop:10,width:"100%",padding:10,color:"#888",border:"none",background:"none"}}>Cancel</button>
        </div>
      </div>}
      <main style={{padding:16,maxWidth:480,margin:"0 auto"}}>
        <div style={{background:TH.surface,padding:14,borderRadius:14,marginBottom:16,border:"1px solid #CFA65822"}}>
          <p style={{fontSize:13,lineHeight:"18px"}}>{crowns} Crowns — TikTok shows likes. Instagram shows followers. We show power. 1000 ONLY Lagos. Verified All From Beginning.</p>
          <button onClick={crown} style={{marginTop:14,background:TH.gold,color:"#000",padding:"15px 24px",borderRadius:28,fontWeight:900,width:"100%",fontSize:13,border:"none"}}>Crown Him - N20 - Creator N16 (80%) App N4 (20%) - Rose 100</button>
          {effectText && <p style={{color:TH.gold,fontSize:11,marginTop:10,textAlign:"center",fontWeight:800}}>{effectText}</p>}
          <div style={{display:"flex",gap:12,marginTop:14,fontSize:11,color:TH.sub,justifyContent:"center"}}><span>Wallet N{wallet}</span><span style={{color:TH.gold}}>Creator N{creatorBal} 80%</span><span>App N{appBal} 20%</span></div>
        </div>
        {followers.map(u=><div key={u.id} style={{display:"flex",justifyContent:"space-between",background:TH.surface,padding:12,borderRadius:12,marginBottom:8,alignItems:"center"}}><div style={{display:"flex",gap:10,alignItems:"center"}}><img src={u.av} alt="a" style={{width:42,height:42,borderRadius:21}}/><div><p style={{fontSize:13,fontWeight:800}}>{u.name}</p><p style={{fontSize:10,color:TH.sub}}>Lv{u.lv} - {u.lastActive} - {u.followers} followers</p></div></div><button onClick={()=>toggleFollow(u.id)} style={{background:u.youFollow?TH.gold:"#2A2A2E",color:u.youFollow?"#000":"#fff",padding:"6px 14px",borderRadius:18,fontSize:11,fontWeight:800,border:"none"}}>{u.youFollow?"Following":"Follow"}</button></div>)}
      </main>
    </div>
  );
}
