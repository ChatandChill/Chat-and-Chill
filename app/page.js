"use client";
import { useState, useEffect, useRef } from "react";

export default function Page(){
  const [splash,setSplash]=useState(true);
  const [darkMode,setDarkMode]=useState(true);
  const [tab,setTab]=useState("foryou");
  const [balance,setBalance]=useState(306950);
  const [giftOpen,setGiftOpen]=useState(null);
  const [user,setUser]=useState({username:"@You_Creator",level:46,bio:"Friendship • Love • Benefits • Beyond TikTok Level 100",followers:1240,following:89});
  const [liveRoom,setLiveRoom]=useState(null);
  const [chatMsg,setChatMsg]=useState("");
  const [chats,setChats]=useState([{user:"@Sade",text:"Friendship Love Benefits logo fine die!"},{user:"System",text:"Handshake in heart = friendship, Gift $$ = benefits"}]);
  const [isLive,setIsLive]=useState(false);
  const [guests,setGuests]=useState([]);
  const [showGuestBox,setShowGuestBox]=useState(false);
  const videoRef=useRef(null);
  const streamRef=useRef(null);

  useEffect(()=>{
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){setDarkMode(false);}
    const t=setTimeout(()=>{setSplash(false);},3500);
    return ()=>clearTimeout(t);
  },[]);

  useEffect(()=>{
    if(isLive && liveRoom?.isMine && videoRef.current && streamRef.current){
      videoRef.current.srcObject=streamRef.current;
      videoRef.current.play().catch(()=>{});
    }
  },[isLive,liveRoom,guests]);

  const gifts=[
    {name:"🔥 Fire",price:1000},{name:"💎 Diamond",price:5000},{name:"🚀 Rocket",price:10000},{name:"🦁 Lion",price:25000},{name:"🦅 Eagle",price:50000},{name:"👑 Crown",price:100000},{name:"✈️ Jet",price:500000},{name:"💝 Benefits",price:2000},
  ];

  const startLive=async()=>{
    try{
      const stream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:720},height:{ideal:1280}},audio:{echoCancellation:true,noiseSuppression:true}});
      streamRef.current=stream;
      setIsLive(true);
      setLiveRoom({id:99,user:user.username,title:"Live - Friendship Love Benefits - 12 Guests",views:"1",level:user.level,bg:"#111",isMine:true});
      setTimeout(()=>{ if(videoRef.current){ videoRef.current.srcObject=stream; videoRef.current.play().catch(()=>{});} },150);
    }catch(e){ alert("Allow Camera+Mic: "+e.message); }
  };
  const stopLive=()=>{ if(streamRef.current){streamRef.current.getTracks().forEach(t=>t.stop());} setIsLive(false); setLiveRoom(null); setGuests([]); };
  const addManyGuests=(n)=>{ const toAdd=Math.min(n,12-guests.length); const newG=Array.from({length:toAdd},(_,i)=>({id:Date.now()+i,name:`@Guest_${guests.length+i+1}`})); setGuests([...guests,...newG]); setShowGuestBox(false); };

  if(splash){
    return(
      <div style={{height:"100vh",display:"grid",placeItems:"center",padding:20,background:darkMode?"#050507":"#FFFBEB"}}>
        <style>{`@keyframes velvet{0%{transform:scale(0.85);opacity:0;filter:blur(12px)}40%{transform:scale(1.04);opacity:1;filter:blur(0)}100%{transform:scale(1);opacity:1}} @keyframes edgeGlow{0%,100%{box-shadow:0 0 40px rgba(255,214,0,0.4)}50%{box-shadow:0 0 60px rgba(255,214,0,0.7)}}`}</style>
        <div style={{position:"absolute",top:20,right:20}}><button onClick={()=>setDarkMode(!darkMode)} style={{padding:"8px 14px",borderRadius:999,border:"1px solid rgba(255,214,0,0.3)",background:darkMode?"rgba(255,214,0,0.1)":"white",color:darkMode?"#FFD600":"black",fontSize:11,fontWeight:900}}>{darkMode?"☀️ LIGHT":"🌙 DARK"}</button></div>
        <div style={{textAlign:"center",animation:"velvet 1.4s"}}>
          <div style={{width:360,height:360,margin:"0 auto",borderRadius:30,overflow:"hidden",background:darkMode?"#0a0a0a":"white",display:"grid",placeItems:"center",animation:"edgeGlow 2.5s infinite",border:`1px solid ${darkMode?"rgba(255,214,0,0.2)":"rgba(0,0,0,0.08)"}`}}>
            {darkMode ? (
              <img src="/logo-dark-friendship.png" alt="Dark Friendship Love Benefits" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={(e)=>{e.target.style.display="none"; e.target.nextSibling.style.display="block";}}/>
            ) : (
              <img src="/logo-light-friendship.png" alt="Light Friendship Love Benefits" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={(e)=>{e.target.style.display="none"; e.target.nextSibling.style.display="block";}}/>
            )}
            <div style={{display:"none",padding:20,textAlign:"center",color:darkMode?"#FFD600":"black",fontWeight:900,fontSize:12}}>Upload logo-dark-friendship.png (dark) and logo-light-friendship.png (light) to public/ folder<br/><br/>DARK: Midnight Velvet<br/>Africa + Handshake in Heart + Gift $$<br/><br/>LIGHT: Light Premium<br/>Friendship • Love • Benefits</div>
          </div>
          <h1 style={{color:darkMode?"#FFD600":"black",fontWeight:900,fontSize:30,marginTop:20,fontFamily:"serif"}}>Chat & Chill</h1>
          <p style={{color:"#FFD600",fontSize:13,letterSpacing:4,fontWeight:900,marginTop:6}}>FRIENDSHIP • LOVE • BENEFITS</p>
          <p style={{color:darkMode?"rgba(255,214,0,0.5)":"rgba(0,0,0,0.4)",fontSize:10,letterSpacing:2,marginTop:6}}>Beyond TikTok • LEVEL 100</p>
          <p style={{color:darkMode?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)",fontSize:8,marginTop:18,maxWidth:320,lineHeight:1.6,margin:"18px auto 0"}}>{darkMode?"DARK PREMIUM - Used on cold start. Heavy, quiet, electrified edge glow. Handshake in heart = friendship, Gift $$ = benefits. Luxury box opening.":"LIGHT PREMIUM - Used in header. Clean minimal. Handshake heart + gift $$ benefits. Premium stationery feel."}</p>
        </div>
      </div>
    );
  }

  if(liveRoom){
    return(
      <div style={{height:"100vh",background:"black",color:"white",position:"relative",maxWidth:430,margin:"0 auto",overflow:"hidden"}}>
        <video ref={videoRef} autoPlay muted playsInline style={{width:"100%",height:"100%",objectFit:"cover",background:"#111",position:"absolute",inset:0}} />
        <div style={{position:"absolute",top:62,left:8,right:8,zIndex:3,display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:6,maxHeight:"58%",overflowY:"auto"}}>
          {guests.map(g=><div key={g.id} style={{height:96,borderRadius:12,background:"#1a1a1a",border:"2px solid #FFD600",display:"grid",placeItems:"center",fontSize:9,fontWeight:900,position:"relative"}}>{g.name}<br/>📷🎤<button onClick={()=>setGuests(guests.filter(x=>x.id!==g.id))} style={{position:"absolute",top:2,right:2,width:18,height:18,borderRadius:999,background:"#ef4444",border:"none",color:"white"}}>×</button></div>)}
        </div>
        <div style={{position:"absolute",inset:0,padding:12,display:"flex",flexDirection:"column",justifyContent:"space-between",background:"linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 25%, transparent 60%, rgba(0,0,0,0.9))",zIndex:4}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><button onClick={stopLive} style={{width:32,height:32,borderRadius:999,background:"rgba(0,0,0,0.6)",border:"none",color:"white",fontWeight:900}}>X</button><div style={{padding:"5px 12px",borderRadius:999,background:"#ef4444",fontSize:11,fontWeight:900}}>● LIVE {guests.length}/12 FRIENDSHIP</div></div>
          <div>
            <div style={{height:90,overflowY:"auto",display:"flex",flexDirection:"column",gap:5,marginBottom:8}}>{chats.slice(-4).map((c,i)=><div key={i} style={{fontSize:11,background:"rgba(0,0,0,0.5)",padding:"4px 8px",borderRadius:999,width:"fit-content"}}><span style={{fontWeight:900,color:"#FFD600"}}>{c.user}: </span>{c.text}</div>)}</div>
            <div style={{display:"flex",gap:5,marginBottom:8}}><button onClick={()=>setShowGuestBox(true)} style={{padding:"8px 12px",borderRadius:999,border:"none",background:"#FFD600",color:"black",fontWeight:900,fontSize:11}}>+ GUEST {guests.length}/12</button><button onClick={()=>setGiftOpen({})} style={{padding:"8px 12px",borderRadius:999,border:"none",background:"#FF5722",color:"white",fontWeight:900,fontSize:11}}>🎁 BENEFITS</button><button onClick={stopLive} style={{padding:"8px 12px",borderRadius:999,border:"none",background:"black",color:"white",fontWeight:900,fontSize:11,border:"1px solid white"}}>END</button></div>
            <div style={{display:"flex",gap:8}}><input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} placeholder="Friendship • Love • Benefits..." style={{flex:1,padding:"12px 16px",borderRadius:999,border:"none",background:"rgba(0,0,0,0.6)",color:"white"}}/><button onClick={()=>{if(chatMsg){setChats([...chats,{user:user.username,text:chatMsg}]); setChatMsg("");}}} style={{padding:"12px 18px",borderRadius:999,border:"none",background:"#FF5722",color:"white",fontWeight:900}}>Send</button></div>
          </div>
        </div>
        {giftOpen && <div style={{position:"absolute",bottom:78,left:8,right:8,zIndex:10,background:"rgba(0,0,0,0.92)",borderRadius:20,padding:12,border:"1px solid #FFD600"}}><div style={{display:"flex",justifyContent:"space-between"}}><p style={{fontWeight:900,fontSize:12}}>🎁 Benefits Gifts - Friendship Love - 70%</p><button onClick={()=>setGiftOpen(null)} style={{width:24,height:24,borderRadius:999,border:"none",background:"white",color:"black",fontWeight:900}}>X</button></div><div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:6,marginTop:10}}>{gifts.map(g=><button key={g.name} onClick={()=>{setBalance(b=>b+Math.floor(g.price*0.7)); setGiftOpen(null);}} style={{padding:8,borderRadius:12,border:"none",background:"white",color:"black",fontWeight:900,fontSize:9}}>{g.name}<br/>N{g.price.toLocaleString()}</button>)}</div></div>}
        {showGuestBox && <div style={{position:"absolute",inset:0,zIndex:20,background:"rgba(0,0,0,0.85)",display:"grid",placeItems:"center",padding:16}}><div style={{background:"white",borderRadius:20,padding:16,width:"100%",maxWidth:340,color:"black"}}><h3 style={{fontWeight:900}}>Guest Box 12 - Friendship</h3><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}><button onClick={()=>{if(guests.length<12) setGuests([...guests,{id:Date.now(),name:"@Guest_"+(guests.length+1)}]);}} style={{padding:"12px 0",borderRadius:999,background:"black",color:"white",fontWeight:900,border:"none"}}>+1</button><button onClick={()=>addManyGuests(3)} style={{padding:"12px 0",borderRadius:999,background:"#FFD600",color:"black",fontWeight:900,border:"none"}}>+3</button><button onClick={()=>addManyGuests(6)} style={{padding:"12px 0",borderRadius:999,background:"#FF5722",color:"white",fontWeight:900,border:"none"}}>+6</button><button onClick={()=>addManyGuests(12)} style={{padding:"12px 0",borderRadius:999,background:"black",color:"white",fontWeight:900,border:"none"}}>Fill 12</button></div><button onClick={()=>setShowGuestBox(false)} style={{width:"100%",marginTop:12,padding:"10px 0",borderRadius:999,background:"#eee",border:"none",fontWeight:900}}>Close</button></div></div>}
      </div>
    );
  }

  return(
    <div style={{background:darkMode?"#111":"#FFFBEB",minHeight:"100vh"}}>
      <div style={{maxWidth:430,margin:"0 auto",background:darkMode?"#111":"#FFFBEB",minHeight:"100vh",color:darkMode?"white":"black"}}>
        <div style={{position:"sticky",top:0,zIndex:20,background:darkMode?"rgba(17,17,17,0.95)":"rgba(255,251,235,0.95)",padding:"12px 16px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid rgba(255,214,0,0.1)"}}>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <img src={darkMode?"/logo-dark-friendship.png":"/logo-light-friendship.png"} alt="logo" style={{width:32,height:32,borderRadius:999,objectFit:"cover"}} onError={(e)=>{e.target.style.display="none"}}/>
            <div style={{padding:"4px 12px",borderRadius:999,background:darkMode?"white":"black",color:darkMode?"black":"white",fontSize:12,fontFamily:"monospace"}}>N{balance.toLocaleString()}</div>
          </div>
          <div style={{display:"flex",gap:8}}><button onClick={()=>setDarkMode(!darkMode)} style={{width:36,height:36,borderRadius:999,background:darkMode?"white":"black",color:darkMode?"black":"white",border:"none"}}>{darkMode?"☀️":"🌙"}</button><button onClick={()=>setTab("profile")} style={{width:36,height:36,borderRadius:999,background:"black",color:"white",border:"2px solid #FFD600",fontWeight:900}}>Y</button></div>
        </div>
        <div style={{padding:"8px 16px",display:"flex",gap:6}}>
          {[{k:"foryou",label:"For You"},{k:"live",label:"Live"},{k:"wallet",label:"Wallet"},{k:"creator",label:"Creator"},{k:"profile",label:"Profile"}].map(b=>(
            <button key={b.k} onClick={()=>setTab(b.k)} style={{flex:1,padding:"10px 0",borderRadius:999,fontSize:9,fontWeight:900,border:"2px solid",borderColor:tab===b.k?"#FFD600":"transparent",background:tab===b.k?"black":"white",color:tab===b.k?"white":"black"}}>{b.label}</button>
          ))}
        </div>
        {tab==="foryou" && <div style={{padding:"0 12px",display:"flex",flexDirection:"column",gap:12}}><div onClick={()=>setLiveRoom({id:1,bg:"#ff6a00",isMine:false})} style={{borderRadius:24,overflow:"hidden",background:"black",color:"white"}}><div style={{height:180,background:"#ff6a00",padding:14,display:"flex",flexDirection:"column",justifyContent:"space-between"}}><span style={{padding:"4px 8px",borderRadius:999,background:"#ef4444",fontSize:10,fontWeight:900,width:"fit-content"}}>● LIVE FRIENDSHIP LOVE BENEFITS</span><h3 style={{fontWeight:900}}>Agreed Logo - Friendship Love Benefits - 12 Guests Live</h3></div></div></div>}
        {tab==="creator" && (
          <div style={{padding:16}}>
            <div style={{background:"black",color:"white",borderRadius:20,padding:16}}>
              <p style={{fontSize:10,opacity:0.6}}>CREATOR - FRIENDSHIP LOVE BENEFITS - 12 GUESTS</p>
              <p style={{fontSize:16,fontWeight:900}}>{user.username} • N{balance.toLocaleString()}</p>
              <div style={{width:"100%",height:160,background:"#222",borderRadius:12,marginTop:10,overflow:"hidden"}}><video ref={!isLive?videoRef:null} autoPlay muted playsInline style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
              <button onClick={()=>{if(isLive){stopLive();}else{startLive();}}} style={{width:"100%",marginTop:10,padding:"14px 0",borderRadius:999,background:isLive?"#ef4444":"#FFD600",color:isLive?"white":"black",fontWeight:900,border:"none"}}>{isLive?"■ END":"🔴 GO LIVE - FRIENDSHIP LOVE BENEFITS - 12 GUESTS"}</button>
              <button onClick={()=>setShowGuestBox(true)} style={{width:"100%",marginTop:8,padding:"12px 0",borderRadius:999,background:"white",color:"black",fontWeight:900,border:"none",fontSize:12}}>+ GUEST BOX 12 - {guests.length}/12</button>
            </div>
          </div>
        )}
        {tab==="profile" && <div style={{padding:16}}><div style={{background:"black",color:"white",borderRadius:20,padding:20,textAlign:"center"}}><img src={darkMode?"/logo-dark-friendship.png":"/logo-light-friendship.png"} alt="logo" style={{width:80,height:80,borderRadius:20,margin:"0 auto",objectFit:"cover"}} onError={(e)=>{e.target.style.display="none"}}/><h2 style={{fontWeight:900,fontSize:22,marginTop:12}}>Chat & Chill</h2><p style={{fontSize:12,color:"#FFD600",fontWeight:900,letterSpacing:3}}>FRIENDSHIP • LOVE • BENEFITS</p><p style={{fontSize:10,opacity:0.6,marginTop:8}}>Handshake in heart = friendship + love, Gift $$ = benefits - Beyond TikTok Level 100</p></div></div>}
        {tab==="wallet" && <div style={{padding:16}}><div style={{background:"black",color:"white",borderRadius:20,padding:20}}><p style={{fontSize:11,opacity:0.6}}>BALANCE - BENEFITS</p><p style={{fontSize:32,fontWeight:900}}>N{balance.toLocaleString()}</p></div></div>}
        <div style={{padding:10,textAlign:"center",fontSize:8,opacity:0.3}}>v115 FINAL - Agreed Logo Friendship Love Benefits - Dark+Light - 12 Guests - Video Fixed - Gifts IN Live - TikTok Perfect</div>
      </div>
    </div>
  );
}
