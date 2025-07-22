"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { PortalLayout } from "@/components/portal-layout"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PortalLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <PortalLayout>{children}</PortalLayout>
}
