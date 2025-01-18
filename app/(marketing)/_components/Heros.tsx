import Image from "next/image"

const Heros = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl dark:bg-[#1f1f1f]">
      <div className="flex items-center dark:bg-[#1f1f1f]">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] dark:bg-[#1f1f1f]">
          <Image
            src="/documents.png"
            alt="documents"
            fill
            className="object-contain h-[200px] "
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image
            src="/reading.png"
            alt="reading"
            fill
            className="h-[200px] object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Heros
