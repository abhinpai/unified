import { useQuery } from '@tanstack/react-query';
import { accountService } from './accountService';

export const useGetAccounts = (userId: string) => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => await accountService.getAccounts(userId),
    refetchOnWindowFocus: false,
    retry: 1
  })
}
