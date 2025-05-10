import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { ITransaction } from '@/types/ITransaction'
import { format } from 'date-fns'

interface ViewTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction?: ITransaction | null
}

export function ViewTransactionDialog({
  open,
  onOpenChange,
  transaction
}: ViewTransactionDialogProps) {
  if (!transaction) return null

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onOpenChange(false)
    } else {
      onOpenChange(true)
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>Viewing transaction information</DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <div className='font-semibold text-right'>Name:</div>
            <div className='col-span-3'>{transaction.name}</div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <div className='font-semibold text-right'>Type:</div>
            <div className='col-span-3 capitalize'>{transaction.type}</div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <div className='font-semibold text-right'>Amount:</div>
            <div className='col-span-3 font-medium'>
              <span
                className={
                  transaction.is_debited ? 'text-red-800' : 'text-green-800'
                }
              >
                {transaction.is_debited ? '-' : ''}
                {formatCurrency(transaction.amount, transaction.currency.name)}
              </span>
            </div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <div className='font-semibold text-right'>Account:</div>
            <div className='col-span-3'>{transaction.account.accountName}</div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <div className='font-semibold text-right'>Category:</div>
            <div className='col-span-3 flex items-center gap-2'>
              <span
                className='w-3 h-3 rounded-full'
                style={{
                  backgroundColor: transaction.category.indicatorColor
                }}
              />
              {transaction.category.name}
            </div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <div className='font-semibold text-right'>Date:</div>
            <div className='col-span-3'>
              {format(new Date(transaction.transaction_datetime), 'PPP')}
            </div>
          </div>
          {transaction.description && (
            <div className='grid grid-cols-4 items-center gap-4'>
              <div className='font-semibold text-right'>Description:</div>
              <div className='col-span-3'>{transaction.description}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
