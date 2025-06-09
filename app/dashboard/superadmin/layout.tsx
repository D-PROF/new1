import type { ReactNode } from "react"
import { RoleGuard } from "@/components/role-guard"

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={["superadmin"]}>{children}</RoleGuard>
}
