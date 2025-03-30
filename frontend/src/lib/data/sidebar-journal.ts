import {
  NotebookIcon,
  SettingsIcon,
} from 'lucide-react'

export const SIDEBAR_JOURNAL = {
  primaryNavItemTitle: '',
  secondaryNavItemTitle: 'Foundational',
  defaultRoute: "/notes",
  primaryNavItems: [
    {
      title: 'Notes',
      isRoot: true,
      url: 'notes',
      icon: NotebookIcon,
      isActive: true
    }
  ],
  secondaryNavItems: [],
  tertiaryNavItems: [
    {
      name: 'Settings',
      url: '/setting',
      icon: SettingsIcon
    }
  ]
}
