import { cn } from "@/lib/utils"

/**
 * Poster geometry inside a section (absolute, top-right corner of its positioned parent):
 * a small mint-over-forest corner triangle. The large bands and corners live in `FondoMarca`,
 * once per page, so sections stay light. Decorative only: never intercepts controls or enters the reading order.
 */
export function Decoracion({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute right-0 top-0 h-[72px] w-[124px] bg-accent [clip-path:polygon(0_0,100%_0,100%_100%)]" />
      <div className="absolute right-0 top-0 h-[40px] w-[70px] bg-primary/80 [clip-path:polygon(0_0,100%_0,100%_100%)]" />
    </div>
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
