"use client";

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { CollapsibleSection } from "@/components/ui/collapsible-section"
import { FileText, Download } from "lucide-react"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MillRegistrationFormProps {
  onAssignFieldCoordinator?: (coordinatorId: string, notes: string) => void
  onDeny?: (reason: string) => void
}

export function MillRegistrationForm({
  onAssignFieldCoordinator,
  onDeny
}: MillRegistrationFormProps) {
  const [daysRemaining, setDaysRemaining] = useState(57)
  const [selectedCoordinator, setSelectedCoordinator] = useState("")
  const [assignmentNotes, setAssignmentNotes] = useState("")
  const [denyReason, setDenyReason] = useState("")
  const [showDenyReason, setShowDenyReason] = useState(false)
  const [activeTab, setActiveTab] = useState("company")

  // Sample filled application data
  const applicationData = {
    category: "Mill",
    documentDetails: {
      documentNo: "KSB/REG/2025/001",
      financialYear: "2024-2025",
      expiryDate: "2025-06-30",
      documentDate: "2025-01-15",
      companyName: "Mumias Sugar Mills Ltd",
      companyRegistrationNumber: "CPR/2018/123456"
    },
    companyInfo: {
      postalAddress: "P.O. Box 234, Mumias",
      postalCode: "50102",
      lrNumber: "MUMIAS/896/2018",
      pinNumber: "P051234567A",
      establishmentDate: "2018-03-15",
      legalStatus: "Private Limited Company",
      singleBusinessPermit: "SBP/2024/001234",
      phoneNumber: "+254-722-123456",
      emailAddress: "info@mumiassugar.co.ke",
      county: "Kakamega",
      subcounty: "Mumias East",
      ward: "Mumias Central",
      location: "Mumias Township",
      subCounty: "Mumias East",
      buildingName: "Mumias Sugar Complex",
      streetName: "Industrial Road",
      town: "Mumias",
      gpsCoordinates: "0.3344° N, 34.4872° E"
    },
    investmentFinancing: {
      currency: "Kshs.",
      foreignEquity: 500,
      localEquity: 1200,
      foreignLoan: 800,
      localLoan: 600
    },
    projectObjectives: "To establish a modern sugar processing mill that will enhance sugar production capacity in the Western Kenya region, create employment opportunities for local communities, and contribute to Kenya's sugar self-sufficiency goals through sustainable and efficient sugar cane processing.",
    implementationPeriod: 24,
    projectedCapacity: 3500,
    investmentBreakdown: {
      currency: "Kshs.",
      preExpenses: 50,
      landBuildings: 800,
      plantEquipment: 1500,
      vehicles: 100,
      furnitureFittings: 75,
      workingCapital: 350,
      others: 225
    },
    applicantDeclaration: {
      declarationPlace: "Mumias",
      declarationDay: "15",
      declarationMonth: "January",
      declarationYear: "2025",
      applicantName: "John Mwangi",
      postOfficeBox: "234",
      companyName: "Mumias Sugar Mills Ltd"
    }
  }

  const fieldCoordinators = [
    { id: "fc-001", name: "Sarah Wanjiku", region: "Western Region", county: "Kakamega" },
    { id: "fc-002", name: "James Ochieng", region: "Nyanza Region", county: "Kisumu" },
    { id: "fc-003", name: "Mary Chebet", region: "Rift Valley Region", county: "Nakuru" },
    { id: "fc-004", name: "Bernice Kasavuli", region: "Coast Region", county: "Kwale" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysRemaining(prev => Math.max(0, prev - 1))
    }, 86400000)
    return () => clearInterval(timer)
  }, [])

  const handleAssignCoordinator = () => {
    if (selectedCoordinator && onAssignFieldCoordinator) {
      onAssignFieldCoordinator(selectedCoordinator, assignmentNotes)
    }
  }

  const calculateTotal = () => {
    const breakdown = applicationData.investmentBreakdown
    return breakdown.preExpenses + breakdown.landBuildings + breakdown.plantEquipment +
           breakdown.vehicles + breakdown.furnitureFittings + breakdown.workingCapital + breakdown.others
  }

  const FormField = ({ label, value, className = "" }: { label: string; value: string | number; className?: string }) => {
    return (
      <div className={`space-y-1 ${className}`}>
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Input value={value} readOnly className="bg-gray-50 border-gray-200" />
      </div>
    )
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 pb-6 relative">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">FORM KSB/01</h1>
          <p className="text-sm text-gray-600 mb-2">(r. 5(1))</p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/ksb2.png"
            alt="Kenya Sugar Board"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">APPLICATION FOR REGISTRATION OF A MILL</h2>
        </div>
        <div className="absolute top-0 right-0">
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
            {daysRemaining} Days Left
          </Badge>
        </div>
      </div>
      {/* Separator line after header */}
      <div className="border-b border-gray-200 mb-4" style={{ marginTop: '20px' }}></div>

      {/* Form Sections */}
      <div className="space-y-4">
        {/* 1. Category Section */}
        <CollapsibleSection title="1. Category" defaultOpen={true}>
          <Input value={applicationData.category} readOnly className="bg-gray-50 border-gray-200" />
        </CollapsibleSection>

        {/* 2. Document Details Section */}
        <CollapsibleSection title="2. Document Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Document No" value={applicationData.documentDetails.documentNo} />
            <FormField label="Financial Year" value={applicationData.documentDetails.financialYear} />
            <FormField label="Expiry Date" value={applicationData.documentDetails.expiryDate} />
            <FormField label="Document Date" value={applicationData.documentDetails.documentDate} />
            <FormField label="Company Name" value={applicationData.documentDetails.companyName} />
            <FormField label="Company Registration Number" value={applicationData.documentDetails.companyRegistrationNumber} />
          </div>
        </CollapsibleSection>

        {/* 3. Company Info Section */}
        <CollapsibleSection title="3. Company Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Postal Address" value={applicationData.companyInfo.postalAddress} />
            <FormField label="Postal Code" value={applicationData.companyInfo.postalCode} />
            <FormField label="L.R No/Plot No" value={applicationData.companyInfo.lrNumber} />
            <FormField label="Pin Number" value={applicationData.companyInfo.pinNumber} />
            <FormField label="Establishment Date" value={applicationData.companyInfo.establishmentDate} />
            <FormField label="Legal Status" value={applicationData.companyInfo.legalStatus} />
            <FormField label="Single Business Permit" value={applicationData.companyInfo.singleBusinessPermit} />
            <FormField label="Phone Number" value={applicationData.companyInfo.phoneNumber} />
            <FormField label="Email Address" value={applicationData.companyInfo.emailAddress} />
            <FormField label="County" value={applicationData.companyInfo.county} />
            <FormField label="Subcounty" value={applicationData.companyInfo.subcounty} />
            <FormField label="Ward" value={applicationData.companyInfo.ward} />
            <FormField label="Location" value={applicationData.companyInfo.location} />
            <FormField label="Sub-County" value={applicationData.companyInfo.subCounty} />
            <FormField label="Building Name" value={applicationData.companyInfo.buildingName} />
            <FormField label="Street Name" value={applicationData.companyInfo.streetName} />
            <FormField label="Town" value={applicationData.companyInfo.town} />
            <FormField label="GPS Coordinates" value={applicationData.companyInfo.gpsCoordinates} />
          </div>
        </CollapsibleSection>

        {/* 4. Investment Financing Plan */}
        <CollapsibleSection title="4. Investment Financing Plan">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Currency:</label>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">{applicationData.investmentFinancing.currency} (in Millions)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Foreign Equity" value={applicationData.investmentFinancing.foreignEquity} />
              <FormField label="Local Equity" value={applicationData.investmentFinancing.localEquity} />
              <FormField label="Foreign Loan" value={applicationData.investmentFinancing.foreignLoan} />
              <FormField label="Local Loan" value={applicationData.investmentFinancing.localLoan} />
            </div>
          </div>
        </CollapsibleSection>

        {/* 5. Project Objectives */}
        <CollapsibleSection title="5. Project Objectives">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Project Objectives</label>
            <Textarea
              value={applicationData.projectObjectives}
              readOnly
              className="bg-gray-50 border-gray-200 min-h-[100px]"
            />
          </div>
        </CollapsibleSection>

        {/* 6. Implementation Period */}
        <CollapsibleSection title="6. Implementation Period">
          <Input value={applicationData.implementationPeriod} readOnly className="bg-gray-50 border-gray-200" />
        </CollapsibleSection>

        {/* 7. Projected Capacity */}
        <CollapsibleSection title="7. Projected Capacity (TCD)">
          <Input value={applicationData.projectedCapacity} readOnly className="bg-gray-50 border-gray-200" />
        </CollapsibleSection>

        {/* 8. Investment Breakdown */}
        <CollapsibleSection title="8. Investment Breakdown">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Currency:</label>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">{applicationData.investmentBreakdown.currency} (in Millions)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Pre-expenses" value={applicationData.investmentBreakdown.preExpenses} />
              <FormField label="Land/Buildings" value={applicationData.investmentBreakdown.landBuildings} />
              <FormField label="Plant and equipment" value={applicationData.investmentBreakdown.plantEquipment} />
              <FormField label="Vehicles" value={applicationData.investmentBreakdown.vehicles} />
              <FormField label="Furniture & Fittings" value={applicationData.investmentBreakdown.furnitureFittings} />
              <FormField label="Working Capital" value={applicationData.investmentBreakdown.workingCapital} />
              <FormField label="Others" value={applicationData.investmentBreakdown.others} />
              <FormField label="TOTAL" value={calculateTotal()} className="md:col-span-2 font-bold" />
            </div>
          </div>
        </CollapsibleSection>

        {/* 9. Documents Uploads */}
        <CollapsibleSection title="9. Documents Uploads">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex justify-start w-auto mb-4 h-8">
              <TabsTrigger value="company" className="data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600 px-3 py-1 text-sm">
                Company
              </TabsTrigger>
              <TabsTrigger value="directors" className="data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600 px-3 py-1 text-sm">
                Board of Directors
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="company" className="space-y-4">
              {[
                { label: "Recommendation from the respective County Government", file: "county_recommendation.pdf" },
                { label: "Sugar Crop Development Plan", file: "sugar_crop_plan.pdf" },
                { label: "Feasibility Study Report", file: "feasibility_study.pdf" },
                { label: "Financial Reports", file: "financial_reports.pdf" },
                { label: "Mill Design and Technology", file: "mill_design.pdf" },
                { label: "Milling Capacity", file: "milling_capacity.pdf" },
                { label: "Certificate of Incorporation/Registration", file: "certificate_incorporation.pdf" },
                { label: "Details of ownership including title deed, lease agreement etc", file: "ownership_details.pdf" },
                { label: "Long term progressive plan on value addition", file: "value_addition_plan.pdf" },
                { label: "Profiles of the investor(s), directors and principal officers", file: "investor_profiles.pdf" },
                { label: "Memorandum and Articles of Association", file: "memorandum_articles.pdf" },
                { label: "Evidence of land ownership for the project", file: "land_ownership.pdf" }
              ].map((doc, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">{doc.label}</h4>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-700">{doc.file}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="directors" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">Director 1 (3 documents)</h4>
                </div>
                
                {[
                  { label: "ID/Passport", file: "director1_id.pdf" },
                  { label: "KRA PIN Certificate", file: "director1_kra.pdf" },
                  { label: "Certificate of Good Conduct", file: "director1_conduct.pdf" }
                ].map((doc, index) => (
                  <div key={index} className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-700">{doc.label}</h5>
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">{doc.file}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CollapsibleSection>

        {/* 10. Applicant Declaration */}
        <CollapsibleSection title="10. Applicant Declaration">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed">
              <p className="mb-4">I hereby declare that:</p>
              <p className="mb-2">(a) All the statements and supporting Documents are complete and true</p>
              <p className="mb-2">(b) I have authorized the Authority to make further inquiries and receive
                information in connection with this application to the extent permitted by the law</p>
              <p className="mb-4">(c) We have complied with the requirements of the Environmental Management
                and Co-ordination Act 1999</p>

              <p className="mb-4 text-xs">
                <strong>NOTE:</strong> All information regarding this application shall be treated as confidential
                but the Authority reserves the right to share the information with other approving
                agencies of the Kenya Government to the extent required by law or by the policy
                of the Government.
              </p>
            </div>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Declared at" value={applicationData.applicantDeclaration.declarationPlace} />
                <div className="flex gap-2">
                  <FormField label="Day" value={applicationData.applicantDeclaration.declarationDay} />
                  <FormField label="Month" value={applicationData.applicantDeclaration.declarationMonth} />
                  <FormField label="Year" value={applicationData.applicantDeclaration.declarationYear} />
                </div>
                <FormField label="Applicant Name" value={applicationData.applicantDeclaration.applicantName} />
                <FormField label="Post Office Box Number" value={applicationData.applicantDeclaration.postOfficeBox} />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Actions Section - Always Visible */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Select Field Coordinator</label>
              <Select value={selectedCoordinator} onValueChange={setSelectedCoordinator}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a field coordinator" />
                </SelectTrigger>
                <SelectContent>
                  {fieldCoordinators.map((coordinator) => (
                    <SelectItem key={coordinator.id} value={coordinator.id}>
                      {coordinator.name} - {coordinator.county} ({coordinator.region})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Assignment Notes</label>
              <Textarea
                value={assignmentNotes}
                onChange={(e) => setAssignmentNotes(e.target.value)}
                placeholder="Add any specific instructions for the field coordinator..."
                className="mt-1"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:justify-end">
              {onDeny && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (showDenyReason && denyReason) {
                      onDeny(denyReason)
                    } else {
                      setShowDenyReason(true)
                    }
                  }}
                  className="transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    borderRadius: '8px',
                    color: '#ef4444'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.15)';
                  }}
                >
                  Deny Application
                </Button>
              )}
              <Button
                onClick={handleAssignCoordinator}
                disabled={!selectedCoordinator}
                className="transition-all duration-300 hover:shadow-lg"
                style={{
                  background: 'rgba(34, 197, 94, 0.2)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                  borderRadius: '8px',
                  color: '#22c55e'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.15)';
                }}
              >
                Assign Field Coordinator
              </Button>
            </div>

            {/* Conditional Denial Reason Field */}
            {onDeny && showDenyReason && (
              <div className="mt-4 transition-all duration-300 ease-in-out">
                <label className="text-sm font-medium text-gray-700">Denial Reason</label>
                <Textarea
                  value={denyReason}
                  onChange={(e) => setDenyReason(e.target.value)}
                  placeholder="Enter reason for denial..."
                  className="mt-1"
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}