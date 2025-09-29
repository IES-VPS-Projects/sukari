"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CEOPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the operations page since that's now the default operations/profile page
    router.replace("/portal/ceo/operations")
  }, [router])

  return <>oage</>
}
