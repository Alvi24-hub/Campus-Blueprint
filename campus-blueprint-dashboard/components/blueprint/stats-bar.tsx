import { CircleCheck, Grid2x2, LoaderCircle, Users } from "lucide-react"

const STATS = [
  {
    label: "Total Rooms",
    value: "45",
    caption: "Floor 3 inventory",
    icon: Grid2x2,
    tone: "text-ink-muted",
    bg: "bg-canvas",
  },
  {
    label: "Available Now",
    value: "12",
    caption: "Ready for session / booking",
    icon: CircleCheck,
    tone: "text-room-laboratory",
    bg: "bg-room-laboratory/10",
  },
  {
    label: "Occupied",
    value: "28",
    caption: "62.2% utilization rate",
    icon: LoaderCircle,
    tone: "text-copper",
    bg: "bg-copper-soft",
  },
  {
    label: "Capacity",
    value: "1200",
    caption: "Total seat allocation",
    icon: Users,
    tone: "text-room-office",
    bg: "bg-room-office/10",
  },
]

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-3 border-t border-line bg-panel/60 p-4 md:grid-cols-4 md:px-6">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center justify-between rounded-lg border border-line bg-panel p-4"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-ink">
              {stat.value}
            </p>
            <p className="mt-0.5 text-[11px] text-ink-muted">{stat.caption}</p>
          </div>
          <span
            className={`flex size-10 items-center justify-center rounded-lg ${stat.bg} ${stat.tone}`}
          >
            <stat.icon className="size-5" strokeWidth={1.6} />
          </span>
        </div>
      ))}
    </div>
  )
}
