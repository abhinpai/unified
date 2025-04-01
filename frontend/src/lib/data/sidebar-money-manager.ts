import { ISidebar } from '@/types/ISidebar'
import {
  ArrowLeftRightIcon,
  CalculatorIcon,
  ClipboardListIcon,
  ComponentIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  SquareUserRoundIcon
} from 'lucide-react'

export const SIDEBAR_MONEY_MANAGER: ISidebar = {
  workspace: 'Money Manager',
  workspacePath: 'money-manager',
  primaryNavItemTitle: '',
  secondaryNavItemTitle: 'Foundational',
  defaultRoute: 'dashboard',
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
      title: 'Reports',
      url: '/reports',
      isRoot: false,
      icon: ClipboardListIcon,
      isActive: false
    }
  ],
  secondaryNavItems: [
    {
      name: 'Accounts',
      url: '/accounts',
      icon: SquareUserRoundIcon,
      isActive: false
    },
    {
      name: 'Budget',
      url: '/budget',
      icon: CalculatorIcon,
      isActive: false
    },
    {
      name: 'Category',
      url: '/category',
      icon: ComponentIcon,
      isActive: false
    }
  ],
  tertiaryNavItems: [
    {
      name: 'Settings',
      url: '/setting',
      icon: SettingsIcon,
      isActive: false
    }
  ]
}
