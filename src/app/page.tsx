'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from "next/image";

export default function Home() {
  const { status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (status === 'authenticated') {
    redirect('/dashboard')
  }

  redirect('/auth/signin')
}
