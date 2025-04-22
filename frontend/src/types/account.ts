import { IAccount } from "./IAccount"

export type CreateAccountDTO = Omit<IAccount, 'id' | 'created_at' | 'updated_at' | 'lastTransactionDate'>
export type UpdateAccountDTO = Partial<CreateAccountDTO> 