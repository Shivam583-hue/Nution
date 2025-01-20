"use client"


import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { useCoverImageStore } from "@/hooks/use-cover-image"
import { SingleImageDropzone } from "@/app/(main)/_components/single-image-dropzone"
import React from "react"
import { useEdgeStore } from "@/lib/edgestore"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"

export const CoverImageModal = () => {
  const [file, setFile] = React.useState<File>()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const coverImage = useCoverImageStore()
  const update = useMutation(api.documents.update)
  const { edgestore } = useEdgeStore()

  const onClose = () => {
    setFile(undefined)
    setIsSubmitting(false)
    coverImage.onClose()
  }

  const onChange = async (file: File) => {
    if (file) {
      setIsSubmitting(true)
      setFile(file)

      let res;

      if (coverImage.url) {
        res = await edgestore.publicFiles.upload({ file, options: { replaceTargetUrl: coverImage.url } })
      } else {
        res = await edgestore.publicFiles.upload({ file })
      }

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: res?.url,
      })
      onClose()
    }
  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold text-center">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone className="w-full outline-none " disabled={isSubmitting} onChange={onChange} value={file} />
      </DialogContent>
    </Dialog>
  )
}
