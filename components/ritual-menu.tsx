"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import type { MordiStateType } from "@/hooks/use-mordi-state"
import { CandleRitual } from "@/components/rituals/candle-ritual"
import { SigilRitual } from "@/components/rituals/sigil-ritual"
import { OfferingRitual } from "@/components/rituals/offering-ritual"

interface RitualMenuProps {
  onConfess: () => void
  onRitualComplete: (type: string) => void
  mordiState: MordiStateType
}

type RitualType = "menu" | "candle" | "sigil" | "offering"

function PixelButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        bg-white text-black
        px-3 py-2
        border-2 border-black
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        transition-all duration-100
        hover:translate-x-[1px] hover:translate-y-[1px]
        hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
        active:translate-x-[2px] active:translate-y-[2px]
        active:shadow-none
        disabled:opacity-40 disabled:cursor-not-allowed
        disabled:hover:translate-x-0 disabled:hover:translate-y-0
        disabled:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        ${className}
      `}
      style={{ imageRendering: "pixelated" }}
    >
      <span style={{ fontFamily: "var(--font-pixel)" }} className="text-[10px] uppercase">
        {children}
      </span>
    </button>
  )
}

function PixelIconButton({
  imageSrc,
  label,
  onClick,
}: {
  imageSrc: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="
        group flex-1 flex flex-col items-center gap-1
        transition-all duration-100
        hover:translate-y-[-2px]
        active:translate-y-[2px]
      "
    >
      <div
        className="
          w-full aspect-square
          flex items-center justify-center
          bg-white
          border-2 border-black
          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
          group-hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
          group-active:shadow-none
          group-active:translate-x-[2px] group-active:translate-y-[2px]
          transition-all duration-100
          p-2
        "
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={label}
          width={48}
          height={48}
          className="w-full h-full object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <span className="font-mono text-[8px] uppercase tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
        {label}
      </span>
    </button>
  )
}

export function RitualMenu({ onConfess, onRitualComplete, mordiState }: RitualMenuProps) {
  const [activeRitual, setActiveRitual] = useState<RitualType>("menu")

  if (activeRitual === "candle") {
    return (
      <CandleRitual
        onComplete={() => {
          onRitualComplete("candle")
          setActiveRitual("menu")
        }}
        onCancel={() => setActiveRitual("menu")}
      />
    )
  }

  if (activeRitual === "sigil") {
    return (
      <SigilRitual
        onComplete={() => {
          onRitualComplete("sigil")
          setActiveRitual("menu")
        }}
        onCancel={() => setActiveRitual("menu")}
      />
    )
  }

  if (activeRitual === "offering") {
    return (
      <OfferingRitual
        onComplete={() => {
          onRitualComplete("offering")
          setActiveRitual("menu")
        }}
        onCancel={() => setActiveRitual("menu")}
      />
    )
  }

  return (
    <div className="w-full space-y-2">
      <PixelButton onClick={onConfess} disabled={mordiState === "fragmented"} className="w-full">
        confess
      </PixelButton>

      <div className="w-full flex justify-center gap-2">
        <PixelIconButton imageSrc="/images/flame-icon.png" label="flame" onClick={() => setActiveRitual("candle")} />
        <PixelIconButton imageSrc="/images/sigil-icon.png" label="sigil" onClick={() => setActiveRitual("sigil")} />
        <PixelIconButton imageSrc="/images/offer-icon.png" label="offer" onClick={() => setActiveRitual("offering")} />
      </div>
    </div>
  )
}
