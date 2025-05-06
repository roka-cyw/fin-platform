import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { insertAccountSchema } from '@/db/schema'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { AccountForm } from '@/features/accounts/components/account-form'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { useGetAccount } from '@/features/accounts/api/use-get-account'
import { useEditAccount } from '@/features/accounts/api/use-edit-account'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formsSchema = insertAccountSchema.pick({
  name: true
})

type FormValues = z.input<typeof formsSchema>

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount()
  const accountQuerry = useGetAccount(id)
  const editMutation = useEditAccount(id)

  const isLoading = accountQuerry.isLoading
  const isPending = editMutation.isPending

  const defaultValues = accountQuerry.data
    ? {
        name: accountQuerry.data.name
      }
    : {
        name: ''
      }

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
        console.log('close 1')
      }
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit an existing account</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className='absolute inset-0 flex items-center justify-center '>
            <Loader2 className='size-4 text-muted-foreground animate-spin' />
          </div>
        ) : (
          <AccountForm id={id} onSubmit={onSubmit} disabled={isPending} defaultValues={defaultValues} />
        )}
      </SheetContent>
    </Sheet>
  )
}
