import type { ReactNode } from "react"
import { RoleGuard } from "@/components/role-guard"

export default function LeadershipLayout({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={["leadership"]}>{children}</RoleGuard>
}
