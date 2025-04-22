import { AccountTypes } from "@/types/IAccount"

export const getIndicatorColor = (accountType: AccountTypes) => {
    switch (accountType) {
      case 'Saving':
        return 'bg-green-700'
      case 'Checking':
        return 'bg-blue-700'
      case 'Credit Card':
        return 'bg-red-700'
      case 'Debit Card':
        return 'bg-yellow-700'
      case 'Investment':
        return 'bg-purple-700'
      case 'Loan/Debt':
        return 'bg-orange-700'
      default:
        return 'bg-gray-700'
    }
  }