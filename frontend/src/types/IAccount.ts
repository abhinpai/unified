export class AccountTypes {
  static Saving = 'Saving'
  static Checking = 'Checking'
  static CreditCard = 'Credit Card'
  static DebitCard = 'Debit Card'
  static Investment = 'Investment'
  static LoanDebt = 'Loan/Debt'
}

export interface IAccount {
  id: string
  accountType: string
  currency: string
  accountNumber: string
  accountName: string
  balance: number
  lastTransactionDate: string
  created_at?: string
  updated_at?: string
  user_id: string
}
