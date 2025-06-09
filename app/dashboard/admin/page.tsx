"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useMobile } from "@/hooks/use-mobile"
import { DashboardHeader } from "@/components/dashboard-header"

export default function AdminDashboard() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const isMobile = useMobile()

  useEffect(() => {
    // Check if user has admin role
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      router.push("/role-selection")
    }
  }, [router])

  // Generate calendar days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="p-1 md:p-2 text-center text-gray-400"></td>)
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()

      days.push(
        <td key={i} className="p-1 md:p-2">
          <div
            className={`w-6 h-6 md:w-8 md:h-8 mx-auto flex items-center justify-center rounded-full ${
              isToday ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i}
          </div>
        </td>,
      )
    }

    // Group days into weeks
    const weeks = []
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(<tr key={`week-${i}`}>{days.slice(i, i + 7)}</tr>)
    }

    return weeks
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidebar userRole="admin" />

      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <main className="p-4 md:p-6">
          <DashboardHeader userName="Pastor Moyo Omolehin" userEmail="moyoomolehin@gmail.com" />

          <div className="bg-indigo-500 text-white rounded-xl p-4 md:p-8 mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg md:text-xl mb-2">Happy are you Sir</p>
                <h2 className="text-2xl md:text-3xl font-bold">Welcome Admin</h2>
                <p className="mt-2">Check progress report</p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Number of Trainees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl md:text-4xl font-bold text-indigo-700">1,024</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Trainees Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl md:text-4xl font-bold text-indigo-700">1,004</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Trainees Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl md:text-4xl font-bold text-indigo-700">20</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Trainees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-36 md:h-48 rounded-full border-8 border-orange-100">
                  <div
                    className="absolute inset-0 border-t-8 border-l-8 border-orange-500 rounded-full"
                    style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                  ></div>
                  <div
                    className="absolute inset-0 border-r-8 border-b-8 border-orange-500 rounded-full"
                    style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                  ></div>
                </div>
                <div className="flex justify-center mt-4 space-x-4 md:space-x-8">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-200 mr-2"></div>
                    <span className="text-xs md:text-sm">Rejected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-xs md:text-sm">Approved</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trainers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-36 md:h-48 rounded-full border-8 border-indigo-100">
                  <div
                    className="absolute inset-0 border-t-8 border-l-8 border-indigo-500 rounded-full"
                    style={{ clipPath: "polygon(0 0, 70% 0, 0 70%)" }}
                  ></div>
                </div>
                <div className="flex justify-center mt-4 space-x-4 md:space-x-8">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                    <span className="text-xs md:text-sm">Teaching Staff</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-200 mr-2"></div>
                    <span className="text-xs md:text-sm">Non Teaching Staff</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs md:text-sm">Ex Asst.</span>
                      <span className="text-xs md:text-sm">60%</span>
                    </div>
                    <Progress value={60} className="h-2 bg-blue-100" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs md:text-sm">Asst. HOD</span>
                      <span className="text-xs md:text-sm">45%</span>
                    </div>
                    <Progress value={45} className="h-2 bg-blue-100" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs md:text-sm">HOD</span>
                      <span className="text-xs md:text-sm">20%</span>
                    </div>
                    <Progress value={20} className="h-2 bg-blue-100" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs md:text-sm">Minister</span>
                      <span className="text-xs md:text-sm">70%</span>
                    </div>
                    <Progress value={70} className="h-2 bg-blue-100" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs md:text-sm">Pastor</span>
                      <span className="text-xs md:text-sm">50%</span>
                    </div>
                    <Progress value={50} className="h-2 bg-blue-100" />
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-xs md:text-sm">Total Population</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
                    <span className="text-xs md:text-sm">Record</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-1 md:p-2 text-xs md:text-sm">Su</th>
                    <th className="p-1 md:p-2 text-xs md:text-sm">Mo</th>
                    <th className="p-1 md:p-2 text-xs md:text-sm">Tu</th>
                    <th className="p-1 md:p-2 text-xs md:text-sm">We</th>
                    <th className="p-1 md:p-2 text-xs md:text-sm">Th</th>
                    <th className="p-1 md:p-2 text-xs md:text-sm">Fr</th>
                    <th className="p-1 md:p-2 text-xs md:text-sm">Sa</th>
                  </tr>
                </thead>
                <tbody>{renderCalendar()}</tbody>
              </table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
