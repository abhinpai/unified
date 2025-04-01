import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export type Currencies = 'USD' | 'INR' | 'EUR'

interface AccountCardProps {
  accountType: string
  currency: Currencies
  accountNumber: string
  accountName: string
  balance: string
  lastTransactionDate: string
}

export const AccountCard = ({
  accountType,
  accountNumber,
  accountName,
  balance,
  currency,
  lastTransactionDate
}: AccountCardProps) => {
  const getIndicatorColor = () => {
    switch (accountType) {
      case 'Saving':
        return 'bg-green-700'
      case 'Checking':
        return 'bg-blue-700'
      case 'Credit Card':
        return 'bg-red-700'
      case 'Debit Card':
        return 'bg-yellow-700'
      case 'Investment':
        return 'bg-purple-700'
      case 'Loan/Debt':
        return 'bg-orange-700'
      default:
        return 'bg-gray-700'
    }
  }

  return (
    <Card className='@container/card gap-2'>
      <CardHeader className='relative'>
        <CardDescription className='flex items-center justify-between'>
          <Badge variant='outline'>
            <span className={`w-2 h-2 rounded ${getIndicatorColor()}`}></span>
            {accountType}
          </Badge>
          <Badge variant='outline'>{currency}</Badge>
        </CardDescription>
        <CardTitle className='@[250px]/card:text-xl text-md font-semibold tabular-nums'>
          {accountName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          <p>{accountNumber}</p>
        </div>
      </CardContent>
      <CardFooter className='flex-col items-start gap-1 text-sm'>
        <h2 className='font-bold @[250px]/card:text-3xl text-2xl py-3'>
          {balance}
        </h2>
        <div className='text-muted-foreground'>
          Last Transaction At: {lastTransactionDate}
        </div>
      </CardFooter>
    </Card>
  )
}
