'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useNewAccounts } from '@/features/accounts/hooks/use-new-accounts'
import { columns, Payment } from './columns'
import { DataTable } from '@/components/data-table/DataTable'

const data: Payment = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: '123m@example.com'
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'success',
    email: 'm11@example.com'
  }
]

const AccountsPage = () => {
  const newAccount = useNewAccounts()

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>Accounts Page</CardTitle>

          <Button size='sm' onClick={newAccount.onOpen}>
            <Plus className='size-4 mr-2' /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountsPage
