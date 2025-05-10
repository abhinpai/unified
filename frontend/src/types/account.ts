import { IAccount } from './IAccount'

interface ICreateAccountDTO
  extends Omit<
    IAccount,
    'id' | 'created_at' | 'updated_at' | 'lastTransactionDate' | 'currency'
  > {
  currency_id: number
}

export type CreateAccountDTO = ICreateAccountDTO
export type UpdateAccountDTO = Partial<CreateAccountDTO>
