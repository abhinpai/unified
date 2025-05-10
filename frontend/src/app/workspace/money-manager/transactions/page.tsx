'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { useAuth } from '@/hooks/useAuth'
import { useCreateTransaction } from '@/services/transactions/use-create-transaction'
import { useDeleteTransaction } from '@/services/transactions/use-delete-transaction'
import { useGetTransactions } from '@/services/transactions/use-get-transactions'
import { useUpdateTransaction } from '@/services/transactions/use-update-transaction'
import { ITransaction } from '@/types/ITransaction'
import { CreateTransactionDTO, UpdateTransactionDTO } from '@/types/transaction'
import { useState } from 'react'
import { TransactionDialog } from './_components/transaction_dialog'
import { TransactionTable } from './_components/transaction_table'
import { getTransactionColumns } from './_components/transaction_table_columns'
import { ViewTransactionDialog } from './_components/view_transaction_dialog'

const TransactionPage = () => {
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [removeTransaction, setDeleteTransaction] =
    useState<ITransaction | null>(null)
  const [viewTransaction, setViewTransaction] = useState<ITransaction | null>(
    null
  )
  const [editTransaction, setEditTransaction] = useState<ITransaction | null>(
    null
  )

  const { data: transactions = [], isLoading: isLoadingTransactions } =
    useGetTransactions(user?.id || '')

  const deleteTransaction = useDeleteTransaction()
  const updateTransaction = useUpdateTransaction()
  const createTransaction = useCreateTransaction()

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setDialogOpen(false)
    } else {
      setDialogOpen(true)
    }
  }

  const handleEditDialogClose = (open: boolean) => {
    if (!open) {
      setEditTransaction(null)
    }
  }

  const handleViewDialogClose = (open: boolean) => {
    if (!open) {
      setViewTransaction(null)
    }
  }

  const handleDelete = async () => {
    if (removeTransaction) {
      await deleteTransaction.mutateAsync(removeTransaction)
      setDeleteTransaction(null)
    }
  }

  const handleCreateTransaction = async (
    transactions: CreateTransactionDTO[]
  ) => {
    try {
      await createTransaction.mutateAsync(transactions)
      setDialogOpen(false)
    } catch (error) {
      console.error('Error creating transaction:', error)
    }
  }

  const handleUpdateTransaction = async (
    id: string,
    transaction: UpdateTransactionDTO
  ) => {
    try {
      await updateTransaction.mutateAsync({ id, transaction })
      setEditTransaction(null)
    } catch (error) {
      console.error('Error updating transaction:', error)
    }
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='Transactions'>
        <Button onClick={() => setDialogOpen(true)}>Add Transaction</Button>
      </PageHeader>
      <TransactionTable
        columns={getTransactionColumns(
          setDeleteTransaction,
          setViewTransaction,
          setEditTransaction
        )}
        data={transactions}
        isLoading={isLoadingTransactions}
      />

      {/* Create transaction dialog */}
      <TransactionDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSubmit={handleCreateTransaction}
        isLoading={createTransaction.isPending}
      />

      {/* Edit transaction dialog */}
      {editTransaction && (
        <TransactionDialog
          open={!!editTransaction}
          onOpenChange={handleEditDialogClose}
          onSubmit={handleCreateTransaction}
          onUpdate={handleUpdateTransaction}
          transaction={editTransaction}
          isLoading={updateTransaction.isPending}
        />
      )}

      {/* View transaction dialog */}
      <ViewTransactionDialog
        open={!!viewTransaction}
        onOpenChange={handleViewDialogClose}
        transaction={viewTransaction}
      />

      <AlertDialog
        open={!!removeTransaction}
        onOpenChange={() => setDeleteTransaction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='!bg-red-800' onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default TransactionPage
