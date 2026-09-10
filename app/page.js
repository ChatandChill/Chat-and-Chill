import Link from "next/link"

export default function Page() {
  return (
    <div style={{ minHeight: '100vh', background: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 20 }}>
      <h1 style={{ color: '#facc15', fontWeight: 900, fontSize: 36 }}>CHAT & CHILL 🌍</h1>
      <p>African Pride — REAL IS LIVE</p>
      <Link href="/gifts" style={{ background: '#facc15', color: 'black', padding: '14px 28px', borderRadius: 24, fontWeight: 900, textDecoration: 'none' }}>🎁 OPEN 135 GIFTS</Link>
      <Link href="/entertainment" style={{ background: '#222', color: 'white', padding: '14px 28px', borderRadius: 24, textDecoration: 'none', border: '1px solid #333' }}>🎬 ENTERTAINMENT</Link>
      <Link href="/chat" style={{ background: '#222', color: 'white', padding: '14px 28px', borderRadius: 24, textDecoration: 'none', border: '1px solid #333' }}>💬 CHAT</Link>
    </div>
  )
}
