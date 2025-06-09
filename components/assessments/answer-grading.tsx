"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"
import { AnswerGradingForm } from "./answer-grading-form"

interface Trainee {
  id: string
  name: string
  trainingType: string
  installation: string
}

interface AnswerGradingProps {
  assessmentTitle: string
  onBack: () => void
}

export function AnswerGrading({ assessmentTitle, onBack }: AnswerGradingProps) {
  const [trainees] = useState<Trainee[]>([
    { id: "1", name: "Word Sanctuary", trainingType: "Executive Asst", installation: "ABUJA" },
    { id: "2", name: "Word Sanctuary", trainingType: "Executive Asst", installation: "FUTA" },
    { id: "3", name: "Word Sanctuary", trainingType: "Executive Asst", installation: "UNILORIN" },
    { id: "4", name: "Word Sanctuary", trainingType: "Executive Asst", installation: "KWASU" },
    { id: "5", name: "Word Sanctuary", trainingType: "Executive Asst", installation: "OG" },
    { id: "6", name: "Word Sanctuary", trainingType: "Executive Asst", installation: "ABUJA" },
    { id: "7", name: "Word Sanctuary", trainingType: "Executive Asst", installation: "FUTA" },
    { id: "8", name: "Word Sanctuary", trainingType: "Executive Asst", installation: "ABUJA" },
    { id: "9", name: "Word Sanctuary", trainingType: "Executive Asst", installation: "Gospel Empire" },
  ])

  const [selectedTrainee, setSelectedTrainee] = useState<string | null>(null)
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null)

  const handleGradeAnswer = (traineeId: string) => {
    setSelectedTrainee(traineeId)
    setSelectedAssessment(assessmentTitle)
  }

  const handleBackToList = () => {
    setSelectedTrainee(null)
    setSelectedAssessment(null)
  }

  // If a trainee is selected, show the grading form
  if (selectedTrainee && selectedAssessment) {
    return <AnswerGradingForm traineeId={selectedTrainee} assessmentId={selectedAssessment} onBack={handleBackToList} />
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-shrink-0">
          <Image
            src="/images/word-sanctuary-logo-black.png"
            alt="Word Sanctuary Logo"
            width={60}
            height={60}
            className="h-12 w-auto"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{assessmentTitle}</h1>
          <p className="text-lg">Answer Grading</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Input type="text" placeholder="Search" className="pl-8 rounded-md" />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white">
            Filter
          </Button>
          <Button variant="default" className="bg-indigo-800 hover:bg-indigo-900 text-white">
            Logout
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-4 p-4 border-b bg-gray-50">
          <div className="w-6">
            <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          <div className="font-medium">Name</div>
          <div className="font-medium">Training Type</div>
          <div className="font-medium">Installation</div>
          <div className="font-medium">Assessment</div>
          <div className="w-48"></div>
        </div>

        {trainees.map((trainee) => (
          <div key={trainee.id} className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-4 p-4 border-b items-center">
            <div>
              <input type="radio" className="rounded-full" name="trainee" />
            </div>
            <div>{trainee.name}</div>
            <div>{trainee.trainingType}</div>
            <div>{trainee.installation}</div>
            <div></div>
            <div className="flex gap-2">
              <Button
                className="bg-black hover:bg-gray-800 text-white text-xs py-1 px-3 rounded"
                onClick={() => handleGradeAnswer(trainee.id)}
              >
                Answer
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white text-xs py-1 px-3 rounded">Reset</Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-3 rounded">Score</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
