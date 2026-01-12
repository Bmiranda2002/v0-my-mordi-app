"use client"

import { useState } from "react"

interface OfferingRitualProps {
  onComplete: () => void
  onCancel: () => void
}

const offerings = [
  { symbol: "⧖", label: "time" },
  { symbol: "◌", label: "silence" },
  { symbol: "⌘", label: "focus" },
  { symbol: "♥", label: "devotion" },
]

export function OfferingRitual({ onComplete, onCancel }: OfferingRitualProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [confirming, setConfirming] = useState(false)

  const handleSelect = (index: number) => {
    setSelected(index)
    setConfirming(true)
  }

  const handleConfirm = () => {
    onComplete()
  }

  return (
    <div className="relative space-y-4 py-2">
      <button
        onClick={onCancel}
        className="absolute -top-1 right-0 font-mono text-sm text-white hover:text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
      >
        [X]
      </button>

      <p className="text-center font-mono text-xs uppercase tracking-widest text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
        {confirming ? "confirm offering" : "choose offering"}
      </p>

      {confirming && selected !== null ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 flex items-center justify-center bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-4xl text-black">{offerings[selected].symbol}</span>
          </div>
          <p className="font-mono text-sm text-white uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
            {offerings[selected].label}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setConfirming(false)
                setSelected(null)
              }}
              className="
                bg-black text-white
                border-4 border-white
                px-4 py-2 
                font-mono text-xs uppercase tracking-widest
                shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)]
                transition-all duration-100
                hover:translate-x-[2px] hover:translate-y-[2px]
                hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.8)]
              "
            >
              back
            </button>
            <button
              onClick={handleConfirm}
              className="
                bg-white text-black
                border-4 border-black
                px-4 py-2 
                font-mono text-xs uppercase tracking-widest
                shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                transition-all duration-100
                hover:translate-x-[2px] hover:translate-y-[2px]
                hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
              "
            >
              offer
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {offerings.map((offering, index) => (
            <button
              key={offering.label}
              onClick={() => handleSelect(index)}
              className="
                flex flex-col items-center gap-1
                bg-white border-4 border-black
                p-2
                shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                transition-all duration-100
                hover:translate-x-[2px] hover:translate-y-[2px]
                hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
                active:translate-x-[3px] active:translate-y-[3px]
                active:shadow-none
              "
            >
              <span className="text-xl text-black">{offering.symbol}</span>
              <span className="font-mono text-[8px] uppercase text-black">{offering.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
