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

  const fund = () => {
    const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    if(!key) return alert('Add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in Vercel!')
    if(!window.PaystackPop) return alert('Paystack loading...')
    
    const h = window.PaystackPop.setup({
      key, email: 'test@chatandchill.com', amount: 100000,
      ref: 'fund_'+Date.now(),
      callback: async (res) => {
        const r = await fetch('/api/fund', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({reference: res.reference, user_id: 'user_123'})
        })
        const d = await r.json()
        alert(d.success ? 'SUCCESS! Balance: '+d.balance : 'Error: '+d.error)
        location.reload()
      }
    })
    h.openIframe()
  }

  return (
    <div style={{textAlign:'center', margin:'30px'}}>
      <button onClick={fund} disabled={!ready} style={{background: ready?'#00c853':'gray', color:'white', padding:'14px 28px', borderRadius:'12px', fontWeight:'bold', border:'none'}}>
        {ready ? '💳 Fund Wallet ₦1000' : 'Loading...'}
      </button>
    </div>
  )
}
