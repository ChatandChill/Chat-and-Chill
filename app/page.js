"use client";
import { useState, useEffect } from "react";
export default function Page(){
  const [showNetflix,setShowNetflix]=useState(true);
  const [showFypPopup,setShowFypPopup]=useState(false);
  const [progress,setProgress]=useState(0);
  const [toast,setToast]=useState("");
  const [user,setUser]=useState(null);
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
  const TH={bg:"#0A0E1A",card:"#12161F",gold:"#D4AF37",border:"#1E293B",text:"#E2E8F0"};

  useEffect(()=>{
    const iv=setInterval(()=>{ setProgress(function(p){ return p>=100? 100 : p+5; }); },120);
    const t1=setTimeout(function(){ setShowNetflix(false); setShowFypPopup(true); },3000);
    const t2=setTimeout(function(){ setShowFypPopup(false); },5500);
    return function(){ clearInterval(iv); clearTimeout(t1); clearTimeout(t2); };
  },[]);
  useEffect(function(){ if(countdown>0){ var x=setTimeout(function(){ setCountdown(function(c){ return c-1; }); },1000); return function(){ clearTimeout(x); }; } },[countdown]);
  useEffect(function(){ if(toast){ var x=setTimeout(function(){ setToast(""); },3000); return function(){ clearTimeout(x); }; } },[toast]);

  function sendSignupCode(){
    if(!email){ setToast("Enter email first"); return; }
    if(countdown>0){ return; }
    setSentCode("123456");
    setShowCodeField(true);
    setCountdown(60);
    setToast("Code 123456 sent Works immediately Hidden before now visible");
  }

  function sendWithdrawCode(){
    if(!user){ setShowAuth(true); return; }
    setWithdrawSent("123456");
    setToast("Withdrawal code 123456 sent protect fund from hackers");
  }

  function verifySignup(){
    if(code==="123456" || code===sentCode){
      setUser({email:email});
      setShowAuth(false);
      setToast("Verified Signed Up Guest can scroll FYP join live like TikTok");
      setCode(""); setShowCodeField(false);
    }else{ setToast("Wrong Use 123456"); }
  }

  function signin(){
    if(email && pass.length>=4){
      setUser({email:email});
      setShowAuth(false);
      setToast("Signed In No verify code for Sign In");
    }else{ setToast("Enter email pass 4+ No code for Sign In"); }
  }

  function doWithdraw(){
    if(!withdrawCode){ setToast("Enter withdraw code protect fund from hackers"); return; }
    if(withdrawCode==="123456" || withdrawCode===withdrawSent){
      setToast("Withdrawal verified Fund protected from hackers Safe");
      setWithdrawCode(""); setWithdrawSent("");
    }else{ setToast("Wrong withdraw code Use 123456"); }
  }

  return(
    <div style={{background:TH.bg,color:TH.text,minHeight:"100vh",paddingBottom:70}}>
      {toast? <div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:TH.gold,color:"#000",padding:"10px 18px",borderRadius:20,fontWeight:900,zIndex:9999,fontSize:11}}>{toast}</div> : null}

      {showNetflix? (
        <div style={{background:"#000",height:"100vh",width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"fixed",top:0,left:0,zIndex:9999}}>
          <img src="/logo-dark.png" alt="Real Logo" style={{width:120,height:120,borderRadius:20,border:"2px solid #D4AF37"}}/>
          <div style={{color:"#fff",marginTop:16,fontWeight:900,fontSize:24}}>Chat and Chill</div>
          <div style={{color:TH.gold,marginTop:6,fontSize:12,fontWeight:800}}>Greetings from Chat and Chill</div>
          <div style={{color:"#fff",marginTop:8,fontSize:14}}>Talk cool / Chill out / Have fun</div>
          <div style={{width:180,height:4,background:"#1E293B",borderRadius:4,marginTop:16,overflow:"hidden"}}><div style={{width:progress+"%",height:"100%",background:TH.gold}}></div></div>
        </div>
      ) : null}

      {showFypPopup? (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#111",border:"2px solid #D4AF37",borderRadius:16,padding:14,width:"100%",maxWidth:360}}>
            <div style={{display:"flex",gap:10}}><div style={{width:56,height:56,background:"#8B0000",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:9,border:"1px solid #D4AF37"}}>NETFLIX POPUP</div><div><div style={{fontWeight:900,fontSize:12,color:"#fff"}}>Trending Live Gold Glow AI 12BOX</div><div style={{fontSize:10,color:"#aaa",marginTop:4}}>FYP popup immediately after logo load Real logo Guest scroll view like TikTok</div></div></div>
            <div style={{display:"flex",gap:8,marginTop:10}}><button onClick={function(){ setShowFypPopup(false); }} style={{background:TH.gold,color:"#000",padding:"8px 14px",borderRadius:16,border:"none",fontWeight:800,fontSize:11}}>Join Live Guest Access</button><button onClick={function(){ setShowFypPopup(false); }} style={{background:"#333",color:"#fff",padding:"8px 14px",borderRadius:16,border:"none",fontSize:11}}>Watch FYP No Register</button></div>
          </div>
        </div>
      ) : null}

      <header style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:TH.card,borderBottom:"1px solid #1E293B",alignItems:"center"}}>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><img src="/logo-dark.png" alt="Real logo" style={{width:28,height:28,borderRadius:8,border:"1px solid #D4AF37"}}/><span style={{fontWeight:900,fontSize:12}}>Chat and Chill V5M.1</span></div>
        <button onClick={function(){ setShowAuth(true); }} style={{background:user?TH.gold:"#151B28",color:user?"#000":TH.text,padding:"6px 10px",borderRadius:12,fontSize:10,fontWeight:800,border:"1px solid #1E293B"}}>{user? "User LV100" : "Sign In Up"}</button>
      </header>

      <div style={{background:"linear-gradient(90deg,#D4AF37,#3B82F6)",color:"#000",padding:"5px",textAlign:"center",fontSize:9,fontWeight:900}}>Guest TikTok Scroll FYP Join Live No Register Needed - Verify Hidden Until Sign Up Click - Verify For Withdrawal Protect Fund From Hackers</div>

      {showAuth? (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.9)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#F8FAFC",padding:14,borderRadius:16,border:"2px solid #D4AF37",width:"100%",maxWidth:360}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{display:"flex",gap:8,alignItems:"center"}}><img src="/logo-dark.png" alt="Real logo" style={{width:28,height:28,borderRadius:8,border:"1px solid #D4AF37"}}/><span style={{fontWeight:900,color:"#000",fontSize:13}}>Chat and Chill</span></div><button onClick={function(){ setShowAuth(false); }} style={{width:28,height:28,borderRadius:14}}>X</button></div>
            <div style={{display:"flex",background:"#E2E8F0",borderRadius:10,padding:3,marginBottom:10}}>
              <button onClick={function(){ setAuthTab("signin"); setShowCodeField(false); }} style={{flex:1,background:authTab==="signin"?"#0A0E1A":"transparent",color:authTab==="signin"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800,fontSize:12}}>Sign In Tab No Code</button>
              <button onClick={function(){ setAuthTab("signup"); }} style={{flex:1,background:authTab==="signup"?"#0A0E1A":"transparent",color:authTab==="signup"?"#fff":"#64748B",padding:"8px",borderRadius:8,border:"none",fontWeight:800,fontSize:12}}>Sign Up Tab Code Hidden</button>
            </div>
            <input value={email} onChange={function(e){ setEmail(e.target.value); }} placeholder="Email or Phone" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #CBD5E1",marginBottom:8,color:"#000",background:"#fff"}}/>
            {authTab==="signin"? (
              <div>
                <input value={pass} onChange={function(e){ setPass(e.target.value); }} placeholder="Password No Verify For Sign In" type="password" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #CBD5E1",marginBottom:10,color:"#000",background:"#fff"}}/>
                <button onClick={signin} style={{width:"100%",background:"#0A0E1A",color:"#fff",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>Sign In No Code</button>
              </div>
            ) : (
              <div>
                {showCodeField? (
                  <div>
                    <input value={code} onChange={function(e){ setCode(e.target.value); }} placeholder="Code 123456 Now Visible After Sign Up Click" style={{width:"100%",padding:"12px",borderRadius:10,border:"2px solid #D4AF37",marginBottom:8,color:"#000",background:"#fff",textAlign:"center",fontWeight:900}}/>
                    <button onClick={verifySignup} style={{width:"100%",background:"#0A0E1A",color:"#fff",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>Verify Code Sign Up Now Visible</button>
                  </div>
                ) : (
                  <button onClick={sendSignupCode} style={{width:"100%",background:TH.gold,color:"#000",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>{countdown>0? countdown+"s Resend" : "Click Sign Up Send Verify Code Hidden Until Now"}</button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}

      <div style={{maxWidth:480,margin:"0 auto"}}>
        <div style={{background:TH.card,margin:12,borderRadius:16,overflow:"hidden",border:"1px solid #1E293B"}}>
          <div style={{height:260,background:"#0F0F0F",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <div style={{width:60,height:60,borderRadius:30,background:TH.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>▶️</div>
            <div style={{color:"#fff",marginTop:10,fontWeight:800,fontSize:13}}>FYP Guest Can Scroll View Like TikTok No Register</div>
            <div style={{color:"#94A3B8",fontSize:11,marginTop:4}}>Join Live Stream Even If Not Registered Accessible For Viewers</div>
          </div>
        </div>
        <div style={{background:TH.card,margin:"0 12px",borderRadius:12,padding:12,border:"1px solid #1E293B"}}>
          <div style={{fontWeight:800,fontSize:12}}>Withdrawal Verify Code Protect Fund From Hackers N500M</div>
          <div style={{display:"flex",gap:8,marginTop:10}}><input value={withdrawCode} onChange={function(e){ setWithdrawCode(e.target.value); }} placeholder="Withdrawal Code 123456 Protect Fund" style={{flex:1,padding:"10px",borderRadius:10,border:"2px solid #EF4444",color:"#000",background:"#fff",textAlign:"center",fontWeight:800}}/><button onClick={sendWithdrawCode} style={{background:"#EF4444",color:"#fff",padding:"10px 12px",borderRadius:10,border:"none",fontWeight:800,fontSize:11}}>Send Withdraw Code</button></div>
          <button onClick={doWithdraw} style={{width:"100%",marginTop:8,background:"#EF4444",color:"#fff",padding:"10px",borderRadius:10,border:"none",fontWeight:900}}>Withdraw Verify Applicable Protect From Hackers</button>
        </div>
      </div>
    </div>
  );
}
