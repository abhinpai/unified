import { ITransactionType } from '@/types/ITransactionType'

export type Transaction_Type = 'expenses' | 'income' | 'investment' | 'subscription' | 'transfer'

export const TRANSACTION_TYPE: ITransactionType[] = [
  {
    name: 'expenses',
    label: 'Expenses'
  },
  {
    name: 'income',
    label: 'Income'
  },
  {
    name: 'investment',
    label: 'Investment'
  },
  {
    name: 'subscription',
    label: 'Subscription'
  },
  {
    name: 'transfer',
    label: 'Transfer'
  }
]
