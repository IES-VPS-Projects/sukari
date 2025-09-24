import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationsApi } from '@/lib/api-client';

// Types for application data
export interface ApplicationData {
  licenseId: string;
  entityId: string;
  userId: string;
  licenseName?: string;
  formData: Record<string, any>;
}

export interface Application {
  id: string;
  licenseId: string;
  entityId: string;
  userId: string;
  status: 'SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  applicationData: Record<string, any>;
  submittedAt: string;
  reviewedAt: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  assignedTo: string | null;
  notes: string | null;
  documents: any[] | null;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  paymentReference: string | null;
  createdAt: string;
  updatedAt: string;
  license: {
    id: string;
    name: string;
    description: string;
    category: string;
    type: string;
    status: string;
    requirements: Record<string, boolean>;
    validityPeriod: number;
    cost: string;
    issuingAuthority: string;
    applicationSteps: any[] | null;
    prerequisites: any[] | null;
    documents: any[] | null;
    processingTime: string;
    renewalRequired: boolean;
    renewalPeriod: number;
    isDigital: boolean;
    onlineApplication: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ApplicationResponse {
  success: boolean;
  data: Application;
  message: string;
}

// User and Entity interfaces for the user applications response
export interface IPRSData {
  id: string;
  id_no: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  nationality: string;
}

export interface BusinessId {
  id: string;
  search_number: string;
  registration_number: string;
  legal_name: string;
  company_type: string;
  status: string;
  country: string;
  address: string;
  industry: string;
  tax_id: string;
  registration_date: string;
  phone: string;
  email: string;
  state: string;
  authorized_shared_capital: string;
  result_text: string;
  result_code: string;
  verify_business: string;
  fiduciary_name: string;
  fiduciary_type: string;
  fiduciary_address: string;
  fiduciary_registration_number: string;
  fiduciary_status: string;
  bo1_name: string;
  bo1_shareholdings: string;
  bo1_address: string;
  bo1_gender: string;
  bo1_nationality: string;
  bo1_registration_number: string;
  bo1_shareholder_type: string;
  bo1_phone_number: string;
  bo2_name: string;
  bo2_shareholdings: string;
  bo2_address: string;
  bo2_gender: string;
  bo2_nationality: string;
  bo2_registration_number: string;
  bo2_shareholder_type: string;
  bo2_phone_number: string;
  dir1_name: string;
  dir1_shareholdings: string;
  dir1_id_number: string;
  dir1_address: string;
  dir1_occupation: string;
  dir1_gender: string;
  dir1_nationality: string;
  dir1_date_of_birth: string;
  dir1_id_type: string;
  dir1_phone_number: string;
  dir2_name: string;
  dir2_shareholdings: string;
  dir2_id_number: string;
  dir2_address: string;
  dir2_occupation: string;
  dir2_gender: string;
  dir2_nationality: string;
  dir2_date_of_birth: string;
  dir2_id_type: string;
  dir2_phone_number: string;
  createdAt: string;
  updatedAt: string;
}

export interface Director {
  id: string;
  name: string;
  idNumber: string;
  nationality: string;
  postalAddress: string | null;
  phoneNumber: string;
  email: string;
}

export interface Entity {
  id: string;
  userType: string;
  designation: string | null;
  phoneNumber: string;
  email: string;
  address: string | null;
  website: string | null;
  registrationNumber: string | null;
  companyName: string | null;
  establishmentDate: string | null;
  status: string | null;
  businessType: string | null;
  taxId: string | null;
  companyEmail: string | null;
  industry: string | null;
  numberOfEmployees: number | null;
  postalAddress: string | null;
  buildingName: string | null;
  streetName: string | null;
  plotNumber: string | null;
  county: string | null;
  subCounty: string | null;
  location: string | null;
  ward: string | null;
  iprs: IPRSData | null;
  user: {
    id: string;
    email: string;
    role: string;
    isActive: boolean;
    employeeId: string | null;
    departmentId: string | null;
    designation: string | null;
    phoneNumber: string | null;
    officeLocation: string | null;
    isKSBUser: boolean;
    isDepartmentHead: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  isActive: boolean;
  role: string;
  iprs: IPRSData;
  entity: {
    id: string;
    userType: string;
    designation: string;
    businessId: BusinessId;
    directors: Director[];
  };
}

export interface UserApplicationsResponse {
  success: boolean;
  data: {
    applications: Application[];
    userId: string;
    entityId: string;
    user: User;
    entity: Entity;
  };
  message: string;
}

// Query keys for applications
export const applicationsKeys = {
  all: ['applications'] as const,
  lists: () => [...applicationsKeys.all, 'list'] as const,
  list: (filters: { page?: number; limit?: number; status?: string; entityId?: string }) => 
    [...applicationsKeys.lists(), filters] as const,
  details: () => [...applicationsKeys.all, 'detail'] as const,
  detail: (id: string) => [...applicationsKeys.details(), id] as const,
  byEntity: (entityId: string) => [...applicationsKeys.all, 'entity', entityId] as const,
  byLicense: (licenseId: string) => [...applicationsKeys.all, 'license', licenseId] as const,
  byUser: (userId: string, filters?: { status?: string; page?: number; limit?: number }) => 
    [...applicationsKeys.all, 'user', userId, filters] as const,
};

// Hook to submit a new application
export function useSubmitApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationData: ApplicationData): Promise<ApplicationResponse> => {
      const response = await applicationsApi.submit(applicationData);
      return response as ApplicationResponse;
    },
    onSuccess: (response, variables) => {
      // Invalidate applications list to refetch
      queryClient.invalidateQueries({ queryKey: applicationsKeys.lists() });
      
      // Invalidate entity-specific applications
      queryClient.invalidateQueries({ 
        queryKey: applicationsKeys.byEntity(variables.entityId) 
      });
      
      // Invalidate license-specific applications
      queryClient.invalidateQueries({ 
        queryKey: applicationsKeys.byLicense(variables.licenseId) 
      });
      
      // Add the new application to the cache
      queryClient.setQueryData(
        applicationsKeys.detail(response.data.id),
        response
      );
    },
    onError: (error) => {
      console.error('Error submitting application:', error);
    },
  });
}

