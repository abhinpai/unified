import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { TrendingUpIcon } from 'lucide-react'

interface DashboardCardProps {
  title: string
  primaryAmount: string
  secondaryAmount: string
  percentagePattern: 'positive' | 'negative' | 'neutral'
  percentageChange: string
  trendPattern: 'positive' | 'negative' | 'neutral'
  trendText: string
  secondaryTrendText?: string
  classNames?: string
}

export const DashboardCard = ({
  title,
  primaryAmount,
  secondaryAmount,
  percentagePattern,
  percentageChange,
  trendPattern,
  trendText,
  secondaryTrendText,
  classNames
}: DashboardCardProps) => {
  return (
    <Card className={`@container/card ${classNames}`}>
      <CardHeader className='relative'>
        <CardDescription>{title}</CardDescription>
        <CardTitle className='font-semibold tabular-nums gap-1'>
          <span className='@[250px]/card:text-3xl text-2xl'>
            {primaryAmount}
          </span>
          <span className='@[250px]/card:text-md text-sm text-gray-400 flex felx-col'>
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
      <CardFooter className='flex-col items-start gap-1 text-sm'>
        <div
          className={`line-clamp-1 flex gap-2 font-medium ${
            trendPattern === 'positive'
              ? 'text-green-800'
              : trendPattern === 'negative'
              ? 'text-red-800'
              : 'text-muted-foreground'
          } `}
        >
          {trendText} <TrendingUpIcon className='size-4' />
        </div>
        {secondaryTrendText && (
          <div className='text-muted-foreground'>{secondaryTrendText}</div>
        )}
      </CardFooter>
    </Card>
  )
}
