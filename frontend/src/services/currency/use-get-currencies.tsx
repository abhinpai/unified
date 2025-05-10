import { useQuery } from '@tanstack/react-query'
import { currencyService } from './currencyService'

export const useGetCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: async () => await currencyService.getCurrencies(),
    refetchOnWindowFocus: false,
    retry: 1
  })
}
