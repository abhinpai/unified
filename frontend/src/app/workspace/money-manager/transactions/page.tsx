'use client'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { useState } from 'react'
import { TransactionDialog } from './_components/transaction_dialog'

const TransactionPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setDialogOpen(false)
    } else {
      setDialogOpen(true)
    }
  }

  const handleCreateTransaction = () =>{

  }
  
  return (
    <div>
      <PageHeader
        title='Transactions'
        children={<Button onClick={() => setDialogOpen(true)}>Add</Button>}
      />
       <TransactionDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSubmit={handleCreateTransaction}
        isLoading={false}
      />
    </div>
  )
}

export default TransactionPage
