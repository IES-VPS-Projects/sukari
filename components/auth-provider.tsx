"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { apiService } from "@/lib/axios-service"

interface ApiResponse {
  success: boolean
  data: {
    user: {
      id: string
      email: string
      role: string
      iprs?: {
        id: string
        id_no: string
        first_name: string
        middle_name?: string
        last_name: string
        gender: string
        date_of_birth: string
        nationality: string
      } | null
      entity?: {
        id: string
        userType: string
        designation: string
        phoneNumber: string
        email?: string
      } | null
    }
    token: string
  }
  message?: string
  error?: string
}

interface User {
  id: string
  email: string
  name: string
  role: string
  iprsData?: {
    id: string
    id_no: string
    first_name: string
    middle_name?: string
    last_name: string
    gender: string
    date_of_birth: string
    nationality: string
  } | null
  entityData?: {
    id: string
    userType: string
    designation: string
    phoneNumber: string
    email?: string
  } | null
  token?: string
  userType: 'ceo' | 'importer' | 'field-coordinator' | 'miller' | 'COMPANY' | 'COMPANY-ADMIN' | 'USER' | 'ADMIN'
}

interface AuthContextType {
  user: User | null
  login: (identifier: string, pin: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Default credentials for demo
const DEFAULT_CREDENTIALS = [
  {
    email: "executive@ksb.go.ke",
    phone: "0700111123",
    password: "KSB2024!",
    user: {
      id: "1",
      email: "executive@ksb.go.ke",
      name: "Gerald Bosire",
      role: "Chief Executive",
      userType: "ceo" as const,
    },
  },
  {
    email: "importer@ksb.go.ke",
    phone: "0700222234",
    password: "Import2024!",
    user: {
      id: "3",
      email: "importer@ksb.go.ke",
      name: "Bernard Kasavuli",
      role: "Sugar Importer",
      userType: "importer" as const,
    },
  },
  {
    email: "admin@ksb.go.ke", 
    phone: "0712345678",
    password: "Admin123!",
    user: {
      id: "2",
      email: "admin@ksb.go.ke",
      name: "John Doe",
      role: "Administrator",
      userType: "ceo" as const,
    },
  },
  {
    email: "fieldcoord@ksb.go.ke", 
    phone: "0733444555",
    password: "Field2024!",
    user: {
      id: "4",
      email: "fieldcoord@ksb.go.ke",
      name: "Bernice Kasavuli",
      role: "Field Coordinator",
      userType: "field-coordinator" as const,
    },
  },
  {
    email: "miller@ksb.go.ke", 
    phone: "0700333456",
    password: "Miller2024!",
    user: {
      id: "5",
      email: "miller@ksb.go.ke",
      name: "James Mwangi",
      role: "Sugar Miller",
      userType: "miller" as const,
    },
  },
]

interface AuthProviderProps {
  readonly children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem("ksb_user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        // Check if the user data has the required fields (id, email, name, role, userType)
        if (parsedUser.id && parsedUser.email && parsedUser.name && parsedUser.role && parsedUser.userType) {
          setUser(parsedUser)
        } else {
          // Clear old user data structure
          localStorage.removeItem("ksb_user")
          localStorage.removeItem("ksb_token")
          setUser(null)
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem("ksb_user")
        localStorage.removeItem("ksb_token")
        setUser(null)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (identifier: string, pin: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Make API call to backend using axios
      const response = await apiService.post('/api/auth/login', {
        email: identifier,
        pin: pin
      });
      
      const data = response as ApiResponse;

      if (data.success) {
        // Create user object from API response
        const user = data.data.user;
        
        // Generate name based on available data
        let name = user.email; // fallback to email
        if (user.iprs) {
          name = `${user.iprs.first_name} ${user.iprs.middle_name || ''} ${user.iprs.last_name}`.trim();
        } else if (user.entity?.designation) {
          name = user.entity.designation;
        }

        // Determine user type based on role and entity
        let userType: User['userType'] = 'USER';
        if (user.role === 'ADMIN') {
          userType = 'ADMIN';
        } else if (user.entity?.userType === 'COMPANY') {
          userType = user.role === 'ADMIN' ? 'COMPANY-ADMIN' : 'COMPANY';
        }

        const userData: User = {
          id: user.id,
          email: user.email,
          name: name,
          role: user.role,
          iprsData: user.iprs,
          entityData: user.entity,
          token: data.data.token,
          userType: userType
        };

        setUser(userData);
        localStorage.setItem("ksb_user", JSON.stringify(userData));
        localStorage.setItem("ksb_token", data.data.token);
        setIsLoading(false);
        return true;
      } else {
        // Handle API error
        console.error('Login failed:', data.error || data.message);
        setIsLoading(false);
        return false;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      // Handle axios error structure
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message || 
                          'Login failed';
      console.error('Login failed:', errorMessage);
      setIsLoading(false);
      return false;
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ksb_user")
    localStorage.removeItem("ksb_token")
    router.push("/login")
  }

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    isLoading
  }), [user, isLoading])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
