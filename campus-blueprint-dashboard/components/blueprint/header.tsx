import { Landmark, Search, ShieldCheck } from "lucide-react"

export function Header() {
  return (
    <header className="flex flex-col gap-4 border-b border-line bg-panel px-4 py-3 md:flex-row md:items-center md:gap-6 md:px-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-ink text-panel">
          <Landmark className="size-5" strokeWidth={1.5} />
        </div>
        <div className="leading-tight">
          <h1 className="text-sm font-semibold tracking-[0.18em] text-ink">
            CAMPUS BLUEPRINT
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            Cadastral Precision Spatial Registry
          </p>
        </div>
      </div>

      <div className="relative md:mx-auto md:w-full md:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
        <input
          type="search"
          placeholder="Search rooms, labs, faculty..."
          className="h-9 w-full rounded-full border border-line bg-canvas pl-9 pr-4 text-sm text-ink placeholder:text-ink-muted/70 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/30"
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-xs font-medium text-ink-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-room-laboratory opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-room-laboratory" />
          </span>
          Physical Plant Live
        </span>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-copper px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-copper/90"
        >
          <ShieldCheck className="size-4" strokeWidth={1.75} />
          Admin Portal
        </button>
      </div>
    </header>
  )
}
