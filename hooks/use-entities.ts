import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { entitiesApi } from "@/lib/api-client";
import { useToast } from "./use-toast";

// Types for entity data
export interface EntityDirector {
  id: string;
  name: string;
  idNumber: string;
  nationality: string;
  postalAddress: string | null;
  phoneNumber: string | null;
  email: string | null;
}

export interface EntityUserIPRS {
  id: string;
  id_no: string;
  passport_no: string | null;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  nationality: string;
  gender: string | null;
  county_of_birth: string | null;
  district_of_birth: string | null;
  division_of_birth: string | null;
  location_of_birth: string | null;
  date_of_birth: string | null;
  email_address: string | null;
  phone_no: string | null;
  current_county: string | null;
  current_sub_county: string | null;
  mug_shot: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EntityBRS {
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

export interface EntityUser {
  id: string;
  email: string;
  // Optional fields since backend no longer guarantees these
  role?: string;
  isActive?: boolean;
  employeeId?: string | null;
  departmentId?: string | null;
  designation?: string | null;
  phoneNumber?: string | null;
  officeLocation?: string | null;
  isKSBUser?: boolean;
  isDepartmentHead?: boolean;
  iprs?: EntityUserIPRS | null;
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
  createdAt: string;
  updatedAt: string;
  // Newly added/realigned fields
  iprsId?: string | null;
  userId?: string | null;
  businessVerificationId?: string | null;
  iprs?: null; // top-level iprs is null per new payload
  businessId?: EntityBRS | null;
  user?: EntityUser | null;
  directors?: EntityDirector[];
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
