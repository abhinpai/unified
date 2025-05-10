import { supabase } from '@/lib/supabase'
import { ICurrency } from '@/types/ICurrency'

export const currencyService = {
  async getCurrencies(): Promise<ICurrency[]> {
    try {
      const { data, error } = await supabase.from('currencies').select('*')

      if (error) {
        console.error('Error fetching currencies:', error)
        throw error
      }
      return data || []
    } catch (error) {
      console.error('Error in getAccounts:', error)
      throw error
    }
  }
}
