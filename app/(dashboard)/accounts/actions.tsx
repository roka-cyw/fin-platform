'use client'

import { Edit, MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

type Props = {
  id: string
}

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenAccount()
  const [open, setOpen] = useState(false)

  // Added this handle to fix second click to the actoins.
  // Probably it doesnt work 2nd time bacause of diff between versions of packages
  const handleEdit = () => {
    onOpen(id)
    setOpen(false)
  }

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='size-8 p-0'>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem disabled={false} onClick={handleEdit}>
            <Edit className='size-4 mr-2' />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
