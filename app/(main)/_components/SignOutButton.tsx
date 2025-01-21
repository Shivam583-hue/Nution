"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

const SignOutButtonn = () => {
  const router = useRouter()
  return (
    <button onClick={() => router.push("/")}>
      <div className='flex items-center pl-2 justify-center w-full'>
        Go back to home
        <LogOut className='ml-2 h-4 w-4' />
      </div>
    </button>
  )
}

export default SignOutButtonn
