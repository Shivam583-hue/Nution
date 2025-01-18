import Image from "next/image"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

const fonts = Poppins({ subsets: ["latin"], weight: ["400", "600"] })

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/favicon.ico"
        height="40"
        width="40"
        alt="logo"
      />
      <p className={cn("font-semibold", fonts.className)}>
        Nution
      </p>
    </div>
  )
}

export default Logo
