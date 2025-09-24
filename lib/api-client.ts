import { apiService, ApiService } from './axios-service';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message: string;
}

// User related types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// IPRS related types
export interface IPRSData {
  id: string;
  id_no: string;
  passport_no: string | null;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  nationality: string;
  gender: string;
  county_of_birth: string | null;
  district_of_birth: string | null;
  division_of_birth: string | null;
  location_of_birth: string | null;
  date_of_birth: string;
  email_address: string | null;
  phone_no: string | null;
  current_county: string | null;
  current_sub_county: string | null;
  mug_shot: string | null;
  createdAt: string;
  updatedAt: string;
}

// BRS (Business Registration Service) related types
export interface BRSData {
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

// License field interface
export interface LicenseField {
  id: string;
  licenseId: string;
  name: string;
  type: 'TEXT' | 'NUMBER' | 'EMAIL' | 'DATE' | 'SELECT' | 'TEXTAREA' | 'CHECKBOX' | 'COMPANY';
  label: string;
  required: boolean;
  placeholder: string;
  description?: string;
  options: string[];
  validation?: any;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// License related types
export interface License {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'SUSPENDED';
  requirements?: {
    documents?: string[];
    qualifications?: string[];
    minimumCapital?: number;
  };
  cost: string | number;
  validityPeriod: number; // in months
  renewalPeriod: number; // in months
  issuingAuthority: string;
  applicationSteps?: string[];
  prerequisites?: {
    businessRegistration?: boolean;
    taxCompliance?: boolean;
    environmentalClearance?: boolean;
    minimumCapital?: number;
  };
  documents?: {
    required?: string[];
    optional?: string[];
  };
  processingTime: string;
  renewalRequired: boolean;
  isDigital: boolean;
  onlineApplication: boolean;
  createdAt: string;
  updatedAt: string;
  applications?: LicenseApplication[];
  renewals?: LicenseRenewal[];
  fields?: LicenseField[];
  _count?: {
    applications: number;
    renewals: number;
  };
}

export interface LicenseApplication {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  submittedAt: string;
  userId: string;
}

export interface LicenseRenewal {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  submittedAt: string;
  userId: string;
}

export interface CreateLicenseRequest {
  name: string;
  description: string;
  category: string;
  type: string;
  issuingAuthority: string;
  cost: string | number;
  validityPeriod: number;
  renewalPeriod: number;
  requirements?: {
    documents?: string[];
    qualifications?: string[];
    minimumCapital?: number;
  };
  applicationSteps?: string[];
  prerequisites?: {
    businessRegistration?: boolean;
    taxCompliance?: boolean;
    environmentalClearance?: boolean;
    minimumCapital?: number;
  };
  documents?: {
    required?: string[];
    optional?: string[];
  };
  processingTime: string;
  renewalRequired?: boolean;
  isDigital?: boolean;
  onlineApplication?: boolean;
}

// Workflow Template types
export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  type: 'REVIEW' | 'APPROVAL' | 'INSPECTION' | 'PAYMENT' | 'NOTIFICATION' | 'DECISION' | 'DOCUMENT_VERIFICATION' | 'FIELD_VISIT' | 'COMPLIANCE_CHECK';
  assignedDepartment: string;
  assignmentMethod: 'HEAD_ASSIGNMENT' | 'OFFICER_PICKUP' | 'AUTO_ASSIGN';
  timeout: string;
  nextSteps: string[];
  conditions: {
    onComplete: string;
    onReject?: string;
    onTimeout?: string;
  };
  requiredDocuments?: string[];
  inspectionChecklist?: string[];
  paymentDetails?: {
    amount: string;
    currency: string;
    paymentMethods: string[];
  };
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  licenseType: string;
  licenseCategory: string;
  licenseid?: string;
  steps: WorkflowStep[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  createdBy: string;
}

export interface CreateWorkflowTemplateRequest {
  name: string;
  description: string;
  licenseType: string;
  licenseCategory: string;
  licenseid?: string;
  steps: WorkflowStep[];
  isActive?: boolean;
}

export interface UpdateWorkflowTemplateRequest {
  name?: string;
  description?: string;
  licenseType?: string;
  licenseCategory?: string;
  licenseid?: string;
  steps?: WorkflowStep[];
  isActive?: boolean;
}

// Director user creation types
export interface CreateUserFromDirectorRequest {
  brsId: string;
  directorId: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role?: string;
  companyName?: string;
}

export interface CreateUserFromDirectorResponse {
  id: string;
  brsId: string;
  directorId: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
}

// Legacy interface for backward compatibility
export interface BRSDirector {
  name: string;
  idNumber: string;
  nationality: string;
  postalAddress: string;
  phoneNumber: string | null;
  email: string | null;
}

// API Client class for different services
export class ApiClient {
  private readonly apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  // Authentication endpoints
  auth = {
    login: (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> =>
      this.apiService.post('/api/auth/login', credentials),

    logout: (): Promise<ApiResponse> =>
      this.apiService.post('/api/auth/logout'),

    refreshToken: (refreshToken: string): Promise<ApiResponse<LoginResponse>> =>
      this.apiService.post('/api/auth/refresh', { refreshToken }),

    verifyToken: (): Promise<ApiResponse<User>> =>
      this.apiService.get('/api/auth/verify'),
  };

  // User management endpoints
  users = {
    getAll: (page = 1, limit = 10): Promise<PaginatedResponse<User>> =>
      this.apiService.get(`/api/users?page=${page}&limit=${limit}`),

    getById: (id: string): Promise<ApiResponse<User>> =>
      this.apiService.get(`/api/users/${id}`),

    create: (userData: Partial<User>): Promise<ApiResponse<User>> =>
      this.apiService.post('/api/users', userData),

    createFromDirector: (userData: CreateUserFromDirectorRequest): Promise<ApiResponse<CreateUserFromDirectorResponse>> =>
      this.apiService.post('/api/users/create-from-director', userData),

    update: (id: string, userData: Partial<User>): Promise<ApiResponse<User>> =>
      this.apiService.put(`/api/users/${id}`, userData),

    delete: (id: string): Promise<ApiResponse> =>
      this.apiService.delete(`/api/users/${id}`),
  };

  // IPRS verification endpoints
  iprs = {
    verify: (idNumber: string): Promise<ApiResponse<IPRSData>> =>
      this.apiService.get(`/api/iprs/${idNumber}`),

    search: (query: string): Promise<ApiResponse<IPRSData[]>> =>
      this.apiService.get(`/api/iprs/search?q=${encodeURIComponent(query)}`),
  };

  // BRS (Business Registration Service) verification endpoints
  brs = {
    verify: (registrationNumber: string): Promise<ApiResponse<BRSData>> =>
      this.apiService.get(`/api/brs/${registrationNumber}`),

    search: (query: string): Promise<ApiResponse<BRSData[]>> =>
      this.apiService.get(`/api/brs/search?q=${encodeURIComponent(query)}`),
  };

  // Licenses endpoints
  licenses = {
    getAll: (page = 1, limit = 10, filters?: { status?: string; type?: string; category?: string }): Promise<PaginatedResponse<License>> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters?.status && { status: filters.status }),
        ...(filters?.type && { type: filters.type }),
        ...(filters?.category && { category: filters.category }),
      });
      return this.apiService.get(`/api/licenses?${params.toString()}`);
    },

