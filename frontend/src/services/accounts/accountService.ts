import { supabase } from '@/lib/supabase'
import { CreateAccountDTO, UpdateAccountDTO } from '@/types/account'
import { IAccount } from '@/types/IAccount'

export const accountService = {
  async getAccounts(userId: string): Promise<IAccount[]> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select(
          `
          *,
          currencies:currency_id (*)
        `
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching accounts:', error)
        throw error
      }
      // Map data to properly format the currency field
      const formattedAccounts =
        data?.map((account) => ({
          ...account,
          currency: account.currencies
        })) || []

      return formattedAccounts
    } catch (error) {
      console.error('Error in getAccounts:', error)
      throw error
    }
  },

  async getAccountById(id: string): Promise<IAccount | null> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching account by id:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in getAccountById:', error)
      throw error
    }
  },

  async createAccount(account: CreateAccountDTO): Promise<IAccount> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .insert([account])
        .select()
        .single()

      if (error) {
        console.error('Error creating account:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in createAccount:', error)
      throw error
    }
  },

  async updateAccount(
    id: number,
    updates: UpdateAccountDTO
  ): Promise<IAccount> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating account:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in updateAccount:', error)
      throw error
    }
  },

  async deleteAccount(id: number): Promise<void> {
    try {
      const { error } = await supabase.from('accounts').delete().eq('id', id)

      if (error) {
        console.error('Error deleting account:', error)
        throw error
      }
    } catch (error) {
      console.error('Error in deleteAccount:', error)
      throw error
    }
  },

  async getAccountsByType(userId: string, type: string): Promise<IAccount[]> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', userId)
        .eq('accountType', type)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching accounts by type:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Error in getAccountsByType:', error)
      throw error
    }
  }
}
