"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Settings, Star, ChevronDown, LayoutDashboard, FileText, Users, Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarProps {
  userRole: string
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const [isAppraisalOpen, setIsAppraisalOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useMobile()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const sidebarContent = (
    <div className="space-y-4">
      {userRole === "admin" && (
        <Link
          href="/dashboard/admin"
          className={cn(
            "flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100",
            pathname === "/dashboard/admin" && "bg-indigo-50 text-indigo-600",
          )}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
      )}

      {userRole === "leadership" && (
        <Link
          href="/dashboard/leadership"
          className={cn(
            "flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100",
            pathname === "/dashboard/leadership" && "bg-indigo-50 text-indigo-600",
          )}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
      )}

      {userRole === "superadmin" && (
        <Link
          href="/dashboard/superadmin"
          className={cn(
            "flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100",
            pathname === "/dashboard/superadmin" && "bg-indigo-50 text-indigo-600",
          )}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
      )}

      <div>
        <button
          onClick={() => setIsAppraisalOpen(!isAppraisalOpen)}
          className={cn(
            "flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100",
            pathname.includes("/appraisal") && "bg-indigo-50 text-indigo-600",
          )}
        >
          <div className="flex items-center space-x-2">
            <FileText size={20} />
            <span>My Appraisal</span>
          </div>
          <ChevronDown size={16} className={cn("transition-transform", isAppraisalOpen && "transform rotate-180")} />
        </button>

        {isAppraisalOpen && (
          <div className="ml-6 mt-2 space-y-2">
            <Link
              href="/appraisal/mentor"
              className={cn(
                "block p-2 rounded-md hover:bg-gray-100",
                pathname === "/appraisal/mentor" && "text-indigo-600",
              )}
            >
              Mentor Appraisal
            </Link>
            <Link
              href="/appraisal/hoi"
              className={cn(
                "block p-2 rounded-md hover:bg-gray-100",
                pathname === "/appraisal/hoi" && "text-indigo-600",
              )}
            >
              HOI Appraisal
            </Link>
            <Link
              href="/appraisal/central"
              className={cn(
                "block p-2 rounded-md hover:bg-gray-100",
                pathname === "/appraisal/central" && "text-indigo-600",
              )}
            >
              Central Appraisal
            </Link>
            <Link
              href="/appraisal/department"
              className={cn(
                "block p-2 rounded-md hover:bg-gray-100",
                pathname === "/appraisal/department" && "text-indigo-600",
              )}
            >
              Department Appraisal
            </Link>
          </div>
        )}
      </div>

      {userRole === "superadmin" && (
        <Link
          href="/trainees"
          className={cn(
            "flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100",
            pathname === "/trainees" && "bg-indigo-50 text-indigo-600",
          )}
        >
          <Users size={20} />
          <span>Trainee List</span>
        </Link>
      )}

      {userRole === "admin" && (
        <Link
          href="/role-assignment"
          className={cn(
            "flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100",
            pathname === "/role-assignment" && "bg-indigo-50 text-indigo-600",
          )}
        >
          <Users size={20} />
          <span>Role Assignment</span>
        </Link>
      )}

      {userRole === "admin" && (
        <Link
          href="/trainees"
          className={cn(
            "flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100",
            pathname === "/trainees" && "bg-indigo-50 text-indigo-600",
          )}
        >
          <Users size={20} />
          <span>Trainee List</span>
        </Link>
      )}

      {userRole !== "leadership" && userRole !== "superadmin" && (
        <Link
          href="/assessments"
          className={cn(
            "flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100",
            pathname === "/assessments" && "bg-indigo-50 text-indigo-600",
          )}
        >
          <Star size={20} />
          <span>Assessments</span>
        </Link>
      )}

      {userRole === "admin" && (
        <Link
          href="/results"
          className={cn(
            "flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100",
            pathname === "/results" && "bg-indigo-50 text-indigo-600",
          )}
        >
          <FileText size={20} />
          <span>Results</span>
        </Link>
      )}

      <Link
        href="/settings"
        className={cn(
          "flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100",
          pathname === "/settings" && "bg-indigo-50 text-indigo-600",
        )}
      >
        <Settings size={20} />
        <span>Settings</span>
      </Link>
    </div>
  )

  // Mobile sidebar with overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile menu button */}
        <button onClick={toggleMobileMenu} className="fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile sidebar */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />

            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-64 bg-white z-50 overflow-y-auto shadow-lg transition-transform duration-300 ease-in-out">
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Word Sanctuary</h2>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
                {sidebarContent}
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  // Desktop sidebar
  return (
    <div className="w-64 bg-white border-r h-screen overflow-y-auto">
      <div className="p-4">{sidebarContent}</div>
    </div>
  )
}
