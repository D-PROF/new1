"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Users, FileText, Settings } from "lucide-react"
import { FilterDialog } from "@/components/filter-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FilterOptions } from "@/components/search-filter-bar"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"

export default function SuperAdminDashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    trainingTypes: [],
    installations: [],
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    // Check if user has superadmin role
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "superadmin") {
      router.push("/role-selection")
    }
  }, [router])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    // Implement search functionality here
    console.log("Searching for:", query)
  }

  const applyFilters = () => {
    // Implement filter functionality here
    console.log("Applying filters:", filterOptions)
  }

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userRole")
    // Redirect to login page
    router.push("/login")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole="superadmin" />

      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <DashboardHeader userName="Super Admin" userEmail="superadmin@wordsanctuary.org" />

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 w-64 rounded-full"
                />
              </div>

              <Button variant="outline" className="rounded-full" onClick={() => setIsFilterOpen(true)}>
                <Filter size={16} />
                <span className="ml-2">Filter</span>
              </Button>

              <FilterDialog
                open={isFilterOpen}
                onOpenChange={setIsFilterOpen}
                filterOptions={filterOptions}
                onFilterChange={setFilterOptions}
                onApplyFilters={applyFilters}
              />
            </div>
          </div>

          <div className="bg-indigo-500 text-white rounded-xl p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl mb-2">Welcome, Super Admin</p>
                <h2 className="text-3xl font-bold">System Overview</h2>
              </div>
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Dashboard illustration"
                width={300}
                height={200}
                className="hidden md:block"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-indigo-700">1,250</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Installations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-indigo-700">20</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <Users className="mr-2 text-indigo-600" />
                <h3 className="text-lg font-semibold">Trainee Management</h3>
              </div>
              <p className="text-gray-500 mb-4">Manage all trainees across installations</p>
              <Link href="/trainees">
                <Button className="w-full">View Trainee List</Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <FileText className="mr-2 text-indigo-600" />
                <h3 className="text-lg font-semibold">Appraisal Templates</h3>
              </div>
              <p className="text-gray-500 mb-4">Create and manage appraisal templates</p>
              <Button className="w-full">Manage Templates</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <Settings className="mr-2 text-indigo-600" />
                <h3 className="text-lg font-semibold">System Settings</h3>
              </div>
              <p className="text-gray-500 mb-4">Configure system-wide settings</p>
              <Link href="/settings">
                <Button className="w-full">System Settings</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
