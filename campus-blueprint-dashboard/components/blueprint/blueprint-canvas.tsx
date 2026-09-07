"use client"

import { MousePointerClick, Minus, Plus } from "lucide-react"
import { ROOM_META, type Room, type RoomType } from "@/lib/rooms"

type Props = {
  title: string
  rooms: Room[]
  activeFilters: RoomType[]
  selectedId: string | null
  onSelect: (room: Room) => void
}

const GRID_LABELS = ["GRID A-01", "GRID A-04", "GRID A-08", "GRID A-12"]

export function BlueprintCanvas({
  title,
  rooms,
  activeFilters,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 p-4 md:p-6">
      <div className="shrink-0">
        <h2 className="text-lg font-semibold text-ink text-balance">{title}</h2>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
          <MousePointerClick className="size-4 text-copper" strokeWidth={1.6} />
          Hover room for quick spec · Click room to inspect details
        </p>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-line bg-panel p-4 md:p-6">
        {/* drafting grid background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* top grid axis labels */}
        <div className="relative mb-3 flex shrink-0 justify-between font-mono text-[10px] uppercase tracking-wider text-ink-muted/70">
          {GRID_LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col rounded-lg border-2 border-ink/70 p-3">
          {/* room grid: top row of 3, mid row, then full-width seminar */}
          <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-12 gap-3">
            {rooms.map((room) => (
              <RoomCell
                key={room.id}
                room={room}
                dimmed={!activeFilters.includes(room.type)}
                selected={room.id === selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>

          <div className="mt-3 shrink-0 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted/70">
            — Central Corridor (Circulation) —
          </div>
        </div>

        {/* scale bar + zoom */}
        <div className="relative mt-4 flex shrink-0 items-center justify-end gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            <span className="flex">
              <span className="h-2 w-6 border border-ink/60 bg-ink/60" />
              <span className="h-2 w-6 border border-ink/60" />
            </span>
            Scale 1 : 200
          </div>
          <div className="flex items-center overflow-hidden rounded-md border border-line">
            <button
              type="button"
              aria-label="Zoom in"
              className="flex size-8 items-center justify-center bg-canvas text-ink-muted hover:bg-copper-soft hover:text-copper"
            >
              <Plus className="size-4" />
            </button>
            <span className="h-8 w-px bg-line" />
            <button
              type="button"
              aria-label="Zoom out"
              className="flex size-8 items-center justify-center bg-canvas text-ink-muted hover:bg-copper-soft hover:text-copper"
            >
              <Minus className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function RoomCell({
  room,
  dimmed,
  selected,
  onSelect,
}: {
  room: Room
  dimmed: boolean
  selected: boolean
  onSelect: (room: Room) => void
}) {
  const hex = ROOM_META[room.type].hex

  return (
    <button
      type="button"
      onClick={() => onSelect(room)}
      title={`${room.name} · Capacity ${room.capacity}`}
      style={{
        gridColumn: `span ${room.colSpan} / span ${room.colSpan}`,
        gridRow: `span ${room.rowSpan} / span ${room.rowSpan}`,
        borderColor: hex,
        backgroundColor: `${hex}14`,
        boxShadow: selected ? `0 0 0 2px ${hex}, 0 8px 24px -8px ${hex}80` : undefined,
      }}
      className={[
        "group relative flex min-h-0 flex-col justify-between overflow-hidden rounded-md border-2 p-2.5 text-left transition-all duration-200",
        "hover:z-10 hover:scale-[1.03]",
        dimmed ? "opacity-25 grayscale" : "opacity-100",
      ].join(" ")}
    >
      {/* corner tick marks */}
      <span
        className="pointer-events-none absolute left-1 top-1 size-2 border-l-2 border-t-2 opacity-40"
        style={{ borderColor: hex }}
      />
      <span
        className="pointer-events-none absolute bottom-1 right-1 size-2 border-b-2 border-r-2 opacity-40"
        style={{ borderColor: hex }}
      />

      <span className="flex items-center gap-2">
        <span className="truncate font-mono text-[11px] font-semibold tracking-wide text-ink">
          {room.id}
        </span>
      </span>

      <span className="mt-1 line-clamp-2 text-[11px] font-medium leading-snug text-ink-muted">
        {room.name}
      </span>

      <span className="mt-1 shrink-0 font-mono text-[10px] text-ink-muted/80">
        CAP {room.capacity}
      </span>
    </button>
  )
}
