import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { CreateAccountDTO } from '@/types/account'
import { IAccount } from '@/types/IAccount'
import { AccountForm } from './account-form'

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
          onCancel={() => handleOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
