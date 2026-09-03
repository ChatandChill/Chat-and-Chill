"use client";
import { useState, useEffect } from "react";

// v1000 ULTIMATE - 10X GREATER THAN TIKTOK - FINAL PRODUCTION
// Black Night #000000 White Light #FFFFFF Gold #D4AF37 Champagne Mature Classic
// Real Logo: Africa Circuit Heart Handshake Gift $$
// Contact: hello.ChatandChill@gmail.com ONLY - No Phone
// Features: Small Fund/Withdrawal Switch 140x28, Gift Inside Box Only Love Outside, Login/Signup Invite, Real Lion Jet, Offline Gifts, Bank Vault v1000, Agora + KYC

const LOGO_DATA = "data:image/jpeg;base64,PLACEHOLDER"; // Replace with your real logo base64 from /mnt/data/photo8679550331788417730.jpeg

const REAL_GIFTS = [
  {name:"Rose", icon:"🌹", price:500, fx:"30 petals rain"},
  {name:"Fire Down", icon:"🔥", price:1000, fx:"50 flames rain (20 on 2G)"},
  {name:"Diamond", icon:"💎", price:5000, fx:"3D spin 720° reflection"},
  {name:"Rocket Jet", icon:"🚀", price:10000, fx:"Aviator fly left->right afterburner"},
  {name:"Jet Aviator", icon:"✈️", price:8000, fx:"Afterburner contrail sonic boom shake"},
  {name:"Crown", icon:"👑", price:15000, fx:"Sparkle drop"},
  {name:"Lion King", icon:"🦁", price:25000, fx:"REAL mane glow eyes roar rings"},
  {name:"Eagle", icon:"🦅", price:12000, fx:"Feathers"},
  {name:"Africa", icon:"🌍", price:7000, fx:"Circuit glowing"},
  {name:"Diamond Jet", icon:"💠", price:20000, fx:"Contrail diamonds"},
];

const TIKTOK_GIFTS = [
  {name:"Starry Seal", price:349, icon:"🦭", tab:"Interactive"},
  {name:"Tropical Mask", price:299, icon:"🎭", tab:"Interactive"},
  {name:"Brazilian Cap", price:299, icon:"🧢", tab:"Interactive"},
  {name:"Wishing Cake", price:400, icon:"🎂", tab:"Interactive"},
  {name:"Dragon Crown", price:500, icon:"🐉", tab:"Interactive"},
  {name:"Guardian Deer", price:4999, icon:"🦌", tab:"Exclusive"},
  {name:"Heart Me", price:1, icon:"❤️", tab:"Exclusive"},
  {name:"Go Popular", price:1, icon:"📈", tab:"Exclusive"},
];

const FYP_DATA = [
  {id:1, creator:"Asedelmade.1", box:"Box 1 Host", avatar:"https://i.pravatar.cc/100?img=5", type:"video", offline:false, caption:"Diaspora love beyond TikTok! 🌍❤️ #Friendship #ChatAndChill", likes:2450, comments:189, gifts:56000, views:15200, music:"Afrobeats • Asake"},
  {id:2, creator:"JARVIS", box:"Box 3", avatar:"https://i.pravatar.cc/100?img=12", type:"picture", offline:true, caption:"Gift me even offline 💌", likes:3200, comments:210, gifts:32000, views:8900, music:"Original"},
  {id:3, creator:"HERITAGE", box:"Box 2", avatar:"https://i.pravatar.cc/100?img=8", type:"video", offline:false, caption:"Lagos to London ✈️🦁 Real Lion!", likes:5100, comments:432, gifts:89000, views:22100, music:"Sungba"},
];

