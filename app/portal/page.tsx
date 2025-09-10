"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PortalPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login")
      } else if (user.userType === "ceo") {
        router.push("/portal/ceo")
      } else if (user.userType === "importer") {
        router.push("/portal/importer")
      }
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return null
}
