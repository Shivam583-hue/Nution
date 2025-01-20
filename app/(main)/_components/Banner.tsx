"use client"

import { ConfirmModal } from '@/components/confirm-modal'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

type BannerProps = {
  documentId: Id<"documents">
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter()
  const remove = useMutation(api.documents.deleteDocument)
  const restore = useMutation(api.documents.restore)
  const params = useParams()

  const onRestore = () => {
    const promise = restore({
      documentId: documentId,
    })
    toast.promise(promise, {
      loading: "Restoring...",
      success: "Restored successfully",
      error: "Failed to restore",
    })
  }

  const onRemove = () => {
    const promise = remove({
      documentId: documentId,
    })
    toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted successfully",
      error: "Failed to delete",
    })

    if (params.documentId === documentId) {
      router.push("/documents")
    }
  }

  return (
    <div className='w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'>
      <p>
        This page is in the trash.
      </p>
      <Button size="sm" onClick={onRestore} variant="outline" className='border-white bg-transparent hover:bg-primary/5 text-white p-1 px-2 h-auto font-normal'>
        Restore Page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button size="sm" variant="outline" className='border-white bg-transparent hover:bg-primary/5 text-white p-1 px-2 h-auto font-normal'>
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  )
}

export default Banner
