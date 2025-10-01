export interface InspectionAssignment {
  id: string
  type: 'registration' | 'compliance' | 'operations' | 'verification' | 'other'
  title: string
  businessName: string
  businessId: string
  location: string
  contactPerson: string
  contactPhone: string
  status: 'pending' | 'in-progress' | 'completed'
  dueDate: string
  assignedDate: string
  description: string
  checklist?: string[]
  companyInfo?: {
    registrationNo?: string
    pinNumber?: string
    postalAddress?: string
    county?: string
    subcounty?: string
    email?: string
    establishmentDate?: string
    productionCapacity?: string
    facilitySize?: string
    employeeCount?: string
  }
}

export const inspectionAssignments: InspectionAssignment[] = [
  {
    id: "insp-mill-reg-001",
    type: "registration",
    title: "Mill Registration Physical Inspection",
    businessName: "Mumias Sugar Mills Ltd",
    businessId: "KSB/REG/2025/001",
    location: "Mumias-Kakamega road, Mumias, Kakamega County",
    contactPerson: "James Mwangi",
    contactPhone: "+254 712 345 678",
    status: "pending",
    dueDate: "2025-10-15",
    assignedDate: "2025-09-29",
    description: "Physical inspection of mill facilities for new registration application. Verify compliance with registration requirements and environmental standards.",
    checklist: [
      "Check on discharge of substances",
      "Air pollution assessment",
      "Hazardous Waste Management compliance",
      "Labelling of Sugar and Jaggery standards verification",
      "Verify no aid or abet illegal trafficking of sugar or related substances"
    ],
    companyInfo: {
      registrationNo: "CPR/2018/123456",
      pinNumber: "P051234567A",
      postalAddress: "P.O. Box 234, Mumias",
      county: "Kakamega",
      subcounty: "Mumias East",
      email: "info@mumiassugar.co.ke",
      establishmentDate: "2018-03-15",
      productionCapacity: "3,500 TCD (Tonnes Cane per Day)",
      facilitySize: "45 acres",
      employeeCount: "1,200"
    }
  },
  {
    id: "insp-001",
    type: "registration",
    title: "Registration Initial Inspection",
    businessName: "Mumias Sugar Company",
    businessId: "M-10045",
    location: "Kakamega County, Mumias East",
    contactPerson: "Samuel Wekesa",
    contactPhone: "+254 712 345 678",
    status: "pending",
    dueDate: "2025-10-01",
    assignedDate: "2025-09-22",
    description: "Conduct initial inspection for registration application. The mill is seeking approval to begin operations.",
    checklist: [
      "Verify mill facility meets structural requirements",
      "Inspect processing equipment and capacity",
      "Verify environmental compliance certificates",
      "Review waste management systems",
      "Verify water and electricity connections",
      "Check worker safety protocols and equipment",
      "Verify land ownership documents"
    ]
  },
  {
    id: "insp-002",
    type: "compliance",
    title: "Quarterly Compliance Inspection",
    businessName: "Butali Sugar Mills",
    businessId: "M-10023",
    location: "Kakamega County, Malava Sub-County",
    contactPerson: "Jane Nafula",
    contactPhone: "+254 722 456 789",
    status: "in-progress",
    dueDate: "2025-09-30",
    assignedDate: "2025-09-15",
    description: "Conduct quarterly compliance inspection to verify adherence to regulations and standards."
  },
  {
    id: "insp-003",
    type: "verification",
    title: "Import Verification Inspection",
    businessName: "East Africa Sugar Importers Ltd",
    businessId: "I-20089",
    location: "Mombasa County, Port Area",
    contactPerson: "Rajesh Patel",
    contactPhone: "+254 733 567 890",
    status: "pending",
    dueDate: "2025-10-05",
    assignedDate: "2025-09-23",
    description: "Verify imported sugar shipment documentation and quality standards compliance."
  },
  {
    id: "insp-004",
    type: "registration",
    title: "Registration Initial Inspection",
    businessName: "Busia Sugar Industries",
    businessId: "M-10067",
    location: "Busia County, Teso North",
    contactPerson: "Christine Akinyi",
    contactPhone: "+254 755 678 901",
    status: "pending",
    dueDate: "2025-10-08",
    assignedDate: "2025-09-24",
    description: "Conduct initial inspection for registration application for a new sugar processing facility.",
    checklist: [
      "Verify mill facility meets structural requirements",
      "Inspect processing equipment and capacity",
      "Verify environmental compliance certificates",
      "Review waste management systems",
      "Verify water and electricity connections",
      "Check worker safety protocols and equipment",
      "Verify land ownership documents"
    ]
  },
  {
    id: "insp-005",
    type: "operations",
    title: "Annual Operational Inspection",
    businessName: "West Kenya Sugar Company",
    businessId: "M-10012",
    location: "Kakamega County, Malava",
    contactPerson: "George Wafula",
    contactPhone: "+254 744 789 012",
    status: "completed",
    dueDate: "2025-09-20",
    assignedDate: "2025-09-10",
    description: "Complete annual operational inspection to verify compliance with industry standards and regulations."
  }
]