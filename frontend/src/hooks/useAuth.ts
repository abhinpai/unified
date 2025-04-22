import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // TODO: Impl UserAuth Properly
  return {
    user: {
      id: '9a3250b1-5ab1-440b-a9d6-34e19f457a4b'
    },
    loading
  }
}
