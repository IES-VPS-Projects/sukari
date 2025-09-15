"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function PortalPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login")
      } else if (user.userType === "ceo" && pathname === "/portal") {
        router.push("/portal/ceo")
      } else if (user.userType === "importer" && pathname === "/portal") {
        router.push("/portal/importer")
      } else if (user.userType === "field-coordinator" && pathname === "/portal") {
        router.push("/portal/field-coordinator")
      } else if (user.userType === "miller" && pathname === "/portal") {
        router.push("/portal/miller")
      }
    }
  }, [user, isLoading, router, pathname])

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return null
}
