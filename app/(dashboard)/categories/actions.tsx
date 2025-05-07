'use client'

import { useState } from 'react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { Button } from '@/components/ui/button'
import { useConfirm } from '@/hook/use-confirm'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'

type Props = {
  id: string
}

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenCategory()

  const [open, setOpen] = useState(false)
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure ?',
    'You are going to delete this category. This action cannot be undone.'
  )

  const deleteMutation = useDeleteCategory(id)

  // Added this handle to fix second click to the actoins.
  // Probably it doesnt work 2nd time bacause of diff between versions of packages
  const handleEdit = () => {
    onOpen(id)
    setOpen(false)
  }

  const handleDelete = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          setOpen(false)
        }
      })
    }
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='size-8 p-0'>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleEdit}>
            <Edit className='size-4 mr-2' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
            <Trash className='size-4 mr-2' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
