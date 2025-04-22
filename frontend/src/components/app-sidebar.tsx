'use client'

import * as React from 'react'

import { NavPrimary } from '@/components/nav-primary'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import { WorkspaceSwitcher } from '@/components/workspace-switcher'
import {
  WORKSPACE_JOURNAL,
  WORKSPACE_MONEY_MANAGER
} from '@/lib/constants/constants'
import { SIDEBAR_JOURNAL } from '@/lib/data/sidebar-journal'
import { SIDEBAR_MONEY_MANAGER } from '@/lib/data/sidebar-money-manager'
import { SIDEBAR_USER } from '@/lib/data/sidebar-user'
import { WORKSPACES } from '@/lib/data/workspaces'
import { ISidebar } from '@/types/ISidebar'
import { useParams } from 'next/navigation'
import { NavTertiary } from './nav-tertiary'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const param = useParams()

  const getNavItems = (): ISidebar => {
    switch (param['workspace']) {
      case WORKSPACE_MONEY_MANAGER:
        return SIDEBAR_MONEY_MANAGER
      case WORKSPACE_JOURNAL:
        return SIDEBAR_JOURNAL
      default:
        return SIDEBAR_MONEY_MANAGER
    }
  }

  const items = getNavItems()

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspaces={WORKSPACES} />
      </SidebarHeader>
      <SidebarContent>
        <NavPrimary {...items} />
        <NavSecondary {...items} />
        <NavTertiary {...items} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={SIDEBAR_USER} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
