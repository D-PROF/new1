"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Calendar, User, Building, GraduationCap } from "lucide-react"
import { useEffect, useState } from "react"

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

interface AppraisalResponse {
  id: string
  type: "mentor" | "hoi" | "central" | "department"
  submittedBy: string
  submittedAt: string
  responses: {
    [key: string]: string
  }
}

interface TraineeAppraisalViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trainee: Trainee | null
  initialTab?: string
}

export function TraineeAppraisalViewDialog({
  open,
  onOpenChange,
  trainee,
  initialTab = "mentor",
}: TraineeAppraisalViewDialogProps) {
  const [activeTab, setActiveTab] = useState(initialTab)

  // Update active tab when initialTab changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab)
    }
  }, [initialTab])

  if (!trainee) return null

  // Mock appraisal responses - in real app, this would come from API
  const appraisalResponses: AppraisalResponse[] = [
    {
      id: "1",
      type: "mentor",
      submittedBy: "Pastor Temple Omolehin",
      submittedAt: "2024-01-15",
      responses: {
        recommendation: "High",
        topicsCount: "15",
        characterComment:
          "Excellent moral character and spiritual readiness. Shows great commitment to learning and applying biblical principles in daily life.",
        attendanceComment: "Never misses mentoring classes. Very punctual and prepared for each session.",
      },
    },
    {
      id: "2",
      type: "hoi",
      submittedBy: "Pastor Omolara Omolehin",
      submittedAt: "2024-01-18",
      responses: {
        recommendation: "High",
        characterComment:
          "Demonstrates strong spiritual maturity and excellent moral conduct. Ready for leadership responsibilities.",
        attendanceComment: "Regular attendance at church services and departmental meetings. Very reliable.",
        duesComment: "No outstanding dues. Always pays on time.",
        accuracyComment: "All information provided in the interview form is accurate and verified.",
      },
    },
    {
      id: "3",
      type: "central",
      submittedBy: "Pastor Micheal Jackson",
      submittedAt: "2024-01-20",
      responses: {
        recommendation: "High",
        characterComment:
          "Shows excellent understanding of church systems and procedures. Demonstrates wisdom in decision-making.",
        attendanceComment: "Perfect attendance at central meetings. Actively participates in discussions.",
      },
    },
    {
      id: "4",
      type: "department",
      submittedBy: "Pastor Temple Omolehin",
      submittedAt: "2024-01-22",
      responses: {
        recommendation: "High",
        characterComment: "Outstanding performance in departmental activities. Shows natural leadership abilities.",
        attendanceComment: "Excellent attendance and participation in all departmental programs.",
        skillsComment: "Demonstrates strong technical skills and ability to train others.",
        teamworkComment: "Works well with team members and shows great collaborative spirit.",
      },
    },
  ]

  const getAppraisalTitle = (type: string) => {
    switch (type) {
      case "mentor":
        return "Mentor Appraisal"
      case "hoi":
        return "Head of Installation Appraisal"
      case "central":
        return "Central Forum Appraisal"
      case "department":
        return "Department Appraisal"
      default:
        return "Appraisal"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "denied":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const renderAppraisalContent = (appraisal: AppraisalResponse) => {
    return (
      <Card className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{getAppraisalTitle(appraisal.type)}</CardTitle>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Submitted by: {appraisal.submittedBy}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Date: {appraisal.submittedAt}</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Completed
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(appraisal.responses).map(([key, value]) => (
            <div key={key} className="border-l-4 border-blue-200 pl-4">
              <div className="font-medium text-sm text-gray-700 mb-1">
                {key === "recommendation" && "Level of Recommendation"}
                {key === "topicsCount" && "Number of Mentoring Topics Taught"}
                {key === "characterComment" && "Character & Readiness Assessment"}
                {key === "attendanceComment" && "Attendance Assessment"}
                {key === "duesComment" && "Dues Status"}
                {key === "accuracyComment" && "Information Accuracy"}
                {key === "skillsComment" && "Skills Assessment"}
                {key === "teamworkComment" && "Teamwork Assessment"}
              </div>
              <div className="text-gray-900 bg-gray-50 p-3 rounded-md">{value}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Appraisal Forms - {trainee.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Trainee Summary */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Image
                  className="h-16 w-16 rounded-full"
                  src="/placeholder.svg?height=64&width=64"
                  alt={trainee.name}
                  width={64}
                  height={64}
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{trainee.name}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Building className="h-4 w-4" />
                      <span>{trainee.installation}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GraduationCap className="h-4 w-4" />
                      <span>{trainee.trainingType}</span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(trainee.status || "pending")}>{trainee.status || "pending"}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Appraisal Forms */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Submitted Appraisal Forms</h3>

            {appraisalResponses.length > 0 ? (
              <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="mentor">Mentor</TabsTrigger>
                  <TabsTrigger value="hoi">HOI</TabsTrigger>
                  <TabsTrigger value="central">Central</TabsTrigger>
                  <TabsTrigger value="department">Department</TabsTrigger>
                </TabsList>

                {appraisalResponses.map((appraisal) => (
                  <TabsContent key={appraisal.id} value={appraisal.type}>
                    {renderAppraisalContent(appraisal)}
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-gray-500">
                    <p>No appraisal forms have been submitted for this trainee yet.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Summary Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Appraisal Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{appraisalResponses.length}</div>
                  <div className="text-sm text-gray-500">Forms Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {appraisalResponses.filter((a) => a.responses.recommendation === "High").length}
                  </div>
                  <div className="text-sm text-gray-500">High Recommendations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-gray-500">Completion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">4/4</div>
                  <div className="text-sm text-gray-500">Required Forms</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
