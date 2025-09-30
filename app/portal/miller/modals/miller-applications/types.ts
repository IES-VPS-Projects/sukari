export interface ApplicationField {
  name: string
  label: string
  type: string
  options?: string[]
  required: boolean
}

export interface ApplicationType {
  id: string
  name: string
  description: string
  fields: ApplicationField[]
}

export interface SubmittedApplication {
  id: string
  type: string
  title: string
  purpose: string
  status: string
  stage: string
  applicant: string
  company: string
  submitDate: string
  completionDate: string | null
  expectedCompletion: string
  quantity: string
  notes: string
  submittedDate: string
  approvedDate: string | null
  validUntil: string | null
}

export interface FormData {
  // Basic fields
  millerLicenseNumber: string
  companyName: string
  date: string
  startDate: string
  endDate: string
  narrative: string
  productionCapacity: string
  facilityLocation: string
  equipmentDetails: string
  applicationType: string
  letterPurpose: string
  permitType: string
  licenseType: string
  bankName: string
  loanAmount: string
  importVolume: string
  sourceCountry: string
  sugarType: string
  importDate: string
  businessLocation: string
  storageCapacity: string
  importPeriod: string
  marketingPlan: string
  exportVolume: string
  destinationCountry: string
  exportDate: string
  exportCapacity: string
  dealingCapacity: string

  // Letter of Comfort specific fields
  category: string
  documentNo: string
  documentDate: string
  financialYear: string
  expiryDate: string
  licenseExpiryDate: string

  // Company Info fields (auto-populated)
  lrNumber: string
  postalAddress: string
  postalCode: string
  companyRegNumber: string
  pinNumber: string
  phoneNumber: string
  emailAddress: string
  county: string
  subcounty: string
  ward: string
  location: string
  buildingName: string
  streetName: string
  town: string
  establishmentDate: string
  legalStatus: string

  // Projected Capacity
  capacityTCD: string

  // Investment Financing Plan
  foreignEquity: string
  localEquity: string
  foreignLoan: string
  localLoan: string

  // Project Objectives
  projectObjectives: string

  // Investment Breakdown
  preExpenses: string
  landBuildings: string
  plantEquipment: string
  vehicles: string
  furnitureFittings: string
  workingCapital: string
  others: string
  total: string

  // Declaration checkboxes
  declarationA: string
  declarationB: string
  declarationC: string
  agreeTerms: string
}

export interface Director {
  id: number
  expanded: boolean
}

export interface SharedProps {
  formData: FormData
  handleInputChange: (field: string, value: string) => void
  handleFileUpload: (field: string, file: File | null) => void
  handleFileDelete: (field: string) => void
  uploadedFiles: Record<string, File | null>
  financingCurrency: string
  setFinancingCurrency: (currency: string) => void
  investmentCurrency: string
  setInvestmentCurrency: (currency: string) => void
  directors: Director[]
  addDirector: () => void
  removeDirector: (directorId: number) => void
  toggleDirectorExpansion: (directorId: number) => void
  selectedTab: string
  setSelectedTab: (tab: string) => void
  isDraftSaved: boolean
  isSubmitted: boolean
  handleSubmit: (e: React.FormEvent) => void
  handleSaveDraft: () => void
  expandedApplication: string
  setExpandedApplication: (id: string) => void
}