"use client"

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

type MenuProps = {
  documentId: Id<"documents">
}

const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter()
  const { user } = useUser()
  const archive = useMutation(api.documents.archive)
  const onArchive = () => {
    const promise = archive({
      documentId: documentId,
    })
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Document moved to trash!",
      error: "Failed to move document to trash",
    })
    router.push("/documents")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-60' align="end" alignOffset={8} forceMount>
        <DropdownMenuItem onClick={onArchive} >
          <Trash className='h-4 w-4 mr-2' />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className='text-xs text-muted-foreground p-2'>
          Last edited by: {user?.firstName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
