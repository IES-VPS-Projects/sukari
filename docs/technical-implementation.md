# Technical Implementation Guide

## Overview
This document provides technical details about the implementation of the individual user signup flow, including architecture, custom hooks, data management, and best practices.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: React Query (@tanstack/react-query)
- **Data Persistence**: localStorage
- **Notifications**: react-hot-toast

### Backend Integration
- **Base URL**: `http://localhost:3001`
- **Protocol**: HTTP/HTTPS
- **Data Format**: JSON
- **Error Handling**: Consistent error response format

## Project Structure

```
sukari/
├── app/
│   ├── signup/
│   │   ├── user-type/page.tsx
│   │   ├── verification/page.tsx
│   │   ├── authentication/page.tsx
│   │   ├── otp-verification/page.tsx
│   │   ├── otp-submission/page.tsx
│   │   └── create-password/page.tsx
│   └── layout.tsx
├── hooks/
│   ├── use-signup-data.ts
│   ├── use-iprs.ts
│   ├── use-verification-continue.ts
│   ├── use-create-user.ts
│   ├── use-send-otp.ts
│   ├── use-resend-otp.ts
│   ├── use-verify-otp.ts
│   └── use-pin.ts
├── lib/
│   ├── react-query.tsx
│   └── utils.ts
└── components/
    └── ui/
```

## Core Architecture

### 1. React Query Provider Setup

**File**: `lib/react-query.tsx`
```typescript
"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

**Integration**: `app/layout.tsx`
```typescript
import { ReactQueryProvider } from "@/lib/react-query"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
```

### 2. Data Persistence Hook

**File**: `hooks/use-signup-data.ts`
```typescript
import { useState, useEffect } from 'react';

export interface SignupData {
  iprsData?: IPRSResponse;
  verificationData?: {
    fullName: string;
    idNumber: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    countyOfBirth: string;
    userType: string;
    designation: string;
    phoneNumber: string;
  };
  entityData?: ContinueData;
  entityResponse?: EntityResponse;
  authenticationData?: {
    telephone: string;
    email: string;
    iprs_id: string;
    userType: string;
  };
  userCreationData?: CreateUserRequest;
  userCreationResponse?: UserResponse;
  pinData?: {
    pin: string;
    confirmPin: string;
  };
}

export const useSignupData = () => {
  const [signupData, setSignupData] = useState<SignupData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("signupData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setSignupData(parsedData);
      } catch (error) {
        console.error('Error parsing signup data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const updateSignupData = (newData: Partial<SignupData>) => {
    const updatedData = { ...signupData, ...newData };
    setSignupData(updatedData);
    localStorage.setItem("signupData", JSON.stringify(updatedData));
  };

  const clearSignupData = () => {
    setSignupData({});
    localStorage.removeItem("signupData");
  };

  return {
    signupData,
    isLoading,
    updateSignupData,
    clearSignupData,
    // Helper functions for accessing specific data
    getIPRSData: () => signupData.iprsData,
    getVerificationData: () => signupData.verificationData,
    getEntityData: () => signupData.entityData,
    getEntityResponse: () => signupData.entityResponse,
    getAuthenticationData: () => signupData.authenticationData,
    getUserCreationResponse: () => signupData.userCreationResponse,
  };
};
```

### 3. Custom Hook Pattern

All API operations follow a consistent pattern using React Query mutations:

```typescript
// Example: useCreateUser hook
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';

export interface CreateUserRequest {
  iprsID: string;
  phoneNumber: string;
  email: string;
  entityID: string;
}

const createUserWithEntity = async (data: CreateUserRequest) => {
  const response = await fetch('http://localhost:3001/api/users/create-with-entity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to create user');
  }
  
  return responseData;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUserWithEntity,
    onSuccess: (data) => {
      console.log('User created successfully:', data);
      toast.success('User created successfully!');
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
      toast.error(errorMessage);
    },
    retry: 1,
    retryDelay: 1000,
  });
};
```

## Page Implementation Pattern

Each page follows a consistent pattern:

```typescript
"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSignupData } from "@/hooks/use-signup-data"
import { useSpecificHook } from "@/hooks/use-specific-hook"
import toast, { Toaster } from 'react-hot-toast'

