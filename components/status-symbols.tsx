"use client"

import type { MordiStateType } from "@/hooks/use-mordi-state"

interface StatusSymbolsProps {
  devotion: number
  state: MordiStateType
}

export function StatusSymbols({ devotion, state }: StatusSymbolsProps) {
  const devotionLevel = Math.min(Math.floor(devotion / 20), 5)

  const stateSymbol: Record<MordiStateType, string> = {
    serene: "◯",
    hungry: "◐",
    weeping: "◑",
    watchful: "◉",
    judgmental: "◈",
    ascended: "✧",
    fragmented: "҉",
  }

  return (
    <div className="flex w-full items-center justify-between px-3 py-2 bg-black/80 border-b-4 border-white/80">
      {/* Devotion indicator */}
      <div className="flex items-center gap-1 font-mono text-xs tracking-widest text-white">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`transition-opacity duration-500 ${i < devotionLevel ? "opacity-100" : "opacity-30"}`}
          >
            ♥
          </span>
        ))}
      </div>

      {/* State symbol */}
      <div className="font-mono text-lg text-white">{stateSymbol[state]}</div>

      {/* Time indicator */}
      <div className="font-mono text-xs tracking-widest text-white/70">
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
      </div>
    </div>
  )
}
