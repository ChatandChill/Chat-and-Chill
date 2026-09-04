"use client";
import { useState, useEffect, useCallback } from "react";
const THEME = {
  dark: { bg: "#050507", surface: "#0A0A0C", gold: "#CFA65B", text: "#FFFFFF", muted: "#A3A3A3" },
  light: { bg: "#FFFEF7", surface: "#F5F1E8", gold: "#CFA65B", text: "#111111", muted: "#666666" }
};
const GIFTS = [
  {n:"Rose", p:500, units:100, creator:80, app:20},
  {n:"Fire", p:1000, units:200, creator:160, app:40},
  {n:"Diamond", p:5000, units:1000, creator:800, app:200},
  {n:"Crown", p:15000, units:3000, creator:2400, app:600},
  {n:"Lion", p:25000, units:5000, creator:4000, app:1000},
  {n:"Universe", p:50000, units:10000, creator:8000, app:2000},
  {n:"Titan", p:1000000, units:200000, creator:160000, app:40000},
];
export default function Page(){
  const [themeMode, setThemeMode] = useState("dark");
  const C = THEME[themeMode];
  const [showLogo, setShowLogo] = useState(true);
  const [tab, setTab] = useState("first");
  const [fypTab, setFypTab] = useState("foryou");
  const [followTab, setFollowTab] = useState("followers");
  const [fundTab, setFundTab] = useState("fund");
  const [crowns, setCrowns] = useState(842);
  const [wallet, setWallet] = useState(50000);
  const [creatorBal, setCreatorBal] = useState(306950);
  const [appBal, setAppBal] = useState(76737);
  const [showGift, setShowGift] = useState(false);
  const [fx, setFx] = useState(null);
  const [isGuest, setIsGuest] = useState(true);
  const [followers, setFollowers] = useState([
    {id:1, name:"okiki.username", av:"https://i.pravatar.cc/100?img=10", lv:92, active:true, lastActive:"now", followingYou:true, youFollow:false, gifts:50000},
    {id:2, name:"amara_lagos", av:"https://i.pravatar.cc/100?img=11", lv:68, active:true, lastActive:"2m ago", followingYou:true, youFollow:true, gifts:25000},
    {id:3, name:"chidi_uk", av:"https://i.pravatar.cc/100?img=12", lv:54, active:false, lastActive:"1h ago", followingYou:true, youFollow:false, gifts:15000},
    {id:4, name:"jarvis_live", av:"https://i.pravatar.cc/100?img=13", lv:82, active:true, lastActive:"now", followingYou:true, youFollow:true, gifts:32000},
    {id:5, name:"heritage_box", av:"https://i.pravatar.cc/100?img=8", lv:58, active:true, lastActive:"5m ago", followingYou:false, youFollow:true, gifts:8900},
  ]);
  useEffect(()=>{const t1=setTimeout(()=>setShowLogo(false),2200); return()=>clearTimeout(t1);},[]);
  const toggleFollow = (id) => setFollowers(prev=>prev.map(f=>f.id===id?{...f, youFollow:!f.youFollow}:f));
  const crown = useCallback(()=>{
    if(isGuest){alert("Sign In to Crown - N20 goes to creator - Creator 80% App 20% - Rose 100"); return;}
    if(wallet<20){alert("Fund wallet"); setTab("profile"); return;}
    setWallet(w=>w-20); setCreatorBal(c=>c+16); setAppBal(a=>a+4); setCrowns(c=>c+1);
    setFx({txt:"Crowned N20 - Creator N16 (80%) App N4 (20%) - Rose 100 - Creator 80 App 20 - Immediate", uni:true});
    setTimeout(()=>setFx(null),3500);
  },[wallet,isGuest]);
  const sendGift = useCallback((g)=>{
    if(isGuest){alert("Sign In to send gifts - Rose 100 Creator 80% App 20%"); return;}
    if(wallet<g.p){alert("Fund wallet"); setTab("profile"); return;}
    setWallet(w=>w-g.p); setCreatorBal(c=>c+Math.floor(g.p*0.8)); setAppBal(a=>a+Math.floor(g.p*0.2));
    setFx({txt:g.n+" N"+g.p+" Units "+g.units+" - Creator "+g.creator+" (80%) App "+g.app+" (20%) - Rose 100 - 80/20 Intact", uni:g.p>=15000});
    setTimeout(()=>setFx(null),4000); setShowGift(false);
  },[wallet,isGuest]);
  if(showLogo){
    return(
      <div style={{background:"#050507",minHeight:"100dvh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{textAlign:"center"}}>
          <img src="/logo-dark.png" alt="logo" style={{width:150,height:150,borderRadius:22}} onError={e=>{e.currentTarget.style.display="none";}}/>
          <div style={{marginTop:20,fontSize:22,fontWeight:900,color:"#CFA65B"}}>Chat and Chill - FIRST</div>
          <div style={{marginTop:6,fontSize:11,color:"#A3A3A3"}}>This is not TikTok. This is FIRST. Rose 100 Creator 80% App 20%</div>
        </div>
      </div>
    );
  }
  const activeFollowers = followers.filter(f=>f.active).length;
  const youFollow = followers.filter(f=>f.youFollow);
  return(
    <div style={{maxWidth:430,margin:"0 auto",minHeight:"100dvh",paddingBottom:70,fontFamily:"Inter, system-ui",background:C.bg, color:C.text}}>
      <div style={{display:"flex",justifyContent:"space-between",padding:"10px 12px",position:"sticky",top:0,zIndex:50,background:C.bg,borderBottom:"1px solid rgba(207,166,91,0.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><img src="/logo-dark.png" alt="logo" style={{width:32,height:32,borderRadius:8}} onError={e=>{e.currentTarget.style.display="none";}}/><div><div style={{fontSize:11,fontWeight:900,color:C.gold}}>Chat and Chill - FIRST - FINAL FIXED BUILD</div><div style={{fontSize:5,color:C.muted}}>Active {activeFollowers} Following {youFollow.length} Rose 100 Creator 80% App 20%</div></div></div>
        <div style={{display:"flex",gap:5}}><button onClick={()=>setThemeMode(themeMode==="dark"?"light":"dark")} style={{width:28,height:22,borderRadius:11,border:"1px solid rgba(207,166,91,0.3)",background:C.surface,fontSize:8,color:C.gold}}>{themeMode==="dark"?"Light":"Dark"}</button><button onClick={()=>setIsGuest(!isGuest)} style={{fontSize:6.5,padding:"4px 8px",borderRadius:20,background:isGuest?C.surface:C.gold,color:isGuest?C.text:"#000",fontWeight:700}}>{isGuest?"Sign In":"Signed"}</button></div>
      </div>
      {tab==="first"&&(
        <div style={{padding:12}}>
          <div style={{background:C.surface,border:"1px solid rgba(207,166,91,0.2)",borderRadius:24,padding:16,textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
              <div><div style={{fontSize:7,fontWeight:800,color:C.gold}}>FOLLOWERS</div><div style={{fontSize:18,fontWeight:900}}>{followers.length}</div><div style={{fontSize:6,color:C.muted}}>{activeFollowers} Active Now</div></div>
              <div><div style={{fontSize:7,fontWeight:800,color:C.gold}}>FOLLOWING</div><div style={{fontSize:18,fontWeight:900}}>{youFollow.length}</div><div style={{fontSize:6,color:C.muted}}>Feed in FYP</div></div>
              <div><div style={{fontSize:7,fontWeight:800,color:C.gold}}>CROWNS</div><div style={{fontSize:18,fontWeight:900,color:C.gold}}>{crowns}</div></div>
            </div>
            <div style={{fontSize:36,fontWeight:900,marginTop:12,color:C.gold}}>{crowns} Crowns</div>
            <div style={{fontSize:10,color:C.muted,marginTop:4}}>TikTok shows likes. Instagram shows followers. We show power. 1000 ONLY Lagos.</div>
            <button onClick={crown} style={{marginTop:16,width:"100%",borderRadius:16,padding:"16px",background:C.gold,color:"#000",border:"none",fontWeight:900,fontSize:14}}>Crown Him - N20 - Creator N16 (80%) App N4 (20%) - Rose 100 Formula</button>
          </div>
          <div style={{marginTop:10,background:C.surface,border:"1px solid rgba(207,166,91,0.15)",borderRadius:16,padding:10}}>
            <div style={{display:"flex",gap:5,marginBottom:10}}><button onClick={()=>setFollowTab("followers")} style={{flex:1,padding:"6px",borderRadius:11,border:"none",fontSize:7,fontWeight:700,background:followTab==="followers"?C.surface:"transparent",color:followTab==="followers"?C.text:C.muted}}>Followers {followers.length}</button><button onClick={()=>setFollowTab("following")} style={{flex:1,padding:"6px",borderRadius:11,border:"none",fontSize:7,fontWeight:700,background:followTab==="following"?C.gold:"transparent",color:followTab==="following"?"#000":C.muted}}>Following {youFollow.length} - Feed in FYP</button></div>
            {(followTab==="followers"?followers:youFollow).map(f=>(
              <div key={f.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 10px",borderRadius:12,marginBottom:6,background:"rgba(0,0,0,0.15)"}}>
                <div style={{display:"flex",gap:8,alignItems:"center"}}><img src={f.av} style={{width:36,height:36,borderRadius:18}} alt=""/><div><div style={{fontSize:7,fontWeight:700}}>{f.name} {f.active?"- Active Now":"- Last "+f.lastActive}</div><div style={{fontSize:5,opacity:0.5}}>LV{f.lv} - Gifts N{f.gifts}</div></div></div>
                <button onClick={()=>toggleFollow(f.id)} style={{padding:"5px 10px",borderRadius:20,background:f.youFollow?C.surface:C.gold,color:f.youFollow?C.text:"#000",fontSize:6.5,fontWeight:700}}>{f.youFollow?"Following - FYP":"Follow"}</button>
              </div>
            ))}
          </div>
          <div style={{marginTop:10,background:C.surface,border:"1px solid rgba(207,166,91,0.2)",borderRadius:16,padding:12}}>
            <div style={{fontSize:10,fontWeight:900,color:C.gold}}>Benefits Gifting Share - Rose 100 Creators Keep 80% 20% App Owner</div>
            <div style={{marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              <div style={{background:"rgba(207,166,91,0.1)",padding:8,borderRadius:10,textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:C.gold}}>N{creatorBal.toLocaleString()}</div><div style={{fontSize:5,color:C.muted}}>Creator 80% - Rose 100 Creator 80</div></div>
              <div style={{background:"rgba(0,0,0,0.2)",padding:8,borderRadius:10,textAlign:"center"}}><div style={{fontSize:16,fontWeight:800}}>N{appBal.toLocaleString()}</div><div style={{fontSize:5,color:C.muted}}>App 20% - Rose 100 App 20</div></div>
              <div style={{background:C.gold,padding:8,borderRadius:10,textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:"#000"}}>80/20</div><div style={{fontSize:5,color:"#000"}}>Rose 100 Formula</div></div>
            </div>
            <div style={{marginTop:8,fontSize:6,color:C.muted}}>Rose Gift = 100 Units N500 - Creator 80 Units 80% N400 - App 20 Units 20% N100 - Creator keeps 80% App 20% - Example Rose 100 creators keep 80% 20% for app owner - 80/20 intact immediate</div>
          </div>
        </div>
      )}
      {tab==="fyp"&&(
        <div style={{padding:10}}>
          <div style={{display:"flex",gap:5,marginBottom:10}}><button onClick={()=>setFypTab("foryou")} style={{flex:1,padding:"6px",borderRadius:11,border:"none",fontSize:7,fontWeight:700,background:fypTab==="foryou"?C.gold:"transparent"}}>For You</button><button onClick={()=>setFypTab("following")} style={{flex:1,padding:"6px",borderRadius:11,border:"none",fontSize:7,fontWeight:700,background:fypTab==="following"?C.surface:"transparent"}}>Following {youFollow.length} - Feed from who dey follow</button></div>
          <div style={{height:400,background:"#050507",borderRadius:16,overflow:"hidden"}}>
            <div style={{height:280,display:"flex",alignItems:"center",justifyContent:"center",background:"#050507",position:"relative"}}><span style={{color:C.gold}}>{fypTab==="foryou"?"For You - Algorithm greater than TikTok x1000000":"Following Feed - From who dey follow - Rose 100 Creator 80% App 20%"}</span><button onClick={crown} style={{position:"absolute",right:10,bottom:20,width:36,height:36,borderRadius:18,background:C.gold,border:"none"}}>Crown</button><button onClick={()=>setShowGift(true)} style={{position:"absolute",right:10,bottom:70,width:36,height:36,borderRadius:18,background:C.gold,border:"none"}}>Gift</button></div>
          </div>
        </div>
      )}
      {tab==="profile"&&(
        <div style={{padding:10}}>
          <div style={{background:C.surface,padding:10,borderRadius:14}}><div style={{fontSize:12,fontWeight:800}}>Asedelmade.1 LV100 VERIFIED Active Now</div><div style={{fontSize:6,opacity:0.5}}>Following {youFollow.length} Followers {followers.length} Active {activeFollowers} - Rose 100 Creator 80% App 20%</div></div>
          <div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}><div style={{background:"#1A1A1A",padding:10,borderRadius:12}}><div style={{fontSize:5.5,color:C.gold}}>WALLET</div><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>N{wallet.toLocaleString()}</div></div><div style={{background:C.surface,padding:10,borderRadius:12}}><div style={{fontSize:5.5,color:C.gold}}>CREATOR 80%</div><div style={{fontSize:16,fontWeight:800}}>N{creatorBal.toLocaleString()}</div></div><div style={{background:C.surface,padding:10,borderRadius:12}}><div style={{fontSize:5.5,color:C.gold}}>APP 20%</div><div style={{fontSize:16,fontWeight:800}}>N{appBal.toLocaleString()}</div></div></div>
          <div style={{marginTop:10,background:C.surface,padding:10,borderRadius:14}}><div style={{display:"flex",gap:5}}><button onClick={()=>setFundTab("fund")} style={{flex:1,padding:"6px",borderRadius:11,border:"none",fontSize:7,fontWeight:700,background:fundTab==="fund"?C.surface:"transparent"}}>Fund</button><button onClick={()=>setFundTab("withdraw")} style={{flex:1,padding:"6px",borderRadius:11,border:"none",fontSize:7,fontWeight:700,background:fundTab==="withdraw"?C.gold:"transparent"}}>Withdraw</button></div>{fundTab==="fund"?<div style={{display:"flex",gap:5,marginTop:10}}>{[5000,10000,25000,50000].map(a=><button key={a} onClick={()=>{if(isGuest){alert("Sign in"); return;} setWallet(w=>w+a);}} style={{fontSize:6.5,padding:"6px 10px",borderRadius:20,background:"#1A1A1A",color:"#fff",border:"1px solid rgba(207,166,91,0.25)"}}>+N{a/1000}k</button>)}</div>:<div style={{marginTop:10}}><button onClick={()=>alert("Withdraw 30s - 80/20 intact Immediate - Rose 100 Creator 80% App 20%")} style={{padding:"7px 12px",borderRadius:10,background:C.gold,color:"#000",border:"none",fontWeight:800,fontSize:6.5}}>Withdraw 30s - 80/20 - Rose 100 - 80/20</button></div>}</div>
        </div>
      )}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.surface,borderTop:"1px solid rgba(207,166,91,0.15)",display:"flex",justifyContent:"space-around",padding:"10px 0",zIndex:40}}>
        {[["FIRST","first"],["FYP","fyp"],["Live","live"],["Drama","drama"],["Upload","upload"],["Profile","profile"]].map(([lb,tb])=><div key={tb} onClick={()=>setTab(tb)} style={{textAlign:"center",cursor:"pointer",opacity:tab===tb?1:0.5}}><div style={{fontSize:12,color:tab===tb?C.gold:C.muted}}>{lb}</div><div style={{fontSize:5,color:tab===tb?C.gold:C.muted}}>{lb}</div></div>)}
      </div>
      {showGift&&(
        <div style={{position:"fixed",inset:0,background:C.bg,zIndex:100,display:"flex",flexDirection:"column"}}>
          <div style={{padding:"10px 12px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid rgba(207,166,91,0.2)"}}><div style={{fontSize:9,fontWeight:700}}>Gift Box - Rose 100 Creator 80% App 20%</div><button onClick={()=>setShowGift(false)} style={{width:24,height:24,borderRadius:12,border:"1px solid rgba(207,166,91,0.2)"}}>X</button></div>
          <div style={{flex:1,overflowY:"auto",padding:10,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>{GIFTS.map((g,i)=><div key={i} style={{background:C.surface,border:"1px solid rgba(207,166,91,0.15)",borderRadius:14,padding:8,textAlign:"center"}}><div style={{fontSize:14}}>{g.n}</div><div style={{fontSize:6.5,fontWeight:700,marginTop:4}}>{g.n}</div><div style={{fontSize:5.5,opacity:0.5}}>{g.units} Units - N{g.p}</div><div style={{fontSize:4.5,marginTop:2,padding:"2px 4px",borderRadius:8,background:"rgba(207,166,91,0.15)",color:C.gold}}>Creator {g.creator} (80%) App {g.app} (20%)</div><button onClick={()=>sendGift(g)} style={{marginTop:6,width:"100%",padding:"5px",borderRadius:20,background:C.gold,color:"#000",border:"none",fontSize:7,fontWeight:700}}>Send</button></div>)}</div>
        </div>
      )}
      {fx&&<div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",background:"rgba(5,5,7,0.65)"}}><div style={{fontSize:64}}>Crown</div><div style={{fontSize:9,marginTop:12,background:C.gold,color:"#000",padding:"8px 18px",borderRadius:20,fontWeight:800,maxWidth:320,textAlign:"center"}}>{fx.txt}</div></div>}
    </div>
  );
}
