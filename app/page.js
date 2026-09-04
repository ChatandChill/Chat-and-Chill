"use client";
import { useState, useEffect } from "react";
export default function Page(){
  const [showLogo,setShowLogo]=useState(true);
  const [showPremiumPop,setShowPremiumPop]=useState(false);
  const [isGuest,setIsGuest]=useState(true);
  const [tab,setTab]=useState("fyp");
  const [theme,setTheme]=useState("dark");
  const [quality,setQuality]=useState("144p");
  const [crowns,setCrowns]=useState(842);
  const [wallet,setWallet]=useState(10000000);
  const [creatorBal,setCreatorBal]=useState(0);
  const [appBal,setAppBal]=useState(0);
  const [toast,setToast]=useState("");
  const [user,setUser]=useState(null);
  const [form,setForm]=useState({fullName:"",username:"",email:"",pass:"",agree:false});
  const [showLogin,setShowLogin]=useState(false);
  const [weather] = useState([
    {city:"Lagos",temp:"32°C",cond:"☀️ Sunny",flag:"🇳🇬"},
    {city:"London",temp:"18°C",cond:"🌧️ Rain",flag:"🇬🇧"},
    {city:"New York",temp:"24°C",cond:"⛅ Cloudy",flag:"🇺🇸"},
    {city:"Dubai",temp:"38°C",cond:"🔥 Hot",flag:"🇦🇪"},
  ]);
  const [fx] = useState([
    {pair:"USD/NGN",rate:"1,589",change:"+0.8%"},
    {pair:"GBP/NGN",rate:"2,012",change:"+1.2%"},
    {pair:"EUR/NGN",rate:"1,724",change:"-0.3%"},
    {pair:"CAD/NGN",rate:"1,165",change:"+0.5%"},
  ]);
  const fypVideos=[
    {u:"lagos_queen",c:"Lagos Night Vibes - Premium Electrifying 4K 🔊 - Beyond Instagram",l:"12.4k",cr:1842,eye:342,type:"PREMIUM AI"},
    {u:"heritage_box",c:"1000 ONLY Lagos - 1M x Upgraded 💎 - Creator 80% App 20%",l:"8.9k",cr:4200,eye:489,type:"DIASPORA"},
    {u:"diaspora_king",c:"London to Lagos Live - Currency & Weather Inside 🌍💱",l:"5.2k",cr:3100,eye:221,type:"LIVE"},
    {u:"ai_creator",c:"AI Gold Glow Effect - Premium Netflix Quality ✨👑",l:"15.1k",cr:5100,eye:892,type:"AI PREMIUM"},
  ];
  useEffect(()=>{ 
    const t1=setTimeout(()=>{ setShowLogo(false); setShowPremiumPop(true); },2200);
    return()=>clearTimeout(t1);
  },[]);
  useEffect(()=>{ if(toast){ const t=setTimeout(()=>setToast(""),3000); return()=>clearTimeout(t); } },[toast]);
  const signup=()=>{ if(!form.fullName||!form.username||!form.email||form.pass.length<6||!form.agree){ setToast("Fill all + agree 80%"); return; } setUser({name:form.fullName,username:form.username}); setIsGuest(false); setShowLogin(false); setShowPremiumPop(false); setWallet(v=>v-20); setCreatorBal(v=>v+16); setAppBal(v=>v+4); setCrowns(v=>v+100); setToast("Welcome @"+form.username+" +100 Crowns - Premium Active"); };
  const crown=()=>{ if(isGuest){ setShowLogin(true); return; } if(wallet<20){ setToast("Fund vault N10M"); return; } setWallet(v=>v-20); setCreatorBal(v=>v+16); setAppBal(v=>v+4); setCrowns(v=>v+1); setToast("Crown 👑 Rose 100 - Creator N16"); };
  const TH=theme==="dark"?{bg:"#050507",card:"#101012",card2:"#15151A",text:"#fff",sub:"#888",gold:"#CFA658",gold2:"#FFD700",border:"#222",nav:"#0A0A0A"}:{bg:"#FFF",card:"#F6F5F2",card2:"#FFFFFF",text:"#000",sub:"#666",gold:"#CFA658",gold2:"#B8860B",border:"#E8E2D0",nav:"#FFF"};
  return(
    <div style={{background:TH.bg,color:TH.text,minHeight:"100vh",fontFamily:"sans-serif",paddingBottom:72}}>
      <style>{"@keyframes pop{0%{transform:scale(.3);opacity:0}60%{transform:scale(1.2);opacity:1}100%{transform:scale(1);opacity:1}} @keyframes goldPulse{0%,100%{box-shadow:0 0 20px #CFA658,0 0 40px #CFA65840}50%{box-shadow:0 0 40px #CFA658,0 0 80px #CFA65880}} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}} @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}} @keyframes electric{0%{filter:brightness(1)}50%{filter:brightness(1.4) drop-shadow(0 0 20px #CFA658)}100%{filter:brightness(1)}}"}</style>
      <div style={{background:"linear-gradient(90deg,#00C853,#CFA658,#FFD700)",color:"#000",padding:"6px",textAlign:"center",fontSize:10,fontWeight:900,letterSpacing:".5px"}}>V13 PREMIUM ELECTRIFYING - 1,000,000x IG/TikTok/FB - Crowns {crowns} - 2G {quality} - Weather + FX LIVE</div>
      {toast && <div style={{position:"fixed",top:60,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(90deg,${TH.gold},${TH.gold2})`,color:"#000",padding:"10px 18px",borderRadius:24,fontSize:11,fontWeight:900,zIndex:9999,boxShadow:"0 0 30px "+TH.gold+"80"}}>{toast}</div>}
      
      {showLogo && <div style={{position:"fixed",inset:0,background:`radial-gradient(circle at center, #1A1500 0%, ${TH.bg} 70%)`,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
        <div style={{position:"absolute",inset:0,background:`url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22><circle cx=%2250%25%22 cy=%2250%25%22 r=%2240%25%22 fill=%22none%22 stroke=%22${TH.gold}22%22 stroke-width=%221%22 stroke-dasharray=%225 5%22/></svg>')`,opacity:.3}}></div>
        <img src="/logo-dark.png" alt="logo" style={{width:130,height:130,borderRadius:26,objectFit:"cover",animation:"pop 1.4s cubic-bezier(.34,1.56,.64,1) forwards, goldPulse 2s ease infinite 1.4s",zIndex:2}} onError={(e)=>{e.target.style.display='none';}}/>
        <div style={{width:130,height:130,borderRadius:26,background:`linear-gradient(135deg,${TH.gold},${TH.gold2})`,display:"none",alignItems:"center",justifyContent:"center",fontSize:42,fontWeight:900,color:"#000",animation:"pop 1.4s cubic-bezier(.34,1.56,.64,1) forwards, goldPulse 2s ease infinite 1.4s",zIndex:2}}>C</div>
        <h1 style={{color:TH.gold,marginTop:16,fontWeight:900,fontSize:22,letterSpacing:"2px",textShadow:"0 0 20px "+TH.gold+"80",zIndex:2}}>Chat & Chill</h1>
        <p style={{color:TH.sub,fontSize:10,marginTop:4,letterSpacing:"3px",zIndex:2}}>BEYOND TIKTOK LEVEL 100 • PREMIUM</p>
        <div style={{marginTop:20,display:"flex",gap:4,zIndex:2}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:3,background:TH.gold,animation:`float 1.2s ease infinite ${i*.2}s`}}></div>)}</div>
      </div>}

      {showPremiumPop && <div style={{position:"fixed",inset:0,background:"#000",zIndex:800,display:"flex",justifyContent:"center"}}>
        <div style={{width:"100%",maxWidth:430,height:"100vh",background:`radial-gradient(circle at 30% 20%, #1A1500 0%, #000 60%)`,position:"relative",overflow:"hidden",border:`1px solid ${TH.gold}40`}}>
          <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg, transparent 0%, ${TH.bg} 85%)`,zIndex:1}}></div>
          <div style={{position:"absolute",top:-50,left:-50,width:200,height:200,background:`radial-gradient(circle, ${TH.gold}30 0%, transparent 70%)`,borderRadius:"50%",filter:"blur(20px)",animation:"electric 3s ease infinite"}}></div>
          <div style={{position:"absolute",bottom:100,right:-30,width:180,height:180,background:`radial-gradient(circle, ${TH.gold2}20 0%, transparent 70%)`,borderRadius:"50%",filter:"blur(25px)",animation:"electric 2.5s ease infinite .5s"}}></div>
          
          <div style={{position:"absolute",top:12,left:12,right:12,display:"flex",justifyContent:"space-between",zIndex:10}}>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <img src="/logo-dark.png" alt="logo" style={{width:28,height:28,borderRadius:8,border:"1px solid "+TH.gold}}/>
              <span style={{color:"#fff",fontSize:10,background:"linear-gradient(90deg,#CFA658,#FFD700)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:900,padding:"4px 10px",borderRadius:20,border:"1px solid "+TH.gold+"40"}}>PREMIUM NETFLIX • ELECTRIFYING</span>
            </div>
            <button onClick={()=>setShowPremiumPop(false)} style={{background:"rgba(255,255,255,.1)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",width:30,height:30,borderRadius:15,fontWeight:900}}>✕</button>
          </div>

          <div style={{position:"relative",zIndex:5,height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"20px"}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{width:90,height:90,margin:"0 auto",borderRadius:20,background:`linear-gradient(135deg,${TH.gold},${TH.gold2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,fontWeight:900,color:"#000",boxShadow:"0 0 40px "+TH.gold+"60, 0 0 80px "+TH.gold+"30",animation:"goldPulse 2s ease infinite"}}>C</div>
              <h2 style={{color:"#fff",fontSize:24,fontWeight:900,marginTop:14,letterSpacing:"1px",textShadow:"0 0 20px "+TH.gold}}>Beyond Instagram</h2>
              <p style={{color:TH.gold,fontSize:11,marginTop:4,fontWeight:800,letterSpacing:"2px"}}>1,000,000x TIKTOK • FACEBOOK • PREMIUM</p>
              <p style={{color:"#aaa",fontSize:10,marginTop:6,maxWidth:300,margin:"6px auto 0",lineHeight:"14px"}}>Weather Forecast + Currency Exchange for Diaspora Creators • Audio + AI Video + 12BOX Live • Rose 100 Premium</p>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
              <div style={{background:"rgba(255,255,255,.06)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:10}}>
                <p style={{fontSize:9,fontWeight:900,color:TH.gold,letterSpacing:"1px"}}>🌦️ WEATHER • DIASPORA</p>
                {weather.slice(0,2).map(w=><div key={w.city} style={{display:"flex",justifyContent:"space-between",marginTop:6}}><span style={{fontSize:10,color:"#fff"}}>{w.flag} {w.city}</span><span style={{fontSize:10,color:"#aaa"}}>{w.temp} {w.cond}</span></div>)}
              </div>
              <div style={{background:"rgba(255,255,255,.06)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:10}}>
                <p style={{fontSize:9,fontWeight:900,color:TH.gold,letterSpacing:"1px"}}>💱 FX • NAIRA RATES</p>
                {fx.slice(0,2).map(f=><div key={f.pair} style={{display:"flex",justifyContent:"space-between",marginTop:6}}><span style={{fontSize:10,color:"#fff"}}>{f.pair}</span><span style={{fontSize:10,color:f.change.startsWith("+")?"#00C853":"#FF3B30"}}>{f.rate} {f.change}</span></div>)}
              </div>
            </div>

            <div style={{background:"rgba(0,0,0,.5)",backdropFilter:"blur(16px)",border:"1px solid "+TH.gold+"30",borderRadius:16,padding:12}}>
              <div style={{display:"flex",gap:8,overflowX:"auto"}}>
                {fypVideos.slice(0,3).map((v,i)=><div key={i} style={{minWidth:92,background:"#111",borderRadius:10,padding:8,border:"1px solid "+TH.border}}>
                  <div style={{height:60,background:`linear-gradient(135deg,#222,${TH.gold}20)`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🎬</div>
                  <p style={{fontSize:8,fontWeight:800,color:"#fff",marginTop:6}}>@{v.u}</p>
                  <p style={{fontSize:7,color:TH.sub,marginTop:2}}>👁 {v.eye} • {v.type}</p>
                </div>)}
              </div>
            </div>

            <button onClick={()=>{ setShowPremiumPop(false); setShowLogin(true); }} style={{marginTop:16,background:`linear-gradient(90deg,${TH.gold},${TH.gold2})`,color:"#000",padding:"16px",borderRadius:24,border:"none",fontWeight:900,fontSize:14,letterSpacing:"1px",boxShadow:"0 0 30px "+TH.gold+"60",animation:"goldPulse 2s ease infinite"}}>⚡ ENTER PREMIUM — 1,000,000x UPGRADED</button>
            <p style={{textAlign:"center",color:"#666",fontSize:8,marginTop:8}}>Creator 80% • App 20% • Rose 100 • Vault N10M • 2G 144p • No Crash</p>
          </div>
        </div>
      </div>}

      <header style={{display:"flex",justifyContent:"space-between",padding:"10px 12px",borderBottom:"1px solid "+TH.border,alignItems:"center",background:TH.card}}>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <img src="/logo-dark.png" alt="logo" style={{width:30,height:30,borderRadius:8,border:"1px solid "+TH.gold}} onError={(e)=>e.target.style.display='none'}/>
          <div><p style={{fontSize:12,fontWeight:900,letterSpacing:".5px"}}>Chat & Chill</p><p style={{fontSize:7,color:TH.gold,fontWeight:800}}>PREMIUM ELECTRIFYING</p></div>
          <div style={{display:"flex",gap:4,marginLeft:6}}>
            <span style={{fontSize:7,background:"#00C853",color:"#fff",padding:"2px 5px",borderRadius:6,fontWeight:900}}>● LIVE 842</span>
            <span style={{fontSize:7,background:TH.gold,color:"#000",padding:"2px 5px",borderRadius:6,fontWeight:900}}>2G {quality}</span>
          </div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <span style={{fontSize:9,color:TH.gold,fontWeight:800}}>N{wallet.toLocaleString()}</span>
          <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")} style={{background:TH.card2,border:"1px solid "+TH.border,width:28,height:28,borderRadius:14}}>{theme==="dark"?"☀️":"🌙"}</button>
          <button onClick={()=>isGuest?setShowLogin(true):setIsGuest(true)} style={{background:`linear-gradient(90deg,${TH.gold},${TH.gold2})`,color:"#000",padding:"6px 12px",borderRadius:16,border:"none",fontWeight:900,fontSize:10}}>{isGuest?"Sign In":user?user.username:"Out"}</button>
        </div>
      </header>

      <div style={{display:"flex",gap:6,padding:"10px 12px",overflowX:"auto",background:TH.card,borderBottom:"1px solid "+TH.border}}>
        <div style={{display:"flex",gap:6}}>
          {weather.map(w=><div key={w.city} style={{background:TH.card2,border:"1px solid "+TH.border,padding:"6px 10px",borderRadius:12,display:"flex",gap:6,alignItems:"center",whiteSpace:"nowrap"}}>
            <span style={{fontSize:12}}>{w.flag}</span><div><p style={{fontSize:9,fontWeight:800}}>{w.city} {w.temp}</p><p style={{fontSize:7,color:TH.sub}}>{w.cond}</p></div>
          </div>)}
        </div>
        <div style={{width:1,background:TH.border,margin:"0 4px"}}></div>
        <div style={{display:"flex",gap:6}}>
          {fx.map(f=><div key={f.pair} style={{background:TH.card2,border:"1px solid "+TH.gold+"30",padding:"6px 10px",borderRadius:12,whiteSpace:"nowrap"}}>
            <p style={{fontSize:8,fontWeight:900,color:TH.gold}}>{f.pair}</p><p style={{fontSize:9,fontWeight:800}}>{f.rate} <span style={{fontSize:7,color:f.change.startsWith("+")?"#00C853":"#FF3B30"}}>{f.change}</span></p>
          </div>)}
        </div>
      </div>

      {showLogin && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",backdropFilter:"blur(12px)",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",padding:18}}><div style={{background:"#fff",color:"#000",padding:22,borderRadius:16,width:"100%",maxWidth:360,border:"2px solid "+TH.gold}}><div style={{textAlign:"center",marginBottom:12}}><img src="/logo-dark.png" alt="logo" style={{width:50,height:50,borderRadius:12,margin:"0 auto"}}/><h3 style={{fontWeight:900,marginTop:8}}>Join Premium • V13</h3><p style={{fontSize:10,color:"#666"}}>1,000,000x Upgraded • Weather + FX for Diaspora</p></div><input value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} placeholder="Full Name" style={{border:"1px solid #ddd",padding:11,width:"100%",borderRadius:10,marginBottom:8}}/><input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="Username" style={{border:"1px solid #ddd",padding:11,width:"100%",borderRadius:10,marginBottom:8}}/><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" style={{border:"1px solid #ddd",padding:11,width:"100%",borderRadius:10,marginBottom:8}}/><input value={form.pass} onChange={e=>setForm({...form,pass:e.target.value})} placeholder="Password 6+" type="password" style={{border:"1px solid #ddd",padding:11,width:"100%",borderRadius:10,marginBottom:12}}/><label style={{display:"flex",gap:6,fontSize:11,marginBottom:14}}><input type="checkbox" checked={form.agree} onChange={e=>setForm({...form,agree:e.target.checked})}/> Agree 80% Creator • Premium</label><button onClick={signup} style={{background:`linear-gradient(90deg,#000,${TH.gold})`,color:"#fff",padding:14,width:"100%",borderRadius:12,border:"none",fontWeight:900}}>Sign Up +100 Crowns ⚡ Premium</button><button onClick={()=>setShowLogin(false)} style={{marginTop:10,width:"100%",border:"none",background:"none",color:"#888",fontSize:12}}>Cancel</button></div></div>}

      <main style={{padding:12,maxWidth:480,margin:"0 auto"}}>
        {fypVideos.map((v,i)=><div key={i} style={{background:TH.card,border:`1px solid ${i===0?TH.gold+"60":TH.border}`,borderRadius:16,marginBottom:14,overflow:"hidden",boxShadow:i===0?`0 0 20px ${TH.gold}20`:"none"}}>
          <div style={{height:260,background:`linear-gradient(180deg,#1A1A1A,#000)`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <div style={{position:"absolute",top:10,left:10,right:10,display:"flex",justifyContent:"space-between",zIndex:2}}>
              <span style={{background:"rgba(0,0,0,.7)",backdropFilter:"blur(8px)",color:"#fff",fontSize:9,padding:"4px 10px",borderRadius:20,border:"1px solid rgba(255,255,255,.1)"}}>👁 {v.eye} • {v.l} • {quality} • {v.type} 🔊</span>
              <span style={{background:`linear-gradient(90deg,${TH.gold},${TH.gold2})`,color:"#000",fontSize:8,padding:"4px 8px",borderRadius:12,fontWeight:900}}>{i===0?"PREMIUM TOP":"ELECTRIFYING"}</span>
            </div>
            <div style={{width:64,height:64,borderRadius:16,background:`linear-gradient(135deg,${TH.gold},${TH.gold2})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:22,color:"#000",boxShadow:"0 0 30px "+TH.gold+"50"}}>{v.u[0].toUpperCase()}</div>
            <p style={{color:"#fff",fontWeight:900,marginTop:10,fontSize:14}}>@{v.u}</p>
            <p style={{color:"#bbb",fontSize:11,marginTop:4,textAlign:"center",maxWidth:300,lineHeight:"14px"}}>{v.c}</p>
            <div style={{position:"absolute",bottom:12,right:12,display:"flex",flexDirection:"column",gap:10}}>
              <button onClick={crown} style={{width:40,height:40,borderRadius:20,background:`linear-gradient(135deg,${TH.gold},${TH.gold2})`,border:"none",fontWeight:900,color:"#000",boxShadow:"0 0 15px "+TH.gold+"60"}}>👑</button>
              <button style={{width:40,height:40,borderRadius:20,background:"rgba(255,255,255,.12)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.15)",color:"#fff"}}>💬</button>
              <button style={{width:40,height:40,borderRadius:20,background:"rgba(255,255,255,.12)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.15)",color:"#fff"}}>🌹</button>
            </div>
            <div style={{position:"absolute",bottom:12,left:12,background:"rgba(0,0,0,.6)",backdropFilter:"blur(8px)",padding:"6px 10px",borderRadius:12,border:"1px solid rgba(255,255,255,.1)"}}>
              <p style={{fontSize:8,color:TH.gold,fontWeight:900}}>🎵 AI + Audio • 2G OK</p>
              <div style={{display:"flex",gap:2,marginTop:4}}>{[1,2,3,4,5].map(n=><div key={n} style={{width:2,height:8,background:TH.gold,borderRadius:1,opacity:.3+n*.15}}></div>)}</div>
            </div>
          </div>
          <div style={{padding:12,display:"flex",justifyContent:"space-between",alignItems:"center",background:TH.card2}}>
            <div><p style={{fontSize:12,fontWeight:800}}>@{v.u} • {v.cr} Crowns • Vault N10M</p><p style={{fontSize:10,color:TH.sub,marginTop:2}}>Creator N16 80% • App N4 20% • Rose 100 Premium • Weather + FX Active</p></div>
            <button onClick={crown} style={{background:`linear-gradient(90deg,${TH.gold},${TH.gold2})`,color:"#000",padding:"8px 14px",borderRadius:20,border:"none",fontWeight:900,fontSize:11,boxShadow:"0 0 15px "+TH.gold+"40"}}>👑 Crown N20</button>
          </div>
        </div>)}
        <div style={{background:`linear-gradient(135deg,${TH.card},${TH.card2})`,border:"1px solid "+TH.gold+"40",borderRadius:16,padding:14,marginTop:8}}>
          <p style={{fontWeight:900,fontSize:12}}>V13 PREMIUM Features • 1,000,000x Upgraded</p>
          <p style={{fontSize:10,color:TH.sub,marginTop:6,lineHeight:"15px"}}>✅ Netflix Premium Pop-Up Electrifying with Gold Glow • ✅ Weather Forecast Lagos/London/NY/Dubai for Diaspora • ✅ Currency Exchange USD/GBP/EUR/CAD to NGN Live • ✅ 12BOX Video Live Creator+11 Guests Eye • ✅ AI Effects Camera/Sound/AI • ✅ Audio Streaming 2G 144p • ✅ Drama Movies + Music Page • ✅ Inbox Private + Notifications • ✅ Premium Gifts • ✅ Logo Pop • Won't Crash Highest Version • ACTIVE</p>
        </div>
      </main>
      <nav style={{position:"fixed",bottom:0,left:0,right:0,height:70,background:TH.nav,borderTop:"1px solid "+TH.border,display:"flex",justifyContent:"space-around",alignItems:"center",zIndex:40,backdropFilter:"blur(12px)"}}>
        {[{k:"fyp",l:"FYP",i:"◎"},{k:"live",l:"LIVE 12BOX",i:"+"},{k:"drama",l:"DRAMA",i:"🎬"},{k:"inbox",l:"INBOX",i:"💬"},{k:"wallet",l:"WALLET",i:"₦"},{k:"profile",l:"PROFILE",i:"◐"}].map(t=>{ const a=tab===t.k; return(<button key={t.k} onClick={()=>{ setTab(t.k); setToast(t.l+" - Premium Active"); }} style={{background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:a?TH.gold:TH.sub}}><div style={{width:t.k==="live"?42:26,height:t.k==="live"?42:26,borderRadius:t.k==="live"?21:13,background:t.k==="live"?`linear-gradient(135deg,${TH.gold},${TH.gold2})`:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:t.k==="live"?"#000":a?TH.gold:TH.sub,border:"1px solid "+(a?TH.gold:TH.border),boxShadow:a?`0 0 12px ${TH.gold}60`:"none"}}>{t.i}</div><span style={{fontSize:8,fontWeight:a?800:500,marginTop:2}}>{t.l}</span></button>); })}
      </nav>
    </div>
  );
}
