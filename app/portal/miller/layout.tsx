"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function MillerLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('user', user,user?.role);
    if (!isLoading && !user) {
      router.push("/login")
      
    } else if (!isLoading && user && user.role !== "miller" && user.role !== "COMPANY" && user.role !== "USER" && user.role === "KSB_COMPLIANCE") {
      // Redirect to appropriate portal based on user type
      if (user.userType === "ceo" || user.role === "KSB_COMPLIANCE") {
        router.push("/portal/ceo")
      } else if (user.userType === "importer") {
        router.push("/portal/importer")
      } else if (user.userType === "field-coordinator") {
        router.push("/portal/field-coordinator")
      } else {
        router.push("/portal")
      } 
      console.log('user', user,user.role);
      
    }
    else{
      console.log('====================================');
      console.log("others");
      console.log('====================================');
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  // if (!user || user.userType !== "miller" ||  user.role !== "COMPANY" && user.role !== "USER") {
  //   return null
  // }

  return <>{children}</>
}