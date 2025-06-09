"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { Mail, Phone, MapPin, Building, GraduationCap, Calendar } from "lucide-react"

interface Trainee {
  id: string
  name: string
  email: string
  progress: number
  installation: string
  phoneNumber: string
  department: string
  trainingType: string
}

interface TraineeDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trainee: Trainee | null
}

export function TraineeDetailDialog({ open, onOpenChange, trainee }: TraineeDetailDialogProps) {
  if (!trainee) return null

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-red-500"
    if (progress < 60) return "bg-yellow-500"
    if (progress < 80) return "bg-blue-500"
    return "bg-green-500"
  }

  const getProgressStatus = (progress: number) => {
    if (progress < 30) return "Needs Improvement"
    if (progress < 60) return "In Progress"
    if (progress < 80) return "Good Progress"
    return "Excellent"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Trainee Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Image
              className="h-16 w-16 rounded-full"
              src="/placeholder.svg?height=64&width=64"
              alt={trainee.name}
              width={64}
              height={64}
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{trainee.name}</h3>
              <Badge variant="outline" className="mt-1">
                {trainee.trainingType}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{trainee.progress}%</div>
              <div className="text-sm text-gray-500">{getProgressStatus(trainee.progress)}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Training Progress</span>
              <span>{trainee.progress}%</span>
            </div>
            <Progress value={trainee.progress} className="h-3" />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{trainee.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{trainee.phoneNumber}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Assignment Details</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{trainee.installation}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{trainee.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{trainee.trainingType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Training Milestones */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Training Milestones</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm">Orientation Completed</span>
                <Badge variant="default" className="bg-green-500">
                  Completed
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-sm">Basic Training</span>
                <Badge variant="default" className="bg-blue-500">
                  In Progress
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Advanced Training</span>
                <Badge variant="outline">Pending</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Final Assessment</span>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Recent Activity</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Last appraisal: 2 weeks ago</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Next assessment: In 1 week</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
