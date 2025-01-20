"use client"

import React, { useEffect } from 'react'
import { File } from 'lucide-react'
import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { useSearch } from '@/hooks/use-search'
import { api } from '@/convex/_generated/api'

export const SearchCommand = () => {
  const { user } = useUser()
  const router = useRouter()
  const documents = useQuery(api.documents.getSearch)

  const [isMounted, setIsMounted] = React.useState(false)

  const toggle = useSearch((store) => store.toggle)
  const isOpen = useSearch((store) => store.isOpen)
  const onClose = useSearch((store) => store.onClose)


  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [toggle])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`)
    onClose()
  }

  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.firstName}'s Nution...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((document) => (
            <CommandItem key={document._id} value={`${document._id}-${document.title}`} title={document.title} onSelect={onSelect}>
              {document.icon ? (<p className='mr-2 text-[18px]'>{document.icon}</p>) : <File className='h-4 w-4 mr-2' />}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )

}
