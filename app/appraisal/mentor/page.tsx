"use client"

import { useState, useEffect } from "react"
import { AppraisalHeader } from "@/components/appraisal-header"
import { AppraisalTable, type AppraisalItem } from "@/components/appraisal-table"
import type { FilterOptions } from "@/components/search-filter-bar"

// Sample data with new installations
const mentorAppraisalItems: AppraisalItem[] = [
  {
    id: "1",
    name: "Word Sanctuary",
    trainingType: "Executive Assistant",
    installation: "Offa Garage",
  },
  {
    id: "2",
    name: "Word Sanctuary",
    trainingType: "Assistant HOD",
    installation: "Kwasu",
  },
  {
    id: "3",
    name: "Word Sanctuary",
    trainingType: "HOD",
    installation: "Unilorin",
  },
  {
    id: "4",
    name: "Word Sanctuary",
    trainingType: "Minister",
    installation: "Tanke",
  },
  {
    id: "5",
    name: "Word Sanctuary",
    trainingType: "Pastor",
    installation: "FUTA",
  },
  {
    id: "6",
    name: "Word Sanctuary",
    trainingType: "Executive Assistant",
    installation: "Lagos",
  },
  {
    id: "7",
    name: "Word Sanctuary",
    trainingType: "HOD",
    installation: "Global",
  },
  {
    id: "8",
    name: "Word Sanctuary",
    trainingType: "Assistant HOD",
    installation: "FUOYE",
  },
  {
    id: "9",
    name: "Word Sanctuary",
    trainingType: "Minister",
    installation: "COHS",
  },
  {
    id: "10",
    name: "Word Sanctuary",
    trainingType: "Pastor",
    installation: "Kwarapoly",
  },
]

export default function MentorAppraisalPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    trainingTypes: [],
    installations: [],
  })
  const [userName, setUserName] = useState("Pastor Temple Omolehin")
  const [userRole, setUserRole] = useState("leadership")

  useEffect(() => {
    // Get user role from localStorage
    const storedUserRole = localStorage.getItem("userRole")
    if (storedUserRole) {
      setUserRole(storedUserRole)
    }

    // In a real app, you would fetch the user's name from an API or context
    // For now, we'll just set a different name based on the role
    if (storedUserRole === "admin") {
      setUserName("Admin User")
    } else if (storedUserRole === "superadmin") {
      setUserName("Super Admin User")
    }
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilter = (filters: FilterOptions) => {
    setFilterOptions(filters)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppraisalHeader
        title="Mentor Appraisal List"
        userName={userName}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />

      <main className="container mx-auto py-6 px-4">
        <AppraisalTable
          items={mentorAppraisalItems}
          searchQuery={searchQuery}
          filterOptions={filterOptions}
          appraisalType="mentor"
        />
      </main>
    </div>
  )
}
