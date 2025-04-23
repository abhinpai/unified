import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { CreateCategoryDTO } from '@/types/category'
import { ICategory } from '@/types/ICategory'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Category name must be at least 2 characters.'
  }),
  description: z.string(),
  indicatorColor: z.string({
    required_error: 'Please select or add indicator color hex code'
  })
})

interface CategoryFormProps {
  category?: ICategory
  onSubmit: (data: CreateCategoryDTO) => void
  onCancel: () => void
  isLoading?: boolean
}

export function CategoryForm({
  category,
  onSubmit,
  onCancel,
  isLoading
}: CategoryFormProps) {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
      indicatorColor: category?.indicatorColor || '#000000'
    }
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    if (!user?.id) {
      console.error('User not authenticated')
      return
    }

    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      const submitData: CreateCategoryDTO = {
        name: values.name,
        description: values.description,
        indicatorColor: values.indicatorColor,
        user_id: user?.id || ''
      }

      await onSubmit(submitData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter category name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder='Enter description number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='indicatorColor'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indicator Color</FormLabel>
              <Input type='color' {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end space-x-2'>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            disabled={isSubmitting || isLoading}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isSubmitting || isLoading}>
            {category ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
