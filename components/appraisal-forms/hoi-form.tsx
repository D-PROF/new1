"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface HOIFormProps {
  traineeName?: string
  onClose: () => void
  mode?: "create" | "view" | "edit"
  formId?: string
}

interface FormData {
  recommendation: string
  characterComment: string
  attendanceComment: string
  duesComment: string
  accuracyComment: string
}

export function HOIForm({ traineeName = "Word Sanctuary", onClose, mode = "create", formId }: HOIFormProps) {
  const [formData, setFormData] = useState<FormData>({
    recommendation: "",
    characterComment: "",
    attendanceComment: "",
    duesComment: "",
    accuracyComment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isViewMode, setIsViewMode] = useState(mode === "view")
  const { toast } = useToast()

  // Load existing form data if editing or viewing
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && formId && typeof window !== "undefined") {
      const savedData = localStorage.getItem(`hoi_form_${formId}`)
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
          type: "hoi",
        }

        localStorage.setItem(`hoi_form_${submissionId}`, JSON.stringify(submissionData))
        localStorage.setItem(
          `hoi_status_${submissionId}`,
          JSON.stringify({
            status: "completed",
            completedAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
          }),
        )
      }

      toast({
        title: "Appraisal submitted",
        description: "The HOI appraisal has been submitted successfully",
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

  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <Image
          src="/images/word-sanctuary-logo-black.png"
          alt="Word Sanctuary Logo"
          width={80}
          height={40}
          className="h-12 w-auto"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Head of Installation Appraisal Form</h2>
        {mode !== "create" && (
          <Button type="button" variant="outline" size="sm" onClick={toggleEditMode}>
            {isViewMode ? "Edit" : "View"}
          </Button>
        )}
      </div>

      <p className="text-sm text-center mb-6">
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
          <label htmlFor="character" className="block text-sm font-medium text-gray-700 mb-1">
            Briefly comment on the character (morals) and readiness (spiritually and lifeClass) of the nominee
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
            Does he or she miss church services or departmental meetings? If yes, why?
          </label>
          <Input
            id="attendance"
            value={formData.attendanceComment}
            onChange={(e) => handleInputChange("attendanceComment", e.target.value)}
            required
            disabled={isViewMode}
          />
        </div>

        <div>
          <label htmlFor="dues" className="block text-sm font-medium text-gray-700 mb-1">
            Is he/she owing dues?
          </label>
          <Input
            id="dues"
            value={formData.duesComment}
            onChange={(e) => handleInputChange("duesComment", e.target.value)}
            required
            disabled={isViewMode}
          />
        </div>

        <div>
          <label htmlFor="accuracy" className="block text-sm font-medium text-gray-700 mb-1">
            Kindly comment on the accuracy of the information in the interview form
          </label>
          <Textarea
            id="accuracy"
            value={formData.accuracyComment}
            onChange={(e) => handleInputChange("accuracyComment", e.target.value)}
            required
            rows={4}
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
