 
// ============================================
// api/spaces.ts
// Fetch all spaces for a specific floor
// Used by: BlueprintViewer component (Shreyas)
// ============================================

import { supabase } from './client';

// Type definitions for what this function returns
export interface Space {
  id: number;
  code: string;
  display_name: string;
  capacity: number;
  description: string | null;
  blueprint_element_id: string;
  manual_status: string | null;
  derived_status: string | null; // from get_derived_status()
  
  // Related data (joined from other tables)
  building: {
    id: number;
    code: string;
    name: string;
  };
  floor: {
    id: number;
    floor_number: number;
    floor_name: string;
  };
  space_type: {
    id: number;
    code: string;
    display_name: string;
    hex_color: string;
    is_bookable: boolean;
  };
  department: {
    id: number;
    code: string;
    name: string;
  } | null;
}

/**
 * Fetch all spaces for a given floor
 * @param floorId - The ID of the floor (from floors table)
 * @returns Array of Space objects with derived status
 */
export async function getSpacesForFloor(floorId: number): Promise<Space[]> {
  // Step 1: Fetch all spaces for this floor
  const { data: spaces, error: spacesError } = await supabase
    .from('spaces')
    .select(`
      id,
      code,
      display_name,
      capacity,
      description,
      blueprint_element_id,
      manual_status,
      building:buildings (
        id,
        code,
        name
      ),
      floor:floors (
        id,
        floor_number,
        floor_name
      ),
      space_type:space_types (
        id,
        code,
        display_name,
        hex_color,
        is_bookable
      ),
      department:departments (
        id,
        code,
        name
      )
    `)
    .eq('floor_id', floorId)
    .order('code', { ascending: true });

  if (spacesError) {
    console.error('Error fetching spaces:', spacesError);
    throw spacesError;
  }

  if (!spaces || spaces.length === 0) {
    return [];
  }

  // Step 2: For each space, call get_derived_status()
  // We do this in parallel for performance
  const spacesWithStatus = await Promise.all(
    spaces.map(async (space: any) => {
      // Call the PostgreSQL function
      const { data: status, error: statusError } = await supabase.rpc(
        'get_derived_status',
        { p_space_id: space.id }
      );

      if (statusError) {
        console.error(`Error getting status for space ${space.id}:`, statusError);
        // Return the space with null status if there's an error
        return {
          ...space,
          derived_status: null,
        };
      }

      return {
        ...space,
        derived_status: status, // 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'UNAVAILABLE' | null
      };
    })
  );

  return spacesWithStatus as Space[];
}

/**
 * Fetch a single space by ID (for the detail panel)
 * @param spaceId - The ID of the space
 * @returns A single Space object or null
 */
export async function getSpaceById(spaceId: number): Promise<Space | null> {
  const { data: space, error } = await supabase
    .from('spaces')
    .select(`
      id,
      code,
      display_name,
      capacity,
      description,
      blueprint_element_id,
      manual_status,
      building:buildings (
        id,
        code,
        name
      ),
      floor:floors (
        id,
        floor_number,
        floor_name
      ),
      space_type:space_types (
        id,
        code,
        display_name,
        hex_color,
        is_bookable
      ),
      department:departments (
        id,
        code,
        name
      )
    `)
    .eq('id', spaceId)
    .single();

  if (error) {
    console.error('Error fetching space:', error);
    return null;
  }

  if (!space) {
    return null;
  }

  // Get derived status
  const { data: status, error: statusError } = await supabase.rpc(
    'get_derived_status',
    { p_space_id: space.id }
  );

  if (statusError) {
    console.error(`Error getting status for space ${space.id}:`, statusError);
    return {
      ...space,
      derived_status: null,
    } as Space;
  }

  return {
    ...space,
    derived_status: status,
  } as Space;
}