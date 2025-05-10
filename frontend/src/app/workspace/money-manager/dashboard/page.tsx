'use client'

import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range'
import { PageHeader } from '@/components/ui/page-header'
import { BalanceCard } from './_components/balance_card'
import { DashboardCard } from './_components/dashboard_card'
import { LatestExpenseTransactionsCard } from './_components/latest_expense_transactions_card'
import { MoneyStatChart } from './_components/money_stat_chart'

const DashboardPage = () => {
  return (
    <div>
      <PageHeader
        title='Dashboard'
        alertTitle='Welcome to your dashboard'
        alertContent='Here you can find all your financial information at a glance. Use the filters to customize your view and get the most out of your data.'
      >
        <div className='flex gap-4'>
          <DatePickerWithRange />
          <Button className=''>Add</Button>
        </div>
      </PageHeader>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='*:data-[slot=card]:shadow-xs @xl/main:grid-cols-3 @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card'>
              <BalanceCard
                title='Total Balance'
                primaryAmount='$85,250.00'
                secondaryAmount='₹30,00,000.00'
                percentagePattern='positive'
                percentageChange='+12.5%'
                incomeAmount='$50,000.00'
                investmentAmount='$35,250.00'
              />
              <DashboardCard
                title='Total Income'
                primaryAmount='$50,000.00'
                secondaryAmount='₹15,000'
                percentagePattern='positive'
                percentageChange='+12.5%'
                trendPattern='positive'
                trendText='Strong user retention'
                secondaryTrendText='Engagement exceed targets'
              />
              <DashboardCard
                title='Total Expenses'
                primaryAmount='$5,250.00'
                secondaryAmount='₹15,000'
                percentagePattern='negative'
                percentageChange='-20%'
                trendPattern='negative'
                trendText='Acquisition needs attention'
                secondaryTrendText='Engagement exceed targets'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-4 grid-flow-col gap-4'>
        <MoneyStatChart classNames='col-span-3' />
        <LatestExpenseTransactionsCard classNames='col-span-1' />
      </div>
    </div>
  )
}

export default DashboardPage
