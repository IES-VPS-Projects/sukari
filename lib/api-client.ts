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

// API Client class for different services
export class ApiClient {
  private apiService: ApiService;

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
}

// Export default API client instance
export const apiClient = new ApiClient(apiService);

// Export individual service instances for convenience
export const authApi = apiClient.auth;
export const usersApi = apiClient.users;
export const iprsApi = apiClient.iprs;
export const projectsApi = apiClient.projects;
export const messagesApi = apiClient.messages;
export const conversationsApi = apiClient.conversations;
export const aiApi = apiClient.ai;
export const uploadApi = apiClient.upload;
export const entitiesApi = apiClient.entities;
