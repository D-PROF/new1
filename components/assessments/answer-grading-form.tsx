"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AnswerGradingFormProps {
  traineeId: string
  assessmentId: string
  onBack: () => void
}

export function AnswerGradingForm({ traineeId, assessmentId, onBack }: AnswerGradingFormProps) {
  const [score, setScore] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // In a real app, you would fetch this data from an API
  const traineeData = {
    name: "Word Sanctuary",
    installation: "Abuja",
    topic: "Perspective I",
    question: "What is Perspective to you?",
    answer: "Perspective is the way you view something.",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!score) {
      toast({
        title: "Error",
        description: "Please enter a score",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would submit to an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Score submitted successfully",
      })

      onBack()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit score",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-indigo-900 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="mt-8 mb-6 text-center">
          <h1 className="text-2xl font-bold">Answer Grading</h1>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-[auto_1fr] gap-x-2 mb-4">
            <span className="font-semibold">Name:</span>
            <span>{traineeData.name}</span>

            <span className="font-semibold">Installation:</span>
            <span>{traineeData.installation}</span>

            <span className="font-semibold">Topic:</span>
            <span>{traineeData.topic}</span>
          </div>

          <div className="mb-4">
            <h3 className="text-purple-700 font-semibold mb-1">Question</h3>
            <p className="mb-2">{traineeData.question}</p>

            <div className="bg-gray-200 p-4 rounded-md">
              <p>{traineeData.answer}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-2 text-sm text-gray-500">Score</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <Input
                type="number"
                placeholder="Enter the score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="w-full"
                min="0"
                max="100"
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-purple-800 hover:bg-purple-900 text-white px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
