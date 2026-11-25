import { cn } from "@/lib/utils"

/**
 * Poster geometry inside a section (absolute, fills its positioned parent):
 * a diagonal band pair on the top right and a corner triangle on the bottom right.
 * Decorative only: never intercepts controls or enters the reading order.
 */
export function Decoracion({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <path d="M760 0H812L1000 210V268Z" className="fill-accent" />
      <path d="M812 0H1000V210Z" className="fill-primary" opacity=".08" />
      <path d="M1000 430V600H700Z" className="fill-accent" />
      <path d="M1000 490V600H805Z" className="fill-primary" />
    </svg>
  )
}

/**
 * Page-wide brand background for the app frame (fixed to the viewport, behind content):
 * corner triangles in forest and mint like the deck, and thin diagonal bands like the poster.
 */
export function FondoMarca({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" data-no-print className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}>
      {/* Bottom-right corner: mint over forest, as on the content slides. */}
      <div className="absolute bottom-0 right-0 h-[150px] w-[260px] bg-accent [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
      <div className="absolute bottom-0 right-0 h-[104px] w-[180px] bg-primary [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
      {/* Top-right: the poster's chevron bands, thin and quiet. */}
      <div className="absolute right-0 top-0 h-[340px] w-[46vw] bg-accent/70 [clip-path:polygon(100%_8%,100%_14%,0_100%,0_94%)]" />
      <div className="absolute right-0 top-0 h-[340px] w-[46vw] bg-chart-3/15 [clip-path:polygon(100%_14%,100%_19%,0_105%,0_100%)]" />
      {/* Bottom-left: a small mint triangle to balance the corner. */}
      <div className="absolute bottom-0 left-0 h-[70px] w-[120px] bg-accent/60 [clip-path:polygon(0_0,100%_100%,0_100%)]" />
    </div>
  )
}
