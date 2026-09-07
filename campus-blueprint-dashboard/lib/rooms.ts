export type RoomType =
  | "Classroom"
  | "Laboratory"
  | "Faculty Cabin"
  | "Office"
  | "Seminar Hall"

export type RoomStatus = "Available" | "Occupied" | "Maintenance"

export type Room = {
  id: string
  name: string
  type: RoomType
  capacity: number
  department: string
  equipment: string[]
  status: RoomStatus
  /** grid placement on the blueprint (12-col grid) */
  col: number
  colSpan: number
  row: number
  rowSpan: number
}

export const ROOM_META: Record<
  RoomType,
  { token: string; hex: string; short: string }
> = {
  Classroom: { token: "room-classroom", hex: "#4A90D9", short: "CLS" },
  Laboratory: { token: "room-laboratory", hex: "#2ECC71", short: "LAB" },
  "Faculty Cabin": { token: "room-cabin", hex: "#E67E22", short: "CAB" },
  Office: { token: "room-office", hex: "#9B59B6", short: "OFF" },
  "Seminar Hall": { token: "room-seminar", hex: "#E74C3C", short: "SEM" },
}

export const ROOMS: Room[] = [
  {
    id: "R301",
    name: "R301 Lecture Hall",
    type: "Classroom",
    capacity: 60,
    department: "General Academics",
    equipment: ["4K Projector", "Smart Board", "PA System", "AC"],
    status: "Occupied",
    col: 1,
    colSpan: 4,
    row: 1,
    rowSpan: 1,
  },
  {
    id: "R302",
    name: "R302 Advanced Seminar",
    type: "Classroom",
    capacity: 60,
    department: "General Academics",
    equipment: ["Projector", "Whiteboard", "AC"],
    status: "Available",
    col: 5,
    colSpan: 4,
    row: 1,
    rowSpan: 1,
  },
  {
    id: "R303",
    name: "R303 Informatics",
    type: "Classroom",
    capacity: 60,
    department: "Computer Science",
    equipment: ["Projector", "Whiteboard", "AC"],
    status: "Occupied",
    col: 9,
    colSpan: 4,
    row: 1,
    rowSpan: 1,
  },
  {
    id: "LAB304",
    name: "LAB 304 Micro-Electronics",
    type: "Laboratory",
    capacity: 40,
    department: "Electronics & Comm.",
    equipment: ["Oscilloscopes", "Soldering Stations", "Fume Hood", "Emergency Shower"],
    status: "Occupied",
    col: 1,
    colSpan: 4,
    row: 2,
    rowSpan: 1,
  },
  {
    id: "LAB305",
    name: "LAB 305 Fabrication",
    type: "Laboratory",
    capacity: 40,
    department: "Mechanical Eng.",
    equipment: ["3D Printers", "CNC Bench", "Ventilation", "Tool Wall"],
    status: "Available",
    col: 5,
    colSpan: 2,
    row: 2,
    rowSpan: 1,
  },
  {
    id: "CABIN310",
    name: "Cabin 310",
    type: "Faculty Cabin",
    capacity: 1,
    department: "Computer Science",
    equipment: ["Workstation", "Bookshelf", "AC"],
    status: "Occupied",
    col: 7,
    colSpan: 2,
    row: 2,
    rowSpan: 1,
  },
  {
    id: "CABIN315",
    name: "Cabin 315",
    type: "Faculty Cabin",
    capacity: 1,
    department: "Electronics & Comm.",
    equipment: ["Workstation", "Bookshelf"],
    status: "Available",
    col: 9,
    colSpan: 2,
    row: 2,
    rowSpan: 1,
  },
  {
    id: "CSE OFFICE",
    name: "CSE Office / Admin",
    type: "Office",
    capacity: 10,
    department: "Computer Science",
    equipment: ["Reception Desk", "Filing Units", "Printer", "AC"],
    status: "Occupied",
    col: 11,
    colSpan: 2,
    row: 2,
    rowSpan: 1,
  },
  {
    id: "SEMINAR",
    name: "Seminar Hall",
    type: "Seminar Hall",
    capacity: 80,
    department: "Shared Facility",
    equipment: ["Tiered Seating", "Dual Projectors", "Sound Desk", "Recording Rig"],
    status: "Available",
    col: 1,
    colSpan: 12,
    row: 3,
    rowSpan: 1,
  },
]

export const BLOCKS = [
  { id: "AB1", label: "Academic Block 1", short: "AB1", units: 38 },
  { id: "AB2", label: "Academic Block 2", short: "AB2", units: 45 },
  { id: "AB3", label: "Academic Block 3", short: "AB3", units: 52 },
]

export const FLOORS = ["G", "1", "2", "3", "4"]

export const FILTERS: { type: RoomType; count: number }[] = [
  { type: "Classroom", count: 14 },
  { type: "Laboratory", count: 12 },
  { type: "Faculty Cabin", count: 11 },
  { type: "Seminar Hall", count: 8 },
]

export const LEGEND: { type: RoomType; label: string }[] = [
  { type: "Classroom", label: "Classroom" },
  { type: "Laboratory", label: "Laboratory" },
  { type: "Faculty Cabin", label: "Faculty Cabin" },
  { type: "Office", label: "Office / Administration" },
  { type: "Seminar Hall", label: "Seminar Hall" },
]
