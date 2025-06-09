"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface MentorFormProps {
  traineeName?: string
  onClose: () => void
  mode?: "create" | "view" | "edit"
  formId?: string
}

interface FormData {
  recommendation: string
  topicsCount: string
  characterComment: string
  attendanceComment: string
}

export function MentorForm({ traineeName = "Word Sanctuary", onClose, mode = "create", formId }: MentorFormProps) {
  const [formData, setFormData] = useState<FormData>({
    recommendation: "",
    topicsCount: "",
    characterComment: "",
    attendanceComment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isViewMode, setIsViewMode] = useState(mode === "view")
  const { toast } = useToast()
  const isMobile = useMobile()

  // Load existing form data if editing or viewing
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && formId && typeof window !== "undefined") {
      const savedData = localStorage.getItem(`mentor_form_${formId}`)
      if (savedData) {
        setFormData(JSON.parse(savedData))
      }
    }
  }, [mode, formId])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save form data and completion status
      if (typeof window !== "undefined") {
        const submissionId = formId || `${traineeName}_${Date.now()}`
        const submissionData = {
          ...formData,
          traineeName,
          submittedAt: new Date().toISOString(),
          submittedBy: localStorage.getItem("userRole") || "user",
          type: "mentor",
        }

        localStorage.setItem(`mentor_form_${submissionId}`, JSON.stringify(submissionData))
        localStorage.setItem(
          `mentor_status_${submissionId}`,
          JSON.stringify({
            status: "completed",
            completedAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
          }),
        )
      }

      toast({
        title: "Appraisal submitted",
        description: "The mentor appraisal has been submitted successfully",
      })

      onClose()
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting the appraisal",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleEditMode = () => {
    setIsViewMode(!isViewMode)
  }

  const formWidth = isMobile ? "w-full" : "max-w-md mx-auto"

  return (
    <div className={`bg-white rounded-lg p-4 md:p-6 ${formWidth}`}>
      <div className="flex justify-center mb-4">
        <Image
          src="/images/word-sanctuary-logo-black.png"
          alt="Word Sanctuary Logo"
          width={80}
          height={40}
          className="h-10 md:h-12 w-auto"
        />
      </div>

      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Mentor Appraisal Form</h2>
        {mode !== "create" && (
          <Button type="button" variant="outline" size="sm" onClick={toggleEditMode}>
            {isViewMode ? "Edit" : "View"}
          </Button>
        )}
      </div>

      <p className="text-xs md:text-sm text-center mb-4 md:mb-6">
        Kindly select the appropriate Appraisal type to access the list and form
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <Input id="name" value={traineeName} disabled className="bg-gray-200" />
        </div>

        <div>
          <label htmlFor="recommendation" className="block text-sm font-medium text-gray-700 mb-1">
            Level of recommendation of the nominee? High or Low?
          </label>
          <Input
            id="recommendation"
            value={formData.recommendation}
            onChange={(e) => handleInputChange("recommendation", e.target.value)}
            required
            disabled={isViewMode}
          />
        </div>

        <div>
          <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-1">
            Number of mentoring topics you have taught the nominee?
          </label>
          <Input
            id="topics"
            value={formData.topicsCount}
            onChange={(e) => handleInputChange("topicsCount", e.target.value)}
            required
            disabled={isViewMode}
          />
        </div>

        <div>
          <label htmlFor="character" className="block text-sm font-medium text-gray-700 mb-1">
            Briefly comment on the character(morals) and readiness (spiritually) of the nominee
          </label>
          <Textarea
            id="character"
            value={formData.characterComment}
            onChange={(e) => handleInputChange("characterComment", e.target.value)}
            required
            rows={4}
            disabled={isViewMode}
          />
        </div>

        <div>
          <label htmlFor="attendance" className="block text-sm font-medium text-gray-700 mb-1">
            Does he/she miss mentoring classes? If yes, why?
          </label>
          <Input
            id="attendance"
            value={formData.attendanceComment}
            onChange={(e) => handleInputChange("attendanceComment", e.target.value)}
            required
            disabled={isViewMode}
          />
        </div>

        <div className="flex justify-center pt-4 space-x-2">
          {!isViewMode && (
            <Button type="submit" className="bg-black hover:bg-gray-800 text-white px-8" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : mode === "edit" ? "Update" : "Submit"}
            </Button>
          )}
          <Button type="button" variant="outline" onClick={onClose}>
            {isViewMode ? "Close" : "Cancel"}
          </Button>
        </div>
      </form>
    </div>
  )
}
