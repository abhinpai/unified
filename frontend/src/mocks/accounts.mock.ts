import { AccountTypes, IAccount } from './../types/IAccount'

export const MOCK_ACCOUNTS: IAccount[] = [
  {
    id: '1',
    accountType: AccountTypes.Saving,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Bank Of America',
    balance: 125251,
    lastTransactionDate: '2023-10-01',
    user_id: '9a3250b1-5ab1-440b-a9d6-34e19f457a4b'
  },
  {
    id: '2',
    accountType: AccountTypes.Checking,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Chase Bank',
    balance: 50000,
    lastTransactionDate: '2023-10-01',
    user_id: '9a3250b1-5ab1-440b-a9d6-34e19f457a4b'
  },
  {
    id: '3',
    accountType: AccountTypes.CreditCard,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'American Express',
    balance: 10000,
    lastTransactionDate: '2023-10-01',
    user_id: '9a3250b1-5ab1-440b-a9d6-34e19f457a4b'
  },
  {
    id: '4',
    accountType: AccountTypes.DebitCard,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Wells Fargo',
    balance: 5000,
    lastTransactionDate: '2023-10-01',
    user_id: '9a3250b1-5ab1-440b-a9d6-34e19f457a4b'
  },
  {
    id: '5',
    accountType: AccountTypes.Investment,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Fidelity',
    balance: 100000,
    lastTransactionDate: '2023-10-01',
    user_id: '9a3250b1-5ab1-440b-a9d6-34e19f457a4b'
  },
  {
    id: '6',
    accountType: AccountTypes.LoanDebt,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Student Loan',
    balance: 20000,
    lastTransactionDate: '2023-10-01',
    user_id: '9a3250b1-5ab1-440b-a9d6-34e19f457a4b'
  },
  {
    id: '7',
    accountType: AccountTypes.Saving,
    currency: 'INR',
    accountNumber: '*****-****-*****-1547',
    accountName: 'HDFC Bank',
    balance: 125251,
    lastTransactionDate: '2023-10-01',
    user_id: '9a3250b1-5ab1-440b-a9d6-34e19f457a4b'
  },
  {
    id: '8',
    accountType: AccountTypes.Checking,
    currency: 'INR',
    accountNumber: '*****-****-*****-1547',
    accountName: 'ICICI Bank',
    balance: 50000,
    lastTransactionDate: '2023-10-01',
    user_id: '9a3250b1-5ab1-440b-a9d6-34e19f457a4b'
  },
  {
    id: '9',
    accountType: AccountTypes.CreditCard,
    currency: 'INR',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Axis Bank',
    balance: 10000,
    lastTransactionDate: '2023-10-01',
    user_id: '9a3250b1-5ab1-440b-a9d6-34e19f457a4b'
  }
]
