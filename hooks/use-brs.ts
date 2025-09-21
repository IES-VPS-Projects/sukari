import { useQuery } from "@tanstack/react-query"
import { brsApi, ApiResponse, BRSData } from "@/lib/api-client"

// Re-export types for backward compatibility
export type { BRSData }

export interface BRSResponse extends ApiResponse<BRSData> {}

// API function to fetch BRS data from backend server using axios
const fetchBRSData = async (registrationNumber: string): Promise<BRSResponse> => {
  if (!registrationNumber || registrationNumber.length < 6) {
    throw new Error("Invalid registration number format")
  }

  console.log(`Fetching BRS data for registration number: ${registrationNumber}`)
  
  try {
    const response = await brsApi.verify(registrationNumber)
    console.log('BRS API Response:', response)
    return response
  } catch (error: any) {
    // Handle axios errors
    if (error.response?.status === 404) {
      throw new Error("Company registration not found. Please check the number and try again.")
    } else if (error.response?.status === 400) {
      throw new Error("Invalid registration number format. Please enter a valid registration number.")
    } else {
      throw new Error("Verification service is temporarily unavailable. Please try again later.")
    }
  }
}

// Custom hook for BRS verification
export const useBRSVerification = (registrationNumber: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ["brs", registrationNumber],
    queryFn: () => fetchBRSData(registrationNumber),
    enabled: enabled && registrationNumber.length >= 6,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  })
}

// Helper function to format BRS data for the UI
export const formatBRSData = (data: BRSResponse) => {
  // Format date from DD/MM/YYYY to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const [day, month, year] = dateString.split('/')
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Format phone number from scientific notation
  const formatPhone = (phone: string) => {
    if (!phone) return 'N/A'
    if (phone.includes('E+')) {
      return phone.replace('E+', '')
    }
    return phone
  }

  const formattedData = {
    // Company Information
    registrationNumber: data.data.registration_number,
    searchNumber: data.data.search_number,
    companyName: data.data.legal_name,
    companyType: data.data.company_type,
    establishmentDate: formatDate(data.data.registration_date),
    status: data.data.status,
    country: data.data.country,
    address: data.data.address,
    industry: data.data.industry,
    taxId: data.data.tax_id,
    phone: formatPhone(data.data.phone),
    email: data.data.email,
    state: data.data.state,
    authorizedSharedCapital: data.data.authorized_shared_capital,
    resultText: data.data.result_text,
    resultCode: data.data.result_code,
    verifyBusiness: data.data.verify_business,
    
    // Fiduciary Information
    fiduciary: {
      name: data.data.fiduciary_name,
      type: data.data.fiduciary_type,
      address: data.data.fiduciary_address,
      registrationNumber: data.data.fiduciary_registration_number,
      status: data.data.fiduciary_status,
    },
    
    // Beneficial Owners
    beneficialOwners: [
      {
        name: data.data.bo1_name,
        shareholdings: data.data.bo1_shareholdings,
        address: data.data.bo1_address,
        gender: data.data.bo1_gender,
        nationality: data.data.bo1_nationality,
        registrationNumber: data.data.bo1_registration_number,
        shareholderType: data.data.bo1_shareholder_type,
        phoneNumber: data.data.bo1_phone_number,
      },
      {
        name: data.data.bo2_name,
        shareholdings: data.data.bo2_shareholdings,
        address: data.data.bo2_address,
        gender: data.data.bo2_gender,
        nationality: data.data.bo2_nationality,
        registrationNumber: data.data.bo2_registration_number,
        shareholderType: data.data.bo2_shareholder_type,
        phoneNumber: data.data.bo2_phone_number,
      }
    ].filter(bo => bo.name), // Filter out empty beneficial owners
    
    // Directors
    directors: [
      {
        name: data.data.dir1_name,
        shareholdings: data.data.dir1_shareholdings,
        idNumber: data.data.dir1_id_number,
        address: data.data.dir1_address,
        occupation: data.data.dir1_occupation,
        gender: data.data.dir1_gender,
        nationality: data.data.dir1_nationality,
        dateOfBirth: formatDate(data.data.dir1_date_of_birth),
        idType: data.data.dir1_id_type,
        phoneNumber: data.data.dir1_phone_number,
      },
      {
        name: data.data.dir2_name,
        shareholdings: data.data.dir2_shareholdings,
        idNumber: data.data.dir2_id_number,
        address: data.data.dir2_address,
        occupation: data.data.dir2_occupation,
        gender: data.data.dir2_gender,
        nationality: data.data.dir2_nationality,
        dateOfBirth: formatDate(data.data.dir2_date_of_birth),
        idType: data.data.dir2_id_type,
        phoneNumber: data.data.dir2_phone_number,
      }
    ].filter(dir => dir.name), // Filter out empty directors
    
    verified: data.success,
  }
  
  return {
    ...data.data, // Include all original data first
    ...formattedData, // Then override with formatted values
  }
}
