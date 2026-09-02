"use client"
import { useState, useEffect } from 'react';

export default function Page() {
  const [bal, setBal] = useState(47250);
  const [balUSD, setBalUSD] = useState(29.84);
  const [level, setLevel] = useState(46);
  const [xp, setXp] = useState(4620);
  const [msg, setMsg] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const [worldMode, setWorldMode] = useState(false);
  const [convertNaira, setConvertNaira] = useState(100000);
  const [activeTab, setActiveTab] = useState("High-Value");

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(t);
  }, []);

  const gift = (name, price, xpAdd, usd) => {
    // FIXED: Ensure it works on mobile
    const keep = Math.round(price * 0.75);
    const keepUSD = (usd * 0.75).toFixed(2);
    setBal(b => b + keep);
    setBalUSD(b => +(b + parseFloat(keepUSD)).toFixed(2));
    setLevel(l => Math.min(100, l + (xpAdd > 10 ? 1 : 0)));
    setXp(x => x + xpAdd * 12);
    setMsg(name + " dropped! Kept N" + keep + " ($" + keepUSD + ") +" + xpAdd + " XP");
    setTimeout(() => setMsg(""), 3500);
    // Vibrate on mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
  };

  const usdRate = 1583;
  const gbpRate = 2043;

  return (
    <div style={{minHeight:'100vh', background:'#FFF9E9', fontFamily:'system-ui', color:'#0A0A0A'}}>
      
      {/* FIXED SPLASH - pointerEvents none when hidden */}
      <div style={{
        position:'fixed', inset:0, zIndex:9999, background:'#0A0A0A', 
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        opacity: showSplash ? 1 : 0,
        pointerEvents: showSplash ? 'auto' : 'none',
        transition:'opacity 0.5s ease'
      }}>
        <div style={{fontSize:52}}>🔥</div>
        <h1 style={{color:'white', fontSize:36, fontWeight:900, marginTop:10}}>CHAT & CHILL</h1>
        <div style={{display:'flex', gap:8, marginTop:10, fontSize:12, color:'#FFD700', fontWeight:800}}>
          <span>Lagos</span><span>•</span><span>London</span><span>•</span><span>Houston</span><span>•</span><span>Worldwide</span>
        </div>
        <div style={{marginTop:12, background:'#FF5A1F', color:'white', padding:'6px 14px', borderRadius:20, fontSize:11, fontWeight:900}}>BEYOND TIKTOK - LEVEL 46 → 100</div>
        <button onClick={()=>setShowSplash(false)} style={{marginTop:20, background:'white', color:'black', border:'none', padding:'8px 16px', borderRadius:20, fontSize:11, fontWeight:900, cursor:'pointer'}}>TAP TO ENTER →</button>
      </div>

      <header style={{position:'sticky', top:0, zIndex:50, background:'rgba(255,249,233,0.95)', borderBottom:'1px solid #E5E0D5', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', alignItems:'center', gap:8, cursor:'pointer'}} onClick={()=>setShowSplash(true)}>
          <div style={{width:32, height:32, background:'#0A0A0A', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', color:'#FF5A1F', fontWeight:900}}>C</div>
          <b style={{fontSize:13}}>CHAT & CHILL</b>
          <span style={{background:'#FF5A1F', color:'white', fontSize:8, padding:'2px 6px', borderRadius:10, fontWeight:900}}>WORLDWIDE</span>
        </div>
        <div style={{display:'flex', gap:6}}>
          <button onClick={()=>setWorldMode(!worldMode)} style={{fontSize:10, fontWeight:800, padding:'6px 10px', borderRadius:20, border:'1px solid #000', background: worldMode ? '#000' : 'white', color: worldMode ? 'white' : 'black', cursor:'pointer'}}>{worldMode ? "🌍 Worldwide" : "🇳🇬 Lagos"}</button>
          <span style={{fontSize:9, background:'#10B981', color:'white', padding:'4px 8px', borderRadius:20, fontWeight:800}}>2G • 0.3s</span>
        </div>
      </header>

      <div style={{maxWidth:1180, margin:'0 auto', padding:16, paddingBottom:100}}>

        <div style={{background:'#0A0A0A', color:'white', borderRadius:24, padding:20, marginBottom:16}}>
          <h1 style={{fontSize:28, fontWeight:900, lineHeight:0.95}}>Talk Cool,<br/>Stay Chill<br/><span style={{color:'#FF5A1F'}}>+ Earn 70-85%</span></h1>
          <p style={{fontSize:12, color:'#AAA', marginTop:10}}>TikTok 50% cut vs We 70-85% • 2G 15kb/s • Diaspora USD GBP EUR</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:14}}>
            <div style={{background:'rgba(255,255,255,0.08)', borderRadius:12, padding:10}}><div style={{fontSize:10, color:'#888'}}>BALANCE</div><div style={{fontWeight:900}}>N{bal.toLocaleString()} • ${balUSD}</div><div style={{fontSize:9, color:'#FFD700'}}>LVL {level} BEAT TIKTOK!</div></div>
            <div style={{background:'rgba(255,255,255,0.08)', borderRadius:12, padding:10}}><div style={{fontSize:10, color:'#888'}}>VS TIKTOK</div><div style={{fontWeight:900}}>0.3s vs 5s</div><div style={{fontSize:9, color:'#10B981'}}>15kb/s vs 500kb/s</div></div>
          </div>
          <div style={{marginTop:12}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:9, fontWeight:800, color:'#888'}}><span>TIKTOK MAX 46</span><span>CHILL MAX 100</span></div>
            <div style={{height:8, background:'#222', borderRadius:10, marginTop:4}}><div style={{width: level + '%', height:'100%', background:'linear-gradient(90deg,#FF5A1F,#FFD700)', borderRadius:10}}></div></div>
            <div style={{fontSize:10, color:'#AAA', marginTop:4}}>{xp}/10000 XP to Level 100 EZE</div>
          </div>
        </div>

        <div style={{background:'white', borderRadius:20, padding:14, marginBottom:12}}>
          <h3 style={{fontSize:12, fontWeight:900}}>🚀 1. BETTER MONETIZATION - 70-85% Payout</h3>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:10}}>
            <button onClick={()=>setMsg("Subscription Bronze N2k activated!")} style={{background:'#FFF0E9', borderRadius:12, padding:10, border:'1px dashed #FF5A1F', textAlign:'left', cursor:'pointer'}}><b style={{fontSize:11}}>70-85% Payout</b><div style={{fontSize:10, color:'#666'}}>vs TikTok 50% - TAP</div></button>
            <button onClick={()=>setMsg("Digital store - Sell course inside live!")} style={{background:'#FFF9E9', borderRadius:12, padding:10, border:'none', textAlign:'left', cursor:'pointer'}}><b style={{fontSize:11}}>Digital Goods</b><div style={{fontSize:10, color:'#666'}}>Sell inside live - TAP</div></button>
          </div>
        </div>

        <div style={{background:'#0A0A0A', color:'white', borderRadius:20, padding:14, marginBottom:12}}>
          <h4 style={{fontSize:11, fontWeight:900}}>🌍 WORLDWIDE FX - TAP TO CONVERT</h4>
          <div style={{background:'rgba(255,255,255,0.08)', borderRadius:12, padding:10, marginTop:10, display:'flex', gap:6, alignItems:'center'}}>
            <input type="number" value={convertNaira} onChange={e=>setConvertNaira(Number(e.target.value))} style={{width:90, padding:'6px 8px', borderRadius:8, border:'none', fontSize:11, fontWeight:800}} />
            <span style={{fontSize:10}}>NGN = ${(convertNaira/usdRate).toFixed(2)} / £{(convertNaira/gbpRate).toFixed(2)}</span>
          </div>
          <button onClick={()=>{ setConvertNaira(100000); setMsg("Converted N100k to $63.16 - Sent to Mama in 8s!"); }} style={{marginTop:8, background:'#FF5A1F', color:'white', border:'none', padding:'8px 14px', borderRadius:20, fontSize:10, fontWeight:900, cursor:'pointer', width:'100%'}}>SEND TO NAIJA 1.2% FEE - TAP</button>
        </div>

        <h3 style={{fontSize:13, fontWeight:900, marginBottom:8}}>🔴 LIVE ROOMS - TAP TO JOIN</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16}}>
          {[
            {n:'Lagos Night', v:'4.2k'},
            {n:'London Link-Up', v:'2.1k'},
            {n:'Houston Hustle', v:'1.8k'},
            {n:'Naija x Diaspora', v:'5.4k'},
          ].map(r=>(
            <button key={r.n} onClick={()=>setMsg("Joining "+r.n+" live...")} style={{background:'white', borderRadius:16, padding:12, border:'none', textAlign:'left', cursor:'pointer', borderLeft:'4px solid #FF5A1F'}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:8, background:'red', color:'white', padding:'2px 6px', borderRadius:10, fontWeight:900}}>LIVE</span><span style={{fontSize:9, fontWeight:800}}>{r.v}</span></div>
              <div style={{fontWeight:900, fontSize:11, marginTop:6}}>{r.n}</div>
              <div style={{fontSize:9, color:'#666'}}>TAP TO JOIN</div>
            </button>
          ))}
        </div>

        <h3 style={{fontSize:13, fontWeight:900, marginBottom:8}}>🎁 GIFTS - TAP TO SEND - Beyond TikTok</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <button onClick={()=>gift('Fire',1000,1,0.63)} style={{background:'white', borderRadius:16, padding:14, border:'none', textAlign:'left', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}><div style={{fontSize:24}}>🔥</div><div style={{fontWeight:900, fontSize:12}}>Fire</div><div style={{fontSize:11}}>N1,000 / $0.63</div><div style={{fontSize:8, background:'#FF5A1F', color:'white', display:'inline-block', padding:'3px 8px', borderRadius:10, marginTop:6, fontWeight:900}}>TAP - 70%</div></button>
          <button onClick={()=>gift('Diamond',5000,2,3.16)} style={{background:'white', borderRadius:16, padding:14, border:'none', textAlign:'left', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}><div style={{fontSize:24}}>💎</div><div style={{fontWeight:900, fontSize:12}}>Diamond</div><div style={{fontSize:11}}>N5,000 / $3.16</div><div style={{fontSize:8, background:'#FF5A1F', color:'white', display:'inline-block', padding:'3px 8px', borderRadius:10, marginTop:6, fontWeight:900}}>TAP - 70%</div></button>
          <button onClick={()=>gift('Rocket',10000,5,6.32)} style={{background:'white', borderRadius:16, padding:14, border:'none', textAlign:'left', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}><div style={{fontSize:24}}>🚀</div><div style={{fontWeight:900, fontSize:12}}>Rocket</div><div style={{fontSize:11}}>N10,000 / $6.32</div><div style={{fontSize:8, background:'#FF5A1F', color:'white', display:'inline-block', padding:'3px 8px', borderRadius:10, marginTop:6, fontWeight:900}}>TAP - 70%</div></button>
          <button onClick={()=>gift('Lion',25000,10,15.79)} style={{background:'white', borderRadius:16, padding:14, border:'none', textAlign:'left', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}><div style={{fontSize:24}}>🦁</div><div style={{fontWeight:900, fontSize:12}}>Lion</div><div style={{fontSize:11}}>N25,000 / $15.79</div><div style={{fontSize:8, background:'#FF5A1F', color:'white', display:'inline-block', padding:'3px 8px', borderRadius:10, marginTop:6, fontWeight:900}}>TAP - 70%</div></button>
          <button onClick={()=>gift('Eagle',50000,20,31.58)} style={{background:'#000', color:'white', borderRadius:16, padding:14, border:'none', textAlign:'left', cursor:'pointer'}}><div style={{fontSize:24}}>🦅</div><div style={{fontWeight:900, fontSize:12}}>Eagle</div><div style={{fontSize:11}}>N50,000 / $31.58</div><div style={{fontSize:8, background:'#FFD700', color:'black', display:'inline-block', padding:'3px 8px', borderRadius:10, marginTop:6, fontWeight:900}}>BEYOND TIKTOK 80%</div></button>
          <button onClick={()=>gift('Crown',100000,30,63.16)} style={{background:'#000', color:'white', borderRadius:16, padding:14, border:'none', textAlign:'left', cursor:'pointer'}}><div style={{fontSize:24}}>👑</div><div style={{fontWeight:900, fontSize:12}}>Crown</div><div style={{fontSize:11}}>N100,000 / $63.16</div><div style={{fontSize:8, background:'#FFD700', color:'black', display:'inline-block', padding:'3px 8px', borderRadius:10, marginTop:6, fontWeight:900}}>BEYOND TIKTOK 80%</div></button>
          <button onClick={()=>gift('Private Jet',250000,50,157.9)} style={{background:'#000', color:'white', borderRadius:16, padding:14, border:'none', textAlign:'left', cursor:'pointer', gridColumn:'span 2'}}><div style={{fontSize:24}}>✈️</div><div style={{fontWeight:900, fontSize:12}}>Private Jet - LEVEL 100 EZE</div><div style={{fontSize:11}}>N250,000 / $157.90 - BEATS TIKTOK</div><div style={{fontSize:8, background:'#FFD700', color:'black', display:'inline-block', padding:'3px 8px', borderRadius:10, marginTop:6, fontWeight:900}}>85% KEEP - TAP</div></button>
        </div>

        {msg && <div style={{position:'fixed', bottom:30, left:'50%', transform:'translateX(-50%)', background:'#000', color:'white', padding:'14px 22px', borderRadius:30, fontSize:12, fontWeight:800, zIndex:100, boxShadow:'0 8px 24px rgba(0,0,0,0.4)', textAlign:'center'}}>{msg}<br/><span style={{fontSize:10, color:'#FFD700'}}>Bal: N{bal.toLocaleString()} • ${balUSD}</span></div>}

      </div>
    </div>
  );
}
