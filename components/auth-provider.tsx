"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  role: string
  userType: 'ceo' | 'importer' | 'field-coordinator' | 'miller'
}

interface AuthContextType {
  user: User | null
  login: (identifier: string, password: string) => Promise<boolean>
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
      const parsedUser = JSON.parse(savedUser)
      // Clear localStorage if it contains outdated user data (old names)
      if (parsedUser.name === "Jude Chesire" || parsedUser.name.includes("General")) {
        localStorage.removeItem("ksb_user")
        setUser(null)
      } else {
        setUser(parsedUser)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (identifier: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check against default credentials - support both email and phone
    const validCredential = DEFAULT_CREDENTIALS.find(cred => 
      (cred.email === identifier || cred.phone === identifier) && cred.password === password
    )

    if (validCredential) {
      setUser(validCredential.user)
      localStorage.setItem("ksb_user", JSON.stringify(validCredential.user))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ksb_user")
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
