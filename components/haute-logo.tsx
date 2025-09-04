import Image from "next/image"

export function HauteLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="font-heading text-5xl font-bold tracking-wider">
        <svg viewBox="0 0 240 120" className="w-64 h-32">
          <path id="arc" d="M 30 90 Q 120 30 210 90" fill="none" stroke="none" />
          <text className="fill-current text-5xl font-bold">
            <textPath href="#arc" startOffset="50%" textAnchor="middle">
              HAUTE
            </textPath>
          </text>
        </svg>
      </div>
      <Image src="/haute.png" alt="Haute Logo" width={128} height={128} className="w-32 h-32 -mt-4" />
    </div>
  )
}
