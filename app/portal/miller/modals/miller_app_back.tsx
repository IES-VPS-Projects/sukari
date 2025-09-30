 

  {/* Miller Tab */}
  {String(activeTab) === 'miller' && (
    <div className="min-h-[500px] max-h-[500px] overflow-y-auto">
      {licensesLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Clock className="h-8 w-8 animate-spin mx-auto mb-2 text-green-600" />
            <p className="text-gray-600">Loading licenses...</p>
          </div>
        </div>
      ) : licensesError ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <p className="text-red-600">Error loading licenses</p>
            <p className="text-sm text-gray-500 mt-1">Please try again later</p>
          </div>
        </div>
      ) : selectedLicense ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => setSelectedLicense(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Licenses
            </Button>
          </div>
          
          <DynamicFormRenderer
            license={selectedLicense}
            onSubmit={handleLicenseFormSubmit}
            onCancel={() => setSelectedLicense(null)}
            onSaveDraft={handleLicenseFormDraftSave}
            isSubmitting={submitApplicationMutation.isPending}
            isDraftSaving={isDraftSaving}
            userProfile={userProfile}
          />
        </div>
      ) : !selectedStakeholder ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Select Stakeholder Type</h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Total Licenses: {licenseStats.total}
              </Badge>
            </div>
          </div>
          {/* Current Licenses Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Current Licenses</h4>
            {licensesData?.data && licensesData.data.length > 0 ? (
              <div className="space-y-3">
                {licensesData.data.map((license: License) => (
                  <div key={license.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold">{license.name}</h5>
                        <p className="text-sm text-gray-600">{license.type}</p>
                        <p className="text-xs text-gray-500">License ID: {license.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(license.status)}>
                          {license.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLicenseClick(license)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Created Date:</span>
                        <p className="font-medium">{new Date(license.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Validity Period:</span>
                        <p className="font-medium">{license.validityPeriod} months</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Cost:</span>
                        <p className="font-medium">KSh {typeof license.cost === 'string' ? parseInt(license.cost).toLocaleString() : license.cost.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Processing Time:</span>
                        <p className="font-medium">{license.processingTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Issuing Authority:</span>
                        <p className="font-medium">{license.issuingAuthority}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileCheck className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No licenses found</p>
              </div>
            )}
          </div>

          {/* Application Types Section */}
          {/* <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Apply for New License/Permit</h4>
            <div className="space-y-3">
              {Object.keys(stakeholderApplications).map((stakeholder) => (
                <div
                  key={stakeholder}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-3"
                  onClick={() => setSelectedStakeholder(stakeholder)}
                >
                  <FileCheck className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold">{stakeholder}</h4>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedStakeholder('')
                setExpandedApplication('')
              }}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Stakeholders
            </Button>
            <h3 className="text-lg font-semibold">{selectedStakeholder} Applications</h3>
          </div>
          
          <div className="space-y-4">
            {stakeholderApplications[selectedStakeholder as keyof typeof stakeholderApplications]?.map((application) => (
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
                    {String(application.id) === 'letter-of-comfort' && (
                      // Custom Letter of Comfort Form
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Category Selection */}
                        <div>
                          <Label htmlFor="category" className="text-lg font-semibold">Choose Category <span className="text-red-500">*</span></Label>
                          <Select 
                            value={formData.category} 
                            onValueChange={(value) => generateDocumentDetails(value)}
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
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Document Details</h3>
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
                                  <Label htmlFor="documentDate">Document Date</Label>
                                  <Input
                                    id="documentDate"
                                    type="date"
                                    value={formData.documentDate}
                                    disabled
                                    className="bg-gray-100"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="companyName">Company Name</Label>
                                  <Input
                                    id="companyName"
                                    value={formData.companyName}
                                    disabled
                                    className="bg-gray-100"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="licenseExpiryDate">License Expiry Date</Label>
                                  <Input
                                    id="licenseExpiryDate"
                                    type="date"
                                    value={formData.licenseExpiryDate}
                                    disabled
                                    className="bg-gray-100"
                                  />
                                </div>
                              </div>
                            </div>

                        {/* Company Info */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Company Info</h3>
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
                        </div>

                        {/* Projected Capacity */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Projected Capacity (TCD)</h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <Label htmlFor="capacityTCD">Capacity (TCD) <span className="text-red-500">*</span></Label>
                              <Input
                                id="capacityTCD"
                                type="number"
                                value={formData.capacityTCD}
                                onChange={(e) => handleInputChange('capacityTCD', e.target.value)}
                                required
                              />
                            </div>
                          </div>
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
                    {String(application.id) === 'permit' && (
                        <>
                          {/* Mill/Jaggery Info - Auto-populated from letter of comfort */}
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Mill/Jaggery Info</h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <Label htmlFor="documentNo">Document Number</Label>
                                <Input
                                  id="documentNo"
                                  value={`KSB/SD/MJREG/${formData.category === 'Mill' ? 'M' : 'J'}${new Date().getFullYear()}`}
                                  disabled
                                  className="bg-gray-100"
                                />
                              </div>
                              <div>
                                <Label htmlFor="documentDate">Document Date</Label>
                                <Input
                                  id="documentDate"
                                  type="date"
                                  value={formData.documentDate}
                                  disabled
                                  className="bg-gray-100"
                                />
                              </div>
                              <div>
                                <Label htmlFor="companyName">Name of Applicant</Label>
                                <Input
                                  id="companyName"
                                  value={formData.companyName}
                                  disabled
                                  className="bg-gray-100"
                                />
                              </div>
                              <div>
                                <Label htmlFor="year">Year</Label>
                                <Input
                                  id="year"
                                  value={new Date().getFullYear().toString()}
                                  disabled
                                  className="bg-gray-100"
                                />
                              </div>
                              <div>
                                <Label htmlFor="refLetterOfComfort">Ref Letter of Comfort</Label>
                                <Input
                                  id="refLetterOfComfort"
                                  value={formData.documentNo}
                                  disabled
                                  className="bg-gray-100"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Company Location Information - Auto-populated */}
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Company Location Information</h3>
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
                                <Label htmlFor="companyRegNumber">Company Reg No</Label>
                                <Input
                                  id="companyRegNumber"
                                  value={formData.companyRegNumber}
                                  disabled
                                  className="bg-gray-100"
                                />
                              </div>
                              <div>
                                <Label htmlFor="pinNumber">PIN/VAT</Label>
                                <Input
                                  id="pinNumber"
                                  value={formData.pinNumber}
                                  disabled
                                  className="bg-gray-100"
                                />
                              </div>
                              <div>
                                <Label htmlFor="phoneNumber">Phone</Label>
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
                                <Label htmlFor="subcounty">Sub-County</Label>
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
                              <div>
                                <Label htmlFor="capacityTCD">Capacity (TCD)</Label>
                                <Input
                                  id="capacityTCD"
                                  value={formData.capacityTCD}
                                  disabled
                                  className="bg-gray-100"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Company Tabs */}
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Company Tabs</h3>
                            <div className="flex space-x-2 border-b border-gray-200 mb-4">
                              {[
                                { id: 'details', label: 'Company Details' },
                                { id: 'location', label: 'Location Information' },
                                { id: 'attachments', label: 'Attachments' },
                                { id: 'directors', label: 'Directors Information' },
                                { id: 'approval', label: 'Approval Remarks' },
                              ].map((tab) => (
                                <button
                                  key={tab.id}
                                  onClick={() => setSelectedTab(tab.id)}
                                  className={`px-3 py-2 text-sm font-medium ${selectedTab === tab.id ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                  {tab.label}
                                </button>
                              ))}
                            </div>
                            <div className="p-4 border rounded-lg bg-white">
                              {/* Tab content would go here */}
                              <p className="text-gray-500 text-center py-4">Tab content for {selectedTab} would be displayed here</p>
                            </div>
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
                              <div className="flex items-start space-x-2 mt-4">
                                <Checkbox 
                                  id="agreeTerms" 
                                  checked={formData.agreeTerms === 'true'}
                                  onCheckedChange={(checked) => handleInputChange('agreeTerms', checked ? 'true' : 'false')}
                                />
                                <Label htmlFor="agreeTerms" className="text-sm font-medium">
                                  I Agree to the Terms & Conditions
                                </Label>
                              </div>
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
                        disabled={!formData.category || formData.declarationA !== 'true' || formData.declarationB !== 'true' || formData.declarationC !== 'true' || (expandedApplication === 'permit' && formData.agreeTerms !== 'true')}
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
                )}
                {String(application.id) === 'license' && (
                  // Custom License Application Form
                  <form onSubmit={handleSubmit} className="space-y-6">
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
    </div>
  </div>)}
        
  {/* Importer Tab */}
  {String(activeTab) === 'importer' && (
    <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
      <div className="space-y-4">
        {stakeholderApplications['Sugar Importer']?.map((application) => (
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )}
        
  {/* Exporter Tab */}
  {String(activeTab) === 'exporter' && (
    <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
      <div className="space-y-4">
        {stakeholderApplications['Sugar Exporter']?.map((application) => (
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
                <form onSubmit={handleSubmit} className="space-y-4">
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )}
        
  {/* Sugar Dealer Tab */}
  {String(activeTab) === 'sugarDealer' && (
    <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
      <div className="space-y-4">
        {stakeholderApplications['Sugar Dealer']?.map((application) => (
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
                <form onSubmit={handleSubmit} className="space-y-4">
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )}
        
  {/* Molasses Dealer Tab */}
  {String(activeTab) === 'molassesDealer' && (
    <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
      <div className="space-y-4">
        {stakeholderApplications['Molasses Dealer']?.map((application) => (
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
                <form onSubmit={handleSubmit} className="space-y-4">
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )}

  




