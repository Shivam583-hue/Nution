"use client"

import Toolbar from '@/app/(main)/_components/Toolbar'
import { Spinner } from '@/components/spinner'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import React from 'react'

type DocumentIdPageProps = {
  params: {
    documentId: Id<"documents">
  }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, { documentId: params.documentId as Id<"documents"> })
  if (document === undefined) return <div className='h-full flex items-center justify-center p-4'><Spinner size={"lg"} /></div>

  if (document === null) return null

  return (
    <div className='pb-40'>
      <div className='h-[35vh]' />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar initialData={document} />
      </div>
    </div>
  )
}

export default DocumentIdPage
