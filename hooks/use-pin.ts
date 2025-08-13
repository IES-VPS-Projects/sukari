import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';

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
  const response = await fetch('http://localhost:3001/api/pin/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to create PIN');
  }
  
  return responseData;
};

const verifyPIN = async (data: VerifyPINRequest) => {
  const response = await fetch('http://localhost:3001/api/pin/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to verify PIN');
  }
  
  return responseData;
};

const updatePIN = async (userId: string, data: UpdatePINRequest) => {
  const response = await fetch(`http://localhost:3001/api/pin/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to update PIN');
  }
  
  return responseData;
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
