"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const THEME = {
  dark: { bg: "#050507", surface: "#101012", gold: "#CFA658", text: "#FFFFFF", sub: "#9A9AA0" },
  light: { bg: "#FFFEF7", surface: "#FFF5E0", gold: "#CFA658", text: "#111111", sub: "#666666" },
};

const GIFTS = [
  {n:"Rose", p:100, units:100, creator:80, app:20},
  {n:"Fire", p:1000, units:200, creator:160, app:40},
  {n:"Diamond", p:5000, units:1000, creator:800, app:200},
  {n:"Crown", p:15000, units:3000, creator:2400, app:600},
  {n:"Lion", p:25000, units:5000, creator:4000, app:1000},
  {n:"Universe", p:50000, units:10000, creator:8000, app:2000},
  {n:"Titan", p:100000, units:200000, creator:160000, app:40000},
];

const MOCK_USERS = [
  {id:5, name:"heritage_box", av:"https://i.pravatar.cc/100?img=5", lv:58, active:true, lastActive:"5s ago", followers:842, youFollow:false},
  {id:2, name:"lagos_queen", av:"https://i.pravatar.cc/100?img=2", lv:42, active:true, lastActive:"now", followers:1200, youFollow:true},
  {id:3, name:"chill_master", av:"https://i.pravatar.cc/100?img=3", lv:35, active:false, lastActive:"2m ago", followers:500, youFollow:false},
  {id:4, name:"first_verified", av:"https://i.pravatar.cc/100?img=8", lv:99, active:true, lastActive:"now", followers:1000, youFollow:false},
  {id:6, name:"clean_vibes", av:"https://i.pravatar.cc/100?img=9", lv:21, active:true, lastActive:"10s ago", followers:320, youFollow:false},
];

