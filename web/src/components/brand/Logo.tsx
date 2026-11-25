import { cn } from "@/lib/utils"
import iconoUrl from "./logo-icono.png"

/** Brand mark: the gear-and-arrow icon (cropped from the poster logo, `pitch/public/logo-al-curro.png`) and the name in bold. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img src={iconoUrl} alt="" aria-hidden="true" className="h-9 w-auto" />
      <span className="text-xl font-extrabold tracking-tight text-primary">Al curro</span>
    </span>
  )
}
