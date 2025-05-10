import * as z from 'zod'

// Dynamic schema based on transaction type
const baseSchema = {
  type: z.enum(
    ['expenses', 'income', 'investment', 'subscription', 'transfer'],
    {
      required_error: 'Transaction type is required'
    }
  ),
  transaction_datetime: z.string({
    required_error: 'Transaction date is required'
  }),
  amount: z.coerce
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a valid number'
    })
    .positive('Amount must be greater than zero'),
  currency_id: z.coerce.number().optional()
}

const expenseSchema = z.object({
  ...baseSchema,
  name: z.string().min(1, 'Transaction name is required for expenses'),
  account_id: z.coerce.number({
    required_error: 'Please select an account for this expense'
  }),
  category_id: z.coerce.number({
    required_error: 'Please select a category for this expense'
  })
})

const incomeSchema = z.object({
  ...baseSchema,
  account_id: z.coerce.number({
    required_error: 'Please select an account for this income'
  })
})

const investmentSchema = z.object({
  ...baseSchema,
  name: z.string().min(1, 'Transaction name is required for investment'),
  from_account_id: z.coerce.number({
    required_error: 'Please select an from account for this investment'
  }),
  to_account_id: z.coerce.number({
    required_error: 'Please select an to account for this investment'
  }),
  description: z.string().optional().or(z.literal(''))
})

const subscriptionSchema = z.object({
  ...baseSchema,
  name: z.string().min(1, 'Transaction name is required for expenses'),
  account_id: z.coerce.number({
    required_error: 'Please select an account for this expense'
  }),
  category_id: z.coerce.number({
    required_error: 'Please select a category for this expense'
  })
})

const transferSchema = z.object({
  ...baseSchema,
  name: z.string().min(1, 'Transfer description is required'),
  from_account_id: z.coerce.number({
    required_error: 'Please select an from account for this investment'
  }),
  to_account_id: z.coerce.number({
    required_error: 'Please select an to account for this investment'
  }),
  description: z.string().optional().or(z.literal(''))
})

// Combined schema with discriminated union
export const transactionFormSchema = z.discriminatedUnion('type', [
  expenseSchema.extend({ type: z.literal('expenses') }),
  incomeSchema.extend({ type: z.literal('income') }),
  investmentSchema.extend({ type: z.literal('investment') }),
  subscriptionSchema.extend({ type: z.literal('subscription') }),
  transferSchema.extend({ type: z.literal('transfer') })
])
