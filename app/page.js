"use client";
import { useState, useEffect } from "react";

export default function Page(){
  const [showLogo,setShowLogo]=useState(true);
  const [showLogin,setShowLogin]=useState(false);
  const [isGuest,setIsGuest]=useState(true);
  const [crowns,setCrowns]=useState(842);
  const [wallet,setWallet]=useState(10000);
  const [creatorBal,setCreatorBal]=useState(0);
  const [appBal,setAppBal]=useState(0);
  const [effectText,setEffectText]=useState("");
  const [followers,setFollowers]=useState([
    {id:5,name:"heritage_box",lv:58,f:842,y:false},
    {id:2,name:"lagos_queen",lv:42,f:1200,y:true},
    {id:3,name:"chill_master",lv:35,f:500,y:false},
    {id:4,name:"first_verified",lv:99,f:1000,y:false},
    {id:6,name:"clean_vibes",lv:21,f:320,y:false},
  ]);

  useEffect(()=>{ const t=setTimeout(()=>setShowLogo(false),2200); return()=>clearTimeout(t); },[]);

  const crown=()=>{
    if(isGuest){ setShowLogin(true); return; }
    if(wallet<20){ alert("Need N20"); return; }
    setWallet(v=>v-20); setCreatorBal(v=>v+16); setAppBal(v=>v+4);
    setCrowns(v=>v+1);
    setEffectText("Crowned N20 - Creator N16 80% App N4 20% - Rose 100");
    setTimeout(()=>setEffectText(""),2500);
  };

  return (
    <div style={{background:"#050507",color:"#fff",minHeight:"100vh",fontFamily:"sans-serif"}}>
      <style>{"@keyframes pop{0%{transform:scale(.4);opacity:0}50%{transform:scale(1.2);opacity:1}100%{transform:scale(1);opacity:1}} @keyframes fadeOut{to{opacity:0;visibility:hidden}}"}</style>
      <div style={{background:"#00C853",color:"#fff",padding:"6px",textAlign:"center",fontSize:11,fontWeight:800}}>LAUNCH TODAY - Followers 5 Following 3 Crowns {crowns} - Rose 100 Creator 80% App 20% - BUILD FIXED</div>
      {showLogo && (
        <div style={{position:"fixed",inset:0,background:"#050507",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
          <div style={{width:120,height:120,background:"#CFA658",borderRadius:24,display:"flex",alignItems:"center",justifyContent:"center",fontSize:48,fontWeight:900,color:"#000"}}>C</div>
          <h1 style={{color:"#CFA658",marginTop:20,letterSpacing:3}}>Chat and Chill - FIRST</h1>
          <p style={{color:"#888",fontSize:11,marginTop:8,letterSpacing:2}}>CLEAN VERIFIED - 1000 ONLY Lagos</p>
        </div>
      )}
      <header style={{display:"flex",justifyContent:"space-between",padding:12,borderBottom:"1px solid #222"}}>
        <span style={{fontSize:11,fontWeight:800}}>FOLLOWERS 5 | FOLLOWING 3 | CROWNS {crowns}</span>
        <button onClick={()=>isGuest?setShowLogin(true):setIsGuest(true)} style={{background:"#CFA658",color:"#000",padding:"6px 12px",borderRadius:20,border:"none",fontWeight:900,fontSize:12}}>{isGuest?"Sign In":"Sign Out"}</button>
      </header>
      {showLogin && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.9)",zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"#fff",color:"#000",padding:20,borderRadius:16,width:"100%",maxWidth:320}}>
            <h3 style={{fontWeight:900}}>Sign In with your details</h3>
            <p style={{fontSize:11,color:"#666",margin:"8px 0"}}>Crown Him N20 Creator 80% App 20% Rose 100 Verified</p>
            <input placeholder="Your email" style={{border:"1px solid #ddd",padding:10,width:"100%",borderRadius:8,marginBottom:8}}/>
            <input placeholder="Password" type="password" style={{border:"1px solid #ddd",padding:10,width:"100%",borderRadius:8,marginBottom:12}}/>
            <button onClick={()=>{setIsGuest(false);setShowLogin(false);}} style={{background:"#000",color:"#fff",padding:12,width:"100%",borderRadius:8,border:"none",fontWeight:900}}>Sign In / Sign Up</button>
            <button onClick={()=>setShowLogin(false)} style={{marginTop:8,width:"100%",border:"none",background:"none",color:"#888"}}>Cancel</button>
          </div>
        </div>
      )}
      <main style={{padding:16,maxWidth:480,margin:"0 auto"}}>
        <div style={{background:"#101012",padding:14,borderRadius:12,marginBottom:16}}>
          <p style={{fontSize:13}}>{crowns} Crowns - TikTok shows likes. Instagram shows followers. We show power. 1000 ONLY Lagos. 842 Active</p>
          <button onClick={crown} style={{marginTop:12,background:"#CFA658",color:"#000",padding:14,width:"100%",borderRadius:28,border:"none",fontWeight:900}}>Crown Him - N20 - Creator N16 (80%) App N4 (20%) - Rose 100</button>
          {effectText && <p style={{color:"#CFA658",fontSize:11,marginTop:8,textAlign:"center",fontWeight:800}}>{effectText}</p>}
          <div style={{display:"flex",gap:12,marginTop:12,fontSize:11,color:"#888",justifyContent:"center"}}><span>Wallet N{wallet}</span><span style={{color:"#CFA658"}}>Creator N{creatorBal} 80%</span><span>App N{appBal} 20%</span></div>
        </div>
        {followers.map(u=>(
          <div key={u.id} style={{display:"flex",justifyContent:"space-between",background:"#101012",padding:12,borderRadius:12,marginBottom:8}}>
            <div><p style={{fontSize:13,fontWeight:800}}>{u.name}</p><p style={{fontSize:10,color:"#888"}}>Lv{u.lv} - {u.f} followers</p></div>
            <button onClick={()=>setFollowers(p=>p.map(x=>x.id===u.id?{...x,y:!x.y}:x))} style={{background:u.y?"#CFA658":"#2A2A2E",color:u.y?"#000":"#fff",padding:"6px 14px",borderRadius:18,border:"none",fontSize:11,fontWeight:800}}>{u.y?"Following":"Follow"}</button>
          </div>
        ))}
      </main>
    </div>
  );
}
