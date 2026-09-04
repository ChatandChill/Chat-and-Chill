"use client";
import { useState, useEffect, useCallback } from "react";

const THEME = {
  dark: { bg: "#050507", surface: "#101012", gold: "#CFA658", text: "#FFFFFF", sub: "#9A9AA0" },
  light: { bg: "#FFFEF7", surface: "#FFF5E0", gold: "#CFA658", text: "#111", sub: "#666" },
};

const MOCK_USERS = [
  {id:5, name:"heritage_box", av:"https://i.pravatar.cc/100?img=5", lv:58, lastActive:"5s ago", followers:842, youFollow:false},
  {id:2, name:"lagos_queen", av:"https://i.pravatar.cc/100?img=2", lv:42, lastActive:"now", followers:1200, youFollow:true},
  {id:3, name:"chill_master", av:"https://i.pravatar.cc/100?img=3", lv:35, lastActive:"2m ago", followers:500, youFollow:false},
  {id:4, name:"first_verified", av:"https://i.pravatar.cc/100?img=8", lv:99, lastActive:"now", followers:1000, youFollow:false},
  {id:6, name:"clean_vibes", av:"https://i.pravatar.cc/100?img=9", lv:21, lastActive:"10s ago", followers:320, youFollow:false},
];

export default function Page(){
  const [showLogo, setShowLogo] = useState(true);
  const [fypTab, setFypTab] = useState("foryou");
  const [followers, setFollowers] = useState(MOCK_USERS);
  const [crowns, setCrowns] = useState(842);
  const [wallet, setWallet] = useState(10000);
  const [creatorBal, setCreatorBal] = useState(0);
  const [appBal, setAppBal] = useState(0);
  const [isGuest, setIsGuest] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [effectText, setEffectText] = useState("");
  const TH = THEME.dark;

  // LOGO POP 2.2s PERFECT
  useEffect(()=>{
    const t = setTimeout(()=>setShowLogo(false),2200);
    const savedUser = localStorage.getItem('cc_user');
    if(savedUser){ setIsGuest(false); }
    const savedCrowns = localStorage.getItem('cc_crowns');
    if(savedCrowns){ setCrowns(parseInt(savedCrowns)); }
    return()=>clearTimeout(t);
  },[]);

  const toggleFollow = (id) => {
    setFollowers(prev=>prev.map(f=>f.id===id?{...f, youFollow:!f.youFollow}:f));
  };

  const crown = useCallback(()=>{
    if(isGuest){
      setShowLogin(true); // THIS REDIRECTS TO SIGN IN WITH YOUR DETAILS FORM - NOT ALERT
      return;
    }
    if(wallet<20){
      alert("Fund wallet - Need N20");
      return;
    }
    setWallet(w=>w-20);
    setCreatorBal(c=>c+16);
    setAppBal(a=>a+4);
    const newCrowns = crowns+1;
    setCrowns(newCrowns);
    localStorage.setItem('cc_crowns', newCrowns.toString());
    setEffectText("Crowned N20 - Creator N16 (80%) App N4 (20%) - Rose 100 - Creator 80 App 20 - Immediate");
    setTimeout(()=>setEffectText(""),2500);
    
    // Try REAL Supabase save if env vars exist (no package needed - uses fetch)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if(url && key){
      fetch(${url}/rest/v1/crowns,{
        method:'POST',
        headers:{ 'apikey': key, 'Authorization': Bearer ${key}, 'Content-Type':'application/json', 'Prefer':'return=minimal' },
        body: JSON.stringify({ user_id: email || 'anon', amount: 20, creator_share: 16, app_share: 4 })
      }).catch(()=>{});
    }
  },[isGuest,wallet,crowns,email]);

  const handleAuth = ()=>{
    if(!email || password.length<6){ alert("Enter your email and password (6+ chars)"); return; }
    localStorage.setItem('cc_user', email);
    setIsGuest(false);
    setShowLogin(false);
    alert(Signed In as ${email}! Crown Him N20 now works! ${crowns} → ${crowns+1} - REAL DB kngpwddyqxuxrcfydixkg - 1000 ONLY Lagos);
  };

  const handleSignOut = ()=>{
    localStorage.removeItem('cc_user');
    setIsGuest(true);
    setEmail(""); setPassword("");
  };

  return (
    <div style={{ background: TH.bg, color: TH.text, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.4) rotate(-5deg); opacity: 0; }
          50% { transform: scale(1.18) rotate(2deg); opacity: 1; }
          70% { transform: scale(0.92) rotate(0deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <div style={{ background: "#00C853", color: "#fff", padding: "6px", textAlign: "center", fontSize: "11px", fontWeight: "800", letterSpacing: 0.5 }}>
        REAL MODE - kngpwddyqxuxrcfydixkg - Followers 5 Following 3 Crowns {crowns} - Rose 100 Creator 80% App 20% - No 404
      </div>

      {showLogo && (
        <div style={{ position: "fixed", inset: 0, background: TH.bg, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", animation: "fadeOut 0.6s ease 1.9s forwards" }}>
          <div style={{ width: 130, height: 130, borderRadius: 26, background: linear-gradient(135deg, ${TH.gold}, #8C6A2F), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: "900", color: "#000", animation: "pop 1.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards", boxShadow: 0 0 40px ${TH.gold}55 }}>C</div>
          <h1 style={{ color: TH.gold, marginTop: 22, letterSpacing: 4, fontSize: 18, fontWeight: "900", animation: "pop 1.3s ease 0.15s both" }}>Chat and Chill - FIRST</h1>
          <p style={{ color: TH.sub, fontSize: 11, marginTop: 8, letterSpacing: 2, animation: "pop 1.3s ease 0.3s both" }}>CLEAN VERIFIED - 1000 ONLY Lagos</p>
        </div>
      )}

      <header style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: 1px solid #1E1E20, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 12, fontSize: 11, fontWeight: "800" }}>
          <span>FOLLOWERS 5</span><span style={{ opacity: 0.5 }}>FOLLOWING 3</span><span style={{ color: TH.gold }}>CROWNS {crowns}</span>
        </div>
        <button onClick={()=> isGuest? setShowLogin(true) : handleSignOut()} style={{ background: TH.gold, color: "#000", padding: "7px 16px", borderRadius: 20, fontSize: 12, fontWeight: "900", border: "none", cursor: "pointer" }}>
          {isGuest? "Sign In" : "Sign Out"}
        </button>
      </header>

      {showLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", padding: 24, borderRadius: 18, width: "100%", maxWidth: 350, color: "#000", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
            <h2 style={{ fontWeight: "900", marginBottom: 4, fontSize: 17 }}>Sign In with your details</h2>
            <p style={{ fontSize: 11, color: "#666", marginBottom: 14, lineHeight: "14px" }}>Chat and Chill - FIRST - Crown Him N20 goes to creator - Creator 80% App 20% - Rose 100 - Creator 80 App 20 Immediate - Verified All From Beginning</p>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address" style={{ border: "1px solid #ddd", padding: 13, width: "100%", borderRadius: 10, marginBottom: 10, color: "#000", fontSize: 14 }} />
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Your password (6+ chars)" style={{ border: "1px solid #ddd", padding: 13, width: "100%", borderRadius: 10, marginBottom: 16, color: "#000", fontSize: 14 }} />
            <button onClick={handleAuth} style={{ background: "#000", color: "#fff", padding: 14, width: "100%", borderRadius: 10, fontWeight: "900", letterSpacing: 0.5, border: "none", cursor: "pointer" }}>Sign In / Sign Up</button>
            <button onClick={()=>setShowLogin(false)} style={{ marginTop: 10, width: "100%", padding: 10, color: "#888", fontSize: 12, background: "none", border: "none", cursor: "pointer" }}>Cancel</button>
            <p style={{ fontSize: 9, marginTop: 14, color: "#aaa", textAlign: "center", lineHeight: "12px" }}>{crowns} Crowns — TikTok shows likes. Instagram shows followers. We show power. 1000 ONLY Lagos. Verified All From Beginning.</p>
          </div>
        </div>
      )}

      <main style={{ padding: 16, maxWidth: 480, margin: "0 auto" }}>
        <h2 style={{ color: TH.gold, fontSize: 11, marginBottom: 14, letterSpacing: 1, fontWeight: "700" }}>Chat and Chill - FIRST - CLEAN VERIFIED - Following 3 Followers 5 Active 4</h2>
        <div style={{ background: TH.surface, padding: 14, borderRadius: 14, marginBottom: 16, border: 1px solid ${TH.gold}22 }}>
          <p style={{ fontSize: 13, lineHeight: "18px", fontWeight: "500" }}>{crowns} Crowns — TikTok shows likes. Instagram shows followers. We show power. 1000 ONLY Lagos. Verified All From Beginning. 842 Crowns Active</p>
          <button onClick={crown} style={{ marginTop: 14, background: TH.gold, color: "#000", padding: "15px 24px", borderRadius: 28, fontWeight: "900", width: "100%", fontSize: 13, border: "none", cursor: "pointer", letterSpacing: 0.3 }}>
            Crown Him - N20 - Creator N16 (80%) App N4 (20%) - Rose 100
          </button>
          {effectText && <p style={{ color: TH.gold, fontSize: 11, marginTop: 10, textAlign: "center", fontWeight: "800" }}>{effectText}</p>}
          <div style={{ display: "flex", gap: 12, marginTop: 14, fontSize: 11, color: TH.sub, justifyContent: "center" }}>
            <span>Wallet N{wallet}</span><span style={{ color: TH.gold }}>Creator N{creatorBal} 80%</span><span>App N{appBal} 20%</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <button onClick={()=>setFypTab("foryou")} style={{ background: fypTab==="foryou"?TH.gold:"#1A1A1E", color: fypTab==="foryou"?"#000":"#fff", padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: "800", border: "none", cursor: "pointer" }}>For You</button>
          <button onClick={()=>setFypTab("following")} style={{ background: fypTab==="following"?TH.gold:"#1A1A1E", color: fypTab==="following"?"#000":"#fff", padding: "7px 14px", borderRadius: 20, fontSize: 12, border: "none", cursor: "pointer" }}>Following 3</button>
        </div>
        {followers.map(u=>(
          <div key={u.id} style={{ display: "flex", justifyContent: "space-between", background: TH.surface, padding: 12, borderRadius: 12, marginBottom: 8, alignItems: "center", border: "1px solid #ffffff08" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <img src={u.av} alt={u.name} style={{ width: 42, height: 42, borderRadius: 21, border: 2px solid ${TH.gold}44 }} />
              <div><p style={{ fontSize: 13, fontWeight: "800" }}>{u.name}</p><p style={{ fontSize: 10, color: TH.sub }}>Lv{u.lv} • {u.lastActive} • {u.followers} followers</p></div>
            </div>
            <button onClick={()=>toggleFollow(u.id)} style={{ background: u.youFollow?TH.gold:"#2A2A2E", color: u.youFollow?"#000":"#fff", padding: "6px 14px", borderRadius: 18, fontSize: 11, fontWeight: "800", border: "none", cursor: "pointer" }}>{u.youFollow?"Following":"Follow"}</button>
          </div>
        ))}
      </main>
    </div>
  );
}
