"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { RoleGuard } from "@/components/role-guard"
import { AssessmentList } from "@/components/assessments/assessment-list"
import { NewAssessmentForm } from "@/components/assessments/new-assessment-form"
import { AnswerGrading } from "@/components/assessments/answer-grading"

type View = "list" | "new" | "answers"

export default function AssessmentsPage() {
  const [userRole, setUserRole] = useState<string>("leadership")
  const [currentView, setCurrentView] = useState<View>("list")
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>("")
  const [selectedAssessmentTitle, setSelectedAssessmentTitle] = useState<string>("")

  useEffect(() => {
    // Get user role from localStorage
    const storedUserRole = localStorage.getItem("userRole")
    if (storedUserRole) {
      setUserRole(storedUserRole)
    }
  }, [])

  const handleAddNew = () => {
    setCurrentView("new")
  }

  const handleViewAnswers = (assessmentId: string) => {
    setSelectedAssessmentId(assessmentId)
    // In a real app, you would fetch the assessment title based on the ID
    // For now, we'll use a hardcoded title based on the ID
    if (assessmentId === "1" || assessmentId === "5" || assessmentId === "9") {
      setSelectedAssessmentTitle("PERSPECTIVE I")
    } else {
      setSelectedAssessmentTitle("Assessment " + assessmentId)
    }
    setCurrentView("answers")
  }

  const handleSubmitNewAssessment = () => {
    // In a real app, you would save the new assessment
    setCurrentView("list")
  }

  const handleBackToList = () => {
    setCurrentView("list")
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "list":
        return <AssessmentList onAddNew={handleAddNew} onViewAnswers={handleViewAnswers} userRole={userRole} />
      case "new":
        return <NewAssessmentForm onCancel={handleBackToList} onSubmit={handleSubmitNewAssessment} />
      case "answers":
        return <AnswerGrading assessmentTitle={selectedAssessmentTitle} onBack={handleBackToList} />
      default:
        return <AssessmentList onAddNew={handleAddNew} onViewAnswers={handleViewAnswers} userRole={userRole} />
    }
  }

  return (
    <RoleGuard allowedRoles={["leadership", "admin", "superadmin"]}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar userRole={userRole} />

        <div className="flex-1 overflow-auto">
          <main className="p-6">{renderCurrentView()}</main>
        </div>
      </div>
    </RoleGuard>
  )
}
