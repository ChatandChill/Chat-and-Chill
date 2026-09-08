"use client"
import { useEffect, useState } from 'react'

export default function FundWalletSystemPro(){
  const [ready, setReady] = useState(false)

  useEffect(()=>{
    if(typeof window !== 'undefined' && !window.PaystackPop){
      const s = document.createElement('script')
      s.src = 'https://js.paystack.co/v1/inline.js'
      s.onload = () => setReady(true)
      document.body.appendChild(s)
    } else {
      setReady(true)
    }
  },[])

  const fund = (amount) => {
    const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    if(!key){
      alert("Paystack Public Key missing in Vercel")
      return
    }
    if(!window.PaystackPop){
      alert("Paystack loading... click again in 2 sec")
      return
    }

    const handler = window.PaystackPop.setup({
      key: key,
      email: "user@chatandchill.com",
      amount: amount * 100,
      currency: "NGN",
      callback: async (res) => {
        console.log("Paystack success:", res)
        try{
          const r = await fetch("/api/fund", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ user_id: "user_123", amount })
          })
          const j = await r.json()
          console.log("Fund API:", j)
          if(j.error){
            alert("Fund error: " + j.error)
          } else {
            alert(`Funded ₦${amount}! Balance now ₦${j.balance}`)
            location.reload()
          }
        }catch(err){
          console.error(err)
          alert("Network error: " + err.message)
        }
      },
      onClose: () => {
        console.log("Closed")
      }
    })
    handler.openIframe()
  }

  return (
    <div className="flex gap-2">
      <button onClick={()=>fund(1000)} className="bg-white px-4 py-2 rounded">Fund 1000</button>
      <button onClick={()=>fund(3000)} className="bg-yellow-400 px-4 py-2 rounded">Fund 3000</button>
      {!ready && <span className="text-xs">Loading Paystack...</span>}
    </div>
  )
}
