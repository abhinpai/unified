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

interface CreateAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  account?: IAccount
  onSubmit: (data: CreateAccountDTO) => void
}

export function CreateAccountDialog({
  open,
  onOpenChange,
  account,
  onSubmit
}: CreateAccountDialogProps) {
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
        />
      </DialogContent>
    </Dialog>
  )
}
