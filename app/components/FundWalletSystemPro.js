"use client"
import { useEffect } from 'react'

export default function FundWalletSystemPro() {

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.PaystackPop) {
      const script = document.createElement('script')
      script.src = 'https://js.paystack.co/v1/inline.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const handleFund = () => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

    if (!publicKey) {
      alert('❌ Add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in Vercel and REDEPLOY')
      return
    }

    if (!window.PaystackPop) {
      alert('Paystack still loading... wait 2 seconds. Disable adblock if blocked.')
      return
    }

    const paystack = window.PaystackPop.setup({
      key: publicKey,
      email: 'user@chatandchill.com',
      amount: 100000, // ₦1000 = 100000 kobo
      currency: 'NGN',
      ref: 'FUND_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      onClose: function() {
        console.log('User closed paystack')
      },
      callback: function(response) {
        // THIS IS THE FIX - callback must be normal function, not async
        console.log('Paystack callback:', response)
        alert('Payment OK! Reference: ' + response.reference + ' - Verifying...')

        fetch('/api/fund', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reference: response.reference,
            user_id: 'user_123'
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log('Verify response:', data)
          if (data.success) {
            alert('✅ VERIFIED! Paid: ₦' + data.amountPaid + '\nOld: ₦' + data.oldBalance + '\nNew Balance: ₦' + data.balance)
            window.location.reload()
          } else {
            alert('❌ Verify failed: ' + data.error)
          }
        })
        .catch(err => {
          alert('❌ Network error: ' + err.message)
        })
      }
    })

    paystack.openIframe()
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', position: 'relative', zIndex: 99999 }}>
      <button
        onClick={handleFund}
        style={{
          background: '#00C853',
          color: 'white',
          padding: '16px 36px',
          borderRadius: '14px',
          fontWeight: '900',
          fontSize: '16px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,200,83,0.4)'
        }}
      >
        💳 Fund Wallet ₦1000
      </button>
    </div>
  )
}
