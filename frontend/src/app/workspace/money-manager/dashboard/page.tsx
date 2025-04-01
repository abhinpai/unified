'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range'
import { PageHeader } from '@/components/ui/page-header'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

const DashboardPage = () => {
  return (
    <div>
      <PageHeader
        title='Dashboard'
        children={
          <div className='flex gap-4'>
            <DatePickerWithRange />
            <Button className=''>
              Add
            </Button>
          </div>
        }
      />
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card'>
              <Card className='@container/card'>
                <CardHeader className='relative'>
                  <CardDescription>Total Revenue</CardDescription>
                  <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
                    $1,250.00
                  </CardTitle>
                  <div className='absolute right-4 top-4'>
                    <Badge
                      variant='outline'
                      className='flex gap-1 rounded-lg text-xs'
                    >
                      <TrendingUpIcon className='size-3' />
                      +12.5%
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Trending up this month <TrendingUpIcon className='size-4' />
                  </div>
                  <div className='text-muted-foreground'>
                    Visitors for the last 6 months
                  </div>
                </CardFooter>
              </Card>
              <Card className='@container/card'>
                <CardHeader className='relative'>
                  <CardDescription>New Customers</CardDescription>
                  <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
                    1,234
                  </CardTitle>
                  <div className='absolute right-4 top-4'>
                    <Badge
                      variant='outline'
                      className='flex gap-1 rounded-lg text-xs'
                    >
                      <TrendingDownIcon className='size-3' />
                      -20%
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Down 20% this period <TrendingDownIcon className='size-4' />
                  </div>
                  <div className='text-muted-foreground'>
                    Acquisition needs attention
                  </div>
                </CardFooter>
              </Card>
              <Card className='@container/card'>
                <CardHeader className='relative'>
                  <CardDescription>Active Accounts</CardDescription>
                  <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
                    45,678
                  </CardTitle>
                  <div className='absolute right-4 top-4'>
                    <Badge
                      variant='outline'
                      className='flex gap-1 rounded-lg text-xs'
                    >
                      <TrendingUpIcon className='size-3' />
                      +12.5%
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Strong user retention <TrendingUpIcon className='size-4' />
                  </div>
                  <div className='text-muted-foreground'>
                    Engagement exceed targets
                  </div>
                </CardFooter>
              </Card>
              <Card className='@container/card'>
                <CardHeader className='relative'>
                  <CardDescription>Growth Rate</CardDescription>
                  <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
                    4.5%
                  </CardTitle>
                  <div className='absolute right-4 top-4'>
                    <Badge
                      variant='outline'
                      className='flex gap-1 rounded-lg text-xs'
                    >
                      <TrendingUpIcon className='size-3' />
                      +4.5%
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Steady performance <TrendingUpIcon className='size-4' />
                  </div>
                  <div className='text-muted-foreground'>
                    Meets growth projections
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
