"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface SigilRitualProps {
  onComplete: () => void
  onCancel: () => void
}

interface Point {
  x: number
  y: number
}

export function SigilRitual({ onComplete, onCancel }: SigilRitualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState<Point[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)"
    ctx.lineWidth = 3
    ctx.beginPath()
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 50
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI)
    ctx.stroke()

    if (points.length > 1) {
      ctx.strokeStyle = "rgba(0, 0, 0, 0.9)"
      ctx.lineWidth = 3
      ctx.lineCap = "square"
      ctx.lineJoin = "miter"
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
      }
      ctx.stroke()
    }
  }, [points])

  useEffect(() => {
    if (points.length > 10) {
      const newProgress = Math.min(100, (points.length / 100) * 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        setTimeout(onComplete, 300)
      }
    }
  }, [points, onComplete])

  const getCanvasPoint = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const point = getCanvasPoint(e)
    if (point) {
      setIsDrawing(true)
      setPoints([point])
    }
  }

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return
    const point = getCanvasPoint(e)
    if (point) {
      setPoints((prev) => [...prev, point])
    }
  }

  const handleEnd = () => {
    setIsDrawing(false)
    if (progress < 100) {
      setTimeout(() => {
        setPoints([])
        setProgress(0)
      }, 500)
    }
  }

  return (
    <div className="relative space-y-3 py-2">
      <button
        onClick={onCancel}
        className="absolute -top-1 right-0 font-mono text-sm text-white hover:text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
      >
        [X]
      </button>

      <p className="text-center font-mono text-xs uppercase tracking-widest text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
        trace the pattern
      </p>

      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={160}
          height={160}
          className="cursor-crosshair touch-none border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      </div>

      <div className="h-4 w-full border-4 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <div className="h-full bg-black transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
