import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { CreateCategoryDTO } from '@/types/category'
import { ICategory } from '@/types/ICategory'
import { CategoryForm } from './category-form'

interface CategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: ICategory
  onSubmit: (data: CreateCategoryDTO) => void
  isLoading?: boolean
}

export function CategoryDialog({
  open,
  onOpenChange,
  category,
  onSubmit,
  isLoading
}: CategoryDialogProps) {
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Ensure we clean up any pending state before closing
      onOpenChange(false)
    } else {
      onOpenChange(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {category ? 'Edit Category' : 'Add New Category'}
          </DialogTitle>
          <DialogDescription>
            {category
              ? 'Make changes to your category here.'
              : 'Fill in the details to create add a category.'}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          category={category}
          onSubmit={onSubmit}
          onCancel={() => handleOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
