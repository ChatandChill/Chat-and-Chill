"use client"
import { useState, useEffect } from 'react'

export default function FundWalletSystemPro() {
  const [loading, setLoading] = useState(false)
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

  useEffect(() => {
    // Load Paystack script
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    document.body.appendChild(script)
    console.log('Paystack Key:', publicKey ? 'FOUND ' + publicKey.slice(0,15) + '...' : 'NOT FOUND - Redeploy needed!')
  }, [])

  const pay = () => {
    if (!publicKey) {
      alert('Paystack key not loaded! Go Vercel > Redeploy WITHOUT cache')
      return
    }
    if (!window.PaystackPop) {
      alert('Paystack script still loading, wait 2 seconds and try again')
      return
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: "user@chatandchill.com",
      amount: 100000,
      ref: `fund_${Date.now()}`,
      callback: async (res) => {
        setLoading(true)
        const r = await fetch('/api/fund', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ reference: res.reference, user_id: 'user_123' })
        })
        const d = await r.json()
        alert(d.success ? `SUCCESS! New balance ₦${d.balance}` : 'Failed: ' + d.error)
        setLoading(false)
        location.reload()
      },
      onClose: () => setLoading(false)
    })
    handler.openIframe()
  }

  return (
    <div style={{textAlign:'center', margin:'20px'}}>
      <button onClick={pay} disabled={loading} style={{background: publicKey ? '#00c853' : 'red', color:'white', padding:'12px 24px', borderRadius:'12px', fontWeight:'bold'}}>
        {loading ? 'Verifying...' : publicKey ? '💳 Fund Wallet ₦1000' : '❌ Key Missing - Redeploy!'}
      </button>
      <p style={{fontSize:'10px', color:'gray'}}>{publicKey ? publicKey.slice(0,20) : 'NO KEY'}</p>
    </div>
  )
}
