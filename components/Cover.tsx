"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { ImageIcon, X } from 'lucide-react'
import { useCoverImageStore } from '@/hooks/use-cover-image'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import { Id } from '@/convex/_generated/dataModel'

type CoverProps = {
  url?: string
  preview?: boolean
}

const Cover = ({ url, preview }: CoverProps) => {
  const coverImage = useCoverImageStore()
  const removeCover = useMutation(api.documents.removeCoverImage)
  const params = useParams()

  const onRemove = () => {
    removeCover({ id: params.documentId as Id<"documents"> })
  }

  return (
    <div className={cn(
      'relative w-full h-[35vh] group', !url && 'h-[12vh]', url && "bg-muted"
    )}>
      {!!url && (
        <Image src={url} alt="cover" fill className="object-cover" />
      )}
      {url && !preview && (
        <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
          <Button className='text-muted-foreground text-xs' variant="outline" size="sm" onClick={coverImage.onOpen}>
            <ImageIcon className='h-4 w-4 mr-2' />
            Change Cover
          </Button>
          <Button className='text-muted-foreground text-xs' variant="outline" size="sm" onClick={onRemove}>
            <X className='h-4 w-4 mr-2' />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cover
