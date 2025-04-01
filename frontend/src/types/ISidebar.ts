export interface NavItem {
  title: string
  isRoot?: boolean
  url: string
  icon?: React.ComponentType
  isActive?: boolean
  items?: NavItem[]
}

export interface SecondaryNavItem {
  name: string
  url: string
  icon: React.ComponentType
  isActive?: boolean
}

export interface TertiaryNavItem {
  name: string
  url: string
  icon: React.ComponentType
  isActive?: boolean
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
