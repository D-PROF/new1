"use client"

import { useState, useEffect } from "react"

interface AssessmentTimerProps {
  initialTime: number // in seconds
  onTimeUp: () => void
}

export function AssessmentTimer({ initialTime, onTimeUp }: AssessmentTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="text-2xl font-bold text-center mb-4">
      {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
    </div>
  )
}
