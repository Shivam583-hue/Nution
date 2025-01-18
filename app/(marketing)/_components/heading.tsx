"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas&#44; Documnets&#44; &amp; Plans&#46; Unified&#46; Welcome to <span className="underline">Nution</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Nution is the connected workspace where <br /> better&#44; faster work happens&#46;
      </h3>
      <Button>
        Enter Nution
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

export default Heading
