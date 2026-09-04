"use client";
import { useState, useEffect } from "react";
export default function Page(){
  const [showNetflix,setShowNetflix]=useState(true);
  const [progress,setProgress]=useState(0);
  const [showFypPopup,setShowFypPopup]=useState(false);
  const [toast,setToast]=useState("");
  const [user,setUser]=useState(null);
  const [authTab,setAuthTab]=useState("signup");
  const [showAuth,setShowAuth]=useState(false);
  const [email,setEmail]=useState("");
  const [code,setCode]=useState("");
  const [sentCode,setSentCode]=useState("");
  const [countdown,setCountdown]=useState(0);
  const [showCodeField,setShowCodeField]=useState(false);
  const [tab,setTab]=useState("fyp");
  const TH={bg:"#0A0E1A",card:"#12161F",gold:"#D4AF37",border:"#1E293B",text:"#E2E8F0"};

  useEffect(function(){
    var iv=setInterval(function(){ setProgress(function(p){ return p>=100? 100 : p+6; }); },100);
    var t1=setTimeout(function(){ setShowNetflix(false); setShowFypPopup(true); },3000);
    var t2=setTimeout(function(){ setShowFypPopup(false); },5500);
    return function(){ clearInterval(iv); clearTimeout(t1); clearTimeout(t2); };
  },[]);
  useEffect(function(){ if(countdown>0){ var x=setTimeout(function(){ setCountdown(function(c){ return c-1; }); },1000); return function(){ clearTimeout(x); }; } },[countdown]);
  useEffect(function(){ if(toast){ var x=setTimeout(function(){ setToast(""); },3000); return function(){ clearTimeout(x); }; } },[toast]);

  function sendCode(){
    if(!email){ setToast("Enter email"); return; }
    if(countdown>0){ return; }
    setSentCode("123456");
    setShowCodeField(true);
    setCountdown(60);
    setToast("Code 123456 sent Hidden before Now visible");
  }

  function verify(){
    if(code==="123456" || code===sentCode){
      setUser({email:email});
      setShowAuth(false);
      setToast("Verified Welcome Chat and Chill More Benefit Accessible");
      setCode(""); setShowCodeField(false);
    }else{ setToast("Use 123456 works immediately"); }
  }

  return(
    <div style={{background:TH.bg,color:TH.text,minHeight:"100vh",paddingBottom:70}}>
      {toast? <div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",background:TH.gold,color:"#000",padding:"9px 16px",borderRadius:18,fontWeight:900,zIndex:9999,fontSize:11}}>{toast}</div> : null}

      {showNetflix? (
        <div style={{background:"#000",height:"100vh",width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"fixed",top:0,left:0,zIndex:9999}}>
          <img src="/logo-dark.png" alt="Chat and Chill Real Logo Africa Circuit DNA Mix TikTok Instagram 5M hedge" style={{width:130,height:130,borderRadius:22,border:"2px solid #D4AF37"}}/>
          <div style={{color:"#fff",marginTop:16,fontWeight:900,fontSize:24}}>Chat and Chill</div>
          <div style={{color:TH.gold,marginTop:6,fontSize:12,fontWeight:800}}>Greetings from Chat and Chill</div>
          <div style={{color:"#fff",marginTop:8,fontSize:14}}>Talk cool / Chill out / Have fun</div>
          <div style={{width:180,height:4,background:"#1E293B",borderRadius:4,marginTop:14,overflow:"hidden"}}><div style={{width:progress+"%",height:"100%",background:TH.gold}}></div></div>
          <div style={{color:"#94A3B8",fontSize:8,marginTop:6}}>Netflix 3s Real Logo • 5M Hedge Ahead TikTok + Instagram DNA</div>
        </div>
      ) : null}

      {showFypPopup? (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#12161F",border:"2px solid #D4AF37",borderRadius:16,padding:14,width:"100%",maxWidth:360}}>
            <div style={{display:"flex",gap:10}}><img src="/logo-dark.png" alt="Real logo" style={{width:56,height:56,borderRadius:10,border:"1px solid #D4AF37"}}/><div><div style={{fontWeight:900,fontSize:12,color:"#fff"}}>Trending Live Gold Glow AI + 12BOX</div><div style={{fontSize:10,color:"#aaa",marginTop:4}}>5M Hedge Ahead TikTok + Instagram DNA Mix Friendship Love Benefits Diaspora Love More Convenient Benefit Accessible Not Bank App</div></div></div>
            <div style={{display:"flex",gap:8,marginTop:10}}><button onClick={function(){ setShowFypPopup(false); }} style={{background:TH.gold,color:"#000",padding:"8px 14px",borderRadius:16,border:"none",fontWeight:800,fontSize:11}}>Join Live Guest Access Like TikTok</button><button onClick={function(){ setShowFypPopup(false); }} style={{background:"#333",color:"#fff",padding:"8px 14px",borderRadius:16,border:"none",fontSize:11}}>Watch FYP No Register</button></div>
          </div>
        </div>
      ) : null}

      <header style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:TH.card,borderBottom:"1px solid #1E293B",alignItems:"center"}}>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><img src="/logo-dark.png" alt="Real logo TikTok Instagram DNA 5M hedge" style={{width:28,height:28,borderRadius:8,border:"1px solid #D4AF37"}}/><span style={{fontWeight:900,fontSize:12}}>Chat and Chill • 5M Hedge</span><span style={{background:"#00C851",color:"#fff",padding:"2px 6px",borderRadius:8,fontSize:8}}>STABLE</span></div>
        <button onClick={function(){ setShowAuth(true); }} style={{background:user?TH.gold:"#151B28",color:user?"#000":TH.text,padding:"6px 10px",borderRadius:12,fontSize:10,fontWeight:800,border:"1px solid #1E293B"}}>{user? "LV100 God" : "Join Benefit"}</button>
      </header>

      <div style={{background:"linear-gradient(90deg,#D4AF37,#3B82F6)",color:"#000",padding:"5px",textAlign:"center",fontSize:9,fontWeight:900}}>More Convenient Like TikTok FYP + More Benefit Like Instagram Gifts + More Accessible 2G Translation EN FR YO PI SW + 5M Hedge Ahead DNA Mix Not Bank App</div>

      {showAuth? (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.9)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#F8FAFC",padding:14,borderRadius:16,border:"2px solid #D4AF37",width:"100%",maxWidth:360}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{display:"flex",gap:8,alignItems:"center"}}><img src="/logo-dark.png" alt="Real logo" style={{width:28,height:28,borderRadius:8,border:"1px solid #D4AF37"}}/><span style={{fontWeight:900,color:"#000",fontSize:13}}>Chat and Chill 5M Hedge</span></div><button onClick={function(){ setShowAuth(false); }} style={{width:28,height:28,borderRadius:14}}>X</button></div>
            <div style={{display:"flex",background:"#E2E8F0",borderRadius:10,padding:3,marginBottom:10}}>
              <button onClick={function(){ setAuthTab("signin"); }} style={{flex:1,background:authTab==="signin"?"#0A0E1A":"transparent",color:authTab==="signin"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800,fontSize:12}}>Sign In No Code</button>
              <button onClick={function(){ setAuthTab("signup"); }} style={{flex:1,background:authTab==="signup"?"#0A0E1A":"transparent",color:authTab==="signup"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800,fontSize:12}}>Sign Up Code Hidden</button>
            </div>
            <input value={email} onChange={function(e){ setEmail(e.target.value); }} placeholder="Email - Benefit Access" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #CBD5E1",marginBottom:8,color:"#000",background:"#fff"}}/>
            {authTab==="signin"? (
              <div><button onClick={function(){ if(email){ setUser({email:email}); setShowAuth(false); setToast("Signed In No code needed Benefit accessible"); } }} style={{width:"100%",background:"#0A0E1A",color:"#fff",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>Sign In No Verify - Convenient Like TikTok</button></div>
            ) : (
              <div>
                {showCodeField? (
                  <div><input value={code} onChange={function(e){ setCode(e.target.value); }} placeholder="Code 123456 Now Visible Hidden Before" style={{width:"100%",padding:"12px",borderRadius:10,border:"2px solid #D4AF37",marginBottom:8,color:"#000",background:"#fff",textAlign:"center",fontWeight:900}}/><button onClick={verify} style={{width:"100%",background:"#0A0E1A",color:"#fff",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>Verify Benefit Access - Hidden Until Sign Up Click</button></div>
                ) : (
                  <button onClick={sendCode} style={{width:"100%",background:TH.gold,color:"#000",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>{countdown>0? countdown+"s" : "Sign Up Send Code Hidden Until Now - More Accessible"}</button>
                )}
              </div>
            )}
            <div style={{fontSize:9,color:"#64748B",marginTop:8,textAlign:"center"}}>Not Bank App • TikTok FYP Guest Scroll • Instagram Gift Benefit • Verify Hidden Until Sign Up • Withdrawal Verify Protect Fund From Hackers • 2G Accessible • 5M Hedge Ahead</div>
          </div>
        </div>
      ) : null}

      <div style={{maxWidth:480,margin:"0 auto"}}>
        <div style={{display:"flex",gap:8,padding:"10px 12px",overflow:"auto"}}><div style={{minWidth:56,textAlign:"center"}}><div style={{width:56,height:56,borderRadius:28,background:"linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)",padding:"2px"}}><div style={{background:"#000",width:"100%",height:"100%",borderRadius:28,display:"flex",alignItems:"center",justifyContent:"center"}}>❤️</div></div><div style={{fontSize:9,marginTop:4}}>Your Story</div></div><div style={{minWidth:56,textAlign:"center"}}><img src="/logo-dark.png" alt="Story" style={{width:56,height:56,borderRadius:28,border:"2px solid #D4AF37"}}/><div style={{fontSize:9,marginTop:4}}>Diaspora Love</div></div></div>

        <div style={{background:TH.card,margin:"0 12px",borderRadius:16,overflow:"hidden",border:"1px solid #1E293B"}}>
          <div style={{height:320,background:"#0F0F0F",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",position:"relative"}}>
            <img src="/logo-dark.png" alt="Real logo FYP faint background TikTok Instagram DNA" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.06}}/>
            <div style={{position:"absolute",top:10,left:10,display:"flex",gap:6}}><span style={{background:"rgba(0,0,0,.6)",color:"#fff",padding:"4px 8px",borderRadius:12,fontSize:10}}>AI VIDEO SOUND ON</span><span style={{background:TH.gold,color:"#000",padding:"4px 8px",borderRadius:12,fontSize:10,fontWeight:800}}>12BOX AI</span><span style={{background:"rgba(212,175,55,.2)",color:TH.gold,padding:"4px 8px",borderRadius:12,fontSize:9,border:"1px solid "+TH.gold}}>Friendship Love Benefits</span></div>
            <div style={{width:70,height:70,borderRadius:35,background:TH.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>▶️</div>
            <div style={{color:"#fff",marginTop:10,fontWeight:800,fontSize:13,textAlign:"center"}}>FYP Guest Scroll Like TikTok • No Register Needed<br/>More Convenient More Benefit More Accessible</div>
            <div style={{color:"#94A3B8",fontSize:10,marginTop:6}}>Not Bank App • Gift = Benefit • Chat and Chill 5M Hedge Ahead • TikTok + Instagram DNA Mix</div>
          </div>
          <div style={{padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",gap:12}}><span>❤️ 12,453</span><span>💬 892</span><span>🎁 Gift Benefit</span></div>
            <div style={{fontSize:10,color:TH.gold,fontWeight:800}}>80% Creator 20% App • Benefit Not Bank Fee</div>
          </div>
        </div>

        <div style={{background:TH.card,margin:"12px",borderRadius:12,padding:12,border:"1px solid #1E293B"}}>
          <div style={{fontWeight:800,fontSize:12}}>Creator Benefit • Not Bank Wallet • Light Earnings Like TikTok Coins • Gift Standalone</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:10}}>
            <div style={{background:"#151B28",padding:"8px",borderRadius:10,textAlign:"center",border:"1px solid #1E293B"}}><div style={{fontSize:18}}>👁️🌍</div><div style={{fontSize:9,fontWeight:800}}>African Eye</div><div style={{fontSize:8,color:TH.gold}}>N5000 Benefit</div></div>
            <div style={{background:"#151B28",padding:"8px",borderRadius:10,textAlign:"center",border:"1px solid #1E293B"}}><div style={{fontSize:18}}>👑👁️</div><div style={{fontSize:9,fontWeight:800}}>Eye Crown</div><div style={{fontSize:8,color:TH.gold}}>N5000 Benefit</div></div>
            <div style={{background:"#151B28",padding:"8px",borderRadius:10,textAlign:"center",border:"1px solid #1E293B"}}><div style={{fontSize:18}}>💎</div><div style={{fontSize:9,fontWeight:800}}>Diamond</div><div style={{fontSize:8,color:TH.gold}}>N1000 Benefit</div></div>
          </div>
          <div style={{fontSize:9,color:TH.sub,marginTop:8}}>More Benefit: Gift = Benefit • Not bank deposit • One Gift Box All Standalone • Withdrawal verify only to protect from hackers hidden • 2G accessible • Translation EN FR YO PI SW • 5M hedge ahead TikTok Instagram DNA Mix</div>
        </div>

        <div style={{display:"flex",justifyContent:"space-around",padding:"12px",background:TH.card,borderTop:"1px solid #1E293B",marginTop:12}}>
          <button onClick={function(){ setTab("fyp"); }} style={{color:tab==="fyp"?TH.gold:"#94A3B8",background:"none",border:"none",fontWeight:800}}>◎ FYP TikTok</button>
          <button style={{color:"#94A3B8",background:"none",border:"none"}}>◉ LIVE 12BOX</button>
          <button style={{background:TH.gold,width:42,height:42,borderRadius:21,border:"none",fontSize:18}}>📹</button>
          <button style={{color:"#94A3B8",background:"none",border:"none"}}>Reels IG</button>
          <button style={{color:"#94A3B8",background:"none",border:"none"}}>Chat Benefit</button>
        </div>
      </div>
    </div>
  );
}
