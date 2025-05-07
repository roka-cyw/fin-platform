import { z } from 'zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { insertCategorySchema } from '@/db/schema'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

const formsSchema = insertCategorySchema.pick({
  name: true
})

type FormValues = z.input<typeof formsSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (values: FormValues) => void
  onDelete?: () => void
  disabled?: boolean
}

export const CategoryForm = ({ id, defaultValues, onSubmit, onDelete, disabled }: Props) => {
  const form = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formsSchema)
  })

  const handleSubmit = (values: FormValues) => {
    onSubmit(values)
  }

  const handleDelete = () => {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 pt-4'>
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder='e.g Food, Travel etc. ' {...field}></Input>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='w-full' disabled={disabled}>
          {id ? 'save changes' : 'Create category'}
        </Button>

        {!!id && (
          <Button type='button' disabled={disabled} onClick={handleDelete} className='w-full' variant='outline'>
            <Trash size={16} className='mr-2' />
            Delete category
          </Button>
        )}
      </form>
    </Form>
  )
}
