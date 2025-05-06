'use client'

import { Loader2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useNewAccounts } from '@/features/accounts/hooks/use-new-accounts'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useBulkDeelteAccounts } from '@/features/accounts/api/use-bulk-delete'
import { columns } from './columns'
import { DataTable } from '@/components/data-table/DataTable'

const AccountsPage = () => {
  const newAccount = useNewAccounts()
  const deleteAccounts = useBulkDeelteAccounts()
  const accountsQuerry = useGetAccounts()
  const accounts = accountsQuerry.data || []

  const isDisabled = accountsQuerry.isLoading || deleteAccounts.isPending

  if (accountsQuerry.isLoading) {
    return (
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader>
            <Skeleton className='h-8 w-48' />
          </CardHeader>
          <CardContent>
            <div className='h-[500px] w-full flex items-center justify-center'>
              <Loader2 className='size-6 text-slate-300 animate-spin' />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

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
          <DataTable
            columns={columns}
            data={accounts}
            filterKey='name'
            onDelete={row => {
              const ids = row.map(r => r.original.id)
              deleteAccounts.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountsPage
