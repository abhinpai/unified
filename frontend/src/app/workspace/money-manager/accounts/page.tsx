'use client'

import { LoadingCard } from '@/components/loading-card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/useAuth'
import { accountService } from '@/services/accounts/accountService'
import { useCreateAccount } from '@/services/accounts/use-create-account'
import { useEditAccount } from '@/services/accounts/use-edit-account'
import { useGetAccounts } from '@/services/accounts/use-get-accounts'
import { CreateAccountDTO } from '@/types/account'
import { Currencies } from '@/types/Currencies.type'
import { IAccount } from '@/types/IAccount'
import { useEffect, useState } from 'react'
import { AccountCard } from './_components/account-card'
import { AccountDialog } from './_components/account-dialog'

class AccountTypes {
  static Saving = 'Saving'
  static Checking = 'Checking'
  static CreditCard = 'Credit Card'
  static DebitCard = 'Debit Card'
  static Investment = 'Investment'
  static LoanDebt = 'Loan/Debt'
}

const AccountPage = () => {
  const [selectedTab, setSelectedTab] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<IAccount | undefined>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null)
  const { user } = useAuth()

  const {
    data: accounts,
    refetch: loadAccounts,
    isLoading
  } = useGetAccounts(user!.id)

  const {
    mutate: editAccount,
    isSuccess: isEditedAccountSuccessfully,
    isPending: isEditing
  } = useEditAccount()
  const {
    mutate: createAccount,
    isSuccess: isCreatedAccountSuccessfully,
    isPending: isCreating
  } = useCreateAccount()

  useEffect(() => {
    if (isEditedAccountSuccessfully || isCreatedAccountSuccessfully) {
      setDialogOpen(false)
      setSelectedAccount(undefined)
    }
  }, [isEditedAccountSuccessfully, isCreatedAccountSuccessfully])

  const handleCreateAccount = async (data: CreateAccountDTO) => {
    try {
      if (selectedAccount) {
        editAccount({
          accountId: selectedAccount.id,
          payload: {
            ...data
          }
        })
      } else {
        createAccount({ ...data })
      }
    } catch (error) {
      console.error('Error saving account:', error)
    }
  }

  const handleEditAccount = (account: IAccount) => {
    setSelectedAccount(account)
    setDialogOpen(true)
  }

  const handleDeleteAccount = async () => {
    if (accountToDelete) {
      try {
        await accountService.deleteAccount(accountToDelete)
        setDeleteDialogOpen(false)
        setAccountToDelete(null)
        loadAccounts()
      } catch (error) {
        console.error('Error deleting account:', error)
      }
    }
  }

  const onTabChange = (value: string) => {
    setSelectedTab(value)
  }

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setSelectedAccount(undefined)
      setDialogOpen(false)
    } else {
      setDialogOpen(true)
    }
  }

  const filteredAccounts =
    selectedTab === 'all'
      ? accounts
      : accounts?.filter((account) => account.accountType === selectedTab)

  return (
    <div>
      <PageHeader
        title='Accounts'
        children={<Button onClick={() => setDialogOpen(true)}>Add</Button>}
      />

      <Tabs defaultValue={selectedTab} className='mt-6'>
        <TabsList>
          <TabsTrigger value={'all'} onClick={() => onTabChange('all')}>
            All
          </TabsTrigger>
          {Object.values(AccountTypes).map((type) => (
            <TabsTrigger
              key={type}
              value={type}
              onClick={() => onTabChange(type)}
            >
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value='all'>
          <div className='flex flex-1 flex-col'>
            <div className='@container/main flex flex-1 flex-col gap-2'>
              <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
                <div className='*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card'>
                  {isLoading ? (
                    Array(5)
                      .fill(1)
                      .map((_, index) => <LoadingCard key={index} />)
                  ) : filteredAccounts?.length === 0 ? (
                    <div>
                      <p>No accounts found!</p>
                    </div>
                  ) : (
                    filteredAccounts?.map((account) => (
                      <AccountCard
                        key={account.id}
                        accountType={account.accountType}
                        currency={account.currency as Currencies}
                        accountNumber={account.accountNumber}
                        accountName={account.accountName}
                        balance={account.balance}
                        lastTransactionDate={account.lastTransactionDate}
                        onEdit={() => handleEditAccount(account)}
                        onDelete={() => {
                          setAccountToDelete(account.id)
                          setDeleteDialogOpen(true)
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        {Object.values(AccountTypes).map((type) => (
          <TabsContent value={type} key={type}>
            <div className='flex flex-1 flex-col'>
              <div className='@container/main flex flex-1 flex-col gap-2'>
                <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
                  <div
                    className={
                      filteredAccounts?.length === 0
                        ? ''
                        : '*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card'
                    }
                  >
                    {isLoading ? (
                      Array(5)
                        .fill(1)
                        .map((_, index) => <LoadingCard key={index} />)
                    ) : filteredAccounts?.length === 0 ? (
                      <div className='p-4 w-full rounded bg-red-50 h-16 flex items-center'>
                        <span>No accounts found!</span>
                      </div>
                    ) : (
                      filteredAccounts?.map((account) => (
                        <AccountCard
                          key={account.id}
                          accountType={account.accountType}
                          currency={account.currency as Currencies}
                          accountNumber={account.accountNumber}
                          accountName={account.accountName}
                          balance={account.balance}
                          lastTransactionDate={account.lastTransactionDate}
                          onEdit={() => handleEditAccount(account)}
                          onDelete={() => {
                            setAccountToDelete(account.id)
                            setDeleteDialogOpen(true)
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <AccountDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        account={selectedAccount}
        onSubmit={handleCreateAccount}
        isLoading={isEditing || isCreating}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='!bg-red-800'
              onClick={handleDeleteAccount}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AccountPage
