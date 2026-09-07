"use client"

import { useMemo, useState } from "react"
import { Header } from "@/components/blueprint/header"
import { LeftSidebar } from "@/components/blueprint/left-sidebar"
import { BlueprintCanvas } from "@/components/blueprint/blueprint-canvas"
import { RoomPanel } from "@/components/blueprint/room-panel"
import { StatsBar } from "@/components/blueprint/stats-bar"
import { BLOCKS, ROOMS, type Room, type RoomType } from "@/lib/rooms"

const ALL_TYPES: RoomType[] = [
  "Classroom",
  "Laboratory",
  "Faculty Cabin",
  "Office",
  "Seminar Hall",
]

export default function Page() {
  const [activeBlock, setActiveBlock] = useState("AB2")
  const [activeFloor, setActiveFloor] = useState("3")
  const [activeFilters, setActiveFilters] = useState<RoomType[]>(ALL_TYPES)
  const [selected, setSelected] = useState<Room | null>(null)

  const toggleFilter = (type: RoomType) =>
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    )

  const title = useMemo(() => {
    const block = BLOCKS.find((b) => b.id === activeBlock)
    return `${block?.label ?? "Academic Block"} · ${activeFloor === "G" ? "Ground" : `${activeFloor}${ordinal(activeFloor)}`} Floor`
  }, [activeBlock, activeFloor])

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-canvas text-ink">
      <Header />

      <div className="flex min-h-0 flex-1 flex-col md:flex-row md:overflow-hidden">
        <LeftSidebar
          activeBlock={activeBlock}
          onBlockChange={setActiveBlock}
          activeFloor={activeFloor}
          onFloorChange={setActiveFloor}
          activeFilters={activeFilters}
          onToggleFilter={toggleFilter}
        />

        <BlueprintCanvas
          title={title}
          rooms={ROOMS}
          activeFilters={activeFilters}
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
        />

        <RoomPanel room={selected} onClose={() => setSelected(null)} />
      </div>

      <StatsBar />
    </main>
  )
}

function ordinal(n: string) {
  const map: Record<string, string> = { "1": "st", "2": "nd", "3": "rd", "4": "th" }
  return map[n] ?? "th"
}
