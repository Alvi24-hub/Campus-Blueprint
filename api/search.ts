 
// ============================================
// api/search.ts
// Search across rooms and faculty
// Used by: SearchBar component (Shreyas - the "wow" moment)
// ============================================

import { supabase } from './client';

// Type definitions for search results
export interface SearchResult {
  result_type: 'room' | 'faculty';
  result_id: number;
  label: string;      // display name (room name or faculty name)
  subtitle: string;   // room code or faculty designation
  extra_info: string; // capacity/type or room assignment
}

/**
 * Search for rooms by code/name OR faculty by name
 * @param searchTerm - The text to search for (e.g., "Rajesh" or "LAB304")
 * @returns Array of SearchResult objects
 */
export async function searchAll(searchTerm: string): Promise<SearchResult[]> {
  // If search term is empty, return empty array
  if (!searchTerm || searchTerm.trim().length === 0) {
    return [];
  }

  // Call the PostgreSQL search function
  const { data, error } = await supabase.rpc(
    'search_all',
    { p_search_term: searchTerm.trim() }
  );

  if (error) {
    console.error('Error searching:', error);
    throw error;
  }

  // Type assertion - the data from Supabase matches our SearchResult type
  return data as SearchResult[];
}

/**
 * Search for rooms only (for filtering by room code/name)
 */
export async function searchRooms(searchTerm: string): Promise<SearchResult[]> {
  const results = await searchAll(searchTerm);
  return results.filter(r => r.result_type === 'room');
}

/**
 * Search for faculty only (for finding professors)
 */
export async function searchFaculty(searchTerm: string): Promise<SearchResult[]> {
  const results = await searchAll(searchTerm);
  return results.filter(r => r.result_type === 'faculty');
}