"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Send, CheckCircle, ChevronRight, Upload, Plus, Trash2, ChevronDown, X } from "lucide-react"
import { CollapsibleSection } from "@/components/ui/collapsible-section"
import { stakeholderApplications } from './constants'
import { generateDocumentDetails } from './utils'
import { SharedProps } from './types'

export function MillerTab({
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
}: SharedProps) {

  const generateDocumentDetailsForForm = (category: string) => {
    const details = generateDocumentDetails(category)
    handleInputChange('category', details.category)
    handleInputChange('documentNo', details.documentNo)
    handleInputChange('documentDate', details.documentDate)
    handleInputChange('financialYear', details.financialYear)
    handleInputChange('expiryDate', details.expiryDate)
  }

  return (
    <div className="space-y-4">
      {stakeholderApplications['Sugar Miller']?.map((application) => (
        <div key={application.id} className="border rounded-lg">
          <div
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setExpandedApplication(expandedApplication === application.id ? '' : application.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{application.name}</h4>
                <p className="text-sm text-gray-600">{application.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    expandedApplication === application.id ? 'rotate-90' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {expandedApplication === application.id && (
            <div className="border-t p-4 bg-gray-50">
              {application.id === 'letter-of-comfort' ? (
                // Custom Form for Application for Registration
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Application Type */}
                  <div>
                    <Label htmlFor="category" className="text-lg font-semibold">Choose Category <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => generateDocumentDetailsForForm(value)}
                    >
                      <SelectTrigger className="mt-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mill">Mill</SelectItem>
                        <SelectItem value="Jaggery">Jaggery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.category && (
                    <>
                      {/* Document Details - Auto-generated */}
                      <CollapsibleSection title="Document Details">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="documentNo">Document No</Label>
                            <Input
                              id="documentNo"
                              value={formData.documentNo}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="financialYear">Financial Year</Label>
                            <Input
                              id="financialYear"
                              value={formData.financialYear}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              value={formData.expiryDate}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                        </div>
                      </CollapsibleSection>

                      {/* Company Info */}
                      <CollapsibleSection title="Company Info">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="lrNumber">L.R No/Plot No</Label>
                            <Input
                              id="lrNumber"
                              value={formData.lrNumber}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="postalAddress">Postal Address</Label>
                            <Input
                              id="postalAddress"
                              value={formData.postalAddress}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                              id="postalCode"
                              value={formData.postalCode}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="companyRegNumber">Company Registration Number</Label>
                            <Input
                              id="companyRegNumber"
                              value={formData.companyRegNumber}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="pinNumber">Pin Number</Label>
                            <Input
                              id="pinNumber"
                              value={formData.pinNumber}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                              id="phoneNumber"
                              value={formData.phoneNumber}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="emailAddress">Email Address</Label>
                            <Input
                              id="emailAddress"
                              value={formData.emailAddress}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="county">County</Label>
                            <Input
                              id="county"
                              value={formData.county}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="subcounty">Subcounty</Label>
                            <Input
                              id="subcounty"
                              value={formData.subcounty}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="ward">Ward</Label>
                            <Input
                              id="ward"
                              value={formData.ward}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={formData.location}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="buildingName">Building Name</Label>
                            <Input
                              id="buildingName"
                              value={formData.buildingName}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="streetName">Street Name</Label>
                            <Input
                              id="streetName"
                              value={formData.streetName}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="town">Town</Label>
                            <Input
                              id="town"
                              value={formData.town}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="establishmentDate">Establishment Date</Label>
                            <Input
                              id="establishmentDate"
                              value={formData.establishmentDate}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="legalStatus">Legal Status</Label>
                            <Input
                              id="legalStatus"
                              value={formData.legalStatus}
                              disabled
                              className="bg-gray-100"
                            />
                          </div>
                        </div>
                      </CollapsibleSection>

                      {/* Investment Financing Plan */}
                      <CollapsibleSection title="Investment Financing Plan">
                        <div className="mb-4">
                          <Label htmlFor="financingCurrency">Currency</Label>
                          <Select value={financingCurrency} onValueChange={setFinancingCurrency}>
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">US$ (USD)</SelectItem>
                              <SelectItem value="KES">Kshs (KES)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="foreignEquity">Foreign Equity</Label>
                            <Input
                              id="foreignEquity"
                              type="number"
                              value={formData.foreignEquity}
                              onChange={(e) => handleInputChange('foreignEquity', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="localEquity">Local Equity</Label>
                            <Input
                              id="localEquity"
                              type="number"
                              value={formData.localEquity}
                              onChange={(e) => handleInputChange('localEquity', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="foreignLoan">Foreign Loan</Label>
                            <Input
                              id="foreignLoan"
                              type="number"
                              value={formData.foreignLoan}
                              onChange={(e) => handleInputChange('foreignLoan', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="localLoan">Local Loan</Label>
                            <Input
                              id="localLoan"
                              type="number"
                              value={formData.localLoan}
                              onChange={(e) => handleInputChange('localLoan', e.target.value)}
                            />
                          </div>
                        </div>
                      </CollapsibleSection>

                      {/* Project Objectives */}
                      <CollapsibleSection title="Project Objectives">
                        <Textarea
                          id="projectObjectives"
                          value={formData.projectObjectives}
                          onChange={(e) => handleInputChange('projectObjectives', e.target.value)}
                          placeholder="Describe the objectives of the project..."
                        />
                      </CollapsibleSection>

                      {/* Projected Capacity */}
                      <CollapsibleSection title="Projected Capacity (TCD)">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Input
                              id="capacityTCD"
                              type="number"
                              placeholder="Enter capacity in Tonnes Crushed per Day"
                              value={formData.capacityTCD}
                              onChange={(e) => handleInputChange('capacityTCD', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </CollapsibleSection>

                      {/* Investment Breakdown */}
                      <CollapsibleSection title="Investment Breakdown">
                        <div className="mb-4">
                          <Label htmlFor="investmentCurrency">Currency</Label>
                          <Select value={investmentCurrency} onValueChange={setInvestmentCurrency}>
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">US$ (USD)</SelectItem>
                              <SelectItem value="KES">Kshs (KES)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="preExpenses">Pre-expenses</Label>
                            <Input
                              id="preExpenses"
                              type="number"
                              value={formData.preExpenses}
                              onChange={(e) => handleInputChange('preExpenses', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="landBuildings">Land/Buildings</Label>
                            <Input
                              id="landBuildings"
                              type="number"
                              value={formData.landBuildings}
                              onChange={(e) => handleInputChange('landBuildings', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="plantEquipment">Plant and equipment</Label>
                            <Input
                              id="plantEquipment"
                              type="number"
                              value={formData.plantEquipment}
                              onChange={(e) => handleInputChange('plantEquipment', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="vehicles">Vehicles</Label>
                            <Input
                              id="vehicles"
                              type="number"
                              value={formData.vehicles}
                              onChange={(e) => handleInputChange('vehicles', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="furnitureFittings">Furniture & Fittings</Label>
                            <Input
                              id="furnitureFittings"
                              type="number"
                              value={formData.furnitureFittings}
                              onChange={(e) => handleInputChange('furnitureFittings', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="workingCapital">Working Capital</Label>
                            <Input
                              id="workingCapital"
                              type="number"
                              value={formData.workingCapital}
                              onChange={(e) => handleInputChange('workingCapital', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="others">Others</Label>
                            <Input
                              id="others"
                              type="number"
                              value={formData.others}
                              onChange={(e) => handleInputChange('others', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="total">TOTAL (Auto-calculated)</Label>
                            <Input
                              id="total"
                              type="number"
                              value={formData.total}
                              readOnly
                              className="bg-gray-100 font-semibold"
                            />
                          </div>
                        </div>
                      </CollapsibleSection>

                      {/* Documents Uploads */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Documents Uploads</h3>
                        <div className="flex space-x-2 border-b border-gray-200 mb-4">
                          {[
                            { id: 'companyDocs', label: 'Company' },
                            { id: 'directorDocs', label: 'Board of Directors' },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setSelectedTab(tab.id)}
                              className={`px-3 py-2 text-sm font-medium ${selectedTab === tab.id ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>

                        {selectedTab === 'companyDocs' && (
                          <div className="space-y-4">
                            {/* Company Document Upload Fields */}
                            {[
                              { key: 'countyRecommendation', label: 'Recommendation from the respective County Government' },
                              { key: 'cropDevelopmentPlan', label: 'Sugar Crop Development Plan' },
                              { key: 'feasibilityStudy', label: 'Feasibility Study Report' },
                              { key: 'financialReports', label: 'Financial Reports' },
                              { key: 'millDesign', label: 'Mill Design and Technology' },
                              { key: 'millingCapacity', label: 'Milling Capacity' },
                              { key: 'incorporationCertificate', label: 'Certificate of Incorporation/Registration' },
                              { key: 'ownershipDetails', label: 'Details of ownership including title deed, lease agreement etc' },
                              { key: 'valueAdditionPlan', label: 'Long term progressive plan on value addition' },
                              { key: 'investorProfiles', label: 'Profiles of the investor(s), directors and principal officers' },
                              { key: 'memorandumArticles', label: 'Memorandum and Articles of Association' },
                              { key: 'landOwnership', label: 'Evidence of land ownership for the project' }
                            ].map((doc) => (
                              <div key={doc.key}>
                                <Label>{doc.label}</Label>
                                {uploadedFiles[doc.key] ? (
                                  <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-blue-600" />
                                      <span className="text-sm">{uploadedFiles[doc.key]?.name}</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleFileDelete(doc.key)}
                                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="mt-2">
                                    <label htmlFor={doc.key} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                      <Upload className="h-3 w-3" />
                                      Upload
                                    </label>
                                    <input
                                      id={doc.key}
                                      type="file"
                                      className="hidden"
                                      onChange={(e) => handleFileUpload(doc.key, e.target.files?.[0] || null)}
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {selectedTab === 'directorDocs' && (
                          <div className="space-y-4">
                            {directors.map((director) => (
                              <div key={director.id} className="border rounded-lg">
                                <div
                                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                  onClick={() => toggleDirectorExpansion(director.id)}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">Director {director.id}</span>
                                    <span className="text-sm text-gray-500">(3 documents)</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {directors.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          removeDirector(director.id)
                                        }}
                                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    )}
                                    <ChevronDown
                                      className={`h-4 w-4 transition-transform ${
                                        director.expanded ? 'rotate-180' : ''
                                      }`}
                                    />
                                  </div>
                                </div>

                                {director.expanded && (
                                  <div className="border-t p-3 space-y-4 bg-gray-50">
                                    {[
                                      { key: 'Id', label: 'ID/Passport' },
                                      { key: 'Pin', label: 'KRA PIN Certificate' },
                                      { key: 'Conduct', label: 'Certificate of Good Conduct' }
                                    ].map((doc) => {
                                      const fieldKey = `director${director.id}${doc.key}`
                                      return (
                                        <div key={doc.key}>
                                          <Label>{doc.label}</Label>
                                          {uploadedFiles[fieldKey] ? (
                                            <div className="flex items-center justify-between gap-2 p-2 border rounded bg-white">
                                              <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm">{uploadedFiles[fieldKey]?.name}</span>
                                              </div>
                                              <button
                                                type="button"
                                                onClick={() => handleFileDelete(fieldKey)}
                                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                              >
                                                <X className="h-3 w-3" />
                                              </button>
                                            </div>
                                          ) : (
                                            <div className="mt-2">
                                              <label htmlFor={fieldKey} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                                <Upload className="h-3 w-3" />
                                                Upload
                                              </label>
                                              <input
                                                id={fieldKey}
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleFileUpload(fieldKey, e.target.files?.[0] || null)}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={addDirector}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 border border-green-300 rounded-md hover:bg-green-50 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                              Add Director
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Applicant Declaration */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Applicant Declaration</h3>
                        <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
                          <p className="text-gray-700">I hereby declare that:</p>
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="declarationA"
                              checked={formData.declarationA === 'true'}
                              onCheckedChange={(checked) => handleInputChange('declarationA', checked ? 'true' : 'false')}
                            />
                            <Label htmlFor="declarationA" className="text-sm">
                              (a) All the statements and supporting Documents are complete and true
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="declarationB"
                              checked={formData.declarationB === 'true'}
                              onCheckedChange={(checked) => handleInputChange('declarationB', checked ? 'true' : 'false')}
                            />
                            <Label htmlFor="declarationB" className="text-sm">
                              (b) I have authorized the Authority to make further inquiries and receive information in connection with this application to the extent permitted by the law
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="declarationC"
                              checked={formData.declarationC === 'true'}
                              onCheckedChange={(checked) => handleInputChange('declarationC', checked ? 'true' : 'false')}
                            />
                            <Label htmlFor="declarationC" className="text-sm">
                              (c) We have complied with the requirements of the Environmental Management and Co-ordination Act 1999
                            </Label>
                          </div>
                          <p className="text-xs text-gray-500 mt-4">
                            NOTE: All information regarding this application shall be treated as confidential but the Authority reserves the right to share the information with other approving agencies of the Kenya Government to the extent required by law or by the policy of the Government.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSaveDraft}
                      disabled={!formData.category}
                      className="border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      {isDraftSaved ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Draft Saved
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-2" />
                          Save Draft
                        </>
                      )}
                    </Button>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!formData.category || formData.declarationA !== 'true' || formData.declarationB !== 'true' || formData.declarationC !== 'true'}
                    >
                      {isSubmitted ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submitted
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                // Default form for other applications (like license)
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="millerLicenseNumber">License Number</Label>
                      <Input
                        id="millerLicenseNumber"
                        value={formData.millerLicenseNumber}
                        onChange={(e) => handleInputChange('millerLicenseNumber', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {application.fields.map((field) => (
                    <div key={field.name}>
                      <Label htmlFor={field.name}>
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      {field.type === 'select' ? (
                        <Select
                          value={formData[field.name as keyof typeof formData] || ''}
                          onValueChange={(value) => handleInputChange(field.name, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option: string) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === 'textarea' ? (
                        <Textarea
                          id={field.name}
                          value={formData[field.name as keyof typeof formData] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          className="min-h-[100px]"
                          required={field.required}
                        />
                      ) : (
                        <Input
                          id={field.name}
                          type={field.type}
                          value={formData[field.name as keyof typeof formData] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSaveDraft}
                      className="border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      {isDraftSaved ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Draft Saved
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-2" />
                          Save Draft
                        </>
                      )}
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {isSubmitted ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submitted
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}