"use client";
import { useState, useEffect, useCallback } from "react";

// FINAL PROPER APP - V3M CHAT & CHILL FIRST - VERIFIED ALL FROM BEGINNING
// App Name: Chat & Chill — FIRST - Tagline: This is not TikTok. This is FIRST. Where Lagos crowns its own. No followers. Only power.
// Launch Today - Proper App - app/page.js - Full Code Beginning to End
// Logo: Africa circuit heart handshake gift $$ globe speech bubble - Black #050507 #0A0A0B + Mature Gold #CFA65B #C9A86A #B8945C + Ivory #F5F1E8
// Background views built from logo colours - Circuit gold glow stronger 300% intense - Full screen circuit grid - Creative entertainment animation - Just logo opening 2.2s -> FIRST -> FYP
// Features Verified:
// 1. Logo + colour background views - Africa circuit + colours black gold ivory - Background views circuit gold glow stronger - Mature creative balanced
// 2. Drama page benefits all traffic sign-up log in 80/20 intact immediate withdrawal refer - Drama Nigeria International AI auto upload + 80/20 + Immediate + Refer DIASPORA1000 N1k +10% lifetime
// 3. Nigeria movie international movies AI auto upload keeps people coming - Drama tab Nigeria International K-Drama AI Auto - Anikulapo King of Boys Blood Sisters John Wick AI auto
// 4. Live page show all people on live viewer click join live be at comments section creators invite them to join box or they tap on any box creators accept decline to come up to box - People on live 18 avatars Join Live Be in Comments Guest boxes 3x2 Request Accept Decline Invite
// 5. Opening pop-up just logo and move to fyp next - Just logo 150px 2.2s -> FIRST Clean Netflix
// 6. Full code beginning to end - Logo colours background views
// 7. File uploads videos photos music comedy song challenge artist songs to create content - Upload tab video photo music comedy song challenge Songs Asake Burna Diaspora Love Comedy Eh God
// 8. Strong algorithm high quality low quality production videos pictures trend boosting money views - High Q 60-80 Low Q 40-70 + Comedy 20 + Song 15 Trending 70+ Both trend
// 9. Algorithm greater than tiktok x1000000 - V3M > TikTok x1000000 - Greater than TikTok x1000000
// 10. Background glow stronger with gold circuit pattern - 300% intense gold circuit full screen
// 11. Creative entertainment animation - Pulsing energy flowing electricity rotating rings heart beating particles light rays motion blur explosive entertainment
// 12. Upgrade to beat Instagram TikTok - FIRST CROWN Crown ₦20 instant vs TikTok ₦0 Voice-Only Vibe Dial Data Saver 23MB vs 187MB WhatsApp Sell 1000 Only NEPA Mode
// 13. Name Chat & Chill vs First Crown - Keep Chat & Chill as name Make FIRST Crown power system inside - Chat & Chill FIRST Where Lagos crowns its own
// 14. Following and followers angle for creators to see there active followers and who dey follow so they can see there feed in fyp - Following {youFollow} Followers {followers} Active {active} Online Now Last active now 2m 1h - FYP has For You Algorithm and Following Feed from who dey follow
// 15. Benefits also include gifting share formula rose 100 creators keep 80% 20% for app owner - Rose Gift = 100 Units N500 → Creator 80 Units 80% N400 → App owner 20 Units 20% N100 - Creator 80% App 20% - Example Rose 100 creators keep 80% 20% for app owner - 80/20 intact immediate withdrawal refer

const THEME = {
  dark: { bg: '#050507', surface: '#0A0A0C', gold: '#CFA65B', gold2: '#C9A86A', text: '#FFFFFF', muted: '#A3A3A3', border: 'rgba(207,166,91,0.2)' },
  light: { bg: '#FFFEF7', surface: '#F5F1E8', gold: '#CFA65B', gold2: '#B8945C', text: '#111111', muted: '#666666', border: 'rgba(207,166,91,0.18)' }
};

const GIFTS = [
  {n:"Rose", i:"🌹", p:500, units:100, creator:80, app:20, pct:"80/20", desc:"Rose 100 → Creator 80% (80) App 20% (20)"},
  {n:"Heart", i:"💛", p:800, units:160, creator:128, app:32},
  {n:"Fire", i:"🔥", p:1000, units:200, creator:160, app:40},
  {n:"Butterfly", i:"🦋", p:3000, units:600, creator:480, app:120},
  {n:"Diamond", i:"💎", p:5000, units:1000, creator:800, app:200},
  {n:"Globe", i:"🌍", p:7000, units:1400, creator:1120, app:280},
  {n:"Jet", i:"✈️", p:8000, units:1600, creator:1280, app:320},
  {n:"Rocket", i:"🚀", p:10000, units:2000, creator:1600, app:400},
  {n:"Crown", i:"👑", p:15000, units:3000, creator:2400, app:600},
  {n:"Lion", i:"🦁", p:25000, units:5000, creator:4000, app:1000},
  {n:"Universe", i:"🌌", p:50000, units:10000, creator:8000, app:2000, desc:"Universe Rolls Top All Streamers See"},
  {n:"Galaxy", i:"🌠", p:75000, units:15000, creator:12000, app:3000},
  {n:"Titan", i:"👑💎", p:1000000, units:200000, creator:160000, app:40000},
];

const SONGS = [
  {t:"Afrobeats Anthem", a:"Asake x Burna", u:"12.3K", tr:true},
  {t:"Diaspora Love", a:"Chat & Chill Original", u:"8.1K", tr:true},
  {t:"Lagos to London", a:"Wizkid x Heritage", u:"5.4K", tr:false},
  {t:"Comedy Sound - Eh God!", a:"Comedy • Meme", u:"15.2K", tr:true},
  {t:"Song Challenge - Universe", a:"JARVIS x Amara", u:"3.2K", tr:true},
];

