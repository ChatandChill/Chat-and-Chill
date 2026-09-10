'use client'

import Link from 'next/link'

const USERS = ['okiki', 'john', 'sarah', 'david', 'queen']

export default function Inbox() {
  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', padding: 20 }}>
      <h1 style={{ color: '#facc15', fontWeight: 900, fontSize: 28 }}>📥 INBOX — CHAT IS WORKING!</h1>
      {USERS.map(user => (
        <Link key={user} href={`/chat/${user}`} style={{ display: 'block', marginTop: 12, padding: 18, background: '#222', borderRadius: 12, color: 'white', textDecoration: 'none', fontWeight: 700 }}>
          👤 {user} — Tap to chat →
        </Link>
      ))}
    </div>
  )
}
