'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { WORKSPACE_JOURNAL, WORKSPACE_MONEY_MANAGER } from '@/lib/constants/constants'
import { SIDEBAR_MONEY_MANAGER } from '@/lib/data/sidebar-money-manager'
import { SIDEBAR_JOURNAL } from '@/lib/data/sidebar-journal'

export default function WorkspaceDefaultPage() {
  const router = useRouter()
  const params = useParams()
  const workspaceName = params['workspace'] as string

  const getDefaultRoute = () =>{
    switch (workspaceName){
      case WORKSPACE_MONEY_MANAGER:
        return SIDEBAR_MONEY_MANAGER.defaultRoute
      case WORKSPACE_JOURNAL:
        return SIDEBAR_JOURNAL.defaultRoute
      default:
        return SIDEBAR_MONEY_MANAGER.defaultRoute
    }
  }

  useEffect(() => {
    // Redirect to the default dashboard page when the workspace is loaded
    router.push(`/workspace/${workspaceName}/${getDefaultRoute()}`)
  }, [router, workspaceName])

  return <div>Redirecting to dashboard...</div>
}
