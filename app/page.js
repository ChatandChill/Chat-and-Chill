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

const TRANSLATIONS = {
  welcomeTitle: { pidgin: "Welcome to Chat & Chill", hausa: "Barka da zuwa Chat & Chill", yoruba: "Kaabo si Chat & Chill", igbo: "Nnoo na Chat & Chill", swahili: "Karibu Chat & Chill", english: "Welcome to Chat & Chill" },
  welcomeSub: { pidgin: "Talk Cool, Stay Chill + Earn", hausa: "Magana Mai Sanyi + Samu Kudi", yoruba: "Soro Tutu + Gba Owo", igbo: "Kparita uka di juu + Nweta ego", swahili: "Ongea Poa + Pata Pesa", english: "Talk Cool, Stay Chill + Earn" },
  oneFamily: { pidgin: "We Be One Family", hausa: "Mu Iyali Daya Ne", yoruba: "A Je Idile Kan", igbo: "Anyi Bu Otu Ezinuulo", swahili: "Sisi ni Familia Moja", english: "We Are One Family" },
};

export default function Page() {
  const [lang, setLang] = useState("pidgin");
  const [showWelcome, setShowWelcome] = useState(true);
  const [balance, setBalance] = useState(306950);
  const [tab, setTab] = useState("foryou");
  const t = (k) => (TRANSLATIONS[k] && TRANSLATIONS[k][lang]) || k;

  const feedBase = [
    { id: 1, user: "@Sade_Lagos", titles: { pidgin: "Lagos Night Vibes - How I make N1M for live", hausa: "Daren Legas - Yadda na samu N1M a live", yoruba: "Alekole Eko - Bawo ni mo se ri N1M", igbo: "Abali Lagos - Otu m si mee N1M", swahili: "Lagos Usiku - Jinsi nilivyopata N1M", english: "Lagos Night Vibes - How I made N1M" }, views: "12.4k" },
    { id: 2, user: "@JapaKing", titles: { pidgin: "Japa UK Secrets Wey Dem Dey Hide", hausa: "Sirrin Japa UK da suke Boye", yoruba: "Asiri Japa UK ti won n toju", igbo: "Ihe nzuzo Japa UK ha na-ezo", swahili: "Siri za Japa UK wanazoficha", english: "Japa UK Secrets They Hide" }, views: "28.1k" },
  ];
  const feed = feedBase.map((v) => ({ ...v, title: v.titles[lang] || v.titles.english }));

  return (
    <div style={{ background: "#FFFBEB", minHeight: "100vh", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "430px", margin: "0 auto", background: "#fff", borderRadius: "20px", padding: "20px" }}>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "15px" }}>
          {Object.keys(LANGS).map((k) => (
            <button key={k} onClick={() => setLang(k)} style={{ padding: "6px 10px", borderRadius: "20px", background: lang === k ? "black" : "#eee", color: lang === k ? "white" : "black", border: "none", fontSize: "10px", fontWeight: "bold" }}>{LANGS[k].label}</button>
          ))}
        </div>

        {showWelcome && (
          <div style={{ background: "black", color: "white", borderRadius: "20px", padding: "20px", textAlign: "center", marginBottom: "20px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "900" }}>{t("welcomeTitle")}</h1>
            <p style={{ color: "#FF5722", fontWeight: "bold", fontSize: "12px" }}>{t("welcomeSub")}</p>
            <p style={{ fontSize: "11px", marginTop: "5px" }}>{t("oneFamily")} - IYALI DAYA - IDILE KAN - OTU EZINULO - FAMILIA MOJA</p>
            <button onClick={() => setShowWelcome(false)} style={{ marginTop: "15px", background: "#FFD600", color: "black", padding: "12px 20px", borderRadius: "30px", border: "none", fontWeight: "900", width: "100%" }}>Enter Chat & Chill</button>
          </div>
        )}

        <h2 style={{ fontSize: "20px", fontWeight: "900" }}>{t("oneFamily")} - Bal N{balance.toLocaleString()}</h2>
        <p style={{ fontSize: "11px", color: "#666" }}>TikTok stops at 46. We go to 100! 0.3s LiveKit - 2G 15kb/s</p>

        <div style={{ marginTop: "20px" }}>
          {feed.map((v) => (
            <div key={v.id} style={{ background: "black", color: "white", borderRadius: "20px", padding: "15px", marginBottom: "10px" }}>
              <div style={{ fontSize: "10px", background: "red", display: "inline-block", padding: "2px 8px", borderRadius: "10px" }}>LIVE - {v.views}</div>
              <h3 style={{ fontSize: "16px", fontWeight: "900", marginTop: "10px" }}>{v.title}</h3>
              <p style={{ fontSize: "12px", opacity: 0.7 }}>{v.user}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "20px", background: "#FFFBEB", borderRadius: "15px", padding: "15px", textAlign: "center" }}>
          <p style={{ fontSize: "12px" }}>Algorithm v103 - One Family Translated - Gifts 70% to you</p>
          <p style={{ fontSize: "10px", opacity: 0.5, marginTop: "5px" }}>Build FIXED - No invisible chars</p>
        </div>
      </div>
    </div>
  );
}
