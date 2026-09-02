"use client"
import { useState } from 'react';

export default function Page() {
  const [bal, setBal] = useState(47250);
  const [level, setLevel] = useState(46);
  const [msg, setMsg] = useState("");

  const gift = (name, price, xp) => {
    const keep = Math.round(price * 0.7);
    setBal(function(b){ return b + keep; });
    setLevel(function(l){ return l + xp; });
    setMsg("Gift " + name + " dropped! You kept N" + keep + " + " + xp + " XP");
    setTimeout(function(){ setMsg(""); }, 2500);
  };

  return (
    <div style={{minHeight:'100vh', background:'#FFF9E9', display:'flex', justifyContent:'center', fontFamily:'system-ui'}}>
      <div style={{width:'100%', maxWidth:420, padding:16, paddingBottom:90}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:16}}>
          <b>CHAT & CHILL</b>
          <span style={{background:'black', color:'white', borderRadius:12, padding:'4px 10px', fontSize:11, fontWeight:'bold'}}>LEVEL {level} {level>46 ? "BEYOND TIKTOK!" : ""}</span>
        </div>

        <h1 style={{fontSize:30, fontWeight:900, lineHeight:1}}>Talk Cool, Stay Chill <span style={{color:'#FF5A1F'}}>+ Earn</span></h1>
        <p style={{fontSize:12, color:'#666', margin:'8px 0'}}>TikTok stops at 46. We go to 100!</p>

        <div style={{background:'white', borderRadius:16, padding:12, margin:'12px 0', boxShadow:'0 4px 12px rgba(0,0,0,0.06)'}}>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:11, fontWeight:'bold'}}><span>TIKTOK MAX 46</span><span>CHILL MAX 100</span></div>
          <div style={{height:10, background:'#E5E0D5', borderRadius:10, marginTop:6, overflow:'hidden'}}>
            <div style={{width: level + '%', height:'100%', background: level>46 ? '#FF5A1F' : '#000', borderRadius:10}}></div>
          </div>
          <p style={{fontSize:11, marginTop:6, color:'#888'}}>{level>=100 ? "EZE OF CHILL - You beat TikTok!" : level>=46 ? "You passed TikTok Level 46! Keep going to 100" : "Reach 46 to beat TikTok"}</p>
        </div>

        <h3 style={{fontWeight:900, marginBottom:10}}>Gifts 70% to you - Bal N{bal}</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          <button onClick={function(){ gift('Fire',1000,1); }} style={{background:'white', borderRadius:16, padding:14, border:'none', textAlign:'left'}}><div style={{fontSize:24}}>🔥</div><b>Fire</b><div>N1,000</div><div style={{fontSize:10, background:'#FF5A1F', color:'white', display:'inline-block', padding:'2px 6px', borderRadius:8, marginTop:4}}>70%</div></button>
          <button onClick={function(){ gift('Diamond',5000,2); }} style={{background:'white', borderRadius:16, padding:14, border:'none', textAlign:'left'}}><div style={{fontSize:24}}>💎</div><b>Diamond</b><div>N5,000</div><div style={{fontSize:10, background:'#FF5A1F', color:'white', display:'inline-block', padding:'2px 6px', borderRadius:8, marginTop:4}}>70%</div></button>
          <button onClick={function(){ gift('Rocket',10000,5); }} style={{background:'white', borderRadius:16, padding:14, border:'none', textAlign:'left'}}><div style={{fontSize:24}}>🚀</div><b>Rocket</b><div>N10,000</div><div style={{fontSize:10, background:'#FF5A1F', color:'white', display:'inline-block', padding:'2px 6px', borderRadius:8, marginTop:4}}>70%</div></button>
          <button onClick={function(){ gift('Lion',25000,10); }} style={{background:'white', borderRadius:16, padding:14, border:'none', textAlign:'left'}}><div style={{fontSize:24}}>🦁</div><b>Lion</b><div>N25,000</div><div style={{fontSize:10, background:'#FF5A1F', color:'white', display:'inline-block', padding:'2px 6px', borderRadius:8, marginTop:4}}>70%</div></button>
          <button onClick={function(){ gift('Eagle',50000,20); }} style={{background:'black', color:'white', borderRadius:16, padding:14, border:'none', textAlign:'left'}}><div style={{fontSize:24}}>🦅</div><b>Eagle</b><div>N50,000 BEYOND TIKTOK</div><div style={{fontSize:10, background:'#FFD700', color:'black', display:'inline-block', padding:'2px 6px', borderRadius:8, marginTop:4}}>80% at Lvl 71+</div></button>
          <button onClick={function(){ gift('Crown',100000,30); }} style={{background:'black', color:'white', borderRadius:16, padding:14, border:'none', textAlign:'left'}}><div style={{fontSize:24}}>👑</div><b>Crown</b><div>N100,000</div><div style={{fontSize:10, background:'#FFD700', color:'black', display:'inline-block', padding:'2px 6px', borderRadius:8, marginTop:4}}>80%</div></button>
          <button onClick={function(){ gift('Private Jet',250000,50); }} style={{background:'black', color:'white', borderRadius:16, padding:14, border:'none', textAlign:'left', gridColumn:'span 2'}}><div style={{fontSize:24}}>✈️</div><b>Private Jet - LEVEL 100 EZE</b><div>N250,000 - BEATS TIKTOK</div><div style={{fontSize:10, background:'#FFD700', color:'black', display:'inline-block', padding:'2px 6px', borderRadius:8, marginTop:4}}>85% KEEP</div></button>
        </div>

        {msg && <div style={{position:'fixed', top:20, left:'50%', transform:'translateX(-50%)', background:'black', color:'white', padding:'10px 18px', borderRadius:20, fontSize:12, fontWeight:'bold'}}>{msg}</div>}
      </div>
    </div>
  );
}
