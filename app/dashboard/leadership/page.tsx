"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { FilterDialog } from "@/components/filter-dialog"
import type { FilterOptions } from "@/components/search-filter-bar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function LeadershipDashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    trainingTypes: [],
    installations: [],
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    // Check if user has leadership role
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "leadership") {
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
      <Sidebar userRole="leadership" />

      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <DashboardHeader userName="Pastor Temple Omolehin" userEmail="temple@wordsanctuary.org" />

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Appraisal Dashboard</h1>

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
                <p className="text-xl mb-2">Happy are you Sir</p>
                <h2 className="text-3xl font-bold">Get Started with Appraisals</h2>
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

          {/* Dashboard content would go here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Recent Appraisals</h3>
              <p className="text-gray-500">No recent appraisals found.</p>
              <Button className="mt-4 w-full">View All Appraisals</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Upcoming Assessments</h3>
              <p className="text-gray-500">No upcoming assessments found.</p>
              <Button className="mt-4 w-full">View All Assessments</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Start New Appraisal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View My Results
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Update Profile
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
