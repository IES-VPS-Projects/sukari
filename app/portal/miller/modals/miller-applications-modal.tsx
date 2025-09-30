"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Factory, Ship, ExternalLink, Store, Droplet, FileText } from "lucide-react"
import { StatusTab } from "./miller-applications/StatusTab"
import { MillerTab } from "./miller-applications/MillerTab"
import { ImporterTab } from "./miller-applications/ImporterTab"
import { ExporterTab } from "./miller-applications/ExporterTab"
import { SugarDealerTab } from "./miller-applications/SugarDealerTab"
import { MolassesDealerTab } from "./miller-applications/MolassesDealerTab"
import { FormData, SubmittedApplication, Director } from "./miller-applications/types"

interface MillerApplicationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MillerApplicationsModal({ open, onOpenChange }: MillerApplicationsModalProps) {
  const [activeTab, setActiveTab] = useState<'status' | 'miller' | 'importer' | 'exporter' | 'sugarDealer' | 'molassesDealer'>('status')
  const [submittedApplications] = useState<SubmittedApplication[]>([])
  const [expandedApplication, setExpandedApplication] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState<string>('companyDocs')
  const [isDraftSaved, setIsDraftSaved] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    millerLicenseNumber: "",
    companyName: "",
    date: "",
    startDate: "",
    endDate: "",
    narrative: "",
    productionCapacity: "",
    facilityLocation: "",
    equipmentDetails: "",
    applicationType: "",
    letterPurpose: "",
    permitType: "",
    licenseType: "",
    bankName: "",
    loanAmount: "",
    importVolume: "",
    sourceCountry: "",
    sugarType: "",
    importDate: "",
    businessLocation: "",
    storageCapacity: "",
    importPeriod: "",
    marketingPlan: "",
    exportVolume: "",
    destinationCountry: "",
    exportDate: "",
    exportCapacity: "",
    dealingCapacity: "",
    category: "",
    documentNo: "",
    documentDate: "",
    financialYear: "",
    expiryDate: "",
    licenseExpiryDate: "",
    lrNumber: "",
    postalAddress: "",
    postalCode: "",
    companyRegNumber: "",
    pinNumber: "",
    phoneNumber: "",
    emailAddress: "",
    county: "",
    subcounty: "",
    ward: "",
    location: "",
    buildingName: "",
    streetName: "",
    town: "",
    establishmentDate: "",
    legalStatus: "",
    capacityTCD: "",
    foreignEquity: "",
    localEquity: "",
    foreignLoan: "",
    localLoan: "",
    projectObjectives: "",
    preExpenses: "",
    landBuildings: "",
    plantEquipment: "",
    vehicles: "",
    furnitureFittings: "",
    workingCapital: "",
    others: "",
    total: "",
    declarationA: "",
    declarationB: "",
    declarationC: "",
    agreeTerms: ""
  })

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({})
  const [financingCurrency, setFinancingCurrency] = useState("USD")
  const [investmentCurrency, setInvestmentCurrency] = useState("USD")
  const [directors, setDirectors] = useState<Director[]>([
    { id: 1, expanded: false }
  ])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: file
    }))
  }

  const handleFileDelete = (field: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: null
    }))
  }

  const addDirector = () => {
    setDirectors(prev => [
      ...prev,
      { id: Date.now(), expanded: false }
    ])
  }

  const removeDirector = (directorId: number) => {
    setDirectors(prev => prev.filter(director => director.id !== directorId))
  }

  const toggleDirectorExpansion = (directorId: number) => {
    setDirectors(prev =>
      prev.map(director =>
        director.id === directorId
          ? { ...director, expanded: !director.expanded }
          : director
      )
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Handle form submission logic here
  }

  const handleSaveDraft = () => {
    setIsDraftSaved(true)
    // Handle save draft logic here
  }

  const sharedProps = {
    formData,
    handleInputChange,
    handleFileUpload,
    handleFileDelete,
    uploadedFiles,
    financingCurrency,
    setFinancingCurrency,
    investmentCurrency,
    setInvestmentCurrency,
    directors,
    addDirector,
    removeDirector,
    toggleDirectorExpansion,
    selectedTab,
    setSelectedTab,
    isDraftSaved,
    isSubmitted,
    handleSubmit,
    handleSaveDraft,
    expandedApplication,
    setExpandedApplication
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh]">
        <DialogHeader className="bg-gray-50 -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold">Applications</DialogTitle>
          <DialogDescription>
            Apply for Registration and License Applications & Renewals
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-b border-gray-200 mb-6">
          {[
            { id: 'status', label: 'Status', icon: FileText },
            { id: 'miller', label: 'Miller', icon: Factory },
            { id: 'importer', label: 'Importer', icon: Ship },
            { id: 'exporter', label: 'Exporter', icon: ExternalLink },
            { id: 'sugarDealer', label: 'Sugar Dealer', icon: Store },
            { id: 'molassesDealer', label: 'Molasses Dealer', icon: Droplet }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === id
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
          {activeTab === 'status' && (
            <StatusTab submittedApplications={submittedApplications} />
          )}

          {activeTab === 'miller' && (
            <MillerTab {...sharedProps} />
          )}

          {activeTab === 'importer' && (
            <ImporterTab {...sharedProps} />
          )}

          {activeTab === 'exporter' && (
            <ExporterTab {...sharedProps} />
          )}

          {activeTab === 'sugarDealer' && (
            <SugarDealerTab {...sharedProps} />
          )}

          {activeTab === 'molassesDealer' && (
            <MolassesDealerTab {...sharedProps} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}