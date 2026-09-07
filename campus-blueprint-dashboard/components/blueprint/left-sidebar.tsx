"use client"

import { BookMarked, Check, Library, School } from "lucide-react"
import {
  BLOCKS,
  FILTERS,
  FLOORS,
  LEGEND,
  ROOM_META,
  type RoomType,
} from "@/lib/rooms"

const BLOCK_ICONS = [School, Library, BookMarked]

type Props = {
  activeBlock: string
  onBlockChange: (id: string) => void
  activeFloor: string
  onFloorChange: (floor: string) => void
  activeFilters: RoomType[]
  onToggleFilter: (type: RoomType) => void
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
      {children}
    </h2>
  )
}

export function LeftSidebar({
  activeBlock,
  onBlockChange,
  activeFloor,
  onFloorChange,
  activeFilters,
  onToggleFilter,
}: Props) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 border-r border-line bg-panel/60 p-4 md:w-64 md:overflow-y-auto">
      <section>
        <SectionLabel>Academic Blocks</SectionLabel>
        <div className="flex flex-col gap-2">
          {BLOCKS.map((block, i) => {
            const Icon = BLOCK_ICONS[i] ?? School
            const active = block.id === activeBlock
            return (
              <button
                key={block.id}
                type="button"
                onClick={() => onBlockChange(block.id)}
                className={[
                  "flex items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-colors",
                  active
                    ? "border-copper bg-copper-soft"
                    : "border-line bg-canvas hover:border-copper/40",
                ].join(" ")}
              >
                <span className="flex items-center gap-2.5">
                  <Icon
                    className={active ? "size-4 text-copper" : "size-4 text-ink-muted"}
                    strokeWidth={1.6}
                  />
                  <span className="text-sm font-medium text-ink">{block.short}</span>
                </span>
                {active ? (
                  <span className="rounded-full bg-copper px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Active Scope
                  </span>
                ) : (
                  <span className="font-mono text-[11px] text-ink-muted">
                    {block.units} Units
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <SectionLabel>Vertical Elevation</SectionLabel>
        <p className="mb-2 font-mono text-[11px] text-ink-muted">
          +18.40m AGL
        </p>
        <div className="grid grid-cols-5 gap-1.5">
          {FLOORS.map((floor) => {
            const active = floor === activeFloor
            return (
              <button
                key={floor}
                type="button"
                onClick={() => onFloorChange(floor)}
                className={[
                  "flex h-9 items-center justify-center rounded-md border font-mono text-sm font-medium transition-colors",
                  active
                    ? "border-copper bg-copper text-white"
                    : "border-line bg-canvas text-ink-muted hover:border-copper/40",
                ].join(" ")}
              >
                {floor}
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <SectionLabel>Floor Classification Filter</SectionLabel>
        <div className="flex flex-col gap-1">
          {FILTERS.map(({ type, count }) => {
            const checked = activeFilters.includes(type)
            return (
              <button
                key={type}
                type="button"
                onClick={() => onToggleFilter(type)}
                className="flex items-center justify-between rounded-md px-1.5 py-2 text-left hover:bg-canvas"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={[
                      "flex size-4 items-center justify-center rounded-[4px] border transition-colors",
                      checked ? "border-copper bg-copper" : "border-ink-muted/40",
                    ].join(" ")}
                  >
                    {checked && <Check className="size-3 text-white" strokeWidth={3} />}
                  </span>
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: ROOM_META[type].hex }}
                  />
                  <span className="text-sm text-ink">{type}</span>
                </span>
                <span className="font-mono text-[11px] tabular-nums text-ink-muted">
                  {count.toString().padStart(2, "0")}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <SectionLabel>CAD Drafting Legend</SectionLabel>
        <div className="flex flex-col gap-2">
          {LEGEND.map(({ type, label }) => (
            <div key={type} className="flex items-center gap-2.5">
              <span
                className="size-3 rounded-sm"
                style={{ backgroundColor: ROOM_META[type].hex }}
              />
              <span className="text-xs text-ink-muted">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  )
}