    getById: (id: string): Promise<ApiResponse<License>> =>
      this.apiService.get(`/api/licenses/${id}`),

    create: (licenseData: CreateLicenseRequest): Promise<ApiResponse<License>> =>
      this.apiService.post('/api/licenses', licenseData),

    update: (id: string, licenseData: Partial<CreateLicenseRequest>): Promise<ApiResponse<License>> =>
      this.apiService.put(`/api/licenses/${id}`, licenseData),

    delete: (id: string): Promise<ApiResponse> =>
      this.apiService.delete(`/api/licenses/${id}`),
  };

  // Workflow Templates endpoints
  workflowTemplates = {
    getAll: (page = 1, limit = 10, filters?: { licenseType?: string; licenseCategory?: string; isActive?: boolean }): Promise<PaginatedResponse<WorkflowTemplate>> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters?.licenseType && { licenseType: filters.licenseType }),
        ...(filters?.licenseCategory && { licenseCategory: filters.licenseCategory }),
        ...(filters?.isActive !== undefined && { isActive: filters.isActive.toString() }),
      });
      return this.apiService.get(`/api/workflow/templates?${params.toString()}`);
    },

    getById: (id: string): Promise<ApiResponse<WorkflowTemplate>> =>
      this.apiService.get(`/api/workflow/templates/${id}`),

    getByLicenseType: (licenseType: string): Promise<ApiResponse<WorkflowTemplate[]>> =>
      this.apiService.get(`/api/workflow/templates/license-type/${licenseType}`),

    create: (templateData: CreateWorkflowTemplateRequest): Promise<ApiResponse<WorkflowTemplate>> =>
      this.apiService.post('/api/workflow/templates', templateData),

    update: (id: string, templateData: UpdateWorkflowTemplateRequest): Promise<ApiResponse<WorkflowTemplate>> =>
      this.apiService.put(`/api/workflow/templates/${id}`, templateData),

    delete: (id: string): Promise<ApiResponse> =>
      this.apiService.delete(`/api/workflow/templates/${id}`),
  };

  // License Fields endpoints
  licenseFields = {
    getAll: (page = 1, limit = 10, filters?: { licenseId?: string; isActive?: boolean; type?: string }): Promise<PaginatedResponse> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters?.licenseId && { licenseId: filters.licenseId }),
        ...(filters?.isActive !== undefined && { isActive: filters.isActive.toString() }),
        ...(filters?.type && { type: filters.type }),
      });
      return this.apiService.get(`/api/fields?${params.toString()}`);
    },

    getById: (id: string): Promise<ApiResponse> =>
      this.apiService.get(`/api/fields/${id}`),

    getByLicenseId: (licenseId: string): Promise<ApiResponse> =>
      this.apiService.get(`/api/licenses/${licenseId}/fields`),

    getLicenseWithFields: (licenseId: string): Promise<ApiResponse> =>
      this.apiService.get(`/api/licenses/${licenseId}/with-fields`),

    create: (licenseId: string, fieldData: any): Promise<ApiResponse> =>
      this.apiService.post(`/api/licenses/${licenseId}/fields`, fieldData),

    update: (id: string, fieldData: any): Promise<ApiResponse> =>
      this.apiService.put(`/api/fields/${id}`, fieldData),

    delete: (id: string): Promise<ApiResponse> =>
      this.apiService.delete(`/api/fields/${id}`),

    bulkCreate: (licenseId: string, fieldsData: any): Promise<ApiResponse> =>
      this.apiService.post(`/api/licenses/${licenseId}/fields/bulk`, fieldsData),

    reorder: (licenseId: string, fieldOrders: any): Promise<ApiResponse> =>
      this.apiService.put(`/api/licenses/${licenseId}/fields/reorder`, fieldOrders),

    getStatistics: (): Promise<ApiResponse> =>
      this.apiService.get('/api/fields/statistics'),

    getFieldTypes: (): Promise<ApiResponse> =>
      this.apiService.get('/api/fields/types'),

    validate: (fieldData: any): Promise<ApiResponse> =>
      this.apiService.post('/api/fields/validate', fieldData),
  };

  // Projects endpoints
  projects = {
    getAll: (page = 1, limit = 10): Promise<PaginatedResponse> =>
      this.apiService.get(`/api/projects?page=${page}&limit=${limit}`),

    getById: (id: string): Promise<ApiResponse> =>
      this.apiService.get(`/api/projects/${id}`),

    create: (projectData: any): Promise<ApiResponse> =>
      this.apiService.post('/api/projects', projectData),

    update: (id: string, projectData: any): Promise<ApiResponse> =>
      this.apiService.put(`/api/projects/${id}`, projectData),

    delete: (id: string): Promise<ApiResponse> =>
      this.apiService.delete(`/api/projects/${id}`),
  };

  // Messages endpoints
  messages = {
    getAll: (conversationId?: string, page = 1, limit = 20): Promise<PaginatedResponse> =>
      this.apiService.get(`/api/messages?conversationId=${conversationId}&page=${page}&limit=${limit}`),

    getById: (id: string): Promise<ApiResponse> =>
      this.apiService.get(`/api/messages/${id}`),

    create: (messageData: any): Promise<ApiResponse> =>
      this.apiService.post('/api/messages', messageData),

    update: (id: string, messageData: any): Promise<ApiResponse> =>
      this.apiService.put(`/api/messages/${id}`, messageData),

    delete: (id: string): Promise<ApiResponse> =>
      this.apiService.delete(`/api/messages/${id}`),
  };

  // Conversations endpoints
  conversations = {
    getAll: (page = 1, limit = 10): Promise<PaginatedResponse> =>
      this.apiService.get(`/api/conversations?page=${page}&limit=${limit}`),

    getById: (id: string): Promise<ApiResponse> =>
      this.apiService.get(`/api/conversations/${id}`),

    create: (conversationData: any): Promise<ApiResponse> =>
      this.apiService.post('/api/conversations', conversationData),

    update: (id: string, conversationData: any): Promise<ApiResponse> =>
      this.apiService.put(`/api/conversations/${id}`, conversationData),

    delete: (id: string): Promise<ApiResponse> =>
      this.apiService.delete(`/api/conversations/${id}`),

    getMessages: (id: string, page = 1, limit = 20): Promise<PaginatedResponse> =>
      this.apiService.get(`/api/conversations/${id}/messages?page=${page}&limit=${limit}`),
  };

  // AI Chat endpoints
  ai = {
    chat: (message: string, conversationId?: string): Promise<ApiResponse> =>
      this.apiService.post('/api/ai/chat', { message, conversationId }),

    generateContent: (prompt: string): Promise<ApiResponse> =>
      this.apiService.post('/api/ai/generate', { prompt }),
  };

  // File upload endpoints
  upload = {
    file: (file: File, onProgress?: (progress: number) => void): Promise<ApiResponse> =>
      this.apiService.upload('/api/upload/file', file, onProgress),

    image: (file: File, onProgress?: (progress: number) => void): Promise<ApiResponse> =>
      this.apiService.upload('/api/upload/image', file, onProgress),

    document: (file: File, onProgress?: (progress: number) => void): Promise<ApiResponse> =>
      this.apiService.upload('/api/upload/document', file, onProgress),
  };

  // Entities endpoints (for verification continue)
  entities = {
    create: (entityData: any): Promise<ApiResponse> =>
      this.apiService.post('/api/entities', entityData),

    getById: (id: string): Promise<ApiResponse> =>
      this.apiService.get(`/api/entities/${id}`),

    update: (id: string, entityData: any): Promise<ApiResponse> =>
      this.apiService.put(`/api/entities/${id}`, entityData),

    delete: (id: string): Promise<ApiResponse> =>
      this.apiService.delete(`/api/entities/${id}`),
  };

  // Applications endpoints
  applications = {
    submit: (applicationData: any): Promise<ApiResponse> =>
      this.apiService.post('/api/applications/submit', applicationData),

    getUserApplications: (userId: string, page = 1, limit = 10, filters?: { status?: string }): Promise<ApiResponse> => {
      const params = new URLSearchParams({
        userId,
        page: page.toString(),
        limit: limit.toString(),
        ...(filters?.status && { status: filters.status }),
      });
      return this.apiService.get(`/api/applications/user?${params.toString()}`);
    },

    getById: (id: string): Promise<ApiResponse> =>
      this.apiService.get(`/api/applications/${id}`),

    updateStatus: (id: string, status: string): Promise<ApiResponse> =>
      this.apiService.patch(`/api/applications/${id}/status`, { status }),

    getAll: (page = 1, limit = 10, filters?: { status?: string; entityId?: string; licenseId?: string }): Promise<PaginatedResponse> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters?.status && { status: filters.status }),
        ...(filters?.entityId && { entityId: filters.entityId }),
        ...(filters?.licenseId && { licenseId: filters.licenseId }),
      });
      return this.apiService.get(`/api/applications?${params.toString()}`);
    },
  };

  // Cache endpoints
  cache = {
    warmUsers: (): Promise<ApiResponse> =>
      this.apiService.post('/api/cache/users/warm'),
    
    warmEntities: (): Promise<ApiResponse> =>
      this.apiService.post('/api/cache/entities/warm'),
  };
}

// Export default API client instance
export const apiClient = new ApiClient(apiService);

// Export individual service instances for convenience
export const authApi = apiClient.auth;
export const usersApi = apiClient.users;
export const iprsApi = apiClient.iprs;
export const brsApi = apiClient.brs;
export const licensesApi = apiClient.licenses;
export const workflowTemplatesApi = apiClient.workflowTemplates;
export const projectsApi = apiClient.projects;
export const messagesApi = apiClient.messages;
export const conversationsApi = apiClient.conversations;
export const aiApi = apiClient.ai;
export const uploadApi = apiClient.upload;
export const entitiesApi = apiClient.entities;
export const applicationsApi = apiClient.applications;
export const cacheApi = apiClient.cache;
