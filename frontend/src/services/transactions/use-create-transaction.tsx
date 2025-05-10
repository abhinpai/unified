import { CreateTransactionDTO } from '@/types/transaction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from './transactionService'

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateTransactionDTO[]) => {
      return await transactionService.createTransaction(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    }
  })
}
