'use client'

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
import { accountService } from '@/services/accountService'
import { CreateAccountDTO } from '@/types/account'
import { Currencies } from '@/types/Currencies.type'
import { IAccount } from '@/types/IAccount'
import { useEffect, useState } from 'react'
import { AccountCard } from './_components/account-card'
import { CreateAccountDialog } from './_components/create-account-dialog'

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
  const [accounts, setAccounts] = useState<IAccount[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<IAccount | undefined>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user?.id) {
      loadAccounts()
    }
  }, [user?.id])

  const loadAccounts = async () => {
    try {
      const data = await accountService.getAccounts(user!.id)
      setAccounts(data)
    } catch (error) {
      console.error('Error loading accounts:', error)
    }
  }

  const handleCreateAccount = async (data: CreateAccountDTO) => {
    try {
      if (selectedAccount) {
        await accountService.updateAccount(selectedAccount.id, data)
      } else {
        await accountService.createAccount({ ...data })
      }
      setDialogOpen(false)
      setSelectedAccount(undefined)
      loadAccounts()
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

  const filteredAccounts =
    selectedTab === 'all'
      ? accounts
      : accounts.filter((account) => account.accountType === selectedTab)

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
                  {filteredAccounts.map((account) => (
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
                  ))}
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
                  <div className='*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card'>
                    {filteredAccounts.map((account) => (
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <CreateAccountDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        account={selectedAccount}
        onSubmit={handleCreateAccount}
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
            <AlertDialogAction onClick={handleDeleteAccount}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AccountPage
