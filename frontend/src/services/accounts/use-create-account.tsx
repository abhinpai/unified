import { CreateAccountDTO } from '@/types/account'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accountService } from './accountService'

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createAccount'],
    mutationFn: async (payload: CreateAccountDTO) =>
      await accountService.createAccount(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
    onError: (error) => {
      console.error('Error creating account:', error)
    }
  })
}
