'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { buildWorkspaceRoute } from '@/lib/buildWorkspaceRoute'
import { ISidebar } from '@/types/ISidebar'
import { usePathname } from 'next/navigation'

export function NavSecondary({
  secondaryNavItemTitle,
  secondaryNavItems,
  workspacePath: workspace_path
}: ISidebar) {
  const pathname = usePathname()

  const isItemActive = (itemUrl: string) => {
    const fullUrl = buildWorkspaceRoute(workspace_path, itemUrl)
    return pathname === fullUrl
  }

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      {secondaryNavItemTitle && <SidebarGroupLabel>Projects</SidebarGroupLabel>}
      <SidebarMenu>
        {secondaryNavItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={isItemActive(item.url)}>
              <a href={buildWorkspaceRoute(workspace_path, item.url)}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
