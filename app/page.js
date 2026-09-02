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
    const keep = Math.round(price * 0.75);
    const keepUSD = (usd * 0.75).toFixed(2);
    setBal(b => b + keep);
    setBalUSD(b => +(b + parseFloat(keepUSD)).toFixed(2));
    setLevel(l => Math.min(100, l + (xpAdd > 10 ? 1 : 0)));
    setXp(x => x + xpAdd * 12);
    setMsg(name + " dropped! You kept N" + keep + " ($" + keepUSD + ") +" + xpAdd + " XP");
    setTimeout(() => setMsg(""), 3000);
  };

  const usdRate = 1583;
  const gbpRate = 2043;
  const eurRate = 1722;

  return (
    <div style={{minHeight:'100vh', background:'#FFF9E9', fontFamily:'system-ui', color:'#0A0A0A'}}>
      {showSplash && (
        <div style={{position:'fixed', inset:0, zIndex:9999, background:'#0A0A0A', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <div style={{fontSize:52}}>🔥</div>
          <h1 style={{color:'white', fontSize:36, fontWeight:900, marginTop:10}}>CHAT & CHILL</h1>
          <div style={{display:'flex', gap:8, marginTop:10, fontSize:12, color:'#FFD700', fontWeight:800}}>
            <span>Lagos</span><span>•</span><span>London</span><span>•</span><span>Houston</span><span>•</span><span>Worldwide</span>
          </div>
          <div style={{marginTop:12, background:'#FF5A1F', color:'white', padding:'6px 14px', borderRadius:20, fontSize:11, fontWeight:900}}>BEYOND TIKTOK - LEVEL 46 → 100</div>
          <p style={{color:'#888', fontSize:11, marginTop:12}}>From Surulere to Peckham to Houston - One Chill</p>
        </div>
      )}

      <header style={{position:'sticky', top:0, zIndex:50, backdropFilter:'blur(20px)', background:'rgba(255,249,233,0.9)', borderBottom:'1px solid #E5E0D5', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', alignItems:'center', gap:8}} onClick={()=>setShowSplash(true)}>
          <div style={{width:32, height:32, background:'#0A0A0A', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', color:'#FF5A1F', fontWeight:900}}>C</div>
          <b style={{fontSize:13}}>CHAT & CHILL</b>
          <span style={{background:'#FF5A1F', color:'white', fontSize:8, padding:'2px 6px', borderRadius:10, fontWeight:900}}>WORLDWIDE</span>
        </div>
        <div style={{display:'flex', gap:6}}>
          <button onClick={()=>setWorldMode(!worldMode)} style={{fontSize:10, fontWeight:800, padding:'6px 10px', borderRadius:20, border:'1px solid #000', background: worldMode ? '#000' : 'white', color: worldMode ? 'white' : 'black'}}>{worldMode ? "🌍 Worldwide" : "🇳🇬 Lagos"}</button>
          <span style={{fontSize:9, background:'#10B981', color:'white', padding:'4px 8px', borderRadius:20, fontWeight:800}}>2G • 0.3s</span>
        </div>
      </header>

      <div style={{maxWidth:1180, margin:'0 auto', padding:16, paddingBottom:80}}>

        <div style={{background:'#0A0A0A', color:'white', borderRadius:24, padding:20, position:'relative', overflow:'hidden', marginBottom:16}}>
          <h1 style={{fontSize:28, fontWeight:900, lineHeight:0.95}}>Talk Cool,<br/>Stay Chill<br/><span style={{color:'#FF5A1F'}}>+ Earn 70-85%</span></h1>
          <p style={{fontSize:12, color:'#AAA', marginTop:10}}>TikTok 50% cut vs We 70-85% • 2G 15kb/s • Diaspora USD GBP EUR • Built for Naira</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:14}}>
            <div style={{background:'rgba(255,255,255,0.08)', borderRadius:12, padding:10}}><div style={{fontSize:10, color:'#888'}}>BALANCE</div><div style={{fontWeight:900}}>N{bal.toLocaleString()} • ${balUSD}</div><div style={{fontSize:9, color:'#FFD700'}}>LVL {level} BEAT TIKTOK!</div></div>
            <div style={{background:'rgba(255,255,255,0.08)', borderRadius:12, padding:10}}><div style={{fontSize:10, color:'#888'}}>VS TIKTOK</div><div style={{fontWeight:900}}>0.3s vs 5s</div><div style={{fontSize:9, color:'#10B981'}}>15kb/s vs 500kb/s</div></div>
          </div>
          <div style={{marginTop:12}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:9, fontWeight:800, color:'#888'}}><span>TIKTOK MAX 46</span><span>CHILL MAX 100</span></div>
            <div style={{height:8, background:'#222', borderRadius:10, marginTop:4}}><div style={{width: level + '%', height:'100%', background:'linear-gradient(90deg,#FF5A1F,#FFD700)', borderRadius:10}}></div></div>
            <div style={{fontSize:10, color:'#AAA', marginTop:4}}>{xp}/10000 XP to Level 100 EZE • Beyond TikTok!</div>
          </div>
        </div>

        <div style={{background:'white', borderRadius:20, padding:14, marginBottom:12}}>
          <h3 style={{fontSize:12, fontWeight:900}}>🚀 1. BETTER MONETIZATION</h3>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, fontSize:11, marginTop:8}}>
            <div style={{background:'#FFF0E9', borderRadius:12, padding:10, border:'1px dashed #FF5A1F'}}><b>70-85% Payout</b><div style={{fontSize:10, color:'#666'}}>vs TikTok 50%</div></div>
            <div style={{background:'#FFF9E9', borderRadius:12, padding:10}}><b>Subscriptions</b><div style={{fontSize:10, color:'#666'}}>N2k - N50k/mo</div></div>
            <div style={{background:'#FFF9E9', borderRadius:12, padding:10}}><b>Digital Goods</b><div style={{fontSize:10, color:'#666'}}>Sell inside live</div></div>
            <div style={{background:'#000', color:'white', borderRadius:12, padding:10}}><b>Withdraw</b><div style={{fontSize:10, color:'#AAA'}}>Opay GTB Wise PayPal</div></div>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12}}>
          <div style={{background:'white', borderRadius:16, padding:12}}>
            <h4 style={{fontSize:11, fontWeight:900}}>📚 2. HIGH-VALUE</h4>
            <div style={{display:'flex', gap:4, marginTop:8, flexWrap:'wrap'}}>
              {['High-Value','Educational','Business','Mature 25+'].map(tab=>(
                <button key={tab} onClick={()=>setActiveTab(tab)} style={{fontSize:9, padding:'4px 8px', borderRadius:20, border:'none', background: activeTab===tab?'#000':'#F2EEE3', color: activeTab===tab?'white':'black', fontWeight:800}}>{tab}</button>
              ))}
            </div>
            <div style={{marginTop:8, fontSize:10}}>
              <div>• Japa legally <span style={{color:'#FF5A1F', fontWeight:800}}>95/100</span></div>
              <div>• $10k/mo remote <span style={{color:'#FF5A1F', fontWeight:800}}>92/100</span></div>
              <div style={{color:'#888'}}>No brain-rot dances</div>
            </div>
          </div>
          <div style={{background:'white', borderRadius:16, padding:12}}>
            <h4 style={{fontSize:11, fontWeight:900}}>⚡ 4. STREAMING</h4>
            <div style={{fontSize:10, marginTop:8, lineHeight:1.6}}>
              <div>• <b>0.3s</b> vs TikTok 5s</div>
              <div>• Games: Trivia Poll Wheel</div>
              <div>• Multi-cam switch</div>
              <div>• 2G 15kb/s</div>
            </div>
          </div>
        </div>

        <div style={{background:'#0A0A0A', color:'white', borderRadius:20, padding:14, marginBottom:12}}>
          <h4 style={{fontSize:11, fontWeight:900}}>🔍 3. SOCIAL GRAPH SEARCH</h4>
          <div style={{background:'rgba(255,255,255,0.08)', borderRadius:12, padding:'10px 12px', marginTop:8, display:'flex', gap:8}}>
            <span>🔎</span><input placeholder="Ask anything - precise topics, not just new..." style={{flex:1, background:'transparent', border:'none', color:'white', fontSize:11, outline:'none'}} />
          </div>
          <div style={{display:'flex', gap:6, marginTop:8, flexWrap:'wrap'}}>
            {['Business Ideas','Japa Guide','Investment'].map(f=>(
              <span key={f} style={{fontSize:9, padding:'4px 8px', borderRadius:20, background:'rgba(255,255,255,0.12)'}}>📁 {f}</span>
            ))}
          </div>
          <div style={{fontSize:9, color:'#888', marginTop:8}}>AI tags topics • Old videos stay earning • TikTok forgets after 7 days</div>
        </div>

        <div style={{background:'white', borderRadius:20, padding:14, border:'2px solid #000', marginBottom:12}}>
          <h4 style={{fontSize:12, fontWeight:900}}>🌍 WORLDWIDE DIASPORA + FX</h4>
          <div style={{display:'flex', gap:6, marginTop:8, flexWrap:'wrap', fontSize:9, fontWeight:800}}>
            <span style={{background:'#FFF0E9', padding:'4px 8px', borderRadius:20}}>🇬🇧 London 2.1k</span>
            <span style={{background:'#E9F0FF', padding:'4px 8px', borderRadius:20}}>🇺🇸 Houston 1.8k</span>
            <span style={{background:'#FFE9E9', padding:'4px 8px', borderRadius:20}}>🇨🇦 Toronto 1.2k</span>
            <span style={{background:'#000', color:'white', padding:'4px 8px', borderRadius:20}}>1.7M+ Abroad</span>
          </div>
          <div style={{background:'#000', color:'white', borderRadius:12, padding:10, marginTop:10}}>
            <div style={{fontSize:9, color:'#888', display:'flex', justifyContent:'space-between'}}><span>LIVE FX</span><span>vs WU 8%</span></div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginTop:6, fontSize:10}}>
              <div>1 USD = ₦1583</div><div>1 GBP = ₦2043</div>
              <div>1 EUR = ₦1722</div><div>1 CAD = ₦1150</div>
            </div>
            <div style={{display:'flex', gap:6, marginTop:8, alignItems:'center'}}>
              <input type="number" value={convertNaira} onChange={e=>setConvertNaira(e.target.value)} style={{width:90, padding:'6px 8px', borderRadius:8, border:'none', fontSize:11, fontWeight:800}} />
              <span style={{fontSize:10}}>NGN = ${(convertNaira/usdRate).toFixed(2)} / £{(convertNaira/gbpRate).toFixed(2)}</span>
            </div>
            <div style={{marginTop:8, background:'#111', borderRadius:8, padding:8, fontSize:10}}>
              <b>Remittance:</b> London Crown N100k ($63) → Ibadan N98,800 in 8s (1.2% fee) vs WU N92k 3 days
            </div>
          </div>
        </div>

        <h3 style={{fontSize:13, fontWeight:900, marginBottom:8}}>🔴 LIVE ROOMS - Worldwide</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12}}>
          {[
            {n:'Lagos Night', v:'4.2k', h:'@EzeLagos', g:'₦2.1M', c:'#FF5A1F'},
            {n:'London Link-Up', v:'2.1k', h:'@NaijaUK', g:'£1.2k', c:'#00247D'},
            {n:'Houston Hustle', v:'1.8k', h:'@NaijaHou', g:'$890', c:'#BF0A30'},
            {n:'Naija x Diaspora', v:'5.4k', h:'@Global', g:'₦5M+', c:'#000'},
            {n:'Japa Lounge', v:'3.1k', h:'@Japa', g:'₦1.8M', c:'#10B981'},
            {n:'Money Talk FX', v:'2.7k', h:'@FxOga', g:'$1.5k', c:'#FFD700'},
          ].map(r=>(
            <div key={r.n} style={{background:'white', borderRadius:16, padding:10, borderLeft:'4px solid '+r.c}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:8, background:'red', color:'white', padding:'2px 6px', borderRadius:10, fontWeight:900}}>LIVE</span><span style={{fontSize:9, fontWeight:800}}>{r.v}</span></div>
              <div style={{fontWeight:900, fontSize:11, marginTop:6}}>{r.n}</div>
              <div style={{fontSize:9, color:'#666'}}>{r.h} • {r.g}</div>
            </div>
          ))}
        </div>

        <h3 style={{fontSize:13, fontWeight:900, marginBottom:8}}>🎁 GIFTS - Beyond TikTok 46 • 70-85%</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          {[
            {e:'🔥', n:'Fire', p:1000, usd:0.63, xp:1},
            {e:'💎', n:'Diamond', p:5000, usd:3.16, xp:2},
            {e:'🚀', n:'Rocket', p:10000, usd:6.32, xp:5},
            {e:'🦁', n:'Lion', p:25000, usd:15.79, xp:10},
            {e:'🦅', n:'Eagle', p:50000, usd:31.58, xp:20},
            {e:'👑', n:'Crown', p:100000, usd:63.16, xp:30},
            {e:'✈️', n:'Private Jet', p:250000, usd:157.9, xp:50},
            {e:'🌌', n:'Universe', p:500000, usd:315.8, xp:100},
          ].map(g=>(
            <button key={g.n} onClick={()=>gift(g.n,g.p,g.xp,g.usd)} style={{background: g.p>=50000?'#000':'white', color: g.p>=50000?'white':'black', borderRadius:16, padding:12, border:'none', textAlign:'left'}}>
              <div style={{fontSize:20}}>{g.e}</div>
              <div style={{fontWeight:900, fontSize:12, marginTop:4}}>{g.n}</div>
              <div style={{fontSize:11, fontWeight:800}}>₦{g.p.toLocaleString()} / ${g.usd}</div>
              <div style={{fontSize:8, marginTop:4, background: g.p>=50000?'#FFD700':'#FF5A1F', color: g.p>=50000?'black':'white', display:'inline-block', padding:'2px 6px', borderRadius:8, fontWeight:900}}>{g.p>=50000?'BEYOND TIKTOK':"70%"} +{g.xp} XP</div>
            </button>
          ))}
        </div>

        {msg && <div style={{position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)', background:'#000', color:'white', padding:'12px 20px', borderRadius:30, fontSize:11, fontWeight:800, zIndex:99}}>{msg}</div>}

        <div style={{background:'white', borderRadius:16, padding:12, textAlign:'center', fontSize:10, color:'#888', marginTop:12}}>
          <b style={{color:'#000'}}>Built for Nigeria, Loved Worldwide</b><br/>Lighter Faster Pays More Than TikTok • 1.7M Diaspora • 2G Ready
        </div>
      </div>
    </div>
  );
}
