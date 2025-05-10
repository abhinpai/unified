import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ITransaction } from '@/types/ITransaction'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export const getTransactionColumns = (
  setDeleteTransaction: Dispatch<SetStateAction<ITransaction | null>>,
  setViewTransaction: Dispatch<SetStateAction<ITransaction | null>>,
  setEditTransaction: Dispatch<SetStateAction<ITransaction | null>>
): ColumnDef<ITransaction>[] => [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          className='!pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          className='!pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const isDebited = row.original.is_debited

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: row.original.currency.name
      }).format(amount)

      return (
        <div
          className={cn(
            'font-medium',
            isDebited ? 'text-red-800 font-bold' : 'text-green-800 font-bold'
          )}
        >
          {isDebited ? `-${formatted}` : formatted}
        </div>
      )
    }
  },
  {
    accessorKey: 'account',
    header: 'Account',
    cell: ({ row }) => row.original.account.accountName
  },
  {
    accessorKey: 'transaction_datetime',
    header: ({ column }) => {
      return (
        <Button
          className='!pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Transaction Date
          <ArrowUpDown className='h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <span>
          {new Date(row.original.transaction_datetime).toDateString()}
        </span>
      )
    }
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          className='!pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className='capitalize flex flex-row gap-2 items-center'>
          <span
            className='w-3 h-3 rounded-full'
            style={{ backgroundColor: row.original.category.indicatorColor }}
          />
          {row.original.category.name}
        </div>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setViewTransaction(row.original)}>
              <Eye className='mr-2 h-4 w-4' />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditTransaction(row.original)}>
              <Pencil className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-destructive hover:bg-red-500 !hover:text-destructive'
              onClick={() => setDeleteTransaction(row.original)}
            >
              <Trash2 className='mr-2 h-4 w-4 text-destructive' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
