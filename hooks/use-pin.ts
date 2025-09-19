import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { apiService } from '@/lib/axios-service';

export interface CreatePINRequest {
  userId: string;
  pin: string;
}

export interface VerifyPINRequest {
  userId: string;
  pin: string;
}

export interface UpdatePINRequest {
  pin: string;
}

const createPIN = async (data: CreatePINRequest) => {
  try {
    const responseData = await apiService.post('/api/pin/create', data);
    return responseData;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'Failed to create PIN';
    throw new Error(errorMessage);
  }
};

const verifyPIN = async (data: VerifyPINRequest) => {
  try {
    const responseData = await apiService.post('/api/pin/verify', data);
    return responseData;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'Failed to verify PIN';
    throw new Error(errorMessage);
  }
};

const updatePIN = async (userId: string, data: UpdatePINRequest) => {
  try {
    const responseData = await apiService.put(`/api/pin/${userId}`, data);
    return responseData;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'Failed to update PIN';
    throw new Error(errorMessage);
  }
};

export const useCreatePIN = () => {
  return useMutation({
    mutationFn: createPIN,
    onSuccess: (data) => {
      console.log('PIN created successfully:', data);
      toast.success('PIN created successfully!');
    },
    onError: (error) => {
      console.error('Error creating PIN:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create PIN';
      toast.error(errorMessage);
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useVerifyPIN = () => {
  return useMutation({
    mutationFn: verifyPIN,
    onSuccess: (data) => {
      console.log('PIN verified successfully:', data);
      toast.success('PIN verified successfully!');
    },
    onError: (error) => {
      console.error('Error verifying PIN:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify PIN';
      toast.error(errorMessage);
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useUpdatePIN = () => {
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdatePINRequest }) => updatePIN(userId, data),
    onSuccess: (data) => {
      console.log('PIN updated successfully:', data);
      toast.success('PIN updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating PIN:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update PIN';
      toast.error(errorMessage);
    },
    retry: 1,
    retryDelay: 1000,
  });
};
