import {
  ArrowLeftRightIcon,
  CalculatorIcon,
  ClipboardListIcon,
  ComponentIcon,
  LayoutDashboardIcon,
  PiggyBankIcon,
  SettingsIcon,
  SquareUserRoundIcon
} from 'lucide-react'

export const SIDEBAR_MONEY_MANAGER = {
  primaryNavItemTitle: '',
  secondaryNavItemTitle: 'Foundational',
  defaultRoute: "/dashboard",
  primaryNavItems: [
    {
      title: 'Dashboard',
      isRoot: true,
      url: '/dashboard',
      icon: LayoutDashboardIcon,
      isActive: true
    },
    {
      title: 'Transaction',
      isRoot: true,
      url: '/transaction',
      icon: ArrowLeftRightIcon,
      items: [
        {
          title: 'Incomes',
          url: '/transaction/income',
          isActive: false
        },
        {
          title: 'Expenses',
          url: '/transaction/expenses',
          isActive: false
        },
        {
          title: 'Investments',
          url: '/transaction/investment',
          isActive: false
        },
        {
          title: 'Subscriptions',
          url: '/transaction/subscriptions',
          isActive: false
        },
        {
          title: 'Transfer',
          url: '/transaction/transfer',
          isActive: false
        }
      ]
    },
    {
      title: 'Report',
      url: '/report',
      isRoot: false,
      icon: ClipboardListIcon,
      isActive: false
    }
  ],
  secondaryNavItems: [
    {
      name: 'Accounts',
      url: '/account',
      icon: SquareUserRoundIcon
    },
    {
      name: 'Budget',
      url: '/budget',
      icon: CalculatorIcon
    },
    {
      name: 'Category',
      url: '/category',
      icon: ComponentIcon
    }
  ],
  tertiaryNavItems: [
    {
      name: 'Settings',
      url: '/setting',
      icon: SettingsIcon
    }
  ]
}
