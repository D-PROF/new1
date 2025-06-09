"use client"

import type React from "react"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, ChevronUp, ChevronDown } from "lucide-react"
import { RoleGuard } from "@/components/role-guard"
import { useMobile } from "@/hooks/use-mobile"
import { TraineeDetailDialog } from "@/components/trainee-detail-dialog"
import { TraineeAppraisalViewDialog } from "@/components/trainee-appraisal-view-dialog"
import { AppraisalReportDialog } from "@/components/appraisal-report-dialog"
import { EditTraineeDialog } from "@/components/edit-trainee-dialog"
import { RecommendationDialog } from "@/components/recommendation-dialog"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, XCircle } from "lucide-react"

interface Trainee {
  id: string
  name: string
  email: string
  progress: number
  installation: string
  phoneNumber: string
  department: string
  trainingType: string
  status?: "pending" | "approved" | "denied"
}

export default function TraineesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<keyof Trainee>("installation")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [appraisalViewDialogOpen, setAppraisalViewDialogOpen] = useState(false)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [recommendationDialogOpen, setRecommendationDialogOpen] = useState(false)
  const [userRole, setUserRole] = useState<string>("")
  const [trainees, setTrainees] = useState<Trainee[]>([
    {
      id: "1",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 75,
      installation: "Offa Garage",
      phoneNumber: "+2348132286990",
      department: "Power and Sound",
      trainingType: "Executive Assistant",
      status: "pending",
    },
    {
      id: "2",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 50,
      installation: "Kwasu",
      phoneNumber: "+2348132286990",
      department: "Choir",
      trainingType: "Assistant HOD",
      status: "approved",
    },
    {
      id: "3",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 25,
      installation: "Unilorin",
      phoneNumber: "+2348132286990",
      department: "Ushering",
      trainingType: "HOD",
      status: "pending",
    },
    {
      id: "4",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 25,
      installation: "Tanke",
      phoneNumber: "+2348132286990",
      department: "Finance",
      trainingType: "Executive Assistant",
      status: "denied",
    },
    {
      id: "5",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 40,
      installation: "FUTA",
      phoneNumber: "+2348132286990",
      department: "Media",
      trainingType: "HOD",
      status: "pending",
    },
    {
      id: "6",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 60,
      installation: "Lagos",
      phoneNumber: "+2348132286990",
      department: "SID",
      trainingType: "Executive Assistant",
      status: "approved",
    },
    {
      id: "7",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 80,
      installation: "Global",
      phoneNumber: "+2348132286990",
      department: "Power and Sound",
      trainingType: "Minister",
      status: "approved",
    },
    {
      id: "8",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 30,
      installation: "FUOYE",
      phoneNumber: "+2348132286990",
      department: "Choir",
      trainingType: "Assistant HOD",
      status: "pending",
    },
    {
      id: "9",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 65,
      installation: "COHS",
      phoneNumber: "+2348132286990",
      department: "Ushering",
      trainingType: "Minister",
      status: "approved",
    },
    {
      id: "10",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 90,
      installation: "Kwarapoly",
      phoneNumber: "+2348132286990",
      department: "Finance",
      trainingType: "Pastor",
      status: "approved",
    },
    {
      id: "11",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 45,
      installation: "Zaria",
      phoneNumber: "+2348132286990",
      department: "Media",
      trainingType: "Executive Assistant",
      status: "pending",
    },
    {
      id: "12",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 70,
      installation: "Ibadan",
      phoneNumber: "+2348132286990",
      department: "SID",
      trainingType: "Assistant HOD",
      status: "approved",
    },
    {
      id: "13",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 55,
      installation: "Abuja",
      phoneNumber: "+2348132286990",
      department: "Power and Sound",
      trainingType: "HOD",
      status: "pending",
    },
    {
      id: "14",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 85,
      installation: "Elizade",
      phoneNumber: "+2348132286990",
      department: "Choir",
      trainingType: "Minister",
      status: "approved",
    },
    {
      id: "15",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 35,
      installation: "Gospel Empire",
      phoneNumber: "+2348132286990",
      department: "Ushering",
      trainingType: "Executive Assistant",
      status: "denied",
    },
    {
      id: "16",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 95,
      installation: "Unijos",
      phoneNumber: "+2348132286990",
      department: "Finance",
      trainingType: "Pastor",
      status: "approved",
    },
    {
      id: "17",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 20,
      installation: "Uniabuja",
      phoneNumber: "+2348132286990",
      department: "Media",
      trainingType: "Assistant HOD",
      status: "denied",
    },
    {
      id: "18",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 75,
      installation: "Unilag",
      phoneNumber: "+2348132286990",
      department: "SID",
      trainingType: "HOD",
      status: "approved",
    },
    {
      id: "19",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 60,
      installation: "Lekki",
      phoneNumber: "+2348132286990",
      department: "Power and Sound",
      trainingType: "Minister",
      status: "pending",
    },
    {
      id: "20",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 100,
      installation: "USA",
      phoneNumber: "+2348132286990",
      department: "Choir",
      trainingType: "Pastor",
      status: "approved",
    },
  ])

  const isMobile = useMobile()
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)

  // Get user role from localStorage and set client flag
  useEffect(() => {
    setIsClient(true)
    const role = localStorage.getItem("userRole") || ""
    setUserRole(role)
  }, [])

  // Count trainees by training type
  const counts = {
    total: trainees.length,
    execAsst: trainees.filter((t) => t.trainingType === "Executive Assistant").length,
    asstHOD: trainees.filter((t) => t.trainingType === "Assistant HOD").length,
    hod: trainees.filter((t) => t.trainingType === "HOD").length,
    minister: trainees.filter((t) => t.trainingType === "Minister").length,
    pastor: trainees.filter((t) => t.trainingType === "Pastor").length,
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle sort
  const handleSort = (column: keyof Trainee) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  // Button handlers
  const handleView = (trainee: Trainee) => {
    setSelectedTrainee(trainee)
    setAppraisalViewDialogOpen(true)
  }

  const handleViewDetails = (trainee: Trainee) => {
    setSelectedTrainee(trainee)
    setDetailDialogOpen(true)
  }

  const handleAppraisalReport = (trainee: Trainee) => {
    setSelectedTrainee(trainee)
    setReportDialogOpen(true)
  }

  const handleEdit = (trainee: Trainee) => {
    setSelectedTrainee(trainee)
    setEditDialogOpen(true)
  }

  const handleRecommendation = (trainee: Trainee) => {
    setSelectedTrainee(trainee)
    setRecommendationDialogOpen(true)
  }

  const handleApprove = (trainee: Trainee) => {
    setTrainees((prev) => prev.map((t) => (t.id === trainee.id ? { ...t, status: "approved" } : t)))
    toast({
      title: "Trainee approved",
      description: `${trainee.name} has been approved successfully`,
    })
  }

  const handleDeny = (trainee: Trainee) => {
    setTrainees((prev) => prev.map((t) => (t.id === trainee.id ? { ...t, status: "denied" } : t)))
    toast({
      title: "Trainee denied",
      description: `${trainee.name} has been denied`,
      variant: "destructive",
    })
  }

  const handleSaveEdit = (updatedTrainee: Trainee) => {
    setTrainees((prev) => prev.map((t) => (t.id === updatedTrainee.id ? updatedTrainee : t)))
  }

  // Filter and sort trainees
  const filteredAndSortedTrainees = useMemo(() => {
    const filtered = trainees.filter(
      (trainee) =>
        trainee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.installation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.trainingType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.phoneNumber.includes(searchQuery),
    )

    return [...filtered].sort((a, b) => {
      const valueA = a[sortBy]
      const valueB = b[sortBy]

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA
      }

      return 0
    })
  }, [trainees, searchQuery, sortBy, sortDirection])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "denied":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved by SuperAdmin"
      case "denied":
        return "Denied by SuperAdmin"
      default:
        return "Pending SuperAdmin Review"
    }
  }

  const renderSortIndicator = (column: keyof Trainee) => {
    if (sortBy !== column) return null
    return sortDirection === "asc" ? (
      <ChevronUp className="inline h-4 w-4" />
    ) : (
      <ChevronDown className="inline h-4 w-4" />
    )
  }

  // Check if trainee has recommendation - client-side only
  const hasRecommendation = (traineeId: string) => {
    if (typeof window === "undefined") return false
    return localStorage.getItem(`recommendation_${traineeId}`) !== null
  }

  // Render action buttons based on user role
  const renderActionButtons = (trainee: Trainee) => {
    const hasRec = isClient ? hasRecommendation(trainee.id) : false

    if (userRole === "superadmin") {
      return (
        <div className="flex space-x-1">
          <Button
            variant="default"
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleView(trainee)}
          >
            View Interview Form
          </Button>
          <Button
            variant="default"
            className={`${
              hasRec ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-500 hover:bg-gray-600"
            } text-white text-xs py-1 px-2 rounded`}
            onClick={() => handleRecommendation(trainee)}
          >
            {hasRec ? "Edit Rec." : "Add Rec."}
          </Button>
          <Button
            variant="default"
            className="bg-purple-500 hover:bg-purple-600 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleAppraisalReport(trainee)}
          >
            Report
          </Button>
          <Button
            variant="default"
            className="bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleApprove(trainee)}
            disabled={trainee.status === "approved"}
          >
            Approve
          </Button>
          <Button
            variant="default"
            className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleDeny(trainee)}
            disabled={trainee.status === "denied"}
          >
            Deny
          </Button>
        </div>
      )
    } else {
      // Admin user - limited actions
      return (
        <div className="flex space-x-1">
          <Button
            variant="default"
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleView(trainee)}
          >
            View Interview Form
          </Button>
          {hasRec && (
            <Button
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded"
              onClick={() => handleRecommendation(trainee)}
            >
              View Rec.
            </Button>
          )}
          <Button
            variant="default"
            className="bg-purple-500 hover:bg-purple-600 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleEdit(trainee)}
          >
            Edit
          </Button>
          <Button
            variant="default"
            className="bg-black hover:bg-gray-800 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleAppraisalReport(trainee)}
          >
            Report
          </Button>
        </div>
      )
    }
  }

  // Render mobile action buttons based on user role
  const renderMobileActionButtons = (trainee: Trainee) => {
    const hasRec = isClient ? hasRecommendation(trainee.id) : false

    if (userRole === "superadmin") {
      return (
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="default"
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleView(trainee)}
          >
            View Interview Form
          </Button>
          <Button
            variant="default"
            className={`${
              hasRec ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-500 hover:bg-gray-600"
            } text-white text-xs py-1 px-2 rounded`}
            onClick={() => handleRecommendation(trainee)}
          >
            {hasRec ? "Edit Rec." : "Add Rec."}
          </Button>
          <Button
            variant="default"
            className="bg-black hover:bg-gray-800 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleAppraisalReport(trainee)}
          >
            Report
          </Button>
          <Button
            variant="default"
            className="bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleApprove(trainee)}
            disabled={trainee.status === "approved"}
          >
            Approve
          </Button>
        </div>
      )
    } else {
      // Admin user - limited actions
      return (
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="default"
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleView(trainee)}
          >
            View Interview Form
          </Button>
          {hasRec && (
            <Button
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded"
              onClick={() => handleRecommendation(trainee)}
            >
              View Rec.
            </Button>
          )}
          <Button
            variant="default"
            className="bg-purple-500 hover:bg-purple-600 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleEdit(trainee)}
          >
            Edit
          </Button>
          <Button
            variant="default"
            className="bg-black hover:bg-gray-800 text-white text-xs py-1 px-2 rounded"
            onClick={() => handleAppraisalReport(trainee)}
          >
            Report
          </Button>
        </div>
      )
    }
  }

  return (
    <RoleGuard allowedRoles={["superadmin", "admin"]}>
      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        <Sidebar userRole={userRole} />

        <div className="flex-1 overflow-auto pt-16 md:pt-0">
          <main className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h1 className="text-xl md:text-2xl font-bold">Trainee List</h1>
                {userRole === "admin" && <span className="text-sm text-gray-500">(View Only)</span>}
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-10 w-full md:w-64 rounded-full"
                  />
                </div>
                {userRole === "superadmin" && (
                  <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700">
                    <Plus size={16} />
                  </Button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto pb-2 mb-4">
              <div className="flex space-x-4 min-w-max border-b pb-4">
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.total}</span> Trainees
                </div>
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.execAsst}</span> Exec Asst.
                </div>
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.asstHOD}</span> Asst. HOD
                </div>
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.hod}</span> HOD
                </div>
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.minister}</span> Minister
                </div>
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.pastor}</span> Pastor
                </div>
                <div className="ml-auto flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value as keyof Trainee)}
                    className="border rounded p-1 text-sm"
                  >
                    <option value="installation">Installation</option>
                    <option value="name">Name</option>
                    <option value="trainingType">Training Type</option>
                    <option value="department">Department</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile card view */}
            {isMobile ? (
              <div className="space-y-4">
                {filteredAndSortedTrainees.map((trainee) => (
                  <div key={trainee.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-3">
                      {userRole === "superadmin" && (
                        <input type="checkbox" className="mr-2" value={trainee.id} onChange={() => {}} />
                      )}
                      <div className="flex-shrink-0 h-10 w-10 mr-3">
                        <Image
                          className="h-10 w-10 rounded-full"
                          src="/placeholder.svg?height=40&width=40"
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{trainee.name}</div>
                        <div className="text-sm text-gray-500">{trainee.email}</div>
                      </div>
                      {getStatusBadge(trainee.status || "pending")}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div>
                        <div className="text-xs text-gray-500">Installation</div>
                        <div>{trainee.installation}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Department</div>
                        <div>{trainee.department}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Training Type</div>
                        <div>{trainee.trainingType}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs text-gray-500">Status</div>
                      <div className="text-sm">{getStatusText(trainee.status || "pending")}</div>
                    </div>

                    {renderMobileActionButtons(trainee)}
                  </div>
                ))}
              </div>
            ) : (
              /* Desktop table view */
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {userRole === "superadmin" && (
                            <input type="checkbox" className="mr-2" onChange={() => {}} value="select-all" />
                          )}
                          Basic Info
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("installation")}
                        >
                          Installation {renderSortIndicator("installation")}
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("phoneNumber")}
                        >
                          Phone number {renderSortIndicator("phoneNumber")}
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("department")}
                        >
                          Department {renderSortIndicator("department")}
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("trainingType")}
                        >
                          Training type {renderSortIndicator("trainingType")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAndSortedTrainees.map((trainee) => (
                        <tr key={trainee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {userRole === "superadmin" && (
                                <input type="checkbox" className="mr-2" value={trainee.id} onChange={() => {}} />
                              )}
                              <div className="flex-shrink-0 h-10 w-10">
                                <Image
                                  className="h-10 w-10 rounded-full"
                                  src="/placeholder.svg?height=40&width=40"
                                  alt=""
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{trainee.name}</div>
                                <div className="text-sm text-gray-500">{trainee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainee.installation}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainee.phoneNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainee.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainee.trainingType}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusBadge(trainee.status || "pending")}
                              <div className="ml-2">
                                <div className="text-sm capitalize">{trainee.status || "pending"}</div>
                                <div className="text-xs text-gray-500">
                                  {getStatusText(trainee.status || "pending")}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {renderActionButtons(trainee)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Dialogs */}
      <TraineeDetailDialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen} trainee={selectedTrainee} />

      <TraineeAppraisalViewDialog
        open={appraisalViewDialogOpen}
        onOpenChange={setAppraisalViewDialogOpen}
        trainee={selectedTrainee}
      />

      <AppraisalReportDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        trainee={selectedTrainee}
        userRole={userRole}
      />

      <RecommendationDialog
        open={recommendationDialogOpen}
        onOpenChange={setRecommendationDialogOpen}
        trainee={selectedTrainee}
        userRole={userRole}
      />

      {userRole === "admin" && (
        <EditTraineeDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          trainee={selectedTrainee}
          onSave={handleSaveEdit}
        />
      )}
    </RoleGuard>
  )
}
