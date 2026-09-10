"use client"
import { useState, useEffect } from "react"

export default function TestWallet() {
  const [bal, setBal] = useState(6765000)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('Demo mode')
  const [txs, setTxs] = useState([])

  useEffect(() => {
    fetch('/api/wallet?user_id=user_123')
      .then((res) => res.json())
      .then((data) => {
        setBal(Number(data?.balance ?? 6765000))
        setTxs(Array.isArray(data?.transactions) ? data.transactions : [])
        if (data?.message) setStatus(data.message)
        else setStatus('Live wallet route connected')
      })
      .catch(() => {
        setBal(6765000)
        setStatus('Wallet service unavailable — showing safe Diamond Wallet balance.')
      })
      .finally(() => setLoading(false))
  }, [])

  const add = async (amt) => {
    const nextBal = bal + amt
    setBal(nextBal)
    setStatus(`Demo top-up: ₦${amt.toLocaleString()} added`)
  }

  return (
    <div style={{ padding: 30, background: 'black', color: 'white', minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', border: '1px solid #333', borderRadius: 20, background: '#111', padding: 24 }}>
        <p style={{ color: '#facc15', textTransform: 'uppercase', letterSpacing: 4, fontWeight: 900, fontSize: 12 }}>Diamond Wallet</p>
        <h1 style={{ fontSize: 52, fontWeight: 'bold', margin: '12px 0 4px' }}>₦{loading ? '...' : bal.toLocaleString()}</h1>
        <p style={{ color: '#aaa', marginBottom: 24 }}>{status}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <button onClick={() => add(1000)} style={{ background: 'white', color: 'black', padding: 18, borderRadius: 14, fontWeight: 800 }}>+ ₦1,000</button>
          <button onClick={() => add(3000)} style={{ background: '#FFD700', color: 'black', padding: 18, borderRadius: 14, fontWeight: 800 }}>+ ₦3,000</button>
          <button onClick={() => add(5000)} style={{ background: '#22c55e', color: 'black', padding: 18, borderRadius: 14, fontWeight: 800 }}>+ ₦5,000</button>
          <button onClick={() => { setBal(6765000); setStatus('Wallet reset to default Diamond Wallet amount.') }} style={{ background: '#ef4444', color: 'white', padding: 18, borderRadius: 14, fontWeight: 800 }}>Reset</button>
        </div>

        <div>
          <h2 style={{ marginBottom: 12, fontSize: 18, fontWeight: 800 }}>Recent activity</h2>
          {txs.length === 0 ? (
            <div style={{ border: '1px solid #333', borderRadius: 12, padding: 16, color: '#aaa' }}>No transactions yet. Wallet is in safe demo mode until live processing is enabled.</div>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              {txs.slice(0, 5).map((tx, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #333', borderRadius: 12, padding: 12 }}>
                  <span>{tx.type || 'wallet'}</span>
                  <strong>₦{Number(tx.amount || 0).toLocaleString()}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
