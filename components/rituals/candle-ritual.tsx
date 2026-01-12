"use client"

import { useState, useRef, useCallback, useEffect } from "react"

interface CandleRitualProps {
  onComplete: () => void
  onCancel: () => void
}

export function CandleRitual({ onComplete, onCancel }: CandleRitualProps) {
  const [progress, setProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isComplete) {
      onComplete()
    }
  }, [isComplete, onComplete])

  const startHolding = useCallback(() => {
    setIsHolding(true)
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setIsComplete(true)
          return 100
        }
        return prev + 2
      })
    }, 50)
  }, [])

  const stopHolding = useCallback(() => {
    setIsHolding(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (progress < 100) {
      setProgress((prev) => Math.max(0, prev - 10))
    }
  }, [progress])

  return (
    <div className="relative space-y-4 py-2">
      <button
        onClick={onCancel}
        className="absolute -top-1 right-0 font-mono text-sm text-white hover:text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
      >
        [X]
      </button>

      <p className="text-center font-mono text-xs uppercase tracking-widest text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
        hold to sustain the flame
      </p>

      <div className="flex flex-col items-center">
        <div
          className={`mb-1 transition-all duration-300 ${isHolding ? "scale-125" : "scale-100"}`}
          style={{ opacity: 0.5 + (progress / 100) * 0.5 }}
        >
          <div className="text-3xl">🔥</div>
        </div>

        {/* 8-bit candle body */}
        <div className="h-16 w-8 border-4 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div
            className="w-full bg-black transition-all duration-100"
            style={{
              height: `${progress}%`,
              marginTop: `${100 - progress}%`,
            }}
          />
        </div>
      </div>

      <button
        onMouseDown={startHolding}
        onMouseUp={stopHolding}
        onMouseLeave={stopHolding}
        onTouchStart={startHolding}
        onTouchEnd={stopHolding}
        className={`
          mx-auto flex h-16 w-16 items-center justify-center
          border-4 border-black bg-white
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          transition-all duration-100
          ${isHolding ? "translate-x-[4px] translate-y-[4px] shadow-none bg-black" : ""}
        `}
      >
        <span className={`font-mono text-2xl ${isHolding ? "text-white" : "text-black"}`}>☼</span>
      </button>
    </div>
  )
}
