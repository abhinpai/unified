'use client'

import { GalleryVerticalEnd } from 'lucide-react'

import { LoginForm } from '@/components/login-form'
import { WORKSPACE_MONEY_MANAGER } from '@/lib/constants/constants'
import { signIn } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signIn(formData.email, formData.password)
      if (res) {
        router.push(`/workspace/${WORKSPACE_MONEY_MANAGER}`)
      }
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <a href='#' className='flex items-center gap-2 self-center font-medium'>
          <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          Unified
        </a>
        <LoginForm
          handleSubmit={handleSubmit}
          email={formData.email}
          password={formData.password}
          loading={loading}
        />
      </div>
    </div>
  )
}
