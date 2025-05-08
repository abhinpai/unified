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
import { SIDEBAR_JOURNAL } from '@/lib/data/sidebar-journal'
import { SIDEBAR_MONEY_MANAGER } from '@/lib/data/sidebar-money-manager'
import { SIDEBAR_USER } from '@/lib/data/sidebar-user'
import { WORKSPACES } from '@/lib/data/workspaces'
import { ISidebar } from '@/types/ISidebar'
import { useParams, usePathname } from 'next/navigation'
import { NavTertiary } from './nav-tertiary'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const param = useParams()
  const pathname = usePathname()

  console.log(pathname)

  const getNavItems = (): ISidebar => {
    if (pathname.includes(SIDEBAR_MONEY_MANAGER.workspacePath))
      return SIDEBAR_MONEY_MANAGER
    else return SIDEBAR_JOURNAL
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
