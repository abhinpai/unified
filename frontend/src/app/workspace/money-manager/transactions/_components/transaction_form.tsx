/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/hooks/useAuth'
import { TRANSACTION_TYPE } from '@/lib/data/transaction_types'
import { cn } from '@/lib/utils'
import { useGetAccounts } from '@/services/accounts/use-get-accounts'
import { useGetCategories } from '@/services/categories/use-get-categories'
import { ITransaction } from '@/types/ITransaction'
import { CreateTransactionDTO, UpdateTransactionDTO } from '@/types/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import * as z from 'zod'
import { transactionFormSchema } from './transaction_form_schema'

interface TransactionFormProps {
  onSubmit: (transactions: CreateTransactionDTO[]) => void
  onUpdate?: (id: string, transaction: UpdateTransactionDTO) => void
  transaction?: ITransaction
  onCancel: () => void
  isLoading?: boolean
}

export const TransactionForm = ({
  onSubmit,
  onUpdate,
  transaction,
  onCancel,
  isLoading
}: TransactionFormProps) => {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date>(
    transaction?.transaction_datetime
      ? new Date(transaction.transaction_datetime)
      : new Date()
  )
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: transaction?.type || 'expenses',
      name: transaction?.name || '',
      transaction_datetime:
        transaction?.transaction_datetime || new Date().toISOString(),
      amount: transaction?.amount || 0,
      description: transaction?.description || '',
      account_id: transaction?.account?.id || undefined,
      category_id: transaction?.category?.id || undefined,
      // For transfer and investment transactions
      from_account_id: undefined,
      to_account_id: undefined
    }
  })

  const watchType = form.watch('type')
  const watchAccountId = form.watch('account_id')
  const watchToAccountId = form.watch('to_account_id')
  const watchFromAccountId = form.watch('from_account_id')

  const { data: categories = [] } = useGetCategories(user?.id || '')
  const { data: accounts = [] } = useGetAccounts(user?.id || '')

  const fromAccountCurrency = useMemo(() => {
    if (!watchFromAccountId) return null
    return accounts.find((account) => account.id === watchFromAccountId)
      ?.currency.name
  }, [accounts, watchFromAccountId])

  const toAccountCurrency = useMemo(() => {
    if (!watchToAccountId) return null
    return accounts.find((account) => account.id === watchToAccountId)?.currency
      .name
  }, [accounts, watchToAccountId])

  // Find selected account to determine currency
  const selectedAccount = useMemo(() => {
    if (!watchAccountId) return null
    return accounts.find((account) => account.id === watchAccountId)
  }, [accounts, watchAccountId])

  // Update currency when account changes
  useEffect(() => {
    if (
      selectedAccount &&
      (watchType === 'expenses' || watchType === 'subscription')
    ) {
      form.setValue('currency_id', selectedAccount.currency.id)
    }
  }, [selectedAccount, form, watchType])

  // Update form when date changes
  useEffect(() => {
    if (date) {
      form.setValue('transaction_datetime', date.toISOString())
    }
  }, [date, form])

  // Less aggressive reset when transaction type changes
  useEffect(() => {
    // Only reset fields that aren't common across all transaction types
    // Don't reset name and amount as those are common in most transaction types
    if (watchType === 'transfer') {
      // Clear account_id and category_id when switching to transfer
      form.resetField('account_id')
      form.resetField('category_id')
    } else {
      // Clear transfer-specific fields when switching from transfer
      form.resetField('from_account_id')
      form.resetField('to_account_id')
    }

    // Always clear description when changing types (only needed for investment)
    if (watchType !== 'investment') {
      form.resetField('description')
    }

    // Clear category when switching to a type that doesn't need it
    if (watchType !== 'expenses' && watchType !== 'subscription') {
      form.resetField('category_id')
    }
  }, [watchType, form])

  // Handle form errors
  const handleFormErrors = (
    errors: FieldErrors<z.infer<typeof transactionFormSchema>>
  ) => {
    console.group('Form Validation Errors:')

    // Create an array to collect all error messages
    const errorMessages: string[] = []

    // Loop through each field with errors
    Object.entries(errors).forEach(([fieldName, error]) => {
      if (error) {
        console.error(`Field: ${fieldName}`, error)
        if (error.message) {
          errorMessages.push(`${fieldName}: ${error.message}`)
        }
      }
    })

    console.groupEnd()
  }

  async function handleSubmit(values: z.infer<typeof transactionFormSchema>) {
    if (!user?.id) {
      console.error('User not authenticated')
      return
    }

    if (isSubmitting) return

    try {
      setIsSubmitting(true)

      // Handle updating an existing transaction
      if (transaction && onUpdate) {
        // Create a base update payload with common fields
        const updatePayload: UpdateTransactionDTO = {
          transaction_datetime: values.transaction_datetime,
          amount: values.amount
        }

        // Add type-specific fields
        switch (values.type) {
          case 'expenses':
          case 'subscription':
            updatePayload.name = values.name
            updatePayload.account_id = values.account_id
            updatePayload.category_id = values.category_id
            break
          case 'income':
            updatePayload.name = 'Salary' // Fixed name for income
            updatePayload.account_id = values.account_id
            updatePayload.category_id = 6 // Fixed category ID for income
            break
          case 'transfer':
          case 'investment':
            updatePayload.name = values.name
            // For transfer/investment, determine which leg of the transaction this is
            if (transaction.is_debited) {
              updatePayload.account_id = values.from_account_id
            } else {
              updatePayload.account_id = values.to_account_id
            }

            if (values.description) {
              updatePayload.description = values.description
            }

            if (values.type === 'investment') {
              updatePayload.category_id = 7 // Investment category
            } else {
              updatePayload.category_id = 8 // Transfer category
            }
            break
        }

        await onUpdate(transaction.id, updatePayload)
        setIsSubmitting(false)
        return
      }

      // Create a base transaction object for new transactions
      const baseTransaction = {
        user_id: user.id,
        transaction_datetime: values.transaction_datetime,
        amount: values.amount,
        type: values.type
      }

      // Add type-specific fields
      const transactions: CreateTransactionDTO[] = []
      const from_account_ref_id = uuidv4()
      const to_account_ref_id = uuidv4()

      switch (values.type) {
        case 'expenses':
          transactions.push({
            ...baseTransaction,
            name: values.name,
            account_id: values.account_id,
            category_id: values.category_id,
            currency_id: selectedAccount?.currency.id || 1,
            is_credited: false,
            is_debited: true
          })
          break
        case 'income':
          transactions.push({
            ...baseTransaction,
            name: 'Salary',
            category_id: 6,
            account_id: values.account_id,
            currency_id: selectedAccount?.currency.id || 1,
            is_credited: true,
            is_debited: false
          })
          break
        case 'investment':
          transactions.push({
            ...baseTransaction,
            name: values.name,
            account_id: values.from_account_id,
            description: values.description || '',
            currency_id:
              accounts.find((x) => x.id === values.from_account_id)?.currency
                .id || 1,
            is_credited: false,
            is_debited: true,
            category_id: 7,
            self_ref_id: from_account_ref_id,
            ref_id: to_account_ref_id
          })

          transactions.push({
            ...baseTransaction,
            name: values.name,
            account_id: values.to_account_id,
            description: values.description || '',
            currency_id:
              accounts.find((x) => x.id === values.to_account_id)?.currency
                .id || 1,
            is_credited: true,
            is_debited: false,
            category_id: 7,
            self_ref_id: to_account_ref_id,
            ref_id: from_account_ref_id
          })
          break
        case 'subscription':
          transactions.push({
            ...baseTransaction,
            name: values.name,
            account_id: values.account_id,
            category_id: values.category_id,
            currency_id: selectedAccount?.currency.id || 1,
            is_credited: false,
            is_debited: true
          })
          break
        case 'transfer':
          transactions.push({
            ...baseTransaction,
            name: values.name,
            account_id: values.from_account_id,
            description: values.description || '',
            currency_id: selectedAccount?.currency.id || 1,
            is_credited: false,
            is_debited: true,
            category_id: 8,
            self_ref_id: from_account_ref_id,
            ref_id: to_account_ref_id
          })

          transactions.push({
            ...baseTransaction,
            name: values.name,
            account_id: values.to_account_id,
            description: values.description || '',
            currency_id: selectedAccount?.currency.id || 1,
            is_credited: true,
            is_debited: false,
            category_id: 8,
            self_ref_id: to_account_ref_id,
            ref_id: from_account_ref_id
          })
          break
      }

      console.log('Submitting transaction:', transactions)
      await onSubmit(transactions)
    } catch (error) {
      console.error('Error submitting transaction:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, handleFormErrors)}
        className='space-y-4'
      >
        {/* Transaction Type */}
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select transaction type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TRANSACTION_TYPE.map((x) => (
                    <SelectItem key={x.name} value={x.name}>
                      {x.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Transaction Name - for all types except income */}
        {watchType !== 'income' && (
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter transaction name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* From Account - for transfer, investment only */}
        {['transfer', 'investment'].includes(watchType) && (
          <FormField
            control={form.control}
            name='from_account_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>From Account</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select source account' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem
                        key={account.id}
                        value={account.id.toString()}
                      >
                        {account.accountName} ({account.accountType})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* To Account - for transfer, investment only */}
        {['transfer', 'investment'].includes(watchType) && (
          <FormField
            control={form.control}
            name='to_account_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>To Account</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select destination account' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem
                        key={account.id}
                        value={account.id.toString()}
                      >
                        {account.accountName} ({account.accountType})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Category - for expenses and subscription */}
        {(watchType === 'expenses' || watchType === 'subscription') && (
          <FormField
            control={form.control}
            name='category_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        <div className='capitalize flex flex-row gap-2 items-center'>
                          <span
                            className='w-3 h-3 rounded-full'
                            style={{ backgroundColor: category.indicatorColor }}
                          />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Amount - for all transaction types */}
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='0.01'
                  placeholder='Enter amount'
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                  value={field.value || ''}
                />
              </FormControl>
              {fromAccountCurrency !== toAccountCurrency && (
                <FormDescription>
                  Currency conversion from
                  <span className='ml-1 font-bold'>
                    {fromAccountCurrency}
                  </span>{' '}
                  to <span className='font-bold'>{toAccountCurrency}</span> is
                  1:82.5
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date - for all transaction types */}
        <FormField
          control={form.control}
          name='transaction_datetime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {field.value ? (
                        format(date, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={new Date(field.value)}
                      onSelect={(newDate) => {
                        if (newDate) {
                          setDate(newDate)
                          field.onChange(newDate.toISOString())
                          setCalendarOpen(false)
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Account - for expenses, income, investment, subscription */}
        {['expenses', 'income', 'subscription'].includes(watchType) && (
          <FormField
            control={form.control}
            name='account_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select account' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem
                        key={account.id}
                        value={account.id.toString()}
                      >
                        {account.accountName} ({account.accountType})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Description - for investment only */}
        {watchType === 'investment' ||
          (watchType == 'transfer' && (
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter investment details'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

        <div className='flex justify-end space-x-2'>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            disabled={isSubmitting || isLoading}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isSubmitting || isLoading}>
            {transaction ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
