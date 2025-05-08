'use client'

import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  Video
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from '@/components/ui/sidebar'

const data = {
  nav: [
    { name: 'Notifications', icon: Bell },
    { name: 'Navigation', icon: Menu },
    { name: 'Home', icon: Home },
    { name: 'Appearance', icon: Paintbrush },
    { name: 'Messages & media', icon: MessageCircle },
    { name: 'Language & region', icon: Globe },
    { name: 'Accessibility', icon: Keyboard },
    { name: 'Mark as read', icon: Check },
    { name: 'Audio & video', icon: Video },
    { name: 'Connected accounts', icon: Link },
    { name: 'Privacy & visibility', icon: Lock },
    { name: 'Advanced', icon: Settings }
  ]
}

const SettingsPage = () => {
  return (
    <div>
      <SidebarProvider>
        <Sidebar collapsible='none'>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.nav.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.name === 'Messages & media'}
                      >
                        <a href='#'>
                          <item.icon />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className='flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0 max-h-[calc(100vh-4rem)]'>
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className='aspect-video max-w-3xl rounded-xl bg-muted/50'
            />
          ))}
        </main>
      </SidebarProvider>
    </div>
  )
}

export default SettingsPage
