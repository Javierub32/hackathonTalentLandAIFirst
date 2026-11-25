import type { ReactNode } from "react"

/** Poster-style arrow label. Uses the shared theme so other screens can reuse it. */
export function Etiqueta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span
    className={`inline-block bg-primary py-1 pl-3 pr-6 text-lg font-semibold text-primary-foreground ${className}`}
    style={{ clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)" }}
  >{children}</span>
}
