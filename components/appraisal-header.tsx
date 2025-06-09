"use client"

import Image from "next/image"
import { DynamicBackLink } from "@/components/dynamic-back-link"
import { SearchFilterBar } from "@/components/search-filter-bar"
import type { FilterOptions } from "./search-filter-bar"
import { useMobile } from "@/hooks/use-mobile"

interface AppraisalHeaderProps {
  title: string
  userName: string
  onSearch: (query: string) => void
  onFilter: (filters: FilterOptions) => void
}

export function AppraisalHeader({ title, userName, onSearch, onFilter }: AppraisalHeaderProps) {
  const isMobile = useMobile()

  return (
    <header className="bg-white shadow-sm">
      <div className="relative h-32 md:h-48 w-full overflow-hidden">
        <Image
          src="/images/header-banner.png"
          alt="Word Sanctuary Appraisal Header"
          width={1200}
          height={400}
          className="w-full object-cover"
          priority
        />
        <DynamicBackLink />
      </div>

      <div
        className={`px-4 md:px-6 py-4 ${isMobile ? "flex flex-col space-y-4" : "flex items-center justify-between"}`}
      >
        <div className="flex items-center space-x-4">
          <Image
            src="/images/word-sanctuary-logo-black.png"
            alt="Word Sanctuary Logo"
            width={80}
            height={40}
            className="h-8 md:h-10 w-auto"
          />
          <div>
            <h1 className="text-lg md:text-xl font-bold">{title}</h1>
            <p className="text-xs md:text-sm text-gray-600">Name: {userName}</p>
          </div>
        </div>

        <SearchFilterBar onSearch={onSearch} onFilter={onFilter} />
      </div>
    </header>
  )
}
