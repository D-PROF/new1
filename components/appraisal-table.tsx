"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, CheckCircle } from "lucide-react"
import type { FilterOptions } from "./search-filter-bar"
import { AppraisalFormDialog } from "./appraisal-form-dialog"
import { TraineeDetailDialog } from "./trainee-detail-dialog"
import { EditTraineeDialog } from "./edit-trainee-dialog"
import { useMobile } from "@/hooks/use-mobile"
import { useToast } from "@/components/ui/use-toast"
import { getRelativeTime } from "@/utils/time-utils"

export interface AppraisalItem {
  id: string
  name: string
  trainingType: string
  installation: string
}

interface AppraisalTableProps {
  items: AppraisalItem[]
  searchQuery: string
  filterOptions: FilterOptions
  appraisalType?: "mentor" | "hoi" | "central" | "department"
}

interface FormStatus {
  status: "completed" | "pending"
  completedAt?: string
  lastModified?: string
}

export function AppraisalTable({ items, searchQuery, filterOptions, appraisalType = "mentor" }: AppraisalTableProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<AppraisalItem | null>(null)
  const [formMode, setFormMode] = useState<"create" | "view" | "edit">("create")
  const [formStatuses, setFormStatuses] = useState<Record<string, FormStatus>>({})
  const isMobile = useMobile()
  const { toast } = useToast()

  // Load form statuses from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const statuses: Record<string, FormStatus> = {}
      items.forEach((item) => {
        const formId = `${item.name}_${item.id}`
        const statusData = localStorage.getItem(`${appraisalType}_status_${formId}`)
        if (statusData) {
          statuses[item.id] = JSON.parse(statusData)
        } else {
          statuses[item.id] = { status: "pending" }
        }
      })
      setFormStatuses(statuses)
    }
  }, [items, appraisalType])

  // Update statuses periodically to refresh relative times
  useEffect(() => {
    const interval = setInterval(() => {
      setFormStatuses((prev) => ({ ...prev }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Filter items based on search query and filter options
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.trainingType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.installation.toLowerCase().includes(searchQuery.toLowerCase())

      // Training type filter
      const matchesTrainingType =
        filterOptions.trainingTypes.length === 0 || filterOptions.trainingTypes.includes(item.trainingType)

      // Installation filter
      const matchesInstallation =
        filterOptions.installations.length === 0 || filterOptions.installations.includes(item.installation)

      return matchesSearch && matchesTrainingType && matchesInstallation
    })
  }, [items, searchQuery, filterOptions])

  const handleRadioChange = (id: string) => {
    setSelectedItem(id)
  }

  const handleEdit = (item: AppraisalItem) => {
    setCurrentItem(item)
    setEditOpen(true)
  }

  const handleView = (item: AppraisalItem) => {
    // Convert AppraisalItem to Trainee format for the detail dialog
    const traineeData = {
      id: item.id,
      name: item.name,
      email: "wordsanctuary@gmail.com", // Default email
      progress: Math.floor(Math.random() * 100), // Random progress for demo
      installation: item.installation,
      phoneNumber: "+2348132286990", // Default phone
      department: "Power and Sound", // Default department
      trainingType: item.trainingType,
    }
    setCurrentItem(traineeData as any)
    setDetailOpen(true)
  }

  const handleAppraisalForm = (item: AppraisalItem, mode: "create" | "view" | "edit" = "create") => {
    setCurrentItem(item)
    setFormMode(mode)
    setFormOpen(true)
  }

  const handleSaveEdit = (updatedItem: any) => {
    toast({
      title: "Item updated",
      description: "The trainee information has been updated successfully",
    })
  }

  const handleFormClose = () => {
    setFormOpen(false)
    // Refresh form statuses after form is closed
    if (typeof window !== "undefined") {
      const statuses: Record<string, FormStatus> = {}
      items.forEach((item) => {
        const formId = `${item.name}_${item.id}`
        const statusData = localStorage.getItem(`${appraisalType}_status_${formId}`)
        if (statusData) {
          statuses[item.id] = JSON.parse(statusData)
        } else {
          statuses[item.id] = { status: "pending" }
        }
      })
      setFormStatuses(statuses)
    }
  }

  const getFormId = (item: AppraisalItem) => {
    return `${item.name}_${item.id}`
  }

  const getStatusBadge = (status: FormStatus) => {
    if (status.status === "completed") {
      return (
        <div className="flex items-center space-x-1">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Completed
          </Badge>
        </div>
      )
    }
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-700">
        Pending
      </Badge>
    )
  }

  const getTimeDisplay = (status: FormStatus) => {
    if (status.status === "completed" && status.lastModified) {
      return <div className="text-xs text-gray-500">{getRelativeTime(status.lastModified)}</div>
    }
    return null
  }

  // Mobile card view
  if (isMobile) {
    return (
      <>
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const status = formStatuses[item.id] || { status: "pending" }
              return (
                <div key={item.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center mb-3">
                    <input
                      type="radio"
                      className="mr-3"
                      checked={selectedItem === item.id}
                      onChange={() => handleRadioChange(item.id)}
                      value={item.id}
                    />
                    <div className="font-medium flex-1">{item.name}</div>
                    {getStatusBadge(status)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                      <span className="text-gray-500">Training Type:</span>
                      <div>{item.trainingType}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Installation:</span>
                      <div>{item.installation}</div>
                    </div>
                  </div>

                  {getTimeDisplay(status)}

                  <div className="space-y-2 mt-3">
                    {status.status === "completed" ? (
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="default"
                          className="bg-blue-600 text-white rounded-md"
                          onClick={() => handleAppraisalForm(item, "view")}
                        >
                          Interview Form
                        </Button>
                        <Button
                          variant="default"
                          className="bg-green-600 text-white rounded-md"
                          onClick={() => handleAppraisalForm(item, "edit")}
                        >
                          Edit Interview Form
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="default"
                        className="bg-black text-white rounded-md w-full"
                        onClick={() => handleAppraisalForm(item, "create")}
                      >
                        Appraisal Form
                      </Button>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-lg shadow p-4 text-center text-gray-500">No results found</div>
          )}
        </div>

        <AppraisalFormDialog
          open={formOpen}
          onOpenChange={handleFormClose}
          formType={appraisalType}
          traineeName={currentItem?.name}
          mode={formMode}
          formId={currentItem ? getFormId(currentItem) : undefined}
        />

        <TraineeDetailDialog open={detailOpen} onOpenChange={setDetailOpen} trainee={currentItem as any} />

        <EditTraineeDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          trainee={currentItem as any}
          onSave={handleSaveEdit}
        />
      </>
    )
  }

  // Desktop table view
  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    <ChevronLeft className="transform rotate-90" size={16} />
                  </div>
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Training Type</span>
                    <ChevronLeft className="transform rotate-90" size={16} />
                  </div>
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Installation</span>
                    <ChevronLeft className="transform rotate-90" size={16} />
                  </div>
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ChevronLeft className="transform rotate-90" size={16} />
                  </div>
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const status = formStatuses[item.id] || { status: "pending" }
                  return (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            className="mr-3"
                            checked={selectedItem === item.id}
                            onChange={() => handleRadioChange(item.id)}
                            value={item.id}
                          />
                          <div>{item.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.trainingType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.installation}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {getStatusBadge(status)}
                          {getTimeDisplay(status)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {status.status === "completed" ? (
                            <>
                              <Button
                                variant="default"
                                className="bg-blue-600 text-white rounded-md"
                                onClick={() => handleAppraisalForm(item, "view")}
                              >
                                Interview Form
                              </Button>
                              <Button
                                variant="default"
                                className="bg-green-600 text-white rounded-md"
                                onClick={() => handleAppraisalForm(item, "edit")}
                              >
                                Edit Interview Form
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="default"
                              className="bg-black text-white rounded-md"
                              onClick={() => handleAppraisalForm(item, "create")}
                            >
                              Appraisal Form
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AppraisalFormDialog
        open={formOpen}
        onOpenChange={handleFormClose}
        formType={appraisalType}
        traineeName={currentItem?.name}
        mode={formMode}
        formId={currentItem ? getFormId(currentItem) : undefined}
      />

      <TraineeDetailDialog open={detailOpen} onOpenChange={setDetailOpen} trainee={currentItem as any} />

      <EditTraineeDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        trainee={currentItem as any}
        onSave={handleSaveEdit}
      />
    </>
  )
}
