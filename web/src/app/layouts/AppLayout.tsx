import { Link, NavLink, Outlet, useLocation } from "react-router"
import features from "@features"
import { CommandPalette } from "@/components/common/CommandPalette"
import { NotificationBell } from "@/components/common/NotificationBell"
import { FondoMarca, Logo } from "@/components/brand"
import identity from "@design/identity.json"
import { cn } from "@/lib/utils"
import { useSession } from "@/lib/session"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

/** Identity name, from design/identity.json (also the PWA name and the page title). */
export const APP_NAME: string = identity.name

/** Demo candidate shown in the header (the demo is candidate-only: Pilar). */
const CANDIDATA = "Pilar"

/** One flow only (offers → CV → interview), so the menu has a single entry. Add entries here to grow it. */
const menu = [{ to: "/", label: "Ofertas", activeOn: ["/", "/ofertas"] }]

export function AppLayout() {
  const { user, signOut } = useSession()
  const { pathname } = useLocation()

  return (
    <div className="relative flex min-h-svh flex-col">
      <FondoMarca />
      <a
        href="#contenido"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-lg font-semibold text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Saltar al contenido
      </a>

      <header data-no-print className="relative z-20 bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-6 px-4 md:px-8">
          <Link to="/" aria-label={`${APP_NAME}: inicio`} className="rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring">
            <Logo />
          </Link>
          <nav aria-label="Principal" className="flex items-center gap-1">
            {menu.map(({ to, label, activeOn }) => {
              const active = activeOn.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p)))
              return (
                <NavLink
                  key={to}
                  to={to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-lg font-semibold text-muted-foreground hover:text-foreground focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
                    active && "text-foreground after:absolute after:inset-x-3 after:-bottom-[3px] after:h-[3px] after:bg-primary",
                  )}
                >
                  {label}
                </NavLink>
              )
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {features.notifications && (!features.auth || user) && <NotificationBell />}
            {features.auth && user ? (
              <>
                <span className="hidden px-2 text-lg text-muted-foreground sm:inline">{user.name || user.email}</span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut aria-hidden /> <span className="hidden sm:inline">Salir</span>
                </Button>
              </>
            ) : (
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span aria-hidden className="grid size-9 place-items-center rounded-full bg-accent font-bold text-accent-foreground">
                  {CANDIDATA[0]}
                </span>
                {CANDIDATA}
              </span>
            )}
          </div>
        </div>
        {/* Poster bands under the header: forest, then mint. */}
        <div aria-hidden className="h-[3px] bg-primary" />
        <div aria-hidden className="h-[3px] bg-accent" />
      </header>

      <main id="contenido" tabIndex={-1} className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-5 outline-none md:px-8">
        <Outlet />
      </main>
      <CommandPalette />
    </div>
  )
}
