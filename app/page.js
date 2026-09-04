"use client";
import { useState, useEffect } from "react";
export default function Page(){
  const [showNetflix,setShowNetflix]=useState(true);
  const [showFypPopup,setShowFypPopup]=useState(false);
  const [progress,setProgress]=useState(0);
  const [toast,setToast]=useState("");
  const [user,setUser]=useState(null);
  const [tab,setTab]=useState("fyp");
  const [authTab,setAuthTab]=useState("signin");
  const [showAuth,setShowAuth]=useState(false);
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [code,setCode]=useState("");
  const [sentCode,setSentCode]=useState("");
  const [countdown,setCountdown]=useState(0);
  const [showCodeField,setShowCodeField]=useState(false);
  const [withdrawCode,setWithdrawCode]=useState("");
  const [withdrawSent,setWithdrawSent]=useState("");
  const TH={bg:"#0A0E1A",card:"#12161F",card2:"#151B28",gold:"#D4AF37",border:"#1E293B",text:"#E2E8F0",sub:"#94A3B8"};

  useEffect(()=>{
    const iv=setInterval(()=>{ setProgress(p=> p>=100? 100 : p+5 ); },120);
    const t1=setTimeout(()=>{ setShowNetflix(false); setShowFypPopup(true); },3000);
    const t2=setTimeout(()=>{ setShowFypPopup(false); },5500);
    return()=>{ clearInterval(iv); clearTimeout(t1); clearTimeout(t2); };
  },[]);
  useEffect(()=>{ if(countdown>0){ const x=setTimeout(()=>setCountdown(c=>c-1),1000); return()=>clearTimeout(x); } },[countdown]);
  useEffect(()=>{ if(toast){ const x=setTimeout(()=>setToast(""),3000); return()=>clearTimeout(x); } },[toast]);

  const sendSignupCode=()=>{
    if(!email){ setToast("Enter email first"); return; }
    if(countdown>0) return;
    setSentCode("123456");
    setShowCodeField(true);
    setCountdown(60);
    setToast("Code 123456 sent to "+email+" Hidden until Sign Up clicked Works immediately");
  };

  const sendWithdrawCode=()=>{
    if(!user){ setShowAuth(true); return; }
    setWithdrawSent("123456");
    setToast("Withdrawal verify code 123456 sent to protect fund from hackers Works immediately");
  };

  const verifySignup=()=>{
    if(code==="123456" || code===sentCode){
      setUser({email:email,username:email.split("@")[0]});
      setShowAuth(false);
      setToast("Verified Signed Up Welcome Chat and Chill Guest can now scroll FYP join live");
      setCode(""); setShowCodeField(false);
    }else{ setToast("Wrong code Use 123456 works"); }
  };

  const signin=()=>{
    if(email && pass.length>=4){
      setUser({email:email,username:email.split("@")[0]});
      setShowAuth(false);
      setToast("Signed In No verify code needed for Sign In");
    }else{ setToast("Enter email and password 4+ for Sign In No code needed"); }
  };

  const withdraw=()=>{
    if(!withdrawCode){ setToast("Enter withdrawal verify code to protect fund from hackers"); return; }
    if(withdrawCode==="123456" || withdrawCode===withdrawSent){
      setToast("Withdrawal verified Code correct Fund protected from hackers N500M safe");
      setWithdrawCode(""); setWithdrawSent("");
    }else{ setToast("Wrong withdrawal code Use 123456 to protect fund"); }
  };

  return(
    <div style={{background:TH.bg,color:TH.text,minHeight:"100vh",paddingBottom:70}}>
      {toast && <div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:TH.gold,color:"#000",padding:"10px 18px",borderRadius:20,fontWeight:900,zIndex:9999,fontSize:11}}>{toast}</div>}

      {showNetflix && (
        <div style={{background:"#000",height:"100vh",width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"fixed",top:0,left:0,zIndex:9999}}>
          <img src="/logo-dark.png" alt="Chat and Chill Real Logo Africa Circuit" style={{width:120,height:120,borderRadius:20,border:"2px solid #D4AF37",objectFit:"cover"}}/>
          <div style={{color:"#fff",marginTop:16,fontWeight:900,fontSize:24}}>Chat and Chill</div>
          <div style={{color:TH.gold,marginTop:6,fontSize:12,fontWeight:800}}>Greetings from Chat and Chill</div>
          <div style={{color:"#fff",marginTop:8,fontSize:14}}>Talk cool / Chill out / Have fun</div>
          <div style={{width:180,height:4,background:"#1E293B",borderRadius:4,marginTop:16,overflow:"hidden"}}><div style={{width:progress+"%",height:"100%",background:TH.gold}}></div></div>
        </div>
      )}

      {showFypPopup && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#111",border:"2px solid "+TH.gold,borderRadius:16,padding:14,width:"100%",maxWidth:360,position:"relative",overflow:"hidden"}}>
            <img src="/logo-dark.png" alt="Real logo FYP popup background" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.12}}/>
            <div style={{position:"relative"}}>
              <div style={{display:"flex",gap:10}}><div style={{width:56,height:56,background:"#8B0000",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:9,border:"1px solid "+TH.gold}}>NETFLIX POPUP</div><div><div style={{fontWeight:900,fontSize:12,color:"#fff"}}>Trending Live: Gold Glow AI + 12BOX</div><div style={{fontSize:10,color:"#aaa",marginTop:4}}>Join 12.4k creators Africa Circuit AI 1 Creator + 11 Guests live! Guest can scroll FYP join live like TikTok</div></div></div>
              <div style={{display:"flex",gap:8,marginTop:10}}><button onClick={()=>setShowFypPopup(false)} style={{background:TH.gold,color:"#000",padding:"8px 14px",borderRadius:16,border:"none",fontWeight:800,fontSize:11}}>Join Live 12BOX - Guest Access</button><button onClick={()=>setShowFypPopup(false)} style={{background:"#333",color:"#fff",padding:"8px 14px",borderRadius:16,border:"none",fontSize:11}}>Watch FYP No Register Needed</button></div>
            </div>
          </div>
        </div>
      )}

      <header style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:TH.card,borderBottom:"1px solid "+TH.border,alignItems:"center"}}>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><img src="/logo-dark.png" alt="Real logo" style={{width:28,height:28,borderRadius:8,border:"1px solid "+TH.gold,objectFit:"cover"}}/><span style={{fontWeight:900,fontSize:12}}>Chat and Chill V5M.1 • Real Logo</span><span style={{background:"#00C851",color:"#fff",padding:"2px 6px",borderRadius:8,fontSize:8}}>● STABLE</span><span style={{background:TH.card2,border:"1px solid "+TH.border,padding:"2px 6px",borderRadius:8,fontSize:8}}>2G OFF</span></div>
        <button onClick={()=>setShowAuth(true)} style={{background:user?TH.gold:TH.card2,border:"1px solid "+TH.border,color:user?"#000":TH.text,padding:"6px 10px",borderRadius:12,fontSize:10,fontWeight:800}}>{user?"@"+user.username+" LV100":"Sign In Up"}</button>
      </header>

      <div style={{background:"linear-gradient(90deg,#D4AF37,#3B82F6)",color:"#000",padding:"5px",textAlign:"center",fontSize:9,fontWeight:900}}>Guest Access Like TikTok - Scroll FYP Join Live No Register Needed - Verify Hidden Until Sign Up - Verify For Withdrawal Protect Fund From Hackers - Real Logo - FYP Popup Immediately After Netflix 3s</div>

      {showAuth && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.9)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#F8FAFC",padding:14,borderRadius:16,border:"2px solid "+TH.gold,width:"100%",maxWidth:360}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style={{display:"flex",gap:8,alignItems:"center"}}><img src="/logo-dark.png" alt="Real logo auth" style={{width:28,height:28,borderRadius:8,border:"1px solid "+TH.gold,objectFit:"cover"}}/><span style={{fontWeight:900,color:"#000",fontSize:13}}>Chat and Chill V5M.1</span></div><button onClick={()=>setShowAuth(false)} style={{width:28,height:28,borderRadius:14,border:"1px solid #CBD5E1,background:"#fff"}}>X</button></div>

            <div style={{display:"flex",background:"#E2E8F0",borderRadius:10,padding:3,marginBottom:10}}>
              <button onClick={()=>{ setAuthTab("signin"); setShowCodeField(false); }} style={{flex:1,background:authTab==="signin"?"#0A0E1A":"transparent",color:authTab==="signin"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800,fontSize:12}}>Sign In Tab - No Verify Code</button>
              <button onClick={()=>{ setAuthTab("signup"); }} style={{flex:1,background:authTab==="signup"?"#0A0E1A":"transparent",color:authTab==="signup"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800,fontSize:12}}>Sign Up Tab - Verify Hidden Until Click</button>
            </div>

            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email or Phone" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #CBD5E1",marginBottom:8,background:"#fff",color:"#000"}}/>

            {authTab==="signin" && (
              <>
                <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password - No Verify Code For Sign In" type="password" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #CBD5E1",marginBottom:10,background:"#fff",color:"#000"}}/>
                <button onClick={signin} style={{width:"100%",background:"#0A0E1A",color:"#fff",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>Sign In - No Verify Code Applicable</button>
                <div style={{fontSize:9,color:"#64748B",marginTop:6,textAlign:"center"}}>Sign In = No verify code • Guest can scroll FYP join live like TikTok even if not registered • Verify hidden until Sign Up</div>
              </>
            )}

            {authTab==="signup" && (
              <>
                {!showCodeField? (
                  <button onClick={sendSignupCode} disabled={countdown>0} style={{width:"100%",background:TH.gold,color:"#000",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>{countdown>0?countdown+"s Resend":"Click Sign Up - Send Verify Code - Hidden Until Now"}</button>
                ) : (
                  <>
                    <div style={{display:"flex",gap:8,marginBottom:8,marginTop:8}}><input value={code} onChange={e=>setCode(e.target.value)} placeholder="Enter Code 123456 - Now Visible After Click Sign Up" style={{flex:1,padding:"12px",borderRadius:10,border:"2px solid "+TH.gold,background:"#fff",color:"#000",textAlign:"center",fontWeight:900}}/><span style={{fontSize:10,color:"#16A34A",alignSelf:"center",fontWeight:800}}>Code {sentCode} visible now hidden before</span></div>
                    <button onClick={verifySignup} style={{width:"100%",background:"#0A0E1A",color:"#fff",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>Verify Code - Sign Up - Now Visible Hidden Before</button>
                  </>
                )}
                <div style={{fontSize:9,color:"#64748B",marginTop:6,textAlign:"center"}}>Verify code hidden not visible until you click Sign Up • Not applicable to Sign In • Applicable to Withdrawal protect fund from hackers • Real logo</div>
              </>
            )}
          </div>
        </div>
      )}

      <div style={{maxWidth:480,margin:"0 auto"}}>
        <div style={{background:TH.card,margin:12,borderRadius:16,overflow:"hidden",border:"1px solid "+TH.border}}>
          <div style={{height:280,background:"#0F0F0F",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",position:"relative"}}>
            <img src="/logo-dark.png" alt="Real logo FYP background faint" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.06}}/>
            <div style={{position:"relative",textAlign:"center"}}>
              <div style={{width:64,height:64,borderRadius:32,background:TH.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto"}}>▶️</div>
              <div style={{color:"#fff",marginTop:10,fontWeight:800,fontSize:13}}>FYP - Guest Can Scroll View Like TikTok No Register Needed</div>
              <div style={{color:TH.sub,fontSize:11,marginTop:4}}>Join Live Stream Even If Not Registered • Accessible For Viewers • Real Logo</div>
              <div style={{marginTop:10,display:"flex",gap:8,justifyContent:"center"}}><button onClick={()=>{ if(!user){ setShowAuth(true); }else{ setToast("Joined Live 12BOX Guest access"); } }} style={{background:TH.gold,color:"#000",padding:"8px 14px",borderRadius:16,border:"none",fontWeight:800,fontSize:11}}>Join Live 12BOX - Guest Can Join</button></div>
            </div>
          </div>
        </div>

        <div style={{background:TH.card,margin:"0 12px",borderRadius:12,padding:12,border:"1px solid "+TH.border}}>
          <div style={{fontWeight:800,fontSize:12}}>Wallet - Withdrawal Verify Code To Protect Fund From Hackers - N500,000,000</div>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <input value={withdrawCode} onChange={e=>setWithdrawCode(e.target.value)} placeholder="Withdrawal Code 123456 Protect Fund From Hackers" style={{flex:1,padding:"10px",borderRadius:10,border:"2px solid #EF4444",background:"#fff",color:"#000",textAlign:"center",fontWeight:800}}/>
            <button onClick={sendWithdrawCode} style={{background:"#EF4444",color:"#fff",padding:"10px 12px",borderRadius:10,border:"none",fontWeight:800,fontSize:11}}>Send Withdraw Code Protect Fund</button>
          </div>
          <button onClick={withdraw} style={{width:"100%",marginTop:8,background:"#EF4444",color:"#fff",padding:"10px",borderRadius:10,border:"none",fontWeight:900}}>Withdraw - Verify Code Applicable To Withdrawal Protect From Hackers</button>
          <div style={{fontSize:9,color:TH.sub,marginTop:6}}>Verify code hidden until Sign Up • Not for Sign In • Applicable to Withdrawal to protect fund N500M from hackers • Demo 123456 • Real {withdrawSent||"Tap Send Withdraw Code"}</div>
        </div>
      </div>
    </div>
  );
}
