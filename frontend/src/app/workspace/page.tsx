'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  WORKSPACE_JOURNAL,
  WORKSPACE_MONEY_MANAGER
} from '@/lib/constants/constants'
import { SIDEBAR_MONEY_MANAGER } from '@/lib/data/sidebar-money-manager'
import { SIDEBAR_JOURNAL } from '@/lib/data/sidebar-journal'

export default function WorkspaceDefaultPage() {
  const router = useRouter()
  const params = useParams()
  const workspaceName = params['workspace'] as string

  console.log(workspaceName);

  useEffect(() => {
    switch (workspaceName) {
      case WORKSPACE_MONEY_MANAGER:
        router.push(
          `/workspace/${workspaceName}/${SIDEBAR_MONEY_MANAGER.defaultRoute}`
        )
        break
      case WORKSPACE_JOURNAL:
        router.push(
          `/workspace/${workspaceName}/${SIDEBAR_JOURNAL.defaultRoute}`
        )
        break
      default:
        router.push('/404')
    }
  }, [router, workspaceName])

  return <div>Redirecting...</div>
}
