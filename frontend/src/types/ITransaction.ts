import { Transaction_Type } from '@/lib/data/transaction_types'
import { IAccount } from './IAccount'
import { ICategory } from './ICategory'
import { ICurrency } from './ICurrency'

export interface ITransaction {
  id: string
  type: Transaction_Type
  name: string
  amount: number
  account: IAccount
  currency: ICurrency
  category: ICategory
  transaction_datetime: string
  description?: string
  is_credited: boolean
  is_debited: boolean
  created_at?: string
  user_id: string
  ref_id?: string
  self_ref_id?: string
}
