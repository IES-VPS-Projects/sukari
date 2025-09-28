import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { licensesApi, CreateLicenseRequest } from '@/lib/api-client';

// Query keys for licenses
export const licensesKeys = {
  all: ['licenses'] as const,
  lists: () => [...licensesKeys.all, 'list'] as const,
  list: (filters: { page?: number; limit?: number; status?: string; type?: string; category?: string }) => 
    [...licensesKeys.lists(), filters] as const,
  details: () => [...licensesKeys.all, 'detail'] as const,
  detail: (id: string) => [...licensesKeys.details(), id] as const,
};

// Hook to fetch all licenses with optional filters
export function useLicenses(
  page = 1,
  limit = 10,
  filters?: { status?: string; type?: string; category?: string }
) {
  return useQuery({
    queryKey: licensesKeys.list({ page, limit, ...filters }),
    queryFn: () => licensesApi.getAll(page, limit, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to fetch a single license by ID
export function useLicense(id: string) {
  return useQuery({
    queryKey: licensesKeys.detail(id),
    queryFn: () => licensesApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to create a new license
export function useCreateLicense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (licenseData: CreateLicenseRequest) => licensesApi.create(licenseData),
    onSuccess: (newLicense) => {
      // Invalidate and refetch licenses list
      queryClient.invalidateQueries({ queryKey: licensesKeys.lists() });
      
      // Add the new license to the cache
      queryClient.setQueryData(
        licensesKeys.detail(newLicense.data.id),
        newLicense
      );
    },
    onError: (error) => {
      console.error('Error creating license:', error);
    },
  });
}

// Hook to update a license
export function useUpdateLicense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateLicenseRequest> }) =>
      licensesApi.update(id, data),
    onSuccess: (updatedLicense, variables) => {
      // Update the specific license in cache
      queryClient.setQueryData(
        licensesKeys.detail(variables.id),
        updatedLicense
      );
      
      // Invalidate licenses list to refetch
      queryClient.invalidateQueries({ queryKey: licensesKeys.lists() });
    },
    onError: (error) => {
      console.error('Error updating license:', error);
    },
  });
}

// Hook to delete a license
export function useDeleteLicense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => licensesApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove the license from cache
      queryClient.removeQueries({ queryKey: licensesKeys.detail(deletedId) });
      
      // Invalidate licenses list to refetch
      queryClient.invalidateQueries({ queryKey: licensesKeys.lists() });
    },
    onError: (error) => {
      console.error('Error deleting license:', error);
    },
  });
}

// Hook to get licenses by status
export function useLicensesByStatus(status: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'SUSPENDED') {
  return useLicenses(1, 100, { status });
}

// Hook to get licenses by type
export function useLicensesByType(type: string) {
  return useLicenses(1, 100, { type });
}

// Hook to get licenses by category
export function useLicensesByCategory(category: string) {
  return useLicenses(1, 100, { category });
}

// Utility hook to get license statistics
export function useLicenseStats() {
  const { data: activeLicenses } = useLicensesByStatus('ACTIVE');
  const { data: expiredLicenses } = useLicensesByStatus('EXPIRED');
  const { data: pendingLicenses } = useLicensesByStatus('PENDING');
  const { data: suspendedLicenses } = useLicensesByStatus('SUSPENDED');

  return {
    active: activeLicenses?.pagination.total || 0,
    expired: expiredLicenses?.pagination.total || 0,
    pending: pendingLicenses?.pagination.total || 0,
    suspended: suspendedLicenses?.pagination.total || 0,
    total: (activeLicenses?.pagination.total || 0) + 
           (expiredLicenses?.pagination.total || 0) + 
           (pendingLicenses?.pagination.total || 0) + 
           (suspendedLicenses?.pagination.total || 0),
  };
}
