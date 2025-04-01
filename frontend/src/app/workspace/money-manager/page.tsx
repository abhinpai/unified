'use client'

import { WORKSPACE_MONEY_MANAGER } from '@/lib/constants/constants'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const MoneyManagerPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push(`/workspace/${WORKSPACE_MONEY_MANAGER}/dashboard`)
  }, [])  
    

  return (
    <div/>
  )
}

export default MoneyManagerPage