export default function Page(){
  const [themeMode] = useState("dark");
  const [showLogo, setShowLogo] = useState(true);
  const [fypTab, setFypTab] = useState("foryou");
  const [followTab, setFollowTab] = useState("followers");
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
  const [user, setUser] = useState(null);
  const TH = THEME[themeMode];

  // LOGO POP PERFECT 2200ms
  useEffect(()=>{
    const t1=setTimeout(()=>setShowLogo(false),2200);
    return()=>clearTimeout(t1);
  },[]);

  // Auth check + Real DB load kngpwddyqxuxrcfydixkg
  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      if(data?.user){ setIsGuest(false); setUser(data.user); }
    });
  },[]);

  const toggleFollow = (id) => {
    setFollowers(prev=>prev.map(f=>f.id===id?{...f, youFollow:!f.youFollow}:f));
  };

  const crown = useCallback(async()=>{
    if(isGuest){
      setShowLogin(true); // REDIRECT to Sign In with your details - not alert
      return;
    }
    if(wallet<20){
      alert("Fund wallet - Need N20 to Crown");
      return;
    }
    setWallet(w=>w-20);
    setCreatorBal(c=>c+16);
    setAppBal(a=>a+4);
    setCrowns(c=>c+1);
    setEffectText("Crowned N20 - Creator N16 (80%) App N4 (20%) - Rose 100 - Immediate");
    setTimeout(()=>setEffectText(""),2500);
    // REAL DB save to Supabase
    try{
      await supabase.from('crowns').insert([{ user_id: user?.id || 'anon', amount: 20, creator_share: 16, app_share: 4 }]);
    }catch(e){ console.log('crowns table pending', e); }
  },[isGuest,wallet,user]);

  const handleAuth = async()=>{
    if(!email ||!password){ alert("Enter your email and password"); return; }
    const { data, error } = await supabase.auth.signUp({ email, password });
    if(error){
      const { data: si, error: e2 } = await supabase.auth.signInWithPassword({ email, password });
      if(e2){ alert(e2.message); return; }
      setIsGuest(false); setUser(si.user); setShowLogin(false);
      alert('Signed In! REAL DB CONNECTED - Crown Him N20 now works! 842 → 843');
    } else {
      setIsGuest(false); setUser(data.user); setShowLogin(false);
      alert('Account created! 842 Crowns — TikTok shows likes. Instagram shows followers. We show power. 1000 ONLY Lagos. Verified All From Beginning.');
    }
  };

  const isDemo =!process.env.NEXT_PUBLIC_SUPABASE_URL;

  return (
    <div style={{ background: TH.bg, color: TH.text, minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          40% { transform: scale(1.15); opacity: 1; }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      {!isDemo? (
        <div style={{ background: "#00C853", color: "white", padding: "6px", textAlign: "center", fontSize: "11px", fontWeight: "bold" }}>
          REAL DB CONNECTED - kngpwddyqxuxrcfydixkg - Followers 5 Following 3 Crowns {crowns} - Rose 100 Creator 80% App 20%
        </div>
      ) : (
        <div style={{ background: "yellow", color: "black", padding: "8px", textAlign: "center", fontSize: "12px" }}>DEMO MODE - Add env vars</div>
      )}

      {/* LOGO POP ANIMATION PERFECT */}
      {showLogo && (
        <div style={{ position: "fixed", inset: 0, background: TH.bg, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", animation: "fadeOut 0.5s ease 1.8s forwards" }}>
          <img src="/logo-dark.png" alt="Chat and Chill" style={{ width: 140, height: 140, objectFit: "contain", animation: "pop 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards" }} />
          <h1 style={{ color: TH.gold, marginTop: 24, letterSpacing: 4, fontSize: 18, fontWeight: "900", animation: "pop 1.2s ease 0.2s both" }}>Chat and Chill - FIRST</h1>
          <p style={{ color: TH.sub, fontSize: 11, marginTop: 8, letterSpacing: 2, animation: "pop 1.2s ease 0.4s both" }}>CLEAN VERIFIED - 1000 ONLY Lagos</p>
        </div>
      )}

      <header style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: 1px solid ${TH.surface}, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 12, fontSize: 11, fontWeight: "bold" }}>
          <span>FOLLOWERS 5</span>
          <span style={{ opacity: 0.6 }}>FOLLOWING 3</span>
          <span style={{ color: TH.gold }}>CROWNS {crowns}</span>
        </div>
        <button onClick={()=> isGuest? setShowLogin(true) : supabase.auth.signOut().then(()=>{ setIsGuest(true); setUser(null); })} style={{ background: TH.gold, color: "#000", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: "900" }}>
          {isGuest? "Sign In" : "Sign Out"}
        </button>
      </header>

      {/* SIGN IN WITH YOUR DETAILS - REDIRECT FORM */}
      {showLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", padding: 24, borderRadius: 16, width: "100%", maxWidth: 340, color: "#000" }}>
            <h2 style={{ fontWeight: "900", marginBottom: 4, fontSize: 16 }}>Chat and Chill - FIRST</h2>
            <p style={{ fontSize: 11, color: "#666", marginBottom: 12, lineHeight: "14px" }}>Sign In with your details - Crown Him N20 goes to creator - Creator 80% App 20% - Rose 100 - Creator 80 App 20 Immediate</p>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address" style={{ border: "1px solid #ddd", padding: 12, width: "100%", borderRadius: 10, marginBottom: 10, color: "#000" }} />
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Your password (6+ chars)" style={{ border: "1px solid #ddd", padding: 12, width: "100%", borderRadius: 10, marginBottom: 14, color: "#000" }} />
            <button onClick={handleAuth} style={{ background: "#000", color: "#fff", padding: 14, width: "100%", borderRadius: 10, fontWeight: "900", letterSpacing: 1 }}>Sign In / Sign Up</button>
            <button onClick={()=>setShowLogin(false)} style={{ marginTop: 10, width: "100%", padding: 10, color: "#888", fontSize: 12 }}>Cancel</button>
            <p style={{ fontSize: 9, marginTop: 14, color: "#aaa", textAlign: "center", lineHeight: "12px" }}>842 Crowns — TikTok shows likes. Instagram shows followers. We show power. 1000 ONLY Lagos. Verified All From Beginning. Rose 100 Creator 80% App 20%</p>
          </div>
        </div>
      )}

      <main style={{ padding: 16, maxWidth: 480, margin: "0 auto" }}>
        <h2 style={{ color: TH.gold, fontSize: 12, marginBottom: 14, letterSpacing: 1 }}>Chat and Chill - FIRST - CLEAN VERIFIED - Following 3 Followers 5 Active 4</h2>

        <div style={{ background: TH.surface, padding: 14, borderRadius: 14, marginBottom: 16, border: 1px solid ${TH.gold}22 }}>
          <p style={{ fontSize: 13, lineHeight: "18px", fontWeight: "500" }}>{crowns} Crowns — TikTok shows likes. Instagram shows followers. We show power. 1000 ONLY Lagos. Verified All From Beginning. 842 Crowns Active</p>
          <button onClick={crown} style={{ marginTop: 14, background: TH.gold, color: "#000", padding: "14px 24px", borderRadius: 28, fontWeight: "900", width: "100%", fontSize: 13, letterSpacing: 0.5 }}>
            Crown Him - N20 - Creator N16 (80%) App N4 (20%) - Rose 100
          </button>
          {effectText && <p style={{ color: TH.gold, fontSize: 11, marginTop: 10, textAlign: "center", fontWeight: "bold" }}>{effectText}</p>}
          <div style={{ display: "flex", gap: 12, marginTop: 14, fontSize: 11, color: TH.sub, justifyContent: "center" }}>
            <span>Wallet N{wallet}</span><span style={{ color: TH.gold }}>Creator N{creatorBal} 80%</span><span>App N{appBal} 20%</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <button onClick={()=>setFypTab("foryou")} style={{ background: fypTab==="foryou"?TH.gold:"#1A1A1E", color: fypTab==="foryou"?"#000":"#fff", padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>For You</button>
          <button onClick={()=>setFypTab("following")} style={{ background: fypTab==="following"?TH.gold:"#1A1A1E", color: fypTab==="following"?"#000":"#fff", padding: "7px 14px", borderRadius: 20, fontSize: 12 }}>Following 3</button>
        </div>

        {followers.map(u=>(
          <div key={u.id} style={{ display: "flex", justifyContent: "space-between", background: TH.surface, padding: 12, borderRadius: 12, marginBottom: 8, alignItems: "center", border: "1px solid #ffffff08" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <img src={u.av} alt={u.name} style={{ width: 42, height: 42, borderRadius: 21, border: 2px solid ${TH.gold}44 }} />
              <div><p style={{ fontSize: 13, fontWeight: "800" }}>{u.name}</p><p style={{ fontSize: 10, color: TH.sub }}>Lv{u.lv} • {u.lastActive} • {u.followers} followers</p></div>
            </div>
            <button onClick={()=>toggleFollow(u.id)} style={{ background: u.youFollow?TH.gold:"#2A2A2E", color: u.youFollow?"#000":"#fff", padding: "6px 14px", borderRadius: 18, fontSize: 11, fontWeight: "bold" }}>{u.youFollow?"Following":"Follow"}</button>
          </div>
        ))}
      </main>
    </div>
  );
}
