import { UpdateTransactionDTO } from '@/types/transaction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from './transactionService'

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateTransaction'],
    mutationFn: async ({
      id,
      transaction
    }: {
      id: string
      transaction: UpdateTransactionDTO
    }) => await transactionService.updateTransaction(id, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
    onError: (error) => {
      console.error('Error updating transaction:', error)
    }
  })
}
