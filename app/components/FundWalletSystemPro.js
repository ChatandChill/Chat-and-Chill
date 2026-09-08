"use client"
import { useState } from 'react'

export default function FundWalletSystemPro() {
  const [loading, setLoading] = useState(false)

  const pay = () => {
    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: "user@chatandchill.com",
      amount: 100000, // ₦1000
      ref: `fund_${Date.now()}`,
      callback: async (res) => {
        setLoading(true)
        const r = await fetch('/api/fund', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ reference: res.reference, user_id: 'user_123' })
        })
        const d = await r.json()
        alert(d.success ? `Funded! New balance ₦${d.balance}` : 'Failed: ' + d.error)
        setLoading(false)
        location.reload()
      },
      onClose: () => setLoading(false)
    })
    handler.openIframe()
  }

  return (
    <>
      <script src="https://js.paystack.co/v1/inline.js"></script>
      <div style={{textAlign:'center', margin:'20px'}}>
        <button onClick={pay} disabled={loading} style={{background:'#00c853', color:'white', padding:'12px 24px', borderRadius:'12px', fontWeight:'bold', fontSize:'16px'}}>
          {loading ? 'Verifying...' : '💳 Fund Wallet ₦1000'}
        </button>
      </div>
    </>
  )
}
