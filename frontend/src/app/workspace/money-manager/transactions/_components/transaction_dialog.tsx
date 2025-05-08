import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { TransactionForm } from './transaction_form'

interface TransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  isLoading?: boolean
}

export function TransactionDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading
}: TransactionDialogProps) {
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
            {false ? 'Edit Transaction' : 'Add New Transaction'}
          </DialogTitle>
          <DialogDescription>
            {false
              ? 'Make changes to your category here.'
              : 'Fill in the details to add a Transaction.'}
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          onSubmit={onSubmit}
          onCancel={() => handleOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
