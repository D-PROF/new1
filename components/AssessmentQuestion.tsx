"use client"

import { useState } from "react"
import { AssessmentTimer } from "./AssessmentTimer"
import { useVisibilityDetection } from "../hooks/useVisibilityDetection"
import Link from "next/link"

interface AssessmentQuestionProps {
  title: string
  question: string
  timeLimit: number
  onSubmit: (answer: string) => void
  onViolation: () => void
}

export function AssessmentQuestion({ title, question, timeLimit, onSubmit, onViolation }: AssessmentQuestionProps) {
  const [answer, setAnswer] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useVisibilityDetection((isVisible) => {
    if (!isVisible && !isSubmitted) {
      onViolation()
    }
  })

  const handleSubmit = () => {
    if (answer.trim()) {
      setIsSubmitted(true)
      onSubmit(answer)
    }
  }

  const handleTimeUp = () => {
    if (!isSubmitted) {
      setIsSubmitted(true)
      onSubmit(answer || "No answer provided - Time expired")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed h-full w-16 bg-white shadow-md md:w-64">
          <div className="flex h-16 items-center justify-center border-b">
            <img src="/images/word-sanctuary-logo-black.png" alt="Word Sanctuary" className="h-8 w-auto md:h-10" />
            <span className="ml-2 hidden text-lg font-semibold md:block">Word Sanctuary</span>
          </div>

          <nav className="mt-6">
            <Link href="/select-training" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <span className="hidden md:block">Dashboard</span>
            </Link>

            <Link href="/assessment" className="flex items-center px-4 py-3 text-purple-600 bg-purple-100">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-200 text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <span className="hidden md:block">Assessment</span>
            </Link>

            <Link href="/settings" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span className="hidden md:block">Settings</span>
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="ml-16 flex-1 md:ml-64">
          <div className="p-4 md:p-8">
            <div className="rounded-lg bg-white p-6 shadow-md max-w-2xl mx-auto">
              <AssessmentTimer initialTime={timeLimit} onTimeUp={handleTimeUp} />

              <h1 className="text-xl font-bold text-purple-600 text-center mb-8">{title}</h1>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Question</h2>
                <p className="text-gray-700 mb-4">{question}</p>

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type in your answers"
                  className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isSubmitted}
                />
              </div>

              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitted || !answer.trim()}
                  className="bg-purple-600 text-white px-8 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
