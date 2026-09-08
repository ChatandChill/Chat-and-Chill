"use client"
import { useState, useEffect } from 'react'

export default function FundWalletSystemPro() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const s = document.createElement('script')
    s.src = 'https://js.paystack.co/v1/inline.js'
    s.onload = () => setReady(true)
    document.body.appendChild(s)
  }, [])

  const pay = () => {
    const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    if(!key) return alert('No public key in Vercel env')
    const handler = window.PaystackPop.setup({
      key, email: 'user@chatandchill.com', amount: 100000,
      ref: 'fund_'+Date.now(),
      callback: async (res) => {
        const r = await fetch('/api/fund', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({reference: res.reference, user_id: 'user_123'})})
        const d = await r.json()
        alert(JSON.stringify(d))
        location.reload()
      }
    })
    handler.openIframe()
  }

  return <div style={{textAlign:'center', margin:'20px'}}><button onClick={pay} disabled={!ready} style={{background: ready ? '#00c853' : 'gray', color:'white', padding:'12px 24px', borderRadius:'12px'}}>{ready ? '💳 Fund ₦1000 (Safe)' : 'Loading Paystack...'}</button></div>
}
