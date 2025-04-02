import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LatestExpenseTransactionsCardProps {
  classNames?: string
}

export const LatestExpenseTransactionsCard: React.FC<
  LatestExpenseTransactionsCardProps
> = ({ classNames }) => {
  return (
    <Card className={`@container/card ${classNames}`}>
      <CardHeader className='relative'>
        <CardTitle className='font-semibold tabular-nums gap-1'>
          Latest Expense Transactions
        </CardTitle>
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  )
}
