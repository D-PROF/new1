"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { FilterOptions } from "./search-filter-bar"

interface FilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filterOptions: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  onApplyFilters: () => void
}

export function FilterDialog({ open, onOpenChange, filterOptions, onFilterChange, onApplyFilters }: FilterDialogProps) {
  const [localFilterOptions, setLocalFilterOptions] = useState<FilterOptions>(filterOptions)

  // Update local state when props change
  useEffect(() => {
    setLocalFilterOptions(filterOptions)
  }, [filterOptions])

  const handleFilterChange = (category: keyof FilterOptions, value: string) => {
    setLocalFilterOptions((prev) => {
      const currentValues = [...prev[category]]
      const index = currentValues.indexOf(value)

      if (index === -1) {
        currentValues.push(value)
      } else {
        currentValues.splice(index, 1)
      }

      return {
        ...prev,
        [category]: currentValues,
      }
    })
  }

  const handleApply = () => {
    onFilterChange(localFilterOptions)
    onApplyFilters()
  }

  const installations = [
    "Offa Garage",
    "Kwasu",
    "Unilorin",
    "Tanke",
    "FUTA",
    "Lagos",
    "Global",
    "FUOYE",
    "COHS",
    "Kwarapoly",
    "Zaria",
    "Ibadan",
    "Abuja",
    "Elizade",
    "Gospel Empire",
    "Unijos",
    "Uniabuja",
    "Unilag",
    "Lekki",
    "USA",
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Training Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {["Executive Assistant", "Assistant HOD", "HOD", "Minister", "Pastor"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`training-${type}`}
                    checked={localFilterOptions.trainingTypes.includes(type)}
                    onCheckedChange={() => handleFilterChange("trainingTypes", type)}
                  />
                  <Label htmlFor={`training-${type}`} className="text-xs">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Installation</h3>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {installations.map((installation) => (
                <div key={installation} className="flex items-center space-x-2">
                  <Checkbox
                    id={`installation-${installation}`}
                    checked={localFilterOptions.installations.includes(installation)}
                    onCheckedChange={() => handleFilterChange("installations", installation)}
                  />
                  <Label htmlFor={`installation-${installation}`} className="text-xs">
                    {installation}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleApply}>Apply Filters</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
