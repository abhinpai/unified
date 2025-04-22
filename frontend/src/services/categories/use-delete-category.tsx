import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from './categoryService'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteCategory'],
    mutationFn: async (id: number) => await categoryService.deleteCategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (error) => {
      console.error('Error deleting category:', error)
    }
  })
}
