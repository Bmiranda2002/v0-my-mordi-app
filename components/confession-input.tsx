"use client"

import { useState } from "react"

interface ConfessionInputProps {
  onSubmit: (confession: string) => void
  onCancel: () => void
}

export function ConfessionInput({ onSubmit, onCancel }: ConfessionInputProps) {
  const [text, setText] = useState("")

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text)
      setText("")
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-center font-mono text-xs uppercase tracking-widest text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
        speak your truth
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="..."
        className="
          h-28 w-full resize-none 
          bg-white text-black
          border-4 border-black
          px-3 py-2 
          font-mono text-sm 
          placeholder:text-black/40 
          focus:outline-none
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        "
        autoFocus
      />

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="
            flex-1 
            bg-black text-white
            border-4 border-white
            py-2 
            font-mono text-xs uppercase tracking-widest
            shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)]
            transition-all duration-100
            hover:translate-x-[2px] hover:translate-y-[2px]
            hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.8)]
            active:translate-x-[3px] active:translate-y-[3px]
            active:shadow-none
          "
        >
          return
        </button>
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="
            flex-1 
            bg-white text-black
            border-4 border-black
            py-2 
            font-mono text-xs uppercase tracking-widest
            shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
            transition-all duration-100
            hover:translate-x-[2px] hover:translate-y-[2px]
            hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
            active:translate-x-[3px] active:translate-y-[3px]
            active:shadow-none
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          confess
        </button>
      </div>

      <p className="text-center font-mono text-[10px] text-white/60 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
        your words will not be stored
      </p>
    </div>
  )
}
