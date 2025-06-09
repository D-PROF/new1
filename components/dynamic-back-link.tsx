"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export function DynamicBackLink() {
  const [dashboardLink, setDashboardLink] = useState("/dashboard/leadership")
  const isMobile = useMobile()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole === "admin") {
      setDashboardLink("/dashboard/admin")
    } else if (userRole === "superadmin") {
      setDashboardLink("/dashboard/superadmin")
    } else {
      setDashboardLink("/dashboard/leadership")
    }
  }, [])

  const linkClasses = isMobile
    ? "absolute top-4 left-16 bg-white rounded-full p-2 shadow-md z-30"
    : "absolute top-4 left-4 bg-white rounded-full p-2 shadow-md"

  return (
    <Link href={dashboardLink} className={linkClasses}>
      <ChevronLeft size={24} />
    </Link>
  )
}
