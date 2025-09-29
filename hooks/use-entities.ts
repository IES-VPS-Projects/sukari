import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { entitiesApi } from "@/lib/api-client";
import { useToast } from "./use-toast";

// Types for entity data
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
  iprs: any | null;
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
  createdAt: string;
  updatedAt: string;
}

export interface EntityResponse {
  success: boolean;
  data: Entity;
  message: string;
}

// Query keys for entities
export const entitiesKeys = {
  all: ['entities'] as const,
  details: () => [...entitiesKeys.all, 'detail'] as const,
  detail: (id: string) => [...entitiesKeys.details(), id] as const,
};

// Custom hook to get a single entity by ID
export const useEntity = (id: string) => {
  return useQuery({
    queryKey: entitiesKeys.detail(id),
    queryFn: async (): Promise<EntityResponse> => {
      const response = await entitiesApi.getById(id);
      return response as EntityResponse;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Custom hook to create a new entity
export const useCreateEntity = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (entityData: any): Promise<EntityResponse> => 
      entitiesApi.create(entityData),
    onSuccess: (response) => {
      // Add the new entity to the cache
      queryClient.setQueryData(
        entitiesKeys.detail(response.data.id),
        response
      );
      
      toast({
        title: "Entity Created",
        description: "Your entity has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.response?.data?.message || "Failed to create entity. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Custom hook to update an entity
export const useUpdateEntity = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }): Promise<EntityResponse> => 
      entitiesApi.update(id, data),
    onSuccess: (response, { id }) => {
      // Update the specific entity in cache
      queryClient.setQueryData(
        entitiesKeys.detail(id),
        response
      );
      
      toast({
        title: "Entity Updated",
        description: "Your entity has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update entity. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Custom hook to delete an entity
export const useDeleteEntity = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string): Promise<{ success: boolean; message: string }> => 
      entitiesApi.delete(id),
    onSuccess: (_, id) => {
      // Remove the entity from cache
      queryClient.removeQueries({ queryKey: entitiesKeys.detail(id) });
      
      toast({
        title: "Entity Deleted",
        description: "Your entity has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Deletion Failed",
        description: error.response?.data?.message || "Failed to delete entity. Please try again.",
        variant: "destructive",
      });
    },
  });
};
