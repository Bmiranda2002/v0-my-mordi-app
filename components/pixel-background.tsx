"use client"

export function PixelBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 8-bit pixel grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pixel-grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect
              width="8"
              height="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pixel-grid)" />
      </svg>

      {/* Floating pixel crosses - decorative sacred elements */}
      <div className="absolute inset-0">
        {/* Top left cross */}
        <svg
          className="absolute top-[10%] left-[5%] w-8 h-8 opacity-10 animate-[float_8s_ease-in-out_infinite]"
          viewBox="0 0 16 16"
        >
          <rect x="7" y="0" width="2" height="16" fill="currentColor" className="text-foreground" />
          <rect x="0" y="7" width="16" height="2" fill="currentColor" className="text-foreground" />
        </svg>

        {/* Top right eye */}
        <svg
          className="absolute top-[15%] right-[10%] w-6 h-6 opacity-10 animate-[float_6s_ease-in-out_infinite_1s]"
          viewBox="0 0 12 12"
        >
          <rect x="4" y="0" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="0" y="4" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="8" y="4" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="4" y="8" width="4" height="4" fill="currentColor" className="text-foreground" />
        </svg>

        {/* Bottom left star */}
        <svg
          className="absolute bottom-[20%] left-[8%] w-10 h-10 opacity-10 animate-[float_7s_ease-in-out_infinite_2s]"
          viewBox="0 0 20 20"
        >
          <rect x="8" y="0" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="4" y="4" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="12" y="4" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="0" y="8" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="8" y="8" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="16" y="8" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="4" y="12" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="12" y="12" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="8" y="16" width="4" height="4" fill="currentColor" className="text-foreground" />
        </svg>

        {/* Bottom right moon */}
        <svg
          className="absolute bottom-[25%] right-[5%] w-8 h-8 opacity-10 animate-[float_9s_ease-in-out_infinite_0.5s]"
          viewBox="0 0 16 16"
        >
          <rect x="4" y="0" width="8" height="4" fill="currentColor" className="text-foreground" />
          <rect x="0" y="4" width="4" height="8" fill="currentColor" className="text-foreground" />
          <rect x="4" y="12" width="8" height="4" fill="currentColor" className="text-foreground" />
        </svg>

        {/* Center left wing fragment */}
        <svg
          className="absolute top-[45%] left-[3%] w-6 h-12 opacity-5 animate-[float_5s_ease-in-out_infinite_3s]"
          viewBox="0 0 12 24"
        >
          <rect x="8" y="0" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="4" y="4" width="8" height="4" fill="currentColor" className="text-foreground" />
          <rect x="0" y="8" width="12" height="4" fill="currentColor" className="text-foreground" />
          <rect x="0" y="12" width="8" height="4" fill="currentColor" className="text-foreground" />
          <rect x="0" y="16" width="4" height="4" fill="currentColor" className="text-foreground" />
        </svg>

        {/* Center right wing fragment */}
        <svg
          className="absolute top-[50%] right-[3%] w-6 h-12 opacity-5 animate-[float_5s_ease-in-out_infinite_4s]"
          viewBox="0 0 12 24"
        >
          <rect x="0" y="0" width="4" height="4" fill="currentColor" className="text-foreground" />
          <rect x="0" y="4" width="8" height="4" fill="currentColor" className="text-foreground" />
          <rect x="0" y="8" width="12" height="4" fill="currentColor" className="text-foreground" />
          <rect x="4" y="12" width="8" height="4" fill="currentColor" className="text-foreground" />
          <rect x="8" y="16" width="4" height="4" fill="currentColor" className="text-foreground" />
        </svg>

        {/* Small scattered pixels */}
        <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-foreground/5 animate-[blink_4s_ease-in-out_infinite]" />
        <div className="absolute top-[60%] right-[25%] w-2 h-2 bg-foreground/5 animate-[blink_3s_ease-in-out_infinite_1s]" />
        <div className="absolute top-[75%] left-[15%] w-2 h-2 bg-foreground/5 animate-[blink_5s_ease-in-out_infinite_2s]" />
        <div className="absolute top-[20%] right-[30%] w-2 h-2 bg-foreground/5 animate-[blink_4s_ease-in-out_infinite_3s]" />
      </div>
    </div>
  )
}
