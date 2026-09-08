"use client"
import { useState, useEffect } from 'react'

export default function FundWalletSystemPro() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Load Paystack safely - won't crash if blocked
    if (typeof window !== 'undefined' && !window.PaystackPop) {
      const s = document.createElement('script')
      s.src = 'https://js.paystack.co/v1/inline.js'
      s.async = true
      s.onload = () => setLoaded(true)
      s.onerror = () => setLoaded(true) // still enable button even if script fails
      document.body.appendChild(s)
    } else {
      setLoaded(true)
    }
  }, [])

  const fund = () => {
    try {
      const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
      if (!key) {
        alert('❌ Missing NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in Vercel Env! Add it and REDEPLOY.')
        return
      }
      if (typeof window === 'undefined' || !window.PaystackPop) {
        alert('Paystack is loading... wait 3 secs and try again. If still fails, disable adblock.')
        return
      }

      // Paystack setup
      const handler = window.PaystackPop.setup({
        key: key,
        email: 'user@chatandchill.com', // you can change to real user email
        amount: 100000, // 1000 Naira in kobo
        currency: 'NGN',
        ref: 'CHAT_' + Date.now(),
        onClose: () => {
          alert('Payment window closed')
        },
        callback: async function(response) {
          alert('Payment success! Verifying... ' + response.reference)
          try {
            const res = await fetch('/api/fund', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                reference: response.reference, 
                user_id: 'user_123',
                amount: 1000 
              }),
            })
            const data = await res.json()
            if (data.success) {
              alert('✅ SUCCESS! New Balance: ₦' + data.balance)
              window.location.reload()
            } else {
              alert('❌ Verify failed: ' + (data.error || 'Unknown error'))
            }
          } catch (e) {
            alert('❌ Network error verifying: ' + e.message)
          }
        }
      })
      handler.openIframe()
    } catch (err) {
      alert('Error: ' + err.message)
      console.error(err)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0', position: 'relative', zIndex: 99999 }}>
      <button
        onClick={fund}
        style={{
          backgroundColor: '#00c853',
          color: 'white',
          padding: '16px 32px',
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '16px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        💳 Fund Wallet ₦1000 {loaded ? '' : '(Loading...)'}
      </button>
    </div>
  )
}
