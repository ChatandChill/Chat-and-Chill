"use client";
import { useState } from "react";

const LANGS = {
  pidgin: { label: "PIDGIN" },
  hausa: { label: "HAUSA" },
  yoruba: { label: "YORUBA" },
  igbo: { label: "IGBO" },
  swahili: { label: "SWAHILI" },
  english: { label: "ENGLISH" },
};

const T = {
  welcomeTitle: { pidgin: "Welcome to Chat & Chill", hausa: "Barka da zuwa Chat & Chill", yoruba: "Kaabo si Chat & Chill", igbo: "Nnoo na Chat & Chill", swahili: "Karibu Chat & Chill", english: "Welcome to Chat & Chill" },
  welcomeSub: { pidgin: "Talk Cool, Stay Chill + Earn", hausa: "Magana Mai Sanyi + Samu Kudi", yoruba: "Soro Tutu + Gba Owo", igbo: "Kparita uka di juu + Nweta ego", swahili: "Ongea Poa + Pata Pesa", english: "Talk Cool, Stay Chill + Earn" },
  oneFamily: { pidgin: "We Be One Family", hausa: "Mu Iyali Daya Ne", yoruba: "A Je Idile Kan", igbo: "Anyi Bu Otu Ezinulo", swahili: "Sisi ni Familia Moja", english: "We Are One Family" },
};

