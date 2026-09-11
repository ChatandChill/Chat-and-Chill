"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase client - uses your Vercel ENV
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const [writeUpIndex, setWriteUpIndex] = useState(-1);
  const [posts, setPosts] = useState([]);

  // Load Supabase posts if available
  useEffect(() => {
    if (supabase) {
      supabase.from("posts").select("*").limit(10).then(({ data }) => {
        if (data) setPosts(data);
      });
    }
  }, []);

  // Splash pop-up sequence
  useEffect(() => {
    if (!showSplash) return;
    const t = [
      setTimeout(() => setWriteUpIndex(0), 1800),
      setTimeout(() => setWriteUpIndex(1), 2100),
      setTimeout(() => setWriteUpIndex(2), 2400),
      setTimeout(() => setWriteUpIndex(3), 2700),
    ];
    const auto = setTimeout(() => setShowSplash(false), 5200);
    return () => { t.forEach(clearTimeout); clearTimeout(auto); };
  }, [showSplash]);

  const writeUps = [
    { text: "LOVE", icon: "❤️" },
    { text: "CONNECT", icon: "🤝" },
    { text: "CHILL VIBES", icon: "😎" },
    { text: "EARN WITH YOUR CREATIVITY", icon: "💰" },
  ];

  if (showSplash) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 500, background: "rgba(212,175,55,0.1)", filter: "blur(100px)", borderRadius: "50%" }} />
        
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 280, height: 260, background: "#0a0a0a", borderRadius: "40% 40% 40% 40% / 50% 50% 40% 40%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(212,175,55,0.2)", boxShadow: "0 0 80px rgba(212,175,55,0.3)" }}>
            <div style={{ position: "absolute", top: -8, right: -8, width: 12, height: 12, background: "#d4af37", borderRadius: "50%", boxShadow: "0 0 20px #d4af37" }} />
            <span style={{ fontSize: 84, fontWeight: 100, letterSpacing: 12, color: "#fff" }}>CC</span>
          </div>

          <div style={{ marginTop: 32, display: "flex", gap: 8 }}>
            <span style={{ width: 6, height: 6, background: "#fff", borderRadius: "50%" }} /> 
            <span style={{ width: 6, height: 6, background: "#fff", borderRadius: "50%" }} />
            <span style={{ width: 6, height: 6, background: "#fff", borderRadius: "50%" }} />
          </div>

          <h1 style={{ marginTop: 32, fontSize: 22, letterSpacing: 8, color: "#fff", fontWeight: 200 }}>CHAT & CHILL</h1>
          <p style={{ marginTop: 8, fontSize: 13, letterSpacing: 5, color: "#d4af37", fontWeight: 300 }}>LEVEL 10000</p>
          <p style={{ marginTop: 12, fontSize: 12, letterSpacing: 1, color: "rgba(255,255,255,0.6)", fontWeight: 200 }}>One Heart. One Africa. One Love.</p>

          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minHeight: 120 }}>
            {writeUps.map((w, i) => (
              <div key={i} style={{ 
                opacity: i <= writeUpIndex ? 1 : 0, 
                transform: i <= writeUpIndex ? "translateY(0) scale(1)" : "translateY(10px) scale(0.9)",
                transition: "all 0.5s ease-out",
                color: i === 3 ? "#d4af37" : "#fff",
                fontSize: 11, letterSpacing: 3, fontWeight: 300, display: "flex", gap: 6
              }}>
                <span>{w.icon}</span> {w.text}
              </div>
            ))}
          </div>

          <button onClick={() => setShowSplash(false)} style={{ marginTop: 24, padding: "10px 32px", border: "1px solid rgba(212,175,55,0.5)", color: "#d4af37", fontSize: 10, letterSpacing: 3, borderRadius: 999, background: "transparent" }}>
            ENTER APP • One Heart. One Africa. One Love.
          </button>
        </div>
      </div>
    );
  }

  // MAIN APP - Thin elegant
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <header style={{ position: "sticky", top: 0, background: "rgba(0,0,0,0.9)", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 200 }}>CC</div>
          <span style={{ fontSize: 11, letterSpacing: 3, fontWeight: 200 }}>CHAT & CHILL</span>
          <span style={{ fontSize: 8, color: "#d4af37", marginLeft: 8 }}>LEVEL 10000 • One Heart. One Africa. One Love.</span>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 10, letterSpacing: 1 }}>
          <span style={{ color: "#d4af37" }}>For You</span><span style={{ opacity: 0.5 }}>LIVE</span><span style={{ opacity: 0.5 }}>Inbox 🔒</span><span style={{ opacity: 0.5 }}>Battle</span><span style={{ opacity: 0.5 }}>Wallet</span>
        </div>
      </header>

      <main style={{ padding: 16, display: "grid", placeItems: "center", minHeight: "70vh" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 200, letterSpacing: 4 }}>THIN ELEGANT DEPLOYED ✓</h2>
          <p style={{ marginTop: 16, fontSize: 14, color: "rgba(255,255,255,0.6)", fontWeight: 200 }}>LOVE ❤️ CONNECT 🤝 CHILL VIBES 😎 EARN 💰</p>
          <p style={{ marginTop: 8, fontSize: 12, color: "rgba(212,175,55,0.6)" }}>Supabase {supabase ? "connected" : "add ENV in Vercel"} • LiveKit ready • Paystack ready</p>
          
          <div style={{ marginTop: 32, padding: 16, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, background: "rgba(255,255,255,0.05)", textAlign: "left", fontSize: 12 }}>
            <p>✓ Logo thin weight 100 (not bold)</p>
            <p>✓ Tagline: One Heart. One Africa. One Love.</p>
            <p>✓ Pop-up write-ups: LOVE, CONNECT, CHILL VIBES, EARN</p>
            <p>✓ Paste your full FYP / Live / Inbox code below this</p>
            <p>✓ ENV: Vercel → Settings → Env Variables → add Supabase/LiveKit/Paystack</p>
          </div>

          {posts.length > 0 && <div style={{ marginTop: 24 }}><p>Supabase posts: {posts.length}</p></div>}
        </div>
      </main>

      <footer style={{ position: "fixed", bottom: 0, width: "100%", padding: 12, textAlign: "center", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.3)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        One Heart. One Africa. One Love. • LEVEL 10000 • Chat & Chill • chat-and-chill-iota.vercel.app
      </footer>
    </div>
  );
}
