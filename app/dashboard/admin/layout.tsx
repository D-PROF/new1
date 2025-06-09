import type { ReactNode } from "react"
import { RoleGuard } from "@/components/role-guard"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={["admin"]}>{children}</RoleGuard>
}
