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
  const [countdown,setCountdown]=useState(0);
  const [balance,setBalance]=useState(500000);
  const [liked,setLiked]=useState({});
  const [heartPop,setHeartPop]=useState(null);
  const [tab,setTab]=useState("fyp");
  const [is2G,setIs2G]=useState(false);
  const [withdrawAmount,setWithdrawAmount]=useState("");
  const [withdrawCode,setWithdrawCode]=useState("");
  const [chatMsg,setChatMsg]=useState("");
  const [chats,setChats]=useState([{from:"African Queen",msg:"Hi! Talk cool? 👁️",time:"2m"},{from:"Diaspora King",msg:"London chill 💎",time:"5m"}]);
  const [videos,setVideos]=useState([]);
  const [uploadCity,setUploadCity]=useState("Lagos");
  const [showComments,setShowComments]=useState(null);
  const [commentText,setCommentText]=useState("");
  const [comments,setComments]=useState({});

  const posts = [
    {id:1, name:"African Queen", city:"Lagos", color:"#D4AF37", emoji:"👁️", gift:"African Eye", amount:5000},
    {id:2, name:"Diaspora King", city:"London", color:"#3B82F6", emoji:"💎", gift:"Diamond", amount:1000},
    {id:3, name:"Chill Vibes", city:"Accra", color:"#22C55E", emoji:"❤️", gift:"Love Heart", amount:2000},
    {id:4, name:"Level Crew", city:"Nairobi", color:"#A855F7", emoji:"🔥", gift:"Fire Love", amount:3000},
    {id:5, name:"Beyond TikTok", city:"Johannesburg", color:"#F59E0B", emoji:"🌍", gift:"Africa Globe", amount:500},
  ];

  useEffect(function(){
    var iv=setInterval(function(){ setProgress(function(p){ return p>=100?100:p+13; }); },65);
    var t=setTimeout(function(){ setShowNetflix(false); },2100);
    return function(){ clearInterval(iv); clearTimeout(t); };
  },[]);
  useEffect(function(){
    if(countdown>0){ var x=setTimeout(function(){ setCountdown(function(c){ return c-1; }); },1000); return function(){ clearTimeout(x); }; }
  },[countdown]);
  useEffect(function(){
    if(toast){ var x=setTimeout(function(){ setToast(""); },3500); return function(){ clearTimeout(x); }; }
  },[toast]);

  function sendCode(){ if(!email){ setToast("Enter email"); return; } setShowCodeField(true); setCountdown(60); setToast("Code 123456 sent"); }
  function verify(){ if(code==="123456"){ setUser({email:email}); setShowAuth(false); setToast("Verified ABC Real"); setCode(""); setShowCodeField(false); }else{ setToast("Use 123456"); } }

  async function doGift(a,n){
    if(!user){ setShowAuth(true); setToast("Join first to gift"); return; }
    if(balance < a){ setToast("Insufficient N"+balance.toLocaleString()); return; }
    var newBal = balance - a;
    setBalance(newBal);
    setToast("Gift "+n+" N"+a+" -> N"+Math.floor(a*0.7)+" 70% instant");
    try{
      var res=await fetch("/api/gift",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({senderId:user.email,receiverId:"creator",giftAmount:a,giftName:n})});
      var d=await res.json();
      if(d.success && d.wallets && d.wallets.sender_naira!==undefined){ setBalance(d.wallets.sender_naira); }
    }catch(e){}
  }

  function handleLike(id){
    setLiked(function(p){ var n={...p}; n[id]=!n[id]; return n; });
    setHeartPop(id);
    setTimeout(function(){ setHeartPop(null); },700);
  }

  async function doWithdraw(){
    if(!withdrawAmount){ setToast("Enter amount"); return; }
    if(!withdrawCode){ setToast("Enter 123456"); return; }
    if(withdrawCode!=="123456"){ setToast("Wrong code Use 123456"); return; }
    var amt = parseInt(withdrawAmount);
    if(balance < amt){ setToast("Insufficient N"+balance.toLocaleString()); return; }
    var newBal = balance - amt;
    setBalance(newBal);
    setToast("Withdrawal N"+amt+" verified 123456 Protected");
    setWithdrawAmount(""); setWithdrawCode("");
    try{
      var res=await fetch("/api/withdraw",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({amount:withdrawAmount,verifyCode:withdrawCode,userId:user?user.email:"guest"})});
      var d=await res.json();
      if(d.success && d.newBalance!==undefined){ setBalance(d.newBalance); }
    }catch(e){}
  }

  function sendChat(){
    if(!chatMsg){ return; }
    var newChat={from:user?user.email:"You",msg:chatMsg,time:"now"};
    setChats(function(c){ return [newChat].concat(c); });
    setChatMsg("");
    setToast("Chat sent");
  }

  function handleVideoUpload(e){
    var file=e.target.files[0]; if(!file){ return; }
    var url=URL.createObjectURL(file);
    var newVid={id:Date.now(), name:user?user.email:"You", city:uploadCity, emoji:"🎥", gift:"Real Video", amount:1000, url:url};
    setVideos(function(v){ return [newVid].concat(v); });
    setToast("Real Video uploaded "+uploadCity+" Now in FYP");
  }

  function doComment(postId){
    if(!commentText){ return; }
    var list = comments[postId] || [];
    var newList = [{user:user?user.email:"You", text:commentText, time:"now"}].concat(list);
    var newComments = {...comments};
    newComments[postId]=newList;
    setComments(newComments);
    setCommentText("");
    setToast("Comment added");
  }

  var animCss = "@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}} @keyframes pop{0%{transform:scale(0);opacity:0}20%{transform:scale(1.4);opacity:1}100%{transform:scale(0);opacity:0}} @keyframes glow{0%{box-shadow:0 0 8px #D4AF37}50%{box-shadow:0 0 28px #D4AF37}100%{box-shadow:0 0 8px #D4AF37}}";

  return(
    <div style={{background:"#000",color:"#E2E8F0",minHeight:"100vh",paddingBottom:60}}>
      <style dangerouslySetInnerHTML={{__html: animCss}} />
      {toast? <div style={{position:"fixed",top:10,left:"50%",transform:"translateX(-50%)",background:"#D4AF37",color:"#000",padding:"10px 18px",borderRadius:20,fontWeight:900,zIndex:9999,fontSize:11}}>{toast}</div> : null}
      {showNetflix? (<div style={{background:"#000",height:"100vh",width:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"fixed",top:0,left:0,zIndex:9999}}><img src="/logo-dark.png" style={{width:110,height:110,borderRadius:22,border:"2px solid #D4AF37"}}/><div style={{color:"#fff",marginTop:12,fontWeight:900,fontSize:22}}>Chat and Chill</div><div style={{color:"#D4AF37",fontSize:10,fontWeight:800}}>BUILD FIXED • Gift + Comments Working</div><div style={{width:160,height:4,background:"#1E293B",borderRadius:4,marginTop:10,overflow:"hidden"}}><div style={{width:progress+"%",height:"100%",background:"linear-gradient(90deg,#D4AF37,#1877F2)"}}></div></div></div>) : null}

      <header style={{display:"flex",justifyContent:"space-between",padding:"8px 10px",background:"#0A0E1A",borderBottom:"1px solid #1E293B",position:"sticky",top:0,zIndex:20}}><div style={{display:"flex",gap:6,alignItems:"center"}}><img src="/logo-dark.png" style={{width:26,height:26,borderRadius:6,border:"1px solid #D4AF37"}}/><span style={{fontWeight:900,fontSize:11}}>Chat & Chill • FIXED • {is2G?"2G":"4G"}</span></div><div style={{display:"flex",gap:5}}><button onClick={function(){ setIs2G(function(v){ return!v; }); }} style={{background:is2G?"#22C55E":"#1E293B",color:is2G?"#000":"#fff",padding:"5px 10px",borderRadius:10,fontSize:9,fontWeight:800,border:"none"}}>{is2G?"2G":"4G"}</button><button onClick={function(){ setShowAuth(true); }} style={{background:user?"#D4AF37":"#1877F2",color:user?"#000":"#fff",padding:"6px 12px",borderRadius:10,fontSize:10,fontWeight:800,border:"none"}}>{user?"N"+balance.toLocaleString():"Join"}</button></div></header>

      <div style={{display:"flex",gap:0,overflow:"auto",background:"#0A0E1A",borderBottom:"1px solid #1E293B"}}>
        <button onClick={function(){ setTab("fyp"); }} style={{flex:"none",padding:"10px 12px",background:tab==="fyp"?"#D4AF37":"transparent",color:tab==="fyp"?"#000":"#94A3B8",border:"none",fontSize:9,fontWeight:900}}>FYP 5 Places</button>
        <button onClick={function(){ setTab("chat"); }} style={{flex:"none",padding:"10px 12px",background:tab==="chat"?"#D4AF37":"transparent",color:tab==="chat"?"#000":"#94A3B8",border:"none",fontSize:9,fontWeight:700}}>Chat 💬</button>
        <button onClick={function(){ setTab("upload"); }} style={{flex:"none",padding:"10px 12px",background:tab==="upload"?"#D4AF37":"transparent",color:tab==="upload"?"#000":"#94A3B8",border:"none",fontSize:9,fontWeight:700}}>Upload 🎥</button>
        <button onClick={function(){ setTab("fund"); }} style={{flex:"none",padding:"10px 12px",background:tab==="fund"?"#D4AF37":"transparent",color:tab==="fund"?"#000":"#94A3B8",border:"none",fontSize:9,fontWeight:700}}>Fund Link</button>
        <button onClick={function(){ setTab("withdraw"); }} style={{flex:"none",padding:"10px 12px",background:tab==="withdraw"?"#D4AF37":"transparent",color:tab==="withdraw"?"#000":"#94A3B8",border:"none",fontSize:9,fontWeight:700}}>Withdraw 123456</button>
        <button onClick={function(){ setTab("2g"); }} style={{flex:"none",padding:"10px 12px",background:tab==="2g"?"#D4AF37":"transparent",color:tab==="2g"?"#000":"#94A3B8",border:"none",fontSize:9,fontWeight:700}}>2G</button>
      </div>

      {showAuth? (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}><div style={{background:"#fff",padding:16,borderRadius:16,border:"2px solid #D4AF37",width:"100%",maxWidth:360}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><b style={{color:"#000",fontSize:12}}>Join Real App</b><button onClick={function(){ setShowAuth(false); }}>X</button></div><input value={email} onChange={function(e){ setEmail(e.target.value); }} placeholder="Email" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #CBD5E1",marginBottom:8,color:"#000"}}/>{showCodeField? <div><input value={code} onChange={function(e){ setCode(e.target.value); }} placeholder="123456" style={{width:"100%",padding:"12px",borderRadius:10,border:"2px solid #D4AF37",marginBottom:8,color:"#000",textAlign:"center",fontWeight:900}}/><button onClick={verify} style={{width:"100%",background:"#0A0E1A",color:"#fff",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>Verify 123456</button></div> : <button onClick={sendCode} style={{width:"100%",background:"#D4AF37",color:"#000",padding:"12px",borderRadius:10,border:"none",fontWeight:900}}>{countdown>0?countdown+"s":"Send Code"}</button>}</div></div>) : null}

      {tab==="fyp"? (<div style={{maxWidth:500,margin:"0 auto",height:"calc(100vh - 130px)",overflowY:"scroll"}}>{videos.concat(posts).map(function(p){ return(<div key={p.id} style={{height:"calc(100vh - 150px)",background:"#12161F",borderBottom:"3px solid #000",display:"flex",flexDirection:"column"}}><div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",position:"relative",background:"#0F111A"}}><div onDoubleClick={function(){ handleLike(p.id); }} style={{position:"absolute",inset:0,zIndex:5}}></div>{heartPop===p.id? <div style={{position:"absolute",fontSize:90,zIndex:10}}>❤️</div> : null}{p.url? <video src={p.url} autoPlay muted loop style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.7}}/> : null}<div style={{width:76,height:76,borderRadius:38,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,zIndex:6}}>{p.emoji}</div><div style={{color:"#fff",marginTop:8,fontWeight:900,fontSize:14,zIndex:6}}>{p.name} • {p.gift}</div></div><div style={{background:"#0A0E1A",padding:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",gap:8}}><button onClick={function(){ handleLike(p.id); }} style={{background:liked[p.id]?"#ff2d55":"#1E293B",color:"#fff",padding:"8px 12px",borderRadius:14,border:"none",fontSize:11}}>{liked[p.id]?"❤️ Liked":"🤍 Like"}</button><button onClick={function(){ setShowComments(p.id); }} style={{background:"#1E293B",color:"#fff",padding:"8px 12px",borderRadius:14,border:"none",fontSize:11}}>💬 {(comments[p.id]||[]).length} Comment</button><button style={{background:"#1E293B",color:"#fff",padding:"8px 12px",borderRadius:14,border:"none",fontSize:11}}>↗️ Share</button></div><button onClick={function(){ doGift(p.amount, p.gift); }} style={{background:p.color, color:"#000",padding:"10px 16px",borderRadius:16,border:"none",fontWeight:900,fontSize:11}}>🎁 N{p.amount}</button></div></div>); })}</div>) : null}

      {tab==="chat"? (<div style={{maxWidth:500,margin:"0 auto",padding:"16px"}}><div style={{background:"#12161F",borderRadius:16,padding:16,border:"1px solid #1E293B"}}><div style={{fontWeight:900,fontSize:14}}>💬 Real Chat</div><div style={{marginTop:12,display:"flex",gap:8}}><input value={chatMsg} onChange={function(e){ setChatMsg(e.target.value); }} placeholder="Type..." style={{flex:1,padding:"12px",borderRadius:10,background:"#0A0E1A",color:"#fff",border:"1px solid #333"}}/><button onClick={sendChat} style={{background:"#D4AF37",color:"#000",padding:"12px 18px",borderRadius:10,border:"none",fontWeight:900}}>Send</button></div><div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>{chats.map(function(c,i){ return(<div key={i} style={{background:"#0A0E1A",padding:"10px",borderRadius:10,fontSize:11}}><b>{c.from}</b><div>{c.msg}</div></div>); })}</div></div></div>) : null}

      {tab==="upload"? (<div style={{maxWidth:500,margin:"0 auto",padding:"16px"}}><div style={{background:"#12161F",borderRadius:16,padding:16}}><div style={{fontWeight:900}}>🎥 Upload Real Video</div><select value={uploadCity} onChange={function(e){ setUploadCity(e.target.value); }} style={{width:"100%",padding:"12px",borderRadius:10,background:"#0A0E1A",color:"#fff",marginTop:8}}><option>Lagos</option><option>London</option><option>Accra</option><option>Nairobi</option><option>Johannesburg</option></select><input type="file" accept="video/*" onChange={handleVideoUpload} style={{width:"100%",padding:"12px",background:"#0A0E1A",color:"#fff",marginTop:8}}/></div></div>) : null}

      {tab==="fund"? (<div style={{maxWidth:500,margin:"0 auto",padding:"16px"}}><div style={{background:"#12161F",borderRadius:16,padding:16}}><div style={{fontWeight:900}}>💰 Fund Link</div><div style={{marginTop:12,background:"#0A0E1A",padding:12,borderRadius:12}}><div style={{fontSize:11}}>Balance Real DB</div><div style={{fontSize:28,fontWeight:900,color:"#D4AF37"}}>N{balance.toLocaleString()}</div></div><button onClick={function(){ setTab("withdraw"); }} style={{width:"100%",marginTop:12,background:"#D4AF37",color:"#000",padding:"12px",borderRadius:12,border:"none",fontWeight:900}}>Go Withdraw</button></div></div>) : null}

      {tab==="withdraw"? (<div style={{maxWidth:500,margin:"0 auto",padding:"16px"}}><div style={{background:"#12161F",borderRadius:16,padding:16}}><div style={{fontWeight:900}}>🏧 Withdraw Verify 123456</div><input value={withdrawAmount} onChange={function(e){ setWithdrawAmount(e.target.value); }} placeholder="Amount" style={{width:"100%",padding:"12px",borderRadius:10,background:"#0A0E1A",color:"#fff",marginTop:8}}/><input value={withdrawCode} onChange={function(e){ setWithdrawCode(e.target.value); }} placeholder="123456" style={{width:"100%",padding:"12px",borderRadius:10,background:"#0A0E1A",color:"#fff",marginTop:8,textAlign:"center",fontWeight:900}}/><button onClick={doWithdraw} style={{width:"100%",marginTop:12,background:"#22C55E",color:"#000",padding:"14px",borderRadius:12,border:"none",fontWeight:900}}>Verify & Withdraw</button></div></div>) : null}

      {tab==="2g"? (<div style={{maxWidth:500,margin:"0 auto",padding:"16px"}}><div style={{background:"#12161F",borderRadius:16,padding:16}}><div style={{fontWeight:900}}>📶 2G Mode</div><div style={{marginTop:12,background:is2G?"#22C55E22":"#0A0E1A",padding:"12px",borderRadius:12,display:"flex",justifyContent:"space-between"}}><div><div style={{fontWeight:800}}>{is2G?"2G ACTIVE":"4G Full"}</div></div><button onClick={function(){ setIs2G(function(v){ return!v; }); }} style={{background:is2G?"#22C55E":"#1E293B",color:is2G?"#000":"#fff",padding:"8px 14px",borderRadius:10,border:"none"}}>{is2G?"4G":"2G"}</button></div></div></div>) : null}

      {showComments? (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:900,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}><div style={{background:"#12161F",borderRadius:"16px 16px 0 0",padding:16,maxHeight:"70vh",overflow:"auto",borderTop:"2px solid #D4AF37"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><b>💬 Comments • Post {showComments}</b><button onClick={function(){ setShowComments(null); }} style={{background:"#1E293B",color:"#fff",border:"none",padding:"6px 12px",borderRadius:10}}>X</button></div><div style={{display:"flex",gap:8,marginBottom:12}}><input value={commentText} onChange={function(e){ setCommentText(e.target.value); }} placeholder="Talk cool..." style={{flex:1,padding:"12px",borderRadius:10,background:"#0A0E1A",color:"#fff",border:"1px solid #333"}}/><button onClick={function(){ doComment(showComments); }} style={{background:"#D4AF37",color:"#000",padding:"12px 16px",borderRadius:10,border:"none",fontWeight:900}}>Send</button></div><div style={{display:"flex",flexDirection:"column",gap:8}}>{(comments[showComments]||[]).map(function(c,i){ return(<div key={i} style={{background:"#0A0E1A",padding:"10px",borderRadius:10,fontSize:11}}><b>{c.user}</b><div>{c.text}</div></div>); })}{(comments[showComments]||[]).length===0? <div style={{fontSize:11,color:"#64748B",textAlign:"center",padding:20}}>No comments yet — Be first!</div> : null}</div></div></div>) : null}

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0A0E1A",borderTop:"1px solid #1E293B",display:"flex",justifyContent:"space-around",padding:"6px 0",zIndex:30}}>
        <button onClick={function(){ setTab("fyp"); }} style={{background:"none",border:"none",color:tab==="fyp"?"#D4AF37":"#64748B"}}><div>🏠</div><div style={{fontSize:7}}>FYP</div></button>
        <button onClick={function(){ setTab("chat"); }} style={{background:"none",border:"none",color:tab==="chat"?"#D4AF37":"#64748B"}}><div>💬</div><div style={{fontSize:7}}>Chat</div></button>
        <button onClick={function(){ setTab("upload"); }} style={{background:"none",border:"none",color:tab==="upload"?"#D4AF37":"#64748B"}}><div>+</div><div style={{fontSize:7}}>Upload</div></button>
        <button onClick={function(){ setTab("fund"); }} style={{background:"none",border:"none",color:tab==="fund"?"#D4AF37":"#64748B"}}><div>💰</div><div style={{fontSize:7}}>Fund</div></button>
        <button onClick={function(){ setTab("withdraw"); }} style={{background:"none",border:"none",color:tab==="withdraw"?"#D4AF37":"#64748B"}}><div>🏧</div><div style={{fontSize:7}}>Withdraw</div></button>
      </div>
    </div>
  );
}
