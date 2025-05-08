'use client'

import { ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

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
import { ISidebar } from '@/types/ISidebar'

export function NavPrimary({
  workspacePath: workspace_path,
  primaryNavItems,
  primaryNavItemTitle
}: ISidebar) {
  const pathname = usePathname()

  const isItemActive = (itemUrl: string) => {
    const fullUrl = buildWorkspaceRoute(workspace_path, itemUrl)
    return pathname === fullUrl
  }

  const isSubItemActive = (subItemUrl: string) => {
    return pathname === subItemUrl
  }

  return (
    <SidebarGroup>
      {primaryNavItemTitle && <SidebarGroupLabel>Platform</SidebarGroupLabel>}
      <SidebarMenu>
        {primaryNavItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.items?.some((subItem) =>
              isSubItemActive(subItem.url)
            )}
            className='group/collapsible'
          >
            <SidebarMenuItem>
              {item.items ? (
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item.items.some((subItem) =>
                      isSubItemActive(subItem.url)
                    )}
                  >
                    {item.icon && <item.icon />}
                    {!item.isRoot ? (
                      <a href={buildWorkspaceRoute(workspace_path, item.url)}>
                        <span>{item.title}</span>
                      </a>
                    ) : (
                      <span>{item.title}</span>
                    )}
                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              ) : (
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isItemActive(item.url)}
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
                        <a href={buildWorkspaceRoute(workspace_path, subItem.url)}>
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
