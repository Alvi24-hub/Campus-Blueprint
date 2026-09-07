 
// ============================================
// api/index.ts
// Barrel file - exports everything from all API modules
// Your teammates can import from '@/api' instead of individual files
// ============================================

// Export the supabase client (for advanced use cases)
export { supabase } from './client';
export type { SupabaseClientType } from './client';

// Export from spaces.ts
export { getSpacesForFloor, getSpaceById } from './spaces';
export type { Space } from './spaces';

// Export from search.ts
export { searchAll, searchRooms, searchFaculty } from './search';
export type { SearchResult } from './search';

// Export from stats.ts
export { getBuildingStats, getAllBuildingStats } from './stats';
export type { BuildingStats, TypeStat } from './stats';