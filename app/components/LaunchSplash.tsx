'use client'

import { useEffect, useState } from 'react'

export default function LaunchSplash() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'radial-gradient(circle at center, #111 0%, #000 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 140, height: 140, borderRadius: 30, background: 'linear-gradient(145deg, #facc15, #a16207)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 80px rgba(250,204,21,0.8)', animation: 'popBounce 1.2s ease-out infinite alternate' }}>
        <span style={{ fontSize: 60 }}>🌍</span>
      </div>
      <h1 style={{ marginTop: 24, fontWeight: 900, fontSize: 36, letterSpacing: 2, background: 'linear-gradient(90deg, #facc15, #fde68a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'fadeSlide 1s ease-out' }}>CHAT &amp; CHILL</h1>
      <p style={{ marginTop: 8, color: '#facc15', fontWeight: 700, letterSpacing: 6, fontSize: 12, animation: 'fadeSlide 1s ease-out 0.3s both' }}>AFRICAN PRIDE 🌍</p>
      <div style={{ marginTop: 30, width: 120, height: 4, background: '#222', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '100%', background: '#facc15', animation: 'loadBar 2.8s ease-in-out' }} />
      </div>
      <style>{`
        @keyframes popBounce { 0% { transform: scale(0.8) rotate(-5deg); } 100% { transform: scale(1.1) rotate(5deg); } }
        @keyframes fadeSlide { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes loadBar { 0% { width: 0%; } 100% { width: 100%; } }
      `}</style>
    </div>
  )
}
