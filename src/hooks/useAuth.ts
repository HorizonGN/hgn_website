"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import type { Profile } from "@/types/database"

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  isApproved: boolean
  isAdmin: boolean
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const supabase = createClient()

    const fetchProfile = async (userId: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()
      return data
    }

    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!mounted) return

        setUser(user)

        if (user) {
          const profile = await fetchProfile(user.id)
          if (!mounted) return
          setProfile(profile)
        }
      } catch (error) {
        console.error("useAuth init error:", error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        const profile = await fetchProfile(currentUser.id)
        if (mounted) setProfile(profile)
      } else {
        setProfile(null)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    profile,
    loading,
    isApproved: profile?.is_approved ?? false,
    isAdmin: profile?.is_admin ?? false,
  }
}