export default function PageName() {
  // Local state
  const [formData, setFormData] = useState({})
  const [error, setError] = useState("")
  const router = useRouter()
  
  // Data and hooks
  const { 
    getSpecificData, 
    updateSignupData, 
    isLoading 
  } = useSignupData()
  const specificMutation = useSpecificHook()
  
  const specificData = getSpecificData()

  // Data validation and loading
  useEffect(() => {
    if (isLoading) return
    
    if (!specificData) {
      router.push("/signup/previous-step")
      return
    }
  }, [specificData, router, isLoading])

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const requestData = {
        // Prepare request data
      }
      
      await specificMutation.mutateAsync(requestData)
      
      // Update signup data
      updateSignupData({
        // Store relevant data
      })

      // Navigate to next step
      router.push("/signup/next-step")
    } catch (error) {
      console.error("Error:", error)
      // Error handled by mutation hook
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {/* Page content */}
    </div>
  )
}
```

## Data Flow Architecture

### 1. Data Persistence Strategy
- **localStorage**: Temporary storage during signup flow
- **Data Structure**: Hierarchical object with all signup data
- **Loading States**: Prevent premature redirects
- **Cleanup**: Clear data after successful completion

### 2. API Integration Pattern
- **Direct Backend Calls**: No Next.js API routes
- **Error Handling**: Consistent error parsing
- **Retry Logic**: 1 retry with 1-second delay
- **Loading States**: Mutation-based loading indicators

### 3. State Management
- **React Query**: Server state management
- **useState**: Local component state
- **useSignupData**: Global signup state
- **Toast Notifications**: User feedback

## Error Handling Strategy

### 1. API Error Handling
```typescript
const handleApiCall = async (data: RequestData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.error || responseData.message || 'Request failed');
    }
    
    return responseData;
  } catch (error) {
    throw error;
  }
};
```

### 2. React Query Error Handling
```typescript
export const useApiHook = () => {
  return useMutation({
    mutationFn: handleApiCall,
    onSuccess: (data) => {
      toast.success('Operation successful!');
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Operation failed';
      toast.error(errorMessage);
    },
    retry: 1,
    retryDelay: 1000,
  });
};
```

### 3. Component Error Handling
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  try {
    await mutation.mutateAsync(data)
    // Success handling
  } catch (error) {
    console.error("Error:", error)
    // Error already handled by mutation hook
  }
}
```

## Validation Patterns

### 1. Client-Side Validation
```typescript
const validateForm = (data: FormData) => {
  const errors: string[] = []
  
  if (!data.field) {
    errors.push('Field is required')
  }
  
  if (data.field && !regex.test(data.field)) {
    errors.push('Invalid format')
  }
  
  return errors
}
```

### 2. Real-Time Validation
```typescript
const [errors, setErrors] = useState<string[]>([])

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  
  // Update form data
  setFormData(prev => ({ ...prev, [name]: value }))
  
  // Clear errors when user starts typing
  if (errors.length > 0) {
    setErrors([])
  }
}
```

### 3. Server-Side Validation
All API endpoints implement server-side validation using express-validator:

```javascript
body('field').notEmpty().withMessage('Field is required'),
body('field').isEmail().withMessage('Valid email is required'),
body('field').isLength({ min: 4, max: 4 }).withMessage('Must be 4 digits')
```

## Performance Optimizations

### 1. React Query Configuration
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

### 2. Loading State Management
```typescript
// Prevent unnecessary re-renders
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  if (isLoading) return
  // Continue with logic
}, [dependencies, isLoading])
```

### 3. Data Persistence Optimization
```typescript
// Debounced updates to localStorage
const debouncedUpdate = useCallback(
  debounce((data) => {
    localStorage.setItem("signupData", JSON.stringify(data))
  }, 100),
  []
)
```

## Security Considerations

### 1. Data Validation
- Client-side validation for UX
- Server-side validation for security
- Input sanitization
- Type checking with TypeScript

### 2. Error Handling
- Generic error messages
- No sensitive data in error responses
- Proper HTTP status codes
- Consistent error format

### 3. Data Transmission
- HTTPS in production
- Secure headers
- No sensitive data in URLs
- Proper CORS configuration

## Testing Strategy

### 1. Unit Testing
```typescript
// Test custom hooks
import { renderHook, act } from '@testing-library/react'
import { useSignupData } from '@/hooks/use-signup-data'

test('should update signup data', () => {
  const { result } = renderHook(() => useSignupData())
  
  act(() => {
    result.current.updateSignupData({ test: 'data' })
  })
  
  expect(result.current.signupData.test).toBe('data')
})
```

### 2. Integration Testing
```typescript
// Test API integration
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

test('should create user successfully', async () => {
  const queryClient = new QueryClient()
  
  render(
    <QueryClientProvider client={queryClient}>
      <SignupPage />
    </QueryClientProvider>
  )
  
  // Test form submission
  fireEvent.click(screen.getByText('Submit'))
  
  await waitFor(() => {
    expect(screen.getByText('User created successfully!')).toBeInTheDocument()
  })
})
```

### 3. E2E Testing
```typescript
// Test complete flow
test('should complete signup flow', async () => {
  await page.goto('/signup/user-type')
  await page.click('[data-testid="individual"]')
  await page.click('[data-testid="continue"]')
  
  // Continue through all steps...
  
  await expect(page).toHaveURL('/login?signup=success')
})
```

## Deployment Considerations

### 1. Environment Configuration
```typescript
// Environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
```

### 2. Build Optimization
```typescript
// next.config.mjs
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@tanstack/react-query'],
  },
  images: {
    domains: ['localhost'],
  },
}
```

### 3. Monitoring and Analytics
```typescript
// Error tracking
window.addEventListener('error', (event) => {
  // Send to error tracking service
  console.error('Global error:', event.error)
})

// Performance monitoring
export function reportWebVitals(metric: any) {
  // Send to analytics service
  console.log(metric)
}
```

## Conclusion

This technical implementation provides a robust, scalable, and maintainable foundation for the individual user signup flow. The architecture follows React and Next.js best practices while ensuring excellent user experience and security.

Key strengths:
- **Modular Design**: Custom hooks for reusability
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error management
- **Performance**: Optimized loading and caching
- **Security**: Proper validation and data handling
- **Testing**: Comprehensive testing strategy
