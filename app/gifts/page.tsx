'use client'

import { useState } from 'react'

export default function Page() {
  const [status, setStatus] = useState('')

  const send = async () => {
    setStatus('Sending...')
    const response = await fetch('/api/wallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 'smallworld',
        amount: 500,
        type: 'gift',
        description: 'Gift sent',
      }),
    })
    const data = await response.json()
    setStatus(data.success ? `Sent! New: ₦${data.new_balance}` : `Error: ${data.error}`)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Gifts</h1>
      <button onClick={send} className="mt-4 rounded-xl bg-yellow-400 px-6 py-3 font-bold">
        Send ₦500 Gift
      </button>
      <p className="mt-3">{status}</p>
      <a href="/" className="mt-6 block text-blue-600">Back</a>
    </div>
  )
}