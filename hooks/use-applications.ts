import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationsApi } from '@/lib/api-client';

// Types for application data
export interface ApplicationData {
  licenseName: string;
  licenseId: string;
  entityId: string;
  userId: string;
  formData: Record<string, any>;
}

export interface Application {
  id: string;
  licenseId: string;
  entityId: string;
  userId: string;
  formData: Record<string, any>;
  status: 'SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationResponse {
  success: boolean;
  data: Application;
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
    queryFn: async () => {
      const response = await applicationsApi.getUserApplications(userId, page, limit, filters);
      return response;
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
