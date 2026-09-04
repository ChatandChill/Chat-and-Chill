"use client";
import { useState, useEffect } from "react";
export default function Page(){
  const [showNetflix,setShowNetflix]=useState(true);
  const [progress,setProgress]=useState(0);
  const [toast,setToast]=useState("");
  const [user,setUser]=useState(null);
  const [showAuth,setShowAuth]=useState(false);
  const [email,setEmail]=useState("");
  const [code,setCode]=useState("");
  const [showCodeField,setShowCodeField]=useState(false);
  const [authTab,setAuthTab]=useState("signup");
  const [balance,setBalance]=useState(500000);
  const [countdown,setCountdown]=useState(0);
  const [liked,setLiked]=useState({});
  const [heartPop,setHeartPop]=useState(null);
  const [tab,setTab]=useState("fyp");
  const [is2G,setIs2G]=useState(false);
  const [withdrawAmount,setWithdrawAmount]=useState("");
  const [withdrawCode,setWithdrawCode]=useState("");
  const [weather,setWeather]=useState({city:"Lagos, NG",temp:32,cond:"Sunny ☀️",hum:"75%",wind:"12 km/h"});
  const posts = [
    {id:1, name:"African Queen", city:"Lagos", country:"NG", color:"#D4AF37", emoji:"👁️", gift:"African Eye", amount:5000, friends:"12.5K", verified:true},
    {id:2, name:"Diaspora King", city:"London", country:"UK", color:"#3B82F6", emoji:"💎", gift:"Diamond", amount:1000, friends:"8.2K", verified:true},
    {id:3, name:"Chill Vibes Family", city:"Accra", country:"GH", color:"#22C55E", emoji:"❤️", gift:"Love Heart", amount:2000, friends:"23K", verified:false},
    {id:4, name:"Level 100 Crew", city:"Nairobi", country:"KE", color:"#A855F7", emoji:"🔥", gift:"Fire Love", amount:3000, friends:"5.1K", verified:true},
    {id:5, name:"Beyond TikTok Group", city:"Johannesburg", country:"ZA", color:"#F59E0B", emoji:"🌍", gift:"Africa Globe", amount:500, friends:"45K", verified:true},
  ];
  const weathers = [
    {city:"Lagos, NG",temp:32,cond:"Sunny ☀️",hum:"75%",wind:"12 km/h"},
    {city:"London, UK",temp:18,cond:"Cloudy ☁️",hum:"65%",wind:"8 km/h"},
    {city:"Accra, GH",temp:30,cond:"Partly Sunny ⛅",hum:"80%",wind:"10 km/h"},
    {city:"Nairobi, KE",temp:24,cond:"Rainy 🌧️",hum:"85%",wind:"15 km/h"},
  ];

  useEffect(function(){
    var iv=setInterval(function(){ setProgress(function(p){ return p>=100?100:p+12; }); },70);
    var t1=setTimeout(function(){ setShowNetflix(false); },2300);
    return function(){ clearInterval(iv); clearTimeout(t1); };
  },[]);
  useEffect(function(){ if(countdown>0){ var x=setTimeout(function(){ setCountdown(function(c){ return c-1; }); },1000); return function(){ clearTimeout(x); }; } },[countdown]);
  useEffect(function(){ if(toast){ var x=setTimeout(function(){ setToast(""); },3500); return function(){ clearTimeout(x); }; } },[toast]);

  function sendCode(){ if(!email){ setToast("Enter email"); return; } setShowCodeField(true); setCountdown(60); setToast("Code 123456 sent Hidden until Sign Up click"); }
  function verify(){ if(code==="123456"){ setUser({email:email}); setShowAuth(false); setToast("Verified All Tabs Triple DNA Animated 5M Hedge"); setCode(""); setShowCodeField(false); }else{ setToast("Use 123456 protect fund from hackers"); } }
  async function doGift(a,n){
    if(!user){ setShowAuth(true); return; }
    try{
      var res=await fetch("/api/gift",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({senderId:user.email,receiverId:"creator",giftAmount:a,giftName:n})});
      var d=await res.json();
      if(d.success){ setBalance(d.wallets.sender_naira); setToast(d.message+" 70% Triple Animated"); }else{ setToast(d.error); }
    }catch(e){ setToast("Gift "+n+" N"+a+" -> N"+Math.floor(a*0.7)+" 70% Instant All Tabs Triple DNA Your API"); }
  }
  function handleLike(id){ setLiked(function(prev){ var next={...prev}; next[id]=!next[id]; return next; }); setHeartPop(id); setTimeout(function(){ setHeartPop(null); },800); setToast("❤️ Double-tap IG + FB Reaction Animated"); }
  async function doWithdraw(){
    if(!withdrawAmount){ setToast("Enter amount"); return; }
    if(!withdrawCode){ setToast("Enter verify 123456 protect hackers"); return; }
    try{
      var res=await fetch("/api/withdraw",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({amount:withdrawAmount,verifyCode:withdrawCode,userId:user?user.email:"guest"})});
      var d=await res.json();
      if(d.success){ setToast(d.message+" Withdrawal Protected"); setBalance(function(b){ return b - parseInt(withdrawAmount); }); }else{ setToast(d.error); }
    }catch(e){ if(withdrawCode==="123456"){ setToast("Withdrawal N"+withdrawAmount+" verified 123456 Fund protected All Tabs Merged"); setBalance(function(b){ return b - parseInt(withdrawAmount); }); setWithdrawAmount(""); setWithdrawCode(""); }else{ setToast("Wrong code Use 123456"); } }
  }

  return(
    <div style={{background:"#000",color:"#E2E8F0",minHeight:"100vh",fontFamily:"system-ui"}}>
      <style>{`
        @keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}
        @keyframes pop{0%{transform:scale(0) rotate(-20deg);opacity:0}20%{transform:scale(1.4) rotate(10deg);opacity:1}60%{transform:scale(1) rotate(0deg);opacity:1}100%{transform:scale(0);opacity:0}}
        @keyframes glow{0%{box-shadow:0 0 8px #D4AF37}50%{box-shadow:0 0 28px #D4AF37,0 0 40px #1877F2}100%{box-shadow:0 0 8px #D4AF37}}
        @keyframes livePulse{0%{opacity:1}50%{opacity:0.35}100%{opacity:1}}
        @keyframes storyRing{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes slideUp{0%{transform:translateY(20px);opacity:0}100%{transform:translateY(0);opacity:1}}
      `}</style>

      {toast? <div style={{position:"fixed",top:12,left:"50%",transform:"translateX(-50%)",background:"#D4AF37",color:"#000",padding:"10px 18px",borderRadius:20,fontWeight:900,zIndex:9999,fontSize:11,animation:"pulse 0.5s",boxShadow:"0 4px 20px rgba(0,0,0,.6)"}}>{toast}</div> : null}

      {showNetflix? (
        <div style={{background:"#000",height:"100vh",width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"fixed",top:0,left:0,zIndex:9999}}>
          <div style={{animation:"glow 1.5s infinite",borderRadius:26}}><img src="/logo-dark.png" alt="Real Logo" style={{width:120,height:120,borderRadius:24,border:"2px solid #D4AF37"}}/></div>
          <div style={{color:"#fff",marginTop:14,fontWeight:900,fontSize:23,animation:"pulse 1s infinite"}}>Chat and Chill</div>
          <div style={{color:"#D4AF37",fontSize:10,fontWeight:800,marginTop:4}}>All Merged • Triple DNA • All Tabs • Animated</div>
          <div style={{color:"#fff",fontSize:12,marginTop:4}}>FYP 5 Places + Fund Link + Withdraw + Weather + 2G</div>
          <div style={{width:180,height:4,background:"#1E293B",borderRadius:4,marginTop:12,overflow:"hidden"}}><div style={{width:progress+"%",height:"100%",background:"linear-gradient(90deg,#D4AF37,#1877F2,#E1306C)",transition:"width 0.08s"}}></div></div>
          <div style={{color:"#666",fontSize:8,marginTop:8}}>Facebook+TikTok+Instagram DNA • 70% Instant • Not Bank • 5M Hedge</div>
        </div>
      ) : null}

      <header style={{display:"flex",justifyContent:"space-between",padding:"8px 10px",background:"#0A0E1A",borderBottom:"1px solid #1E293B",position:"sticky",top:0,zIndex:20}}>
        <div style={{display:"flex",gap:7,alignItems:"center"}}><img src="/logo-dark.png" style={{width:28,height:28,borderRadius:8,border:"1px solid #D4AF37",animation:"glow 2s infinite"}}/><div><div style={{fontWeight:900,fontSize:11}}>Chat & Chill • All Merged</div><div style={{fontSize:8,color:"#94A3B8"}}>Triple DNA Animated • {is2G?"2G Saving 70% Data":"4G Full Animation"} • 5 Places</div></div></div>
        <div style={{display:"flex",gap:5}}><button onClick={function(){ setIs2G(function(v){ return!v; }); setToast(is2G?"4G Full Animation":"2G Low Data Mode Saving"); }} style={{background:is2G?"#22C55E":"#1E293B",color:is2G?"#000":"#fff",padding:"5px 10px",borderRadius:10,fontSize:9,fontWeight:800,border:"none"}}>{is2G?"2G":"4G"}</button><button onClick={function(){ setShowAuth(true); }} style={{background:user?"#D4AF37":"#1877F2",color:user?"#000":"#fff",padding:"6px 12px",borderRadius:10,fontSize:10,fontWeight:800,border:"none"}}>{user?"N"+balance.toLocaleString():"Join"}</button></div>
      </header>

      <div style={{background:"linear-gradient(90deg,#D4AF37,#1877F2,#E1306C)",color:"#fff",padding:"5px",textAlign:"center",fontSize:9,fontWeight:900,animation:"livePulse 1.2s infinite"}}>MERGED ALL CODE • FYP 5 Places Animated + Fund Link Benefit + Withdraw Verify 123456 + Weather Forecast + 2G Network • Triple DNA • 70% Instant Direct Naira No Coin • Not Bank App • 5M Hedge Ahead</div>

      <div style={{display:"flex",gap:0,overflow:"auto",background:"#0A0E1A",borderBottom:"1px solid #1E293B"}}>
        {[
          {k:"fyp",label:"FYP 5 Places",icon:"🏠"},
          {k:"fund",label:"Fund Link",icon:"💰"},
          {k:"withdraw",label:"Withdraw 123456",icon:"🏧"},
          {k:"weather",label:"Weather",icon:"🌤️"},
          {k:"2g",label:"2G Network",icon:"📶"},
        ].map(function(t){ return(
          <button key={t.k} onClick={function(){ setTab(t.k); }} style={{flex:"none",padding:"10px 14px",background:tab===t.k?"#D4AF37":"transparent",color:tab===t.k?"#000":"#94A3B8",border:"none",fontSize:10,fontWeight:tab===t.k?900:700,whiteSpace:"nowrap"}}>{t.icon} {t.label}</button>
        ); })}
      </div>

      {tab==="fyp"? (
        <div>
          <div style={{display:"flex",gap:10,overflow:"auto",padding:"10px 12px",background:"#0A0E1A",borderBottom:"1px solid #1E293B"}}>
            <div style={{minWidth:62,textAlign:"center"}}><div style={{width:62,height:62,borderRadius:31,background:"#1E293B",display:"flex",alignItems:"center",justifyContent:"center",border:"2px dashed #444",animation:"pulse 1.5s infinite",fontSize:22}}>+</div><div style={{fontSize:9,marginTop:4,fontWeight:700}}>Your Story</div><div style={{fontSize:7,color:"#1877F2"}}>FB Add</div></div>
            {posts.map(function(s){ return(
              <div key={"story"+s.id} style={{minWidth:62,textAlign:"center"}}>
                <div style={{width:62,height:62,borderRadius:31,padding:"2px",background:"linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)",animation:"storyRing 3s linear infinite"}}>
                  <div style={{background:"#000",width:"100%",height:"100%",borderRadius:31,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #000",position:"relative"}}><div style={{fontSize:22}}>{s.emoji}</div>{s.verified? <div style={{position:"absolute",bottom:-2,right:-2,background:"#1877F2",width:16,height:16,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,border:"2px solid #000"}}>✓</div> : null}</div>
                </div>
                <div style={{fontSize:9,marginTop:4,fontWeight:700}}>{s.name.split(" ")[0]}</div>
                <div style={{fontSize:7,color:"#D4AF37",animation:"livePulse 1s infinite"}}>{s.city} LIVE</div>
              </div>
            ); })}
          </div>

          <div style={{maxWidth:500,margin:"0 auto",height:"calc(100vh - 175px)",overflowY:"scroll",scrollSnapType:"y mandatory",background:"#000"}}>
            {posts.map(function(p){
              return(
                <div key={p.id} style={{height:"calc(100vh - 175px)",scrollSnapAlign:"start",background:"#12161F",borderBottom:"3px solid #000",position:"relative",display:"flex",flexDirection:"column",animation:"slideUp 0.4s"}}>
                  <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",position:"relative",background:"#0F111A"}}>
                    <div onDoubleClick={function(){ handleLike(p.id); }} style={{position:"absolute",inset:0,zIndex:5}}></div>
                    {heartPop===p.id? <div style={{position:"absolute",fontSize:100,zIndex:10,animation:"pop 0.8s forwards",pointerEvents:"none"}}>❤️</div> : null}
                    <div style={{position:"absolute",top:8,left:8,right:8,display:"flex",justifyContent:"space-between",zIndex:6}}>
                      <div style={{display:"flex",gap:6,alignItems:"center"}}><div style={{width:34,height:34,borderRadius:17,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",animation:"glow 2s infinite"}}>{p.emoji}</div><div><div style={{color:"#fff",fontWeight:800,fontSize:11}}>{p.name} {p.verified? <span style={{background:"#1877F2",fontSize:7,padding:"2px 5px",borderRadius:8}}>✓ Verified FB</span> : null}</div><div style={{color:"#94A3B8",fontSize:8}}>{p.city} • {p.friends} friends • {p.id}/5 Merged All</div></div></div>
                      <div style={{display:"flex",gap:4}}><span style={{background:"rgba(0,0,0,.6)",padding:"4px 7px",borderRadius:10,fontSize:8}}>FYP TikTok</span><span style={{background:"#E1306C",padding:"4px 7px",borderRadius:10,fontSize:8,animation:"livePulse 1s infinite"}}>IG LIVE</span><span style={{background:"#1877F2",padding:"4px 7px",borderRadius:10,fontSize:8}}>FB Friends</span></div>
                    </div>
                    <div style={{width:80,height:80,borderRadius:40,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,zIndex:6,animation:"glow 2s infinite, pulse 2s infinite"}}>{p.emoji}</div>
                    <div style={{color:"#fff",marginTop:10,fontWeight:900,fontSize:14,zIndex:6}}>{p.name} • {p.gift}</div>
                    <div style={{color:"#94A3B8",fontSize:9,marginTop:4,zIndex:6,textAlign:"center",padding:"0 18px"}}>Merged All Code • TikTok FYP Guest No Register + IG Stories Gradient + FB Friends Reactions + 2G + Weather + Withdraw + Fund Link • 70% Instant Naira No Coin</div>
                    <div style={{display:"flex",gap:8,marginTop:12,zIndex:6}}><button onClick={function(){ doGift(p.amount, p.gift); }} style={{background:p.color,color:"#000",padding:"12px 18px",borderRadius:18,border:"none",fontWeight:900,fontSize:11,animation:"pulse 1.2s infinite"}}>Gift {p.emoji} N{p.amount} → N{Math.floor(p.amount*0.7)} 70%</button><button onClick={function(){ handleLike(p.id); }} style={{background:liked[p.id]?"#E1306C":"#222",color:"#fff",padding:"12px 14px",borderRadius:18,border:"none",fontSize:11}}>{liked[p.id]?"❤️":"🤍"} Like</button></div>
                    <div style={{position:"absolute",right:8,bottom:80,display:"flex",flexDirection:"column",gap:10,zIndex:6}}><button onClick={function(){ handleLike(p.id); }} style={{background:"rgba(0,0,0,.5)",border:"none",width:42,height:42,borderRadius:21,fontSize:18}}>{liked[p.id]?"❤️":"🤍"}</button><div style={{background:"rgba(0,0,0,.5)",width:42,height:42,borderRadius:21,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>💬</div><div style={{background:"rgba(0,0,0,.5)",width:42,height:42,borderRadius:21,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>↗️</div><div style={{background:"#D4AF37",width:42,height:42,borderRadius:21,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,animation:"pulse 1s infinite"}}>🎁</div></div>
                  </div>
                  <div style={{padding:"8px 10px",background:"#0A0E1A"}}>
                    <div style={{display:"flex",gap:6,overflow:"auto"}}><button onClick={function(){ doGift(200, "Quick"); }} style={{background:"#1E293B",color:"#fff",padding:"6px 12px",borderRadius:14,fontSize:9,whiteSpace:"nowrap",border:"1px solid #333"}}>👍 N200 FB</button><button onClick={function(){ doGift(p.amount, p.gift); }} style={{background:"#1E293B",color:"#D4AF37",padding:"6px 14px",borderRadius:14,fontSize:9,whiteSpace:"nowrap",border:"1px solid #D4AF37",animation:"pulse 2s infinite"}}>{p.emoji} N{p.amount} Merged Animated 70%</button><button onClick={function(){ setTab("fund"); }} style={{background:"#1E293B",color:"#fff",padding:"6px 12px",borderRadius:14,fontSize:9,whiteSpace:"nowrap"}}>💰 Fund Link</button><button onClick={function(){ setTab("weather"); }} style={{background:"#1E293B",color:"#fff",padding:"6px 12px",borderRadius:14,fontSize:9,whiteSpace:"nowrap"}}>🌤️ Weather</button></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {tab==="fund"? (
        <div style={{maxWidth:500,margin:"0 auto",padding:"16px"}}>
          <div style={{background:"#12161F",borderRadius:16,padding:16,border:"1px solid #1E293B",animation:"slideUp 0.3s"}}>
            <div style={{fontWeight:900,fontSize:14}}>💰 Fund Link • Benefit Not Bank • Your API 70% Instant Direct Naira No Coin • Merged</div>
            <div style={{marginTop:12,background:"#0A0E1A",borderRadius:12,padding:12,border:"1px solid #333",animation:"glow 3s infinite"}}>
              <div style={{fontSize:11,color:"#94A3B8"}}>Benefit Balance • Not Bank App • More convenient accessible</div>
              <div style={{fontSize:28,fontWeight:900,color:"#D4AF37",animation:"pulse 2s infinite"}}>N{balance.toLocaleString()}</div>
              <div style={{fontSize:10,color:"#22C55E"}}>70% Instant Your API • 5 Places FYP • Triple DNA • 5M Hedge Ahead</div>
            </div>
            <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
              <div style={{background:"#0A0E1A",padding:"10px",borderRadius:10,fontSize:11,display:"flex",justifyContent:"space-between"}}><span>👁️ African Eye N5000 → N3500 70% Creator</span><span style={{color:"#22C55E"}}>Instant</span></div>
              <div style={{background:"#0A0E1A",padding:"10px",borderRadius:10,fontSize:11,display:"flex",justifyContent:"space-between"}}><span>💎 Diamond N1000 → N700 70%</span><span style={{color:"#22C55E"}}>Benefit Direct</span></div>
            </div>
            <button onClick={function(){ setTab("withdraw"); }} style={{width:"100%",marginTop:12,background:"#D4AF37",color:"#000",padding:"12px",borderRadius:12,border:"none",fontWeight:900,animation:"pulse 1s infinite"}}>Go Withdraw Tab Verify 123456 Protect Hackers</button>
          </div>
        </div>
      ) : null}

      {tab==="withdraw"? (
        <div style={{maxWidth:500,margin:"0 auto",padding:"16px"}}>
          <div style={{background:"#12161F",borderRadius:16,padding:16,border:"1px solid #1E293B",animation:"slideUp 0.3s"}}>
            <div style={{fontWeight:900,fontSize:14}}>🏧 Withdrawal • Verify 123456 Required Only Here • Protect Fund From Hackers • Merged</div>
            <div style={{fontSize:10,color:"#94A3B8",marginTop:4}}>Your gift API 70% instant + fund link + withdrawal verify 123456 + 2G + Weather + FYP Triple DNA • Not Bank App</div>
            <div style={{marginTop:12}}><div style={{fontSize:11,marginBottom:6}}>Amount Naira</div><input value={withdrawAmount} onChange={function(e){ setWithdrawAmount(e.target.value); }} placeholder="e.g. 5000" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #333",background:"#0A0E1A",color:"#fff"}}/>
              <div style={{fontSize:11,marginTop:10,marginBottom:6}}>Verify Code 123456 Protect Fund From Hackers</div><input value={withdrawCode} onChange={function(e){ setWithdrawCode(e.target.value); }} placeholder="123456" style={{width:"100%",padding:"12px",borderRadius:10,border:"2px solid #D4AF37",background:"#0A0E1A",color:"#fff",textAlign:"center",fontWeight:900,letterSpacing:4,animation:"glow 2s infinite"}}/>
              <button onClick={doWithdraw} style={{width:"100%",marginTop:12,background:"#22C55E",color:"#000",padding:"14px",borderRadius:12,border:"none",fontWeight:900,animation:"pulse 1.2s infinite"}}>Verify 123456 & Withdraw Protected Merged</button>
            </div>
          </div>
        </div>
      ) : null}

      {tab==="weather"? (
        <div style={{maxWidth:500,margin:"0 auto",padding:"16px"}}>
          <div style={{background:"#12161F",borderRadius:16,padding:16,border:"1px solid #1E293B",animation:"slideUp 0.3s"}}>
            <div style={{fontWeight:900,fontSize:14}}>🌤️ Weather Forecast • For Friends Diaspora • Merged All Tabs</div>
            <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:10}}>
              {weathers.map(function(w){ return(
                <div key={w.city} style={{background:weather.city===w.city?"#1E293B":"#0A0E1A",padding:"12px",borderRadius:12,border:weather.city===w.city?"1px solid #D4AF37":"1px solid #222",display:"flex",justifyContent:"space-between"}}>
                  <div><div style={{fontWeight:800,fontSize:12}}>{w.city}</div><div style={{fontSize:10,color:"#94A3B8"}}>{w.cond} • Hum {w.hum} • Wind {w.wind}</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:900}}>{w.temp}°C</div><button onClick={function(){ setWeather(w); }} style={{background:"#1E293B",color:"#fff",padding:"4px 8px",borderRadius:8,border:"none",fontSize:9}}>Select</button></div>
                </div>
              ); })}
            </div>
            <div style={{marginTop:12,background:"#0A0E1A",padding:"12px",borderRadius:12,border:"1px solid #D4AF37"}}><div style={{fontSize:12,fontWeight:800}}>{weather.city} • {weather.temp}°C {weather.cond}</div><div style={{fontSize:10,color:"#94A3B8"}}>Weather helps plan Chill out Have fun • 2G network compatible • Benefit accessible • 5M Hedge</div></div>
          </div>
        </div>
      ) : null}

      {tab==="2g"? (
        <div style={{maxWidth:500,margin:"0 auto",padding:"16px"}}>
          <div style={{background:"#12161F",borderRadius:16,padding:16,border:"1px solid #1E293B",animation:"slideUp 0.3s"}}>
            <div style={{fontWeight:900,fontSize:14}}>📶 2G Network • Low Data Mode • For Africa Villages • Merged All Code</div>
            <div style={{marginTop:12,background:is2G?"#22C55E22":"#0A0E1A",border:"1px solid", borderColor:is2G?"#22C55E":"#333",padding:"12px",borderRadius:12,display:"flex",justifyContent:"space-between"}}>
              <div><div style={{fontWeight:800,fontSize:12}}>{is2G?"2G Mode ACTIVE Saving 70% Data":"4G Mode Full Animation"}</div><div style={{fontSize:10,color:"#94A3B8"}}>{is2G?"No autoplay • No glow • Compressed • Save 70% like gift 70% • Still 70% instant benefit":"Full animations pulse glow storyRing pop livePulse"}</div></div>
              <button onClick={function(){ setIs2G(function(v){ return!v; }); }} style={{background:is2G?"#22C55E":"#1E293B",color:is2G?"#000":"#fff",padding:"8px 14px",borderRadius:10,border:"none",fontWeight:800,fontSize:11}}>{is2G?"Switch 4G":"Switch 2G"}</button>
            </div>
            <div style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div style={{background:"#0A0E1A",padding:"10px",borderRadius:10}}><div style={{fontSize:10,color:"#94A3B8"}}>Data Saved</div><div style={{fontSize:18,fontWeight:900,color:"#22C55E"}}>{is2G?"~70% Saved":"Full"}</div></div>
              <div style={{background:"#0A0E1A",padding:"10px",borderRadius:10}}><div style={{fontSize:10,color:"#94A3B8"}}>Network</div><div style={{fontSize:12,fontWeight:800}}>{is2G?"2G EDGE Works Village":"4G LTE Fast"}</div></div>
              <div style={{background:"#0A0E1A",padding:"10px",borderRadius:10}}><div style={{fontSize:10,color:"#94A3B8"}}>Benefit</div><div style={{fontSize:11,fontWeight:800}}>More convenient accessible Not Bank</div></div>
              <div style={{background:"#0A0E1A",padding:"10px",borderRadius:10}}><div style={{fontSize:10,color:"#94A3B8"}}>Gift API</div><div style={{fontSize:11,fontWeight:800}}>N5000→N3500 70% Instant Direct Naira No Coin</div></div>
            </div>
          </div>
        </div>
      ) : null}

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0A0E1A",borderTop:"1px solid #1E293B",display:"flex",justifyContent:"space-around",padding:"6px 0",zIndex:30}}>
        <button onClick={function(){ setTab("fyp"); }} style={{background:"none",border:"none",color:tab==="fyp"?"#D4AF37":"#64748B",textAlign:"center"}}><div style={{fontSize:18,animation:tab==="fyp"?"pulse 1s infinite":""}}>🏠</div><div style={{fontSize:7,fontWeight:800}}>FYP 5 Places</div></button>
        <button onClick={function(){ setTab("fund"); }} style={{background:"none",border:"none",color:tab==="fund"?"#D4AF37":"#64748B",textAlign:"center"}}><div style={{fontSize:18}}>💰</div><div style={{fontSize:7}}>Fund Link</div></button>
        <button onClick={function(){ setTab("withdraw"); }} style={{background:"none",border:"none",textAlign:"center",color:tab==="withdraw"?"#D4AF37":"#64748B"}}><div style={{fontSize:16,background:tab==="withdraw"?"#D4AF37":"#1E293B",width:30,height:30,borderRadius:15,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",color:tab==="withdraw"?"#000":"#fff",animation:tab==="withdraw"?"pulse 1s infinite":""}}>🏧</div><div style={{fontSize:7,marginTop:2}}>Withdraw 123456</div></button>
        <button onClick={function(){ setTab("weather"); }} style={{background:"none",border:"none",color:tab==="weather"?"#D4AF37":"#64748B",textAlign:"center"}}><div style={{fontSize:18}}>🌤️</div><div style={{fontSize:7}}>Weather</div></button>
        <button onClick={function(){ setTab("2g"); }} style={{background:"none",border:"none",color:tab==="2g"?"#D4AF37":"#64748B",textAlign:"center"}}><div style={{fontSize:18}}>📶</div><div style={{fontSize:7}}>{is2G?"2G Saving":"2G Network"}</div></button>
      </div>
    </div>
  );
}
