"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        router.push('/dashboard')
      }
    }
    getUser()
  }, [supabase, router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Welcome to Ritmo</h1>
        {!user && (
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Sign In
          </button>
        )}
      </div>
    </main>
  )
}
