import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { insertCategorySchema } from '@/db/schema'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { CategoryForm } from '@/features/categories/components/category-form'

import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { useGetCategory } from '@/features/categories/api/use-get-category'
import { useEditCategory } from '@/features/categories/api/use-edit-category'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'
import { useConfirm } from '@/hook/use-confirm'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formsSchema = insertCategorySchema.pick({
  name: true
})

type FormValues = z.input<typeof formsSchema>

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory()

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure ?',
    'You are going to delete this category. This action cannot be undone.'
  )

  const categoryQuerry = useGetCategory(id)
  const editMutation = useEditCategory(id)
  const deleteMutation = useDeleteCategory(id)

  const isLoading = categoryQuerry.isLoading
  const isPending = editMutation.isPending || deleteMutation.isPending

  const defaultValues = categoryQuerry.data
    ? {
        name: categoryQuerry.data.name
      }
    : {
        name: ''
      }

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const onDelete = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  }

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center '>
              <Loader2 className='size-4 text-muted-foreground animate-spin' />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