// Hook to fetch applications with optional filters
export function useApplications(
  page = 1,
  limit = 10,
  filters?: { status?: string; entityId?: string; licenseId?: string }
) {
  return useQuery({
    queryKey: applicationsKeys.list({ page, limit, ...filters }),
    queryFn: async () => {
      const response = await applicationsApi.getAll(page, limit, filters);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to fetch a single application by ID
export function useApplication(id: string) {
  return useQuery({
    queryKey: applicationsKeys.detail(id),
    queryFn: async () => {
      const response = await applicationsApi.getById(id);
      return response;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to fetch applications by entity ID
export function useApplicationsByEntity(entityId: string) {
  return useQuery({
    queryKey: applicationsKeys.byEntity(entityId),
    queryFn: async () => {
      // This would be implemented when we have a GET endpoint for entity applications
      // For now, return empty data
      return [];
    },
    enabled: !!entityId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to fetch applications by license ID
export function useApplicationsByLicense(licenseId: string) {
  return useQuery({
    queryKey: applicationsKeys.byLicense(licenseId),
    queryFn: async () => {
      const response = await applicationsApi.getAll(1, 100, { licenseId });
      return response.data;
    },
    enabled: !!licenseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to fetch user applications
export function useUserApplications(
  userId: string,
  page = 1,
  limit = 10,
  filters?: { status?: string }
) {
  return useQuery({
    queryKey: applicationsKeys.byUser(userId, { status: filters?.status, page, limit }),
    queryFn: async (): Promise<UserApplicationsResponse> => {
      const response = await applicationsApi.getUserApplications(userId, page, limit, filters);
      return response as UserApplicationsResponse;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to update application status
export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await applicationsApi.updateStatus(id, status);
      return response;
    },
    onSuccess: (response, variables) => {
      // Update the specific application in cache
      queryClient.setQueryData(
        applicationsKeys.detail(variables.id),
        response
      );
      
      // Invalidate applications list to refetch
      queryClient.invalidateQueries({ queryKey: applicationsKeys.lists() });
    },
    onError: (error) => {
      console.error('Error updating application status:', error);
    },
  });
}
