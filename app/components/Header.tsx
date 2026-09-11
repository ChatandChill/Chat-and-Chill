'use client'

import { createClient } from '@/src/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function Header({ email }: { email: string }) {
  const supabase = createClient()
  const router = useRouter()

  return (
    <div className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">
      <p className="text-sm text-zinc-300">Welcome {email} &bull; Pro Full-Stack</p>
      <button
        onClick={async () => {
          await supabase.auth.signOut()
          router.push('/login')
        }}
        className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs transition hover:bg-white hover:text-black"
      >
        Logout
      </button>
    </div>
  )
}
