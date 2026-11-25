import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const tonos = {
  /** Mint band with dark text, as the poster's "01" tags (default). */
  menta: "bg-accent text-accent-foreground",
  /** Forest band with light text, for use on light surfaces that need more weight. */
  bosque: "bg-primary text-primary-foreground",
} as const

/**
 * Poster-style arrow label (antetítulo): a band with a pointed right end and bold text.
 * Reusable by every screen: `<Etiqueta>Paso 1</Etiqueta>` or `<Etiqueta tono="bosque" as="p">…</Etiqueta>`.
 */
export function Etiqueta({
  children,
  className,
  tono = "menta",
  as: Tag = "span",
}: {
  children: ReactNode
  className?: string
  tono?: keyof typeof tonos
  as?: "span" | "p" | "div"
}) {
  return (
    <Tag
      className={cn("inline-block py-1 pl-3 pr-7 text-lg font-bold leading-snug", tonos[tono], className)}
      style={{ clipPath: "polygon(0 0, calc(100% - 0.85rem) 0, 100% 50%, calc(100% - 0.85rem) 100%, 0 100%)" }}
    >
      {children}
    </Tag>
  )
}
