"use client"
import { useEffect, useState } from 'react'

export default function FundWalletSystemPro(){
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(typeof window !== 'undefined' && !window.PaystackPop){
      const script = document.createElement('script')
      script.src = 'https://js.paystack.co/v1/inline.js'
      script.async = true
      document.body.appendChild(script)
    }
  },[])

  const handleFund = (amountNaira) => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    if(!publicKey){
      alert('❌ Add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in Vercel env')
      return
    }
    if(!window.PaystackPop){
      alert('Paystack still loading... wait 2 seconds')
      return
    }

    const paystack = window.PaystackPop.setup({
      key: publicKey,
      email: 'user@chatandchill.com',
      amount: amountNaira * 100, // Naira to kobo
      currency: 'NGN',
      onClose: () => {
        alert('Payment cancelled')
      },
      callback: async function(response){
        // PAYMENT SUCCESS - Update Supabase wallet
        setLoading(true)
        try{
          const res = await fetch('/api/fund', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ 
              user_id: 'user_123', // change to 'user' if that's your login id
              amount: amountNaira 
            })
          })
          const data = await res.json()
          alert(`✅ Funded ₦${amountNaira}! New balance: ₦${data.balance}`)
          window.location.reload() // refresh to show new balance
        }catch(e){
          alert('Funded but wallet update failed: ' + e.message)
        }
        setLoading(false)
      }
    })
    paystack.openIframe()
  }

  return (
    <div className="flex flex-col gap-3">
      <button onClick={()=>handleFund(1000)} disabled={loading} className="p-3 bg-white rounded-xl">Fund ₦1000</button>
      <button onClick={()=>handleFund(3000)} disabled={loading} className="p-3 bg-yellow-400 rounded-xl">Fund ₦3000 +₦300 Bonus</button>
      <button onClick={()=>handleFund(5000)} disabled={loading} className="p-3 bg-green-400 rounded-xl">Fund ₦5000 +₦1000 Bonus</button>
    </div>
  )
}
