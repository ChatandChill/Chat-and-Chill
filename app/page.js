"use client"

import { useState } from "react"

const FEED = [
  { id: 1, user: "@afrobeats_live", name: "Lagos Night", video: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1080", viewers: "12.4K", city: "Lagos 🌍" },
  { id: 2, user: "@nollywood_star", name: "Premiere Live", video: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1080", viewers: "8.2K", city: "London 🇬🇧" },
  { id: 3, user: "@comedy_africa", name: "Comedy Chill", video: "https://images.unsplash.com/photo-1516450360452-9312abbf6f7e?w=1080", viewers: "22K", city: "Atlanta 🇺🇸" },
  { id: 4, user: "@amapiano_sa", name: "Amapiano Vibes", video: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1080", viewers: "15K", city: "Jozi 🇿🇦" },
]

export default function LiveFeed() {
  const [likes, setLikes] = useState({})
  const [giftPop, setGiftPop] = useState(false)
  const [followed, setFollowed] = useState({})
  const [activeChat, setActiveChat] = useState("")

  const sendGift = () => {
    setGiftPop(true)
    window.setTimeout(() => setGiftPop(false), 1400)
  }

  return (
    <main style={{ height: "100vh", background: "black", overflowY: "scroll", scrollSnapType: "y mandatory", scrollbarWidth: "none" }}>
      <style>{`main::-webkit-scrollbar{display:none}@keyframes bouncePop{0%{transform:scale(.8);opacity:0}50%{transform:scale(1.25);opacity:1}100%{transform:scale(1);opacity:1}}`}</style>
      {FEED.map((item) => (
        <section key={item.id} style={{ height: "100vh", width: "100%", position: "relative", scrollSnapAlign: "start", overflow: "hidden" }}>
          <img src={item.video} alt={item.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.2), rgba(0,0,0,.82))" }} />
          <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}><div style={{ background: "red", color: "white", padding: "4px 10px", borderRadius: 20, fontWeight: 900, fontSize: 12 }}>● LIVE</div><div style={{ background: "rgba(0,0,0,.6)", color: "white", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>👁 {item.viewers}</div></div>
            <div style={{ background: "rgba(0,0,0,.6)", color: "#facc15", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{item.city}</div>
          </div>
          <div style={{ position: "absolute", bottom: 20, left: 12, right: 72, zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><img src={item.video} alt="" style={{ width: 40, height: 40, borderRadius: 20, border: "2px solid #facc15", objectFit: "cover" }} /><div><div style={{ color: "white", fontWeight: 900, fontSize: 14 }}>{item.user}</div><div style={{ color: "#ccc", fontSize: 11 }}>{item.name}</div></div><button onClick={() => setFollowed((current) => ({ ...current, [item.id]: !current[item.id] }))} style={{ background: followed[item.id] ? "#22c55e" : "#facc15", color: "black", border: 0, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 900, marginLeft: 8 }}>{followed[item.id] ? "Following" : "Follow"}</button></div>
            <div style={{ color: "white", fontSize: 13, marginBottom: 12, lineHeight: 1.3 }}>African Pride Global 🌍 Come chill with us! {item.city} to the world! #Afrobeats</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><div style={{ color: "#facc15", fontSize: 11 }}>🔥 <b>Sarah:</b> This is fire!!!</div><div style={{ color: "white", fontSize: 11 }}>💬 <b>John:</b> Sending love from home 🌍</div>{activeChat === item.id && <div style={{ color: "#86efac", fontSize: 11 }}>✅ Your message joined the live chat.</div>}</div>
          </div>
          <div style={{ position: "absolute", right: 12, bottom: 24, zIndex: 3, display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}><button aria-label="Like live stream" onClick={() => setLikes((current) => ({ ...current, [item.id]: !current[item.id] }))} style={{ border: 0, background: "rgba(0,0,0,.55)", color: likes[item.id] ? "#fb7185" : "white", borderRadius: 24, width: 48, height: 48, fontSize: 24 }}>{likes[item.id] ? "♥" : "♡"}</button><button aria-label="Send gift" onClick={sendGift} style={{ border: 0, background: "#facc15", color: "black", borderRadius: 24, width: 48, height: 48, fontSize: 22 }}>🎁</button><button aria-label="Open live chat" onClick={() => setActiveChat(item.id)} style={{ border: 0, background: "rgba(0,0,0,.55)", color: "white", borderRadius: 24, width: 48, height: 48, fontSize: 22 }}>💬</button></div>
          {giftPop && <div style={{ position: "absolute", top: "42%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 4, color: "#facc15", fontSize: 38, fontWeight: 900, animation: "bouncePop 1.4s both", textShadow: "0 2px 14px black" }}>🎁 Gift sent!</div>}
        </section>
      ))}
    </main>
  )
}
