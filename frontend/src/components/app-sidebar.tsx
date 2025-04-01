'use client'

import * as React from 'react'

import { NavPrimary } from '@/components/nav-primary'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import { WorkspaceSwitcher } from '@/components/workspace-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'
import { useParams } from 'next/navigation'
import {
  WORKSPACE_JOURNAL,
  WORKSPACE_MONEY_MANAGER
} from '@/lib/constants/constants'
import { SIDEBAR_MONEY_MANAGER } from '@/lib/data/sidebar-money-manager'
import { WORKSPACES } from '@/lib/data/workspaces'
import { SIDEBAR_USER } from '@/lib/data/sidebar-user'
import { NavTertiary } from './nav-tertiary'
import { SIDEBAR_JOURNAL } from '@/lib/data/sidebar-journal'
import { ISidebar } from '@/types/ISidebar'

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
