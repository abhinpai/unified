import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Separator } from '@radix-ui/react-separator'
import { TrendingUpIcon } from 'lucide-react'
import React from 'react'

interface BalanceCardProps {
  title: string
  primaryAmount: string
  secondaryAmount: string
  percentagePattern: 'positive' | 'negative' | 'neutral'
  percentageChange: string
  incomeAmount: string
  investmentAmount: string
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  title,
  primaryAmount,
  secondaryAmount,
  percentagePattern,
  percentageChange,
  incomeAmount,
  investmentAmount
}) => {
  return (
    <Card className='@container/card'>
      <CardHeader className='relative'>
        <CardDescription>{title}</CardDescription>
        <CardTitle className='flex flex-col gap-1 font-semibold tabular-nums'>
          <span className='@[250px]/card:text-3xl text-2xl'>
            {primaryAmount}
          </span>
          <span className='@[250px]/card:text-md text-sm text-gray-400'>
            {secondaryAmount}
          </span>
        </CardTitle>

        <div className='absolute right-4 top-0'>
          <Badge
            variant='outline'
            className={`flex gap-1 rounded-lg text-xs ${
              percentagePattern === 'positive'
                ? 'text-green-800 bg-green-200'
                : 'text-red-800 bg-red-200'
            }`}
          >
            <TrendingUpIcon className='size-3' />
            {percentageChange}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className='flex flex-row items-start gap-4 text-sm'>
        <div>
          <p className='text-muted-foreground'>Income</p>
          <span className='font-semibold'>{incomeAmount}</span>
        </div>
        <Separator orientation='vertical' />
        <div>
          <p className='text-muted-foreground'>Investment</p>
          <span className='font-semibold'>{investmentAmount}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
