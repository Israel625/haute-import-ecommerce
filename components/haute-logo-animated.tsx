"use client"

import { useState, useEffect } from "react"

export function HauteLogoAnimated({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={`font-heading font-bold ${className}`}>
      <div 
        className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-4xl md:text-6xl bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-pulse">
          HAUTE
        </span>
        <div className="h-1 bg-gradient-to-r from-accent to-primary rounded-full mt-2 transform scale-x-0 animate-[scaleX_1s_ease-in-out_0.5s_forwards]" />
        <span className={`block text-lg md:text-xl text-muted-foreground tracking-widest transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          IMPORT
        </span>
      </div>
    </div>
  )
}