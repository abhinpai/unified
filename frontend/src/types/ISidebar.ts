export interface NavItem {
  title: string
  isRoot?: boolean
  url: string
  icon?: React.ComponentType
  items?: NavItem[]
}

export interface SecondaryNavItem {
  name: string
  url: string
  icon: React.ComponentType
}

export interface TertiaryNavItem {
  name: string
  url: string
  icon: React.ComponentType
}

export interface ISidebar {
  workspace: string
  workspacePath: string
  primaryNavItemTitle: string
  secondaryNavItemTitle: string
  defaultRoute: string
  primaryNavItems: NavItem[]
  secondaryNavItems: SecondaryNavItem[]
  tertiaryNavItems: TertiaryNavItem[]
}
