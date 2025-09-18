"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Building2, User, CheckCircle, AlertCircle, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import SignupHeader from "@/components/signup/SignupHeader"
import ProgressBar from "@/components/signup/ProgressBar"

export default function VerificationStep() {
  const [userType, setUserType] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [error, setError] = useState("")
  const [companyFormData, setCompanyFormData] = useState<any>({})
  const [expandedDirectors, setExpandedDirectors] = useState<{ [key: number]: boolean }>({})
  const router = useRouter()

  useEffect(() => {
    // Get user type from localStorage
    const signupData = localStorage.getItem("signupData")
    if (!signupData) {
      router.push("/signup/user-type")
      return
    }
    
    const parsedData = JSON.parse(signupData)
    setUserType(parsedData.userType)
  }, [router])

  const handleSearch = async () => {
    if (!searchValue.trim()) return

    setLoading(true)
    setError("")
    setVerificationResult(null)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      if (userType === "individual") {
        // Simulate IPRS verification
        if (searchValue.length >= 8) {
          setVerificationResult({
            verified: true,
            data: {
              idNumber: searchValue,
              firstName: "Harry",
              lastName: "Kiprop",
              dateOfBirth: "1990-05-15",
              gender: "Male"
            }
          })
        } else {
          setError("Please enter a valid National ID number")
        }
      } else {
        // Simulate BRS company verification
        if (searchValue.length >= 6) {
          const companyData = {
            registrationNumber: searchValue,
            companyName: "ABC Sugar Company Ltd",
            establishmentDate: "2015-03-20",
            status: "Active",
            businessType: "Private Limited Company",
            taxId: "P051234567V",
            companyEmail: "",
            industry: "",
            numberOfEmployees: "",
            postalAddress: "P.O. Box 12345, Nairobi 00100",
            buildingName: "Sugar Plaza",
            streetName: "Industrial Area Road",
            plotNumber: "LR No. 123/45",
            county: "Nairobi",
            subCounty: "Embakasi",
            location: "Industrial Area",
            ward: "Embakasi South",
            directors: [
              {
                name: "Jane Khafweli",
                idNumber: "12345678",
                nationality: "Kenyan",
                postalAddress: "P.O. Box 789, Nairobi",
                phoneNumber: "",
                email: ""
              },
              {
                name: "Robert Matano", 
                idNumber: "87654321",
                nationality: "Kenyan",
                postalAddress: "P.O. Box 456, Nakuru",
                phoneNumber: "",
                email: ""
              }
            ]
          }
          setVerificationResult({
            verified: true,
            data: companyData
          })
          setCompanyFormData(companyData)
        } else {
          setError("Please enter a valid Company Registration Number")
        }
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    if (verificationResult?.verified) {
      // Update signup data with verification results
      const existingData = JSON.parse(localStorage.getItem("signupData") || "{}")
      
      let verificationData
      if (userType === "company") {
        verificationData = companyFormData
      } else {
        // For individuals, combine the IPRS data with the form data
        verificationData = {
          ...verificationResult.data,
          designation: companyFormData.designation,
          phoneNumber: companyFormData.phoneNumber
        }
      }
      
      const updatedData = {
        ...existingData,
        verificationData: verificationData
      }
      localStorage.setItem("signupData", JSON.stringify(updatedData))
      
      // Navigate to next step based on user type
      if (userType === "company") {
        router.push("/signup/user-verification")
      } else {
        router.push("/signup/authentication")
      }
    }
  }

  const handleCompanyFormChange = (field: string, value: string, directorIndex?: number) => {
    if (directorIndex !== undefined) {
      setCompanyFormData((prev: any) => ({
        ...prev,
        directors: prev.directors.map((director: any, index: number) =>
          index === directorIndex ? { ...director, [field]: value } : director
        )
      }))
    } else {
      setCompanyFormData((prev: any) => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const toggleDirector = (index: number) => {
    setExpandedDirectors(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleBack = () => {
    router.push("/signup/user-type")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SignupHeader />
      <ProgressBar currentStep={2} totalSteps={6} />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex p-3 rounded-full bg-green-100 mb-4">
              {userType === "individual" ? (
                <User className="h-8 w-8 text-green-600" />
              ) : (
                <Building2 className="h-8 w-8 text-green-600" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {userType === "individual" ? "Verify Your Identity" : "Verify Company Registration"}
            </h2>
            <p className="mt-2 text-gray-600">
              {userType === "individual" 
                ? "Enter your National ID number to verify your identity through IPRS"
                : "Enter your Company Registration Number to verify through BRS"
              }
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Search Section */}
            <div className="space-y-6">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === "individual" ? "National ID Number" : "Company Registration Number"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={userType === "individual" ? "Enter your National ID" : "Enter Company Registration Number"}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={loading || !searchValue.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Verification Result */}
              {verificationResult && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5" />
                    <span>Verification successful!</span>
                  </div>

                  {userType === "individual" ? (
                    // Individual Form
                    <div className="bg-white border rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Personal Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={`${verificationResult.data.firstName} ${verificationResult.data.lastName}`}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                          <input
                            type="text"
                            value={verificationResult.data.idNumber}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                          <input
                            type="text"
                            value={verificationResult.data.dateOfBirth}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                          <input
                            type="text"
                            value={verificationResult.data.gender}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                          <select
                            value={companyFormData.designation || ""}
                            onChange={(e) => setCompanyFormData((prev: any) => ({ ...prev, designation: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          >
                            <option value="">Select designation</option>
                            <option value="Farmer">Farmer</option>
                            <option value="AgroVet Retailer">AgroVet Retailer</option>
                            <option value="Field Extension Officer">Field Extension Officer</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            value={companyFormData.phoneNumber || ""}
                            onChange={(e) => setCompanyFormData((prev: any) => ({ ...prev, phoneNumber: e.target.value }))}
                            placeholder="Enter your phone number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Company Form
                    <div className="bg-white border rounded-lg p-6 space-y-8">
                      {/* Company Details Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Company Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input
                              type="text"
                              value={companyFormData.companyName || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                            <input
                              type="text"
                              value={companyFormData.registrationNumber || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Establishment Date</label>
                            <input
                              type="text"
                              value={companyFormData.establishmentDate || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Type</label>
                            <input
                              type="text"
                              value={companyFormData.businessType || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">TAX ID Number</label>
                            <input
                              type="text"
                              value={companyFormData.taxId || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                            <input
                              type="email"
                              value={companyFormData.companyEmail || ""}
                              onChange={(e) => handleCompanyFormChange("companyEmail", e.target.value)}
                              placeholder="Enter company email"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                            <select
                              value={companyFormData.industry || ""}
                              onChange={(e) => handleCompanyFormChange("industry", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="">Select Industry</option>
                              <option value="sugar-miller">Sugar Miller</option>
                              <option value="sugar-dealer">Sugar Dealer</option>
                              <option value="molasses-dealer">Molasses Dealer</option>
                              <option value="sugar-importer">Sugar Importer</option>
                              <option value="sugar-exporter">Sugar Exporter</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
                            <select
                              value={companyFormData.numberOfEmployees || ""}
                              onChange={(e) => handleCompanyFormChange("numberOfEmployees", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="">Select Range</option>
                              <option value="0-100">0-100</option>
                              <option value="100-500">100-500</option>
                              <option value="500-1000">500-1000</option>
                              <option value="1000-5000">1000-5000</option>
                              <option value="5000+">5000+</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Company Location Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Company Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Address</label>
                            <input
                              type="text"
                              value={companyFormData.postalAddress || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Building Name</label>
                            <input
                              type="text"
                              value={companyFormData.buildingName || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Name</label>
                            <input
                              type="text"
                              value={companyFormData.streetName || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plot Number</label>
                            <input
                              type="text"
                              value={companyFormData.plotNumber || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                            <input
                              type="text"
                              value={companyFormData.county || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sub County</label>
                            <input
                              type="text"
                              value={companyFormData.subCounty || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                              type="text"
                              value={companyFormData.location || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
                            <input
                              type="text"
                              value={companyFormData.ward || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Company Directors Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Company Directors</h3>
                        <div className="space-y-4">
                          {companyFormData.directors?.map((director: any, index: number) => (
                            <div key={index} className="border border-gray-200 rounded-lg">
                              <button
                                type="button"
                                onClick={() => toggleDirector(index)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                              >
                                <span className="font-medium text-gray-900">Director {index + 1}: {director.name}</span>
                                {expandedDirectors[index] ? (
                                  <ChevronUp className="h-5 w-5 text-gray-500" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-500" />
                                )}
                              </button>
                              {expandedDirectors[index] && (
                                <div className="p-4 border-t border-gray-200 bg-gray-50">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                      <input
                                        type="text"
                                        value={director.name || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">ID/Passport Number</label>
                                      <input
                                        type="text"
                                        value={director.idNumber || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                                      <input
                                        type="text"
                                        value={director.nationality || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Address</label>
                                      <input
                                        type="text"
                                        value={director.postalAddress || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                      <input
                                        type="tel"
                                        value={director.phoneNumber || ""}
                                        onChange={(e) => handleCompanyFormChange("phoneNumber", e.target.value, index)}
                                        placeholder="Enter phone number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                      <input
                                        type="email"
                                        value={director.email || ""}
                                        onChange={(e) => handleCompanyFormChange("email", e.target.value, index)}
                                        placeholder="Enter email address"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center space-x-2 flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <button
                onClick={handleContinue}
                disabled={
                  !verificationResult?.verified || 
                  (userType === "individual" && (!companyFormData.designation || !companyFormData.phoneNumber))
                }
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
