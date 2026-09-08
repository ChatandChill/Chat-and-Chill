"use client"
import { useState, useEffect } from "react"

export default function Page(){
  const [balance, setBalance] = useState(10000)
  const [loading, setLoading] = useState("")

  useEffect(()=>{
    const saved = localStorage.getItem("wallet_bal")
    if(saved) setBalance(Number(saved))
  },[])

  const pay = async (amount) => {
    setLoading(amount)
    const res = await fetch("/api/fund", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({amount, email:"user@chatandchill.com", user_id:"user_123"})
    })
    const data = await res.json()
    if(data.authorization_url){
      window.location.href = data.authorization_url
    } else {
      alert(data.error || "Error")
      setLoading("")
    }
  }

  return (
    <div style={{background:"black",color:"white",minHeight:"100vh",padding:20,textAlign:"center"}}>
      <p>Wallet Balance</p>
      <h1 style={{fontSize:60,fontWeight:"bold"}}>₦{balance.toLocaleString()}</h1>
      <button onClick={()=>pay(1000)} style={{background:"white",color:"black",padding:18,borderRadius:12,width:"100%",marginTop:20,fontWeight:"bold"}}>
        {loading==1000 ? "Loading..." : "+ Fund ₦1,000"}
      </button>
      <button onClick={()=>pay(3000)} style={{background:"#FFD700",color:"black",padding:18,borderRadius:12,width:"100%",marginTop:12,fontWeight:"bold"}}>
        {loading==3000 ? "Loading..." : "+ Fund ₦3,000"}
      </button>
      <button onClick={()=>pay(5000)} style={{background:"#22c55e",color:"black",padding:18,borderRadius:12,width:"100%",marginTop:12,fontWeight:"bold"}}>
        {loading==5000 ? "Loading..." : "+ Fund ₦5,000"}
      </button>
    </div>
  )
}
