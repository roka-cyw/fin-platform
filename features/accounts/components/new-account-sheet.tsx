import { z } from 'zod'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { insertAccountSchema } from '@/db/schema'
import { useNewAccounts } from '../hooks/use-new-accounts'
import { AccountForm } from './account-form'
import { useCreateAccount } from '../api/use-create-account'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formsSchema = insertAccountSchema.pick({
  name: true
})

type FormValues = z.input<typeof formsSchema>

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccounts()

  const mutation = useCreateAccount()

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create new account</SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: ''
          }}
        />
      </SheetContent>
    </Sheet>
  )
}
