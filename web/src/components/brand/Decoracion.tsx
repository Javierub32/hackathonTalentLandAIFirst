/** Decorative poster geometry: never intercepts controls or enters the reading order. */
export function Decoracion({ className = "" }: { className?: string }) {
  return <svg
    viewBox="0 0 1000 600"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
    className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
  >
    <path d="M750 0H1000V600H350Z" className="fill-primary" opacity=".12" />
    <path d="M0 440V600H220Z" className="fill-accent" />
  </svg>
}
