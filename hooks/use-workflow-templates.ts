import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  workflowTemplatesApi, 
  CreateWorkflowTemplateRequest, 
  UpdateWorkflowTemplateRequest
} from '@/lib/api-client';

// Query keys for workflow templates
export const workflowTemplateKeys = {
  all: ['workflowTemplates'] as const,
  lists: () => [...workflowTemplateKeys.all, 'list'] as const,
  list: (filters: { 
    page?: number; 
    limit?: number; 
    licenseType?: string; 
    licenseCategory?: string; 
    isActive?: boolean 
  }) => [...workflowTemplateKeys.lists(), filters] as const,
  details: () => [...workflowTemplateKeys.all, 'detail'] as const,
  detail: (id: string) => [...workflowTemplateKeys.details(), id] as const,
  byLicenseType: (licenseType: string) => [...workflowTemplateKeys.all, 'byLicenseType', licenseType] as const,
};

// Hook to fetch all workflow templates with optional filters
export function useWorkflowTemplates(
  page = 1,
  limit = 10,
  filters?: { licenseType?: string; licenseCategory?: string; isActive?: boolean }
) {
  return useQuery({
    queryKey: workflowTemplateKeys.list({ page, limit, ...filters }),
    queryFn: () => workflowTemplatesApi.getAll(page, limit, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to fetch a single workflow template by ID
export function useWorkflowTemplate(id: string) {
  return useQuery({
    queryKey: workflowTemplateKeys.detail(id),
    queryFn: () => workflowTemplatesApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to fetch workflow templates by license type
export function useWorkflowTemplatesByLicenseType(licenseType: string) {
  return useQuery({
    queryKey: workflowTemplateKeys.byLicenseType(licenseType),
    queryFn: () => workflowTemplatesApi.getByLicenseType(licenseType),
    enabled: !!licenseType,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to create a new workflow template
export function useCreateWorkflowTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateData: CreateWorkflowTemplateRequest) => 
      workflowTemplatesApi.create(templateData),
    onSuccess: (newTemplate) => {
      // Invalidate and refetch templates list
      queryClient.invalidateQueries({ queryKey: workflowTemplateKeys.lists() });
      
      // Add the new template to the cache
      queryClient.setQueryData(
        workflowTemplateKeys.detail(newTemplate.data.id),
        newTemplate
      );
    },
    onError: (error) => {
      console.error('Error creating workflow template:', error);
    },
  });
}

// Hook to update a workflow template
export function useUpdateWorkflowTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkflowTemplateRequest }) =>
      workflowTemplatesApi.update(id, data),
    onSuccess: (updatedTemplate, variables) => {
      // Update the specific template in cache
      queryClient.setQueryData(
        workflowTemplateKeys.detail(variables.id),
        updatedTemplate
      );
      
      // Invalidate templates list to refetch
      queryClient.invalidateQueries({ queryKey: workflowTemplateKeys.lists() });
    },
    onError: (error) => {
      console.error('Error updating workflow template:', error);
    },
  });
}

// Hook to delete a workflow template
export function useDeleteWorkflowTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workflowTemplatesApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove the template from cache
      queryClient.removeQueries({ queryKey: workflowTemplateKeys.detail(deletedId) });
      
      // Invalidate templates list to refetch
      queryClient.invalidateQueries({ queryKey: workflowTemplateKeys.lists() });
    },
    onError: (error) => {
      console.error('Error deleting workflow template:', error);
    },
  });
}

// Hook to get workflow templates by license type
export function useWorkflowTemplatesByType(licenseType: string) {
  return useWorkflowTemplates(1, 100, { licenseType });
}

// Hook to get active workflow templates
export function useActiveWorkflowTemplates() {
  return useWorkflowTemplates(1, 100, { isActive: true });
}

// Utility hook to get workflow template statistics
export function useWorkflowTemplateStats() {
  const { data: allTemplates } = useWorkflowTemplates(1, 100);
  const { data: activeTemplates } = useActiveWorkflowTemplates();

  return {
    total: allTemplates?.pagination.total || 0,
    active: activeTemplates?.pagination.total || 0,
    inactive: (allTemplates?.pagination.total || 0) - (activeTemplates?.pagination.total || 0),
  };
}

