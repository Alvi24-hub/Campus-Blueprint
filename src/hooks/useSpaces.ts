import { useQuery } from '@tanstack/react-query'
import { getBuildings, getFloorsByBuilding, getSpacesByFloor, getSpaceDetails, getAllFaculty } from '../api/spaces'
import { searchAll } from '../api/search'

// ----- Buildings -----
export function useBuildings() {
  return useQuery({
    queryKey: ['buildings'],
    queryFn: getBuildings,
  })
}

// ----- Floors by building -----
export function useFloors(buildingId: string | null) {
  return useQuery({
    queryKey: ['floors', buildingId],
    queryFn: () => getFloorsByBuilding(buildingId!),
    enabled: !!buildingId,
  })
}

// ----- Spaces by floor -----
export function useSpaces(floorId: string | null) {
  return useQuery({
    queryKey: ['spaces', floorId],
    queryFn: () => getSpacesByFloor(floorId!),
    enabled: !!floorId,
  })
}

// ----- Single space details -----
export function useSpaceDetails(spaceId: string | null) {
  return useQuery({
    queryKey: ['space', spaceId],
    queryFn: () => getSpaceDetails(spaceId!),
    enabled: !!spaceId,
  })
}

// ----- All faculty -----
export function useAllFaculty() {
  return useQuery({
    queryKey: ['faculty'],
    queryFn: getAllFaculty,
  })
}

// ----- Search -----
export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchAll(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 30, // 30 seconds
  })
}
