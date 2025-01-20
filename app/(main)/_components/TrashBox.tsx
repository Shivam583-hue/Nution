"use client"

import { ConfirmModal } from '@/components/confirm-modal'
import { Spinner } from '@/components/spinner'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { deleteDocument } from '@/convex/documents'
import { useMutation, useQuery } from 'convex/react'
import { Search, Trash, Undo } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const TrashBox = () => {
  const router = useRouter()
  const params = useParams()
  const documents = useQuery(api.documents.getTrash)
  const restore = useMutation(api.documents.restore)
  const remove = useMutation(api.documents.deleteDocument)

  const [search, setSearch] = React.useState("")

  const filteredDocuments = documents?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase())
  })

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  const onRemove = (documentId: Id<"documents">) => {
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

  if (documents === undefined) return <div className='h-full flex items-center justify-center p-4'><Spinner size="lg" /></div>

  const onRestore = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<"documents">) => {
    e.stopPropagation()
    const promise = restore({
      documentId: documentId,
    })
    toast.promise(promise, {
      loading: "Restoring...",
      success: "Restored successfully",
      error: "Failed to restore",
    })
  }


  return (
    <div className='text-sm'>
      <div className='flex items-center gap-x-1 p-2'>
        <Search className='h-4 w-4' />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Filer by page title' className='h-7 px-2 focus-visible:ring-tranparent bg-secondary' />
      </div>
      <div className='mt-2 px-1 pb-1'>
        <p className='hidden last:block text-xs text-muted-foreground text-center pb-2'>
          No documents found.
        </p>
        {filteredDocuments?.map((document) => (
          <div className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between' key={document._id} role='button' onClick={() => onClick(document._id)}>
            <span className='truncate pl-2'>{document.title}</span>
            <div className='flex items-center'>
              <div className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600' onClick={(e) => onRestore(e, document._id)} role='button' >
                <Undo className='h-4 w-4  text-muted-foreground' />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600' role='button' >
                  <Trash className='h-4 w-4 text-muted-foreground' />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrashBox
