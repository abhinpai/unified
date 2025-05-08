import { NotebookIcon, SettingsIcon } from 'lucide-react'

export const SIDEBAR_JOURNAL = {
  workspace: 'Journals',
  workspacePath: '/journals',
  primaryNavItemTitle: '',
  secondaryNavItemTitle: 'Foundational',
  defaultRoute: 'notes',
  primaryNavItems: [
    {
      title: 'Notes',
      isRoot: true,
      url: 'notes',
      icon: NotebookIcon
    }
  ],
  secondaryNavItems: [],
  tertiaryNavItems: [
    {
      name: 'Settings',
      url: '/settings',
      icon: SettingsIcon
    }
  ]
}
