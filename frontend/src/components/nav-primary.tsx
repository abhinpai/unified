'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'
import { buildWorkspaceRoute } from '@/lib/buildWorkspaceRoute'
import { useParams } from 'next/navigation'
import { ISidebar } from '@/types/ISidebar'

export function NavPrimary({
  workspacePath: workspace_path,
  primaryNavItems,
  primaryNavItemTitle,
}: ISidebar) {
  const params = useParams()

  return (
    <SidebarGroup>
      {primaryNavItemTitle && <SidebarGroupLabel>Platform</SidebarGroupLabel>}
      <SidebarMenu>
        {primaryNavItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className='group/collapsible'
          >
            <SidebarMenuItem>
              {item.items ? (
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item.isActive}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              ) : (
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={item.isActive}
                >
                  {item.icon && <item.icon />}
                  <a href={buildWorkspaceRoute(workspace_path, item.url)}>
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
