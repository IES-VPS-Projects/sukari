import { useQuery } from "@tanstack/react-query"
import { iprsApi, ApiResponse, IPRSData } from "@/lib/api-client"

// Re-export types for backward compatibility
export type { IPRSData }

export interface IPRSResponse extends ApiResponse<IPRSData> {}

// API function to fetch IPRS data from backend server using axios
const fetchIPRSData = async (idNumber: string): Promise<IPRSResponse> => {
  if (!idNumber || idNumber.length !== 8) {
    throw new Error("Invalid National ID format")
  }

  console.log(`Fetching IPRS data for ID: ${idNumber}`)
  
  try {
    const response = await iprsApi.verify(idNumber)
    console.log('IPRS API Response:', response)
    return response
  } catch (error: any) {
    // Handle axios errors
    if (error.response?.status === 404) {
      throw new Error("National ID not found. Please check the number and try again.")
    } else if (error.response?.status === 400) {
      throw new Error("Invalid National ID format. Please enter a valid 8-digit number.")
    } else {
      throw new Error("Verification service is temporarily unavailable. Please try again later.")
    }
  }
}

// Custom hook for IPRS verification
export const useIPRSVerification = (idNumber: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ["iprs", idNumber],
    queryFn: () => fetchIPRSData(idNumber),
    enabled: enabled && idNumber.length === 8,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  })
}

// Helper function to format IPRS data for the UI
export const formatIPRSData = (data: IPRSResponse) => {
  // Format date from ISO string to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Format gender from 'm'/'f' to 'Male'/'Female'
  const formatGender = (gender: string) => {
    if (gender === 'm') return 'Male';
    if (gender === 'f') return 'Female';
    return gender;
  }

  const formattedData = {
    idNumber: data.data.id_no,
    firstName: data.data.first_name,
    middleName: data.data.middle_name,
    lastName: data.data.last_name,
    fullName: `${data.data.first_name} ${data.data.middle_name ? data.data.middle_name + ' ' : ''}${data.data.last_name}`.trim(),
    dateOfBirth: formatDate(data.data.date_of_birth),
    gender: formatGender(data.data.gender),
    nationality: data.data.nationality,
    countyOfBirth: data.data.county_of_birth,
    verified: data.success,
  }
  
  return {
    ...data.data, // Include all original data first
    ...formattedData, // Then override with formatted values
  }
}
