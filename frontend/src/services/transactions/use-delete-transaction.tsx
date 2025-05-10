import { ITransaction } from '@/types/ITransaction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from './transactionService'

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTransaction'],
    mutationFn: async (transaction: ITransaction) =>
      await transactionService.deleteTransaction(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
    onError: (error) => {
      console.error('Error deleting transaction:', error)
    }
  })
}
