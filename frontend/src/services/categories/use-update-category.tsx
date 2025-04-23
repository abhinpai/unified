import { CreateCategoryDTO } from '@/types/category'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from './categoryService'

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateCategory'],
    mutationFn: async ({
      id,
      payload
    }: {
      id: number
      payload: Partial<CreateCategoryDTO>
    }) => await categoryService.updateCategory(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (error) => {
      console.error('Error updating category:', error)
    }
  })
}
