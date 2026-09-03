"use client";
import { useState, useEffect, useRef } from "react";

const LANGS = { pidgin:{label:"PIDGIN"}, hausa:{label:"HAUSA"}, yoruba:{label:"YORUBA"}, igbo:{label:"IGBO"}, swahili:{label:"SWAHILI"}, english:{label:"ENGLISH"} };

export default function Page(){
  const [splash,setSplash]=useState(true);
  const [lang,setLang]=useState("pidgin");
  const [showWelcome,setShowWelcome]=useState(false);
  const [tab,setTab]=useState("foryou");
  const [balance,setBalance]=useState(306950);
  const [giftOpen,setGiftOpen]=useState(null);
  const [liked,setLiked]=useState({});
  const [saved,setSaved]=useState({});
  const [showAuth,setShowAuth]=useState(false);
  const [authMode,setAuthMode]=useState("signup");
  const [user,setUser]=useState(null);
  const [liveRoom,setLiveRoom]=useState(null);
  const [chatMsg,setChatMsg]=useState("");
  const [chats,setChats]=useState([{user:"@Sade",text:"Wetin dey happen for Lagos?"},{user:"@JapaKing",text:"E choke! Japa levels 71+ 0.3s"}]);
  const [isLive,setIsLive]=useState(false);
  const [micOn,setMicOn]=useState(true);
  const [camOn,setCamOn]=useState(true);
  const videoRef=useRef(null);
  const streamRef=useRef(null);

  useEffect(()=>{
    const t1=setTimeout(()=>{setSplash(false); setShowWelcome(true);},2500);
    return ()=>clearTimeout(t1);
  },[]);

  const gifts=[
    {name:"Fire",price:1000,cut:"70%"},
    {name:"Diamond",price:5000,cut:"70%"},
    {name:"Rocket",price:10000,cut:"70%"},
    {name:"Lion",price:25000,cut:"70%"},
    {name:"Eagle",price:50000,cut:"80% Lvl 71+",label:"BEYOND TIKTOK"},
    {name:"Crown",price:100000,cut:"80%"},
    {name:"Private Jet",price:500000,cut:"90% Lvl 100 EZE",label:"EZE"},
  ];

  const feedBase=[
    {id:1,user:"@Sade_Lagos",titles:{pidgin:"Lagos Night Vibes - How I make N1M for live",hausa:"Daren Legas - Yadda na samu N1M",yoruba:"Alekole Eko - Bawo ni mo se ri N1M",igbo:"Abali Lagos - Otu m si mee N1M",swahili:"Lagos Usiku - Jinsi nilivyopata N1M",english:"Lagos Night Vibes - How I made N1M"},score:92,views:"12.4k",level:92,tag:"Business 95/100",bg:"#ff6a00"},
    {id:2,user:"@JapaKing",titles:{pidgin:"Japa UK Secrets Wey Dem Dey Hide - Part 2",hausa:"Sirrin Japa UK da suke Boye",yoruba:"Asiri Japa UK ti won n toju",igbo:"Ihe nzuzo Japa UK ha na-ezo",swahili:"Siri za Japa UK wanazoficha",english:"Japa UK Secrets They Hide"},score:98,views:"28.1k",level:100,tag:"Japa 98/100",bg:"#6a5cff"},
    {id:3,user:"@Ada_Business",titles:{pidgin:"How I Build Store with N50k",hausa:"Yadda na Gina Shago da N50k",yoruba:"Bawo ni mo se Ko Ile Itaja",igbo:"Otu m si wuru ulo ahia",swahili:"Jinsi nilivyojenga duka",english:"How I Built Store with N50k"},score:97,views:"15.2k",level:88,tag:"Business 97/100",bg:"#00a67d"},
    {id:4,user:"@VillageChill",titles:{pidgin:"2G Live from Village - 15kb/s",hausa:"Live 2G daga Kauye",yoruba:"Live 2G lati Abule",igbo:"Live 2G site n obodo",swahili:"Live 2G kutoka Kijijini",english:"2G Live from Village"},score:90,views:"8.4k",level:71,tag:"2G READY",bg:"#333"},
  ];
  const feed=feedBase.map(v=>({...v,title:v.titles[lang]||v.titles.english}));

  const startLive=async()=>{
    try{
      const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
      streamRef.current=stream;
      if(videoRef.current){videoRef.current.srcObject=stream;}
      setIsLive(true);
      setLiveRoom({id:99,user:user?user.username:"@You",title:"My Premium Live - 0.3s LiveKit + Audio",views:"1",level:user?user.level:46,score:100,tag:"My Room",bg:"#111",isMine:true});
    }catch(e){
      alert("Camera/Mic permission needed for streaming - "+e.message+" - Starting audio only demo");
      setIsLive(true);
      setLiveRoom({id:99,user:user?user.username:"@You",title:"My Premium Live (Audio Only) - 0.3s",views:"1",level:user?user.level:46,score:100,tag:"My Room",bg:"#111",isMine:true});
    }
  };
  const stopLive=()=>{
    if(streamRef.current){streamRef.current.getTracks().forEach(t=>t.stop());}
    setIsLive(false);
    setLiveRoom(null);
  };
  const toggleMic=()=>{ if(streamRef.current){streamRef.current.getAudioTracks().forEach(t=>t.enabled=!micOn);} setMicOn(!micOn); };
  const toggleCam=()=>{ if(streamRef.current){streamRef.current.getVideoTracks().forEach(t=>t.enabled=!camOn);} setCamOn(!camOn); };

  const handleAuth=()=>{
    setUser({name:"You",username:"@You_Creator",level:46,balance:balance});
    setShowAuth(false);
    setShowWelcome(false);
    setTab("creator");
  };

  if(splash){
    return(
      <div style={{height:"100vh",background:"black",display:"grid",placeItems:"center"}}>
        <style>{`@keyframes pop{0%{transform:scale(0.5);opacity:0}50%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}} @keyframes glow{0%,100%{text-shadow:0 0 20px #FF5722}50%{text-shadow:0 0 40px #FFD600}}`}</style>
        <div style={{textAlign:"center",animation:"pop 0.8s cubic-bezier(0.34,1.56,0.64,1)"}}>
          <div style={{width:80,height:80,borderRadius:999,background:"#FFD600",margin:"0 auto",display:"grid",placeItems:"center",fontWeight:900,fontSize:32,color:"black",boxShadow:"0 0 40px #FF5722"}}>C</div>
          <h1 style={{color:"white",fontWeight:900,fontSize:32,marginTop:16,animation:"glow 1.5s infinite"}}>CHAT & CHILL</h1>
          <p style={{color:"#FF5722",fontFamily:"monospace",fontSize:11,fontWeight:900,marginTop:4}}>VIDEO + AUDIO STREAMING • 0.3s LiveKit</p>
        </div>
      </div>
    );
  }

  if(liveRoom){
    return(
      <div style={{height:"100vh",background:"black",color:"white",position:"relative",maxWidth:430,margin:"0 auto",overflow:"hidden"}}>
        <div style={{height:"100%",background:liveRoom.bg,position:"relative"}}>
          {liveRoom.isMine?(
            <video ref={videoRef} autoPlay muted playsInline style={{width:"100%",height:"100%",objectFit:"cover",background:"#111"}} />
          ):(
            <div style={{width:"100%",height:"100%",background:liveRoom.bg,display:"grid",placeItems:"center"}}><p style={{fontWeight:900}}>LIVE VIDEO STREAM - {liveRoom.user}<br/>0.3s latency • Audio ON</p></div>
          )}
          <div style={{position:"absolute",inset:0,padding:16,display:"flex",flexDirection:"column",justifyContent:"space-between",background:"linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 30%, transparent 70%, rgba(0,0,0,0.8))"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:8,alignItems:"center"}}><button onClick={()=>{stopLive();}} style={{width:32,height:32,borderRadius:999,background:"rgba(0,0,0,0.5)",border:"none",color:"white",fontWeight:900}}>X</button><div style={{padding:"4px 10px",borderRadius:999,background:"#ef4444",fontSize:10,fontWeight:900,animation:"pulse 1s infinite"}}>● LIVE {liveRoom.views}</div><div style={{padding:"4px 10px",borderRadius:999,background:"rgba(0,0,0,0.5)",fontSize:10,fontWeight:900}}>0.3s • {micOn?"MIC ON":"MUTED"} • {camOn?"CAM ON":"CAM OFF"}</div></div>
              <div style={{padding:"4px 10px",borderRadius:999,background:"#FFD600",color:"black",fontSize:10,fontWeight:900}}>{isLive?"STREAMING":"VIEWING"}</div>
            </div>
            <div>
              <div style={{height:150,overflowY:"auto",display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
                {chats.map((c,i)=><div key={i} style={{fontSize:12,background:"rgba(0,0,0,0.4)",padding:"4px 8px",borderRadius:999,width:"fit-content",maxWidth:"80%"}}><span style={{fontWeight:900,color:"#FFD600"}}>{c.user}: </span>{c.text}</div>)}
              </div>
              {liveRoom.isMine && (
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <button onClick={toggleMic} style={{padding:"8px 12px",borderRadius:999,border:"none",background:micOn?"#22c55e":"#ef4444",color:"white",fontWeight:900,fontSize:11}}>{micOn?"🎤 MIC ON":"🔇 MUTED"}</button>
                  <button onClick={toggleCam} style={{padding:"8px 12px",borderRadius:999,border:"none",background:camOn?"#22c55e":"#ef4444",color:"white",fontWeight:900,fontSize:11}}>{camOn?"📷 CAM ON":"📷 OFF"}</button>
                  <button onClick={stopLive} style={{padding:"8px 12px",borderRadius:999,border:"none",background:"black",color:"white",fontWeight:900,fontSize:11,border:"1px solid white"}}>END LIVE</button>
                </div>
              )}
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} placeholder={liveRoom.isMine?"Say something to viewers...":"Talk cool..."} style={{flex:1,padding:"12px 16px",borderRadius:999,border:"none",background:"rgba(0,0,0,0.6)",color:"white"}} />
                <button onClick={()=>{if(chatMsg){setChats([...chats,{user:user?user.username:"@You",text:chatMsg}]);setChatMsg("");}}} style={{padding:"12px 16px",borderRadius:999,border:"none",background:"#FF5722",color:"white",fontWeight:900}}>Send</button>
                <button onClick={()=>setGiftOpen(liveRoom)} style={{width:44,height:44,borderRadius:999,border:"none",background:"#FFD600",fontWeight:900}}>G</button>
              </div>
            </div>
          </div>
        </div>
        {giftOpen && (
          <div style={{position:"absolute",inset:0,zIndex:20,background:"rgba(0,0,0,0.7)",display:"grid",placeItems:"center",padding:16}}>
            <div style={{background:"white",borderRadius:20,padding:16,width:"100%",maxWidth:300,color:"black"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><p style={{fontWeight:900}}>Send Gift - Video+Audio Live</p><button onClick={()=>setGiftOpen(null)} style={{border:"none",background:"none",fontWeight:900}}>X</button></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
                {gifts.map(g=><button key={g.name} onClick={()=>{setBalance(b=>b+Math.floor(g.price*0.7));setGiftOpen(null); setChats([...chats,{user:"System",text:`You sent ${g.name} N${g.price.toLocaleString()} - 70% to creator! Audio: Ding!`}])}} style={{padding:10,borderRadius:12,border:"1px solid #eee",background:"white",fontSize:11,fontWeight:900}}>{g.name}<br/>N{g.price.toLocaleString()}</button>)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return(
    <div style={{background:"#FFFBEB",minHeight:"100vh"}}>
      <div style={{maxWidth:430,margin:"0 auto",background:"#FFFBEB",minHeight:"100vh",borderLeft:"1px solid #ffe4c4",borderRight:"1px solid #ffe4c4",position:"relative"}}>
        <div style={{position:"sticky",top:0,zIndex:20,background:"rgba(255,251,235,0.95)",padding:"12px 16px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid #ffe4c4"}}>
          <div style={{display:"flex",gap:8,alignItems:"center"}}><div style={{width:32,height:32,borderRadius:999,background:"black",color:"white",display:"grid",placeItems:"center",fontSize:12,fontWeight:900}}>C</div><div style={{padding:"4px 12px",borderRadius:999,background:"black",color:"white",fontSize:12,fontFamily:"monospace"}}>N{balance.toLocaleString()}</div></div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {user?(
              <div style={{display:"flex",gap:6,alignItems:"center"}}><div style={{padding:"4px 10px",borderRadius:999,background:"#FFD600",color:"black",fontSize:10,fontWeight:900}}>{user.username} Lvl {user.level}</div><button onClick={()=>setTab("creator")} style={{width:32,height:32,borderRadius:999,background:"black",color:"white",border:"2px solid #FF5722",fontWeight:900}}>Y</button></div>
            ):(
              <button onClick={()=>{setAuthMode("signup");setShowAuth(true);}} style={{padding:"6px 14px",borderRadius:999,background:"black",color:"white",fontSize:11,fontWeight:900,border:"none"}}>Sign Up / Login</button>
            )}
          </div>
        </div>

        <div style={{padding:"8px 16px",display:"flex",gap:8,overflowX:"auto"}}>
          {Object.keys(LANGS).map(k=>(
            <button key={k} onClick={()=>setLang(k)} style={{padding:"6px 12px",borderRadius:999,fontSize:10,fontWeight:900,fontFamily:"monospace",whiteSpace:"nowrap",background:lang===k?"black":"rgba(0,0,0,0.05)",color:lang===k?"white":"rgba(0,0,0,0.6)",border:"none"}}>{LANGS[k].label}</button>
          ))}
        </div>

        <div style={{padding:"0 16px 8px",display:"flex",gap:6}}>
          {[{k:"foryou",label:"For You"},{k:"live",label:"Live"},{k:"wallet",label:"Wallet"},{k:"creator",label:"Creator"}].map(b=>(
            <button key={b.k} onClick={()=>{setTab(b.k); setShowWelcome(false);}} style={{flex:1,padding:"10px 0",borderRadius:999,fontSize:10,fontWeight:900,fontFamily:"monospace",border:"2px solid",borderColor:tab===b.k?"black":"transparent",background:tab===b.k?"black":"white",color:tab===b.k?"white":"black"}}>{b.label}</button>
          ))}
        </div>

        {showWelcome && (
          <div style={{margin:"8px 16px",borderRadius:24,background:"black",color:"white",padding:20,textAlign:"center"}}>
            <h1 style={{fontSize:22,fontWeight:900}}>Welcome to Chat & Chill</h1>
            <p style={{fontSize:10,fontFamily:"monospace",color:"#FF5722",marginTop:4}}>VIDEO + AUDIO STREAMING • 0.3s LiveKit • We Be One Family</p>
            <button onClick={()=>setShowWelcome(false)} style={{width:"100%",marginTop:12,padding:"12px 0",borderRadius:999,background:"#FFD600",color:"black",fontWeight:900,border:"none",fontFamily:"monospace"}}>Enter - BEYOND TIKTOK</button>
          </div>
        )}

        {tab==="foryou" && (
          <div style={{padding:"0 12px",display:"flex",flexDirection:"column",gap:16}}>
            {feed.map(v=>(
              <div key={v.id} onClick={()=>setLiveRoom(v)} style={{borderRadius:28,overflow:"hidden",background:"black",color:"white",cursor:"pointer"}}>
                <div style={{height:280,background:v.bg,padding:16,display:"flex",flexDirection:"column",justifyContent:"space-between",position:"relative"}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}><span style={{padding:"4px 8px",borderRadius:999,background:"#ef4444",fontSize:10,fontWeight:900}}>● LIVE {v.views} TAP FOR VIDEO+AUDIO</span><span style={{padding:"4px 10px",borderRadius:999,background:"#FFD600",color:"black",fontSize:10,fontWeight:900}}>Lvl {v.level}</span></div>
                  <div><h3 style={{fontSize:20,fontWeight:900}}>{v.title}</h3><p style={{fontSize:12,opacity:0.8}}>{v.user} - {v.tag} - Video+Audio Streaming</p></div>
                </div>
                <div style={{padding:10,background:"#111",display:"flex",gap:8}}><div style={{flex:1,background:"rgba(255,255,255,0.05)",borderRadius:10,padding:6,textAlign:"center",fontSize:10,fontFamily:"monospace"}}>TAP TO JOIN LIVE ROOM - VIDEO + AUDIO</div></div>
              </div>
            ))}
          </div>
        )}

        {tab==="live" && (
          <div style={{padding:16}}>
            <h2 style={{fontWeight:900,fontSize:18}}>Live Rooms - Video + Audio</h2>
            <p style={{fontSize:11,opacity:0.6,fontFamily:"monospace"}}>TikTok style LiveRoom Box - 0.3s latency - Camera + Mic</p>
            <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:10}}>
              {feed.map(v=>(
                <div key={v.id} onClick={()=>setLiveRoom(v)} style={{background:"black",color:"white",borderRadius:20,padding:14,display:"flex",gap:12,alignItems:"center",cursor:"pointer"}}>
                  <div style={{width:56,height:56,borderRadius:14,background:v.bg,display:"grid",placeItems:"center",fontWeight:900}}>{v.user[1]}</div>
                  <div style={{flex:1}}><p style={{fontWeight:900,fontSize:13}}>{v.title}</p><p style={{fontSize:10,opacity:0.6}}>{v.user} • {v.views} viewers • Video+Audio ON</p></div>
                  <div style={{padding:"6px 10px",borderRadius:999,background:"#FF5722",fontSize:10,fontWeight:900}}>JOIN</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="creator" && (
          <div style={{padding:16}}>
            {user?(
              <div>
                <div style={{background:"black",color:"white",borderRadius:20,padding:20}}><p style={{fontSize:11,fontFamily:"monospace",opacity:0.6}}>CREATOR DASHBOARD - VIDEO + AUDIO</p><p style={{fontSize:20,fontWeight:900}}>{user.username}</p><p style={{fontSize:11,opacity:0.7}}>Lvl {user.level} • EZE Path to 100 • Balance N{balance.toLocaleString()}</p>
                  <video ref={!isLive?videoRef:null} autoPlay muted playsInline style={{width:"100%",height:160,background:"#222",borderRadius:12,marginTop:12,display:isLive?"none":"block",objectFit:"cover"}} />
                  {isLive && <div style={{marginTop:12,padding:8,borderRadius:12,background:"#22c55e",textAlign:"center",fontWeight:900,fontSize:12}}>● LIVE NOW - Video + Audio Streaming - Viewers see you - 0.3s</div>}
                  <button onClick={()=>{if(isLive){stopLive();}else{startLive();}}} style={{width:"100%",marginTop:12,padding:"14px 0",borderRadius:999,background:isLive?"#ef4444":"#FFD600",color:isLive?"white":"black",fontWeight:900,border:"none",fontSize:14}}>{isLive?"■ END LIVE STREAM": "🔴 GO LIVE NOW - VIDEO + AUDIO"}</button>
                  {isLive && (
                    <div style={{display:"flex",gap:8,marginTop:8}}>
                      <button onClick={toggleMic} style={{flex:1,padding:"8px 0",borderRadius:999,border:"none",background:micOn?"white":"#ef4444",color:micOn?"black":"white",fontWeight:900,fontSize:11}}>{micOn?"🎤 Mic ON":"🔇 Mic OFF"}</button>
                      <button onClick={toggleCam} style={{flex:1,padding:"8px 0",borderRadius:999,border:"none",background:camOn?"white":"#ef4444",color:camOn?"black":"white",fontWeight:900,fontSize:11}}>{camOn?"📷 Cam ON":"📷 Cam OFF"}</button>
                    </div>
                  )}
                </div>
                <div style={{marginTop:16}}><h3 style={{fontWeight:900}}>Premium Creator Tools - Video+Audio</h3><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}><div style={{background:"white",borderRadius:12,padding:12,border:"1px solid #ffe4c4"}}><p style={{fontWeight:900,fontSize:12}}>LiveKit 0.3s</p><p style={{fontSize:10,opacity:0.6}}>Video+Audio low latency</p></div><div style={{background:"white",borderRadius:12,padding:12,border:"1px solid #ffe4c4"}}><p style={{fontWeight:900,fontSize:12}}>Audio Streaming</p><p style={{fontSize:10,opacity:0.6}}>Mic toggle • Echo cancel</p></div><div style={{background:"white",borderRadius:12,padding:12,border:"1px solid #ffe4c4"}}><p style={{fontWeight:900,fontSize:12}}>2G 15kb/s</p><p style={{fontSize:10,opacity:0.6}}>Village mode video+audio</p></div><div style={{background:"white",borderRadius:12,padding:12,border:"1px solid #ffe4c4"}}><p style={{fontWeight:900,fontSize:12}}>Level 100 EZE</p><p style={{fontSize:10,opacity:0.6}}>+40% beyond TikTok</p></div></div></div>
              </div>
            ):(
              <div style={{textAlign:"center",padding:40}}><p style={{fontWeight:900}}>Login to access Creator Page - Video+Audio</p><button onClick={()=>{setAuthMode("signup");setShowAuth(true);}} style={{marginTop:12,padding:"12px 24px",borderRadius:999,background:"black",color:"white",fontWeight:900,border:"none"}}>Sign Up / Login</button></div>
            )}
          </div>
        )}

        {tab==="wallet" && (
          <div style={{padding:16}}>
            <div style={{background:"black",color:"white",borderRadius:20,padding:20}}><p style={{fontSize:11,fontFamily:"monospace",opacity:0.6}}>TOTAL BALANCE</p><p style={{fontSize:32,fontWeight:900,fontFamily:"monospace"}}>N{balance.toLocaleString()}</p><button onClick={()=>alert("Withdraw via Paystack")} style={{width:"100%",marginTop:12,padding:"12px 0",borderRadius:999,background:"#FFD600",color:"black",fontWeight:900,border:"none"}}>Withdraw</button></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:12}}>
              {gifts.map(g=>(
                <button key={g.name} onClick={()=>setGiftOpen(g)} style={{textAlign:"left",borderRadius:16,padding:14,background:g.label?"black":"white",color:g.label?"white":"black",border:"1px solid #ffe4c4"}}><p style={{fontWeight:900,fontSize:13}}>{g.name}</p><p style={{fontSize:11,fontFamily:"monospace"}}>N{g.price.toLocaleString()}</p><span style={{marginTop:6,display:"inline-block",padding:"3px 8px",borderRadius:999,background:g.label?"#FFD600":"#FF5722",color:g.label?"black":"white",fontSize:9,fontWeight:900}}>{g.cut}</span></button>
              ))}
            </div>
          </div>
        )}

        {showAuth && (
          <div style={{position:"fixed",inset:0,zIndex:60,background:"rgba(0,0,0,0.8)",display:"grid",placeItems:"center",padding:16}}>
            <div style={{background:"white",borderRadius:24,padding:20,width:"100%",maxWidth:340}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{fontWeight:900,fontSize:20}}>{authMode==="signup"?"Create Creator Account - Video+Audio":"Creator Login"}</h2><button onClick={()=>setShowAuth(false)} style={{border:"none",background:"none",fontWeight:900}}>X</button></div>
              <p style={{fontSize:11,opacity:0.6,marginTop:4}}>Video + Audio Streaming • 0.3s LiveKit • 70% gifts</p>
              <div style={{display:"flex",gap:8,marginTop:12}}><button onClick={()=>setAuthMode("signup")} style={{flex:1,padding:"8px 0",borderRadius:999,border:"none",background:authMode==="signup"?"black":"#eee",color:authMode==="signup"?"white":"black",fontWeight:900,fontSize:12}}>Sign Up</button><button onClick={()=>setAuthMode("login")} style={{flex:1,padding:"8px 0",borderRadius:999,border:"none",background:authMode==="login"?"black":"#eee",color:authMode==="login"?"white":"black",fontWeight:900,fontSize:12}}>Login</button></div>
              <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:10}}>
                {authMode==="signup" && <input placeholder="Username e.g @Sade_Lagos" style={{padding:"12px 14px",borderRadius:12,border:"1px solid #ddd"}}/>}
                <input placeholder="Email" style={{padding:"12px 14px",borderRadius:12,border:"1px solid #ddd"}}/>
                <input placeholder="Password" type="password" style={{padding:"12px 14px",borderRadius:12,border:"1px solid #ddd"}}/>
                <button onClick={handleAuth} style={{width:"100%",padding:"14px 0",borderRadius:999,background:"black",color:"white",fontWeight:900,border:"none",marginTop:4}}>{authMode==="signup"?"Create Account - Go to Creator Page + Video":"Login - Go to Creator Page + Video"}</button>
                <p style={{fontSize:9,textAlign:"center",opacity:0.5,fontFamily:"monospace"}}>Camera + Mic permission for Video+Audio • Paystack • WAF • 2G</p>
              </div>
            </div>
          </div>
        )}

        {giftOpen && !liveRoom && (
          <div style={{position:"fixed",inset:0,zIndex:50,background:"rgba(0,0,0,0.7)",display:"grid",placeItems:"center",padding:16}}>
            <div style={{background:"white",borderRadius:24,padding:20,width:"100%",maxWidth:340}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:900}}>Send Gift</h3><button onClick={()=>setGiftOpen(null)} style={{border:"none",background:"none",fontWeight:900}}>X</button></div>
              <div style={{marginTop:12,background:"#FFFBEB",borderRadius:12,padding:14,textAlign:"center"}}><p style={{fontWeight:900}}>{giftOpen.name||giftOpen.title}</p><p style={{fontFamily:"monospace"}}>N{(giftOpen.price||1000).toLocaleString()}</p></div>
              <button onClick={()=>{setBalance(b=>b+Math.floor((giftOpen.price||1000)*0.7));setGiftOpen(null);}} style={{width:"100%",marginTop:12,padding:"14px 0",borderRadius:999,background:"black",color:"white",fontWeight:900,border:"none"}}>Pay N{(giftOpen.price||1000).toLocaleString()}</button>
            </div>
          </div>
        )}
        <div style={{padding:10,textAlign:"center",fontSize:9,fontFamily:"monospace",opacity:0.3}}>v109 ULTIMATE - Video+Audio Streaming - Creator Login - LiveRoom Box - Netflix Splash</div>
      </div>
    </div>
  );
}
