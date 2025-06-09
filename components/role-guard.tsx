"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: string[]
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")

    if (!userRole || !allowedRoles.includes(userRole)) {
      router.push("/role-selection")
    }
  }, [router, allowedRoles])

  return <>{children}</>
}
