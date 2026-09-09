import { supabase } from '../lib/supabase'

// This function will search rooms by code/name and faculty by name
// It returns grouped results: { rooms: Space[], faculty: Faculty[] }
export async function searchAll(query: string) {
  if (!query || query.trim().length < 2) {
    return { rooms: [], faculty: [] }
  }

  const searchTerm = `%${query.trim()}%`

  // Search spaces by code or name
  const { data: rooms, error: roomsError } = await supabase
    .from('spaces')
    .select(`
      *,
      floor:floor_id (id, level, building:building_id (id, code))
    `)
    .or(`code.ilike.${searchTerm}, name.ilike.${searchTerm}`)
    .limit(5)

  if (roomsError) throw roomsError

  // Search faculty by name
  const { data: faculty, error: facultyError } = await supabase
    .from('faculty')
    .select('*')
    .ilike('name', searchTerm)
    .limit(5)

  if (facultyError) throw facultyError

  return {
    rooms: rooms || [],
    faculty: faculty || [],
  }
}
