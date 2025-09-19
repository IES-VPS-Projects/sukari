"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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
  }
  entityData?: {
    id: string
    userType: string
    designation: string
    phoneNumber: string
    email?: string
  }
  token?: string
  userType: 'ceo' | 'importer' | 'field-coordinator' | 'miller'
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem("ksb_user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        // Check if the user data has the new structure (with iprsData)
        if (parsedUser.iprsData && parsedUser.entityData) {
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
      // Make API call to backend
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: identifier,
          pin: pin
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Create user object from API response
        const userData = {
          id: data.data.user.id,
          email: data.data.user.email,
          name: `${data.data.user.iprs.first_name} ${data.data.user.iprs.middle_name || ''} ${data.data.user.iprs.last_name}`.trim(),
          role: data.data.user.role,
          iprsData: data.data.user.iprs,
          entityData: data.data.user.entity,
          token: data.data.token
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
    } catch (error) {
      console.error('Login error:', error);
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

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
