import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { apiService } from '@/lib/axios-service';

export interface VerifyOTPRequest {
  userId: string;
  code: string;
  type: 'EMAIL' | 'SMS';
}

const verifyOTP = async (data: VerifyOTPRequest) => {
  try {
    const responseData = await apiService.post('/api/otp/verify', data);
    return responseData;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'Failed to verify OTP';
    throw new Error(errorMessage);
  }
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      console.log('OTP verified successfully:', data);
      toast.success('OTP verified successfully!');
    },
    onError: (error) => {
      console.error('Error verifying OTP:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify OTP';
      toast.error(errorMessage);
    },
    retry: 1,
    retryDelay: 1000,
  });
};
