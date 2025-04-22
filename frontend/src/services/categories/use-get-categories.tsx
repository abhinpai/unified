import { useQuery } from '@tanstack/react-query'
import { categoryService } from './categoryService'

export const useGetCategories = (userId: string) => {
  return useQuery({
    queryKey: ['categories', userId],
    queryFn: async () => await categoryService.getCategories(userId)
  })
}
