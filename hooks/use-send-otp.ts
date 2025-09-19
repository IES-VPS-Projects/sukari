import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { apiService } from '@/lib/axios-service';

export interface SendOTPRequest {
  userId: string;
  type: 'EMAIL' | 'SMS';
}

const sendOTP = async (data: SendOTPRequest) => {
  try {
    const responseData = await apiService.post('/api/otp/send', data);
    return responseData;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'Failed to send OTP';
    throw new Error(errorMessage);
  }
};

export const useSendOTP = () => {
  return useMutation({
    mutationFn: sendOTP,
    onSuccess: (data) => {
      console.log('OTP sent successfully:', data);
      toast.success('OTP sent successfully!');
    },
    onError: (error) => {
      console.error('Error sending OTP:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP';
      toast.error(errorMessage);
    },
    retry: 1,
    retryDelay: 1000,
  });
};
