'use client'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { AccountCard, Currencies } from './_components/account-card'

class AccountTypes {
  static Saving = 'Saving'
  static Checking = 'Checking'
  static CreditCard = 'Credit Card'
  static DebitCard = 'Debit Card'
  static Investment = 'Investment'
  static LoanDebt = 'Loan/Debt'
}

const MockData: {
  accountType: string
  currency: Currencies
  accountNumber: string
  accountName: string
  balance: string
  lastTransactionDate: string
}[] = [
  {
    accountType: AccountTypes.Saving,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Bank Of America',
    balance: '$125,251',
    lastTransactionDate: '2023-10-01'
  },
  {
    accountType: AccountTypes.Checking,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Chase Bank',
    balance: '$50,000',
    lastTransactionDate: '2023-10-01'
  },
  {
    accountType: AccountTypes.CreditCard,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'American Express',
    balance: '$10,000',
    lastTransactionDate: '2023-10-01'
  },
  {
    accountType: AccountTypes.DebitCard,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Wells Fargo',
    balance: '$5,000',
    lastTransactionDate: '2023-10-01'
  },
  {
    accountType: AccountTypes.Investment,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Fidelity',
    balance: '$100,000',
    lastTransactionDate: '2023-10-01'
  },
  {
    accountType: AccountTypes.LoanDebt,
    currency: 'USD',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Student Loan',
    balance: '$20,000',
    lastTransactionDate: '2023-10-01'
  },
  {
    accountType: AccountTypes.Saving,
    currency: 'INR',
    accountNumber: '*****-****-*****-1547',
    accountName: 'HDFC Bank',
    balance: '₹125,251',
    lastTransactionDate: '2023-10-01'
  },
  {
    accountType: AccountTypes.Checking,
    currency: 'INR',
    accountNumber: '*****-****-*****-1547',
    accountName: 'ICICI Bank',
    balance: '₹50,000',
    lastTransactionDate: '2023-10-01'
  },
  {
    accountType: AccountTypes.CreditCard,
    currency: 'INR',
    accountNumber: '*****-****-*****-1547',
    accountName: 'Axis Bank',
    balance: '₹10,000',
    lastTransactionDate: '2023-10-01'
  }
]

const AccountPage = () => {
  const [selectedTab, setSelectedTab] = useState('all')

  const onAddAccount = () => {
    console.log('Add account clicked')
  }

  const onTabChange = (value: string) => {
    setSelectedTab(value)
    console.log('Tab changed to:', value)
  }

  return (
    <div>
      <PageHeader
        title='Accounts'
        children={<Button onClick={onAddAccount}>Add</Button>}
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
        {Object.values(AccountTypes).map((type) => (
          <TabsContent value={type} key={type}>
            <div className='flex flex-1 flex-col'>
              <div className='@container/main flex flex-1 flex-col gap-2'>
                <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
                  <div className='*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card'>
                    {MockData.filter(
                      (x) =>
                        selectedTab === 'all' ||
                        (selectedTab !== 'all' && x.accountType === selectedTab)
                    ).map((account, index) => (
                      <AccountCard
                        key={index}
                        accountType={account.accountType}
                        currency={account.currency}
                        accountNumber={account.accountNumber}
                        accountName={account.accountName}
                        balance={account.balance}
                        lastTransactionDate={account.lastTransactionDate}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default AccountPage
