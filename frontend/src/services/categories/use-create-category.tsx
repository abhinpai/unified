import { CreateCategoryDTO } from '@/types/category'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from './categoryService'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createCategory'],
    mutationFn: async (payload: CreateCategoryDTO) =>
      await categoryService.createCategory(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (error) => {
      console.error('Error creating category:', error)
    }
  })
}
