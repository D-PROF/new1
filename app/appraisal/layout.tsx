import type { ReactNode } from "react"
import { RoleGuard } from "@/components/role-guard"

export default function AppraisalLayout({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={["leadership", "admin", "superadmin"]}>{children}</RoleGuard>
}
