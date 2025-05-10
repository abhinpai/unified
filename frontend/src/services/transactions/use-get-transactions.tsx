import { useQuery } from '@tanstack/react-query'
import { transactionService } from './transactionService'

export const useGetTransactions = (userId: string) => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => await transactionService.getTransactions(userId),
    refetchOnWindowFocus: false,
    retry: 1
  })
}
