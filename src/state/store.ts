import { create } from 'zustand'

interface AppState {
  selectedBuildingId: string | null
  selectedFloorId: string | null
  selectedSpaceId: string | null
  activeFilters: string[]
  setSelectedBuildingId: (id: string | null) => void
  setSelectedFloorId: (id: string | null) => void
  setSelectedSpaceId: (id: string | null) => void
  setActiveFilters: (filters: string[]) => void
  clearSelection: () => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedBuildingId: null,
  selectedFloorId: null,
  selectedSpaceId: null,
  activeFilters: [],
  setSelectedBuildingId: (id) => set({ selectedBuildingId: id }),
  setSelectedFloorId: (id) => set({ selectedFloorId: id }),
  setSelectedSpaceId: (id) => set({ selectedSpaceId: id }),
  setActiveFilters: (filters) => set({ activeFilters: filters }),
  clearSelection: () => set({ selectedSpaceId: null, activeFilters: [] }),
}))
