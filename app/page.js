"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const [writeUpIndex, setWriteUpIndex] = useState(-1);

  useEffect(() => {
    if (!showSplash) return;
    const t = [
      setTimeout(() => setWriteUpIndex(0), 1800),
      setTimeout(() => setWriteUpIndex(1), 2100),
      setTimeout(() => setWriteUpIndex(2), 2400),
      setTimeout(() => setWriteUpIndex(3), 2700),
    ];
    const auto = setTimeout(() => setShowSplash(false), 5600);
    return () => { t.forEach(clearTimeout); clearTimeout(auto); };
  }, [showSplash]);

  const writeUps = [
    { text: "LOVE", icon: "❤️", color: "#ffb6c1" },
    { text: "CONNECT", icon: "🤝", color: "#fff" },
    { text: "CHILL VIBES", icon: "😎", color: "#fde68a" },
    { text: "EARN WITH YOUR CREATIVITY", icon: "💰", color: "#d4af37" },
  ];

  if (showSplash) {
    return (
      <div style={{ height: "100dvh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#000", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 800, height: 800, background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 65%)", filter: "blur(24px)" }} />
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 640, padding: "0 20px" }}>
          {/* BIGGER LOGO PERFECT FIT - THIN NOT BOLD */}
          <div style={{
            width: "clamp(340px, 75vw, 560px)",
            height: "clamp(320px, 70vw, 520px)",
            background: "#0a0a0a",
            borderRadius: "45% 45% 35% 35% / 55% 55% 40% 40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(212,175,55,0.3)",
            boxShadow: "0 0 110px rgba(212,175,55,0.55), 0 0 180px rgba(212,175,55,0.18)",
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 16, right: 28, width: 20, height: 20, background: "#d4af37", borderRadius: "50%", boxShadow: "0 0 30px #d4af37" }} />
            <span style={{ fontSize: "clamp(120px, 26vw, 190px)", fontWeight: 100, letterSpacing: 20, color: "#fff", lineHeight: 1 }}>CC</span>
            <span style={{ position: "absolute", bottom: 32, fontSize: "clamp(40px, 9vw, 58px)" }}>🌍</span>
          </div>

          <h1 style={{ marginTop: 30, fontSize: "clamp(22px, 5.5vw, 28px)", letterSpacing: 10, color: "#fff", fontWeight: 200 }}>CHAT & CHILL</h1>
          <p style={{ marginTop: 10, fontSize: 15, letterSpacing: 6, color: "#d4af37", fontWeight: 300 }}>LEVEL 10000</p>
          <p style={{ marginTop: 12, fontSize: 13, letterSpacing: 1, color: "rgba(255,255,255,0.7)", fontWeight: 200 }}>One Heart. One Africa. One Love.</p>

          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 11, minHeight: 150 }}>
            {writeUps.map((w, i) => (
              <div key={i} style={{
                opacity: i <= writeUpIndex ? 1 : 0,
                transform: i <= writeUpIndex ? "translateY(0) scale(1)" : "translateY(14px) scale(0.8)",
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                color: w.color,
                fontSize: 13,
                letterSpacing: 3.5,
                fontWeight: 300,
                display: "flex",
                gap: 8
              }}>
                <span>{w.icon}</span> {w.text}
              </div>
            ))}
          </div>

          <button onClick={() => setShowSplash(false)} style={{ marginTop: 18, padding: "13px 40px", border: "1px solid rgba(212,175,55,0.7)", color: "#d4af37", fontSize: 11, letterSpacing: 3.5, borderRadius: 999, background: "transparent" }}>
            ENTER APP • One Heart. One Africa. One Love.
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", background: "#000", color: "#fff" }}>
      <header style={{ position: "sticky", top: 0, background: "rgba(0,0,0,0.94)", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "12px 16px", display: "flex", justifyContent: "space-between", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "rgba(255,255,255,0.08)", borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 100, border: "1px solid rgba(212,175,55,0.3)" }}>CC</div>
          <span style={{ fontSize: 12, letterSpacing: 3, fontWeight: 200 }}>CHAT & CHILL</span>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 11 }}><span style={{ color: "#d4af37" }}>For You</span><span style={{ opacity: 0.5 }}>LIVE</span><span style={{ opacity: 0.5 }}>Inbox 🔒</span></div>
      </header>
      <main style={{ padding: 16, display: "grid", placeItems: "center", minHeight: "70vh" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 30, fontWeight: 200, letterSpacing: 5 }}>BIGGER LOGO PERFECT FIT ✓</h2>
          <p style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}>Logo now 340px → 560px — thin weight 100 — BIG but elegant</p>
        </div>
      </main>
    </div>
  );
}
