"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RoleGuard } from "@/components/role-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Download, BarChart, PieChart, LineChart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResultsPage() {
  const [userRole, setUserRole] = useState<string>("admin")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Get user role from localStorage
    const storedUserRole = localStorage.getItem("userRole")
    if (storedUserRole) {
      setUserRole(storedUserRole)
    }
  }, [])

  // Sample results data
  const roleResults = [
    {
      id: "1",
      title: "Executive Assistant Results",
      completedDate: "2023-11-30",
      averageScore: 85,
      highestScore: 98,
      lowestScore: 72,
      participants: 30,
    },
    {
      id: "2",
      title: "Assistant HOD Results",
      completedDate: "2023-11-15",
      averageScore: 78,
      highestScore: 95,
      lowestScore: 65,
      participants: 45,
    },
    {
      id: "3",
      title: "HOD Results",
      completedDate: "2023-10-25",
      averageScore: 82,
      highestScore: 100,
      lowestScore: 68,
      participants: 40,
    },
    {
      id: "4",
      title: "Minister Results",
      completedDate: "2023-10-15",
      averageScore: 88,
      highestScore: 97,
      lowestScore: 75,
      participants: 35,
    },
    {
      id: "5",
      title: "Pastor Results",
      completedDate: "2023-10-05",
      averageScore: 90,
      highestScore: 99,
      lowestScore: 80,
      participants: 25,
    },
  ]

  // Filter results based on search query
  const filteredResults = roleResults.filter((result) => result.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <RoleGuard allowedRoles={["admin", "superadmin"]}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar userRole={userRole} />

        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Results</h1>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search results"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 rounded-full"
                  />
                </div>
                {(userRole === "admin" || userRole === "superadmin") && (
                  <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700">
                    <Download size={16} className="mr-2" />
                    Export All
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">81.7%</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.3%</div>
                  <p className="text-xs text-muted-foreground">+4.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">115</div>
                  <p className="text-xs text-muted-foreground">+12 from last month</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="summary" className="mb-6">
              <TabsList>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="individual">Individual Results</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="pt-4">
                <div className="grid grid-cols-1 gap-6">
                  {filteredResults.map((result) => (
                    <Card key={result.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>{result.title}</CardTitle>
                          <span className="text-sm text-gray-500">Completed: {result.completedDate}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Average Score</p>
                            <p className="text-2xl font-bold">{result.averageScore}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Highest Score</p>
                            <p className="text-2xl font-bold">{result.highestScore}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Lowest Score</p>
                            <p className="text-2xl font-bold">{result.lowestScore}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Participants</p>
                            <p className="text-2xl font-bold">{result.participants}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {(userRole === "admin" || userRole === "superadmin") && (
                            <Button variant="outline" size="sm">
                              <Download size={14} className="mr-1" />
                              Export
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="individual" className="pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-500">Select an assessment to view individual results</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="comparison" className="pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-500">Select assessments to compare results</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}
