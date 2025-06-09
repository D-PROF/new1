"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, LogOut } from "lucide-react"
import { FilterDialog } from "./filter-dialog"
import { useMobile } from "@/hooks/use-mobile"

interface SearchFilterBarProps {
  onSearch: (query: string) => void
  onFilter: (filters: FilterOptions) => void
}

export interface FilterOptions {
  trainingTypes: string[]
  installations: string[]
}

export function SearchFilterBar({ onSearch, onFilter }: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    trainingTypes: [],
    installations: [],
  })
  const router = useRouter()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const isMobile = useMobile()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  const handleFilterChange = (newFilterOptions: FilterOptions) => {
    setFilterOptions(newFilterOptions)
  }

  const applyFilters = () => {
    onFilter(filterOptions)
  }

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userRole")

    // Redirect to login page
    router.push("/login")
  }

  if (isMobile) {
    return (
      <div className="w-full space-y-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery || ""}
            onChange={handleSearch}
            className="pl-10 w-full rounded-full"
          />
        </div>

        <div className="flex space-x-2 w-full">
          <Button variant="outline" className="rounded-full flex-1" onClick={() => setIsFilterOpen(true)}>
            <Filter size={16} className="mr-2" />
            Filter
          </Button>

          <Button variant="destructive" className="rounded-full flex-1" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>

        <FilterDialog
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          onApplyFilters={applyFilters}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input
          type="text"
          placeholder="Search"
          value={searchQuery || ""}
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
        onFilterChange={handleFilterChange}
        onApplyFilters={applyFilters}
      />

      <Button variant="destructive" className="rounded-full" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}
