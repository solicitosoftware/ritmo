'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type User } from '@supabase/supabase-js'

export const createClientSupabaseClient = () => {
  return createClientComponentClient()
}

export async function getClientSession() {
  const supabase = createClientSupabaseClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function signOut() {
  const supabase = createClientSupabaseClient()
  try {
    await supabase.auth.signOut()
    return true
  } catch (error) {
    console.error('Error:', error)
    return false
  }
} 