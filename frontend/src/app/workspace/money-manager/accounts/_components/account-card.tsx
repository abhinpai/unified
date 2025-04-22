import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { getIndicatorColor } from '@/lib/get-account-indicator-color'
import { Currencies } from '@/types/Currencies.type'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

export interface AccountCardProps {
  accountType: string
  currency: Currencies
  accountNumber: string
  accountName: string
  balance: number
  lastTransactionDate: string
  onEdit?: () => void
  onDelete?: () => void
}

export function AccountCard({
  accountType,
  currency,
  accountNumber,
  accountName,
  balance,
  lastTransactionDate,
  onEdit,
  onDelete
}: AccountCardProps) {
  return (
    <Card className='@container/card gap-2'>
      <CardHeader className=' relative'>
        <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <Badge variant='outline'>
            <span
              className={`w-2 h-2 rounded ${getIndicatorColor(accountType)}`}
            ></span>
            {accountType}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className='text-destructive'>
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <CardTitle className='@[250px]/card:text-xl text-md font-semibold tabular-nums flex items-center gap-2'>
            {accountName}
            <Badge variant='outline'>{currency}</Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          <p>{accountNumber}</p>
        </div>
        <h2 className='font-bold @[250px]/card:text-4xl text-3xl py-3'>
          {balance}
        </h2>
      </CardContent>
      <CardFooter>
        <p className='text-xs text-muted-foreground'>
          Last transaction:{' '}
          {new Date(lastTransactionDate).toLocaleString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </p>
      </CardFooter>
    </Card>
  )
}
