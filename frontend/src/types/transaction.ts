import { ITransaction } from './ITransaction'

interface ICreateTransactionDTO
  extends Omit<
    ITransaction,
    'id' | 'created_at' | 'currency' | 'account' | 'category'
  > {
  account_id: number
  currency_id: number
  category_id: number
}

export type CreateTransactionDTO = ICreateTransactionDTO
export type UpdateTransactionDTO = Partial<CreateTransactionDTO>
