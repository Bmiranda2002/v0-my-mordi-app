"use client"

import Image from "next/image"
import type { MordiStateType } from "@/hooks/use-mordi-state"

interface MordiCharacterProps {
  state: MordiStateType
  onTap: () => void
}

export function MordiCharacter({ state, onTap }: MordiCharacterProps) {
  const stateStyles: Record<MordiStateType, string> = {
    serene: "opacity-100",
    hungry: "opacity-80 brightness-75",
    weeping: "opacity-90 brightness-90 saturate-0",
    watchful: "opacity-100 contrast-125",
    judgmental: "opacity-100 contrast-150 brightness-110",
    ascended: "opacity-95 brightness-125",
    fragmented: "opacity-70 brightness-50 blur-[1px]",
  }

  const stateAnimations: Record<MordiStateType, string> = {
    serene: "breathe",
    hungry: "animate-pulse",
    weeping: "",
    watchful: "",
    judgmental: "animate-[shake_0.5s_ease-in-out_infinite]",
    ascended: "animate-[float_3s_ease-in-out_infinite]",
    fragmented: "animate-[glitch_0.3s_ease-in-out_infinite]",
  }

  return (
    <button
      onClick={onTap}
      className={`group relative transition-all duration-1000 ${stateStyles[state]} ${stateAnimations[state]}`}
      aria-label="Interact with Mordi"
    >
      <div className="relative z-10">
        <Image
          src="/images/my-20mordi.png"
          alt="Mordi - Angel Rabbit"
          width={800}
          height={960}
          className="h-[36rem] w-auto sm:h-[40rem] pixelated drop-shadow-[0_0_2px_rgba(0,0,0,1)] drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          style={{ imageRendering: "pixelated" }}
          priority
        />
      </div>

      {/* Weeping tears overlay */}
      {state === "weeping" && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute top-[35%] left-[30%] w-1 h-8 bg-white/60 animate-[drip_2s_ease-in-out_infinite]" />
          <div className="absolute top-[35%] right-[30%] w-1 h-8 bg-white/60 animate-[drip_2s_ease-in-out_infinite_0.5s]" />
        </div>
      )}

      {/* Tap indicator */}
      <div className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-50 z-30">
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-white/30" />
      </div>
    </button>
  )
}
