"use client"
import { useState } from 'react';

export default function Page() {
  const [bal, setBal] = useState(47250);
  const [msg, setMsg] = useState("");

  const gift = (name, price) => {
    const keep = Math.round(price * 0.7);
    setBal(b => b + keep);
    setMsg("Gift dropped! " + name + " - You got N" + keep);
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <div style={{minHeight:'100vh', background:'#FFF9E9', display:'flex', justifyContent:'center', fontFamily:'system-ui'}}>
      <div style={{width:'100%', maxWidth:420, padding:20, paddingBottom:90}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
          <b>CHAT & CHILL</b>
          <div style={{background:'white', borderRadius:20, padding:'6px 12px', fontSize:11, fontWeight:'bold'}}>2G MODE ON</div>
        </div>
        <h1 style={{fontSize:32, fontWeight:900, lineHeight:1, marginBottom:10}}>Talk Cool,<br/>Stay Chill <span style={{color:'#FF5A1F'}}>+ Earn</span></h1>
        <p style={{fontSize:13, color:'#666', marginBottom:20}}>Creator economy built for 2G</p>
        <div style={{background:'white', borderRadius:24, padding:18, boxShadow:'0 8px 24px rgba(0,0,0,0.08)', marginBottom:20}}>
          <p style={{fontWeight:'bold', fontSize:14}}>Go live in 2 seconds, receive instant gifts</p>
          <button onClick={() => setMsg("You are LIVE! Invite fans")} style={{marginTop:14, width:'100%', height:52, borderRadius:16, background:'#FF5A1F', color:'white', fontWeight:900, border:'none'}}>Start Live Now</button>
        </div>
        <h3 style={{fontWeight:900, marginBottom:12}}>Rewards 70% - Balance: N{bal}</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <button onClick={() => gift('Fire',1000)} style={{background:'white', borderRadius:20, padding:16, border:'none', textAlign:'left'}}>
            <div style={{fontSize:28}}>🔥</div><div style={{fontWeight:'bold'}}>Fire</div><div style={{fontWeight:900}}>N1,000</div>
          </button>
          <button onClick={() => gift('Diamond',5000)} style={{background:'white', borderRadius:20, padding:16, border:'none', textAlign:'left'}}>
            <div style={{fontSize:28}}>💎</div><div style={{fontWeight:'bold'}}>Diamond</div><div style={{fontWeight:900}}>N5,000</div>
          </button>
          <button onClick={() => gift('Rocket',10000)} style={{background:'white', borderRadius:20, padding:16, border:'none', textAlign:'left'}}>
            <div style={{fontSize:28}}>🚀</div><div style={{fontWeight:'bold'}}>Rocket</div><div style={{fontWeight:900}}>N10,000</div>
          </button>
          <button onClick={() => gift('Lion',25000)} style={{background:'white', borderRadius:20, padding:16, border:'none', textAlign:'left'}}>
            <div style={{fontSize:28}}>🦁</div><div style={{fontWeight:'bold'}}>Lion</div><div style={{fontWeight:900}}>N25,000</div>
          </button>
        </div>
        {msg && <div style={{position:'fixed', top:20, left:'50%', transform:'translateX(-50%)', background:'black', color:'white', padding:'10px 20px', borderRadius:30, fontSize:13, fontWeight:'bold'}}>{msg}</div>}
      </div>
    </div>
  );
}
