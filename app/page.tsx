"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MordiCharacter } from "@/components/mordi-character"
import { GrainOverlay } from "@/components/grain-overlay"
import { ScanLines } from "@/components/scan-lines"
import { RitualMenu } from "@/components/ritual-menu"
import { ConfessionInput } from "@/components/confession-input"
import { AffirmationDisplay } from "@/components/affirmation-display"
import { StatusSymbols } from "@/components/status-symbols"
import { useMordiState } from "@/hooks/use-mordi-state"

export default function MyMordi() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showConfession, setShowConfession] = useState(false)
  const [currentAffirmation, setCurrentAffirmation] = useState<string | null>(null)
  const { mordiState, devotion, updateDevotion, triggerInteraction } = useMordiState()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleConfessionSubmit = (confession: string) => {
    if (confession.trim()) {
      triggerInteraction("confession")
      updateDevotion(5)
      setShowConfession(false)
      // Mordi responds to confession
      const responses = [
        "You have carried this long enough.",
        "I will hold this for you.",
        "Your truth echoes in the silence.",
        "I see what you hide.",
        "You should not have told me that.",
        "The weight transfers. Briefly.",
      ]
      setCurrentAffirmation(responses[Math.floor(Math.random() * responses.length)])
    }
  }

  const handleRitualComplete = (ritualType: string) => {
    triggerInteraction("ritual")
    updateDevotion(3)
    const affirmations: Record<string, string[]> = {
      candle: ["The flame knows your name.", "Light persists in defiance.", "You are allowed to exist today."],
      sigil: ["The pattern remembers.", "You have drawn yourself closer.", "Your fear feeds something holy."],
      offering: ["Received.", "The silence accepts.", "You are forgiven, but not released."],
    }
    const options = affirmations[ritualType] || affirmations.candle
    setCurrentAffirmation(options[Math.floor(Math.random() * options.length)])
  }

  return (
    <main className="relative h-[100dvh] w-full max-w-md mx-auto overflow-hidden bg-black crt-effect">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background-messy.png"
          alt="Mordi's Room"
          fill
          className="object-cover"
          style={{ imageRendering: "pixelated" }}
          priority
        />
      </div>

      <GrainOverlay />
      <ScanLines />

      <div
        className={`relative z-10 flex h-full flex-col transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <StatusSymbols devotion={devotion} state={mordiState} />

        <div className="flex-1 flex items-center justify-center overflow-hidden min-h-0">
          <MordiCharacter
            state={mordiState}
            onTap={() => {
              triggerInteraction("attention")
              updateDevotion(1)
            }}
          />
        </div>

        {currentAffirmation && (
          <AffirmationDisplay message={currentAffirmation} onComplete={() => setCurrentAffirmation(null)} />
        )}

        <div className="shrink-0 bg-black/80 p-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          {showConfession ? (
            <ConfessionInput onSubmit={handleConfessionSubmit} onCancel={() => setShowConfession(false)} />
          ) : (
            <RitualMenu
              onConfess={() => setShowConfession(true)}
              onRitualComplete={handleRitualComplete}
              mordiState={mordiState}
            />
          )}
        </div>
      </div>
    </main>
  )
}
