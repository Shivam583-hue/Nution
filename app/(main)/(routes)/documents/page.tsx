"use client"

import React from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

const DocumnetsPage = () => {

  const { user } = useUser()
  const create = useMutation(api.documents.createDocument)

  const onCreate = () => {
    const promise = create({
      title: "Untitled",
    })
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created successfully",
      error: "Failed to create a note",
    })
  }

  return (
    <div className='h-full flex flex-col justify-center items-center space-y-4'>
      <Image src="/empty.png" alt="empty" width={300} height={300} />
      <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName} &apos;s Nution
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className='h-4 w-4 ml-2' />
        Create a note
      </Button>
    </div>
  )
}

export default DocumnetsPage
