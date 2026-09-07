"use client"

import { Compass, Users, Building2, Wrench, X } from "lucide-react"
import { ROOM_META, type Room, type RoomStatus } from "@/lib/rooms"

const STATUS_STYLES: Record<RoomStatus, { dot: string; text: string; label: string }> = {
  Available: { dot: "bg-room-laboratory", text: "text-room-laboratory", label: "Available now" },
  Occupied: { dot: "bg-copper", text: "text-copper", label: "In progress" },
  Maintenance: { dot: "bg-room-cabin", text: "text-room-cabin", label: "Under maintenance" },
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 border-b border-line py-3 last:border-0">
      <span className="mt-0.5 text-ink-muted">{icon}</span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
          {label}
        </p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  )
}

export function RoomPanel({
  room,
  onClose,
}: {
  room: Room | null
  onClose: () => void
}) {
  return (
    <aside className="w-full shrink-0 border-l border-line bg-panel/60 p-4 md:w-80 md:overflow-y-auto">
      {!room ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line px-6 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-copper-soft">
            <Compass className="size-6 text-copper" strokeWidth={1.4} />
          </div>
          <p className="text-sm font-semibold text-ink">No Room Selected</p>
          <p className="text-xs leading-relaxed text-ink-muted text-pretty">
            Click any room or laboratory on the blueprint to inspect capacity,
            scheduled sessions, and hardware manifest.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span
                className="inline-block rounded-[3px] px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-white"
                style={{ backgroundColor: ROOM_META[room.type].hex }}
              >
                {room.type}
              </span>
              <h3 className="mt-2 font-mono text-lg font-semibold tracking-wide text-ink">
                {room.id}
              </h3>
              <p className="text-sm text-ink-muted">{room.name}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="flex size-8 items-center justify-center rounded-md border border-line text-ink-muted hover:border-copper/40 hover:text-copper"
            >
              <X className="size-4" />
            </button>
          </div>

          <div
            className="mt-4 flex items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2"
          >
            <span className={`size-2.5 rounded-full ${STATUS_STYLES[room.status].dot}`} />
            <span className={`text-sm font-medium ${STATUS_STYLES[room.status].text}`}>
              {STATUS_STYLES[room.status].label}
            </span>
          </div>

          <div className="mt-4">
            <DetailRow
              icon={<Users className="size-4" strokeWidth={1.6} />}
              label="Capacity"
              value={`${room.capacity} ${room.capacity === 1 ? "occupant" : "seats"}`}
            />
            <DetailRow
              icon={<Building2 className="size-4" strokeWidth={1.6} />}
              label="Department"
              value={room.department}
            />
          </div>

          <div className="mt-4">
            <p className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              <Wrench className="size-3.5" strokeWidth={1.6} />
              Hardware Manifest
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {room.equipment.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-canvas px-2 py-1 text-xs text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </aside>
  )
}