// Predefined workflow templates for quick creation
export const predefinedTemplates = {
  millers: {
    name: "Millers License Application Workflow",
    description: "Complete workflow for millers license applications",
    licenseType: "MILLERS",
    licenseCategory: "PERMIT_AND_LICENSE",
    licenseid: "MILLERS_LICENSE",
    steps: [
      {
        id: "initial_review",
        name: "Initial Application Review",
        description: "Review submitted application documents and requirements",
        type: "REVIEW" as const,
        assignedDepartment: "Committee",
        assignmentMethod: "HEAD_ASSIGNMENT" as const,
        timeout: "2 days",
        nextSteps: ["field_inspection", "reject"],
        conditions: {
          onComplete: "field_inspection",
          onReject: "reject"
        },
        requiredDocuments: [
          "Business Registration Certificate",
          "Tax Compliance Certificate",
          "Environmental Impact Assessment"
        ]
      },
      {
        id: "field_inspection",
        name: "Field Inspection",
        description: "Conduct on-site inspection of miller's facility",
        type: "INSPECTION" as const,
        assignedDepartment: "Field Operations",
        assignmentMethod: "OFFICER_PICKUP" as const,
        timeout: "5 days",
        nextSteps: ["payment_processing", "reject"],
        conditions: {
          onComplete: "payment_processing",
          onReject: "reject"
        },
        inspectionChecklist: [
          "Facility compliance with standards",
          "Equipment verification",
          "Safety measures assessment"
        ]
      },
      {
        id: "payment_processing",
        name: "Payment Processing",
        description: "Process license fee payment",
        type: "PAYMENT" as const,
        assignedDepartment: "Accounts",
        assignmentMethod: "AUTO_ASSIGN" as const,
        timeout: "1 day",
        nextSteps: ["final_approval"],
        conditions: {
          onComplete: "final_approval"
        },
        paymentDetails: {
          amount: "Variable based on capacity",
          currency: "KES",
          paymentMethods: ["Bank Transfer", "Mobile Money"]
        }
      },
      {
        id: "final_approval",
        name: "Final Approval",
        description: "Final approval and license issuance",
        type: "APPROVAL" as const,
        assignedDepartment: "CEO",
        assignmentMethod: "HEAD_ASSIGNMENT" as const,
        timeout: "3 days",
        nextSteps: ["complete", "reject"],
        conditions: {
          onComplete: "complete",
          onReject: "reject"
        }
      }
    ]
  },
  whiteSugar: {
    name: "White Sugar License Application Workflow",
    description: "Complete workflow for white sugar license applications",
    licenseType: "WHITE_SUGAR",
    licenseCategory: "PERMIT_AND_LICENSE",
    licenseid: "WHITE_SUGAR_LICENSE",
    steps: [
      {
        id: "document_review",
        name: "Document Review",
        description: "Review all submitted documents and compliance certificates",
        type: "REVIEW" as const,
        assignedDepartment: "Committee",
        assignmentMethod: "HEAD_ASSIGNMENT" as const,
        timeout: "3 days",
        nextSteps: ["site_inspection", "reject"],
        conditions: {
          onComplete: "site_inspection",
          onReject: "reject"
        },
        requiredDocuments: [
          "Business Registration Certificate",
          "Tax Compliance Certificate",
          "Quality Assurance Certificate",
          "Storage Facility Documentation"
        ]
      },
      {
        id: "site_inspection",
        name: "Site Inspection",
        description: "Conduct comprehensive site inspection",
        type: "INSPECTION" as const,
        assignedDepartment: "Field Operations",
        assignmentMethod: "OFFICER_PICKUP" as const,
        timeout: "7 days",
        nextSteps: ["fee_payment", "reject"],
        conditions: {
          onComplete: "fee_payment",
          onReject: "reject"
        },
        inspectionChecklist: [
          "Storage facility compliance",
          "Quality control measures",
          "Safety protocols",
          "Environmental compliance"
        ]
      },
      {
        id: "fee_payment",
        name: "License Fee Payment",
        description: "Process white sugar license fee payment",
        type: "PAYMENT" as const,
        assignedDepartment: "Accounts",
        assignmentMethod: "AUTO_ASSIGN" as const,
        timeout: "2 days",
        nextSteps: ["license_issuance"],
        conditions: {
          onComplete: "license_issuance"
        },
        paymentDetails: {
          amount: "KES 50,000",
          currency: "KES",
          paymentMethods: ["Bank Transfer", "Mobile Money"]
        }
      },
      {
        id: "license_issuance",
        name: "License Issuance",
        description: "Issue white sugar license",
        type: "APPROVAL" as const,
        assignedDepartment: "CEO",
        assignmentMethod: "HEAD_ASSIGNMENT" as const,
        timeout: "2 days",
        nextSteps: ["complete"],
        conditions: {
          onComplete: "complete"
        }
      }
    ]
  },
  registration: {
    name: "Registration Application Workflow",
    description: "Complete workflow for registration applications",
    licenseType: "REGISTRATION",
    licenseCategory: "PERMIT_AND_LICENSE",
    licenseid: "REGISTRATION_LICENSE",
    steps: [
      {
        id: "registration_review",
        name: "Registration Review",
        description: "Review registration application",
        type: "REVIEW" as const,
        assignedDepartment: "Committee",
        assignmentMethod: "HEAD_ASSIGNMENT" as const,
        timeout: "1 day",
        nextSteps: ["payment_processing", "reject"],
        conditions: {
          onComplete: "payment_processing",
          onReject: "reject"
        }
      },
      {
        id: "payment_processing",
        name: "Payment Processing",
        description: "Process registration fees",
        type: "PAYMENT" as const,
        assignedDepartment: "Accounts",
        assignmentMethod: "AUTO_ASSIGN" as const,
        timeout: "1 day",
        nextSteps: ["registration_approval"],
        conditions: {
          onComplete: "registration_approval"
        }
      },
      {
        id: "registration_approval",
        name: "Registration Approval",
        description: "Approve and complete registration",
        type: "APPROVAL" as const,
        assignedDepartment: "CEO",
        assignmentMethod: "HEAD_ASSIGNMENT" as const,
        timeout: "1 day",
        nextSteps: ["complete"],
        conditions: {
          onComplete: "complete"
        }
      }
    ]
  }
};
