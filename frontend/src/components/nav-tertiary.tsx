'use-client';

import { buildWorkspaceRoute } from '@/lib/buildWorkspaceRoute';
import { ISidebar } from '@/types/ISidebar';
import React from 'react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from './ui/sidebar';

export const NavTertiary = ({
  tertiaryNavItems,
  className,
  workspacePath: workspace_path,
  ...props
}: ISidebar & React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarGroup className={className}>
      <SidebarGroupContent>
        <SidebarMenu>
          {tertiaryNavItems.map((item) => (
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
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
