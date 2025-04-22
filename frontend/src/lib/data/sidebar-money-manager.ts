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
      icon: LayoutDashboardIcon
    },
    {
      title: 'Transaction',
      isRoot: true,
      url: '/transaction',
      icon: ArrowLeftRightIcon,
      items: [
        {
          title: 'Incomes',
          url: '/transaction/income'
        },
        {
          title: 'Expenses',
          url: '/transaction/expenses'
        },
        {
          title: 'Investments',
          url: '/transaction/investment'
        },
        {
          title: 'Subscriptions',
          url: '/transaction/subscriptions'
        },
        {
          title: 'Transfer',
          url: '/transaction/transfer'
        }
      ]
    },
    {
      title: 'Reports',
      url: '/reports',
      isRoot: false,
      icon: ClipboardListIcon
    }
  ],
  secondaryNavItems: [
    {
      name: 'Accounts',
      url: '/accounts',
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
