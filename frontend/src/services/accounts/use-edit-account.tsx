import { UpdateAccountDTO } from '@/types/account'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accountService } from './accountService'

export const useEditAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['editAccount'],
    mutationFn: async ({
      accountId,
      payload
    }: {
      accountId: string
      payload: UpdateAccountDTO
    }) => await accountService.updateAccount(accountId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
    onError: (error) => {
      console.error('Error editing account:', error)
    }
  })
}
