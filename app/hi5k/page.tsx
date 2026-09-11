'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Page() {
  const [status, setStatus] = useState('')

  const send = async () => {
    setStatus('Sending Hi5k...')
    const response = await fetch('/api/wallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 'smallworld',
        amount: 500,
        type: 'hi5k',
        description: 'Hi5k chat',
      }),
    })
    const data = await response.json()
    setStatus(data.success ? `Hi5k! New: ₦${data.new_balance}` : `Error: ${data.error}`)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Hi5k</h1>
      <button onClick={send} className="mt-4 rounded-xl bg-black px-6 py-3 font-bold text-white">
        Send Hi5k ₦500
      </button>
      <p className="mt-3">{status}</p>
      <Link href="/" className="mt-6 block text-blue-600">Back</Link>
    </div>
  )
}