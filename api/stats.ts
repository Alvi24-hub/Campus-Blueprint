 
// ============================================
// api/stats.ts
// Get statistics for a building
// Used by: StatisticsPanel component (Alvira)
// ============================================

import { supabase } from './client';

// Type definitions
export interface TypeStat {
  code: string;        // e.g., 'CLASSROOM'
  name: string;        // e.g., 'Classroom'
  count: number;       // e.g., 3
  capacity: number;    // e.g., 150
}

export interface BuildingStats {
  total_rooms: number;
  total_capacity: number;
  by_type: TypeStat[];
}

/**
 * Get statistics for a building
 * @param buildingId - The ID of the building (from buildings table)
 * @returns BuildingStats object with totals and breakdown by type
 */
export async function getBuildingStats(buildingId: number): Promise<BuildingStats | null> {
  // Call the PostgreSQL function
  const { data, error } = await supabase.rpc(
    'get_building_stats',
    { p_building_id: buildingId }
  );

  if (error) {
    console.error('Error getting building stats:', error);
    throw error;
  }

  // The function returns a JSON object that matches our BuildingStats type
  return data as BuildingStats;
}

/**
 * Get stats for all buildings (useful for building selector)
 */
export async function getAllBuildingStats(): Promise<Record<number, BuildingStats>> {
  // First, get all buildings
  const { data: buildings, error: buildingsError } = await supabase
    .from('buildings')
    .select('id');

  if (buildingsError) {
    console.error('Error fetching buildings:', buildingsError);
    throw buildingsError;
  }

  // Get stats for each building in parallel
  const statsPromises = buildings.map(async (building) => {
    const stats = await getBuildingStats(building.id);
    return { [building.id]: stats };
  });

  const statsArray = await Promise.all(statsPromises);
  
  // Combine into a single object
  const result: Record<number, BuildingStats> = {};
  statsArray.forEach((item) => {
    Object.assign(result, item);
  });

  return result;
}