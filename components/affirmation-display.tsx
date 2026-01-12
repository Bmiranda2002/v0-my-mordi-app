"use client"

import { useEffect, useState } from "react"

interface AffirmationDisplayProps {
  message: string
  onComplete: () => void
}

export function AffirmationDisplay({ message, onComplete }: AffirmationDisplayProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 500)
    }, 4000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className={`absolute inset-x-4 top-1/4 z-20 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4">
        <p className="text-balance text-center font-mono text-base text-black uppercase tracking-wide">"{message}"</p>
      </div>
    </div>
  )
}
