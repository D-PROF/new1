"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

interface NewAssessmentFormProps {
  onCancel: () => void
  onSubmit: () => void
}

export function NewAssessmentForm({ onCancel, onSubmit }: NewAssessmentFormProps) {
  const [title, setTitle] = useState("")
  const [trainingType, setTrainingType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-8">Assessment</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="training" className="block text-sm font-medium">
            Training: <span className="text-red-500">*</span>
          </label>
          <Input
            id="training"
            value={trainingType}
            onChange={(e) => setTrainingType(e.target.value)}
            placeholder="Kindly select the training type"
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the description."
            className="w-full"
          />
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-md p-12 flex flex-col items-center justify-center">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Upload Questions (csv files only)</p>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="border-gray-300 flex items-center gap-1">
            Add Question <span className="text-xl">+</span>
          </Button>
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Snipping Tool</span>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-2 rounded-md">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
