'use client'

import { Spinner } from '@/components/spinner';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import Title from './Title';
import { useQuery } from 'convex/react';
import { MenuIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'
import Banner from './Banner';

type NavbarProps = {
  isCollapsed: boolean;
  onResetWidth: () => void
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams()
  const document = useQuery(api.documents.getById, { documentId: params.documentId as Id<"documents"> })

  if (document === undefined) return <div className='h-full flex items-center justify-center p-4'><Spinner size={"lg"} /></div>

  if (document === null) return null

  return (
    <>
      <nav className='bg-backgroud dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4'>
        {isCollapsed && <MenuIcon role='button' className='h-6 w-6 text-muted-foreground' onClick={onResetWidth} />}
        <div className='flex items-center justify-between w-full'>
          <Title initialData={document} />
        </div>
      </nav>
      {document.isArchived && (
        <Banner documentId={document._id} />
      )}
    </>
  )
}

export default Navbar

