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

export function NavSecondary({
  secondaryNavItemTitle,
  secondaryNavItems,
  workspacePath: workspace_path
}: ISidebar) {
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      {secondaryNavItemTitle && <SidebarGroupLabel>Projects</SidebarGroupLabel>}
      <SidebarMenu>
        {secondaryNavItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
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
