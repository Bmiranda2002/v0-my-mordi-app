export function ScanLines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.03]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 2px, transparent 3px)",
        backgroundSize: "100% 3px",
      }}
    />
  )
}
