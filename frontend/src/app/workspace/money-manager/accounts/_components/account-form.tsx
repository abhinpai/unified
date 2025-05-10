import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useAuth } from '@/hooks/useAuth'
import { useGetCurrencies } from '@/services/currency/use-get-currencies'
import { CreateAccountDTO } from '@/types/account'
import { IAccount } from '@/types/IAccount'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  accountName: z.string().min(2, {
    message: 'Account name must be at least 2 characters.'
  }),
  accountNumber: z.string().min(4, {
    message: 'Account number must be at least 4 characters.'
  }),
  accountType: z.string({
    required_error: 'Please select an account type.'
  }),
  currency_id: z.coerce.number({
    required_error: 'Please select a currency.'
  }),
  balance: z
    .number({
      required_error: 'Balance is required.'
    })
    .min(0, {
      message: 'Balance must be a positive number.'
    })
})

interface AccountFormProps {
  account?: IAccount
  onSubmit: (data: CreateAccountDTO) => void
  onCancel: () => void
  isLoading?: boolean
}

export function AccountForm({
  account,
  onSubmit,
  onCancel,
  isLoading
}: AccountFormProps) {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: account?.accountName || '',
      accountNumber: account?.accountNumber || '',
      accountType: account?.accountType || '',
      currency_id: account?.currency.id || 1
    }
  })

  const { data: currencies } = useGetCurrencies()

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    if (!user?.id) {
      console.error('User not authenticated')
      return
    }

    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      const submitData: CreateAccountDTO = {
        accountName: values.accountName,
        accountNumber: values.accountNumber,
        accountType: values.accountType,
        currency_id: values.currency_id,
        balance: values.balance,
        user_id: user?.id || ''
      }

      await onSubmit(submitData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='accountName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter account name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='accountNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder='Enter account number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='accountType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select account type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Saving'>Savings</SelectItem>
                  <SelectItem value='Checking'>Checking</SelectItem>
                  <SelectItem value='Credit Card'>Credit Card</SelectItem>
                  <SelectItem value='Debit Card'>Debit Card</SelectItem>
                  <SelectItem value='Investment'>Investment</SelectItem>
                  <SelectItem value='Loan/Debt'>Loan/Debt</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='currency_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select currency' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencies?.map((currency) => (
                    <SelectItem
                      key={currency.id}
                      value={currency.id.toString()}
                    >
                      {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='balance'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='0.01'
                  placeholder='Enter balance'
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            {account ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
