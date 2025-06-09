"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AssessmentItem {
  id: string
  title: string
  type: "ASSIGNMENT" | "TEST" | "EXAM"
}

interface AssessmentListProps {
  onAddNew: () => void
  onViewAnswers: (assessmentId: string) => void
  userRole: string // Add userRole prop
}

export function AssessmentList({ onAddNew, onViewAnswers, userRole }: AssessmentListProps) {
  const [assessments] = useState<AssessmentItem[]>([
    { id: "1", title: "PERSPECTIVE I ASSIGNMENT", type: "ASSIGNMENT" },
    { id: "2", title: "PERSPECTIVE II TEST", type: "TEST" },
    { id: "3", title: "HOW TO CONDUCT A DEPARTMENTAL MEETING ASSIGNMENT", type: "ASSIGNMENT" },
    { id: "4", title: "CHURCH AS AN ORGANIZATION ASSIGNMENT", type: "ASSIGNMENT" },
    { id: "5", title: "PERSPECTIVE I ASSIGNMENT", type: "ASSIGNMENT" },
    { id: "6", title: "KNOWING THE PEOPLE TEST", type: "TEST" },
    { id: "7", title: "PAIN ASSIGNMENT", type: "ASSIGNMENT" },
    { id: "8", title: "BAD ASSISTANT ASSIGNMENT", type: "ASSIGNMENT" },
    { id: "9", title: "PERSPECTIVE I EXAM", type: "EXAM" },
  ])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Assessment</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input type="text" placeholder="Search" className="pl-8 rounded-full w-[200px]" />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button
            onClick={onAddNew}
            className="bg-orange-400 hover:bg-orange-500 text-white rounded-md flex items-center gap-1"
          >
            Add new <span className="text-xl">+</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 border-b">
          <div className="w-6"></div>
          <div className="font-medium">Assessment Information</div>
          <div className="font-medium">Actions</div>
        </div>

        {assessments.map((assessment) => (
          <div key={assessment.id} className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 border-b items-center">
            <div>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="font-medium">{assessment.title}</div>
            <div className="flex gap-2">
              <Button
                onClick={() => onViewAnswers(assessment.id)}
                className="bg-indigo-700 hover:bg-indigo-800 text-white text-xs py-1 px-3 rounded"
              >
                Answers
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-3 rounded">View</Button>
              <Button className="bg-black hover:bg-gray-800 text-white text-xs py-1 px-3 rounded">Edit</Button>
              {userRole !== "leadership" && userRole !== "superadmin" && (
                <Button className="bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-3 rounded">Delete</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
