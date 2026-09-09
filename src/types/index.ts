export interface Building {
  id: string
  name: string
  code: string
}

export interface Floor {
  id: string
  building_id: string
  level: number | string
  name: string
}

export interface SpaceType {
  id: string
  name: string
  icon?: string
}

export interface Department {
  id: string
  name: string
  code: string
}

export interface Faculty {
  id: string
  name: string
  department_id: string
  email?: string
  phone?: string
}

export interface Space {
  id: string
  code: string
  floor_id: string
  space_type_id: string
  capacity: number
  department_id?: string
  name?: string
  equipment?: string[]
  status?: 'available' | 'occupied' | 'reserved' | 'unavailable'
}

export interface TimetableEntry {
  id: string
  space_id: string
  course_section_id: string
  day: string
  start_time: string
  end_time: string
}

export interface CourseSection {
  id: string
  course_id: string
  faculty_id: string
  section: string
}

export interface Course {
  id: string
  code: string
  name: string
}
