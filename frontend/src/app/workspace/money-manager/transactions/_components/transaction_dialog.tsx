import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ITransaction } from '@/types/ITransaction'
import { CreateTransactionDTO, UpdateTransactionDTO } from '@/types/transaction'
import { TransactionForm } from './transaction_form'

interface TransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (transactions: CreateTransactionDTO[]) => void
  onUpdate?: (id: string, transaction: UpdateTransactionDTO) => void
  transaction?: ITransaction,
  isLoading?: boolean
}

export function TransactionDialog({
  open,
  onOpenChange,
  onSubmit,
  onUpdate,
  transaction,
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
            {transaction ? 'Edit Transaction' : 'Add New Transaction'}
          </DialogTitle>
          <DialogDescription>
            {transaction
              ? 'Update the transaction details.'
              : 'Fill in the details to add a Transaction.'}
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          onSubmit={onSubmit}
          onUpdate={onUpdate}
          transaction={transaction}
          onCancel={() => handleOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