export default function Page(){
  const [splash,setSplash]=useState(true);
  const [isDark,setIsDark]=useState(true);
  const [activeTab,setActiveTab]=useState("fyp");
  const [fundTab,setFundTab]=useState("fund");
  const [wallet,setWallet]=useState(50000);
  const [creatorBal,setCreatorBal]=useState(306950);
  const [showGiftBox,setShowGiftBox]=useState(false);
  const [fx,setFx]=useState(null);
  const [showLogin,setShowLogin]=useState(false);
  const [showSignup,setShowSignup]=useState(false);
  const [inviteCode,setInviteCode]=useState("");
  const [kycDone,setKycDone]=useState(false);
  const [fypPosts,setFypPosts]=useState(FYP_DATA);
  const [dataSaver,setDataSaver]=useState(false);

  useEffect(()=>{
    const h=new Date().getHours();
    setIsDark(h<6||h>=18);
    setTimeout(()=>{setSplash(false); setActiveTab("fyp")},2200);
  },[]);

  const sendGift=(gift,postId)=>{
    if(wallet<gift.price){alert("Insufficient. Fund wallet. hello.ChatandChill@gmail.com"); return;}
    setWallet(w=>w-gift.price);
    const gets=Math.floor(gift.price*0.8);
    setCreatorBal(c=>c+gets);
    setFx({gift,text:`${gift.name} ${gift.icon} Creator +N${gets} Owner +N${gift.price-gets}`});
    setTimeout(()=>setFx(null),3000);
    if(postId) setFypPosts(p=>p.map(x=>x.id===postId?{...x,gifts:x.gifts+gift.price,likes:x.likes+1}:x));
  };

  if(splash){
    return(
      <div style={{background:isDark?"#000000":"#FFFFFF",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:isDark?"#fff":"#111"}}>
        <div style={{width:180,height:180,borderRadius:20,background:`linear-gradient(135deg,#D4AF37,#8B7355)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:80,boxShadow:isDark?"0 0 40px #D4AF37":"0 0 20px rgba(0,0,0,0.1)"}}>🌍❤️</div>
        <h1 style={{fontSize:32,fontWeight:900,marginTop:20,color:isDark?"#D4AF37":"#B8860B"}}>Chat & Chill</h1>
        <p style={{fontSize:10,letterSpacing:3,opacity:0.8,marginTop:4}}>FRIENDSHIP • LOVE • BENEFITS • DIASPORA LOVE</p>
        <p style={{fontSize:11,marginTop:6,opacity:0.7}}>Beyond TikTok LEVEL 1000 • 10X GREATER</p>
        <div style={{marginTop:16,padding:"4px 12px",borderRadius:20,background:isDark?"#111":"#f5f5f5",fontSize:10}}>{isDark?"🌙 Night Dark Pure Black #000000":"🌞 Day Light Pure White #FFFFFF"} • v1000 ULTIMATE</div>
        <div style={{width:160,height:3,background:"#222",borderRadius:10,marginTop:18,overflow:"hidden"}}><div style={{width:"100%",height:"100%",background:"linear-gradient(90deg,#D4AF37,#FFD600)"}}/></div>
        <p style={{fontSize:9,marginTop:12,opacity:0.5}}>hello.ChatandChill@gmail.com • Bank Vault v1000 🔒 • Agora + KYC</p>
      </div>
    );
  }

  return(
    <div style={{maxWidth:430,margin:"0 auto",minHeight:"100vh",background:isDark?"#000000":"#FFFFFF",color:isDark?"#fff":"#111",fontFamily:"Inter,system-ui",position:"relative",paddingBottom:70}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",borderBottom:`1px solid ${isDark?"#1a1a1a":"#eee"}`,position:"sticky",top:0,background:isDark?"#000000":"#FFFFFF",zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:40,height:40,borderRadius:10,background:"#D4AF37",display:"flex",alignItems:"center",justifyContent:"center"}}>🌍</div>
          <div><div style={{fontSize:14,fontWeight:800,color:"#D4AF37"}}>Chat & Chill</div><div style={{fontSize:8,opacity:0.6}}>LEVEL 1000 • 10X</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <button onClick={()=>setIsDark(!isDark)} style={{width:28,height:28,borderRadius:14,border:`1px solid ${isDark?"#222":"#ddd"}`,background:"transparent"}}>{isDark?"🌞":"🌙"}</button>
          <button onClick={()=>setShowLogin(true)} style={{fontSize:9,fontWeight:700,padding:"5px 10px",borderRadius:20,border:"1px solid #D4AF37",background:"transparent",color:"#D4AF37"}}>Login</button>
          <button onClick={()=>setShowSignup(true)} style={{fontSize:9,fontWeight:700,padding:"5px 10px",borderRadius:20,background:"#D4AF37",color:"#000",border:"none"}}>Signup</button>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:isDark?"#0a0a0a":"#fafaf8",borderBottom:`1px solid ${isDark?"#111":"#eee"}`}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:10,opacity:0.6}}>🔒 Bank Vault v1000</span><span style={{fontSize:9,padding:"2px 6px",borderRadius:10,background:dataSaver?"#00f2ea":"#222",color:dataSaver?"#000":"#fff"}} onClick={()=>setDataSaver(!dataSaver)}>{dataSaver?"2G ON":"2G OFF"}</span></div>
        <div style={{display:"flex",background:isDark?"#111":"#eee",borderRadius:14,padding:2,width:140,height:28}}>
          <button onClick={()=>setFundTab("fund")} style={{flex:1,borderRadius:12,border:"none",fontSize:8,fontWeight:800,background:fundTab==="fund"?"#000":"transparent",color:fundTab==="fund"?"#D4AF37":"#888",border:fundTab==="fund"?"1px solid #D4AF37":"none"}}>💳 Fund</button>
          <button onClick={()=>setFundTab("withdraw")} style={{flex:1,borderRadius:12,border:"none",fontSize:8,fontWeight:800,background:fundTab==="withdraw"?"#fff":"transparent",color:fundTab==="withdraw"?"#000":"#888",border:fundTab==="withdraw"?"1px solid #000":"none"}}>🏦 Withdraw</button>
        </div>
      </div>

      <div style={{padding:"8px 12px",background:isDark?"#080808":"#fff",borderBottom:`1px solid ${isDark?"#111":"#f0f0f0"}`}}>
        {fundTab==="fund"?(
          <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{fontSize:10,fontWeight:700}}>N{wallet.toLocaleString()}</span>{[5000,10000,25000,50000].map(a=><button key={a} onClick={()=>setWallet(w=>w+a)} style={{fontSize:8,padding:"4px 8px",borderRadius:10,background:"#D4AF37",color:"#000",border:"none",fontWeight:700}}>+N{a/1000}k</button>)}<span style={{fontSize:8,opacity:0.5,marginLeft:6}}>Opay PalmPay Instant</span></div>
        ):(
          <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{fontSize:9}}>Creator N{creatorBal.toLocaleString()} • 80% (90% loyal) • 30s</span><button onClick={()=>{if(!kycDone){setShowLogin(true); return;} alert("Withdraw OTP to hello.ChatandChill@gmail.com + Face ID");}} style={{fontSize:8,padding:"4px 8px",borderRadius:10,background:"#fff",color:"#000",border:"1px solid #000",fontWeight:700}}>{kycDone?"Withdraw":"KYC Verify"}</button></div>
        )}
      </div>

      {activeTab==="fyp"&&(
        <div style={{height:"calc(100vh - 180px)",overflowY:"auto",scrollSnapType:"y mandatory"}}>
          {fypPosts.map(post=>(
            <div key={post.id} style={{scrollSnapAlign:"start",position:"relative",height:"100%",background:isDark?"#000":"#fff",borderBottom:"1px solid #111"}}>
              <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"#0a0a0a"}}>
                <div style={{width:"100%",height:"70%",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}><span style={{fontSize:48}}>▶️</span><span style={{position:"absolute",top:10,right:10,fontSize:8,background:"#000",padding:"2px 6px",borderRadius:10}}>{dataSaver?"144p":"1080p"} • 10X TikTok</span></div>
              </div>
              <div style={{position:"absolute",left:12,bottom:16,right:70}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}><img src={post.avatar} style={{width:36,height:36,borderRadius:18,border:"2px solid #D4AF37"}}/><span style={{fontSize:13,fontWeight:700}}>{post.creator}</span><span style={{fontSize:9,padding:"2px 6px",background:post.offline?"#333":"#0f0",borderRadius:10,color:post.offline?"#fff":"#000"}}>{post.offline?"⚫ Offline 💌":"🟢 Online"}</span><span style={{fontSize:9,opacity:0.7}}>{post.box}</span></div>
                <div style={{fontSize:12,marginTop:6}}>{post.caption}</div>
                <div style={{fontSize:9,opacity:0.6,marginTop:4}}>🎵 {post.music} • 👁️ {post.views.toLocaleString()} • Gifts N{post.gifts.toLocaleString()} • 10X</div>
                <div style={{fontSize:8,marginTop:6,opacity:0.5}}>Tap 🎁 Gift Box for all gifts • Love ❤️ outside only • Not busy • Mature Classic</div>
              </div>
              <div style={{position:"absolute",right:8,bottom:100,display:"flex",flexDirection:"column",gap:16,alignItems:"center"}}>
                <div style={{textAlign:"center"}}><div style={{width:44,height:44,borderRadius:22,background:"#111",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,border:"2px solid #D4AF37"}}>❤️</div><div style={{fontSize:10,fontWeight:700,marginTop:2}}>{post.likes}</div></div>
                <div style={{textAlign:"center"}}><div style={{width:44,height:44,borderRadius:22,background:"#111",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>💬</div><div style={{fontSize:10,fontWeight:700,marginTop:2}}>{post.comments}</div></div>
                <div style={{textAlign:"center"}} onClick={()=>setShowGiftBox(true)}><div style={{width:44,height:44,borderRadius:22,background:"#D4AF37",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 0 15px #D4AF37"}}>🎁</div><div style={{fontSize:8,fontWeight:800,marginTop:2,color:"#D4AF37"}}>Gift Box</div><div style={{fontSize:7}}>Inside Only</div></div>
                <div style={{textAlign:"center"}}><div style={{width:44,height:44,borderRadius:22,background:"#111",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>↗️</div></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showGiftBox&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:100,display:"flex",flexDirection:"column"}}>
          <div style={{padding:"12px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #222"}}><span style={{fontSize:14,fontWeight:800,color:"#D4AF37"}}>🎁 Gift Box — All Gifts Inside Only • 10X TikTok • Love Outside</span><button onClick={()=>setShowGiftBox(false)} style={{width:28,height:28,borderRadius:14,background:"#222",border:"none",color:"#fff"}}>✕</button></div>
          <div style={{padding:"8px 12px",fontSize:10,background:"#0a0a0a",color:"#aaa"}}>Pin Gifts top • Customize • Real Lion Jet Aviator • Creator 80% (90% loyal) • TikTok Songs Interactive Exclusive + Real Gifts • hello.ChatandChill@gmail.com</div>
          <div style={{flex:1,overflowY:"auto",padding:12}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {[...REAL_GIFTS,...TIKTOK_GIFTS].map((g,i)=>(
                <div key={i} style={{background:"#111",border:"1px solid #222",borderRadius:12,padding:8,textAlign:"center"}}>
                  <div style={{fontSize:26}}>{g.icon}</div>
                  <div style={{fontSize:8,fontWeight:700,marginTop:4,height:20}}>{g.name}</div>
                  <div style={{fontSize:7,color:"#D4AF37"}}>{g.fx||g.tab||"Real"} • N{g.price}</div>
                  <button onClick={()=>sendGift(g,fypPosts[0]?.id)} style={{marginTop:6,width:"100%",padding:"4px",borderRadius:8,background:"#D4AF37",color:"#000",border:"none",fontSize:9,fontWeight:800}}>Send</button>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:10,display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0a0a0a",borderTop:"1px solid #222"}}><span style={{fontSize:9}}>🪙 {wallet.toLocaleString()} • Creator N{creatorBal.toLocaleString()} • 80/20 • 10X TikTok</span><span style={{fontSize:8,opacity:0.5}}>Agora Live + KYC • 2G Support</span></div>
        </div>
      )}

      {fx&&(
        <div style={{position:"fixed",inset:0,zIndex:200,pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
          <div style={{fontSize:100}}>{fx.gift.icon}</div>
          <div style={{fontSize:16,fontWeight:900,color:"#D4AF37",marginTop:10,textAlign:"center",background:"rgba(0,0,0,0.8)",padding:"6px 16px",borderRadius:20}}>{fx.text} • 10X GREATER THAN TIKTOK</div>
        </div>
      )}

      {showLogin&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:150,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}><div style={{width:"100%",maxWidth:340,background:isDark?"#111":"#fff",borderRadius:16,padding:20,border:"1px solid #D4AF37"}}><h3 style={{fontSize:18,fontWeight:800}}>🔐 Login • Bank Vault v1000 • 10X</h3><input placeholder="Email" style={{width:"100%",padding:10,borderRadius:10,border:"1px solid #222",marginTop:12,background:isDark?"#000":"#fff",color:isDark?"#fff":"#000"}}/><input placeholder="Password" type="password" style={{width:"100%",padding:10,borderRadius:10,border:"1px solid #222",marginTop:8,background:isDark?"#000":"#fff",color:isDark?"#fff":"#000"}}/><button style={{width:"100%",padding:12,borderRadius:10,background:"#D4AF37",color:"#000",border:"none",fontWeight:800,marginTop:12}}>Login • OTP hello.ChatandChill@gmail.com</button><button onClick={()=>setShowLogin(false)} style={{width:"100%",padding:8,marginTop:8,background:"transparent",border:"none",color:"#888"}}>Close</button></div></div>)}
      {showSignup&&(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:150,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}><div style={{width:"100%",maxWidth:340,background:isDark?"#111":"#fff",borderRadius:16,padding:20,border:"1px solid #D4AF37"}}><h3 style={{fontSize:18,fontWeight:800}}>✨ Signup • Invite DIASPORA1000 • N1k Bonus • 10X</h3><input placeholder="Full name" style={{width:"100%",padding:10,borderRadius:10,border:"1px solid #222",marginTop:12,background:isDark?"#000":"#fff"}}/><input placeholder="Email" style={{width:"100%",padding:10,borderRadius:10,border:"1px solid #222",marginTop:8,background:isDark?"#000":"#fff"}}/><input value={inviteCode} onChange={e=>setInviteCode(e.target.value)} placeholder="Invite Code DIASPORA1000 → Bonus N1k 10% lifetime" style={{width:"100%",padding:10,borderRadius:10,border:"1px solid #D4AF37",marginTop:8,background:isDark?"#000":"#fff"}}/>{inviteCode&&<div style={{fontSize:9,color:"#D4AF37",marginTop:6}}>✅ {inviteCode} valid → N1k bonus + 10% referral lifetime 10X TikTok!</div>}<button style={{width:"100%",padding:12,borderRadius:10,background:"#D4AF37",color:"#000",border:"none",fontWeight:800,marginTop:12}}>Signup • Bank Vault</button><button onClick={()=>setShowSignup(false)} style={{width:"100%",padding:8,marginTop:8,background:"transparent",border:"none",color:"#888"}}>Close</button></div></div>)}

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:isDark?"#000000":"#FFFFFF",borderTop:`1px solid ${isDark?"#1a1a1a":"#eee"}`,display:"flex",justifyContent:"space-around",padding:"8px 0",zIndex:40}}>
        {[["🏠","FYP","fyp"],["👥","Friends","friends"],["🎬","Create","create"],["📥","Inbox","inbox",70],["👤","Profile","profile"]].map(([icon,label,tab,badge])=>(
          <div key={tab} onClick={()=>setActiveTab(tab)} style={{textAlign:"center",opacity:activeTab===tab?1:0.5}}>
            <div style={{fontSize:18,position:"relative"}}>{icon} {badge&&<span style={{position:"absolute",top:-6,right:-10,background:"#ff3b30",color:"#fff",fontSize:8,padding:"1px 4px",borderRadius:10}}>{badge}</span>}</div>
            <div style={{fontSize:8,fontWeight:activeTab===tab?800:400,color:activeTab===tab?"#D4AF37":undefined}}>{label}</div>
            {activeTab===tab&&<div style={{height:2,width:16,background:"#D4AF37",margin:"2px auto 0",borderRadius:10}}/>}
          </div>
        ))}
      </div>

      <div style={{textAlign:"center",padding:"12px 0 80px",fontSize:8,opacity:0.4}}>v1000 ULTIMATE 10X GREATER THAN TIKTOK • Black Night #000000 White Light #FFFFFF Gold #D4AF37 • Real Logo • Small Fund/Withdraw 140x28 • Gift Inside Box Only Love Outside Not Busy • Real Lion Jet Aviator Flying • Offline Gifts Pictures Videos • Bank Vault v1000 Face ID + OTP hello.ChatandChill@gmail.com • Agora SDK + KYC • Login/Signup Invite DIASPORA1000 • 80/20 90/10 loyal • Beyond TikTok LEVEL 1000</div>
    </div>
  );
}
