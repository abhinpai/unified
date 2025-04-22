import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { CreateAccountDTO } from '@/types/account'
import { IAccount } from '@/types/IAccount'
import { useEffect } from 'react'

interface AccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  account?: IAccount
  onSubmit: (data: CreateAccountDTO) => void
  isLoading?: boolean
}

export function AccountDialog({
  open,
  onOpenChange,
  account,
  onSubmit,
  isLoading
}: AccountDialogProps) {
  // Cleanup when dialog closes
  useEffect(() => {
    if (!open) {
      // Reset form state when dialog closes
      const form = document.querySelector('form')
      if (form) {
        form.reset()
      }
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {account ? 'Edit Account' : 'Create New Account'}
          </DialogTitle>
          <DialogDescription>
            {account
              ? 'Make changes to your account here.'
              : 'Fill in the details to create a new account.'}
          </DialogDescription>
        </DialogHeader>
        <AccountForm
          account={account}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
