"use client"
import { useEffect, useState } from 'react'

export default function FundWalletSystemPro(){
  const [ready, setReady] = useState(false)
  const [bal, setBal] = useState(0)

  useEffect(()=>{
    // Load Paystack
    if(typeof window !== 'undefined' && !window.PaystackPop){
      const s = document.createElement('script')
      s.src = 'https://js.paystack.co/v1/inline.js'
      s.onload = () => setReady(true)
      s.onerror = () => alert("Failed to load Paystack. Check internet")
      document.body.appendChild(s)
    } else {
      setReady(true)
    }
    // Load balance
    fetch("/api/wallet?user_id=user_123")
      .then(r=>r.json())
      .then(j=>{ if(j.balance !== undefined) setBal(j.balance) })
  },[])

  const directFund = async (amount) => {
    const r = await fetch("/api/fund", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ user_id: "user_123", amount })
    })
    const j = await r.json()
    if(j.error) alert("Error: " + j.error)
    else {
      setBal(j.balance)
      alert(`Success! New balance ₦${j.balance}`)
    }
  }

  const paystackFund = (amount) => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    if(!publicKey){
      alert("Add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in Vercel env vars")
      return
    }
    if(!window.PaystackPop){
      alert("Paystack not ready, wait 2 sec")
      return
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: "user@chatandchill.com",
      amount: amount * 100,
      currency: "NGN",
      callback: function(response){
        directFund(amount)
      },
      onClose: function(){
        console.log("Paystack closed")
      }
    })
    handler.openIframe()
  }

  return (
    <div className="p-4 bg-black text-white rounded-xl">
      <h2 className="text-xl mb-2">Wallet Balance: ₦{bal}</h2>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button onClick={()=>directFund(1000)} className="bg-white text-black p-3 rounded">Quick Add ₦1000 (No Paystack)</button>
        <button onClick={()=>paystackFund(1000)} className="bg-yellow-400 text-black p-3 rounded">Paystack ₦1000</button>
        <button onClick={()=>paystackFund(3000)} className="bg-green-400 text-black p-3 rounded">Paystack ₦3000</button>
        <button onClick={()=>paystackFund(5000)} className="bg-purple-400 text-black p-3 rounded">Paystack ₦5000</button>
      </div>
      <p className="text-xs mt-2">{ready ? "Paystack Ready" : "Loading Paystack..."}</p>
    </div>
  )
}
