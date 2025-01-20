"use client"

import Editor from '@/app/(main)/_components/Editor'
import Toolbar from '@/app/(main)/_components/Toolbar'
import Cover from '@/components/Cover'
import { Spinner } from '@/components/spinner'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import React from 'react'

type DocumentIdPageProps = {
  params: {
    documentId: Id<"documents">
  }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, { documentId: params.documentId as Id<"documents"> })

  const update = useMutation(api.documents.update)
  if (document === undefined) return <div className='h-full flex items-center justify-center p-4'><Spinner size={"lg"} /></div>

  if (document === null) return null

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content
    })
  }

  return (
    <div className='pb-40'>
      <Cover url={document.coverImage} />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar initialData={document} />
        <Editor
          params={params}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  )
}

export default DocumentIdPage
