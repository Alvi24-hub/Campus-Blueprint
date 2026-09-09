import { supabase } from '../lib/supabase'
import type { Building, Floor, Space, SpaceType, Faculty, TimetableEntry, Department } from '../types'

// ----- Buildings -----
export async function getBuildings() {
  const { data, error } = await supabase
    .from('buildings')
    .select('*')
    .order('name')
  if (error) throw error
  return data as Building[]
}

// ----- Floors -----
export async function getFloorsByBuilding(buildingId: string) {
  const { data, error } = await supabase
    .from('floors')
    .select('*')
    .eq('building_id', buildingId)
    .order('level')
  if (error) throw error
  return data as Floor[]
}

// ----- Spaces -----
export async function getSpacesByFloor(floorId: string) {
  const { data, error } = await supabase
    .from('spaces')
    .select(`
      *,
      space_type:space_type_id (*),
      department:department_id (*)
    `)
    .eq('floor_id', floorId)
  if (error) throw error
  return data as (Space & { space_type: SpaceType; department?: Department })[]
}

// ----- Single space with details -----
export async function getSpaceDetails(spaceId: string) {
  const { data, error } = await supabase
    .from('spaces')
    .select(`
      *,
      space_type:space_type_id (*),
      department:department_id (*),
      timetable_entries (*)
    `)
    .eq('id', spaceId)
    .single()
  if (error) throw error
  return data as Space & { space_type: SpaceType; department?: Department; timetable_entries: TimetableEntry[] }
}

// ----- Faculty -----
export async function getFacultyByDepartment(departmentId: string) {
  const { data, error } = await supabase
    .from('faculty')
    .select('*')
    .eq('department_id', departmentId)
  if (error) throw error
  return data as Faculty[]
}

export async function getAllFaculty() {
  const { data, error } = await supabase
    .from('faculty')
    .select('*')
    .order('name')
  if (error) throw error
  return data as Faculty[]
}
