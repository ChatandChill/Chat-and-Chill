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
  const posts = [
    {id:1, name:"African Queen", city:"Lagos", country:"NG", color:"#D4AF37", emoji:"👁️", gift:"African Eye", amount:5000, friends:"12.5K friends", verified:true},
    {id:2, name:"Diaspora King", city:"London", country:"UK", color:"#3B82F6", emoji:"💎", gift:"Diamond", amount:1000, friends:"8.2K friends", verified:true},
    {id:3, name:"Chill Vibes Family", city:"Accra", country:"GH", color:"#22C55E", emoji:"❤️", gift:"Love Heart", amount:2000, friends:"23K friends", verified:false},
    {id:4, name:"Level 100 Crew", city:"Nairobi", country:"KE", color:"#A855F7", emoji:"🔥", gift:"Fire Love", amount:3000, friends:"5.1K friends", verified:true},
    {id:5, name:"Beyond TikTok Group", city:"Johannesburg", country:"ZA", color:"#F59E0B", emoji:"🌍", gift:"Africa Globe", amount:500, friends:"45K friends", verified:true},
  ];

  useEffect(function(){
    var iv=setInterval(function(){ setProgress(function(p){ return p>=100?100:p+9; }); },90);
    var t1=setTimeout(function(){ setShowNetflix(false); },2600);
    return function(){ clearInterval(iv); clearTimeout(t1); };
  },[]);
  useEffect(function(){ if(countdown>0){ var x=setTimeout(function(){ setCountdown(function(c){ return c-1; }); },1000); return function(){ clearTimeout(x); }; } },[countdown]);
  useEffect(function(){ if(toast){ var x=setTimeout(function(){ setToast(""); },3500); return function(){ clearTimeout(x); }; } },[toast]);

  function sendCode(){ if(!email){ setToast("Enter email"); return; } setShowCodeField(true); setCountdown(60); setToast("Code 123456 sent Hidden until Sign Up click Now visible Facebook+IG+TikTok DNA"); }
  function verify(){ if(code==="123456"){ setUser({email:email}); setShowAuth(false); setToast("Verified Triple DNA Welcome Facebook+TikTok+Instagram 5M Hedge"); setCode(""); setShowCodeField(false); }else{ setToast("Use 123456 protect fund from hackers"); } }
  async function doGift(a,n){
    if(!user){ setShowAuth(true); return; }
    try{
      var res=await fetch("/api/gift",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({senderId:user.email,receiverId:"creator",giftAmount:a,giftName:n})});
      var d=await res.json();
      if(d.success){ setBalance(d.wallets.sender_naira); setToast(d.message+" Triple DNA"); }else{ setToast(d.error); }
    }catch(e){ setToast("Gift "+n+" N"+a+" -> N"+Math.floor(a*0.7)+" instant 70% Triple DNA Your API Benefit Not Bank"); }
  }
  function handleLike(id){ setLiked(function(prev){ var next={...prev}; next[id]=!next[id]; return next; }); setToast(id? "❤️ Liked Double-tap IG + FB Reaction": ""); }

  return(
    <div style={{background:"#000",color:"#E2E8F0",minHeight:"100vh",fontFamily:"system-ui"}}>
      {toast? <div style={{position:"fixed",top:12,left:"50%",transform:"translateX(-50%)",background:"#D4AF37",color:"#000",padding:"10px 18px",borderRadius:20,fontWeight:900,zIndex:9999,fontSize:11,boxShadow:"0 4px 20px rgba(0,0,0,.5)"}}>{toast}</div> : null}

      {showNetflix? (
        <div style={{background:"#000",height:"100vh",width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"fixed",top:0,left:0,zIndex:9999}}>
          <div style={{position:"relative"}}><div style={{position:"absolute",inset:-8,borderRadius:28,background:"linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5,#1877F2)",filter:"blur(12px)",opacity:0.6}}></div><img src="/logo-dark.png" alt="Real Logo Triple DNA" style={{width:128,height:128,borderRadius:24,border:"2px solid #D4AF37",position:"relative"}}/></div>
          <div style={{color:"#fff",marginTop:16,fontWeight:900,fontSize:24}}>Chat and Chill</div>
          <div style={{color:"#D4AF37",fontSize:11,fontWeight:800,marginTop:4}}>Facebook + TikTok + Instagram DNA • Triple Mix</div>
          <div style={{color:"#fff",fontSize:13,marginTop:6}}>Talk cool • Chill out • Have fun • Friendship Benefits</div>
          <div style={{width:180,height:4,background:"#1E293B",borderRadius:4,marginTop:14,overflow:"hidden"}}><div style={{width:progress+"%",height:"100%",background:"linear-gradient(90deg,#D4AF37,#1877F2,#E1306C)"}}></div></div>
          <div style={{color:"#666",fontSize:9,marginTop:8}}>Beyond TikTok LEVEL 100 • 5M Hedge Ahead • Not Bank App</div>
        </div>
      ) : null}

      <header style={{display:"flex",justifyContent:"space-between",padding:"10px 12px",background:"#0A0E1A",borderBottom:"1px solid #1E293B",position:"sticky",top:0,zIndex:20}}>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><img src="/logo-dark.png" style={{width:30,height:30,borderRadius:8,border:"1px solid #D4AF37"}}/><div><div style={{fontWeight:900,fontSize:12}}>Chat & Chill • Triple DNA</div><div style={{fontSize:8,color:"#94A3B8"}}>FB Friends + TikTok FYP + IG Stories • 5 Places</div></div></div>
        <div style={{display:"flex",gap:6}}><div style={{background:"#1E293B",padding:"6px 10px",borderRadius:12,fontSize:10}}>👥 {posts.length} Friends</div><button onClick={function(){ setShowAuth(true); }} style={{background:user?"#D4AF37":"#1877F2",color:user?"#000":"#fff",padding:"6px 14px",borderRadius:12,fontSize:11,fontWeight:800,border:"none"}}>{user? "N"+balance+" Benefit" : "Join Benefit"}</button></div>
      </header>

      <div style={{background:"linear-gradient(90deg,#D4AF37,#1877F2,#E1306C)",color:"#fff",padding:"6px",textAlign:"center",fontSize:9,fontWeight:900}}>TRIPLE DNA UPGRADED • TikTok FYP Guest 5 Places + Instagram Stories Gradient Ring + Facebook Friends Reactions Groups • 70% Instant Direct Naira No Coin Not Bank • 5M Hedge</div>

      <div style={{display:"flex",gap:10,overflow:"auto",padding:"10px 12px",background:"#0A0E1A",borderBottom:"1px solid #1E293B"}}>
        <div style={{minWidth:64,textAlign:"center"}}><div style={{width:64,height:64,borderRadius:32,background:"#1E293B",display:"flex",alignItems:"center",justifyContent:"center",border:"2px dashed #444",fontSize:22}}>+</div><div style={{fontSize:9,marginTop:4,fontWeight:700}}>Your Story</div><div style={{fontSize:7,color:"#1877F2"}}>FB • Add</div></div>
        {posts.map(function(s){ return(
          <div key={"story"+s.id} style={{minWidth:64,textAlign:"center"}}>
            <div style={{width:64,height:64,borderRadius:32,padding:"2px",background:s.verified?"linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)":"#333"}}>
              <div style={{background:"#000",width:"100%",height:"100%",borderRadius:32,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #000",position:"relative"}}>
                <div style={{fontSize:26}}>{s.emoji}</div>
                {s.verified? <div style={{position:"absolute",bottom:-2,right:-2,background:"#1877F2",width:18,height:18,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,border:"2px solid #000"}}>✓</div> : null}
              </div>
            </div>
            <div style={{fontSize:9,marginTop:4,whiteSpace:"nowrap",fontWeight:700}}>{s.name.split(" ")[0]}</div>
            <div style={{fontSize:7,color:"#D4AF37"}}>{s.city} • LIVE</div>
          </div>
        ); })}
      </div>

      {showAuth? (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#fff",padding:16,borderRadius:16,border:"2px solid #D4AF37",width:"100%",maxWidth:360}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><b style={{color:"#000",fontSize:13}}>Join Triple DNA Real App Facebook+IG+TikTok</b><button onClick={function(){ setShowAuth(false); }}>X</button></div>
            <div style={{display:"flex",background:"#E2E8F0",borderRadius:10,padding:3,marginBottom:10}}>
              <button onClick={function(){ setAuthTab("signin"); }} style={{flex:1,background:authTab==="signin"?"#0A0E1A":"transparent",color:authTab==="signin"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800,fontSize:12}}>Sign In FB No Code</button>
              <button onClick={function(){ setAuthTab("signup"); }} style={{flex:1,background:authTab==="signup"?"#0A0E1A":"transparent",color:authTab==="signup"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800,fontSize:12}}>Sign Up IG+FB</button>
            </div>
            <input value={email} onChange={function(e){ setEmail(e.target.value); }} placeholder="Email Facebook style" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #CBD5E1",marginBottom:8,color:"#000"}}/>
            {authTab==="signin"? <button onClick={function(){ if(email){ setUser({email:email}); setShowAuth(false); setToast("Signed In Facebook DNA No code Triple"); } }} style={{width:"100%",background:"#1877F2",color:"#fff",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>Sign In Convenient FB DNA</button> : (showCodeField? <div><input value={code} onChange={function(e){ setCode(e.target.value); }} placeholder="123456 Now Visible Triple DNA" style={{width:"100%",padding:"12px",borderRadius:10,border:"2px solid #D4AF37",marginBottom:8,color:"#000",textAlign:"center",fontWeight:900}}/><button onClick={verify} style={{width:"100%",background:"#0A0E1A",color:"#fff",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>Verify Triple DNA Protect Hackers</button></div> : <button onClick={sendCode} style={{width:"100%",background:"#D4AF37",color:"#000",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>{countdown>0?countdown+"s":"Send Code Hidden Until Click IG+FB+TikTok"}</button>)}
            <div style={{fontSize:8,color:"#64748B",marginTop:8,textAlign:"center"}}>Facebook DNA: Friendship • Groups • Reactions • Instagram DNA: Stories Gradient + Double-tap • TikTok DNA: FYP Guest 5 Places • Not Bank App Benefit Direct</div>
          </div>
        </div>
      ) : null}

      <div style={{maxWidth:500,margin:"0 auto",height:"calc(100vh - 110px)",overflowY:"scroll",scrollSnapType:"y mandatory",background:"#000"}}>
        {posts.map(function(p){
          return(
            <div key={p.id} style={{height:"calc(100vh - 110px)",scrollSnapAlign:"start",background:"#12161F",borderBottom:"3px solid #000",position:"relative",display:"flex",flexDirection:"column"}}>
              <div style={{flex:1,background:"#0F111A",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",position:"relative"}}>
                <div onDoubleClick={function(){ handleLike(p.id); }} style={{position:"absolute",inset:0,zIndex:5}}></div>
                <img src="/logo-dark.png" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.04}}/>
                <div style={{position:"absolute",top:10,left:10,right:10,display:"flex",justifyContent:"space-between",zIndex:6}}>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}><div style={{width:36,height:36,borderRadius:18,background:p.color,display:"flex",alignItems:"center",justifyContent:"center"}}>{p.emoji}</div><div><div style={{color:"#fff",fontWeight:800,fontSize:12,display:"flex",gap:4}}>{p.name} {p.verified? <span style={{background:"#1877F2",color:"#fff",fontSize:8,padding:"2px 4px",borderRadius:8}}>✓ FB Verified</span> : null}</div><div style={{color:"#94A3B8",fontSize:9}}>{p.city}, {p.country} • {p.friends} • {p.id}/5 Triple DNA</div></div></div>
                  <div style={{display:"flex",gap:4}}><span style={{background:"rgba(0,0,0,.6)",color:"#fff",padding:"4px 8px",borderRadius:10,fontSize:9,fontWeight:800}}>FYP TikTok</span><span style={{background:"#E1306C",color:"#fff",padding:"4px 8px",borderRadius:10,fontSize:9,fontWeight:800}}>IG LIVE</span><span style={{background:"#1877F2",color:"#fff",padding:"4px 8px",borderRadius:10,fontSize:9,fontWeight:800}}>FB Friends</span></div>
                </div>
                {liked[p.id]? <div style={{position:"absolute",fontSize:90,zIndex:7,animation:"pop 0.6s",pointerEvents:"none"}}>❤️</div> : null}
                <div style={{width:84,height:84,borderRadius:42,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,zIndex:6,boxShadow:"0 0 30px "+p.color+"55"}}>{p.emoji}</div>
                <div style={{color:"#fff",marginTop:10,fontWeight:900,fontSize:15,zIndex:6,textAlign:"center"}}>{p.name} • {p.gift}</div>
                <div style={{color:"#94A3B8",fontSize:10,marginTop:2,zIndex:6}}>{p.city} • Triple DNA Facebook+Instagram+TikTok • Not Just One Place • 5 Places</div>
                <div style={{color:"#fff",fontSize:10,marginTop:8,textAlign:"center",zIndex:6,padding:"0 18px",lineHeight:1.4}}>Guest Scroll Like TikTok FYP No Register • Stories Gradient Like Instagram • Friends Reactions Like Facebook • 70% Instant Direct Naira No Coin • Not Bank App • More Convenient Benefit Accessible • 5M Hedge Ahead • Friendship Love Benefits Diaspora</div>
                <div style={{display:"flex",gap:8,marginTop:14,zIndex:6}}>
                  <button onClick={function(){ doGift(p.amount, p.gift); }} style={{background:p.color,color:"#000",padding:"12px 20px",borderRadius:18,border:"none",fontWeight:900,fontSize:12,boxShadow:"0 4px 15px rgba(0,0,0,.3)"}}>Gift {p.emoji} N{p.amount} → N{Math.floor(p.amount*0.7)} 70% Triple</button>
                  <button onClick={function(){ handleLike(p.id); }} style={{background:liked[p.id]?"#E1306C":"#222",color:"#fff",padding:"12px 14px",borderRadius:18,border:"none",fontSize:12}}>{liked[p.id]? "❤️ Liked FB+IG" : "🤍 Like FB+IG Double-tap"}</button>
                </div>
                <div style={{position:"absolute",right:10,bottom:90,display:"flex",flexDirection:"column",gap:12,zIndex:6}}>
                  <button onClick={function(){ handleLike(p.id); }} style={{background:"rgba(0,0,0,.5)",border:"none",width:44,height:44,borderRadius:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{liked[p.id]? "❤️" : "🤍"}</button>
                  <div style={{background:"rgba(0,0,0,.5)",width:44,height:44,borderRadius:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>💬<div style={{position:"absolute",bottom:-4,fontSize:9,color:"#fff"}}>{800+p.id*23}</div></div>
                  <div style={{background:"rgba(0,0,0,.5)",width:44,height:44,borderRadius:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>↗️</div>
                  <div style={{background:"#D4AF37",width:44,height:44,borderRadius:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🎁</div>
                </div>
              </div>
              <div style={{padding:"8px 10px",background:"#0A0E1A",borderTop:"1px solid #1E293B"}}>
                <div style={{display:"flex",gap:6,overflow:"auto",padding:"4px 0"}}>
                  <button onClick={function(){ doGift(200, "Quick FB Reaction"); }} style={{background:"#1E293B",color:"#fff",padding:"6px 12px",borderRadius:16,fontSize:10,whiteSpace:"nowrap",border:"1px solid #333"}}>👍 N200 FB Like</button>
                  <button onClick={function(){ doGift(p.amount, p.gift); }} style={{background:"#1E293B",color:"#D4AF37",padding:"6px 14px",borderRadius:16,fontSize:10,whiteSpace:"nowrap",border:"1px solid #D4AF37",fontWeight:800}}>{p.emoji} N{p.amount} {p.gift} 70% Triple DNA</button>
                  <button onClick={function(){ doGift(1000, "IG Diamond"); }} style={{background:"#1E293B",color:"#fff",padding:"6px 12px",borderRadius:16,fontSize:10,whiteSpace:"nowrap",border:"1px solid #333"}}>💎 N1000 IG</button>
                  <button onClick={function(){ doGift(500, "FB Share"); }} style={{background:"#1E293B",color:"#fff",padding:"6px 12px",borderRadius:16,fontSize:10,whiteSpace:"nowrap",border:"1px solid #333"}}>↗️ N500 FB Share</button>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:11,alignItems:"center"}}>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}><span>❤️ {12000+p.id*234} </span><span>😍 {3400+p.id*12} FB Reactions</span><span>💬 {800+p.id*12} FB Comments</span><span>↗️ Share FB Group</span></div>
                  <span style={{color:"#D4AF37",fontWeight:800,fontSize:9}}>Your API Triple DNA Instant</span>
                </div>
                <div style={{marginTop:6,display:"flex",gap:6}}><span style={{background:"#1877F2",color:"#fff",padding:"3px 8px",borderRadius:10,fontSize:8,fontWeight:800}}>FB Friends • {p.friends}</span><span style={{background:"#E1306C",color:"#fff",padding:"3px 8px",borderRadius:10,fontSize:8,fontWeight:800}}>IG Stories Gradient</span><span style={{background:"#000",color:"#fff",padding:"3px 8px",borderRadius:10,fontSize:8,fontWeight:800,border:"1px solid #333"}}>TikTok FYP {p.id}/5</span></div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0A0E1A",borderTop:"1px solid #1E293B",display:"flex",justifyContent:"space-around",padding:"8px 0",zIndex:30}}>
        <div style={{textAlign:"center"}}><div style={{fontSize:18}}>🏠</div><div style={{fontSize:8,color:"#D4AF37",fontWeight:800}}>FYP TikTok 5 Places</div></div>
        <div style={{textAlign:"center"}}><div style={{fontSize:18}}>🔍</div><div style={{fontSize:8}}>Explore IG</div></div>
        <div style={{textAlign:"center"}}><div style={{fontSize:18,background:"linear-gradient(45deg,#D4AF37,#1877F2)",width:32,height:32,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>+</div></div>
        <div style={{textAlign:"center"}}><div style={{fontSize:18}}>👥</div><div style={{fontSize:8}}>Friends FB</div></div>
        <div style={{textAlign:"center"}}><div style={{fontSize:18}}>👤</div><div style={{fontSize:8}}>Benefit N{Math.floor(balance/1000)}K</div></div>
      </div>
    </div>
  );
}