export default function Page() {
  const [lang, setLang] = useState("pidgin");
  const [showWelcome, setShowWelcome] = useState(true);
  const [tab, setTab] = useState("foryou");
  const [balance, setBalance] = useState(306950);
  const [giftOpen, setGiftOpen] = useState(null);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const t = (k) => (T[k] && T[k][lang]) || k;

  const gifts = [
    { name: "Fire", price: 1000, cut: "70%" },
    { name: "Diamond", price: 5000, cut: "70%" },
    { name: "Rocket", price: 10000, cut: "70%" },
    { name: "Lion", price: 25000, cut: "70%" },
    { name: "Eagle", price: 50000, cut: "80% Lvl 71+", label: "BEYOND TIKTOK" },
    { name: "Crown", price: 100000, cut: "80%" },
    { name: "Private Jet", price: 500000, cut: "90% Lvl 100 EZE", label: "LEVEL 100 EZE" },
  ];

  const feedBase = [
    { id: 1, user: "@Sade_Lagos", titles: { pidgin: "Lagos Night Vibes - How I make N1M for live", hausa: "Daren Legas - Yadda na samu N1M a live", yoruba: "Alekole Eko - Bawo ni mo se ri N1M", igbo: "Abali Lagos - Otu m si mee N1M", swahili: "Lagos Usiku - Jinsi nilivyopata N1M", english: "Lagos Night Vibes - How I made N1M from live" }, score: 92, views: "12.4k", level: 92, tag: "Business 95/100", bg: "#ff6a00", saves: 3400, friends: 12, is2G: false },
    { id: 2, user: "@JapaKing", titles: { pidgin: "Japa UK Secrets Wey Dem Dey Hide - Part 2", hausa: "Sirrin Japa UK da suke Boye", yoruba: "Asiri Japa UK ti won n toju", igbo: "Ihe nzuzo Japa UK ha na-ezo", swahili: "Siri za Japa UK wanazoficha", english: "Japa UK Secrets They Hide - Part 2" }, score: 98, views: "28.1k", level: 100, tag: "Japa 98/100", bg: "#6a5cff", saves: 5400, friends: 22, is2G: false },
    { id: 3, user: "@Ada_Business", titles: { pidgin: "How I Build Store with N50k", hausa: "Yadda na Gina Shago da N50k", yoruba: "Bawo ni mo se Ko Ile Itaja pelu N50k", igbo: "Otu m si wuru ulo ahia na N50k", swahili: "Jinsi nilivyojenga duka na N50k", english: "How I Built Store with N50k" }, score: 97, views: "15.2k", level: 88, tag: "Business 97/100", bg: "#00a67d", saves: 2100, friends: 8, is2G: true },
    { id: 4, user: "@VillageChill", titles: { pidgin: "2G Live from Village - 15kb/s", hausa: "Live 2G daga Kauye", yoruba: "Live 2G lati Abule", igbo: "Live 2G site n obodo", swahili: "Live 2G kutoka Kijijini", english: "2G Live from Village" }, score: 90, views: "8.4k", level: 71, tag: "2G READY", bg: "#333", saves: 900, friends: 4, is2G: true },
  ];

  const feed = feedBase.map((v) => ({ ...v, title: v.titles[lang] || v.titles.english })).sort((a, b) => b.score - a.score);

  return (
    <div style={{ background: "#FFFBEB", minHeight: "100vh" }}>
      <div style={{ maxWidth: 430, margin: "0 auto", background: "#FFFBEB", minHeight: "100vh", borderLeft: "1px solid #ffe4c4", borderRight: "1px solid #ffe4c4", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,251,235,0.9)", padding: "12px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ffe4c4" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><div style={{ width: 32, height: 32, borderRadius: 999, background: "black", color: "white", display: "grid", placeItems: "center", fontSize: 12 }}>C</div><div style={{ padding: "4px 12px", borderRadius: 999, background: "black", color: "white", fontSize: 12, fontFamily: "monospace" }}>N{balance.toLocaleString()}</div></div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><div style={{ padding: "4px 12px", borderRadius: 999, background: "#FFD600", color: "black", fontSize: 11, fontWeight: 900, border: "1px solid black" }}>LVL 46-100</div></div>
        </div>

        <div style={{ padding: "8px 16px", display: "flex", gap: 8, overflowX: "auto" }}>
          {Object.keys(LANGS).map((k) => (
            <button key={k} onClick={() => setLang(k)} style={{ padding: "6px 12px", borderRadius: 999, fontSize: 10, fontWeight: 900, fontFamily: "monospace", whiteSpace: "nowrap", background: lang === k ? "black" : "rgba(0,0,0,0.05)", color: lang === k ? "white" : "rgba(0,0,0,0.6)", border: "none" }}>{LANGS[k].label}</button>
          ))}
        </div>

        {showWelcome && (
          <div style={{ margin: "8px 16px", borderRadius: 24, background: "black", color: "white", padding: 20, textAlign: "center" }}>
            <h1 style={{ fontSize: 26, fontWeight: 900, lineHeight: 1 }}>{t("welcomeTitle")}</h1>
            <p style={{ color: "#FF5722", fontWeight: 900, fontSize: 12, marginTop: 4, fontFamily: "monospace" }}>{t("welcomeSub")}</p>
            <p style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{t("oneFamily")} - IYALI DAYA - IDILE KAN - OTU EZINULO</p>
            <button onClick={() => setShowWelcome(false)} style={{ width: "100%", marginTop: 16, padding: "12px 0", borderRadius: 999, background: "#FFD600", color: "black", fontWeight: 900, fontFamily: "monospace", border: "none", fontSize: 14 }}>Enter Chat & Chill - BEYOND TIKTOK</button>
          </div>
        )}

        <div style={{ padding: "12px 20px" }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 0.9 }}>Talk Cool, Stay Chill <span style={{ color: "#FF5722" }}>+ Earn</span></h1>
          <p style={{ fontSize: 12, color: "rgba(0,0,0,0.6)", marginTop: 4 }}>TikTok stops at 46. We go to 100! +40% more - 0.3s LiveKit - 2G 15kb/s</p>
          <div style={{ marginTop: 12, background: "white", borderRadius: 20, padding: 16, border: "1px solid #ffe4c4" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, fontWeight: 900, fontFamily: "monospace" }}><span>TIKTOK MAX 46</span><span>CHILL MAX 100</span></div>
            <div style={{ height: 12, background: "rgba(0,0,0,0.05)", borderRadius: 999, marginTop: 8, overflow: "hidden" }}><div style={{ height: "100%", width: "100%", background: "linear-gradient(90deg,#FF5722,#ff9a00)", borderRadius: 999 }} /></div>
            <p style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(0,0,0,0.4)", marginTop: 8 }}>EZE OF CHILL - You beat TikTok! AI + Saves + Friends + 2G</p>
          </div>
        </div>

        <div style={{ padding: "0 12px", display: "flex", flexDirection: "column", gap: 16 }}>
          {feed.map((v) => (
            <div key={v.id} style={{ borderRadius: 28, overflow: "hidden", background: "black", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ height: 300, background: v.bg, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ padding: "4px 8px", borderRadius: 999, background: "#ef4444", fontSize: 10, fontWeight: 900 }}>LIVE - {v.views}</span><span style={{ padding: "4px 12px", borderRadius: 999, background: "#FFD600", color: "black", fontSize: 10, fontWeight: 900 }}>Lvl {v.level} - AI {v.score}/100</span></div>
                <div><h3 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{v.title}</h3><p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 4 }}>{v.user} - {v.tag}</p></div>
                <div style={{ position: "absolute", right: 12, bottom: 80, display: "flex", flexDirection: "column", gap: 8 }}>
                  <button onClick={() => setLiked({ ...liked, [v.id]: !liked[v.id] })} style={{ width: 44, height: 44, borderRadius: 999, background: liked[v.id] ? "#ef4444" : "rgba(255,255,255,0.1)", border: "none", color: "white" }}>L</button>
                  <button onClick={() => setSaved({ ...saved, [v.id]: !saved[v.id] })} style={{ width: 44, height: 44, borderRadius: 999, background: saved[v.id] ? "#FFD600" : "rgba(255,255,255,0.1)", border: "none", color: saved[v.id] ? "black" : "white" }}>S</button>
                  <button onClick={() => setGiftOpen(v)} style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.1)", border: "none", color: "white" }}>G</button>
                </div>
              </div>
              <div style={{ padding: 12, background: "#111", display: "flex", gap: 8 }}><div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 8 }}><p style={{ fontSize: 8, fontFamily: "monospace", opacity: 0.5 }}>VIEWERS</p><p style={{ fontWeight: 900, fontFamily: "monospace", fontSize: 12 }}>{v.views}</p></div><div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 8 }}><p style={{ fontSize: 8, fontFamily: "monospace", opacity: 0.5 }}>AI SCORE</p><p style={{ fontWeight: 900, color: "#FFD600", fontFamily: "monospace", fontSize: 12 }}>{v.score}/100</p></div><div style={{ flex: 1, background: "#FF5722", borderRadius: 12, padding: 8 }}><p style={{ fontSize: 8, fontFamily: "monospace" }}>YOUR CUT</p><p style={{ fontWeight: 900, fontFamily: "monospace", fontSize: 12 }}>70%-85%</p></div></div>
            </div>
          ))}
        </div>

        <div style={{ padding: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 900 }}>Gifts 70% to you - Bal N{balance.toLocaleString()}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            {gifts.map((g) => (
              <button key={g.name} onClick={() => setGiftOpen(g)} style={{ textAlign: "left", borderRadius: 22, padding: 16, border: "1px solid #ffe4c4", background: g.label ? "black" : "white", color: g.label ? "white" : "black" }}>
                <p style={{ fontWeight: 900, fontSize: 14 }}>{g.name}</p><p style={{ fontFamily: "monospace", fontSize: 11, opacity: 0.7 }}>N{g.price.toLocaleString()} {g.label || ""}</p><span style={{ marginTop: 8, display: "inline-block", padding: "4px 12px", borderRadius: 999, fontSize: 10, fontWeight: 900, fontFamily: "monospace", background: g.label ? "#FFD600" : "#FF5722", color: g.label ? "black" : "white" }}>{g.cut}</span>
              </button>
            ))}
          </div>
        </div>

        {giftOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.7)", display: "grid", placeItems: "center", padding: 16 }}>
            <div style={{ background: "white", borderRadius: 24, padding: 20, width: "100%", maxWidth: 340 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 20, fontWeight: 900 }}>Send Gift</h3><button onClick={() => setGiftOpen(null)} style={{ border: "none", background: "none" }}>X</button></div>
              <div style={{ marginTop: 16, background: "#FFFBEB", borderRadius: 16, padding: 16, textAlign: "center", border: "1px solid #ffe4c4" }}><p style={{ fontWeight: 900 }}>{giftOpen.name || giftOpen.title}</p><p style={{ fontFamily: "monospace", fontSize: 14 }}>N{(giftOpen.price || 1000).toLocaleString()}</p></div>
              <button onClick={() => { setBalance((b) => b + Math.floor((giftOpen.price || 1000) * 0.7)); setGiftOpen(null); alert("Paystack: N" + (giftOpen.price || 1000) + " sent! 70% credited."); }} style={{ width: "100%", marginTop: 16, padding: "16px 0", borderRadius: 999, background: "black", color: "white", fontWeight: 900, border: "none" }}>Pay with Paystack - N{(giftOpen.price || 1000).toLocaleString()}</button>
            </div>
          </div>
        )}

        <div style={{ position: "sticky", bottom: 0, background: "rgba(255,251,235,0.9)", borderTop: "1px solid #ffe4c4", padding: "8px 8px", display: "flex", justifyContent: "space-around" }}>
          {["For You", "Live", "Wallet"].map((l) => (
            <button key={l} onClick={() => setTab(l.toLowerCase())} style={{ padding: "6px 24px", borderRadius: 999, background: tab === l.toLowerCase() ? "black" : "transparent", color: tab === l.toLowerCase() ? "white" : "rgba(0,0,0,0.5)", border: "none", fontSize: 11, fontWeight: 900, fontFamily: "monospace" }}>{l}</button>
          ))}
        </div>
        <div style={{ padding: 12, fontSize: 10, fontFamily: "monospace", textAlign: "center", opacity: 0.3 }}>Premium v105 FIXED - No @import error - Ready</div>
      </div>
    </div>
  );
}
