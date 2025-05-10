/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase'
import { ITransaction } from '@/types/ITransaction'
import { CreateTransactionDTO, UpdateTransactionDTO } from '@/types/transaction'

class TransactionService {
  async createTransaction(
    transactions: CreateTransactionDTO[]
  ): Promise<ITransaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transactions)
      .select(
        `
        *,
        accounts:account_id(*),
        categories:category_id(*),
        currencies:currency_id(*)
      `
      )

    if (error) {
      console.error('Error creating transaction:', error)
      throw error
    }

    return data.map((transaction) => formatTransaction(transaction)) || []
  }

  async createBulkTransactions(
    transactions: CreateTransactionDTO[]
  ): Promise<ITransaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transactions)
      .select(
        `
        *,
        accounts:account_id(*),
        categories:category_id(*),
        currencies:currency_id(*)
      `
      )

    if (error) {
      console.error('Error creating bulk transactions:', error)
      throw error
    }

    return data.map((transaction) => formatTransaction(transaction)) || []
  }

  async updateTransaction(
    id: string,
    transaction: UpdateTransactionDTO
  ): Promise<ITransaction> {
    const { data, error } = await supabase
      .from('transactions')
      .update(transaction)
      .eq('id', id)
      .select(
        `
        *,
        accounts:account_id(*),
        categories:category_id(*),
        currencies:currency_id(*)
      `
      )
      .single()

    if (error) {
      console.error('Error updating transaction:', error)
      throw error
    }

    return formatTransaction(data)
  }
  async deleteTransaction(transaction: ITransaction): Promise<void> {
    const [mainResult, refResult] = await Promise.all([
      supabase.from('transactions').delete().eq('id', transaction.id),
      supabase
        .from('transactions')
        .delete()
        .eq('self_ref_id', transaction.ref_id)
    ])

    if (mainResult.error || refResult.error) {
      console.error(
        'Error deleting transaction:',
        mainResult.error || refResult.error
      )
      throw mainResult.error || refResult.error
    }
  }

  async getTransaction(id: string): Promise<ITransaction> {
    const { data, error } = await supabase
      .from('transactions')
      .select(
        `
        *,
        accounts:account_id(*),
        categories:category_id(*),
        currencies:currency_id(*)
      `
      )
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error getting transaction:', error)
      throw error
    }

    return formatTransaction(data)
  }

  async getTransactions(userId: string): Promise<ITransaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select(
        `
        *,
        accounts:account_id(*),
        categories:category_id(*),
        currencies:currency_id(*)
      `
      )
      .eq('user_id', userId)
      .order('transaction_datetime', { ascending: false })

    if (error) {
      console.error('Error getting transactions:', error)
      throw error
    }

    return data.map((x) => formatTransaction(x)) || []
  }
}

const formatTransaction = (transaction: any) => {
  const result = {
    ...transaction,
    currency: transaction.currencies,
    account: transaction.accounts,
    category: transaction.categories
  }
  delete result.accounts
  delete result.categories
  delete result.currencies
  delete result.account_id
  delete result.category_id
  delete result.currency_id
  return result
}
export const transactionService = new TransactionService()
