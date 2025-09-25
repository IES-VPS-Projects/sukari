export interface MappingAssignment {
  id: string
  farmerName: string
  farmerId: string
  location: string
  coordinates: {
    latitude: number
    longitude: number
  }
  size: string
  status: 'pending' | 'in-progress' | 'completed'
  dueDate: string
  assignedDate: string
}

export const mappingAssignments: MappingAssignment[] = [
  {
    id: "map-001",
    farmerName: "James Kamau",
    farmerId: "F-23401",
    location: "Kisumu County, Muhoroni Sub-County",
    coordinates: {
      latitude: -0.1546,
      longitude: 34.9895
    },
    size: "8.5 acres",
    status: "pending",
    dueDate: "2025-10-05",
    assignedDate: "2025-09-20"
  },
  {
    id: "map-002",
    farmerName: "Mary Atieno",
    farmerId: "F-23567",
    location: "Migori County, Awendo Sub-County",
    coordinates: {
      latitude: -0.9776,
      longitude: 34.5133
    },
    size: "12 acres",
    status: "in-progress",
    dueDate: "2025-10-03",
    assignedDate: "2025-09-18"
  },
  {
    id: "map-003",
    farmerName: "Hassan Omar",
    farmerId: "F-23702",
    location: "Kakamega County, Mumias Sub-County",
    coordinates: {
      latitude: 0.3426,
      longitude: 34.4871
    },
    size: "5.3 acres",
    status: "pending",
    dueDate: "2025-10-10",
    assignedDate: "2025-09-22"
  },
  {
    id: "map-004",
    farmerName: "Elizabeth Wanjiku",
    farmerId: "F-23895",
    location: "Busia County, Teso South Sub-County",
    coordinates: {
      latitude: 0.4578,
      longitude: 34.1123
    },
    size: "7.8 acres",
    status: "completed",
    dueDate: "2025-09-30",
    assignedDate: "2025-09-15"
  },
  {
    id: "map-005",
    farmerName: "John Odhiambo",
    farmerId: "F-24012",
    location: "Homa Bay County, Rachuonyo Sub-County",
    coordinates: {
      latitude: -0.5324,
      longitude: 34.7651
    },
    size: "9.2 acres",
    status: "pending",
    dueDate: "2025-10-12",
    assignedDate: "2025-09-24"
  }
]