"use client";

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getClientSession } from '@/lib/auth.client'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getClientSession()
        if (!user) {
          router.push('/auth/signin')
          return
        }
        setUser(user)
      } catch (error) {
        console.error('Error:', error)
        router.push('/auth/signin')
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [router])

  const handleSignOut = async () => {
    // Implement sign out logic
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }
  console.log(user)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">User Logged In</h2>
            <p><strong>Email:</strong> {user.user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