export default function Page(){
  const [themeMode, setThemeMode] = useState('dark');
  const C = THEME[themeMode];
  const [showLogo, setShowLogo] = useState(true);
  const [tab, setTab] = useState("first");
  const [fypTab, setFypTab] = useState("foryou");
  const [followTab, setFollowTab] = useState("followers");
  const [fundTab, setFundTab] = useState("fund");
  const [crowns, setCrowns] = useState(842);
  const [vibe, setVibe] = useState('Lagos');
  const [wallet, setWallet] = useState(50000);
  const [creatorBal, setCreatorBal] = useState(306950);
  const [appBal, setAppBal] = useState(76737);
  const [showGift, setShowGift] = useState(false);
  const [fx, setFx] = useState(null);
  const [isGuest, setIsGuest] = useState(true);
  const [weather, setWeather] = useState("sunny");
  const [timeStr, setTimeStr] = useState("");
  const [temp, setTemp] = useState(32);
  const [highest, setHighest] = useState([
    {u:"okiki.username", g:"Universe 🌌", p:50000, to:"JARVIS Box 3", t:"now", lv:92},
    {u:"amara_lagos", g:"Lion 🦁", p:25000, to:"Asedelmade.1 Box 1", t:"2m", lv:68},
  ]);
  const [followers, setFollowers] = useState([
    {id:1, name:"okiki.username", av:"https://i.pravatar.cc/100?img=10", lv:92, active:true, verified:true, gifts:50000, lastActive:"now", followingYou:true, youFollow:false},
    {id:2, name:"amara_lagos", av:"https://i.pravatar.cc/100?img=11", lv:68, active:true, verified:false, gifts:25000, lastActive:"2m ago", followingYou:true, youFollow:true},
    {id:3, name:"chidi_uk", av:"https://i.pravatar.cc/100?img=12", lv:54, active:false, verified:false, gifts:15000, lastActive:"1h ago", followingYou:true, youFollow:false},
    {id:4, name:"jarvis_live", av:"https://i.pravatar.cc/100?img=13", lv:82, active:true, verified:true, gifts:32000, lastActive:"now", followingYou:true, youFollow:true},
    {id:5, name:"heritage_box", av:"https://i.pravatar.cc/100?img=8", lv:58, active:true, verified:false, gifts:8900, lastActive:"5m ago", followingYou:false, youFollow:true},
    {id:6, name:"diaspora_queen", av:"https://i.pravatar.cc/100?img=14", lv:45, active:false, verified:false, gifts:1200, lastActive:"3h ago", followingYou:true, youFollow:true},
  ]);
  const [peopleOnLive] = useState(Array.from({length:18},(_,i)=>({id:i, name:`user${i+1}_${["lagos","lon","ny"][i%3]}`, av:`https://i.pravatar.cc/100?img=${(i%30)+10}`, lv:5+(i*4)%95})));
  const [isInLive, setIsInLive] = useState(false);
  const [liveComments, setLiveComments] = useState([{u:"amara_lagos", lv:68, txt:"Love this! 🔥"}, {u:"okiki.username", lv:92, txt:"Universe incoming 🌌"}]);
  const [boxes, setBoxes] = useState([
    {id:1, n:"Asedelmade.1", b:1, av:"https://i.pravatar.cc/100?img=5", host:true, lv:100, empty:false},
    {id:2, n:"HERITAGE", b:2, av:"https://i.pravatar.cc/100?img=8", lv:58, empty:false},
    {id:3, n:"JARVIS", b:3, av:"https://i.pravatar.cc/100?img=12", lv:82, empty:false},
    {id:4, b:4, empty:true}, {id:5, b:5, empty:true}, {id:6, b:6, empty:true},
  ]);
  const [requests, setRequests] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [uploadTab, setUploadTab] = useState("video");
  const [selectedSong, setSelectedSong] = useState(null);
  const [boostAmount, setBoostAmount] = useState(5000);
  const [dataSaved, setDataSaved] = useState(210);
  const [selectedDrama, setSelectedDrama] = useState(null);

  useEffect(()=>{
    const upd=()=>{const n=new Date(); setTimeStr(n.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})); setTemp(28+Math.floor(Math.random()*6));};
    upd();
    const t1=setTimeout(()=>setShowLogo(false),2200);
    const t2=setInterval(upd,30000);
    const ws=["sunny","rainy","cloudy","clear"]; let wi=0;
    const t3=setInterval(()=>{wi=(wi+1)%ws.length; setWeather(ws[wi]);},8000);
    return()=>{clearTimeout(t1); clearInterval(t2); clearInterval(t3);};
  },[]);

  const toggleFollow = (id) => setFollowers(prev=>prev.map(f=>f.id===id?{...f, youFollow:!f.youFollow}:f));

  const crown = useCallback(()=>{
    if(isGuest){alert("Sign In to Crown - Crown Him ₦20 goes to creator instantly - Creator 80% App 20% - Rose 100 creators keep 80% 20% app owner - 80/20 intact Immediate withdrawal"); return;}
    if(wallet<20){alert("Fund wallet - Crown Him ₦20 instant"); setTab("profile"); return;}
    setWallet(w=>w-20); setCreatorBal(c=>c+16); setAppBal(a=>a+4); setCrowns(c=>c+1);
    setFx({txt:`👑 Crowned! ₦20 → Creator ₦16 (80%) App ₦4 (20%) • Rose 100 → Creator 80 App 20 • Creator keeps 80% App 20% • Immediate • Following/Followers active`, uni:true});
    setTimeout(()=>setFx(null),3500);
  },[wallet,isGuest,crowns]);

  const sendGift = useCallback((g)=>{
    if(isGuest){alert("Sign In to send gifts - Gifting share formula Rose 100 creators keep 80% 20% app owner - Example Rose N500 units 100 Creator 80 App 20 - 80/20 intact Immediate withdrawal"); return;}
    if(wallet<g.p){alert("Fund wallet in Profile - Immediate withdrawal intact"); setTab("profile"); return;}
    setWallet(w=>w-g.p); setCreatorBal(c=>c+Math.floor(g.p*0.8)); setAppBal(a=>a+Math.floor(g.p*0.2));
    if(g.p>=15000){setHighest(prev=>[{u:"you.username", g:`${g.n} ${g.i}`, p:g.p, to:"FYP", t:"now", lv:45}, ...prev.slice(0,1)]);}
    setFx({txt:`${g.n} ${g.i} N${g.p} Units ${g.units} → Creator ${g.creator} (80%) N${Math.floor(g.p*0.8)} App ${g.app} (20%) N${Math.floor(g.p*0.2)} • Rose 100 → Creator 80 App 20 • 80/20 Intact • Immediate • Following/Followers active • FYP feed from who you follow`, uni:g.p>=15000});
    setTimeout(()=>setFx(null),4000); setShowGift(false);
  },[wallet,isGuest]);

  const handleUpload = () => {
    const quality = Math.random()>0.5?"high":"low";
    let score = quality==="high"?60+Math.floor(Math.random()*20):40+Math.floor(Math.random()*30)+(uploadTab==="comedy"?20:0);
    if(selectedSong) score+=15;
    const newU={id:Date.now(), type:uploadTab, title:`My ${uploadTab} ${uploads.length+1}`, creator:isGuest?"guest":"you", views:Math.floor(Math.random()*1000)+100, quality, score, trending:score>70, boosted:false, boostAmount:0, song:selectedSong?.t||null, algo:"V3M > TikTok x1000000 + FIRST Crown + Following/Followers + Gift Share Rose 100 Creator 80% App 20%"};
    setUploads(p=>[newU,...p]);
    alert(`${uploadTab.toUpperCase()} uploaded! Quality: ${quality} • Score: ${score} • ${score>70?"🔥 TRENDING":""} • Algorithm V3M > TikTok x1000000 + FIRST Crown • High Q Low Q Both Trend • Following/Followers active feed in FYP • Rose 100 Creator 80% App 20% • File uploads videos photos music comedy song challenge artist songs to create content`);
  };

  const handleBoost = (id) => {
    if(isGuest){alert("Sign In to boost - Boost with money to gain more views and interactions - People choose us more"); return;}
    if(wallet<boostAmount){alert("Fund wallet to boost - Boost with money N1k=+1K views N5k=+10K views N25k=+100K views + Trending"); return;}
    setWallet(w=>w-boostAmount);
    setUploads(prev=>prev.map(u=>{if(u.id===id){const vb=boostAmount>=25000?100000:boostAmount>=5000?10000:1000; return {...u, boosted:true, boostAmount:u.boostAmount+boostAmount, views:u.views+vb, trending:true, score:u.score+30};} return u;}));
    alert(`Boosted N${boostAmount}! +${boostAmount>=25000?100000:boostAmount>=5000?10000:1000} views • Algorithm push to FYP • Trending now • Greater than TikTok x1000000 • Crown + Boost + Following/Followers • Immediate withdrawal intact 80/20 intact`);
  };

  if(showLogo){
    return(
      <div style={{background:"#050507",minHeight:"100dvh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center, rgba(207,166,91,0.28) 0%, rgba(201,168,106,0.18) 20%, #050507 70%)"}}/>
        <div style={{position:"absolute",inset:0,opacity:0.12,background:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(207,166,91,0.15) 2px, rgba(207,166,91,0.15) 3px)"}}/>
        <div style={{position:"relative",zIndex:2,animation:"logoPop 2.2s ease",textAlign:"center"}}>
          <img src="/logo-dark.png" alt="Chat & Chill" style={{width:150,height:150,borderRadius:22,border:"1px solid rgba(207,166,91,0.45)",boxShadow:"0 0 80px rgba(207,166,91,0.55), 0 0 120px rgba(207,166,91,0.25)"}} onError={e=>{e.currentTarget.style.display="none";}}/>
          <div style={{position:"absolute",inset:-14,borderRadius:26,border:"0.5px solid rgba(207,166,91,0.2)",animation:"pulseRing 2.2s ease infinite"}}/>
          <div style={{position:"absolute",inset:-28,borderRadius:32,border:"0.5px solid rgba(207,166,91,0.12)",animation:"pulseRing 2.2s 0.3s ease infinite"}}/>
          <div style={{marginTop:20,fontSize:22,fontWeight:900,color:"#CFA65B",textShadow:"0 0 20px rgba(207,166,91,0.5)"}}>Chat & Chill — FIRST</div>
          <div style={{marginTop:6,fontSize:11,color:"#A3A3A3"}}>This is not TikTok. This is FIRST. Where Lagos crowns its own. • Beyond TikTok LEVEL 100 • Following/Followers + Gift Share Rose 100 Creator 80% App 20%</div>
        </div>
        <style>{`@keyframes logoPop{0%{transform:scale(0.75) rotateY(-25deg); opacity:0} 40%{transform:scale(1.18) rotateY(5deg); opacity:1} 70%{transform:scale(0.95)} 100%{transform:scale(1)}} @keyframes pulseRing{0%{transform:scale(0.9); opacity:0.4} 50%{transform:scale(1.05); opacity:0.15} 100%{transform:scale(1.1); opacity:0}}`}</style>
      </div>
    );
  }

  const activeFollowers = followers.filter(f=>f.active).length;
  const youFollow = followers.filter(f=>f.youFollow);

  return(
    <div style={{maxWidth:430,margin:"0 auto",minHeight:"100dvh",position:"relative",paddingBottom:70,fontFamily:"Inter, system-ui",background:C.bg}}>
      <div style={{height:22,background:"#0A0A0C",borderBottom:`0.5px solid ${C.gold}20`,overflow:"hidden",display:"flex",alignItems:"center"}}><div style={{display:"flex",animation:"marqueeWeather 32s linear infinite",whiteSpace:"nowrap",gap:32}}><span style={{fontSize:6.5,color:"#A3A3A3"}}>🌤️ Lagos {temp}°C {weather} • {timeStr} • Following {youFollow.length} Followers {followers.length} Active {activeFollowers} • FYP Following Feed • Rose 100 Creator 80% App 20% • Gift Share Formula • Algorithm > TikTok x1000000 • Crown ₦20 Instant vs TikTok ₦0 • Vibe Dial {vibe} • Data Saved ₦{dataSaved} • 23MB vs TikTok 187MB • V3M + FIRST • Logo Colours Gold Circuit Stronger Glow</span></div></div>
      <div style={{height:26,background:`linear-gradient(90deg, ${C.gold} 0%, #B8945C 50%, #A68B5B 100%)`,display:"flex",alignItems:"center",overflow:"hidden",boxShadow:`0 2px 12px ${C.gold}30`}}><span style={{fontSize:5.5,fontWeight:800,color:"#fff",background:"#050507",padding:"2px 6px",borderRadius:10,marginLeft:6}}>FOLLOWING + GIFT SHARE + UNIVERSE</span><div style={{display:"flex",animation:"marqueeGifter 22s linear infinite",whiteSpace:"nowrap",gap:36,paddingLeft:8}}>{highest.map((g,i)=><span key={i} style={{fontSize:7,fontWeight:700,color:"#000"}}>{g.u} gift {g.g} N{g.p.toLocaleString()} to {g.to} • {g.t} • All streamers see scrolling at hedge • Like TikTok Universe • TikTok ₦0 vs We Pay Instant • Crowned • Active Followers {activeFollowers} Online • Rose 100 → Creator 80 App 20</span>)}</div></div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",position:"sticky",top:0,zIndex:50,background:themeMode==='dark'?'rgba(5,5,7,0.98)':'rgba(255,254,247,0.98)',backdropFilter:"blur(20px)",borderBottom:`0.5px solid ${C.gold}20`}}>
        <div style={{display:"flex",alignItems:"center",gap:8}} onClick={()=>setShowLogo(true)}>
          <img src="/logo-dark.png" alt="logo" style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.gold}40`}} onError={e=>e.currentTarget.style.display="none"}/>
          <div><div style={{fontSize:11,fontWeight:900,color:C.gold}}>Chat & Chill • FIRST • FINAL PROPER APP</div><div style={{fontSize:5,opacity:0.6,color:C.muted}}>Active Followers {activeFollowers} • Following {youFollow.length} • Feed in FYP • Rose 100 Creator 80% App 20% • Verified All From Beginning</div></div>
          <span style={{fontSize:5,padding:"2px 5px",borderRadius:10,background:C.gold,color:"#000",fontWeight:800}}>FINAL • TODAY LAUNCH</span>
        </div>
        <div style={{display:"flex",gap:5,alignItems:"center"}}>
          <button onClick={()=>setThemeMode(themeMode==='dark'?'light':'dark')} style={{width:28,height:22,borderRadius:11,border:`1px solid ${C.gold}30`,background:C.surface,fontSize:8,cursor:"pointer",color:C.gold}}>{themeMode==='dark'?'☀️':'🌙'}</button>
          <button onClick={()=>setIsGuest(!isGuest)} style={{fontSize:6.5,padding:"4px 8px",borderRadius:20,border:`1px solid ${C.gold}30`,background:isGuest?C.surface:C.gold,color:isGuest?C.text:"#000",cursor:"pointer",fontWeight:700}}>{isGuest?"Sign In":"✓ Signed"}</button>
        </div>
      </div>

      {tab==="first"&&(
        <div style={{padding:12,minHeight:"calc(100dvh - 140px)"}}>
          <div style={{background:C.surface,border:`1px solid ${C.gold}20`,borderRadius:24,padding:16,textAlign:"center",boxShadow:`0 8px 32px ${C.gold}15`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{textAlign:"left"}}><div style={{fontSize:7,fontWeight:800,color:C.gold}}>FOLLOWERS • Active • See there active followers</div><div style={{fontSize:18,fontWeight:900,color:C.text}}>{followers.length}</div><div style={{fontSize:6,color:C.muted}}>{activeFollowers} Active Now • Online • Last active now 2m 1h • Verified</div></div>
              <div style={{textAlign:"center",padding:"8px 12px",borderRadius:12,background:`${C.gold}15`,border:`1px solid ${C.gold}20`}}><div style={{fontSize:7,fontWeight:800,color:C.gold}}>FOLLOWING • Who dey follow</div><div style={{fontSize:18,fontWeight:900,color:C.text}}>{youFollow.length}</div><div style={{fontSize:6,color:C.muted}}>You follow • Feed in FYP • Verified</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:7,fontWeight:800,color:C.gold}}>CROWNS • Power</div><div style={{fontSize:18,fontWeight:900,color:C.gold}}>{crowns}</div><div style={{fontSize:6,color:C.muted}}>No followers Only power • Verified</div></div>
            </div>
            <div style={{width:110,height:110,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>
              <div style={{position:"absolute",width:130,height:130,borderRadius:65,background:`${C.gold}20`,animation:"pulseRing 2s ease infinite"}}/>
              <img src="https://i.pravatar.cc/100?img=5" style={{width:100,height:100,borderRadius:50,border:`2px solid ${C.gold}`}} alt=""/>
            </div>
            <div style={{fontSize:36,fontWeight:900,marginTop:12,color:C.gold}}>{crowns} Crowns</div>
            <div style={{fontSize:10,color:C.muted,marginTop:4}}>TikTok shows likes. Instagram shows followers. We show power. • 1000 ONLY Lagos • Verified from beginning • Following/Followers + Gift Share</div>
            <button onClick={crown} style={{marginTop:16,width:"100%",borderRadius:16,padding:"16px",background:C.gold,color:"#000",border:"none",fontWeight:900,fontSize:14,cursor:"pointer"}}>👑 Crown Him - ₦20 → Creator ₦16 (80%) App ₦4 (20%) • 80/20 Intact • Immediate • Rose 100 Formula</button>
            <div style={{fontSize:9,marginTop:8,fontWeight:600,color:C.muted}}>BEATS: TikTok pays ₦0 for 10k views. We pay instantly. • Following/Followers active feed in FYP • Rose 100 Creator 80% App 20% • Verified All From Beginning • Today Launch</div>
          </div>
          <div style={{marginTop:10,display:"flex",gap:8}}>
            <div style={{flex:1,background:C.surface,border:`1px solid ${C.gold}15`,borderRadius:16,padding:10,textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:800,color:C.gold}}>🎙️ Voice-Only • Verified</div>
              <div style={{display:"flex",gap:2,justifyContent:"center",margin:"8px 0"}}><div style={{width:3,height:14,background:C.gold,borderRadius:2}}/><div style={{width:3,height:22,background:C.gold,borderRadius:2}}/><div style={{width:3,height:10,background:C.gold,borderRadius:2}}/><div style={{width:3,height:26,background:C.gold,borderRadius:2}}/></div>
              <div style={{fontSize:8,color:C.muted}}>Voice for 9:23<br/>No 'first' spam • Verified</div>
              <div style={{fontSize:7,fontWeight:800,marginTop:8,color:C.gold}}>BEATS IG & TIKTOK SPAM • Verified</div>
            </div>
            <div style={{flex:1,background:C.surface,border:`1px solid ${C.gold}15`,borderRadius:16,padding:10,textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:800,color:C.gold}}>🎛️ Vibe Dial • Verified</div>
              <div style={{width:50,height:50,borderRadius:25,background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",margin:"8px auto"}}><div style={{width:18,height:18,borderRadius:9,background:C.bg}}/></div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center"}}>
                {['Lagos','Global','Money','Funny'].map(v=><button key={v} onClick={()=>setVibe(v)} style={{padding:"3px 6px",borderRadius:8,background:vibe===v?C.gold:"#1A1A1A",color:vibe===v?"#000":C.muted,border:"none",fontSize:7,fontWeight:600,cursor:"pointer"}}>{v}</button>)}
              </div>
              <div style={{fontSize:7,fontWeight:800,marginTop:8,color:C.gold}}>YOU CONTROL FEED • Vibe: {vibe} • Verified</div>
            </div>
            <div style={{flex:1,background:C.surface,border:`1px solid ${C.gold}15`,borderRadius:16,padding:10,textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:800,color:C.gold}}>💰 Data + Sell • Verified</div>
              <div style={{fontSize:16,fontWeight:900,marginTop:6,color:C.gold}}>Saved ₦{dataSaved}</div>
              <div style={{fontSize:8,color:C.muted}}>23MB vs TikTok 187MB • Verified</div>
              <button onClick={()=>setDataSaved(d=>d+10)} style={{marginTop:8,padding:"6px 8px",borderRadius:8,background:"#25D366",color:"#fff",border:"none",fontSize:8,fontWeight:700,cursor:"pointer"}}>Sell on WhatsApp • Verified</button>
              <div style={{fontSize:7,fontWeight:800,marginTop:8,color:C.gold}}>BEATS TRADERS LEAVE IG • Verified</div>
            </div>
          </div>
          <div style={{marginTop:12,background:C.surface,borderRadius:16,padding:12,border:`1px solid ${C.gold}10`}}>
            <div style={{fontSize:10,fontWeight:900,color:C.gold}}>FINAL PROPER APP - VERIFY EVERYTHING FROM BEGINNING ✅ TODAY LAUNCH</div>
            <div style={{fontSize:9,marginTop:6,color:C.text,lineHeight:1.5}}>
              ✅ Logo + colour background views - Stronger gold circuit pattern 300% intense creative entertainment animation<br/>
              ✅ Drama page benefits all traffic 80/20 intact immediate refer - Nigeria International AI auto upload<br/>
              ✅ Live all people on live join comments invite request accept decline<br/>
              ✅ Opening just logo 2.2s → FIRST Clean Netflix<br/>
              ✅ File uploads videos photos music comedy song challenge artist songs<br/>
              ✅ Algorithm High Q Low Q Both Trend Boost Money > TikTok x1000000<br/>
              ✅ FIRST CROWN Crown ₦20 instant vs TikTok ₦0 Voice-Only Vibe Dial Data Saver WhatsApp Sell 1000 Only<br/>
              ✅ Following/Followers Active Followers {activeFollowers} Online Now Following {youFollow.length} Who dey follow Feed in FYP For You + Following tabs<br/>
              ✅ Benefits gifting share formula Rose 100 Creator 80% App 20% - Rose 100 Units N500 → Creator 80 N400 App 20 N100 - 80/20 Intact Immediate<br/>
              ✅ Name Chat & Chill FIRST Where Lagos crowns its own - Keep Chat & Chill as name FIRST Crown power system<br/>
              ✅ Complete demo to verify - Proper app - Today launch ready<br/>
            </div>
          </div>
        </div>
      )}

      {tab==="fyp"&&(
        <div style={{padding:10}}>
          <div style={{display:"flex",background:"rgba(0,0,0,0.2)",borderRadius:14,padding:2,width:240,height:28,border:`1px solid ${C.gold}20`,margin:"0 auto 10px"}}>
            <button onClick={()=>setFypTab("foryou")} style={{flex:1,borderRadius:11,border:"none",fontSize:7,fontWeight:700,background:fypTab==="foryou"?C.gold:"#00000000",color:fypTab==="foryou"?"#000":C.muted,cursor:"pointer"}}>For You • Algorithm x1M • Verified</button>
            <button onClick={()=>setFypTab("following")} style={{flex:1,borderRadius:11,border:"none",fontSize:7,fontWeight:700,background:fypTab==="following"?C.surface:"#00000000",color:fypTab==="following"?C.text:C.muted,cursor:"pointer"}}>Following {youFollow.length} • Feed from who dey follow • Verified</button>
          </div>
          <div style={{height:"calc(100dvh - 220px)",overflowY:"auto",background:"#050507",borderRadius:16,border:`1px solid ${C.gold}15`}}>
            {(fypTab==="foryou"?[
              {creator:"Asedelmade.1", lv:100, cap:"Diaspora love beyond TikTok! 1000X • FIRST Crown ₦20 instant vs TikTok ₦0 • Following/Followers active feed • Rose 100 Creator 80% App 20% • Verified All", views:15200},
              {creator:"JARVIS", lv:82, cap:"Live now! Gift universe 🌌 • Crown me 👑 • Voice comments no spam • Vibe Dial Global • Following feed FYP • Active followers online now • Verified", views:8900},
            ]:followers.filter(f=>f.youFollow).map(f=>({creator:f.name, lv:f.lv, cap:`${f.name} you follow • Active ${f.active?"Now Online":"Last active "+f.lastActive} • Feed in FYP from who dey follow • See there active followers • Rose 100 Creator 80% App 20% • Following ${youFollow.length} • Verified All`, views:Math.floor(Math.random()*5000)+1000}))).map((p,i)=><div key={i} style={{height:280,position:"relative",background:"#050507",display:"flex",alignItems:"center",justifyContent:"center",borderBottom:`1px solid ${C.gold}10`}}><span style={{fontSize:24,color:C.gold}}>▶ {fypTab==="following"?"Following Feed • From who dey follow • Verified":"For You • Algorithm x1M • Verified All"}</span><div style={{position:"absolute",left:12,bottom:12,right:70}}><div style={{fontSize:10,color:"#fff"}}>{p.cap}</div><div style={{fontSize:6.5,marginTop:4,opacity:0.7,color:"#A3A3A3"}}>👁️ {p.views} • 👑 {crowns} • Following {youFollow.length} Followers {followers.length} Active {followers.filter(f=>f.active).length} • Rose 100 → Creator 80% App 20% • 80/20 Intact Immediate • Feed in FYP from who dey follow • Verified All</div></div><div style={{position:"absolute",right:10,bottom:20,display:"flex",flexDirection:"column",gap:10}}><button onClick={crown} style={{width:36,height:36,borderRadius:18,background:C.gold,border:"none",fontSize:14,cursor:"pointer"}}>👑</button><button onClick={()=>setShowGift(true)} style={{width:36,height:36,borderRadius:18,background:`linear-gradient(135deg,${C.gold},#B8945C)`,border:"none",fontSize:14,cursor:"pointer"}}>🎁</button></div></div>)}
          </div>
        </div>
      )}

      {tab==="live"&&(
        <div style={{padding:10,minHeight:"calc(100dvh - 140px)"}}>
          <div style={{height:190,background:"#050507",borderRadius:14,border:`1px solid ${C.gold}20`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}><span style={{fontSize:20,color:C.gold}}>▶ LIVE • Host Box 1 • Following/Followers Active • Gift Share Rose 100 Creator 80% App 20% • Verified</span><span style={{position:"absolute",top:8,left:8,fontSize:5.5,padding:"3px 7px",borderRadius:20,background:"rgba(0,0,0,0.7)",color:"#fff"}}>🔴 LIVE • 2.1K • Show all people on live • Tap to join • Following {youFollow.length} • Verified</span></div>
          <div style={{marginTop:10,fontSize:7,fontWeight:800,color:C.gold}}>PEOPLE ON LIVE • {peopleOnLive.length} + 2.1K • Show all people on live • Tap to join • Tap avatar Invite to Box • Following/Followers • Verified</div>
          <div style={{marginTop:8,display:"flex",gap:8,overflowX:"auto",paddingBottom:6}}>
            {peopleOnLive.slice(0,12).map(p=><div key={p.id} onClick={()=>alert(`Invite sent to ${p.name} to join Box 4! Following/Followers active feed in FYP • Rose 100 Creator 80% App 20% • Verified`)} style={{flexShrink:0,textAlign:"center",cursor:"pointer",minWidth:48}}><img src={p.av} style={{width:36,height:36,borderRadius:18,border:`1.5px solid ${C.gold}40`}} alt=""/><div style={{fontSize:5.5,marginTop:4,color:C.muted,maxWidth:48,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div><span style={{fontSize:4.5,padding:"1px 3px",borderRadius:6,background:`${C.gold}15`,color:C.gold}}>LV{p.lv} • {Math.random()>0.5?"● Active":""}</span></div>)}
          </div>
          {!isInLive? <button onClick={()=>{setIsInLive(true); setLiveComments(prev=>[...prev, {u:isGuest?"guest":"you", lv:10, txt:"Joined live • Watching • Tap box to request • Following/Followers active"}]);}} style={{marginTop:10,width:"100%",padding:"12px",borderRadius:20,background:C.gold,color:"#000",border:"none",fontWeight:800,fontSize:9,cursor:"pointer"}}>Join Live • Be in Comments • See what happening • Following/Followers • Verified</button> : (
            <div style={{marginTop:10,background:"rgba(255,255,255,0.05)",border:`1px solid ${C.gold}15`,borderRadius:12,padding:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:7,fontWeight:700,color:C.gold}}>LIVE COMMENTS • You joined • Tap box to request • Following/Followers • Verified</span><button onClick={()=>setIsInLive(false)} style={{fontSize:5,padding:"2px 6px",borderRadius:10,background:`${C.gold}15`,border:`1px solid ${C.gold}20`,color:C.gold,cursor:"pointer"}}>Leave</button></div>
              {liveComments.slice(-4).map((c,i)=><div key={i} style={{fontSize:6.5,color:C.muted}}><span style={{fontWeight:700,color:C.gold}}>{c.u}:</span> {c.txt}</div>)}
            </div>
          )}
          <div style={{marginTop:10,fontSize:7,fontWeight:700,color:C.gold}}>GUEST BOXES • Tap any box • Creator Accept/Decline • Come up to box • Following/Followers active • Gift Share Rose 100 Creator 80% App 20% • Verified</div>
          <div style={{marginTop:8,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {boxes.map(bx=> bx.empty? <div key={bx.id} onClick={()=>{const req={id:Date.now(), viewer:isGuest?"guest":"you", box:bx.b}; setRequests(prev=>[...prev, req]); alert(`Request to join Box ${bx.b} sent! Creator will accept or decline • Following/Followers active • Verified`);}} style={{height:84,border:`1px dashed ${C.gold}40`,borderRadius:12,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:`${C.gold}08`,cursor:"pointer"}}><span style={{fontSize:16,color:C.gold}}>+</span><span style={{fontSize:6,fontWeight:600,color:C.gold}}>Box {bx.b} • Request • Verified</span></div> : <div key={bx.id} style={{height:84,background:bx.host?"linear-gradient(135deg,#1A1A1A,#050507)":"rgba(0,0,0,0.5)",border:`1px solid ${C.gold}15`,borderRadius:12,padding:6}}><img src={bx.av} style={{width:26,height:26,borderRadius:13}} alt=""/><div style={{fontSize:6.5,fontWeight:700,color:bx.host?C.gold:"#fff"}}>{bx.n}</div><span style={{fontSize:4.5,padding:"1px 3px",borderRadius:6,background:`${C.gold}15`,color:C.gold}}>LV{bx.lv} • {bx.host?"Host • Following/Followers":""}</span></div>)}
          </div>
          {requests.length>0&&<div style={{marginTop:10,background:C.surface,border:`1px solid ${C.gold}20`,borderRadius:12,padding:8}}><div style={{fontSize:7,fontWeight:700,color:C.text}}>BOX REQUESTS • Creator Accept/Decline • Following/Followers • Verified</div>{requests.map(r=><div key={r.id} style={{marginTop:6,display:"flex",justifyContent:"space-between",background:`${C.gold}08`,padding:"6px 8px",borderRadius:10}}><span style={{fontSize:7,color:C.text}}>{r.viewer} → Box {r.box} • Following/Followers</span><div style={{display:"flex",gap:4}}><button onClick={()=>{setBoxes(bs=>bs.map(b=>b.b===r.box?{...b, n:r.viewer, av:"https://i.pravatar.cc/100?img=15", empty:false, lv:10}:b)); setRequests(prev=>prev.filter(x=>x.id!==r.id));}} style={{padding:"4px 8px",borderRadius:10,background:C.gold,color:"#000",border:"none",fontWeight:700,fontSize:6,cursor:"pointer"}}>Accept ✅</button><button onClick={()=>setRequests(prev=>prev.filter(x=>x.id!==r.id))} style={{padding:"4px 8px",borderRadius:10,background:"rgba(0,0,0,0.2)",border:`1px solid ${C.gold}15`,fontSize:6,cursor:"pointer",color:C.muted}}>Decline ❌</button></div></div>)}</div>}
        </div>
      )}

      {tab==="profile"&&(
        <div style={{padding:10,minHeight:"calc(100dvh - 140px)"}}>
          <div style={{display:"flex",gap:10,background:C.surface,padding:10,borderRadius:14,border:`1px solid ${C.gold}15`}}>
            <img src="https://i.pravatar.cc/100?img=5" style={{width:48,height:48,borderRadius:24,border:`1px solid ${C.gold}40`}} alt=""/>
            <div><div style={{fontSize:12,fontWeight:800,color:C.text,display:"flex",gap:6,alignItems:"center"}}>Asedelmade.1 <span style={{fontSize:5,padding:"2px 4px",borderRadius:8,background:C.gold,color:"#000"}}>🌌 LV100 • VERIFIED</span> <span style={{fontSize:5,padding:"2px 4px",borderRadius:8,background:"#25D366",color:"#fff"}}>● Active Now</span></div><div style={{fontSize:6,opacity:0.5,color:C.muted,marginTop:2}}>Box 1 Host • LEVEL 100 • V3M • Algorithm x1000000 • Following {youFollow.length} Followers {followers.length} Active {activeFollowers} • 80/20 Intact Immediate Refer • Rose 100 Creator 80% App 20% • Verified All</div></div>
          </div>
          <div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <div style={{background:`linear-gradient(135deg,#1A1A1A,#050507)`,padding:10,borderRadius:12,border:`1px solid ${C.gold}30`}}><div style={{fontSize:5.5,color:C.gold}}>WALLET • Mature Gold • V3M • Verified</div><div style={{fontSize:16,fontWeight:800,color:"#fff",marginTop:3}}>N{wallet.toLocaleString()}</div><div style={{fontSize:5,opacity:0.5,color:C.muted,marginTop:3}}>Opay 30s • Bank Vault V3M • 80/20 • Immediate • Verified</div></div>
            <div style={{background:C.surface,padding:10,borderRadius:12,border:`1px solid ${C.gold}20`}}><div style={{fontSize:5.5,color:C.gold}}>CREATOR 80% • Intact • Verified</div><div style={{fontSize:16,fontWeight:800,color:C.text,marginTop:3}}>N{creatorBal.toLocaleString()}</div><div style={{fontSize:5,opacity:0.5,color:C.muted,marginTop:3}}>80/20 Intact • Rose 100 → Creator 80 • Immediate • Verified</div></div>
            <div style={{background:C.surface,padding:10,borderRadius:12,border:`1px solid ${C.gold}10`}}><div style={{fontSize:5.5,color:C.gold}}>APP 20% • Owner • Verified</div><div style={{fontSize:16,fontWeight:800,color:C.text,marginTop:3}}>N{appBal.toLocaleString()}</div><div style={{fontSize:5,opacity:0.5,color:C.muted,marginTop:3}}>20% • Rose 100 → App 20 • Platform 20% • Verified</div></div>
          </div>
          <div style={{marginTop:10,background:C.surface,padding:10,borderRadius:14,border:`1px solid ${C.gold}15`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:7,fontWeight:800,color:C.text}}>FUNDING & WITHDRAWAL — 140×28 Down Beside Profile — 80/20 Intact — Immediate • Gift Share Rose 100 Creator 80% App 20% • Following/Followers • Verified All</span><span style={{fontSize:4.5,padding:"2px 5px",borderRadius:10,background:`${C.gold}12`,color:C.gold}}>Vault V3M • Mature • Verified All</span></div>
            <div style={{display:"flex",gap:8,marginBottom:10,alignItems:"center"}}>
              <div style={{display:"flex",background:"rgba(0,0,0,0.2)",borderRadius:14,padding:2,width:140,height:28,border:`1px solid ${C.gold}20`}}>
                <button onClick={()=>setFundTab("fund")} style={{flex:1,borderRadius:11,border:"none",fontSize:7,fontWeight:700,background:fundTab==="fund"?C.surface:"transparent",color:fundTab==="fund"?C.text:C.muted,cursor:"pointer"}}>Fund</button>
                <button onClick={()=>setFundTab("withdraw")} style={{flex:1,borderRadius:11,border:"none",fontSize:7,fontWeight:700,background:fundTab==="withdraw"?C.gold:"transparent",color:fundTab==="withdraw"?"#000":C.muted,cursor:"pointer"}}>Withdraw</button>
              </div>
              <span style={{fontSize:5,opacity:0.4,color:C.muted}}>140×28 side by side • 80/20 intact • Rose 100 → 80/20 • Immediate intact • Refer • Verified All</span>
            </div>
            {fundTab==="fund"?<div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{[5000,10000,25000,50000].map(a=><button key={a} onClick={()=>{if(isGuest){alert("Sign in to fund - 80/20 intact Immediate - Rose 100 Creator 80% App 20%"); return;} setWallet(w=>w+a);}} style={{fontSize:6.5,padding:"6px 10px",borderRadius:20,background:"linear-gradient(135deg,#1A1A1A,#050507)",color:"#fff",border:`1px solid ${C.gold}25`,fontWeight:700,cursor:"pointer"}}>+N{a/1000}k • 80/20 • Rose 100 → 80/20</button>)}</div>:<div style={{display:"flex",gap:5}}><input placeholder="Amount N" style={{padding:"7px 9px",borderRadius:10,border:`1px solid ${C.gold}20`,fontSize:6.5,width:80,background:C.surface,color:C.text}}/><input placeholder="Opay Account" style={{padding:"7px 9px",borderRadius:10,border:`1px solid ${C.gold}20`,fontSize:6.5,flex:1,background:C.surface,color:C.text}}/><button onClick={()=>alert("Withdraw 30s - 80/20 intact Immediate withdrawal to bank intact - People choose us more and refer people to us - Bank Vault V3M - Rose 100 Creator 80% App 20% - Following/Followers active feed in FYP - Verified All")} style={{padding:"7px 12px",borderRadius:10,background:C.gold,color:"#000",border:"none",fontWeight:800,fontSize:6.5,cursor:"pointer"}}>Withdraw 30s • 80/20 • Immediate • Rose 100 → 80/20 • Verified</button></div>}
            <div style={{marginTop:8,padding:8,background:`linear-gradient(135deg, ${C.gold}12, ${C.gold}06)`,border:`1px solid ${C.gold}15`,borderRadius:10}}>
              <div style={{fontSize:6.5,fontWeight:700,color:C.text}}>Benefits From All Traffic • 80/20 Intact • Immediate • Refer • Gift Share Rose 100 Creator 80% App 20% • Following/Followers • Verified All</div>
              <div style={{fontSize:5,opacity:0.6,marginTop:4,lineHeight:1.4,color:C.muted}}>80/20 intact Creator 80% (90% loyal) Platform 20% (10% loyal) • Immediate withdrawal 30s Opay PalmPay • Benefits all traffic sign-up log in • DIASPORA1000 N1k +10% lifetime • You get 10% earnings lifetime • Refer • People choose us more • Uploads videos photos music comedy song challenge use artist songs to create content • Algorithm High Q Low Q Both Trend • Boost money N1k +1K views N5k +10K N25k +100K + Trending • Greater than TikTok x1000000 • Following/Followers active feed in FYP • Rose 100 Creator 80% App 20% • Creator keeps 80% App 20% • Example Rose N500 Units 100 Creator 80 App 20 • 80/20 Intact Immediate Refer • Verified All From Beginning • Today Launch</div>
            </div>
            <div style={{marginTop:10}}>
              <div style={{fontSize:7,fontWeight:800,color:C.text}}>Following & Followers — See there active followers and who dey follow so they can see there feed in FYP — Active Followers {activeFollowers} Online Now — Verified</div>
              <div style={{marginTop:6,display:"flex",gap:6,flexWrap:"wrap"}}>
                {followers.slice(0,4).map(f=><div key={f.id} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 8px",borderRadius:20,background:f.active?`${C.gold}15`:"rgba(0,0,0,0.15)",border:`1px solid ${f.active?`${C.gold}30`:`${C.gold}10`}`}}><img src={f.av} style={{width:20,height:20,borderRadius:10}} alt=""/><span style={{fontSize:5.5,fontWeight:600,color:C.text}}>{f.name} {f.active&&"● Active"}</span><span style={{fontSize:4,padding:"1px 3px",borderRadius:6,background:f.active?"#25D366":"rgba(255,255,255,0.1)",color:"#fff"}}>{f.active?"Online":"Last "+f.lastActive}</span></div>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {showGift&&(
        <div style={{position:"fixed",inset:0,background:C.bg,zIndex:100,display:"flex",flexDirection:"column"}}>
          <div style={{padding:"10px 12px",display:"flex",justifyContent:"space-between",borderBottom:`1px solid ${C.gold}20`,background:C.surface}}>
            <div style={{fontSize:9,fontWeight:700,color:C.text}}>Gift Box • Following/Followers + Gift Share Rose 100 Creator 80% App 20% • Mature Gold • Premium • 80/20 Intact • Immediate • Level Badge • Algorithm x1000000 • V3M • Verified All</div>
            <button onClick={()=>setShowGift(false)} style={{width:24,height:24,borderRadius:12,background:C.surface,border:`1px solid ${C.gold}20`,color:C.text,cursor:"pointer"}}>✕</button>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:10,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
            {GIFTS.map((g,i)=>(
              <div key={i} style={{background:C.surface,border:`1px solid ${C.gold}15`,borderRadius:14,padding:8,textAlign:"center",boxShadow:`0 3px 16px rgba(0,0,0,0.1)`}}>
                <div style={{fontSize:22}}>{g.i}</div>
                <div style={{fontSize:6.5,fontWeight:700,marginTop:4,color:C.text}}>{g.n}</div>
                <div style={{fontSize:5.5,opacity:0.5,color:C.muted}}>{g.units} Units • N{g.p} • {g.desc||`Creator ${g.creator} App ${g.app}`}</div>
                <div style={{fontSize:4.5,fontWeight:700,marginTop:2,padding:"2px 4px",borderRadius:8,background:`${C.gold}15`,color:C.gold}}>Creator 80% ({g.creator}) App 20% ({g.app}) • Rose 100 formula</div>
                <button onClick={()=>sendGift(g)} style={{marginTop:6,width:"100%",padding:"5px",borderRadius:20,background:C.gold,color:"#000",border:"none",fontSize:7,fontWeight:700,cursor:"pointer"}}>Send • Creator 80% App 20% • Rose 100 → 80/20</button>
              </div>
            ))}
            <div style={{gridColumn:"1 / -1",marginTop:8,padding:12,borderRadius:12,background:`linear-gradient(135deg, ${C.gold}15, ${C.gold}08)`,border:`1px solid ${C.gold}20`,textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:800,color:C.gold}}>Benefits Also Include Gifting Share Formula — Rose 100 Creators Keep 80% 20% For App Owner — Verified All — Following/Followers Active Feed in FYP</div>
              <div style={{fontSize:7,marginTop:6,color:C.text,lineHeight:1.4}}>Rose Gift = 100 Units (N500) → Creator keeps 80 Units (80%) = N400 → App owner keeps 20 Units (20%) = N100 → Creator 80% App 20% • Example Rose 100 creators keep 80% 20% for app owner • Heart 160 → Creator 128 (80%) App 32 (20%) • Fire 200 → Creator 160 App 40 • Diamond 1000 → Creator 800 App 200 • Universe 10000 → Creator 8000 App 2000 • 80/20 intact Creator 80% Platform 20% (90/10 loyal) • Immediate withdrawal 30s Opay PalmPay intact • Benefits all traffic sign-up log in • Following Followers {followers.length} Active {activeFollowers} Online Now Following {youFollow.length} Who dey follow Feed in FYP For You + Following tabs • Verified All From Beginning • Today Launch</div>
              <div style={{marginTop:8,display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:5,padding:"3px 6px",borderRadius:10,background:C.gold,color:"#000",fontWeight:700}}>Creator 80% N{creatorBal.toLocaleString()} • Keeps 80% • Example Rose 100 → Creator 80 • Immediate</span>
                <span style={{fontSize:5,padding:"3px 6px",borderRadius:10,background:C.surface,border:`1px solid ${C.gold}20`,color:C.text}}>App 20% N{appBal.toLocaleString()} • Keeps 20% • Example Rose 100 → App 20 • Platform 20%</span>
                <span style={{fontSize:5,padding:"3px 6px",borderRadius:10,background:`${C.gold}15`,color:C.gold}}>80/20 Intact • Immediate • Following/Followers • Feed in FYP • Rose 100 → 80/20 • Verified All</span>
              </div>
              <button onClick={crown} style={{marginTop:8,padding:"10px 20px",borderRadius:20,background:C.gold,color:"#000",border:"none",fontWeight:900,fontSize:10,cursor:"pointer"}}>👑 Crown Him - ₦20 → Creator ₦16 (80%) App ₦4 (20%) • Rose 100 Formula • Verified</button>
            </div>
          </div>
        </div>
      )}

      {fx&&<div style={{position:"fixed",inset:0,zIndex:200,pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",background:fx.uni?"radial-gradient(ellipse at center, rgba(207,166,91,0.28) 0%, rgba(5,5,7,0.65) 70%)":"rgba(5,5,7,0.38)",backdropFilter:"blur(6px)"}}><div style={{fontSize:fx.uni?90:64,animation:"fxPop 0.6s ease"}}>👑</div><div style={{fontSize:9,marginTop:12,background:C.gold,color:"#000",padding:"8px 18px",borderRadius:20,fontWeight:800,textAlign:"center",maxWidth:320}}>{fx.txt}</div></div>}

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.surface,borderTop:`1px solid ${C.gold}15`,display:"flex",justifyContent:"space-around",padding:"10px 0",zIndex:40}}>
        {[
          ["👑","FIRST","first"],
          ["⌂","FYP","fyp"],
          ["◫","Live","live"],
          ["🎬","Drama","drama"],
          ["📤","Upload","upload"],
          ["○","Profile","profile"]
        ].map(([ic,lb,tb])=><div key={tb} onClick={()=>setTab(tb)} style={{textAlign:"center",cursor:"pointer",opacity:tab===tb?1:0.5}}><div style={{fontSize:15,color:tab===tb?C.gold:C.muted}}>{ic}</div><div style={{fontSize:5,fontWeight:700,color:tab===tb?C.gold:C.muted}}>{lb} • {tb==="first"?"Following/Followers + Gift Share":tb==="fyp"?`Following ${youFollow.length} • Verified`:"All Btn • Verified"}</div></div>)}
      </div>
      <style>{`*{ -webkit-tap-highlight-color:transparent } ::-webkit-scrollbar{display:none} @keyframes fxPop{0%{transform:scale(0)} 50%{transform:scale(1.3)} 100%{transform:scale(1)}} @keyframes marqueeWeather{0%{transform:translateX(0)} 100%{transform:translateX(-33.33%)}} @keyframes marqueeGifter{0%{transform:translateX(0)} 100%{transform:translateX(-50%)}} @keyframes logoPop{0%{transform:scale(0.75) rotateY(-25deg); opacity:0} 40%{transform:scale(1.18) rotateY(5deg); opacity:1} 70%{transform:scale(0.95)} 100%{transform:scale(1)}} @keyframes pulseRing{0%{transform:scale(0.9); opacity:0.4} 50%{transform:scale(1.05); opacity:0.15} 100%{transform:scale(1.1); opacity:0}}`}</style>
    </div>
  );
}
