"use client"

import { useState, useEffect, useCallback } from "react"

export type MordiStateType = "serene" | "hungry" | "weeping" | "watchful" | "judgmental" | "ascended" | "fragmented"

interface MordiStateReturn {
  mordiState: MordiStateType
  devotion: number
  updateDevotion: (amount: number) => void
  triggerInteraction: (type: string) => void
}

export function useMordiState(): MordiStateReturn {
  const [devotion, setDevotion] = useState(50)
  const [interactions, setInteractions] = useState(0)
  const [lastInteraction, setLastInteraction] = useState<number>(Date.now())
  const [mordiState, setMordiState] = useState<MordiStateType>("serene")

  // Calculate state based on devotion and interaction patterns
  useEffect(() => {
    const timeSinceInteraction = Date.now() - lastInteraction
    const isNeglected = timeSinceInteraction > 60000 // 1 minute for demo

    let newState: MordiStateType = "serene"

    if (devotion < 20) {
      newState = "fragmented"
    } else if (devotion < 40) {
      newState = isNeglected ? "hungry" : "weeping"
    } else if (devotion < 60) {
      newState = isNeglected ? "watchful" : "serene"
    } else if (devotion < 80) {
      newState = interactions > 10 ? "judgmental" : "watchful"
    } else {
      newState = "ascended"
    }

    setMordiState(newState)
  }, [devotion, lastInteraction, interactions])

  // Decay devotion over time
  useEffect(() => {
    const decay = setInterval(() => {
      setDevotion((prev) => Math.max(0, prev - 1))
    }, 30000) // Decay every 30 seconds

    return () => clearInterval(decay)
  }, [])

  const updateDevotion = useCallback((amount: number) => {
    setDevotion((prev) => Math.min(100, Math.max(0, prev + amount)))
  }, [])

  const triggerInteraction = useCallback((type: string) => {
    setLastInteraction(Date.now())
    setInteractions((prev) => prev + 1)
    console.log("[v0] Interaction triggered:", type)
  }, [])

  return {
    mordiState,
    devotion,
    updateDevotion,
    triggerInteraction,
  }
}
