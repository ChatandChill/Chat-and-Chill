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

  useEffect(function(){
    var iv=setInterval(function(){ setProgress(function(p){ return p>=100?100:p+7; }); },100);
    var t1=setTimeout(function(){ setShowNetflix(false); },3000);
    return function(){ clearInterval(iv); clearTimeout(t1); };
  },[]);
  useEffect(function(){ if(countdown>0){ var x=setTimeout(function(){ setCountdown(function(c){ return c-1; }); },1000); return function(){ clearTimeout(x); }; } },[countdown]);
  useEffect(function(){ if(toast){ var x=setTimeout(function(){ setToast(""); },3000); return function(){ clearTimeout(x); }; } },[toast]);

  function sendCode(){ if(!email){ setToast("Enter email"); return; } setShowCodeField(true); setCountdown(60); setToast("Code 123456 sent Now visible"); }
  function verify(){ if(code==="123456"){ setUser({email:email}); setShowAuth(false); setToast("Verified Welcome 5M Hedge Not Bank"); setCode(""); setShowCodeField(false); }else{ setToast("Use 123456"); } }
  async function doGift(a,n){
    if(!user){ setShowAuth(true); return; }
    try{
      var res=await fetch("/api/gift",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({senderId:user.email,receiverId:"creator",giftAmount:a,giftName:n})});
      var d=await res.json();
      if(d.success){ setBalance(d.wallets.sender_naira); setToast(d.message); }else{ setToast(d.error); }
    }catch(e){ setToast("Gift "+n+" N"+a+" -> N"+Math.floor(a*0.7)+" instant 70% Your API"); }
  }

  return(
    <div style={{background:"#0A0E1A",color:"#E2E8F0",minHeight:"100vh"}}>
      {toast? <div style={{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",background:"#D4AF37",color:"#000",padding:"9px 16px",borderRadius:18,fontWeight:900,zIndex:9999,fontSize:11}}>{toast}</div> : null}

      {showNetflix? (
        <div style={{background:"#000",height:"100vh",width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"fixed",top:0,left:0,zIndex:9999}}>
          <img src="/logo-dark.png" alt="Real Logo" style={{width:130,height:130,borderRadius:22,border:"2px solid #D4AF37"}}/>
          <div style={{color:"#fff",marginTop:16,fontWeight:900,fontSize:24}}>Chat and Chill</div>
          <div style={{color:"#D4AF37",marginTop:6,fontSize:12,fontWeight:800}}>Greetings from Chat and Chill</div>
          <div style={{color:"#fff",marginTop:8,fontSize:14}}>Talk cool / Chill out / Have fun</div>
          <div style={{width:180,height:4,background:"#1E293B",borderRadius:4,marginTop:14,overflow:"hidden"}}><div style={{width:progress+"%",height:"100%",background:"#D4AF37"}}></div></div>
          <div style={{color:"#666",fontSize:9,marginTop:8}}>Front+Back Upgraded Your API 70/30</div>
        </div>
      ) : null}

      <header style={{display:"flex",justifyContent:"space-between",padding:"10px 12px",background:"#12161F",borderBottom:"1px solid #1E293B",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><img src="/logo-dark.png" alt="logo" style={{width:30,height:30,borderRadius:8,border:"1px solid #D4AF37"}}/><span style={{fontWeight:900,fontSize:13}}>Chat and Chill • Real App • 5M Hedge</span></div>
        <button onClick={function(){ setShowAuth(true); }} style={{background:user?"#D4AF37":"#1E293B",color:user?"#000":"#fff",padding:"6px 12px",borderRadius:12,fontSize:11,fontWeight:800,border:"none"}}>{user? "N"+balance : "Join"}</button>
      </header>

      <div style={{background:"linear-gradient(90deg,#D4AF37,#3B82F6)",color:"#000",padding:"6px",textAlign:"center",fontSize:10,fontWeight:900}}>Real App Upgraded • TikTok FYP Guest + Instagram Stories + Your Gift API 70% Instant Naira Not Coin • Not Bank App • 5M Hedge Ahead</div>

      {showAuth? (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#fff",padding:16,borderRadius:16,border:"2px solid #D4AF37",width:"100%",maxWidth:360}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><b style={{color:"#000"}}>Join Chat and Chill Real App</b><button onClick={function(){ setShowAuth(false); }}>X</button></div>
            <div style={{display:"flex",background:"#E2E8F0",borderRadius:10,padding:3,marginBottom:10}}>
              <button onClick={function(){ setAuthTab("signin"); }} style={{flex:1,background:authTab==="signin"?"#0A0E1A":"transparent",color:authTab==="signin"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800}}>Sign In No Code</button>
              <button onClick={function(){ setAuthTab("signup"); }} style={{flex:1,background:authTab==="signup"?"#0A0E1A":"transparent",color:authTab==="signup"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800}}>Sign Up Code Hidden</button>
            </div>
            <input value={email} onChange={function(e){ setEmail(e.target.value); }} placeholder="Email" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #CBD5E1",marginBottom:8,color:"#000"}}/>
            {authTab==="signin"? <button onClick={function(){ if(email){ setUser({email:email}); setShowAuth(false); setToast("Signed In No code Real App"); } }} style={{width:"100%",background:"#0A0E1A",color:"#fff",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>Sign In Convenient</button> : (showCodeField? <div><input value={code} onChange={function(e){ setCode(e.target.value); }} placeholder="123456 Now Visible" style={{width:"100%",padding:"12px",borderRadius:10,border:"2px solid #D4AF37",marginBottom:8,color:"#000",textAlign:"center",fontWeight:900}}/><button onClick={verify} style={{width:"100%",background:"#0A0E1A",color:"#fff",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>Verify</button></div> : <button onClick={sendCode} style={{width:"100%",background:"#D4AF37",color:"#000",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>{countdown>0?countdown+"s":"Send Code Hidden Until Click"}</button>)}
          </div>
        </div>
      ) : null}

      <div style={{maxWidth:500,margin:"0 auto",padding:"12px"}}>
        <div style={{display:"flex",gap:8,overflow:"auto",padding:"8px 0"}}><div style={{minWidth:60,textAlign:"center"}}><div style={{width:56,height:56,borderRadius:28,background:"linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)",padding:"2px",margin:"0 auto"}}><div style={{background:"#000",width:"100%",height:"100%",borderRadius:28,display:"flex",alignItems:"center",justifyContent:"center"}}>❤️</div></div><div style={{fontSize:9,marginTop:4}}>Your Story</div></div><div style={{minWidth:60,textAlign:"center"}}><img src="/logo-dark.png" style={{width:56,height:56,borderRadius:28,border:"2px solid #D4AF37"}}/><div style={{fontSize:9,marginTop:4}}>Diaspora</div></div></div>

        <div style={{background:"#12161F",borderRadius:16,overflow:"hidden",border:"1px solid #1E293B",marginTop:8}}>
          <div style={{height:380,background:"#0F0F0F",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",position:"relative"}}>
            <img src="/logo-dark.png" alt="FYP" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.06}}/>
            <div style={{position:"absolute",top:10,left:10,display:"flex",gap:6}}><span style={{background:"rgba(0,0,0,.6)",color:"#fff",padding:"4px 8px",borderRadius:12,fontSize:10}}>FYP REAL APP</span><span style={{background:"#D4AF37",color:"#000",padding:"4px 8px",borderRadius:12,fontSize:10,fontWeight:800}}>LIVE</span></div>
            <div style={{width:70,height:70,borderRadius:35,background:"#D4AF37",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,zIndex:1}}>▶️</div>
            <div style={{color:"#fff",marginTop:12,fontWeight:800,fontSize:14,textAlign:"center",zIndex:1}}>Real App FYP Feed Not Just Picture<br/>Guest Scroll Like TikTok No Register</div>
            <div style={{color:"#94A3B8",fontSize:11,marginTop:6,textAlign:"center",zIndex:1}}>70% Instant Direct Naira No Coin • Not Bank App<br/>More Convenient Benefit Accessible • 5M Hedge Ahead</div>
            <div style={{display:"flex",gap:8,marginTop:14,zIndex:1}}><button onClick={function(){ doGift(5000,"African Eye"); }} style={{background:"#D4AF37",color:"#000",padding:"10px 16px",borderRadius:16,border:"none",fontWeight:800,fontSize:11}}>Gift 👁️ N5000 → N3500 70%</button><button onClick={function(){ doGift(1000,"Diamond"); }} style={{background:"#333",color:"#fff",padding:"10px 16px",borderRadius:16,border:"none",fontSize:11}}>💎 N1000 → N700</button></div>
          </div>
          <div style={{padding:"10px 12px",display:"flex",justifyContent:"space-between",fontSize:12}}><div>❤️ 12,453 💬 892 🎁 70% Benefit</div><div style={{color:"#D4AF37",fontWeight:800,fontSize:10}}>Your API Instant</div></div>
        </div>

        <div style={{background:"#12161F",borderRadius:12,padding:12,marginTop:12,border:"1px solid #1E293B"}}>
          <div style={{fontWeight:800,fontSize:12}}>Withdrawal Protect Fund From Hackers • Verify 123456 Required Only Here</div>
          <div style={{fontSize:9,color:"#94A3B8",marginTop:4}}>Real App not just picture • FYP + Stories + Gift 70% Instant Your API • Not Bank App • TikTok+IG DNA • More convenient benefit accessible • 5M hedge</div>
        </div>
      </div>
    </div>
  );
}
