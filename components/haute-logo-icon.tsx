import Image from "next/image"

export function HauteLogoIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image src="/haute.png" alt="Haute Logo" width={128} height={128} className="w-32 h-32" />
    </div>
  )
}